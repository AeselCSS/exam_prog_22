const express = require('express');
const userRouter = express.Router();
const userDAL = require('./user_DAL')
const checkauth = require('../../utils/passport_utils')
//const checkAuthenticated = require('../../../server')
const passport = require('passport');


// Routes
userRouter.get('/', (req, res) => {
	res.send();
});

// user CRUD routes
userRouter.post("/users", userDAL.createUser);
userRouter.get("/users", userDAL.readAllUsers);
userRouter.get("/users/:id", userDAL.readUserById); //note to self: / before : is very important
userRouter.put("/users", userDAL.updateUser);
userRouter.delete("/users/:id", userDAL.deleteUser);

// user login & authentication route
//userRouter.post("/users/login", userController.userLogin);
userRouter.get('/login', checkauth.checkNotAuthenticated, (req, res) => {
  res.render('../../../client/login.html')

})

userRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    //show message from passport-config
    failureFlash: true
    //Remember to show it in the html syntax for messages.error!!!
}))

// export
module.exports = userRouter;