const express = require('express');
const itemRouter = express.Router();
const itemDAL = require('./item_DAL');
const formData = require("express-form-data");
//require('dotenv').config();

// //Routes
 itemRouter.get('/', (req, res) => {
	res.send();
 });


//itemRouter. formData.parse(options),

// item CRUD routes
itemRouter.post("/items/createItem", itemDAL.createItem);
itemRouter.get("/items", itemDAL.readAllItems);
itemRouter.get("/items/:id", itemDAL.readItemById); //note to self: / before : is very important
itemRouter.get("/items/fromUser/:id", itemDAL.readItemByUser);
itemRouter.put("/items/:id", itemDAL.updateItem);
itemRouter.delete("/items/:id", itemDAL.deleteItem);





module.exports = itemRouter;