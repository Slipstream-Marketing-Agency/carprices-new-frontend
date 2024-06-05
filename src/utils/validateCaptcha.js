// src/utils/validateCaptcha.js

import axios from 'axios';

export async function validateCaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(url);
    return response.data.success;
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
}
