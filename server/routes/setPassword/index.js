const express = require('express');
const router = express.Router();

const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');


router.use('/forgotPassword', forgotPassword);
router.use('/restPassword', resetPassword);


module.exports = router;