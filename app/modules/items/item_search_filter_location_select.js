document.getElementById("search").addEventListener("click", () => {
    fetch(`http://localhost:3000/items/filter/getdistloc`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((output) => {
        const items = output;


        const filterLocation = document.getElementById("filterLocationSelect");

        for (let i = 0; i < items.length; i++) {
            let option = document.createElement("option");
            //to show all the locations stored

            option.innerHTML = items[i].Location;
            option.value = items[i].Location;

            filterLocation.options.add(option);

        }
        //window.alert(filterLocation[1].value);

    // //     document.getElementById("NOPE").addEventListener("change",() => {
    // //      //window.alert(filterLocation.value) Testing
    // //      localStorage.setItem('selectedLocation', (filterLocation.value)); 
    // //   })
         })

      });