// define user class
class User {
    // properties 
    constructor(id, name, username,  email, password, city, country, isGoldmember, createdAt, updatedAt) {
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


      class Chair {
        constructor(name, price, tiltdegrees) {
          this.name = name;
          this.price = price;
          this.tiltdegrees = tiltdegrees;
          this.output = function () {
            // return this.name + this.price + "kroner" + this.tiltdegrees + "%"; //returns "olfert300kroner5%"
            return `name ${this.name} + price ${this.price} + tiltdegrees ${this.tiltdegrees}`; // returns "name olfert + price 300 + max tiltdegrees 5"
          };
        }
      }
      
      class ChairSubClass extends Chair {
        constructor(name, price, tiltdegrees, tilt_downwards, tilt_upwards) {
          super(name, price, tiltdegrees);
          this.tilt_downwards = tilt_downwards;
          this.tilt_upwards = tilt_upwards;
          this.actualtTiltdegree = function () {
            return `New tiltdegree of chair: ${this.tiltdegrees - this.tilt_downwards + this.tilt_upwards }%`;
          };
        }
      }
      
      const chair = new Chair("olfert", 300, 5);
      console.log(chair.output());
      
      const subchair = new ChairSubClass("Jesus", 450, 5, 45, 12);
      console.log(subchair.actualtTiltdegree());
      console.log(subchair.output());