document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/theaterhalls/all")
        .then(response => response.json())
        .then(data => {
            const selectElement = document.querySelector("#theaterHallSelect");

            data.forEach(theaterHall => {
                let option = document.createElement("option");
                option.value = theaterHall.id;
                option.textContent = theaterHall.name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching theater halls:", error));
});