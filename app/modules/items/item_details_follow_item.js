document.getElementById("follow-item-btn").addEventListener('click', (event) => {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = JSON.stringify(user[0].id)
    const item = localStorage.getItem("selectedItemId");
    const seller = JSON.parse(localStorage.getItem("seller"));
    const url = `http://localhost:3000/items/follow`


    const followPayload = {
        fk_item_id: item,
        fk_user_id: userId,
        seller: seller,    
    };
      //window.alert(JSON.stringify(followPayload)); // <-- for debugging

    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(followPayload),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            window.alert("You are now following this item");
          }
        })
        .catch(() => {
          window.alert("oh noes! - Something went wrong.");
        });


})