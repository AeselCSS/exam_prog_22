const express = require('express');
const adminRouter = express.Router();
const adminDAL = require('./admin_DAL')

// Routes

// routes for admin to manipulate user account data
adminRouter.put("/admin", adminDAL.adminUpdateUser);
adminRouter.delete("/admin/:id", adminDAL.adminDeleteUser);

// admin login route
adminRouter.post("/admin/login", adminDAL.adminLogin);

// admin statistics route
adminRouter.get("/admin/stats/numberofusers", adminDAL.numberOfUsers);
adminRouter.get("/admin/stats/numberoflistings", adminDAL.numberOfListings);
adminRouter.get("/admin/stats/listingsperuser", adminDAL.listingsPerUser);

// export
module.exports = adminRouter;