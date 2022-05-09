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
      body: JSON.stringify(admin),
    })

      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          window.alert("Either username or password is incorrect. Please try again.")
        } else {
          localStorage.setItem('admin',JSON.stringify(data));
          location.href = "../../../client/admin_dashboard.html#statistics";
      }
    })
  });
  }); 