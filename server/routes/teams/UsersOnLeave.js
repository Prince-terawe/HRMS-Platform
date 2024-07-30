const express = require('express');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const Leave = require('../../model/leave');
const User = require('../../model/user');

const router = express.Router();

router.get('/:projectName/onLeave', authenticate, checkPermission(['viewAny', 'viewTeam']), async (req, res) => {
    const { projectName } = req.params;

    try {
        const usersOnLeave = await Leave.find().populate({
            path: 'connectionId',
            match: { teamProject: projectName },
            select: 'username email teamProject'
        }).exec();

        const users = usersOnLeave.map(leave => leave.connectionId).filter(user => user !== null);
        
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users on leave from team:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
