// define user class
class Item {
    // properties 
    constructor(id, name, category, price, image, description, condition, owner, itemStatus, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
        this.description = description;
        this.condition = condition;
        this.owner = owner;
        this.itemStatus = itemStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
     
}
// Model exported

module.exports = Item;
