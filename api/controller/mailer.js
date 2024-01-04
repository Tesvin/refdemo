import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';

// Generate a secret key for OTP
const secret = speakeasy.generateSecret({ length: 20 });

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'stephenazosike@gmail.com', // my Gmail address
      pass: '08185866440azO$', // my Gmail password
    },
  });

  // Express route for sending OTP
app.post('/send-otp', (req, res) => {
    // Generate OTP
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    });
  
    // Email message
    const mailOptions = {
      from: 'stephenazosike@gmail.com', // Replace with your Gmail address
      to: req.body.email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is: ${token}`,
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending OTP email' });
      }
      res.status(200).json({ message: 'OTP sent successfully' });
    });
  });
  