class Admin {
    // properties
      constructor(id, name, password, adminRole, createdAt, updatedAt) {
          this.id = id;
          this.name = name;
          this.password = password;
          this.createdAt = createdAt;
          this.updatedAt = updatedAt;
          this.adminRole = adminRole;
    }
       
}
module.exports = Admin;
