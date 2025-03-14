const apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:8080' // Local development
    : 'kinoxp-backend-kea-hqf7bucugnanftfg.northeurope-01.azurewebsites.net'; // Production

export default apiUrl;
