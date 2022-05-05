// USER SERVICES
const url = `${process.env.URL}:${process.env.PORT}/users/`;
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

    fetch(url, {
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
// USER LOGIN
  document
  .getElementById("loginForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username")
    const password = document.getElementById("password")

    const user = {
      username: username,
      password: password
    };
    fetch(url, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        if (
          username === response.username &&
          password === response.password
        ) {
          // passport logic??
          // Save login data to localstorage in order to keep user logged in
          localStorage.setItem("user", JSON.stringify(response));
          location.href = "/";
        } else {
          window.alert("Username or Password is incorrect");
        }
      } else {
        window.alert("Information are incorrect");
      }
    })
    .catch(() => {
      window.alert("oh noes! - Something went wrong.");
    });
});

/*
  
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
