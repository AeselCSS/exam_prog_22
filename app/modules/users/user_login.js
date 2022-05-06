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
        window.alert("WRGONG!!!!")
      } else {
        window.alert("Du er nu logget ind")
        localStorage.setItem('user',JSON.stringify(data));
        location.href = "../../../client/index.html";
    }
  })
});


