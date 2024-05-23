import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, subject } = req.body;

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
              <h1>New Contact Us Form Submission</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phone}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "sahin@slipstream.agency,martin@slipstream.agency",
        subject: "Contact Us Form Submission",
        html: emailMessage,
      });

      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email", error);
      res.status(500).send("Error occurred while sending email");
    }
  } else {
    res.status(404).send();
  }
}
