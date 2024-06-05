// pages/api/bookTestDrive.js
import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";
import rateLimit from "@/src/utils/rateLimit";

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
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    });

    return response.data.success;
  } catch (error) {
    console.error("Error validating reCAPTCHA:", error);
    return false;
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, phone, emirate, carName, recaptchaToken } = req.body;

    const isValidCaptcha = await validateCaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return res.status(400).json({ message: "Invalid reCAPTCHA" });
    }

    if (!name || !email || !phone || !emirate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
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
          <head>
            <style>
              /* Your email styling here */
            </style>
          </head>
          <body>
            <div>
              <h1>New Car Buy Request</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phone}</p>
              <p><strong>Emirate:</strong> ${emirate}</p>
              <p><strong>Car:</strong> ${carName}</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "sahin@slipstream.agency,martin@slipstream.agency",
        subject: "New Car Buy Request",
        html: emailMessage,
      });

      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error occurred while sending email");
    }
  } else {
    res.status(404).send();
  }
};

export default rateLimit(handler, 15 * 60 * 1000); // Adjust the limit as needed
