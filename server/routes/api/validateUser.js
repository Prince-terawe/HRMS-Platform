const express = require('express');
const User = require('./../../model/user');

const router = express.Router();

router.post('/validate', async (req, res) => {
    const { username, email, userId } = req.body;

    try {
        let errors = {};

        if (username) {
            const userWithUsername = await User.findOne({ username });
            if (userWithUsername) {
                errors.username = 'Username already exists';
            }
        }

        if (email) {
            const userWithEmail = await User.findOne({ email });
            if (userWithEmail) {
                errors.email = 'Email already exists';
            }
        }

        if (userId) {
            const userWithUserId = await User.findOne({ userId });
            if (userWithUserId) {
                errors.userId = 'User ID already exists';
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        res.json({ msg: "All fields are unique" });
    } catch (error) {
        console.error('Error during validation:', error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

module.exports = router;
