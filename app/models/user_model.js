// define user class
class User {
    // properties 
    constructor(id, name, city, country, email, password, isGoldmember, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.email = email;
        this.password = password;
        this.isGoldmember = isGoldmember;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    //methods 
    login() {
        console.log(`${this.name}  has just logged in`);
      }
      
      logout() {
        console.log(`${this.name} has just logged out`);
      }
  
      updateUser() {
        console.log('user updated');
      }
  
      deleteUser() {
        console.log('user deleted');
      }
  
      createSalesItem() {
        console.log('item listed for sale');
      }
  
      updateSalesItem() {
        console.log('item updated');
      }
  
      deleteSalesItem() {
        console.log('item is no longer listed for sale');
      }
  
      followSalesItem() {
        console.log('item has been added to list of followed sales items');
      }
  
    }

    class Admin extends User {
        constructor(id, name, email, password, adminRole, createdAt, updatedAt) {
            super(id, name, email, password, createdAt, updatedAt);
            this.adminRole = adminRole;
        }
        updateUser(id){
            console.log('user updated');
          }
        
          deleteUser(id) {
            console.log('user updated');
          }
        
          addGoldStatus(id) {
            console.log('user status updated to GOLD');
          }
          
        
          removeGoldStatus(id) {
            console.log('user status updated to REGULAR');
          }
    }

    module.exports = {
        User, 
        Admin
      };