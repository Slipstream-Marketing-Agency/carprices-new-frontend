"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "../modal/Modal";
import { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const steps = ["Vehicle Details", "Driver Details", "Get Quote"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //   insuranceQuote consts
  const [data, setData] = useState({
    model: "",
    email: "",
    password: "",
    car_year: "",
    brand: "",
    variant: "",
    brand1: "",
    first_car: "",
    city: "",
    nationality: "",
    country: "",
    experience: "",
    duration: "",
    full_name: "",
    dob: "",
    mobile_number: "",
  });

  const makeRequest = (formData) => {
    console.log("Form submitted", formData);
  };
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handleNextStep2 = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  const [currentStep, setCurrentStep] = useState(0);

  //   steps1,2 , validations

  // Step1ValidationSchema
  const stepOneValidationSchema = Yup.object({
    car_year: Yup.string().required().label("Car Year"),
  });

  //StepOne
  const StepOne = (props) => {
    const handleSubmit = (values) => {
      props.next(values);
    };
    return (
      <Formik
        validationSchema={stepOneValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form className=" my-6 p-2 min-h-[500px]">
            <div className="m-4 grid gap-4 sm:grid-cols-12">
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>Car Year</p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="car_year"
                  placeholder="Choose Year"
                />
                <ErrorMessage name="car_year" className="text-red-500" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Brand</p>
                <Field
                  className="border-2 radius-lg rounded-md p-2 w-full"
                  name="brand"
                  placeholder="Choose Brand"
                />
                <ErrorMessage name="brand" />
              </div>

              <div className="rounded-lg sm:col-span-6  sm:block">
                <p>Model</p>
                <Field
                  name="model"
                  className="border-2 radius-lg rounded-md p-2 w-full"
                  placeholder="Choose Model"
                />
                <ErrorMessage name="model" />
              </div>
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>Variant</p>
                <Field
                  name="variant"
                  className="border-2 radius-lg rounded-md p-2 w-full"
                  placeholder="Choose Variant"
                />
                <ErrorMessage name="variant" />
              </div>
              {/* Row3 */}
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>Is you car brand new ?</p>
                <Field name="brand1" placeholder="Choose Variant"></Field>
                <ErrorMessage name="brand1" />
              </div>
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>Are you buying you first car?</p>
                <Field name="first_car" placeholder="Choose Variant" />
                <ErrorMessage name="first_car" />
              </div>
              {/* Row4 */}
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>When was you car first registered?</p>
                <Field
                  name="Date"
                  className="border-2 radius-lg rounded-md p-2 w-full"
                  placeholder="Choose Date"
                />
                <ErrorMessage name="car_registered" />
              </div>
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>In which city do you want to register this car?</p>
                <Field
                  name="city"
                  className="border-2 radius-lg rounded-md p-2 w-full"
                  placeholder="Choose City"
                />
                <ErrorMessage name="city" />
              </div>
              {/* Row5 */}
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>Is this car GCC spec AND unmodified?</p>
                <Field name="GCCspec" placeholder="Choose Variant" />
                <ErrorMessage name="GCCspec" />
              </div>
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>Is the current policy fully comprehensive?</p>
                <Field name="last_name" placeholder="Choose Variant" />
                <ErrorMessage name="last_name" />
              </div>
              <div className="rounded-lg sm:col-span-6 sm:block">
                <p>
                  Does the current policy of this car include agency repair?
                </p>
                <Field name="repair" placeholder="Choose Variant" />
                <ErrorMessage name="repair" />
              </div>
            </div>
            <button
              className=" py-4 px-12 text-xs m-2 bg-blue-700 rounded-3xl sm:float-right text-white "
              type="submit"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    );
  };

  // step2 validationschema
  const stepTwoValidationSchema = Yup.object({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  //Steptwo
  const StepTwo = (props) => {
    const handleSubmit = (values) => {
      props.next(values, true);
    };

    return (
      <Formik
        validationSchema={stepTwoValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className=" my-6 p-2">
            <div className="m-4 grid gap-4 sm:grid-cols-12">
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Nationality</p>
                <Field
                  name="nationality"
                  placeholder=" Choose Nationality"
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                />
                <ErrorMessage name="nationality" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Which country issued your first driving license?</p>
                <Field
                  name="country"
                  placeholder="Choose Country"
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                />
                <ErrorMessage name="country" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>
                  How many years of international driving experience do you
                  have?
                </p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="experience"
                  placeholder="Choose Model"
                />
                <ErrorMessage name="experience" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>How long you have been driving in uae? </p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="duration"
                  placeholder="Choose Duration"
                />
                <ErrorMessage name="duration" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Full Name </p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="full_name"
                  placeholder=" Enter Full Name"
                />
                <ErrorMessage name="full_name" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Mobile Number</p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="mobile_number"
                  placeholder="Enter Mobile Number"
                />
                <ErrorMessage name="mobile_number" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Email Address </p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="email"
                  placeholder=" email"
                />
                <ErrorMessage name="email" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>Date of Birth</p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="dob"
                  placeholder="Choose Date of birth"
                />
                <ErrorMessage name="dob" />
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <p>
                  Are you looking for Fully Comprehensive insurance, or other
                </p>
                <Field
                  className="border-2 radius-lg  radius-lg rounded-md p-2 w-full"
                  name="insurance"
                  placeholder="Choose"
                />
                <ErrorMessage name="insurance" />
              </div>
            </div>
            <div className="m-4 grid gap-4 sm:grid-cols-12">
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <button
                  onClick={() => props.prev(values)}
                  className=" py-4 px-16 text-xs m-2  bg-blue-700 rounded-3xl sm:float-left text-white "
                  type="button"
                >
                  Back
                </button>
              </div>
              <div className=" rounded-lg sm:col-span-6 sm:block">
                <button
                  className=" py-4 px-12 text-xs m-2  bg-blue-700 rounded-3xl sm:float-right text-white "
                  type="submit"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  const formSteps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Modal modal={"open"} />
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <div>{formSteps[activeStep]}</div>
          {/* <div>{steps[activeStep]}</div> */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button className="bg-blue-500 text-black" onClick={handleNext}>
            {/* <Button className="bg-blue-500 text-black" onClick={handleNextStep}> */}
              {/* {activeStep === steps.length - 1 ? 'finish' : 'Next'} */}
              {activeStep === steps.length - 2
                ? "Get Quote"
                : activeStep === steps.length - 1
                ? ""
                : "Continue"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
