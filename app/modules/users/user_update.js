// UPDATE USER

document.getElementById("updateUserForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Find existing users id and add it to the url
    const user = JSON.parse(localStorage.getItem("user"));
    let url = `http://localhost:3000/users/`;
    // find existing userId
    const userId = user[0].id;
//     window.alert(userId);  /* for testing */
// }); /* for testing */

    // find new data from the update form
    const newName = document.getElementById("newname").value;
    const newUsername = document.getElementById("newusername").value;
    const newEmail = document.getElementById("newemail").value;
    const newPassword = document.getElementById("newpassword").value;
    const newCity = document.getElementById("newcity").value;
    const newCountry = document.getElementById("newcountry").value;
  
    updatedUser = {
        id: userId,
        name: newName,
        username: newUsername,
        email: newEmail,
        password: newPassword,
        city: newCity,
        country: newCountry,
      };
    //   window.alert(JSON.stringify(newUsername)) /* for testing */
    // }); /* for testing */
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
          window.alert("User updated successfully");
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });