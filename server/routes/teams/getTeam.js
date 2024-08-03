const express = require('express');
const Leave = require('../../model/leave');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const User = require('../../model/user');

const router = express.Router();

router.get('/:project', authenticate,  async (req, res) => {
    const { project } = req.params;

    try {
        // Find users where teamProject array includes the projectName
        const users = await User.find({ teamProject: { $in: [project] } });

        res.json({ msg: "Employees fetched successfully!", users });
    } catch (error) {
        console.error('Error fetching employees with project name:', error);
        res.status(500).json({ error: "Unable to fetch employee", details: error.message });
    }
});

module.exports = router;