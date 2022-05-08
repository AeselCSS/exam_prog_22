
// insert db response data into html select element

const url = 'http://localhost:3000/users/';
document.getElementById("user-management-btn").addEventListener("click", () => {
   fetch(url, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((output) => {
       const users = output;
       //window.alert(data);

       const adminSelectUser = document.getElementById("admin_select_user");

       for (let i = 0; i < users.length; i++) {
           let option = document.createElement("option");

           option.innerHTML = users[i].name;
           option.value = users[i].id;

           adminSelectUser.options.add(option);
       }


       })

     });