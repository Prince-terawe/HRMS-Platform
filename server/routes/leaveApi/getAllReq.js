const express = require('express');
const Leave = require('./../../model/leave');
const checkPermission = require('../../middleware/permissions');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticate, checkPermission(['viewAny']), (req, res) => {
    Leave.find()
        .then(leaves => res.json(leaves))
        .catch(err => res.status(404).json({ noLeaveRequestFound: 'No Leave request found' }));
});

module.exports = router;