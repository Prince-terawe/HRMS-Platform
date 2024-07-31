const express = require('express');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');
const validateUser = require('../../utils/validateUser');

const router = express.Router();

router.put('/:id', authenticate,  checkPermission(['viewAny']), async (req, res) => {
    try {
        const { phoneNumber, firstName, dateOfBirth, empname, email, empId, ...rest } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ noUserFound: 'No User found' });
        }

        const errors = await validateUser({ empname, email, empId });
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }


        if (phoneNumber || firstName || dateOfBirth) {
            user.profile = user.profile || {};
            if (phoneNumber) user.profile.phoneNumber = phoneNumber;
            if (firstName) user.profile.firstName = firstName;
            if (dateOfBirth) user.profile.dateOfBirth = dateOfBirth;
        }
        Object.assign(user, rest);

        const updatedUser = await user.save();
        res.json({ msg: "User updated successfully!", user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: "Unable to update User", details: error.message });
    }
});

module.exports = router;
