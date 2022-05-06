// check if user is logged in and if not redirected to the login page
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        location.href = "../../../client/login.html";
    }
  });