// ITEM SERVICES
const url = `http://localhost:3000/items/`;
// CREATE ITEM
/*document
  .getElementById("createItemForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    const condition = document.getElementById("condition").value;

    const item = {
      name: name,
      category: category,
      price: price,
      image: image,
      description: description,
      condition: condition
    };

    fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          location.href = "/client/index.html";
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });
*/

  let createItemForm = document.getElementById("createItemForm");
  createItemForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      const user = JSON.parse(localStorage.getItem("user"));
      const itemOwner = user.userId;
      const formData = new FormData(createItemForm);
      formData.append("fk_user_id", itemOwner);

      await fetch('http://localhost:3000/items/', {
          method: "POST",
          body: formData
      });
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          window.alert("item created successfully");
        }
      })
      .catch(() => {
        window.alert("oh noes! - Something went wrong.");
      });
  });
