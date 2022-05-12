// check if admin is logged in and if not redirected to the login page
document.addEventListener("DOMContentLoaded", () => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
        //If admin Id doesnt exist, then redirect to admin login
        location.href = "../../../client/admin_login.html";
    }
  }); 