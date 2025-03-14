import apiUrl from "./config.js";

function fetchMovies() {
    fetch(`${apiUrl}/movies/all`)
        .then(response => response.json())
        .then(movies => {
            console.log("Fetched movies:", movies); // Log response

            if (!Array.isArray(movies)) {
                throw new Error("Expected an array but got something else.");
            }

            const moviesSection = document.querySelector("#movie-list");

            if (movies.length === 0) {
                moviesSection.innerHTML = "<p>No movies currently available.</p>";
                return;
            }

            movies.forEach(movie => {
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

                moviesSection.appendChild(movieCard);
            });
        })
        .catch(error => console.error("Error fetching movies:", error));
}

document.addEventListener("DOMContentLoaded", fetchMovies);
