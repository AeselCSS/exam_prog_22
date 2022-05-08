
//Requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Routes
const userRouter = require('./app/modules/users/user_routes')
const itemRouter = require('./app/modules/items/item_routes')
const adminRouter = require('./app/modules/admin/admin_routes')

//Modules
const sql = require('./app/config/db_config')
const app = express();

//Uses
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./client/'))
app.use(cors());

app.use('/', userRouter, itemRouter, adminRouter);

// BOOT UP EXPRESS SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`ExpressJS server running on port ${port}`));

// EXPORT FOR TESTING
module.exports = app;

