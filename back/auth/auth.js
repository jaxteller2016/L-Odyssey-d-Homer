const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const connection = require ('../helpers/db');

router.post('/signUp', function(req, res, next) {

    var object = { email: req.body.email,
                  password: req.body.password,
                  name: req.body.name,
                  lastname: req.body.lastname
    };
    var query = connection.query('INSERT INTO users SET ?', object, function (error, results, fields) {

        // Neat!

        if (error)
            res.status(500).json({ flash:  error.message });
        else
            res.status(200).json({ flash:  "User has been signed up!" });
    });
    // res.send('I am in POST signup');
});



module.exports = router;