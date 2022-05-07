// ITEM SERVICES
const url = `http://localhost:3000/items/`;
// CREATE ITEM


  document.getElementById("createItemForm").addEventListener("submit", async (event) => {
      event.preventDefault();

     const user = JSON.parse(localStorage.getItem("user"));
     const itemOwner = user.userId;
     const formData = new FormData(createItemForm);
     formData.append("fk_user_id", itemOwner);

     window.alert(formData.name);

  //     await fetch('http://localhost:3000/items/', {
  //         method: "POST",
  //         body: formData
  //     });
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         console.log(data);
  //         window.alert("item created successfully");
  //       }
  //     })
  //     .catch(() => {
  //       window.alert("oh noes! - Something went wrong.");
  //     });
   });
