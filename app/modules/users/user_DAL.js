// ** DATA ACCESS LAYER **

const sql = require("mssql");
const config = require("../../config/db_config");
const userModel = require("./user_model");

// ** user crud operators **

// create user POST method

const createUser = async (req, res) => {
  try {
    let userData = { ...req.body };
    //const userData = new userModel.User(req.body.name, req.body.username, req.body.email, req.body.password, req.body.city, req.body.country);
    let pool = await sql.connect(config);

    // check if username already exists in the database

    let checkUsername = await pool
      .request()
      .input("username", sql.NVarChar, userData.username)
      .query("SELECT username FROM dbo.users WHERE username =@username");

    if (checkUsername.recordsets[0].length !== 0) {
      res
        .status(409)
        .json(
          `Username already exists, if you already have and account please log in instead.`
        );
    } else {
      // if the username is not in the database, create new user
      let newUser = await pool.request().query(`
        INSERT INTO dbo.users (name, city, country, email, password, created_at, updated_at, username)
        VALUES(
            '${userData.name}',
            '${userData.city}',
            '${userData.country}',
            '${userData.email}',
            '${userData.password}',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP,
            '${userData.username}'
            );
            `);
      res.status(200).json(`New user created sucessfully`);
      console.log(newUser)
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
  
};



// read all users GET method
const readAllUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let users = await pool
      .request()
      .query(
        `SELECT * FROM dbo.users`
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      users.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// read user by id GET method
const readUserById = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let findUser = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT name, username, email, password, city, country FROM dbo.users WHERE id = @id"
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      findUser.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// update user PUT method
const updateUser = async (req, res) => {
  try {
    let userData = { ...req.body };
    let pool = await sql.connect(config);
    let alterUser = await pool
      .request()
      .input("id", sql.Int, userData.id)
      .input("fullName", sql.NVarChar, userData.name)
      .input("username", sql.NVarChar, userData.username)
      .input("email", sql.NVarChar, userData.email)
      .input("password", sql.NVarChar, userData.password)
      .input("city", sql.NVarChar, userData.city)
      .input("country", sql.NVarChar, userData.country)
      .query(
        `UPDATE dbo.users SET
            name = @fullName,
            username = @username,
            email = @email,
            password = @password,
            city = @city,
            country = @country, 
            updated_at = CURRENT_TIMESTAMP
            WHERE id = @id
            ;`
      );

    res.json("User updated succesfully");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// delete user DELETE method
const deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let destroyUser = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM dbo.users WHERE id = @Id");
    res.json("User has been deleted succesfully");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// ** other user operators **
// user login

const userLogin = async (req, res) => {
  try {
      let userData = { ...req.body };
      let pool = await sql.connect(config);

      let findUser = await pool
      .request()
      .input("username", sql.NVarChar, userData.username)
      .input("password", sql.NVarChar, userData.password)
      .query(
        `SELECT id FROM dbo.users WHERE dbo.users.username = @username AND dbo.users.password = @password`);
      res.send(findUser.recordsets[0]);
      
   // }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// app.get('/login', checkNotAuthenticated, (req, res) => {
//   res.render('../../../client/login.html')
// })

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/index',
//     failureRedirect: '/login',
//     //show message from passport-config
//     failureFlash: true
//     //Remember to show it in the html syntax for messages.error!!!
// }))


module.exports = {
  createUser,
  readAllUsers,
  readUserById,
  updateUser,
  deleteUser,
  userLogin,
};
