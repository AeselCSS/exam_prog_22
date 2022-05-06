

   

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

// //   let data = [
// //     {
// //         "id": 1,
// //         "name": "Chris Skov Sørensen",
// //         "city": "Jyllinge",
// //         "country": "Denmark",
// //         "email": "chso21ad@student.cbs.dk",
// //         "password": "Qwerty123",
// //         "is_goldmember": true,
// //         "created_at": "2022-04-26T20:14:01.467Z",
// //         "updated_at": "2022-05-05T20:45:08.377Z",
// //         "username": "chso21ad"
// //     },
// //     {
// //         "id": 4,
// //         "name": "Jacob Ragn-Hansen",
// //         "city": "Valby",
// //         "country": "Denmark",
// //         "email": "jara21ac@student.cbs.dk",
// //         "password": "Xsw23edc",
// //         "is_goldmember": false,
// //         "created_at": "2022-04-26T21:03:24.613Z",
// //         "updated_at": "2022-04-26T21:03:24.613Z",
// //         "username": "jara21ac"
// //     },
// //     {
// //         "id": 5,
// //         "name": "Malene Gravesen",
// //         "city": "Valby",
// //         "country": "Denmark",
// //         "email": "magr21ae@student.cbs.dk",
// //         "password": "kodeord",
// //         "is_goldmember": false,
// //         "created_at": "2022-04-26T21:07:17.310Z",
// //         "updated_at": "2022-04-26T21:07:17.310Z",
// //         "username": "magr21ae"
// //     },
// //     {
// //         "id": 11,
// //         "name": "Maja Anna Ratynska",
// //         "city": "Ballerup",
// //         "country": "Denmark",
// //         "email": "mara21al@student.cbs.dk",
// //         "password": "kodeord",
// //         "is_goldmember": false,
// //         "created_at": "2022-05-02T18:44:32.547Z",
// //         "updated_at": "2022-05-02T18:44:32.547Z",
// //         "username": "mara21al"
// //     },
// //     {
// //         "id": 12,
// //         "name": "Morten",
// //         "city": "Copenhagen",
// //         "country": "Denmark",
// //         "email": "morten@morten.dk",
// //         "password": "morten",
// //         "is_goldmember": false,
// //         "created_at": "2022-05-03T20:12:33.863Z",
// //         "updated_at": "2022-05-03T20:12:33.863Z",
// //         "username": "MORTEN"
// //     },
// //     {
// //         "id": 29,
// //         "name": "Sophus Nielsen",
// //         "city": "Valby",
// //         "country": "Denmark",
// //         "email": "Sophus@Sophus",
// //         "password": "Sophus",
// //         "is_goldmember": false,
// //         "created_at": "2022-05-05T14:39:20.927Z",
// //         "updated_at": "2022-05-05T14:39:20.927Z",
// //         "username": "Sophus"
// //     }
// // ];

  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
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

  let tr = table.insertRow(-1); // TABLE ROW.

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