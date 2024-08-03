// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (empId) => {
    return jwt.sign({ empId }, process.env.JWT_SECRET, { expiresIn: '12d' }); // Adjust expiration as needed
};

module.exports = generateToken;
