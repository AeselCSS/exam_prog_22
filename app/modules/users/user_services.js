// USER SERVICES
const url = 'http://localhost:3000/users/';
// CREATE USER
//document.addEventListener('DOMContentLoaded', () => {

let registerBtn = document.getElementById("createUserForm");
  registerBtn.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
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
          location.href = "../../../client/login.html";
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });
//});

// // check if user is logged in and if not redirected to the login page
// document.addEventListener("DOMContentLoaded", () => {
//   const user = localStorage.getItem("user");
//   if (!user) {
//     window.location.href = "../../../client/login.html";
//   }
// });

// // USER LOGIN
// /*document.addEventListener('DOMContentLoaded', () => {
//  // For at rækkefølge af events blive udført ordentligt
//   let loginBtn = document.getElementById("loginForm");
//   loginBtn.addEventListener("submit", (event) => {
//     event.preventDefault();
//   */
 
//     document.getElementById("loginForm").addEventListener("submit", (event)=>
//     {event.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     const user = {
//       username: username,
//       password: password
//     };
//     window.alert (user);
//     fetch(`${url}login`, {
//       method: "POST",
//       header: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user)
//     })
//     .then((response) => {
//       return response.json()
//     })
//     .then((response) => {
//       if (response) {
//         username === response.username &&
//         password === response.password        
//       }
//       window.alert(response)
//       localStorage.setItem("user", JSON.stringify(response));
//       window.location.href = "../../../client/index.html";
//       console.log("success!!!!")
//     })
//     .catch(() => {
//       window.alert("Dang it! Something went wrong");
//     });
// });
// //});


// USER LOGOUT
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.clear();
});

/*
  
  updateUser() {
    console.log('user updated');
  }

  deleteUser() {
    console.log('user deleted');
  }

*/
