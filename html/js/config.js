const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:8080/user"  // Local API
    : "https://yourazureapi.com/user"; // Azure API

export default API_URL;