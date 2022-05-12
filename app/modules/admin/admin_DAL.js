const sql = require("mssql");
const config = require("../../config/db_config");
const adminModel = require("./../admin/admin_model");

// admin update user PUT method
const adminUpdateUser = async (req, res) => {
  try {
    let userData = { ...req.body };
    //We need to await the connection first in the asynchronic function
    let pool = await sql.connect(config);
    //connection first
    let alterUser = await pool
      .request()
      .input("id", sql.Int, userData.id)
      .input("name", sql.NVarChar, userData.name)
      .input("username", sql.NVarChar, userData.username)
      .input("email", sql.NVarChar, userData.email)
      .input("password", sql.NVarChar, userData.password)
      .input("city", sql.NVarChar, userData.city)
      .input("country", sql.NVarChar, userData.country)
      .input("is_goldmember", sql.Bit, userData.isGoldmember)
      .query(
        `UPDATE dbo.users SET
            name = @name,
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
  
// admin statistics
// total amount of users

const numberOfUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let users = await pool
      .request()
      .query(
        ` SELECT
            count(*) as "Total number of users"
          FROM 
            dbo.users;
        `
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      users.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
// total amount of listings
const numberOfListings = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let listings = await pool
      .request()
      .query(
        ` SELECT
            count(*) as "Total number of listings"
          FROM 
            dbo.sales_items;
        `
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      listings.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
//listings per user
const listingsPerUser = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let listingPerUser = await pool
      .request()
      .query(
        ` SELECT
            dbo.users.name AS "User",
            Count(dbo.sales_items.id) AS "Number of listings"
          FROM
            dbo.users
          JOIN
            dbo.sales_items ON dbo.users.id = dbo.sales_items.fk_user_id
          GROUP BY 
            dbo.users.name;
        `
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      listingPerUser.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};


module.exports = {
  adminUpdateUser,
  adminDeleteUser,
  adminLogin,
  numberOfUsers,
  numberOfListings,
  listingsPerUser
};