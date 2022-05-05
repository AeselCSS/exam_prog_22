const express = require('express');
const adminRouter = express.Router();
const adminDAL = require('./admin_DAL')
const checkauth = require('../../utils/passport_utils')
//const checkAuthenticated = require('../../../server')
const passport = require('passport');


// Routes
adminRouter.get('/', (req, res) => {
	res.send();
});

// user CRUD routes
adminRouter.post("/admins", adminDAL.createAdmin);
adminRouter.get("/admins", adminDAL.readAllAdmin);
adminRouter.get("/admins/:id", adminDAL.readAdminById); //note to self: / before : is very important
adminRouter.put("/admins", adminDAL.updateAdmin);
adminRouter.delete("/admins/:id", adminDAL.deleteAdmin);

// user login & authentication route
//userRouter.post("/users/login", userController.userLogin);
adminRouter.get('/login', checkauth.checkNotAuthenticated, (req, res) => {
  res.render('../../../client/login.html')

})

adminRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    //show message from passport-config
    failureFlash: true
    //Remember to show it in the html syntax for messages.error!!!
}))

// export
module.exports = adminRouter;