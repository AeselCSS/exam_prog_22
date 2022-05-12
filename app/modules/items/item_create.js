// ITEM SERVICES

const url = `http://localhost:3000/items/createItem`;
// CREATE ITEM


document
  .getElementById("createItemForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const item_name = document.getElementById("item_name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const condition = document.getElementById("condition").value;
    //Image in JSON.stringify

    //Use the locally stored user.id to save it to the item as a foreign key
    const user = JSON.parse(localStorage.getItem("user"));
    const itemOwner = user[0].id;


    const imageUploaded = document.getElementById("image").files[0]//Vi skal bruge hele filen og ikke bare lokation
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
        await fetch("http://localhost:3000/items/createItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ //We passe the body of the item here to be able to pass the image as secure.url
          item_name: item_name,
          category: category,
          price: price,
          description: description,
          condition: condition,
          fk_user_id: itemOwner,
          image: response.secure_url //Save secure url to database 
        }),
    })
    .then((response) => response.json())
      location.href = "../../../client/index.html";
      }
    })
    .catch((err) => {
      window.alert(err);
    });
  });



  
/* 
var object = {};
formData.forEach(function(value, key){
    object[key] = value;
});
var json = JSON.stringify(object);
   */
