//Requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Routes
//const userRouter = require('./app/routes/userRouter')
//const itemRouter = require('./app/routes/itemRouter')

//Modules
const sql = require('./app/config/db_config')
const app = express();

//Uses
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./app/views'))
app.use(cors());
//app.use('/', userRouter)

// BOOT UP EXPRESS SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`ExpressJS server running on port ${port}`));

// EXPORT FOR TESTING
module.exports = app;
