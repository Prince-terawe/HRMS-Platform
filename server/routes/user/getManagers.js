const express = require('express');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/manager', (req, res) => {
    User.find({ role: 'Manager' })
        .select('_id profile.firstName profile.lastName empId')
        .then(managers => res.json(managers))
        .catch(err => res.status(404).json({ noUsersFound: 'No Managers found' }));
});

module.exports = router;