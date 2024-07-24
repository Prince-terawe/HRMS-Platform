const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');
const checkPermission = require('../../middleware/roleMiddleware');


const router = express.Router();

router.put('/:leaveId', checkPermission('updateAny'), async (req, res) => {
    try {
        const leaveId = req.params.leaveId;
        const approverId = req.userId; // Assuming req.userId is set by authentication middleware

        const leave = await Leave.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        leave.status = 'approved';
        leave.approvedOn = new Date();
        leave.approvedBy = approverId;

        await leave.save();
        res.json({ msg: 'Leave request approved successfully', leave });
    } catch (error) {
        console.error('Error approving leave request:', error);
        res.status(400).json({ error: 'Unable to approve leave request', details: error.message });
    }
});

module.exports = router;
