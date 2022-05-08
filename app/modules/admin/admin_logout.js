// ADMIN logout
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("admin");
    location.href = "../../../client/admin_login.html";
  }); 