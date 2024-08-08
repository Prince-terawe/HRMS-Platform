const express = require('express');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/:project', authenticate, async (req, res) => {
    const { project } = req.params;

    try {
        // Find users where teamProject array includes an object with the matching projectName
        const users = await User.find({ 'teamProject.projectName': project });

        res.json({ msg: "Employees fetched successfully!", users });
    } catch (error) {
        console.error('Error fetching employees with project name:', error);
        res.status(500).json({ error: "Unable to fetch employees", details: error.message });
    }
});

module.exports = router;
