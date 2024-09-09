import axios from 'axios';
import dotenv from 'dotenv';
import rateLimit from '@/src/utils/rateLimit';

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
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { formData, recaptchaToken } = req.body;

    // Validate reCAPTCHA token
    const isValidCaptcha = await validateCaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      console.log('Invalid reCAPTCHA');  // Log for debugging
      return res.status(400).json({ message: 'Invalid reCAPTCHA' });
    }

    try {
      // Map the frontend form data to Strapi's expected field names
      const data = {
        data: {
          year: formData.car_year,
          brand: formData.car_brand,
          model: formData.model,
          variant: formData.variant,
          insuranceType: formData.insurance,
          is_the_current_policy_fully_comprehensive: formData.is_fully_comprehensive === "Yes", // Boolean mapping
          brand_new: formData.brand_new_car === "Yes", // Boolean mapping
          first_registered: formData.car_first_registered,
          first_car: formData.first_car === "Yes", // Boolean mapping
          city_to_register: formData.city,
          gcc_and_unmodified: formData.gcc_spec === "Yes", // Boolean mapping
          current_policy_includes_agency_repair: formData.agency_repair === "Yes", // Boolean mapping
          nationality: formData.nationality,
          country: formData.country,
          years_of_international_driving_experience: formData.experience,
          driving_in_uae: formData.duration,
          full_name: formData.full_name,
          mobile_number: formData.mobile_number,
          email: formData.email,
          dob: formData.dob,
        }
      };

      // Send the request to Strapi
      const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}insurance-calculator-enquiries`, data, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',  // Add content type
        },
      });

      // Check for any non-2xx response
      if (strapiResponse.status < 200 || strapiResponse.status >= 300) {
        throw new Error(`Strapi response error: ${strapiResponse.status} ${strapiResponse.statusText}`);
      }

      // Log the successful response
      console.log('Strapi response:', strapiResponse.data);  // Add this for debugging

      // Send a success response
      res.status(200).json({ message: 'Insurance quote submitted successfully' });
    } catch (error) {
      console.error('Error processing request:', {
        message: error.message || 'Unknown error',
        response: error.response ? error.response.data : 'No response data',
        stack: error.stack || 'No stack trace',
      });
      res.status(500).json({ message: 'Error occurred while processing your request' });
    }
  } else {
    res.status(404).json({ message: 'Invalid method' });
  }
};

export default rateLimit(handler, 15 * 60 * 1000); // Adjust the limit as needed
