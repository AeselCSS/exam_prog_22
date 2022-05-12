// ADMIN logout
document.getElementById("logout-btn").addEventListener("click", () => {
  //remove admin id
    localStorage.removeItem("admin");
    location.href = "../../../client/admin_login.html";
  }); 