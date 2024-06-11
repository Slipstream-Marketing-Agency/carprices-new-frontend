import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
} from '@mui/material';

const SubscribeForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log('reCAPTCHA ready');
        });
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;
      document.body.appendChild(script);
    } else {
      loadRecaptcha();
    }
  }, []);

  const initialValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    try {
      setLoading(true);
      setSubmitting(true);

      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' });
      setRecaptchaToken(token);

      const response = await axios.post('/api/subscribe', {
        email: values.email,
        recaptchaToken: token,
      });

      setMessage(response.data);
      resetForm();
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box className="tw-max-w-md tw-mx-auto tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-p-8 tw-my-8">
      <Typography variant="h4" component="h2" gutterBottom>
        Subscribe to our Newsletter
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="tw-space-y-6">
            <div>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email Address"
                fullWidth
                variant="outlined"
                error={Boolean(ErrorMessage)}
                helperText={<ErrorMessage name="email" />}
              />
            </div>
            <Box display="flex" justifyContent="center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={setRecaptchaToken}
              />
            </Box>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !recaptchaToken}
                endIcon={loading && <CircularProgress size="1rem" />}
              >
                {isSubmitting ? 'Submitting...' : 'Subscribe'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {message && <Typography variant="body2" color="textSecondary" align="center">{message}</Typography>}
    </Box>
  );
};

export default SubscribeForm;
