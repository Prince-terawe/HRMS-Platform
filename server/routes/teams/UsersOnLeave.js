const express = require('express');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const Leave = require('../../model/leave');
const User = require('../../model/user');

const router = express.Router();

router.get('/:projectName', authenticate, checkPermission(['viewAny', 'viewTeam']), async (req, res) => {
    const { projectName } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure the comparison is done at the start of the day

    try {
        // Find all leaves that are currently active
        const leaves = await Leave.find({
            startDate: { $lte: today },
            endDate: { $gte: today },
            status: 'approved'
        }).populate({
            path: 'userId', // Ensure this matches your Leave model
            match: { 'teamProject.projectName': projectName }, // Query for projectName in teamProject array
            select: 'empname email teamProject'
        }).exec();

        // Create a unique list of users
        const uniqueUsersSet = new Set();
        const users = [];

        leaves.forEach(leave => {
            if (leave.userId && !uniqueUsersSet.has(leave.userId._id.toString())) {
                uniqueUsersSet.add(leave.userId._id.toString());
                users.push(leave.userId);
            }
        });

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users on leave from team:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
