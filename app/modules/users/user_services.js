// USER SERVICES
const address = `http://localhost:3000/users/`;
// CREATE USER
document
  .getElementById("createUserForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;

    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      city: city,
      country: country,
    };

    fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
login() {
    console.log(`${this.name} has just logged in`);
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

*/
