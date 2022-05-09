const sql = require("mssql");
const config = require("../../config/db_config");
const adminModel = require("./../admin/admin_model");

// admin update user PUT method
const adminUpdateUser = async (req, res) => {
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
      .input("is_goldmember", sql.Bit, userData.isGoldmember)
      .query(
        `UPDATE dbo.users SET
            name = @fullName,
            username = @username,
            email = @email,
            password = @password,
            city = @city,
            country = @country,
            is_goldmember = @is_goldmember, 
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

// admin delete user DELETE method
const adminDeleteUser = async (req, res) => {
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
  adminUpdateUser,
  adminDeleteUser,
  adminLogin,
};