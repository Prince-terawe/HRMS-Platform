const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const generateToken = require('../../utils/generateToken');

const router = express.Router();

// Login Route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.json({ token, msg: "Login successful" });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

module.exports = router