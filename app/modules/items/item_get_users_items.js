//Link til tabel: "https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm"


//user = JSON.parse(window.localStorage.getItem('user'));

document.getElementById("sales-items-btn").addEventListener("click", () => {
//  window.alert(user[0].id) /*<-- for testing */
//  }); /*<-- for testing */
  fetch(`http://localhost:3000/items/fromUser/${user[0].id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((output) => {
      let data = output;
      console.log (data)
      
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
      // Make the last cell an ancher, clickable
    }
  }

  //add the entire table to html.
  let divContainer = document.getElementById("showUserItems");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

});
});