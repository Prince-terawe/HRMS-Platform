const express = require('express');
const router = express.Router();

const leaveRequest = require('./leaveRequest')
const allReq = require('./getAllReq')
const reqById = require('./getReqById')
const approveLeaveRoute = require('./approveLeave');
const rejectLeave = require('./cancelLeave');
const reqByUser = require('./getLeaveByUser');

router.use('/', leaveRequest);
router.use('/', allReq);
router.use('/', reqById);
router.use('/reqByUser', reqByUser);
router.use('/approve', approveLeaveRoute);
router.use('/reject', rejectLeave);


module.exports = router;