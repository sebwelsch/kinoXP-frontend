import apiUrl from "./config";

function fetchMovies() {
    fetch(`${apiUrl}/movies/all`)
        .then(response => response.json())
        .then(movies => {
            const movieSelect = document.querySelector("#movie");
            const moviesSection = document.querySelector("#movies");

            if (!movieSelect || !moviesSection) {
                console.error("Error: Missing #movie or #movies element!");
                return;
            }

            movieSelect.innerHTML = '<option value="">Vælg en film</option>';
            moviesSection.innerHTML = "<h2>Now Showing</h2>";

            const movieGrid = document.createElement("div");
            movieGrid.classList.add("movie-grid");

            movies.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.movie_id;
                option.textContent = movie.name;
                movieSelect.appendChild(option);

                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");

                movieCard.innerHTML = `
                    <img src="${movie.cover_image}" alt="${movie.name}" class="movie-cover">
                    <div class="movie-info">
                        <h3>${movie.name}</h3>
                        <p><strong>Category:</strong> ${movie.category}</p>
                        <p><strong>Age Rating:</strong> ${movie.age_rating}+</p>
                        <p><strong>Actors:</strong> ${movie.actors}</p>
                        <p><strong>Duration:</strong> ${movie.duration} min</p>
                        <p class="movie-description">${movie.description}</p>
                    </div>
                `;

                movieGrid.appendChild(movieCard);
            });

            moviesSection.appendChild(movieGrid);
        })
        .catch(error => console.error("Fejl ved hentning af film:", error));
}

document.addEventListener("DOMContentLoaded", fetchMovies);