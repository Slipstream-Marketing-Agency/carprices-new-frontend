import nodemailer from "nodemailer";
import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

// Function to validate reCAPTCHA
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
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
        });

        return response.data.success;
    } catch (error) {
        console.error("Error validating reCAPTCHA:", error);
        return false;
    }
};

// POST request handler for loan enquiry
export async function POST(req) {
    try {
        const { name, email, phone, emirate, carName, recaptchaToken } = await req.json(); // Parse JSON request body

        // Validate reCAPTCHA token
        const isValidCaptcha = await validateCaptcha(recaptchaToken);
        if (!isValidCaptcha) {
            return NextResponse.json({ message: "Invalid reCAPTCHA" }, { status: 400 });
        }

        // Validate required fields
        if (!name || !email || !phone || !emirate) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json({ message: "Invalid email" }, { status: 400 });
        }

        // Configure Nodemailer for sending emails
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // For TLS, use secure: true
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Construct email message
        const emailMessage = `
      <html>
        <head>
          <style>
            /* Your email styling here */
          </style>
        </head>
        <body>
          <div>
            <h1>New Loan Enquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Emirate:</strong> ${emirate}</p>
            <p><strong>Car:</strong> ${carName}</p>
          </div>
        </body>
      </html>
    `;

        // Send email using Nodemailer
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "sahin@slipstream.agency, martin@slipstream.agency",
            subject: "New Loan Enquiry Submission",
            html: emailMessage,
        });

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Error occurred while sending email" }, { status: 500 });
    }
}

// No need for config export, Next.js 14 handles request parsing automatically
