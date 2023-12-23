```javascript
const axios = require('axios');

// Define the API key and base URL for the weather API
const API_KEY = 'your_API_KEY';
const BASE_URL = 'http://api.weatherapi.com/v1';

// Function to get the current weather data for a given location
async function getCurrentWeather(location) {
    try {
        const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch weather data: ${error}`);
    }
}

// Function to get the forecast weather data for a given location
async function getForecastWeather(location) {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch weather data: ${error}`);
    }
}

module.exports = {
    getCurrentWeather,
    getForecastWeather
};
```

