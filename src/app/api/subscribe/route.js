import nodemailer from 'nodemailer';
import axios from 'axios';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

// Function to validate reCAPTCHA token
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
  } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error validating reCAPTCHA:', error); }
    return false;
  }
};

// POST handler for newsletter subscription
export async function POST(req) {
  try {
    const { email, recaptchaToken } = await req.json(); // Parse JSON request body

    // Validate reCAPTCHA token
    const isValidCaptcha = await validateCaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json({ message: 'Invalid reCAPTCHA' }, { status: 400 });
    }

    // Validate email field
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    // Post the email to Strapi in the required format
    const strapiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}newsletter-subscriptions`,
      { data: { email } },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

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

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });

  } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error processing request:', error); }
    return NextResponse.json(
      { message: 'Error occurred while processing your request' },
      { status: 500 }
    );
  }
}
