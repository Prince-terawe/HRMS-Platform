const express = require('express');
const mongoose = require('mongoose');
const Leave = require('../../model/leave');
const User = require('../../model/user');
const authenticate = require('../../middleware/auth'); // Import the authenticate middleware
const sendEmail = require('../../utils/sendEmails')

const router = express.Router();

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
            return res.status(404).json({ error: 'User not found' });
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

        // finde manager
        const manager = await User.findById(user.manager);
        if (manager) {
            const approveUrl = `http://localhost:5000/leaveApi/leaves/approve/${leaveDetails._id}`;
            const rejectUrl = `http://localhost:5000/leaveApi/leaves/reject/${leaveDetails._id}`;
            const emailText = `
        <p>Dear ${manager.profile.firstName},</p>
        
        <p>The following leave request has been submitted by ${user.profile.firstName} ${user.profile.lastName}:</p>
        
        <ul>
            <li>Leave Type: ${leaveType}</li>
            <li>Number of Days: ${numberOfDays}</li>
            <li>Start Date: ${new Date(startDate).toLocaleDateString()}</li>
            <li>End Date: ${new Date(endDate).toLocaleDateString()}</li>
            <li>Reason: ${reason}</li>
        </ul>
        
        <p>Please review and take the necessary action.</p>
        
        <a href="${approveUrl}" style="text-decoration:none;">
            <button style="background-color:green;color:white;padding:10px 20px;border:none;border-radius:5px;">Approve</button>
        </a>
        <a href="${rejectUrl}" style="text-decoration:none;">
            <button style="background-color:red;color:white;padding:10px 20px;border:none;border-radius:5px;">Reject</button>
        </a>
        
        <p>Thank you,<br>HR System</p>
    `;
            await sendEmail(manager.email, '', 'Leave Request Notification', emailText);
        }


        res.json({ msg: "Leave request submitted and notification sent to manager!", leaveDetails });
        // res.json({ msg: "Leave request submitted!", leaveDetails });
    } catch (error) {
        console.error('Error making a leave request:', error);
        res.status(400).json({ error: "Unable to send leave request", details: error.message });
    }
});

module.exports = router;
