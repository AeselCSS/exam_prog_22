// USER SERVICES
const address = `http://localhost:3000/admins/`;
// CREATE USER
document
  .getElementById("createAdminForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const admin_role = document.getElementById("admin_role").value;

    const admin = {
      name: name,
      email: email,
      password: password,
      admin_role: admin_role,
    };

    fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          location.href = "/client/login.html";
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });

/*
updateUser(id){
    console.log('user updated');
  }

  deleteUser(id) {
    console.log('user updated');
  }

  addGoldStatus(id) {
    console.log('user status updated to GOLD');
  }

  */