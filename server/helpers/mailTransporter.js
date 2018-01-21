import nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default mailTransporter;
