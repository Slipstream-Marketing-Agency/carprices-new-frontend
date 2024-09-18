"use client";
import { useFormik } from "formik";
import { useCallback, useMemo, useState, useEffect } from "react";
import Stepper from "../3stepper/Stepper";
import Modal from "../modal/Modal";
import { carData } from "@/src/mocks/mock";
import Select from "react-select";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import debounce from "lodash/debounce";
import countryList from "react-select-country-list";

function InsuranceQuote() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    car_year: "",
    car_brand: "",
    model: "",
    variant: "",
    insurance: "",
    is_fully_comprehensive: "",
    brand_new_car: "",
    car_first_registered: "",
    first_car: "",
    city: "",
    gcc_spec: "",
    agency_repair: "",
    nationality: "",
    country: "",
    experience: "",
    duration: "",
    full_name: "",
    mobile_number: "",
    email: "",
    dob: "",
  });

  const datePickerId = new Date().toISOString().split("T")[0];
  const [currentStep, setCurrentStep] = useState(0);
  
  const [brandsList, setBrandsList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [trimList, setTrimList] = useState([]);

  // console.log(modelsList, "modelsList");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "car-brands/names"
        );
        const brandsData = response.data.map((brand) => ({
          value: brand.id,
          label: brand.attributes.name,
        }));
        setBrandsList(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

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
  const StepOne = (props) => {
    const [modelsList, setModelsList] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [trimList, setTrimList] = useState([]);

    // Memoized formik configuration to avoid unnecessary re-renders
    const formik = useFormik({
      initialValues: {
        car_year: "",
        car_brand: "",
        model: "",
        variant: "",
        is_fully_comprehensive: "",
        brand_new_car: "",
        car_first_registered: "",
        first_car: "",
        city: "",
        gcc_spec: "",
        agency_repair: "",
      },
      validationSchema: Yup.object({
        car_year: Yup.object().required("This field is required."),
        car_brand: Yup.object().nullable().required("This field is required."),
        model: Yup.object().nullable().required("This field is required."),
        variant: Yup.object().nullable().required("This field is required."),
        is_fully_comprehensive: Yup.string().required("This field is required."),
        brand_new_car: Yup.string().required("This field is required."),
        car_first_registered: Yup.string().required("This field is required."),
        first_car: Yup.string().required("This field is required."),
        city: Yup.string().required("This field is required."),
        gcc_spec: Yup.string().required("This field is required."),
        agency_repair: Yup.string().required("This field is required."),
      }),
      onSubmit: (values) => {
        console.log("clicked submit step one")
        props.next(values, false);
      },
    });

    const handleMakeChange = useCallback((selectedOption) => {
      if (formik.values.car_brand !== selectedOption) {
        formik.setFieldValue("car_brand", selectedOption);
        formik.setFieldValue("model", null);
        formik.setFieldValue("car_year", null);
        formik.setFieldValue("variant", null);
        setModelsList([]);
        setYearList([]);
        setTrimList([]);

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}car-brands/${selectedOption.value}/with-models`
          )
          .then((response) => {
            const data = response.data.attributes.models.map((item) => ({
              value: item.id,
              label: item.name,
            }));
            setModelsList(data);
          })
          .catch((error) => {
            console.error("Error fetching models:", error);
          });
      }
    }, [formik]);

    const handleModelChange = useCallback((selectedOption) => {
      if (formik.values.model !== selectedOption) {
        formik.setFieldValue("model", selectedOption);
        formik.setFieldValue("car_year", null);
        formik.setFieldValue("variant", null);
        setYearList([]);
        setTrimList([]);

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/${selectedOption.value}/years-under-trims`
          )
          .then((response) => {
            const data = response.data.map((item) => ({
              value: item,
              label: item,
            }));
            setYearList(data);
          })
          .catch((error) => {
            console.error("Error fetching years:", error);
          });
      }
    }, [formik]);

    const handleYearChange = useCallback((selectedOption) => {
      if (formik.values.car_year !== selectedOption) {
        formik.setFieldValue("car_year", selectedOption);
        formik.setFieldValue("variant", null);
        setTrimList([]);

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/${formik.values.model.value}/trims/${selectedOption.value}`
          )
          .then((response) => {
            const data = response.data.data.trims.map((item) => ({
              value: item.name,
              label: item.name,
              price: item.price,
              image: item.featuredImage,
            }));
            setTrimList(data);
          })
          .catch((error) => {
            console.error("Error fetching trims:", error);
          });
      }
    }, [formik]);

    const handleVariantChange = useCallback((selectedOption) => {
      formik.setFieldValue("variant", selectedOption);
    }, [formik]);

    // Memoize options so they are recalculated only when necessary
    const cityOptions = useMemo(() => carData?.optionsCities, [carData]);

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="tw-lg:m-0 sm:tw-my-6 sm:tw-p-2 tw-text-sm">
          <div className="tw-grid tw-gap-x-12 tw-gap-6 sm:tw-grid-cols-12">
            {/* Car Brand Select */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Car Brand</p>
              <Select
                value={formik.values.car_brand}
                onChange={handleMakeChange}
                options={brandsList}
                placeholder={"Choose Brand"}
                isSearchable
              />
              {formik.errors.car_brand && formik.touched.car_brand ? (
                <div className="error-text">{formik.errors.car_brand}</div>
              ) : null}
            </div>

            {/* Model Select */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Model</p>
              <Select
                value={formik.values.model}
                onChange={handleModelChange}
                options={modelsList}
                placeholder={"Choose Model"}
                isSearchable
                isDisabled={!formik.values.car_brand}
              />
              {formik.errors.model && formik.touched.model ? (
                <div className="error-text">{formik.errors.model}</div>
              ) : null}
            </div>

            {/* Year Select */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Year</p>
              <Select
                value={formik.values.car_year}
                onChange={handleYearChange}
                options={yearList}
                placeholder={"Choose Year"}
                isSearchable
                isDisabled={!formik.values.model}
              />
              {formik.errors.car_year && formik.touched.car_year ? (
                <div className="error-text">{formik.errors.car_year}</div>
              ) : null}
            </div>

            {/* Variant Select */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Variant</p>
              <Select
                value={formik.values.variant}
                onChange={handleVariantChange}
                options={trimList}
                placeholder={"Choose Variant"}
                isSearchable
                isDisabled={!formik.values.car_year}
              />
              {formik.errors.variant && formik.touched.variant ? (
                <div className="error-text">{formik.errors.variant}</div>
              ) : null}
            </div>

            {/* Additional Form Fields */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Is your car brand new?
              </p>
              <div className="tw-grid tw-gap-4 tw-grid-cols-2">
                <div>
                  <input
                    type="radio"
                    id="brand_new_car_yes"
                    name="brand_new_car"
                    value="Yes"
                    checked={formik.values.brand_new_car === "Yes"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="brand_new_car_yes"
                    className={`${formik.values.brand_new_car === "Yes"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">Yes</div>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="brand_new_car_no"
                    name="brand_new_car"
                    value="No"
                    checked={formik.values.brand_new_car === "No"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="brand_new_car_no"
                    className={`${formik.values.brand_new_car === "No"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">No</div>
                    </div>
                  </label>
                </div>
              </div>
              {formik.errors.brand_new_car ? (
                <div className="error-text">
                  {formik.errors.brand_new_car}
                </div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Are you buying your first car?
              </p>
              <div className="tw-grid tw-gap-4 tw-grid-cols-2">
                <div>
                  <input
                    type="radio"
                    id="first_car_yes"
                    name="first_car"
                    value="Yes"
                    checked={formik.values.first_car === "Yes"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="first_car_yes"
                    className={`${formik.values.first_car === "Yes"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">Yes</div>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="first_car_no"
                    name="first_car"
                    value="No"
                    checked={formik.values.first_car === "No"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="first_car_no"
                    className={`${formik.values.first_car === "No"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">No</div>
                    </div>
                  </label>
                </div>
              </div>
              {formik.errors.first_car ? (
                <div className="error-text">{formik.errors.first_car}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                When was your car first registered?
              </p>
              <input
                type="date"
                max={datePickerId}
                onChange={formik.handleChange}
                name="car_first_registered"
                className="input-date"
                placeholder="Choose Date"
              />
              {formik.errors.car_first_registered ? (
                <div className="error-text">
                  {formik.errors.car_first_registered}
                </div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                In which city do you want to register this car?
              </p>
              <Select
                value={
                  formik.values.city
                    ? { value: formik.values.city, label: formik.values.city }
                    : null
                }
                onChange={(value) => formik.setFieldValue("city", value.value)}
                options={carData?.optionsCities}
                placeholder={"Choose City"}
                isSearchable
              />
              {formik.errors.city ? (
                <div className="error-text">{formik.errors.city}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Is this car GCC spec AND unmodified?
              </p>
              <div className="tw-grid tw-gap-4 tw-grid-cols-2">
                <div>
                  <input
                    type="radio"
                    id="gcc_spec_yes"
                    name="gcc_spec"
                    value="Yes"
                    checked={formik.values.gcc_spec === "Yes"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="gcc_spec_yes"
                    className={`${formik.values.gcc_spec === "Yes"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">Yes</div>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gcc_spec_no"
                    name="gcc_spec"
                    value="No"
                    checked={formik.values.gcc_spec === "No"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="gcc_spec_no"
                    className={`${formik.values.gcc_spec === "No"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">No</div>
                    </div>
                  </label>
                </div>
              </div>
              {formik.errors.gcc_spec ? (
                <div className="error-text">{formik.errors.gcc_spec}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Is the current policy fully comprehensive?
              </p>
              <div className="tw-grid tw-gap-4 tw-grid-cols-2">
                <div>
                  <input
                    type="radio"
                    id="is_fully_comprehensive_yes"
                    name="is_fully_comprehensive"
                    value="Yes"
                    checked={formik.values.is_fully_comprehensive === "Yes"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="is_fully_comprehensive_yes"
                    className={`${formik.values.is_fully_comprehensive === "Yes"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">Yes</div>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="is_fully_comprehensive_no"
                    name="is_fully_comprehensive"
                    value="No"
                    checked={formik.values.is_fully_comprehensive === "No"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="is_fully_comprehensive_no"
                    className={`${formik.values.is_fully_comprehensive === "No"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">No</div>
                    </div>
                  </label>
                </div>
              </div>
              {formik.errors.is_fully_comprehensive ? (
                <div className="error-text">
                  {formik.errors.is_fully_comprehensive}
                </div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Does the current policy of this car include agency repair?
              </p>
              <div className="tw-grid tw-gap-4 tw-grid-cols-2">
                <div>
                  <input
                    type="radio"
                    id="agency_repair_yes"
                    name="agency_repair"
                    value="Yes"
                    checked={formik.values.agency_repair === "Yes"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="agency_repair_yes"
                    className={`${formik.values.agency_repair === "Yes"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">Yes</div>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="agency_repair_no"
                    name="agency_repair"
                    value="No"
                    checked={formik.values.agency_repair === "No"}
                    onChange={formik.handleChange}
                    className="tw-hidden peer"
                  />
                  <label
                    htmlFor="agency_repair_no"
                    className={`${formik.values.agency_repair === "No"
                        ? "label-radio-btn-active"
                        : "label-radio-btn"
                      }`}
                  >
                    <div className="tw-block">
                      <div className="tw-w-full">No</div>
                    </div>
                  </label>
                </div>
              </div>
              {formik.errors.agency_repair ? (
                <div className="error-text">
                  {formik.errors.agency_repair}
                </div>
              ) : null}
            </div>
            {/* Radio Inputs, Date Input, City Select, etc. */}
          </div>
          <button
            className="tw-mt-8 tw-mx-10 lg:tw-mx-6 tw-w-3/4 lg:tw-w-auto tw-py-3 tw-px-12 tw-text-xs tw-bg-blue-600 tw-rounded-3xl sm:tw-float-right tw-text-white"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    );
  };


  const StepTwo = (props) => {
    const formik = useFormik({
      initialValues: {
        nationality: "",
        country: "",
        experience: "",
        duration: "",
        full_name: "",
        mobile_number: "",
        email: "",
        dob: "",
        insurance: "",
      },
      validationSchema: Yup.object({
        nationality: Yup.string().required("This field is required."),
        country: Yup.string().required("This field is required."),
        experience: Yup.string().required("This field is required."),
        duration: Yup.string().required("This field is required."),
        full_name: Yup.string().required("This field is required."),
        mobile_number: Yup.string().required("This field is required."),
        email: Yup.string()
          .email("Invalid email address")
          .required("This field is required."),
        dob: Yup.string().required("This field is required."),
        insurance: Yup.string().required("This field is required."),
      }),
      onSubmit: (values) => {
        props.next(values, true);
      },
    });
    const countryListOptions = useMemo(() => countryList().getData(), [])
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="tw-lg:m-0 sm:tw-my-6 sm:tw-p-2">
          <div className="tw-grid tw-gap-x-12 tw-gap-6 sm:tw-grid-cols-12">
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Nationality</p>
              <div>
                <Select
                  options={carData?.optionsNationalities}
                  value={
                    formik.values.nationality
                      ? {
                        value: formik.values.nationality,
                        label: formik.values.nationality,
                      }
                      : null
                  }
                  onChange={(value) =>
                    formik.setFieldValue("nationality", value.value)
                  }
                  placeholder={"Choose Nationality"}
                  isSearchable
                />
                {formik.errors.nationality ? (
                  <div className="error-text">
                    {formik.errors.nationality}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Which country issued your first driving license?
              </p>
              <div className="">
                <Select
                  value={
                    formik.values.country
                      ? {
                        value: formik.values.country,
                        label: formik.values.country,
                      }
                      : null
                  }
                  onChange={(value) =>
                    formik.setFieldValue("country", value.label)
                  }
                  options={countryListOptions}
                  placeholder={"Choose Country"}
                  isSearchable
                />
                {formik.errors.country ? (
                  <div className="error-text">{formik.errors.country}</div>
                ) : null}
              </div>
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                How many years of international driving experience do you have?
              </p>
              <input
                type="text"
                className="input-date"
                name="experience"
                onChange={formik.handleChange}
                placeholder="Enter Years of Experience"
              />
              {formik.errors.experience ? (
                <div className="error-text">{formik.errors.experience}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                How long have you been driving in the UAE?
              </p>
              <input
                type="text"
                onChange={formik.handleChange}
                className="input-date"
                name="duration"
                placeholder="Enter Duration in Years"
              />
              {formik.errors.duration ? (
                <div className="error-text">{formik.errors.duration}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Full Name</p>
              <input
                type="text"
                onChange={formik.handleChange}
                className="input-date"
                name="full_name"
                placeholder=" Enter Full Name"
              />
              {formik.errors.full_name ? (
                <div className="error-text">{formik.errors.full_name}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Mobile Number</p>
              <input
                className="input-date"
                name="mobile_number"
                type="number"
                onChange={formik.handleChange}
                placeholder="Enter Mobile Number"
              />
              {formik.errors.mobile_number ? (
                <div className="error-text">
                  {formik.errors.mobile_number}
                </div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Email Address</p>
              <input
                type="email"
                onChange={formik.handleChange}
                className="input-date"
                name="email"
                placeholder=" Enter Email"
              />
              {formik.errors.email ? (
                <div className="error-text">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Date of Birth</p>
              <input
                type="date"
                max={datePickerId}
                onChange={formik.handleChange}
                className="input-date"
                name="dob"
                placeholder="Choose Date of birth"
              />
              {formik.errors.dob ? (
                <div className="error-text">{formik.errors.dob}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Are you looking for Fully Comprehensive insurance, or other?
              </p>
              <Select
                value={
                  formik.values.insurance
                    ? {
                      value: formik.values.insurance,
                      label: formik.values.insurance,
                    }
                    : null
                }
                onChange={(value) =>
                  formik.setFieldValue("insurance", value.label)
                }
                options={carData?.optionsInsurance}
                placeholder={"Choose"}
                isSearchable
              />
              {formik.errors.insurance ? (
                <div className="error-text">{formik.errors.insurance}</div>
              ) : null}
            </div>
          </div>
          <div className="tw-m-4 tw-gap-4 sm:tw-grid-cols-12">
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <button
                onClick={() => props.prev(formik.values)}
                className="lg:tw-w-auto md:tw-w-auto tw-w-full tw-py-4 tw-px-16 tw-text-xs md:tw-my-auto tw-my-2 tw-bg-blue-600 tw-rounded-3xl sm:tw-float-left tw-text-white"
                type="button"
              >
                Back
              </button>
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <button
                className="lg:tw-w-auto md:tw-w-auto tw-w-full tw-py-4 tw-px-12 tw-text-xs md:tw-my-auto tw-my-2 tw-bg-blue-600 tw-rounded-3xl sm:tw-float-right tw-text-white"
                type="submit"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const makeRequest = async (formData) => {
    setIsOpen(true);
    console.log(formData, "formData");
    setCurrentStep(0);
    try {
      setLoading(true);

      // Get the reCAPTCHA token
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, // Use your site key
        { action: "submit" }
      );

      // Log the token for debugging purposes
      console.log("reCAPTCHA token:", token);

      // Send the form data along with the reCAPTCHA token to the API
      const response = await axios.post("/api/submitInsurance", {
        formData,
        recaptchaToken: token, // Include the reCAPTCHA token
      });

      if (response.status === 200) {
        console.log("Form submitted successfully:", response);
        setIsOpen(true);
      } else {
        console.error("Error submitting form:", response.status);
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = (newData, final) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest({ ...data, ...newData });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  return (
    <>
      {loading && (
        <div className="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-75 tw-flex tw-justify-center tw-items-center tw-z-50">
          <CircularProgress />
        </div>
      )}
      <Modal modal={isOpen} setIsOpen={setIsOpen} />
      <div className="tw-border tw-rounded-xl tw-h-auto tw-contain-content md:tw-p-8">
        <div className="tw-items-center tw-justify-between">
          <h1 className="tw-text-center tw-font-normal tw-text-2xl sm:tw-text-3xl tw-leading-tight tw-text-lightgray">
            Get Your Insurance Quote
          </h1>
          <div className="tw-text-center tw-font-normal  tw-text-2xl sm:tw-text-3xl tw-text-lightgray">
            In A Few Clicks!
          </div>
          <Stepper step={currentStep + 1} setCurrentStep={setCurrentStep} />
          {steps[currentStep]}
        </div>
      </div>
    </>
  );
}

export default InsuranceQuote;
