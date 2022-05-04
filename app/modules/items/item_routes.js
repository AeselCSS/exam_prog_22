const express = require('express');
const itemRouter = express.Router();
const itemDAL = require('./item_DAL')
const checkauth = require('../../utils/passport_utils')
//const checkAuthenticated = require('../../../server')
const passport = require('passport');

// Routes
itemRouter.get('/', (req, res) => {
	res.send();
});

// item CRUD routes
itemRouter.post("/items", itemDAL.createItem);
itemRouter.get("/items", itemDAL.readAllItems);
itemRouter.get("/items/:id", itemDAL.readItemsById); //note to self: / before : is very important
itemRouter.put("/items", itemDAL.updateItem);
itemRouter.delete("/items/:id", itemDAL.deleteItem);
