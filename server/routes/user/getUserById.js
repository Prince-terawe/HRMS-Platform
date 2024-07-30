const express = require('express');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');

const router = express.Router();

router.get('/:id', authenticate, checkPermission(['viewAny','viewOwn']), (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ noUserFound: 'No User found' }));
});

module.exports = router;
