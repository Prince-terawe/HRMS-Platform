const express = require('express');
const Leave = require('./../../model/leave');

const router = express.Router();

router.get('/:id', (req, res) => {
    Leave.findById(req.params.id)
        .then(leave => res.json(leave))
        .catch(err => res.status(404).json({ noLeaveRequestFound: 'No Leave request found' }));
});

module.exports = router;