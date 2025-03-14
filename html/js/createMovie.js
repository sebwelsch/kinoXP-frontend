import apiUrl from "./config.js";

// fetch categories from enums in backend
document.addEventListener("DOMContentLoaded", function () {
    fetch(`${apiUrl}/movies/categories`)
        .then(response => response.json())
        .then(data => {
            const selectElement = document.querySelector("#categorySelect");

            data.forEach(category => {
                let option = document.createElement("option");
                option.value = category;
                option.textContent = category.replace("_", " "); // Change underscore to spaces in enums
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching the movie categories", error));
});

// send movie data to backend
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#createMovieForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevents default get request

        const movie = {
            name: document.querySelector("#name").value,
            description: document.querySelector("#description").value,
            age_rating: parseInt(document.querySelector("#age_rating").value, 10),
            category: document.querySelector("#categorySelect").value,
            actors: document.querySelector("#actors").value,
            duration: parseInt(document.querySelector("#duration").value, 10),
            cover_image: "/resources/img"
        };

        fetch(`${apiUrl}/movies/ad`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        })
            .then(response => response.json())
            .then(result => {
                console.log("Movie added successfully", result);
            })
            .catch(error => {
                console.error("Error adding movie", error);
            });
    });

});
