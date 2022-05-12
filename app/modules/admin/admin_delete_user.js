document.getElementById("delete-user-btn").addEventListener("click", (event) => {
    event.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("selectedUser"));
     //to remove the use for the DELETE DAL
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
            //remove selected user from local
            localStorage.removeItem("selectedUser");
            
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });