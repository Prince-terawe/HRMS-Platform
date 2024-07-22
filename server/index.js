const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./Database/db'); // Your MongoDB connection file
const userRoutes = require('./routes/api/index'); // Path to your user routes file

const app = express();
// Middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
