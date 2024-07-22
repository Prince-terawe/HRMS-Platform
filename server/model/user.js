const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Employee', 'Manager', 'Admin', 'HR'],
        default: 'Employee'
    },
    department: {
        type: String
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    leaveBalance: {
        casualLeave: {
            type: Number,
            default: 12
        },
        sickLeave: {
            type: Number,
            default: 12
        },
        paidLeave: {
            type: Number,
            default: 12
        },
        workFromHome: {
            type: Number,
            default: 12
        }
    },
    profile: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },
        profileImage: {
            type: String
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        address: {
            type: String,
        },
        phoneNumber: {
            type: Number,
            required: true
        }
    },
    position: {
        type: String,
        required: true
    },
    hireDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// Create the user model
const User = mongoose.model('User', userSchema);
module.exports = User;