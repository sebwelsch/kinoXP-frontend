const apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:8080' // Local development
    : 'https://your-production-url.azurewebsites.net'; // Production

export default apiUrl;
