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
  CircularProgress,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
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

const LoanInquiryForm = ({ car, price, tenure, interest_rate, down_payment, monthly_emi, total_interest, total_amount_payable, isOpen, onClose }) => {
  console.log(car, price, tenure, interest_rate, down_payment, monthly_emi, total_interest, total_amount_payable, "dddddddddddddddd");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
            <CircularProgress />
          </div>
        )}
        <DialogTitle>
          <strong>{submitted ? "Thank You" : "Loan Inquiry"}</strong>
        </DialogTitle>
        <Formik
          initialValues={{
            car: car,
            price: price,
            tenure: tenure,
            interest_rate: interest_rate,
            down_payment: down_payment,
            monthly_emi: monthly_emi,
            total_interest: total_interest,
            total_amount_payable: total_amount_payable,
            uae_national: "",
            application_type: "",
            name: "",
            email: "",
            mobile_number: "",
            monthly_income: "",
            emirate: "",
            subscribe_to_offers: false,
          }}
          validationSchema={Yup.object({
            uae_national: Yup.string().required("Required"),
            application_type: Yup.string().required("Required"),
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            mobile_number: Yup.string().required("Required"),
            monthly_income: Yup.string().required("Required"),
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

              const response = await axios.post("/api/loanEnquiry", {
                ...values,
                recaptchaToken: token,
              });

              if (response.status === 200) {
                setSubmitted(true);
                setSnackbarOpen(true); // Open the snackbar
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
                    <Typography variant="body2">Are you a UAE National?</Typography>
                    <RadioGroup
                      name="uae_national"
                      value={values.uae_national}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    <ErrorMessage
                      name="uae_national"
                      component="div"
                      className="text-red-500"
                    />
                    <Typography variant="body2">
                      Are you applying for yourself or a company?
                    </Typography>
                    <RadioGroup
                      name="application_type"
                      value={values.application_type}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="Individual"
                        control={<Radio />}
                        label="Individual"
                      />
                      <FormControlLabel
                        value="Company"
                        control={<Radio />}
                        label="Company"
                      />
                    </RadioGroup>
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
                      id="mobile_number"
                      name="mobile_number"
                      label="Mobile Number"
                      value={values.mobile_number}
                      onChange={handleChange}
                      error={touched.mobile_number && Boolean(errors.mobile_number)}
                      helperText={touched.mobile_number && errors.mobile_number}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      id="monthly_income"
                      name="monthly_income"
                      label="Monthly Income (AED)"
                      value={values.monthly_income}
                      onChange={handleChange}
                      error={touched.monthly_income && Boolean(errors.monthly_income)}
                      helperText={touched.monthly_income && errors.monthly_income}
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
                      {emirates.map((emirate) => (
                        <MenuItem key={emirate} value={emirate}>
                          {emirate}
                        </MenuItem>
                      ))}
                    </TextField>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="subscribe_to_offers"
                          checked={values.subscribe_to_offers}
                          onChange={handleChange}
                        />
                      }
                      label="Subscribe to receive special offers. Terms & conditions apply."
                    />
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
                    variant="contained"
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Thank you for your submission. We will contact you shortly!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoanInquiryForm;
