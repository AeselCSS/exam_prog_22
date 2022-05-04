// define user class
class User {
    // properties 
    constructor(id, name, username, email, password, city, country, isGoldmember, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.city = city;
        this.country = country;
        this.isGoldmember = isGoldmember;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    //methods moved to user_services 
    }

    class Admin extends User {
      // properties
        constructor(id, name, email, password, adminRole, createdAt, updatedAt) {
            super(id, name, email, password, createdAt, updatedAt);
            this.adminRole = adminRole;
        }
       //methods moved to user_services    
    }

    module.exports = {
        User, 
        Admin
      };
