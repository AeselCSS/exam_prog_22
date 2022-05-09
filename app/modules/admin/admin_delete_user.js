document.getElementById("delete-user-btn").addEventListener("click", (event) => {
    event.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("selectedUser"));
    let url = `http://localhost:3000/admin/${user}`;
    //window.alert(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
            window.alert(`user deleted.`)
            localStorage.removeItem("selectedUser");
            
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });