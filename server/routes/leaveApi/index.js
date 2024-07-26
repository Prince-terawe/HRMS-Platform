const express = require('express');
const router = express.Router();

const leaveRequest = require('./leaveRequest')
const allReq = require('./getAllReq')
const reqById = require('./getReqById')
const approveLeaveRoute = require('./approveLeave');
const rejectLeave = require('./cancelLeave');

router.use('/leaveRequest', leaveRequest);
router.use('/getAllLeaves', allReq);
router.use('/', reqById);
router.use('/approve', approveLeaveRoute);
router.use('/reject', rejectLeave);


module.exports = router;