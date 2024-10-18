import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Box,
    Grid
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

const LoanInquireForm = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fullCarName = "Loan Inquiry";
    const handleClose = () => {
        onClose();
        setSubmitted(false);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
                {loading && (
                    <div className="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-75 tw-flex tw-justify-center tw-items-center tw-z-50">
                        <CircularProgress />
                    </div>
                )}
                <DialogTitle>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <strong>{submitted ? "Thank You" : "Apply now and have us call you"}</strong>
                        </Grid>
                        <Grid item>
                            {/* Bank Logo */}
                            <img
                                src="/carLoanPage/enbd-logo.jpg" // Replace with your actual logo URL
                                alt="Bank Logo"
                                style={{ height: "40px", width: "auto" }}
                            />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Formik
                    initialValues={{
                        uaeNational: "",
                        applyingAs: "",
                        name: "",
                        email: "",
                        phone: "",
                        income: "",
                        emirate: "",
                        subscribe: false,
                    }}
                    validationSchema={Yup.object({
                        uaeNational: Yup.string().required("Required"),
                        applyingAs: Yup.string().required("Required"),
                        name: Yup.string().required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        phone: Yup.string().required("Required"),
                        income: Yup.string().required("Required"),
                        emirate: Yup.string().required("Required"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setLoading(true);
                            setSubmitting(true);
                            // Handle your form submission logic here

                            // Simulate submission success
                            setSubmitted(true);
                            setTimeout(() => {
                                setLoading(false);
                                onClose();
                            }, 1000);
                        } catch (error) {
                            console.error("Error submitting form:", error);
                        } finally {
                            setLoading(false);
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
                                        {/* Are you a UAE National? */}
                                        <Typography variant="body2">Are you a UAE National?</Typography>
                                        <RadioGroup
                                            name="uaeNational"
                                            value={values.uaeNational}
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
                                            name="uaeNational"
                                            component="div"
                                            className="tw-text-red-500"
                                        />

                                        {/* Are you applying for yourself or a company? */}
                                        <Typography variant="body2">
                                            Are you applying for yourself or a company?
                                        </Typography>
                                        <RadioGroup
                                            name="applyingAs"
                                            value={values.applyingAs}
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
                                        <ErrorMessage
                                            name="applyingAs"
                                            component="div"
                                            className="tw-text-red-500"
                                        />

                                        {/* Name, Email, Phone */}
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
                                            label="Mobile Number"
                                            value={values.phone}
                                            onChange={handleChange}
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            InputProps={{
                                                startAdornment: <span>+971</span>,
                                            }}
                                        />

                                        {/* Monthly Income */}
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            id="income"
                                            name="income"
                                            label="Monthly Income (AED)"
                                            value={values.income}
                                            onChange={handleChange}
                                            error={touched.income && Boolean(errors.income)}
                                            helperText={touched.income && errors.income}
                                        />

                                        {/* Emirate */}
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

                                        {/* Subscribe Checkbox */}
                                        <Box mt={2}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="subscribe"
                                                        checked={values.subscribe}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label="Subscribe to receive special offers. Terms & conditions apply."
                                            />
                                        </Box>
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
        </>
    );
};

export default LoanInquireForm;
