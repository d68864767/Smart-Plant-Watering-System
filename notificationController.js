```javascript
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';

// Function to send notification
async function sendNotification(message) {
    try {
        // Here, we are assuming that you have a notification API endpoint
        // Replace '/notifications' with your actual notification API endpoint
        const response = await axios.post(`${API_BASE_URL}/notifications`, { message });
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Function to check soil moisture level and send notification if necessary
async function checkSoilMoistureLevel(plantId) {
    try {
        const plant = await axios.get(`${API_BASE_URL}/plants/${plantId}`);
        const soilMoistureLevel = plant.data.soilMoistureLevel;

        if (soilMoistureLevel < 20) {
            sendNotification(`The soil moisture level for plant ${plantId} is too low. Please water the plant.`);
        } else if (soilMoistureLevel > 80) {
            sendNotification(`The soil moisture level for plant ${plantId} is too high. Please stop watering the plant.`);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Function to check all plants' soil moisture levels
async function checkAllPlantsSoilMoistureLevels() {
    try {
        const plants = await axios.get(`${API_BASE_URL}/plants`);

        for (let plant of plants.data) {
            checkSoilMoistureLevel(plant._id);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Run the function to check all plants' soil moisture levels every hour
setInterval(checkAllPlantsSoilMoistureLevels, 60 * 60 * 1000);
```
