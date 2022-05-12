
//Requires
//Express
const express = require('express');
//Express middleware forbindelse
const cors = require('cors');
//Fotrolige oplysninger
require('dotenv').config();

// Routes
const userRouter = require('./app/modules/users/user_routes')
const itemRouter = require('./app/modules/items/item_routes')
const adminRouter = require('./app/modules/admin/admin_routes')

//Modules
const sql = require('./app/config/db_config')
//Service, Routes og DAL
const app = express();

//Uses
//POST og PUT requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Deklarere en statisk fil for hele eksamens projekt mappe
app.use(express.static('./client/'))
app.use(cors());

app.use('/', userRouter, itemRouter, adminRouter);

// BOOT UP EXPRESS SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`ExpressJS server running on port ${port}`));

// EXPORT FOR TESTING
module.exports = app;

