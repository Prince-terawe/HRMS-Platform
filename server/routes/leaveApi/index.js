const express = require('express');
const router = express.Router();

const leaveRequest = require('./leaveRequest')

router.use('/', leaveRequest);

module.exports = router;