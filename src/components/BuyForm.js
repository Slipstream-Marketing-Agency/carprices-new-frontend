// components/CarTestDriveForm.js
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

const emirates = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al-Quwain',
  'Ras Al Khaimah',
  'Fujairah'
];

const BuyForm = ({ carName, brand, model, year, buyOpen, onClose }) => {
  const fullCarName = `${year} ${brand} ${model} (${carName})`;

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log("reCAPTCHA ready");
        });
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;
      document.body.appendChild(script);
    } else {
      loadRecaptcha();
    }
  }, []);

  return (
    <Dialog open={buyOpen} onClose={onClose} fullWidth maxWidth="sm">
       <DialogTitle><strong>Buy Now</strong></DialogTitle>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          emirate: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          phone: Yup.string().required('Required'),
          emirate: Yup.string().oneOf(emirates, 'Invalid Emirate').required('Required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const token = await window.grecaptcha.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              { action: 'submit' }
            );

            const response = await axios.post('/api/buyCar', {
              ...values,
              carName: fullCarName,
              recaptchaToken: token,
            });

            if (response.status === 200) {
              onClose();
            } else {
              console.error('Error submitting form:', response);
            }
          } catch (error) {
            console.error('Error submitting form:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Typography variant="body1" mb={2}>
              You are expressing interest in buying a <strong>{fullCarName}</strong>.. We will forward your request to the authorised dealer and their team will contact you at the earliest to proceed with this request.
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                id="phone"
                name="phone"
                label="Phone"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                select
                margin="normal"
                id="emirate"
                name="emirate"
                label="Emirate"
                value={values.emirate}
                onChange={handleChange}
                error={touched.emirate && Boolean(errors.emirate)}
                helperText={touched.emirate && errors.emirate}
              >
                <MenuItem value="">
                  <em>Select Emirate</em>
                </MenuItem>
                {emirates.map((emirate) => (
                  <MenuItem key={emirate} value={emirate}>
                    {emirate}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="outlined" disabled={isSubmitting}>
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default BuyForm;
