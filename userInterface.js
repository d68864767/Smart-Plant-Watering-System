```javascript
// Import necessary modules
const axios = require('axios');
const inquirer = require('inquirer');

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:3000';

// Function to get all plants
async function getAllPlants() {
    try {
        const response = await axios.get(`${API_BASE_URL}/plants`);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Function to get a single plant by ID
async function getPlantById(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/plants/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Function to delete a plant by ID
async function deletePlantById(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/plants/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Function to update a plant by ID
async function updatePlantById(id, data) {
    try {
        const response = await axios.put(`${API_BASE_URL}/plants/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Function to display the main menu
async function mainMenu() {
    const choices = ['View all plants', 'View a specific plant', 'Update a plant', 'Delete a plant', 'Exit'];
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices
        }
    ]);

    switch (action) {
        case 'View all plants':
            const plants = await getAllPlants();
            console.log(plants);
            break;
        case 'View a specific plant':
            const { id } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Enter the ID of the plant:'
                }
            ]);
            const plant = await getPlantById(id);
            console.log(plant);
            break;
        case 'Update a plant':
            const { updateId, title, content } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'updateId',
                    message: 'Enter the ID of the plant to update:'
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the new title for the plant:'
                },
                {
                    type: 'input',
                    name: 'content',
                    message: 'Enter the new content for the plant:'
                }
            ]);
            const updatedPlant = await updatePlantById(updateId, { title, content });
            console.log(updatedPlant);
            break;
        case 'Delete a plant':
            const { deleteId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'deleteId',
                    message: 'Enter the ID of the plant to delete:'
                }
            ]);
            const deletedPlant = await deletePlantById(deleteId);
            console.log(deletedPlant);
            break;
        case 'Exit':
            process.exit();
    }

    // Show the main menu again
    mainMenu();
}

// Start the application
mainMenu();
```

