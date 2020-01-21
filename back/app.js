const authRouter = require('./auth/auth')

// declare all the necessary libraries
const  http  =  require('http');
const  path  =  require('path');
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const  morgan  =  require('morgan');
const  app  =  express();
const  passport = require ('passport');
const  LocalStrategy = require ('passport-local');
const  bcrypt = require('bcrypt');
const  JWTStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;

//From now on, the database connector will be available from any file via:
const connection = require('./helpers/db.js');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, done) {
        //Your code here
        connection.query(`SELECT * FROM users WHERE email = "${email}" `, function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, {info: 'Unknown Email'});
            }
            if (!bcrypt.compareSync(password, rows[0].password)) {
                return done(null, false, {info: 'Wrong Password'})
            }
            console.log(rows[0]);
            return done(null, rows[0], {info: 'User Signed in'})

        });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        return cb(null, jwtPayload);

    }

));
// set up the application
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));

// implement the API part
app.get("/", (req,res) => {
    res.send("youhou");
})

app.use('/auth', authRouter); //where authRouter is imported

app.get("/profile", passport.authenticate('jwt', { session:  false }),function (req, res) {

    res.send(req.user);

})

/// in case path is not found, return the 'Not Found' 404 code
app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

// launch the node server
let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port '  +  server.address().port);
});