
//Requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const flash = require('express-flash'); //show error message
const session = require('express-session'); 


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
app.use(flash()); //error messages
app.use(session({
    secret: process.env.SESSION_SECRET, //encrypt user information
    resave: false, //We dont want to resave our session variable if nothing is changed
    saveUninitialized: false //we dont want to save an empty value in this session if there are no values
}));
app.use(passport.initialize()); //set up passport
app.use(passport.session())//store variables accross the entire session for our user

// BOOT UP EXPRESS SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`ExpressJS server running on port ${port}`));

// EXPORT FOR TESTING
module.exports = app;
