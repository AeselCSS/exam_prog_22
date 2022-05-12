const filterCategoryValue = document.getElementById("filterCategorySelect")

document.getElementById("filterCategorySelect").addEventListener("change",() => {
         localStorage.setItem('filterValue', (filterCategoryValue.value)); 
});

document.getElementById("applyCategoryFilter").addEventListener("click", () => {
    const filterCategoryInput = localStorage.getItem("filterValue")
        //window.alert(filterCategoryInput)  
        //We will fetch the category we need to filter on in the DAL
        fetch(`http://localhost:3000/items/filter/category/${filterCategoryInput}`, {
        method: "GET", })
        .then((res) => res.json())
        .then((output) => {
        let data = output;
        console.log(data);

        // get key from jsondata, so we can use them later on
        let col = [];
        for (let i = 0; i < data.length; i++) {
          for (let key in data[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }

        // add the table
        let table = document.createElement("table");

        // add headers from keys

        let tr = table.insertRow(-1); // (-1) is adding a row to the bottom of the table

        for (let i = 0; i < col.length; i++) {
          let th = document.createElement("th");
          th.innerHTML = col[i];
          tr.appendChild(th);
        }

        // insert json data into rows and add them at the botton of the table
        for (let i = 0; i < data.length; i++) {
          tr = table.insertRow(-1);

          for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
          }
        }
        
        //add the entire table to html.
        let divContainer = document.getElementById("showSearchData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
      });
  });
