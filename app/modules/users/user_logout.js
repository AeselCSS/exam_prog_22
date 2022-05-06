// USER logout
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    location.href = "../../../client/login.html";
  });