import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import rateLimit from '@/src/utils/rateLimit';

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

    return response.data.success;
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, recaptchaToken } = req.body;

    const isValidCaptcha = await validateCaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return res.status(400).json({ message: 'Invalid reCAPTCHA' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    try {
      // Post the email to Strapi in the required format
      const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/newsletter-subscriptions`, {
        data: { email },
      }, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      });

      if (strapiResponse.status !== 200 && strapiResponse.status !== 201) {
        throw new Error('Failed to store the email in Strapi');
      }

      // Send email notification
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
          <head>
            <style>
              /* Your email styling here */
            </style>
          </head>
          <body>
            <div>
              <h1>Newsletter Subscription Request</h1>
              <p><strong>Email:</strong> ${email}</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'sahin@slipstream.agency,martin@slipstream.agency', // Replace with your email
        subject: 'New Newsletter Subscription',
        html: emailMessage,
      });

      res.status(200).send('Subscription successful');
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).send('Error occurred while processing your request');
    }
  } else {
    res.status(404).send();
  }
};

export default rateLimit(handler, 15 * 60 * 1000); // Adjust the limit as needed
