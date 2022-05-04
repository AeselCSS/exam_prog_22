// ITEM SERVICES
const address = `http://localhost:3000/items/`;
// CREATE ITEM
document
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


/*
  createSalesItem() {
    console.log('item listed for sale');
  }

  updateSalesItem() {
    console.log('item updated');
  }

  deleteSalesItem() {
    console.log('item is no longer listed for sale');
  }

  followSalesItem() {
    console.log('item has been added to list of followed sales items');
  }

*/