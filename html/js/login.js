import apiUrl from "./config";

document.getElementById("login-button").addEventListener("click", function () {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const messageElement = document.getElementById("login-message");

    const data = {username, password};

    fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(errorText);
                });
            }
            return response.text();
        })
        .then(result => {
            messageElement.innerText = "Login Successful";
            console.log("Login Success:", result);
        })
        .catch(error => {
            messageElement.innerText = "Login Failed";
            console.error("Error:", error);
        });
});