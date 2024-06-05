// components/CarTestDriveForm.js
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  Box,
  CircularProgress,
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

const CarTestDriveForm = ({ carName, brand, model, year, open, onClose }) => {
  const fullCarName = `${year} ${brand} ${model} (${carName})`;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    <>
      {loading && (
        <div className="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-75 tw-flex tw-justify-center tw-items-center tw-z-50">
          <CircularProgress />
        </div>
      )}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <strong>Book a Test Drive</strong>
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

              const response = await axios.post("/api/bookTestDrive", {
                ...values,
                carName: fullCarName,
                recaptchaToken: token,
              });

              if (response.status === 200) {
                setSubmitted(true);
              } else {
                console.error("Error submitting form:", response);
              }
            } catch (error) {
              console.error("Error submitting form:", error);
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
                      You are booking a test drive for the{" "}
                      <strong>{fullCarName}</strong>. We will forward your
                      request to the authorised dealer and their team will
                      contact you at the earliest to schedule a test drive.
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
                <Button
                  onClick={onClose}
                  color="primary"
                  variant="outlined"
                  disabled={loading}
                >
                  {submitted ? "OK" : "Cancel"}
                </Button>
                {!submitted && (
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    disabled={isSubmitting || loading}
                  >
                    Submit
                  </Button>
                )}
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CarTestDriveForm;
