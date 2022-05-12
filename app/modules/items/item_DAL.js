// ** DATA ACCESS LAYER **

const sql = require("mssql");
const config = require("../../config/db_config");
const itemModel = require("./../items/item_model");



// create item POST method

const createItem = async (req, res) => {
  let itemData = { ...req.body };
//We need to await the connection first in the asynchronic function
  let pool = await sql.connect(config);
  let newItem = await pool.request().query(`
      INSERT INTO dbo.sales_items (item_name, category, price, description, condition, fk_user_id, created_at, updated_at, image)
      VALUES(
          '${itemData.item_name}',
          '${itemData.category}',
          '${itemData.price}',
          '${itemData.description}',
          '${itemData.condition}',
          '${itemData.fk_user_id}',
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP,
          '${itemData.image}'
          );
          `);
    res.status(200).json(`New item created sucessfully`);

}

// read all items GET method
const readAllItems = async (req, res) => {
    try {
      let pool = await sql.connect(config);
      let items = await pool
        .request()
        .query(
          `SELECT
          dbo.sales_items.id AS "ItemID",
          dbo.sales_items.item_name AS "Item Name",
          dbo.sales_items.category AS "Category",
          dbo.sales_items.price AS "Price",
          dbo.sales_items.condition AS "Condition",
          dbo.users.name AS "Seller",
          dbo.users.city AS "Location",
          dbo.users.country AS "Country",
          FORMAT (sales_items.created_at, 'dd.MM.yyyy') as 'Created date'
      
          FROM dbo.sales_items
          JOIN dbo.users
          ON sales_items.fk_user_id = dbo.users.id
          ORDER BY dbo.users.is_goldmember DESC`
        ); /* change the * to whatever data is needed to be shown */
      res.json(
        items.recordsets[0]
      ); /* the bracket notation ([0]) removes a set of brackets from the results */
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

// read item by id GET method
const readItemById = async (req, res) => {
    let id = req.params.id;
    try {
      let pool = await sql.connect(config);
      let findItem = await pool
        .request()
        .input("id", sql.Int, id)
        .query(
          `SELECT
          dbo.sales_items.id AS "ItemID",
          dbo.sales_items.item_name AS "Item Name",
          dbo.sales_items.category AS "Category",
          dbo.sales_items.price AS "Price",
          dbo.sales_items.condition AS "Condition",
          dbo.users.name AS "Seller",
          dbo.users.city AS "Location",
          dbo.users.country AS "Country",
          FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'
          FROM dbo.sales_items
          JOIN dbo.users
          ON sales_items.fk_user_id = dbo.users.id
          WHERE dbo.sales_items.id = @id` 
        );
      res.json(
        findItem.recordsets[0]
      ); /* the bracket notation ([0]) removes a set of brackets from the results */
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

const readItemByUser = async (req, res) => {
  let userId = req.params.id;
  try {
    let pool = await sql.connect(config);
    let findUserItems = await pool
    .request()
    .input("fk_user_id", sql.Int, userId)
    .query(
      `SELECT
      dbo.sales_items.id,
      dbo.sales_items.item_name AS "Name",
      dbo.sales_items.category AS "Category",
      dbo.sales_items.price AS "Price",
      dbo.sales_items.condition AS "Condition",
      FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'
      FROM dbo.sales_items
      WHERE fk_user_id = @fk_user_id;`
    );
    res.json(
      findUserItems.recordsets[0]
      );
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// update user PUT method
const updateItem = async (req, res) => {
    try {
      let itemData = { ...req.body };
      //console.log(itemData); <-- For dev purpose only
      let pool = await sql.connect(config);
      let alterItem = await pool
        .request()
        .input("id", sql.Int, itemData.id)
        .input("item_name", sql.NVarChar, itemData.item_name)
        .input("category", sql.NVarChar, itemData.category)
        .input("price", sql.Int, itemData.price)
        .input("description", sql.NVarChar, itemData.description)
        .input("condition", sql.NVarChar, itemData.condition)
        .input("image", sql.NVarChar, itemData.image)
        .query(
          `UPDATE dbo.sales_items SET
              item_name = @item_name,
              category = @category,
              price = @price,
              description = @description,
              condition = @condition,
              updated_at = CURRENT_TIMESTAMP,
              image = @image
              WHERE id = @id
              ;`
        );
  
      res.json("Item updated succesfully");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  };

// delete item DELETE method
const deleteItem = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let destroyItem = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM dbo.sales_items WHERE id = @Id");
    res.json("Item has been deleted succesfully");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};


// filtered search

// filter by price
const filterByPrice = async (req, res) => {
  let price = req.params.price;
  try {
    let pool = await sql.connect(config);
    let filterPrice = await pool
    .request()
    .input("price", sql.Int, price)
    .query(`SELECT
      sales_items.id AS "Item ID",
      sales_items.item_name AS "Item Name",
      sales_items.category AS "Category",
      sales_items.price AS "Price",
      sales_items.condition AS "Condition",
      dbo.users.name AS "Seller",
      dbo.users.city AS "Location",
      dbo.users.country AS "Country",
      FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'
  
  FROM sales_items
  JOIN dbo.users
  ON sales_items.fk_user_id = dbo.users.id
  WHERE dbo.sales_items.price <= @price
  ORDER BY dbo.users.is_goldmember DESC`
  );
  res.json(filterPrice.recordsets[0])

  } catch (err) {
    res.json(err);
  }
};

// filter by condition
const filterByCondition = async (req, res) => {
  let condition = req.params.condition;
  try {
    let pool = await sql.connect(config);
    let filterCondition = await pool
    .request()
    .input("condition", sql.NVarChar, condition)
    .query(`SELECT
      sales_items.id AS "Item ID",
      sales_items.item_name AS "Item Name",
      sales_items.category AS "Category",
      sales_items.price AS "Price",
      sales_items.condition AS "Condition",
      dbo.users.name AS "Seller",
      dbo.users.city AS "Location",
      dbo.users.country AS "Country",
      FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'
  
  FROM sales_items
  JOIN dbo.users
  ON sales_items.fk_user_id = dbo.users.id
  WHERE dbo.sales_items.condition = @condition
  ORDER BY dbo.users.is_goldmember DESC`
  );
  res.json(filterCondition.recordsets[0])

  } catch (err) {
    res.json(err);
  }
};

// filter by location
const filterByLocation = async (req, res) => {
  let location = req.params.location;
  try {
    let pool = await sql.connect(config);
    let filterLocation = await pool
    .request()
    .input("location", sql.NVarChar, location)
    .query(`SELECT
      sales_items.id AS "Item ID",
      sales_items.item_name AS "Item Name",
      sales_items.category AS "Category",
      sales_items.price AS "Price",
      sales_items.condition AS "Condition",
      dbo.users.name AS "Seller",
      dbo.users.city AS "Location",
      dbo.users.country AS "Country",
      FORMAT (sales_items.created_at, 'MM.dd.yy') as 'Created date'
  
  FROM sales_items
  JOIN dbo.users
  ON sales_items.fk_user_id = dbo.users.id
  WHERE dbo.users.city = @location
  ORDER BY dbo.users.is_goldmember DESC`
  );
  res.json(filterLocation.recordsets[0])

  } catch (err) {
    res.json(err);
  }
};

// filter by time
const filterByTime = async (req, res) => {
  let days = req.params.days;
  try {
    let pool = await sql.connect(config);
    let filterTime = await pool
    .request()
    .input("days", sql.Int, days)
    .query(`
    SELECT
      sales_items.id AS "Item ID",
      sales_items.item_name AS "Item Name",
      sales_items.category AS "Category",
      sales_items.price AS "Price",
      sales_items.condition AS "Condition",
      dbo.users.name AS "Seller",
      dbo.users.city AS "Location",
      dbo.users.country AS "Country",
      FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'

    FROM sales_items
    JOIN dbo.users
    ON sales_items.fk_user_id = dbo.users.id
    WHERE datediff(day, sales_items.created_at, GETDATE()) <= @days;`
  );
  res.json(filterTime.recordsets[0])

  } catch (err) {
    res.json(err);
  }
};

// filter by category
const filterByCategory = async (req, res) => {
  let category = req.params.category;
  try {
    let pool = await sql.connect(config);
    let filterCategory = await pool
    .request()
    .input("category", sql.NVarChar, category)
    .query(`SELECT
      sales_items.id AS "Item ID",
      sales_items.item_name AS "Item Name",
      sales_items.category AS "Category",
      sales_items.price AS "Price",
      sales_items.condition AS "Condition",
      dbo.users.name AS "Seller",
      dbo.users.city AS "Location",
      dbo.users.country AS "Country",
      FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'
  
  FROM sales_items
  JOIN dbo.users
  ON sales_items.fk_user_id = dbo.users.id
  WHERE dbo.sales_items.category = @category
  ORDER BY dbo.users.is_goldmember DESC`
  );
  res.json(filterCategory.recordsets[0])

  } catch (err) {
    res.json(err);
  }
};


// filter distinct locations
// get locations fra users who have created an item in
const getDistinctLocation = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let distLoc = await pool
      .request()
      .query(
        ` SELECT DISTINCT
          dbo.users.city AS 'Location'
          FROM sales_items
          JOIN dbo.users
          ON sales_items.fk_user_id = dbo.users.id;
        `
      ); /* change the * to whatever data is needed to be shown */
    res.json(
      distLoc.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const getImagePath = async (req, res) => {
  let itemID = req.params.itemID;
  try {
    let pool = await sql.connect(config);
    let getImagePath = await pool
    .request()
    .input("itemID", sql.Int, itemID)
    .query(
      `SELECT
      dbo.sales_items.image AS image_path
  FROM dbo.sales_items
  WHERE dbo.sales_items.id = @itemID;`
    );
    res.json(
      getImagePath.recordsets[0]
    );
  }catch (err) {
    res.json(err);
  }
};

const followItem = async (req, res) => {
  try {
      let followData = { ...req.body };
      let pool = await sql.connect(config);

      let follow = await pool
      .request()
      .input("fk_item_id", sql.Int, followData.fk_item_id)
      .input("fk_user_id", sql.Int, followData.fk_user_id)
      .input("seller", sql.NVarChar,followData.seller)
      .query(
        `INSERT INTO
            dbo.followed_items
            (fk_item_id, fk_user_id, created_at, updated_at, seller)
         VALUES 
            (@fk_item_id, @fk_user_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @seller);
            `);
            res.json("follow established");
      
   // }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const readFollowedItems = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let findFollowedItems = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        `SELECT
        dbo.sales_items.id AS "ItemID",
        dbo.sales_items.item_name AS "Item Name",
        dbo.sales_items.category AS "Category",
        dbo.sales_items.price AS "Price",
        dbo.sales_items.condition AS "Condition",
        dbo.followed_items.seller AS "Seller",
        FORMAT (sales_items.created_at, 'dd.MM.yy') as 'Created date'
        FROM dbo.followed_items
        JOIN dbo.users
        ON dbo.followed_items.fk_user_id = dbo.users.id
        JOIN dbo.sales_items
        ON dbo.followed_items.fk_item_id = dbo.sales_items.id
        WHERE dbo.users.id = @id;` 
      );
    res.json(
      findFollowedItems.recordsets[0]
    ); /* the bracket notation ([0]) removes a set of brackets from the results */
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};


module.exports = {
  createItem,
  readAllItems,
  readItemById,
  readItemByUser,
  updateItem,
  deleteItem,
  filterByPrice,
  filterByCondition,
  filterByLocation,
  filterByTime,
  filterByCategory,
  getDistinctLocation,
  getImagePath,
  followItem,
  readFollowedItems,
};



