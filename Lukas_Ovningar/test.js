// Import necessary modules
const express = require('express');
const dbController = require('./dbController');

// Initialize the Express app
const app = express();

// Use JSON middleware
app.use(express.json());

// Define routes
app.get('/items', async (req, res) => {
    const items = await dbController.get();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = req.body;
    const createdItem = await dbController.create(newItem);
    res.json(createdItem);
});

app.put('/items/:id', async (req, res) => {
    const updatedItem = req.body;
    const id = req.params.id;
    const result = await dbController.update(id, updatedItem);
    res.json(result);
});

app.delete('/items/:id', async (req, res) => {
    const id = req.params.id;
    const result = await dbController.delete(id);
    res.json(result);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
