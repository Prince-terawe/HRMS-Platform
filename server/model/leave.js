const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    userId: {
        type: String,
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
        type: Date,
    },
    approverBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
}, {
    timestamps: true
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;