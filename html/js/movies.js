import apiUrl from "./config.js";

document.addEventListener("DOMContentLoaded", fetchMovies);

async function fetchMovies() {
    try {
        const response = await fetch(`${apiUrl}/movies/all`);
        const movies = await response.json();

        console.log("Fetched movies:", movies);

        if (!Array.isArray(movies)) {
            throw new Error("Expected an array but got something else.");
        }

        const tableBody = document.querySelector("#movieTableBody");

        tableBody.innerHTML = "";

        if (movies.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6'>No movies available.</td></tr>";
            return;
        }

        movies.forEach(movie => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${movie.name}</td>
                <td>${movie.category}</td>
                <td>${movie.age_rating}+</td>
                <td>${movie.duration} min</td>
                <td><button class="delete-btn" data-id="${movie.movie_id}">Delete</button></td>
            `;

            tableBody.appendChild(row);

            // Add event listener to delete button
            const deleteButton = row.querySelector(".delete-btn");
            deleteButton.addEventListener("click", async () => {
                await deleteMovie(movie.movie_id);
            });
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Could not fetch movies.");
    }
}