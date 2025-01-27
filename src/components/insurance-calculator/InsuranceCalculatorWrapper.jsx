"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ExpandableText from "@/components/common/ExpandableText";
import Ad300x600 from "@/components/ads/Ad300x600";
import { Alert, Snackbar } from "@mui/material";

const InsuranceCalculatorWrapper = ({ apiUrl = process.env.NEXT_PUBLIC_API_URL }) => {
    const [currentStep, setCurrentStep] = useState("year");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedTrim, setSelectedTrim] = useState("");
    const [vehicleSpec, setVehicleSpec] = useState("");
    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);

    useEffect(() => {
        fetchYears();
    }, []);

    const fetchYears = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}car-trims/years`);
            setYears(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching years:", error);
            setLoading(false);
        }
    };

    const fetchBrands = async (year) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}car-trims/${year}/brands?page=1&pageSize=100`);
            setBrands(response.data.brands || []);
            setCurrentStep("brand");
            setLoading(false);
        } catch (error) {
            console.error("Error fetching brands:", error);
            setLoading(false);
        }
    };

    const fetchModels = async (brand) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}car-trims/${selectedYear}/brands/${brand}/models`);
            setModels(response.data.models || []);
            setCurrentStep("model");
            setLoading(false);
        } catch (error) {
            console.error("Error fetching models:", error);
            setLoading(false);
        }
    };

    const fetchTrims = async (model) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}car-trims/${selectedYear}/brands/${selectedBrand}/models/${model}/trims`);
            setTrims(response.data.trims || []);
            setCurrentStep("trim");
            setLoading(false);
        } catch (error) {
            console.error("Error fetching trims:", error);
            setLoading(false);
        }
    };

    const handleSelect = (type, value) => {
        switch (type) {
            case "year":
                setSelectedYear(value);
                setSelectedBrand("");
                setSelectedModel("");
                setSelectedTrim("");
                fetchBrands(value);
                break;
            case "brand":
                setSelectedBrand(value);
                setSelectedModel("");
                setSelectedTrim("");
                fetchModels(value);
                break;
            case "model":
                setSelectedModel(value);
                setSelectedTrim("");
                fetchTrims(value);
                break;
            case "trim":
                setSelectedTrim(value);
                setCurrentStep("spec");
                break;
            case "spec":
                setVehicleSpec(value);
                setCurrentStep("form");
                break;
            default:
                break;
        }
    };

    const handleBackStep = () => {
        switch (currentStep) {
            case "brand":
                setCurrentStep("year");
                break;
            case "model":
                setCurrentStep("brand");
                break;
            case "trim":
                setCurrentStep("model");
                break;
            case "spec":
                setCurrentStep("trim");
                break;
            case "form":
                setCurrentStep("spec");
                break;
            default:
                break;
        }
    };

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        dob: Yup.string().required("Date of Birth is required"),
        mobile_number: Yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").min(8, "Must be at least 8 digits").required("Phone number is required"),
        first_registered: Yup.string().required("First registered date is required"),
        city_to_register: Yup.string().required("City is required"),
        years_of_international_driving_experience: Yup.string().required("Driving experience is required"),
        driving_in_uae: Yup.string().required("Driving in UAE is required"),
    });

    const initialValues = {
        brand_new: false,
        first_car: false,
        first_registered: "",
        city_to_register: "",
        is_the_current_policy_full_comprehensive: false,
        current_policy_includes_agency_repair: false,
        years_of_international_driving_experience: "",
        driving_in_uae: "",
        full_name: "",
        mobile_number: "",
        email: "",
        dob: "",
        insuranceType: "Fully Comprehensive",
    };

    const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log('submitting...')
            setLoading(true);
            setSubmitting(true);
            const data = {
                year: selectedYear,
                brand: selectedBrand,
                model: selectedModel,
                variant: selectedTrim,
                nationality: "UAE",
                country: "United Arab Emirates",
                gcc_and_unmodified: true,
                ...values,
                years_of_international_driving_experience: String(values.years_of_international_driving_experience || ""),
                driving_in_uae: String(values.driving_in_uae || ""),
            };
            
            // return
            // Check if reCAPTCHA is loaded
            // if (!window.grecaptcha) {
            //     throw new Error("Google reCAPTCHA is not available.");
            // }
            // const token = await window.grecaptcha.execute(
            //     process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            //     { action: "submit" }
            // );

            // const response = await axios.post("/api/insurance-calculator", {
            //     ...values,
            //     recaptchaToken: token,
            // });

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}insurance-calculator-enquiries`,
                {
                  data,
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                  },
                }
              );
              console.log(response.status === 200)

            if (response.status === 200) {
                setSnackbarOpen(true); // Open the snackbar
                resetForm()
                setCurrentStep("year")
            } else {
                console.error("Error submitting form:", response);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const disabled = true;
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <div className="container grid grid-cols-12">
            <div className="col-span-12 md:col-span-9">
                <div className="shadow-md p-4 mt-5 rounded-lg">
                    <h1 className="md:text-3xl text-xl font-semibold">UAE Car Insurance Calculator - Get Instant Car Insurance Quotes Online</h1>
                    <h4 className="md:text-lg text-md font-medium text-blue-600">
                        Calculate Your Car Insurance Costs in UAE with Accurate and Up-to-Date Rates
                    </h4>
                    <ExpandableText content={`<p>Use our comprehensive Car Insurance Calculator to estimate insurance costs for your car in the UAE. Select your car’s model year, brand, model, and specifications to get an accurate insurance quote tailored to your vehicle. With our easy-to-use tool, you can quickly compare insurance options based on the latest prices and find the best insurance deal for your car. Start your journey toward hassle-free car insurance now!</p>`} />
                </div>

                <div className="flex flex-col items-center shadow-md p-4 mt-5 rounded-lg">
                    {loading && <p className="text-blue-500 mb-4">Loading...</p>}

                    {currentStep === "year" && (
                        <>
                            <h4 className="text-xl text-gray-500 mb-3 font-semibold">Select Car&apos;s model year</h4>
                            <div className="flex flex-wrap gap-4">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        className="bg-white sm:col-span-2 col-span-3 p-4 rounded-lg border hover:bg-gray-200"
                                        onClick={() => handleSelect("year", year)}
                                    >
                                        <div className="text-center font-semibold">{year}</div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === "brand" && (
                        <>
                            <p className="text-xl text-gray-500 mb-3 font-semibold">Select Brand</p>
                            <div className="grid gap-6 md:grid-cols-4 grid-cols-2">
                                {brands.map((brand) => (
                                    <button
                                        key={brand.slug}
                                        className="cursor-pointer flex flex-col items-center p-4 hover:bg-gray-200 rounded-lg border"
                                        onClick={() => handleSelect("brand", brand.slug)}
                                    >
                                        <Image
                                            src={brand.brandLogo}
                                            alt={`${brand.name} logo`}
                                            width={60}
                                            height={60}
                                            className="mb-2"
                                        />
                                        <div className="capitalize font-semibold text-center text-xs">
                                            {brand.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === "model" && (
                        <>
                            <p className="text-xl text-gray-500 mb-3 font-semibold">Select Model</p>
                            <div className="flex flex-wrap gap-4">
                                {models.map((model) => (
                                    <button
                                        key={model.slug}
                                        className="py-4 shadow whitespace-nowrap rounded-lg hover:bg-gray-200 text-left px-2"
                                        onClick={() => handleSelect("model", model.slug)}
                                    >
                                        {model.name}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === "trim" && (
                        <>
                            <p className="text-xl text-gray-500 mb-3 font-semibold">Select Variant</p>
                            <div className="flex flex-wrap gap-4">
                                {trims.map((trim) => (
                                    <button
                                        key={trim.mainSlug}
                                        className="py-4 shadow whitespace-nowrap rounded-lg hover:bg-gray-200 text-left px-2"
                                        onClick={() => handleSelect("trim", trim.mainSlug)}
                                    >
                                        {trim.name}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === "spec" && (
                        <>
                            <p className="text-xl text-gray-500 mb-3 font-semibold">What is Your Vehicle&apos;s Specification ?</p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="py-4 shadow whitespace-nowrap rounded-lg hover:bg-gray-200 text-left px-2"
                                    onClick={() => handleSelect("spec", "GCC Spec")}
                                >
                                    GCC Spec
                                </button>
                                <button
                                    disabled={disabled}
                                    className={`py-4 shadow whitespace-nowrap rounded-lg text-left px-2 ${disabled ? "bg-gray-400" : "hover:bg-gray-200"}`}
                                    onClick={() => handleSelect("spec", "Non-GCC Spec/Modified")}
                                >
                                    Non-GCC Spec/Modified
                                </button>
                            </div>
                        </>
                    )}

                    {currentStep === "form" && (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmitForm}
                        >
                            {({ isValid, dirty, isSubmitting }) => (
                                <Form className="w-full grid grid-cols-1 gap-6 bg-white p-6 rounded-lg shadow-lg border">
                                    <h3 className="text-lg font-semibold text-gray-700">Please Fill Your Details</h3>

                                    <div>
                                        <Field
                                            name="full_name"
                                            placeholder="Your Name"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="full_name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            name="mobile_number"
                                            type="tel"
                                            placeholder="Mobile Number"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="mobile_number"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            name="dob"
                                            type="date"
                                            placeholder="Date of Birth"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="dob"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            name="first_registered"
                                            type="date"
                                            placeholder="First Registered Date"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="first_registered"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            name="city_to_register"
                                            placeholder="City to Register"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="city_to_register"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Field
                                            name="brand_new"
                                            type="checkbox"
                                            className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                        />
                                        <label htmlFor="brand_new" className="text-gray-600">
                                            Brand New
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Field
                                            name="first_car"
                                            type="checkbox"
                                            className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                        />
                                        <label htmlFor="first_car" className="text-gray-600">
                                            First Car
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Field
                                            name="is_the_current_policy_full_comprehensive"
                                            type="checkbox"
                                            className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                        />
                                        <label htmlFor="is_the_current_policy_full_comprehensive" className="text-gray-600">
                                            Is the Current Policy Fully Comprehensive?
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Field
                                            name="current_policy_includes_agency_repair"
                                            type="checkbox"
                                            className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                        />
                                        <label htmlFor="current_policy_includes_agency_repair" className="text-gray-600">
                                            Current Policy Includes Agency Repair
                                        </label>
                                    </div>

                                    <div>
                                        <Field
                                            name="years_of_international_driving_experience"
                                            type="number"
                                            placeholder="Years of International Driving Experience"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="years_of_international_driving_experience"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            name="driving_in_uae"
                                            placeholder="Driving in UAE"
                                            type="number"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <ErrorMessage
                                            name="driving_in_uae"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            as="select"
                                            name="insuranceType"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Fully Comprehensive">Fully Comprehensive</option>
                                            <option value="Third Party">Third Party</option>
                                        </Field>
                                        <ErrorMessage
                                            name="insuranceType"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        By clicking on &quot;Proceed&quot;, I declare that I agree to the website{" "}
                                        <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span> and{" "}
                                        <span className="text-blue-600 underline cursor-pointer">Terms of Use</span>.
                                    </p>

                                    <button
                                        type="submit"
                                        className={`w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out ${!(isValid && dirty) || isSubmitting
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                            }`}
                                        disabled={!(isValid && dirty) || isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )}

                    <div className="flex justify-center mt-6 w-full">
                        {currentStep !== "year" && (
                            <button
                                onClick={handleBackStep}
                                className="bg-[#77cdf2] w-full text-white p-2 rounded-lg hover:bg-[#77cdf2]"
                            >
                                Back
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="col-span-3">
                <div className="my-6 sticky top-16 md:block hidden">
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300x600 dataAdSlot="1269400005" />
                    </Suspense>
                </div>
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
            </div>
        </div>
    );
};

export default InsuranceCalculatorWrapper;
