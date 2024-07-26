const express = require('express');
const mongoose = require('mongoose');
const Leave = require('../../model/leave');
const User = require('../../model/user')

const router = express.Router();

router.post('/', async (req, res) => {
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
        const user = await User.findOne({ userId });
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
        res.json({ msg: "Leave request submitted!", leaveDetails });
    } catch (error) {
        console.error('Error making a leave request:', error);
        res.status(400).json({ error: "Unable to send leave request", details: error.message });
    }
});

module.exports = router;
