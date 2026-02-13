// components/CarTestDriveForm.js
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al-Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

const BuyForm = ({ carName, brand, model, year, buyOpen, onClose }) => {
  const fullCarName = `${year} ${brand} ${model} ${carName}`;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
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

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={buyOpen} onClose={onClose} fullWidth maxWidth="sm">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
            <CircularProgress />
          </div>
        )}
        <DialogTitle>
          <strong>{submitted ? "Thank You" : "Buy Now"}</strong>
        </DialogTitle>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            emirate: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string().required("Required"),
            emirate: Yup.string()
              .oneOf(emirates, "Invalid Emirate")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setLoading(true);
              setSubmitting(true);
              const token = await window.grecaptcha.execute(
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                { action: "submit" }
              );

              const response = await axios.post("/api/buyCar", {
                ...values,
                carName: fullCarName,
                recaptchaToken: token,
              });

              if (response.status === 200) {
                setSubmitted(true);
                setSnackbarOpen(true); // Open the snackbar
              } else {if (process.env.NODE_ENV === 'development') { console.error("Error submitting form:", response); }
              }
            } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error submitting form:", error); }
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent dividers>
                {submitted ? (
                  <Typography variant="body1" mb={2}>
                    Thank you for your submission. We will contact you shortly.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body1" mb={2}>
                      You are expressing interest in buying a{" "}
                      <strong>{fullCarName}</strong>. We will forward your
                      request to the authorised dealer and their team will
                      contact you at the earliest to proceed with this request.
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
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" variant="outlined">
                  {submitted ? "Ok" : "Cancel"}
                </Button>
                {!submitted && (
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                )}
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Snackbar for Thank You prompt */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thank you for your submission. We will contact you shortly!
        </Alert>
      </Snackbar>
    </>
  );
};

export default BuyForm;
