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
  } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error validating reCAPTCHA:", error); }
    return false;
  }
};

// POST request handler for loan inquiry
export async function POST(req) {
  try {
    const {
      name,
      email,
      mobile_number,
      emirate,
      car,
      price,
      tenure,
      interest_rate,
      down_payment,
      monthly_emi,
      total_interest,
      total_amount_payable,
      uae_national,
      application_type,
      monthly_income,
      subscribe_to_offers,
      recaptchaToken,
    } = await req.json(); // Parse JSON request body

    // Validate reCAPTCHA only in production
    if (process.env.NODE_ENV === "production") {
      const isValidCaptcha = await validateCaptcha(recaptchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { message: "Invalid reCAPTCHA" },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    const requiredFields = {
      name,
      email,
      mobile_number,
      emirate,
      car,
      price,
      tenure,
      interest_rate,
      down_payment,
      uae_national,
      application_type,
      monthly_income,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return NextResponse.json(
          { message: `Field "${field}" is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    // Transform data types as required by Strapi
    const transformedData = {
      name,
      email,
      mobile_number,
      emirate,
      car,
      price: String(price), // Convert to string
      tenure: String(tenure), // Convert to string
      interest_rate: String(interest_rate), // Convert to string
      down_payment: String(down_payment), // Convert to string
      monthly_emi,
      total_interest,
      total_amount_payable,
      uae_national: uae_national === "Yes", // Convert to boolean
      application_type,
      monthly_income,
      subscribe_to_offers,
    };
    // Save to Strapi /loan-enquiries
    const strapiUrl = `${process.env.NEXT_PUBLIC_API_URL}loan-enquiries`;

    try {
      const strapiResponse = await axios.post(
        strapiUrl,
        { data: transformedData },
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error saving to Strapi:", error.response?.data || error.message); }
      return NextResponse.json(
        { message: "Error saving to Strapi", error: error.message },
        { status: 500 }
      );
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
            body { font-family: Arial, sans-serif; line-height: 1.5; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
            h1 { color: #555; }
            p { margin: 5px 0; }
            .highlight { font-weight: bold; color: #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Loan Inquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile Number:</strong> ${mobile_number}</p>
            <p><strong>Emirate:</strong> ${emirate}</p>
            <p><strong>Car:</strong> ${car}</p>
            <p><strong>Price:</strong> AED ${price}</p>
            <p><strong>Tenure:</strong> ${tenure} years</p>
            <p><strong>Interest Rate:</strong> ${interest_rate}%</p>
            <p><strong>Down Payment:</strong> AED ${down_payment}</p>
            <p><strong>Monthly EMI:</strong> AED ${monthly_emi}</p>
            <p><strong>Total Interest:</strong> AED ${total_interest}</p>
            <p><strong>Total Amount Payable:</strong> AED ${total_amount_payable}</p>
            <p><strong>UAE National:</strong> ${uae_national}</p>
            <p><strong>Application Type:</strong> ${application_type}</p>
            <p><strong>Monthly Income:</strong> AED ${monthly_income}</p>
            <p><strong>Subscribe to Offers:</strong> ${
              subscribe_to_offers ? "Yes" : "No"
            }</p>
          </div>
        </body>
      </html>
    `;

    // Send email using Nodemailer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "sahin@slipstream.agency, martin@slipstream.agency", // Update as needed
      subject: "New Loan Inquiry Submission",
      html: emailMessage,
    });

    return NextResponse.json(
      { message: "Loan inquiry submitted and email sent successfully" },
      { status: 200 }
    );
  } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Unexpected error:", error); }
    return NextResponse.json(
      { message: "Unexpected error occurred", error: error.message },
      { status: 500 }
    );
  }
}
