// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
};

module.exports = generateToken;