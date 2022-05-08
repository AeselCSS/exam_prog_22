const sql = require("mssql");
const config = require("../../config/db_config");
const adminModel = require("./../admin/admin_model");

// ** admin crud operators **

// read all admins GET method
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

// read admin by id GET method
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

// admin login

  const adminLogin = async (req, res) => {
    try {
        let adminData = { ...req.body };
        let pool = await sql.connect(config);
  
        let authAdmin = await pool
        .request()
        .input("name", sql.NVarChar, adminData.name)
        .input("password", sql.NVarChar, adminData.password)
        .query(
          `SELECT id, admin_role FROM dbo.admin WHERE dbo.admin.name = @name AND dbo.admin.password = @password`);
        res.send(authAdmin.recordsets[0]);
        
     // }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  };
  


module.exports = {
  readAllAdmin,
  readAdminById,
  adminLogin,
};