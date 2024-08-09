const express = require('express');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const validateUser = require('../../utils/validateUser');

const router = express.Router();

router.put('/:id', authenticate,  checkPermission(['viewAny']), async (req, res) => {
    try {
        const { phoneNumber, empname, email, empId, role, manager, department, position, ...rest } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ noUserFound: 'No Employee found' });
        }

        const errors = await validateUser({ empname, empId });
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }


        if (phoneNumber || email || role || manager || department || position) {
            user.profile = user.profile || {};
            if (phoneNumber) user.profile.phoneNumber = phoneNumber;
            if (email) user.email = email;
            if (role) user.role = role;
            if (position) user.position = position;
            if (department) user.department = department;
            if (manager) user.manager = manager;

        }
        Object.assign(user, rest);

        const updatedUser = await user.save();
        res.json({ msg: "Employee data updated successfully!", user: updatedUser });
    } catch (error) {
        console.error('Error updating Employee data:', error);
        res.status(400).json({ error: "Unable to update Employee data", details: error.message });
    }
});

module.exports = router;
