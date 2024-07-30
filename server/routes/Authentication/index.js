const express = require('express');
const router = express.Router();

const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const login = require('./login');

router.use('/forgotPassword', forgotPassword);
router.use('/resetPassword', resetPassword);
router.use('/login', login);

module.exports = router;