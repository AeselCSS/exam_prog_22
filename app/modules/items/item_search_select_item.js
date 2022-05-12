
document.getElementById("search-btn").addEventListener("click", () => {
    fetch(`http://localhost:3000/items/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((output) => {
        const items = output;
        //window.alert(items[0].ItemID);
 
        const searchSelectItem = document.getElementById("select_searched_item");
 
        for (let i = 0; i < items.length; i++) {
            let option = document.createElement("option");
            //what is show in select
            option.innerHTML = items[i].ItemID;
            //what value is stored in the select
            option.value = items[i].ItemID;
 
            searchSelectItem.options.add(option);
 
        }
        document.getElementById("select_searched_item").addEventListener("change",() => {
         //window.alert(searchSelectItem.value) Testing
         localStorage.setItem('selectedItemId', (searchSelectItem.value)); 
      })
        });
 
      });