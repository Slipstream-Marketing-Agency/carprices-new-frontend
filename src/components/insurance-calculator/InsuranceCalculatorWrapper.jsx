"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ExpandableText from "@/components/common/ExpandableText";
import Ad300x600 from "@/components/ads/Ad300x600";

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

    // Validation schema for the final form step
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        dob: Yup.string().required("Date of Birth is required"),
        phone: Yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").min(8, "Must be at least 8 digits").required("Phone number is required"),
    });

    const disabled = true

    return (
        <div className="container grid grid-cols-12 ">

            <div className="col-span-12 md:col-span-9  ">
                <div className='shadow-md p-4 mt-5 rounded-lg'>
                    <h1 className="md:text-3xl text-xl font-semibold">UAE Car Insurance Calculator - Get Instant Car Insurance Quotes Online</h1>
                    <h4 className="md:text-lg text-md font-medium text-blue-600">
                        Calculate Your Car Insurance Costs in UAE with Accurate and Up-to-Date Rates
                    </h4>
                    <ExpandableText content={`<p>Use our comprehensive Car Insurance Calculator to estimate insurance costs for your car in the UAE. Select your car’s model year, brand, model, and specifications to get an accurate insurance quote tailored to your vehicle. With our easy-to-use tool, you can quickly compare insurance options based on the latest prices and find the best insurance deal for your car. Start your journey toward hassle-free car insurance now!</p>`} />
                </div>

                <div className='flex flex-col items-center shadow-md p-4 mt-5 rounded-lg'>
                    {loading && <p className="text-blue-500 mb-4">Loading...</p>}

                    {currentStep === "year" && (
                        <>            <h4 className="text-xl text-gray-500 mb-3 font-semibold">Select Car&apos;s model year</h4>

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
                        <><p className="text-xl text-gray-500 mb-3 font-semibold">Select Brand</p>
                            <div className="grid gap-6 md:grid-cols-4 grid-cols-2">
                                {brands.map((brand) => (
                                    <button
                                        key={brand.slug}
                                        className="cursor-pointer flex flex-col items-center p-4 hover:bg-gray-200 rounded-lg border"
                                        onClick={() => handleSelect("brand", brand.slug)}
                                    >
                                        <Image
                                            src={brand.brandLogo} // Assuming brandLogo URL is correct
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
                        <><p className="text-xl text-gray-500 mb-3 font-semibold">Select Model</p>
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
                        <><p className="text-xl text-gray-500 mb-3 font-semibold">Select Variant</p>
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
                        <><p className="text-xl text-gray-500 mb-3 font-semibold">What is Your Vehicle&apos;s Specification ?</p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="py-4 shadow whitespace-nowrap rounded-lg hover:bg-gray-200 text-left px-2"
                                    onClick={() => handleSelect("spec", "GCC Spec")}
                                >
                                    GCC Spec
                                </button>
                                <button
                                    disabled={disabled}
                                    className={`py-4 shadow whitespace-nowrap rounded-lg text-left px-2 
                                 ${disabled ? "bg-gray-400" : "hover:bg-gray-200"}`}
                                    onClick={() => handleSelect("spec", "Non-GCC Spec/Modified")}
                                >
                                    Non-GCC Spec/Modified
                                </button>
                            </div>
                        </>
                    )}

                    {currentStep === "form" && (
                        <Formik
                            initialValues={{ name: "", email: "", dob: "", phone: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                alert("Form submitted successfully with data: " + JSON.stringify(values, null, 2));
                            }}
                        >
                            {({ isValid, dirty }) => (
                                <Form className="w-full">
                                    <h3 className="text-md font-semibold mb-4">Please Fill Your Details</h3>
                                    <div className="mb-4">
                                        <Field
                                            name="name"
                                            placeholder="Your Name"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            name="email"
                                            placeholder="Email"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            type="date"
                                            name="dob"
                                            placeholder="Date of Birth (DD/MMM/YYYY)"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                        <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            name="phone"
                                            placeholder="Mobile Number"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <p>By Clicking on &quot;Proceed&quot;, I declare that I agree to the website Privacy Policy and Terms of Use.</p>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none mt-4"
                                        disabled={!(isValid && dirty)} // Disable if form is invalid or untouched
                                    >
                                        Submit
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

            <div className="col-span-3"><div className='my-6 sticky top-0  md:block hidden'>
                <Suspense fallback={<div>Loading ad...</div>}>
                    <Ad300x600 dataAdSlot="1269400005" />
                </Suspense>
            </div></div>
        </div>
    );
}

export default InsuranceCalculatorWrapper