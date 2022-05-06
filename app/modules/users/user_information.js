
const user = JSON.parse(window.localStorage.getItem('user'));
document.getElementById("user-management-btn").addEventListener("click", () => {
// window.alert(user[0].id) /*<-- for testing */
// }); /*<-- for testing */
  fetch(`http://localhost:3000/users/${user[0].id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((output) => {
      let data =output;
      console.log (data)



  // EXTRACT VALUE FOR HTML HEADER.
  
  let col = [];
  for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  let table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  let tr = table.insertRow(-1); // (-1) is adding a row to the bottom of the table

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (let i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i][col[j]];
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  let divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

});
});