const express = require('express');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const User = require('../../model/user');

const router = express.Router();

router.put('/:id', authenticate, checkPermission(['viewAny', 'manageAny']), async (req, res) => {
    const { id } = req.params;
    const { projectName, projectLead } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the project is already in the teamProject array
        const projectExists = user.teamProject.some(project => project.projectName === projectName);

        if (!projectExists) {
            user.teamProject.push({
                projectName,
                projectLead: {
                    id: projectLead.id,
                    name: projectLead.name,
                    email: projectLead.email
                }
            });
            await user.save();
        }

        res.json({ msg: 'Project added to the teamProject', user });
    } catch (error) {
        console.error('Error adding project to teamProject:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
