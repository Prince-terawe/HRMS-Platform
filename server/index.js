const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./Database/db'); // Your MongoDB connection file
const userRoutes = require('./routes/user/index'); // Path to your user routes file
const leaveRoutes = require('./routes/leaveApi/index');
const authentication = require('./routes/Authentication/index');

const app = express();

// Set CSP headers to allow connections to localhost
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5000");
    next();
});

// Middleware
app.use(cors()); // Ensure CORS is enabled before routes
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/leaveApi/leaves', leaveRoutes);
app.use('/api/authentication', authentication);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
