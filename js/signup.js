document.getElementById("signup-button").addEventListener("click", function() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const messageElement = document.getElementById("signup-message");

    const data = { username, password };

    fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => { throw new Error(errorText); });
            }
            return response.text();
        })
        .then(result => {
            messageElement.innerText = "Success";
            console.log("Response Success:", result);
        })
        .catch(error => {
            messageElement.innerText = "Failed";
            console.error("Error:", error);
        });
});