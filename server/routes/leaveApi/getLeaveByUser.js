const express = require('express');
const Leave = require('./../../model/leave');
const authenticate = require('../../middleware/auth');
const checkPermission = require('../../middleware/permissions');

const router = express.Router();

router.get('/:id', authenticate, checkPermission(['viewAny']), (req, res) => {
    Leave.find({connectionId: req.params.id})
        .then(leave => res.json(leave))
        .catch(err => res.status(404).json({ noLeaveRequestFound: 'No Leave request found' }));
});

module.exports = router;