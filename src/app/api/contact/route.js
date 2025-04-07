import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, emirates, vehicle } = await req.json();

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
        // user: "asad@slipstream.agency",
        // pass: "jitl hxis piog smaw",
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_PASSWORD,
      // from: "asad@slipstream.agency",
      to: "ahmed@slipstream.agency",
      // to: "info@smartmobilityint.com",
      subject: "New offer Form Submission",
      html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; border: 2px solid #eee; border-radius: 10px; font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center; margin-bottom: 20px; display:flex; gap:20px">
        <img src="https://carprices.ae/assets/img/car-prices-logo.png" alt="Logo" style="max-width: 150px;">
         <img src="https://avatruae.com/wp-content/uploads/2025/04/avatr-png-logo.png" alt="Logo" style="max-width: 150px; margin-left:20px;">
      </div>
      <h2 style="text-align: center; color: #2c3e50;">New Offer Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Emirates:</strong> ${emirates}</p>
      <p><strong>Vehicle:</strong> ${vehicle}</p>
      <hr style="margin: 20px 0;">
      <p style="text-align: center; font-size: 12px; color: #888;">© ${new Date().getFullYear()} Smart Mobility International</p>
      </div>
   `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error sending email.",
      error: error.message,
    });
  }
}
