// ** DATA ACCESS LAYER **

const sql = require("mssql");
const config = require("../../config/db_config");

// ** user crud operators **

// create user POST method

const createUser = async (req, res) => {
  try {
    let userData = { ...req.body };
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
        INSERT INTO dbo.users (name, username, email, password, city, country, created_at, updated_at)
        VALUES(
            '${userData.name}',
            '${userData.username}',
            '${userData.email}',
            '${userData.password}',
            '${userData.city}',
            '${userData.country}',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
            );
            `);
      res.status(200).json(`New user created sucessfully`);
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
        "SELECT * FROM dbo.users WHERE id = @id"
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
      .input(
        "isGoldmember",
        sql.Bit,
        userData.isGoldmember
      ) /* FOR ADMIN PURPOSE */
      .query(
        `UPDATE dbo.users SET
            name = @fullName,
            username = @username,
            email = @email,
            password = @password,
            city = @city,
            country = @country,
            is_goldmember = @isGoldmember, 
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
        // check if username already exists in the database
        let checkUsername = await pool
        .request()
        .input("username", sql.NVarChar, userData.username)
        .query("SELECT username FROM dbo.users WHERE username =@username");
  
      if (checkUsername.recordsets[0].length === 0) {
        res
          .status(409)
          .json(`Username does not exist, please create a user account.`
          );
      } else {
        let findUser = await pool
        .request()
        .input("username", sql.NVarChar, userData.username)
        .query(
          "SELECT id, name, username, email, city, country, is_goldmember FROM dbo.users WHERE username = @username");
        res.send(findUser.recordsets[0]);
      }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  };


module.exports = {
  createUser,
  readAllUsers,
  readUserById,
  updateUser,
  deleteUser,
  userLogin,
};
