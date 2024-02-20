// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Your API routes will go here

app.get('/api/aircraft', (req, res) => {
    // Your logic to fetch aircraft data from DynamoDB or provide fake data
    const aircraftData = [
        { id: 1, x: 100, y: 150, speed: 2, heading: 45 },
        // Add more aircraft data
    ];

    res.json(aircraftData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

