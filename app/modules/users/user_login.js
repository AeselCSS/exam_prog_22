// CHECK IF USER IS ALREADY LOGGED IN
document.addEventListener("DOMContentLoaded", (e) => {
  const user = localStorage.getItem("user");
  if (user) { // IF SO: REDIRECT TO INDEX.HTML
    location.href = "../../../client/index.html";
  }

// USER LOGIN

    const userLogin = document.getElementById("loginForm")
    userLogin.addEventListener("submit", (event) => {
      event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = {
       username: username,
       password: password
       };
    console.log(user);

    fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        window.alert("GET TOO THE CHOPPAAR!!!!")
      } else {
        localStorage.setItem('user',JSON.stringify(data));
        location.href = "../../../client/index.html";
    }
  })
});
});

