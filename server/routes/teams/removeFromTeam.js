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
        if(!user.teamProject.includes(projectName)) res.json("User is not enrolled in this Project.");
        user.teamProject = user.teamProject.filter(project => project !== projectName);
        await user.save();

        res.json({ msg: 'User removed from the team', user });
    } catch (error) {
        console.error('Error removing user from team:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
