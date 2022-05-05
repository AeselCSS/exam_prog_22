const express = require('express');
const itemRouter = express.Router();
const itemDAL = require('./item_DAL')

//Routes
 itemRouter.get('/', (req, res) => {
	res.send();
 });

// item CRUD routes
itemRouter.post("/items", itemDAL.createItem);
itemRouter.get("/items", itemDAL.readAllItems);
itemRouter.get("/items/:id", itemDAL.readItemById); //note to self: / before : is very important
itemRouter.put("/items/:id", itemDAL.updateItem);
itemRouter.delete("/items/:id", itemDAL.deleteItem);

module.exports = itemRouter;