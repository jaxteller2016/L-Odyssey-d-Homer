const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const connection = require ('../helpers/db');
const bcrypt = require('bcrypt');
const  passport = require ('passport');
const jwt = require('jsonwebtoken');

// I am encrypting myPassword which becomes a 'hash'
let hash = bcrypt.hashSync('myPassword', 10);

router.post('/signUp', function(req, res, next) {

    var object = { email: req.body.email,
                  password: bcrypt.hashSync(req.body.password, 10) ,
                  name: req.body.name,
                  lastname: req.body.lastname
    };
    connection.query('INSERT INTO users SET ?', object, function (error, results, fields) {

        // Neat!

        if (error)
            res.status(500).json({ flash:  error.message });
        else
            res.status(200).json({ flash:  "User has been signed up!" });
    });
    // res.send('I am in POST signup');
});

router.post('/signin', function(req, res) {

    passport.authenticate('local',(err, user, info) =>
    {
        if(err) return res.status(500).send(err)
        if (!user) return res.status(400).json({message: info.message});
        const token = jwt.sign({user}, 'your_jwt_secret');
        return res.json({user, token, flash:'Sign in succesful'});
    })(req, res)
});

module.exports = router;