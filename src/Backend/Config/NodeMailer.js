const nodemailer = require('nodemailer')
const GMAIL_USER = 'tutor.online.play@gmail.com'
const GMAIL_PASS = 'Playtorium||1'
const EMAIL_SECRET = "TESTEMAILVERIFICATION"

const transporter = nodemailer.createTransport({
  service: 'Gmail' ,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});

module.exports = {
  transporter: transporter ,
  EMAIL_SECRET: EMAIL_SECRET
} ;
