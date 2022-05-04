// ** DATA ACCESS LAYER **

const sql = require("mssql");
const config = require("../../config/db_config");


// create item POST method

const createItem = async (req, res) => {
      let itemData = { ...req.body };
      let pool = await sql.connect(config);
    
      let newItem = await pool.request().query(`
          INSERT INTO dbo.items (name, category, price, image, description, condition, item_status, created_at, updated_at)
          VALUES(
              '${itemData.name}',
              '${itemData.category}',
              '${itemData.price}',
              '${itemData.image}',
              '${itemData.description}',
              '${itemData.condition}',
              '${itemData.item_status}',
              CURRENT_TIMESTAMP,
              CURRENT_TIMESTAMP
              );
              `);
        res.status(200).json(`New item created sucessfully`);
    
    if (err) {
      console.log(err);
      res.json(err);
    }
}

// read all items GET method
const readAllItems = async (req, res) => {
    try {
      let pool = await sql.connect(config);
      let items = await pool
        .request()
        .query(
          `SELECT * FROM dbo.items`
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
          "SELECT * FROM dbo.items WHERE id = @id"
        ); /* change the * to whatever data is needed to be shown */
      res.json(
        findItem.recordsets[0]
      ); /* the bracket notation ([0]) removes a set of brackets from the results */
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

// update user PUT method
const updateItem = async (req, res) => {
    try {
      let itemData = { ...req.body };
      let pool = await sql.connect(config);
      let alterItem = await pool
        .request()
        .input("id", sql.Int, itemData.id)
        .input("itemName", sql.NVarChar, itemData.name)
        .input("category", sql.NVarChar, itemData.category)
        .input("price", sql.NVarChar, itemData.price)
        .input("image", sql.VarBinary, itemData.image)
        .input("description", sql.NVarChar, itemData.description)
        .input("condition", sql.NVarChar, itemData.condition)
        .input("item_status", sql.NVarChar, itemData.item_status)
        .query(
          `UPDATE dbo.items SET
              itemName = @itemName,
              category = @category,
              price = @price,
              image = @image,
              description = @description,
              condition = @condition,
              item_status = @item_status, 
              updated_at = CURRENT_TIMESTAMP
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
      .query("DELETE FROM dbo.items WHERE id = @Id");
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
  updateItem,
  deleteItem
};



