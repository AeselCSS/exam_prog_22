document.getElementById("sales-items-btn").addEventListener("click", () => {
    fetch(`http://localhost:3000/items/fromUser/${user[0].id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((output) => {
        const items = output;
        //window.alert(data);
 
        const userSelectItem = document.getElementById("user_select_item");
 
        for (let i = 0; i < items.length; i++) {
            let option = document.createElement("option");
          //what is shown in the select
            option.innerHTML = items[i].Name;
            //what value is stored in the select
            option.value = items[i].id;
 
            userSelectItem.options.add(option);
 
        }
        document.getElementById("user_select_item").addEventListener("change",() => {
         //window.alert(userSelectItem.value) Testing
         localStorage.setItem('selectedItem', (userSelectItem.value)); 
      })
        })
 
      });