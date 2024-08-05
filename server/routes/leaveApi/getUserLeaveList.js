const express = require('express');
const Leave = require('./../../model/leave');
const checkPermission = require('../../middleware/permissions');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/:id', authenticate, checkPermission(['viewAny']), async (req, res) => {
    try {
        const leaves = await Leave.find({ connectionId: req.params.id });
        if (!leaves || leaves.length === 0) {
            return res.status(404).json({ message: 'No Leave requests found' });
        }
        res.json(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
