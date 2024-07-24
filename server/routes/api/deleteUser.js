const express = require('express');
const User = require('./../../model/user');

const router = express.Router();

// Route to delete a user by ID
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ noUserFound: 'No User found' });
            }
            res.status(200).json({ deletedUser: 'This User has been deleted', user });
        })
        .catch(err => res.status(400).json({ error: 'Error deleting the user', details: err.message }));
});

module.exports = router;
