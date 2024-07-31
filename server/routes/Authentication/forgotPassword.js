const express = require('express');
const crypto = require('crypto');
const User = require('../../model/user');
const sendEmail = require('../../utils/sendEmails');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user account match with this email, you should signUp/login first' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1hr

    await user.save();

    const resetURL = `http://localhost:5000/api/setPassword/resetPassword/${token}`;
    const message = `
      <p>You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link (valid for 1 hour only), or paste it into your browser to complete the process:</p>
      <p><a href="${resetURL}" style="padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>If the button above does not work, copy and paste the following URL into your browser:</p>
      <p>${resetURL}</p>
    `;

    await sendEmail(user.email, '', 'Password Reset', '', message);

    res.json({ msg: 'Password reset link sent', token});
  } catch (error) {
    console.error('Error during password reset request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
