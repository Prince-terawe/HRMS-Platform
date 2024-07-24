const express = require('express');
const mongoose = require('mongoose');
const Leave = require('../../model/leave');
const User = require('../../model/user');

const router = express.Router();

// Route to cancel a leave request
router.delete('/:id', async (req, res) => {
    try {
        const leaveId = req.params.id;

        // Check if the leave request exists
        const leave = await Leave.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        // Delete the leave request
        await Leave.findByIdAndDelete(leaveId);
        res.json({ msg: 'Leave request cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling leave request:', error);
        res.status(500).json({ error: 'Unable to cancel leave request', details: error.message });
    }
});

module.exports = router;
