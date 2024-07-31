const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    empId: {type: String,required: true,unique: true,},
    empname: {type: String,required: true,unique: true},
    password: {type: String,required: true,},
    email: {type: String,required: true,unique: true},
    role: {type: String,enum: ['Employee', 'Manager', 'Admin', 'HR'],default: 'Employee'},
    department: {type: String,required: true},
    teamProject: { type: [String], default: [] },
    manager: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    leaveBalance: {
        casualLeave: {type: Number,default: 12},
        sickLeave: {type: Number,default: 12},
        paidLeave: {type: Number,default: 12},
        workFromHome: {type: Number,default: 12}
    },
    profile: {
        firstName: {type: String,required: true},
        lastName: {type: String},
        profileImage: {type: String},
        dateOfBirth: {type: Date,required: true},
        address: {type: String,},
        phoneNumber: {type: Number,required: true}
    },
    position: {type: String,required: true},
    hireDate: {type: Date,required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// Create the user model
const User = mongoose.model('User', userSchema);
module.exports = User;