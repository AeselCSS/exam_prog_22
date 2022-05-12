document.getElementById("select_searched_item_submit").addEventListener("click", () => {

    const itemImg = JSON.parse(localStorage.getItem("selectedItemId"));
    //The image url from the local storage
    let url = `http://localhost:3000/items/details/${itemImg}`;

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((output) => {
        let data = output;
        
    let image = data[0].image_path;

    const showImg = document.getElementById("showItemImage")
    //innerHTMl to show image
    showImg.innerHTML = `
    <iframe src="${image}">
    `   
    })
    });