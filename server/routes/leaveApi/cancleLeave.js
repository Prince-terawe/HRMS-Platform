const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');

const router = express.Router();

router.put('/:leaveId', async (req, res) => {
    try {
        const leaveId = req.params.leaveId;
        const approverId = req.body.approverId;

        const approver = await User.findById(approverId);

        if (!approver) {
            return res.status(404).json({ error: 'Approver not found' });
        }

        // Ensure the user has the role of Manager, HR, or Admin
        if (!['Manager', 'HR', 'Admin'].includes(approver.role)) {
            return res.status(403).json({ error: 'User does not have permission to approve leave requests' });
        }

        // Update leave status to rejected
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        leave.status = 'rejected';
        leave.rejectedBy = approver.username;

        await leave.save();
        res.json({ msg: 'Leave request rejected', leave });
    } catch (error) {
        console.error('Error rejecting leave request:', error);
        res.status(400).json({ error: 'Unable to reject leave request', details: error.message });
    }
});

module.exports = router;
