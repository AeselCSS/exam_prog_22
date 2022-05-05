// define user class
class Item {
    // properties 
    constructor(id, item_name, category, price, description, condition, fk_user_id, item_status_active, created_at, updated_at, image) {
        this.id = id;
        this.item_name = item_name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.condition = condition;
        this.fk_user_id = fk_user_id;
        this.item_status_active = item_status_active;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image = image;

    }
     
}
// Model exported

module.exports = Item;
