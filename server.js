//Load environment variables and set them to process.env
//!== product, we want to be in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

//Requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Part 1. Passport, Authenticated
const passport = require('passport');
//show error message
const flash = require('express-flash');
//session
const session = require('express-session');

//Part 2. Passport, Authenticated
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
// Routes
const userRouter = require('./app/modules/users/user_routes')
//const itemRouter = require('./app/modules/items/itemRouter')

//Modules
const sql = require('./app/config/db_config')
const app = express();

//Uses
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./client/'))
app.use(cors());
app.use('/', userRouter);
//error message 
app.use(flash());
//session
app.use(session({
    //encrypt user information
    secret: process.env.SESSION_SECRET,
    //We dont want to resave our session variable if nothing is changed
    resave: false,
    //we dont want to save an empty value in this session if there are no values
    saveUninitialized: false
}));
//set up passport
app.use(passport.initialize());
//store variables accross the entire session fo our user
app.use(passport.session())

        //Er i tvivl om den skal være her eller ved routes for at virke
        //Hvis her skal funktionen eksporteres til sidst
//protect the different routes when logged in. THE CHECK AUTHENTICATE FUNCTION, middleware
//+ to stay logged in
//Anywhere in the routes you wanna check for user authentication just use checkauthenticated or checkNotAuthenticated after
//e.g. app.get('/', checkAuthenticated, (req, res)) for the homepage
//e.g. app.get('/', checkNotAuthenticated, (req, res)) for the login and register
const checkAuthenticated = (req, res, next) => {
    if (req, isAuthenticated()) {
        return next()
    }
    //Redirect to login if they arent logged in
    res.redirect('/login')
}
//When the user is logged in, we dont want them to be able to return to the login page
const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    //If they arent authenticated
    next()
}


// BOOT UP EXPRESS SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`ExpressJS server running on port ${port}`));

// EXPORT FOR TESTING
module.exports = app;
