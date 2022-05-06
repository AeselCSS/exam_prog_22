// UPDATE USER
// const existingUser = JSON.parse(window.localStorage.getItem('user'));
// const url = `http://localhost:3000/users/${existingUser[0].id}`;
// console.log(url)

// document.getElementById("updateUserForm").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const name = document.getElementById("name").value;
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const city = document.getElementById("city").value;
//     const country = document.getElementById("country").value;
    
//     const user = {
//       name: name,
//       username: username,
//       email: email,
//       password: password,
//       city: city,
//       country: country,
//     }

//     fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         if (response) {
//           window.alert("success")
//         }
//       })
//       .catch(() => {
//         window.alert("oh noes! - Something went wrong.");
//       });
//   })


  // PUT request using fetch with error handling

document.getElementById("updateUserForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Find existing users id and add it to the url
    const user = JSON.parse(localStorage.getItem("user"));
    let url = `http://localhost:3000/users/`;
    // find existing userId
    const userId = user[0].id;
//     window.alert(userId);  */ for testing /*
// }); */ for testing /*
    // find new data from the update form
    const newName = document.getElementById("name").value;
    const newUsername = document.getElementById("username").value;
    const newEmail = document.getElementById("email").value;
    const newPassword = document.getElementById("password").value;
    const newCity = document.getElementById("city").value;
    const newCountry = document.getElementById("country").value;
  
    updatedUser = {
        id: userId,
        name: newName,
        username: newUsername,
        email: newEmail,
        password: newPassword,
        city: newCity,
        country: newCountry,
      };
  
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log(response);
          window.alert("User updated successfully");
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });