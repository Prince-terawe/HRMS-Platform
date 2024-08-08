const express = require('express');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const User = require('../../model/user');

const router = express.Router();

router.put('/:id', authenticate, checkPermission(['manageTeam']), async (req, res) => {
    const { id } = req.params;
    const { projectName } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the project to remove
        const projectIndex = user.teamProject.findIndex(
            project => project.projectName === projectName
        );

        if (projectIndex === -1) {
            return res.status(404).json({ error: "User is not enrolled in this project." });
        }

        // Remove the project
        user.teamProject.splice(projectIndex, 1);
        await user.save();

        res.json({ msg: 'User removed from the team', user });
    } catch (error) {
        console.error('Error removing user from team:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
