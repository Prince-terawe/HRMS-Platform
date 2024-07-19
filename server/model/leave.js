const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Assuming you have an Employee schema
        required: true
    },
    leaveType: {
        type: String,
        enum: ['sickLeave', 'casualLeave', 'paidLeave', 'workFromHome'],
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    appliedOn: {
        type: Date,
        default: Date.now
    },
    approvedOn: {
        type: Date
    },
    approverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' // Assuming the reviewer is also an employee
    }
}, {
    timestamps: true
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;