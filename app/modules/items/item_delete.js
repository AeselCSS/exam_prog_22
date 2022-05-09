document.getElementById("delete-item-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const item_id = JSON.parse(localStorage.getItem("selectedItem"));
    let url = `http://localhost:3000/items/${item_id}`;
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
            window.alert(`Item deleted.`)
            localStorage.removeItem("selectedItem");

        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  }); 