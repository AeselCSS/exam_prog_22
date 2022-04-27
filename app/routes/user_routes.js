const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user_controller')

// Routes
userRouter.get('/', function(req, res) {
	res.send();
});

// user CRUD routes
userRouter.post("/users", userController.createUser);
userRouter.get("/users", userController.readAllUsers);
userRouter.get("/users/:id", userController.readUserById); //note to self: / before : is very important
userRouter.put("/users", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

// user login route
userRouter.post("/users/login", userController.userLogin);


// export
module.exports = userRouter;