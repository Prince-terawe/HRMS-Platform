const express = require('express');
const mongoose = require('mongoose');
const Leave = require('../../model/leave');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth'); // Import the authenticate middleware
const sendEmail = require('../../utils/sendEmails');
const jwt = require('jsonwebtoken');

const router = express.Router();

const createActionLink = (leaveId, action, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return `http://localhost:5000/leaveApi/leaves/${action}/${leaveId}?token=${token}`;
};

router.post('/', authenticate, async (req, res) => {
    const { userId, leaveType, numberOfDays, startDate, endDate, reason } = req.body;

    let emptyFields = [];

    if (!userId) emptyFields.push('userId');
    if (!leaveType) emptyFields.push('leaveType');
    if (!numberOfDays) emptyFields.push('numberOfDays');
    if (!startDate) emptyFields.push('startDate');
    if (!endDate) emptyFields.push('endDate');
    if (!reason) emptyFields.push('reason');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the required fields', emptyFields });
    }

    try {
        const userId = req.userId; // Get the authenticated user's ID from the request object
        const user = await User.findById(userId); // Find the user by the ID set by the authenticate middleware
        // const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found, I' });
        }

        // Create new leave request
        const newLeave = new Leave({
            connectionId: user._id,
            userId: userId, // Set employeeId from the User document's _id
            leaveType,
            numberOfDays,
            startDate,
            endDate,
            reason
        });

        const leaveDetails = await newLeave.save();

        // Find manager
        const manager = await User.findById(user.manager);
        if (manager) {
            const approveUrl = createActionLink(leaveDetails._id, 'approve', manager._id);
            const rejectUrl = createActionLink(leaveDetails._id, 'reject', manager._id);
            const emailHtml = `
                <p>Dear ${manager.profile.firstName},</p>
                <p>The following leave request has been submitted by ${user.profile.firstName} ${user.profile.lastName}:</p>
                <ul>
                    <li><strong>Leave Type:</strong> ${leaveType}</li>
                    <li><strong>Number of Days:</strong> ${numberOfDays}</li>
                    <li><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</li>
                    <li><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</li>
                    <li><strong>Reason:</strong> ${reason}</li>
                </ul>
                <p>Please review and take the necessary action:</p>
                <a href="${approveUrl}" style="display: inline-block; margin: 10px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">Approve</a>
                <a href="${rejectUrl}" style="display: inline-block; margin: 10px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #dc3545; text-decoration: none; border-radius: 5px;">Reject</a>
                <p>Thank you,<br>HR System</p>
            `;
            await sendEmail(manager.email, '', 'Leave Request Notification', '', emailHtml);
        }

        res.json({ msg: "Leave request submitted and notification sent to manager!", leaveDetails });
    } catch (error) {
        console.error('Error making a leave request:', error);
        res.status(400).json({ error: "Unable to send leave request", details: error.message });
    }
});

module.exports = router;
