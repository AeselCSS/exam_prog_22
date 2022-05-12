// check if user is logged in and if not redirected to the login page
//use DOMContentLoaded when we dont use a specific ID to add an eventListener
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        location.href = "../../../client/login.html";
    }
  });