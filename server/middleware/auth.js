// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require('crypto');
const User = require('../model/user'); // Adjust the path as necessary
const sendEmail = require('../utils/sendEmails');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to use your secret key
        const user = await User.findById(decoded.userId); // Assuming the token contains userId

        if (!user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        req.userId = user._id;
        req.user = user; // Optionally attach the user object to req
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication required' });
    }
};

module.exports = authenticate;
