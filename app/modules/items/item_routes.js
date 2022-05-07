const express = require('express');
const itemRouter = express.Router();
const itemDAL = require('./item_DAL')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//Routes
 itemRouter.get('/', (req, res) => {
	res.send();
 });

// item CRUD routes
itemRouter.post("/items", upload.single('image'), itemDAL.createItem);
itemRouter.get("/items", itemDAL.readAllItems);
itemRouter.get("/items/:id", itemDAL.readItemById); //note to self: / before : is very important
itemRouter.get("/items/fromUser/:id", itemDAL.readItemByUser);
itemRouter.put("/items/:id", itemDAL.updateItem);
itemRouter.delete("/items/:id", itemDAL.deleteItem);

// uploads
itemRouter.post('/items', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})



module.exports = itemRouter;