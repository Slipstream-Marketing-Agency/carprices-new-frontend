import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, mobile, subject, message } = req.body;

    // Configure your email transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Set to true if using a secure connection (TLS/SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'sahin@slipstream.agency',
        cc: 'sahil@slipstream.agency,rishab@slipstream.agency', // Add the CC recipients here
        subject: 'Carprices Contact Form Submission', // Specify the subject here
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\nMessage: ${message}`,
      });

      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      res.status(500).send('Error occurred while sending email');
    }
  } else {
    res.status(404).send();
  }
}
