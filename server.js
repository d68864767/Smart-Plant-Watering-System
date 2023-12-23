```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the database configuration
const dbConfig = require('./database.js');

// Create an Express app
const app = express();

// Use body-parser middleware to handle JSON data
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Connect to the MongoDB database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Smart Plant Watering System."});
});

// Require plant data routes
require('./app.js')(app);

// Listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
```
