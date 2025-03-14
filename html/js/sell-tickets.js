import apiUrl from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();

    document.querySelector("#movie").addEventListener("change", (event) => {
        const movieId = event.target.value;
        if (movieId) {
            fetchDates(movieId);
        } else {
            resetDropdown("#date");
            resetDropdown("#time");
        }
    });

    document.querySelector("#date").addEventListener("change", (event) => {
        const date = event.target.value;
        const movieId = document.querySelector("#movie").value;
        if (date) {
            fetchTimes(movieId, date);
        } else {
            resetDropdown("#time");
        }
    });

    document.querySelector("#time").addEventListener("change", () => {
        document.querySelector("#seats").disabled = false;
        document.querySelector("#btnBook").disabled = false;
    });

    document.querySelector("#btnBook").addEventListener("click", () => {
        const data = {
            showId: document.querySelector("#time").value,
            seats: document.querySelector("#seats").value,
            customer_name: document.querySelector("#customer_name").value,
            customer_email: document.querySelector("#customer_email").value,
            date: document.querySelector("#date").value,
            time: document.querySelector("#time option:checked").textContent
        };
        fetch(`${apiUrl}/bookings/book`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(() => {
                alert("Billetter er booket!");
                document.querySelector("#sellTicketForm").reset();
            })
            .catch(() => alert("Fejl ved booking af billetter"));
    });
});

function fetchMovies() {
    fetch(`${apiUrl}/movies/all`)
        .then(response => response.json())
        .then(movies => {
            const movieSelect = document.querySelector("#movie");
            movies.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.movie_id;
                option.textContent = movie.name;
                movieSelect.appendChild(option);
            });
        });
}

function fetchDates(movieId) {
    fetch(`${apiUrl}/shows/dates?movie_id=${movieId}`)
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
        });
}

function fetchTimes(movieId, date) {
    fetch(`${apiUrl}/shows/times?movie_id=${movieId}&date=${date}`)
        .then(response => response.json())
        .then(times => {  // Now times is an array of strings
            resetDropdown("#time");
            const timeSelect = document.querySelector("#time");
            timeSelect.disabled = false;
            times.forEach(time => {
                const option = document.createElement("option");
                option.value = time;  // Use the time as the value
                option.textContent = time;  // Display the time as text
                timeSelect.appendChild(option);
            });
        })
        .catch(err => console.error('Error fetching times:', err));
}

function resetDropdown(selector) {
    const select = document.querySelector(selector);
    select.innerHTML = '<option value="">Vælg en mulighed</option>';
    select.disabled = true;
}
