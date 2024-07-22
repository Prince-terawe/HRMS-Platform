<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Database/db'); // Your MongoDB connection file
const userRoutes = require('./routes/api/user');
// Path to your user routes file
=======
const http = require('http');
const {connectDb} = require('./Database/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

>>>>>>> 0a9a24e12eb6058b11f01840f79df4792cf996d8

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});