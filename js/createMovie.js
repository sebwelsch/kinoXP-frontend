// fetch categories from enums in backend
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/movies/categories")
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
    const form = document.querySelector("#movieForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;
        const age_rating = document.querySelector("#age_rating").value;
        const category = document.querySelector("#category").value;
        const actors = document.querySelector("#actors").value;
        const duration = document.querySelector("#duration").value;
        const cover_image = document.querySelector("#cover_image").files[0];

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("age_rating", age_rating);
        formData.append("category", category);
        formData.append("actors", actors);
        formData.append("duration", duration);
        formData.append("cover_image", cover_image);

        fetch("http://localhost:8080/movies/add", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("Movie added successfully", data);
            })
            .catch(error => {
                console.error("Error adding movie:", error);
            });
    });
});
