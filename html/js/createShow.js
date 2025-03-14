import apiUrl from "./config";

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    fetchHalls();

    document.querySelector("#createShowForm").addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();

    const movie_id = parseInt(document.querySelector("#movie").value);
    const hallId = parseInt(document.querySelector("#hall").value);
    const start_date = document.querySelector("#start_date").value;
    const end_date = document.querySelector("#end_date").value;
    const time = document.querySelector("#time").value;

    const data = {movie_id, hallId, start_date, end_date, time};

    fetch(`${apiUrl}/shows/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log("Show oprettet:", result);
            alert("Show oprettet!");
            document.querySelector("#createShowForm").reset();
        })
        .catch(error => {
            console.error("Fejl:", error);
            alert("Fejl ved oprettelse af show");
        });
}

function fetchMovies() {
    fetch(`${apiUrl}/movies/all`)
        .then(response => response.json())
        .then(movies => {
            const movieSelect = document.querySelector("#movie");
            movieSelect.innerHTML = '<option value="">Vælg en film</option>';
            movies.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.movie_id;
                option.textContent = movie.name;
                movieSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Fejl ved hentning af film:", error));
}

function fetchHalls() {
    fetch(`${apiUrl}/theaterhalls/all`)
        .then(response => response.json())
        .then(halls => {
            const hallSelect = document.querySelector("#hall");
            hallSelect.innerHTML = '<option value="">Vælg en sal</option>';
            halls.forEach(hall => {
                const option = document.createElement("option");
                option.value = hall.hall_id;
                option.textContent = hall.name;
                hallSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Fejl ved hentning af teatersale:", error));
}
