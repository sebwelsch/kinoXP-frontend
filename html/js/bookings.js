import apiUrl from "./config.js";

document.addEventListener("DOMContentLoaded", loadBookings);

async function loadBookings() {
    try {
        const response = await fetch(`${apiUrl}/bookings/all`); // Endpoint til at hente alle bookinger

        if (!response.ok) {
            throw new Error("Fejl ved hentning af bookinger");
        }

        const bookings = await response.json();
        const tableBody = document.querySelector("#bookingTableBody");

        tableBody.innerHTML = "";

        bookings.forEach(booking => {
            const row = document.createElement("tr");
            row.setAttribute('data-id', booking.booking_id);
            row.innerHTML = `
                <td>${booking.booking_id}</td>
                <td>${booking.date}</td>
                <td>${booking.time}</td>
                <td>${booking.seats}</td>
                <td>${booking.customer_name}</td>
                <td>${booking.customer_email}</td>
                <td><button class="delete-btn" onclick="deleteBooking(${booking.booking_id})">Slet</button></td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Fejl:", error);
        alert("Kunne ikke hente bookinger!");
    }
}

function deleteBooking(bookingId) {
    const row = document.querySelector(`tr[data-id="${bookingId}"]`);
    if (row) {
        row.remove();
    }
    console.log(`Booking med ID ${bookingId} er blevet slettet.`);
}
