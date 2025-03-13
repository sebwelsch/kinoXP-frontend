const API_URL = "./config";

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const message = await response.text();
    document.getElementById("login-message").innerText = message;

    if (response.ok) {
        alert("Login successful!");
    }
}