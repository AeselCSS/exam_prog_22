const express = require('express');
const adminRouter = express.Router();
const adminDAL = require('./admin_DAL')

// Routes

// routes for admin to manipulate user account data
adminRouter.put("/admin", adminDAL.adminUpdateUser);
adminRouter.delete("/admin/:id", adminDAL.adminDeleteUser);

// admin login route
adminRouter.post("/admin/login", adminDAL.adminLogin);

// export
module.exports = adminRouter;