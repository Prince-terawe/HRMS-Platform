const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    empId: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: Number,
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
        type: Date,
    },
    approvedBy: {
        type: String,
        ref: 'User' 
    },
    rejectedBy: {
        type: String,
    }
}, {
    timestamps: true
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;