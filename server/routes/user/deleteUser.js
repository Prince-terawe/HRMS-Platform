const express = require('express');
const User = require('../../model/user');
const checkPermission = require('../../middleware/permissions');
const authenticate = require('../../middleware/auth');

const router = express.Router();

// Route to delete a user by ID
router.delete('/:id', authenticate ,checkPermission(['manageAny']) ,(req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ noUserFound: 'No Employee found' });
            }
            res.status(200).json({ deletedUser: 'This Employee has been deleted', user });
        })
        .catch(err => res.status(400).json({ error: 'Error deleting the employee', details: err.message }));
});

module.exports = router;
