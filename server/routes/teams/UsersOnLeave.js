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
        const usersOnLeave = await Leave.find({
            startDate: { $lte: today },
            endDate: { $gte: today },
            status: 'approved'
        }).populate({
            path: 'connectionId',
            match: { teamProject: projectName },
            select: 'empname email teamProject'
        }).exec();

        const uniqueUsersSet = new Set();
        const users = [];

        usersOnLeave.forEach(leave => {
            if (leave.connectionId && !uniqueUsersSet.has(leave.connectionId._id.toString())) {
                uniqueUsersSet.add(leave.connectionId._id.toString());
                users.push(leave.connectionId);
            }
        });

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users on leave from team:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
