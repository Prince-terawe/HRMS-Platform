const express = require('express');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const User = require('../../model/user');

const router = express.Router();

router.put('/:userId', authenticate, checkPermission(['manageTeam']), async (req, res) => {
    const { userId } = req.params;
    const { projectName } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.teamProject.includes(projectName)) {
            user.teamProject.push(projectName);
            await user.save();
        }

        res.json({ msg: 'User added to the team', user });
    } catch (error) {
        console.error('Error adding user to team:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
