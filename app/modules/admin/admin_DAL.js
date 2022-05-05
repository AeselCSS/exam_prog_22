const sql = require("mssql");
const config = require("../../config/db_config");
const adminModel = require("./../admin/admin_model");

// ** admin crud operators **

// create admin POST method

const createAdmin = async (req, res) => {
  try {
    let adminData = { ...req.body };
    //const userData = new userModel.User(req.body.name, req.body.username, req.body.email, req.body.password, req.body.city, req.body.country);
    let pool = await sql.connect(config);

    // check if username already exists in the database

    let checkAdminname = await pool
      .request()
      .input("adminname", sql.NVarChar, adminData.adminname)
      .query("SELECT name FROM dbo.admin WHERE adminname =@admin");

    if (checkAdminname.recordsets[0].length !== 0) {
      res
        .status(409)
        .json(
          `admin name already exists, if you already have and account please log in instead.`
        );
    } else {
      // if the username is not in the database, create new user
      let newAdmin = await pool.request().query(`
        INSERT INTO dbo.admin (name, email, password, admin_role, created_at, updated_at)
        VALUES(
            '${adminData.name}',
            '${adminData.email}',
            '${adminData.password}',
            '${adminData.admin_role}',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
            );
            `);
      res.status(200).json(`New admin created sucessfully`);
      
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
  
};

// read all users GET method
const readAllAdmin = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let admin = await pool
      .request()
      .query(
        `SELECT * FROM dbo.admin`
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      admin.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// read user by id GET method
const readAdminById = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let findAdmin = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT * FROM dbo.admin WHERE id = @id"
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      findAdmin.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// update user PUT method
const updateAdmin = async (req, res) => {
  try {
    let adminData = { ...req.body };
    let pool = await sql.connect(config);
    let alterUser = await pool
      .request()
      .input("id", sql.Int, adminData.id)
      .input("fullName", sql.NVarChar, adminData.name)
      .input("email", sql.NVarChar, adminData.email)
      .input("password", sql.NVarChar, adminData.password)
      .input("admin_role", sql.NVarChar, adminData.admin_role)
        
      /* FOR ADMIN PURPOSE */
      .query(
        `UPDATE dbo.admin SET
            name = @fullName,
            email = @email,
            password = @password,
            admin_role = @admin_role,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = @id
            ;`
      );

    res.json("Admin updated succesfully");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// delete user DELETE method
const deleteAdmin = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let destroyAdmin = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM dbo.admin WHERE id = @Id");
    res.json("Admin has been deleted succesfully");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// ** other user operators **
// user login

const adminLogin = async (req, res) => {
    try {
        let adminData = { ...req.body };
        let pool = await sql.connect(config);
        // check if username already exists in the database
        let checkAdminname = await pool
        .request()
        .input("adminname", sql.NVarChar, userData.username)
        .query("SELECT name FROM dbo.admin WHERE name =@name");
  
      if (checkAdminname.recordsets[0].length === 0) {
        res
          .status(409)
          .json(`Admin name does not exist, please create a admin account.`
          );
      } else {
        let findAdmin = await pool
        .request()
        .input("name", sql.NVarChar, adminData.adminname)
        .query(
          "SELECT id, name, email, admin_role FROM dbo.admin WHERE name = @name");
        res.send(findUser.recordsets[0]);
      }
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
  createAdmin,
  readAllAdmin,
  readAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
};
