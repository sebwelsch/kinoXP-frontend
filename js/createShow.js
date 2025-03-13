document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    fetchHalls();
});

document.querySelector("#btnCreate").addEventListener("click", () => {

    const movie_id = parseInt(document.querySelector("#movie").value);
    const hall_id = parseInt(document.querySelector("#hall").value);
    const start_date = document.querySelector("#start_date").value;
    const end_date = document.querySelector("#end_date").value;
    const time = document.querySelector("#time").value;


    const data = { movie_id, hall_id, start_date, end_date, time };
    console.log("Data sendt til server:", data);


    fetch("http://localhost:8080/shows/add", {
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
});


function fetchMovies() {
    fetch("http://localhost:8080/movies/all")
        .then(response => response.json())
        .then(movies => {
            const movieSelect = document.querySelector("#movie");
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
    fetch("http://localhost:8080/halls/all")
        .then(response => response.json())
        .then(halls => {
            const hallSelect = document.querySelector("#hall");
            halls.forEach(hall => {
                const option = document.createElement("option");
                option.value = hall.hall_id;
                option.textContent = hall.name;
                hallSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Fejl ved hentning af teatersale:", error));
}
