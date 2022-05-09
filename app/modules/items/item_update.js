//const url = `http://localhost:3000/items/`;

document
.getElementById("updateItemForm")
.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newItemName = document.getElementById("newItemName").value;
    const newItemCategory = document.getElementById("newItemCategory").value;
    const newItemPrice = document.getElementById("newItemPrice").value;
    const newItemDescription = document.getElementById("newItemDescription").value;
    const newItemCondition = document.getElementById("newItemCondition").value;
    //Image in JSON.stringify

    // Find existing users id and add it to the url
    const item_id = JSON.parse(localStorage.getItem("selectedItem"));


//     window.alert(userId);  /* for testing */
// }); /* for testing */

    // find new data from the update form

    const imageUploaded = document.getElementById("newItemImage").files[0]//Vi skal bruge hele filen og ikke bare lokation
    const formData = new FormData() //Cloudinary bruger data payload
    formData.append("file", imageUploaded) //Laver key value pair "filter; imageUploaded (dens fil)"
    formData.append("upload_preset", "image-uploaded") //Cloudinary gemmer det i min folder "image-uploaded"

    await fetch ("https://api.cloudinary.com/v1_1/doesrkivw/image/upload", { //Virkelig ikke Best Practise!!!!
      method: "POST", //We need to await and fetch the http of our cloudinary
      body: formData,
    })
    .then(response => response.json())

    .then(async (response) => {
        //console.log(response.secure_url) Testing 
        if (response) {    
        await fetch (`http://localhost:3000/items`, {
            method: "PUT",
            headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item_id,
        item_name: newItemName,
        category: newItemCategory,
        price: newItemPrice,
        description: newItemDescription,
        condition: newItemCondition,
        image: response.secure_url
        }),
        })
      .then((response) => response.json())
          window.alert("Item updated successfully");
        }
       })
      .catch((err) => {
        window.alert(err);
      });
  });