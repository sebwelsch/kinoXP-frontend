document.addEventListener("DOMContentLoaded", loadBookings);

async function loadBookings() {
    try {
        const response = await fetch("http://localhost:8080/bookings/all"); // Endpoint til at hente alle bookinger

        if (!response.ok) {
            throw new Error("Fejl ved hentning af bookinger");
        }

        const bookings = await response.json();
        const tableBody = document.querySelector("#bookingTableBody");

        tableBody.innerHTML = "";

        bookings.forEach(booking => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.booking_id}</td>
                <td>${booking.show_id}</td>
                <td>${booking.date}</td>
                <td>${booking.time}</td>
                <td>${booking.seats}</td>
                <td>${booking.customer_name}</td>
                <td>${booking.customer_email}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Fejl:", error);
        alert("Kunne ikke hente bookinger!");
    }
}
