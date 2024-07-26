const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_key: process.env.YOUR_SENDGRID_API_KEY
  }
};

const mailer = nodemailer.createTransport(sgTransport(options));

const sendEmail = (to, cc, subject, text) => {
  const mailOptions = {
    from: 'ankitkashyap9320@gmail.com',
    to,
    cc,
    subject,
    text,
    html
  };
  
  return mailer.sendMail(mailOptions);
};

module.exports = sendEmail;
