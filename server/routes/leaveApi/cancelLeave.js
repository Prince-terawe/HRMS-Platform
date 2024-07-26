const express = require('express');
const Leave = require('../../model/leave');
const User = require('../../model/user');
const checkPermission = require('../../middleware/permissions');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.put('/:leaveId', authenticate, checkPermission('cancelLeave'), async (req, res) => {
    try {
        
        const leaveId = req.params.leaveId;
        const rejectorId = req.userId; // Assuming req.userId is set by authentication middleware

        const leave = await Leave.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        leave.status = 'rejected';
        leave.approvedOn = new Date();
        leave.approvedBy = rejectorId;

        await leave.save();
        res.json({ msg: 'Leave request rejected successfully', leave });
    } catch (error) {
        console.error('Error rejecting leave request:', error);
        res.status(400).json({ error: 'Unable to reject leave request', details: error.message });
    }
});

module.exports = router;
