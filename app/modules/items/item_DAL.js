// ** DATA ACCESS LAYER **

const sql = require("mssql");
const config = require("../../config/db_config");
const itemModel = require("./../items/item_model");



// create item POST method

const createItem = async (req, res) => {
  let itemData = { ...req.body };
  // let imageData = { ...req.file}
  //const itemData = new itemModel(req.body.itemName, req.body.category, req.body.price, req.body.image, req.body.description, req.body.condition);
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
          `SELECT * FROM dbo.sales_items`
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
          "SELECT * FROM dbo.sales_items WHERE id = @id"
        ); /* change the * to whatever data is needed to be shown */
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
      `SELECT id, item_name AS name, category, price, description, condition, fk_user_id, created_at AS created, image 
      FROM dbo.sales_items WHERE fk_user_id = @fk_user_id`
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

module.exports = {
  createItem,
  readAllItems,
  readItemById,
  readItemByUser,
  updateItem,
  deleteItem
};



