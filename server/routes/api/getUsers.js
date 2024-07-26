const express = require('express');
const User = require('./../../model/user');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ noUsersFound: 'No Users found' }));
});

module.exports = router;
