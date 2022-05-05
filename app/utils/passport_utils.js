const passport = require('passport');
const initializePassport = require('../config/passport-config')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

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


module.exports = {
    initializePassport,
    checkAuthenticated,
    checkNotAuthenticated,

}