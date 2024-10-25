import nodemailer from "nodemailer";
import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

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
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    });

    return response.data.success;
  } catch (error) {
    console.error("Error validating reCAPTCHA:", error);
    return false;
  }
};

// POST request handler for submitting insurance quote enquiry
export async function POST(req) {
  try {
    const { formData, recaptchaToken } = await req.json(); // Parse JSON request body

    // Validate reCAPTCHA token
    const isValidCaptcha = await validateCaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      console.log("Invalid reCAPTCHA");
      return NextResponse.json({ message: "Invalid reCAPTCHA" }, { status: 400 });
    }

    // Map the frontend form data to Strapi's expected field names
    const data = {
      data: {
        year: formData.car_year.label,
        brand: formData.car_brand.label,
        model: formData.model.label,
        variant: formData.variant.label,
        insuranceType: formData.insurance,
        is_the_current_policy_fully_comprehensive: formData.is_fully_comprehensive === "Yes",
        brand_new: formData.brand_new_car === "Yes",
        first_registered: formData.car_first_registered,
        first_car: formData.first_car === "Yes",
        city_to_register: formData.city,
        gcc_and_unmodified: formData.gcc_spec === "Yes",
        current_policy_includes_agency_repair: formData.agency_repair === "Yes",
        nationality: formData.nationality,
        country: formData.country,
        years_of_international_driving_experience: formData.experience,
        driving_in_uae: formData.duration,
        full_name: formData.full_name,
        mobile_number: String(formData.mobile_number),
        email: formData.email,
        dob: formData.dob,
      },
    };

    console.log("Data being sent to Strapi:", JSON.stringify(data, null, 2));

    // Send the request to Strapi
    const strapiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}insurance-calculator-enquiries`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check for non-2xx response
    if (strapiResponse.status < 200 || strapiResponse.status >= 300) {
      throw new Error(`Strapi response error: ${strapiResponse.status} ${strapiResponse.statusText}`);
    }

    console.log("Strapi response:", strapiResponse.data);

    // Email notification after successful Strapi submission
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // For TLS, use true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Full email content with all form fields
    const emailMessage = `
      <html>
        <head>
          <style>
            /* Your email styling here */
          </style>
        </head>
        <body>
          <div>
            <h1>New Insurance Quote Enquiry</h1>
            <p><strong>Full Name:</strong> ${formData.full_name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone Number:</strong> ${formData.mobile_number}</p>
            <p><strong>Date of Birth:</strong> ${formData.dob}</p>
            <p><strong>Nationality:</strong> ${formData.nationality}</p>
            <p><strong>Country of Driving License:</strong> ${formData.country}</p>
            <p><strong>Years of International Driving Experience:</strong> ${formData.experience}</p>
            <p><strong>Driving in UAE (Years):</strong> ${formData.duration}</p>

            <h2>Car Details</h2>
            <p><strong>Car Brand:</strong> ${formData.car_brand.label}</p>
            <p><strong>Car Model:</strong> ${formData.model.label}</p>
            <p><strong>Car Year:</strong> ${formData.car_year.label}</p>
            <p><strong>Car Variant:</strong> ${formData.variant.label}</p>
            <p><strong>Is the Car Brand New?:</strong> ${formData.brand_new_car === "Yes" ? "Yes" : "No"}</p>
            <p><strong>When was the Car First Registered?:</strong> ${formData.car_first_registered}</p>
            <p><strong>Is this Your First Car?:</strong> ${formData.first_car === "Yes" ? "Yes" : "No"}</p>
            <p><strong>City to Register:</strong> ${formData.city}</p>
            <p><strong>Is the Car GCC Spec and Unmodified?:</strong> ${formData.gcc_spec === "Yes" ? "Yes" : "No"}</p>
            <p><strong>Is the Current Policy Fully Comprehensive?:</strong> ${formData.is_fully_comprehensive === "Yes" ? "Yes" : "No"}</p>
            <p><strong>Does the Current Policy Include Agency Repair?:</strong> ${formData.agency_repair === "Yes" ? "Yes" : "No"}</p>

            <h2>Insurance Information</h2>
            <p><strong>Type of Insurance:</strong> ${formData.insurance}</p>
          </div>
        </body>
      </html>
    `;

    // Send the email with Nodemailer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "sahin@slipstream.agency,martin@slipstream.agency,abubacker@slipstream.agency,chaitali@slipstream.agency,ahmed@slipstream.agency", // Update recipient list as needed
      subject: "New Insurance Quote Enquiry",
      html: emailMessage,
    });

    // Send success response
    return NextResponse.json({
      message: "Insurance quote submitted successfully, and email sent.",
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing request:", {
      message: error.message || "Unknown error",
      response: error.response ? error.response.data : "No response data",
      status: error.response ? error.response.status : "No status code",
      headers: error.response ? error.response.headers : "No response headers",
      stack: error.stack || "No stack trace",
    });

    return NextResponse.json({
      message: "Error occurred while processing your request",
      error: error.message,
      response: error.response ? error.response.data : null,
    }, { status: 500 });
  }
}
