document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

document.querySelector("#movie").addEventListener("change", (event) => {
    const movieId = event.target.value;
    if (movieId) {
        fetchDates(movieId);
    } else {
        resetDropdown("#date");
        resetDropdown("#time");
        document.querySelector("#seats").disabled = true;
    }
});

document.querySelector("#date").addEventListener("change", (event) => {
    const movieId = document.querySelector("#movie").value;
    const date = event.target.value;
    if (date) {
        fetchTimes(movieId, date);
    } else {
        resetDropdown("#time");
        document.querySelector("#seats").disabled = true;
    }
});

document.querySelector("#time").addEventListener("change", () => {
    document.querySelector("#seats").disabled = false;
    document.querySelector("#btnBook").disabled = false;
});

document.querySelector("#btnBook").addEventListener("click", () => {
    const show_id = parseInt(document.querySelector("#time").value);
    const seats = parseInt(document.querySelector("#seats").value);
    const customer_name = document.querySelector("#customer_name").value;
    const customer_email = document.querySelector("#customer_email").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time option:checked").textContent;

    const data = {show_id, time, seats, date, customer_name, customer_email};

    fetch("http://localhost:8080/bookings/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log("Booking oprettet:", result);
            alert("Billetter er booket!");
            document.querySelector("#sellTicketForm").reset();
        })
        .catch(error => {
            console.error("Fejl:", error);
            alert("Fejl ved booking af billetter");
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


function fetchDates(movieId) {
    fetch(`http://localhost:8080/shows/dates?movie_id=${movieId}`)
        .then(response => response.json())
        .then(dates => {
            resetDropdown("#date");
            const dateSelect = document.querySelector("#date");
            dateSelect.disabled = false;
            dates.forEach(date => {
                const option = document.createElement("option");
                option.value = date;
                option.textContent = date;
                dateSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Fejl ved hentning af datoer:", error));
}


function fetchTimes(movieId, date) {
    fetch(`http://localhost:8080/shows/times?movie_id=${movieId}&date=${date}`)
        .then(response => response.json())
        .then(times => {
            resetDropdown("#time");
            const timeSelect = document.querySelector("#time");
            timeSelect.disabled = false;
            times.forEach(show => {
                const option = document.createElement("option");
                option.value = show.show_id;
                option.textContent = show.time;
                timeSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Fejl ved hentning af tidspunkter:", error));
}


function resetDropdown(selector) {
    const select = document.querySelector(selector);
    select.innerHTML = '<option value="">Vælg en mulighed</option>';
    select.disabled = true;
}
