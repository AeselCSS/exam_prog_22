const express = require('express');
const adminRouter = express.Router();
const adminDAL = require('./admin_DAL')

// Routes

// user CRUD routes

adminRouter.get("/admin", adminDAL.readAllAdmin);
adminRouter.get("/admin/:id", adminDAL.readAdminById); //note to self: / before : is very important


// admin login & authentication route
adminRouter.post("/admin/login", adminDAL.adminLogin);




// export
module.exports = adminRouter;