// CHECK IF ADMIN IS ALREADY LOGGED IN
document.addEventListener("DOMContentLoaded", (e) => {
    const admin = localStorage.getItem("admin");
    if (admin) { // IF SO: REDIRECT TO ADMIN_DASHBOARD.HTML
      location.href = "../../../client/admin_dashboard.html";
    }

  // ADMIN LOGIN

      const adminLogin = document.getElementById("adminLoginForm")
      adminLogin.addEventListener("submit", (event) => {
        event.preventDefault();
//same logic as user login
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const admin = {
         name: username,
         password: password
         };

      fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //pass object as json
      body: JSON.stringify(admin),
    })

      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          //If the data given is returned empty then the user will stay at the login page and be given the window.alert() 
        //Not the best solution we know
          window.alert("Either username or password is incorrect. Please try again.")
        } else {
          //Needed to allow admin t stay logged in
          localStorage.setItem('admin',JSON.stringify(data));
          //success? redirect
          location.href = "../../../client/admin_dashboard.html#statistics";
      }
    })
  });
  }); 