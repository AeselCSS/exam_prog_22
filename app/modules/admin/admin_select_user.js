
// insert db response data into html select element as options

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

           //what is shown
           option.innerHTML = users[i].Name;
           //What the value is for the select option
           option.value = users[i].User_Id;

           adminSelectUser.options.add(option);

           //window.alert(option.value)

       }
       document.getElementById("admin_select_user").addEventListener("change",() => {
         //store value
        localStorage.setItem('selectedUser',(adminSelectUser.value)); 
        //window.alert(adminSelectUser.value)
     })
       })
       
     });

     