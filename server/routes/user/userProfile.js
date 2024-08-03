const express = require('express');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.objectId).select('-password'); // Select user excluding password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
