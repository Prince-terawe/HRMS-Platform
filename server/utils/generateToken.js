// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (empId) => {
    return jwt.sign({ empId }, process.env.JWT_SECRET, { expiresIn: '12h' }); // Adjust expiration as needed
};

module.exports = generateToken;
