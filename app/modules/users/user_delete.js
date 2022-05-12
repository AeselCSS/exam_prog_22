document.getElementById("delete-user-btn").addEventListener("click", (event) => {
    event.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("user"));
    //retrieve the stored userId to delete it
    let url = `http://localhost:3000/users/${user[0].id}`;
  
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
            window.alert(`user deleted. - You will be redirected to the login page`)
            //remove the id from local storage
            localStorage.removeItem("user");
            location.href = "../../../client/login.html";
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });