import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const validateCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify`;

  try {
    const response = await axios.post(url, null, {
      params: {
        secret: secretKey,
        response: token,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    });

    console.log('reCAPTCHA API response:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
};

export async function POST(req) {
  const { name, email, phone, subject, recaptchaToken } = await req.json();

  console.log('Request body:', { name, email, phone, subject });

  // Validate reCAPTCHA
  const isValidCaptcha = await validateCaptcha(recaptchaToken);
  if (!isValidCaptcha) {
    return new Response(JSON.stringify({ message: 'Invalid reCAPTCHA' }), { status: 400 });
  }

  // Field validation
  if (!name || !email || !phone || !subject) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailMessage = `
      <html>
        <body>
          <h1>New Contact Us Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'sahin@slipstream.agency, martin@slipstream.agency',
      subject: 'Contact Us Form Submission',
      html: emailMessage,
    });

    console.log('Email sent successfully');
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error occurred while sending email' }), { status: 500 });
  }
}
