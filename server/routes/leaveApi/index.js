const express = require('express');
const router = express.Router();

const leaveRequest = require('./leaveRequest')
const cancelRequest = require('./cancelRequest');

router.use('/leaveRequest', leaveRequest);
router.use('/cancelRequest', cancelRequest);

module.exports = router;