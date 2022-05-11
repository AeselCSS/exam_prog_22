const express = require('express');
const itemRouter = express.Router();
const itemDAL = require('./item_DAL');
const formData = require("express-form-data");

// item CRUD routes
itemRouter.post("/items/createItem", itemDAL.createItem);
itemRouter.get("/items", itemDAL.readAllItems);
itemRouter.get("/items/:id", itemDAL.readItemById); //note to self: / before : is very important
itemRouter.get("/items/fromUser/:id", itemDAL.readItemByUser);
itemRouter.put("/items/", itemDAL.updateItem); //Kan godt være det er den der duplikere
itemRouter.delete("/items/:id", itemDAL.deleteItem);

//item FILTER routes
itemRouter.get("/items/filter/price/:price", itemDAL.filterByPrice);
itemRouter.get("/items/filter/condition/:condition", itemDAL.filterByCondition);
itemRouter.get("/items/filter/location/:location", itemDAL.filterByLocation);
itemRouter.get("/items/filter/days/:days", itemDAL.filterByTime);
itemRouter.get("/items/filter/category/:category", itemDAL.filterByCategory);

// other item routes
itemRouter.get("/items/filter/getdistloc", itemDAL.getDistinctLocation);
itemRouter.get("/items/details/:itemID", itemDAL.getImagePath);
itemRouter.post("/items/follow", itemDAL.followItem);
itemRouter.get("/items/follow/:id", itemDAL.readFollowedItems);

module.exports = itemRouter;