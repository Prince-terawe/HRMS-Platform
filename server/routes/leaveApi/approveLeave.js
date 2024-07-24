const express = require('express');
const Leave = require('./../../model/leave');
const User = require('./../../model/user');

const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { userId } = req.body; // ID of the manager making the request

        // Fetch the manager's user document
        const manager = await User.findById(userId);
        if (!manager) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure the user has the role of Manager, HR, or Admin
        if (!['Manager', 'HR', 'Admin'].includes(manager.role)) {
            return res.status(403).json({ error: 'User does not have permission to approve leave requests' });
        }

        // Fetch the leave request
        const leaveRequest = await Leave.findById(leaveId);
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        // Update the leave request
        leaveRequest.status = 'approved';
        leaveRequest.approvedOn = new Date();
        leaveRequest.approvedBy = manager.username;

        // Save the updated leave request
        const updatedLeaveRequest = await leaveRequest.save();
        res.json({ msg: "Leave request approved successfully", updatedLeaveRequest });
    } catch (error) {
        console.error('Error approving leave request:', error);
        res.status(500).json({ error: "Unable to approve leave request", details: error.message });
    }
});

module.exports = router;
