const express = require('express');
const crypto = require('crypto');
const User = require('../model/user');
const sendEmail = require('../utils/sendEmails');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email, you should signUp/login first' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1hr

    await user.save();

    const resetURL = `http://localhost:5000/api/forgotPassword/resetPassword/${token}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link( valid for 1hr only ), or paste it into your browser to complete the process: \n\n ${resetURL}`;

    await sendEmail(user.email, null, 'Password Reset', message);

    res.json({ msg: 'Password reset link sent', message });
  } catch (error) {
    console.error('Error during password reset request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.post('/forgotPassword/resetPassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ msg: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
