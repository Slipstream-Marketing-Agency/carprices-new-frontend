"use client";
import { useFormik } from "formik";
import { useState } from "react";
import Stepper from "../3stepper/Stepper";
import Modal from "../modal/Modal";
import { carData } from "@/src/mocks/mock";
import SelectComponent from "../selectComponent/selectComponent";

function InsuranceQuote() {


  const [isOpen, setIsOpen] = useState(false);
  const dataInitialValues = {
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
  };
  const [data, setData] = useState(dataInitialValues);
  const datePickerId = new Date().toISOString().split("T")[0];

  // StepOne
  const StepOne = (props) => {
    const handleSubmit = (values) => {
      props.next(values, false);
    };
    const validate = (values) => {
      const errors = {};
      if (!values.car_year) {
        errors.car_year = "This field is required.";
      }
      if (!values.car_brand) {
        errors.car_brand = "This field is required.";
      }
      if (!values.model) {
        errors.model = "This field is required.";
      }
      if (!values.variant) {
        errors.variant = "This field is required.";
      }
      if (!values.is_fully_comprehensive) {
        errors.is_fully_comprehensive = "This field is required.";
      }
      if (!values.brand_new_car) {
        errors.brand_new_car = "This field is required.";
      }
      if (!values.car_first_registered) {
        errors.car_first_registered = "This field is required.";
      }
      if (!values.first_car) {
        errors.first_car = "This field is required.";
      }
      if (!values.city) {
        errors.city = "This field is required.";
      }
      if (!values.gcc_spec) {
        errors.gcc_spec = "This field is required.";
      }
      if (!values.agency_repair) {
        errors.agency_repair = "This field is required.";
      }
      return errors;
    };
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
      validate,
      onSubmit: (value) => {
        handleSubmit(value);
      },
    });


    console.log(formik?.values,"ppppppppppppppppppp");

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="tw-lg:m-0 sm:tw-my-6 sm:tw-p-2 tw-text-sm">
          {/* inputs div */}
          <div className="tw-grid tw-gap-x-12 tw-gap-6 sm:tw-grid-cols-12">
            {/* Row1 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Car Year</p>
              <SelectComponent
                selectOptions={carData?.optionsYears}
                value={formik.values.car_year}
                onChange={(value) =>
                  formik.setFieldValue("car_year", value.value)
                }
                placeholder={"Choose Year"}
                isSearchable
              />
              {formik.errors.car_year ? (
                <div className="tw-error-text">{formik.errors.car_year}</div>
              ) : null}
            </div>
            {/* 1.2 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block ">
              <p className="input-label 4xl:tw-text-sm">Brand</p>
              <SelectComponent
                value={formik.values.car_brand}
                onChange={(value) =>
                  formik.setFieldValue("car_brand", value.value)
                }
                selectOptions={carData?.optionsBrand}
                placeholder={"Choose Brand"}
                isSearchable
              />
              {formik.errors.car_brand ? (
                <div className="tw-error-text">{formik.errors.car_brand}</div>
              ) : null}
            </div>
            {/* Row2 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Model</p>
              <SelectComponent
                value={formik.values.model}
                onChange={(value) => formik.setFieldValue("model", value.value)}
                selectOptions={carData?.optionsModels}
                placeholder={"Choose Model"}
                isSearchable
              />
              {formik.errors.model ? (
                <div className="tw-error-text">{formik.errors.model}</div>
              ) : null}
            </div>
            {/* 2.2 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Variant</p>
              <SelectComponent
                value={formik.values.variant}
                onChange={(value) =>
                  formik.setFieldValue("variant", value.value)
                }
                selectOptions={carData?.optionsVariants}
                placeholder={"Choose Variant"}
                isSearchable
              />
              {formik.errors.variant ? (
                <div className="tw-error-text">{formik.errors.variant}</div>
              ) : null}
            </div>

            {/* Row3 */}
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
                    className={`${
                      formik.values.brand_new_car === "Yes"
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
                    className={`${
                      formik.values.brand_new_car === "No"
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
                <div className="tw-error-text">
                  {formik.errors.brand_new_car}
                </div>
              ) : null}
            </div>
            {/* 3.2 */}
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
                    className={`${
                      formik.values.first_car === "Yes"
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
                    className={`${
                      formik.values.first_car === "No"
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
                <div className="tw-error-text">{formik.errors.first_car}</div>
              ) : null}
            </div>

            {/* Row4 date*/}
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
                <div className="tw-error-text">
                  {formik.errors.car_first_registered}
                </div>
              ) : null}
            </div>
            {/* 4.2 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                In which city do you want to register this car?
              </p>
              <SelectComponent
                value={formik.values.city}
                onChange={(value) => formik.setFieldValue("city", value.value)}
                selectOptions={carData?.optionsCities}
                placeholder={"Choose City"}
                isSearchable
              />
              {formik.errors.city ? (
                <div className="tw-error-text">{formik.errors.city}</div>
              ) : null}
            </div>

            {/* Row5 */}
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
                    className={`${
                      formik.values.gcc_spec === "Yes"
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
                    className={`${
                      formik.values.gcc_spec === "No"
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
                <div className="tw-error-text">{formik.errors.gcc_spec}</div>
              ) : null}
            </div>
            {/* 5.2 */}
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
                    className={`${
                      formik.values.is_fully_comprehensive === "Yes"
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
                    className={`${
                      formik.values.is_fully_comprehensive === "No"
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
                <div className="tw-error-text">
                  {formik.errors.is_fully_comprehensive}
                </div>
              ) : null}
            </div>
            {/* row6.1 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block ">
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
                    className={`${
                      formik.values.agency_repair === "Yes"
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
                    className={`${
                      formik.values.agency_repair === "No"
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
                <div className="tw-error-text">
                  {formik.errors.agency_repair}
                </div>
              ) : null}
            </div>
          </div>
          {/* continue Button */}
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

  // StepTwo
  const StepTwo = (props) => {
    const handleSubmit = (values) => {
      props.next(values, true);
    };
    const validate = (values) => {
      const errors = {};
      if (!values.nationality) {
        errors.nationality = "This field is required.";
      }
      if (!values.country) {
        errors.country = "This field is required.";
      }
      if (!values.experience) {
        errors.experience = "This field is required.";
      }
      if (!values.duration) {
        errors.duration = "This field is required.";
      }
      if (!values.full_name) {
        errors.full_name = "This field is required.";
      }
      if (!values.mobile_number) {
        errors.mobile_number = "This field is required.";
      }
      if (!values.email) {
        errors.email = "This field is required.";
      }
      if (!values.dob) {
        errors.dob = "This field is required.";
      }
      if (!values.insurance) {
        errors.insurance = "This field is required.";
      }
      return errors;
    };
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
      validate,
      onSubmit: (value) => {
        handleSubmit(value);
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="tw-lg:m-0 sm:tw-my-6 sm:tw-p-2">
          <div className="tw-grid tw-gap-x-12 tw-gap-6 sm:tw-grid-cols-12">
            {/* Row1 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">Nationality</p>
              <div>
                <SelectComponent
                  selectOptions={carData?.optionsNationalities}
                  value={formik.values.nationality}
                  onChange={(value) =>
                    formik.setFieldValue("nationality", value.value)
                  }
                  placeholder={"Choose Nationality"}
                  isSearchable
                />
                {formik.errors.nationality ? (
                  <div className="tw-error-text">
                    {formik.errors.nationality}
                  </div>
                ) : null}
              </div>
            </div>
            {/* 1.2 */}
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Which country issued your first driving license?
              </p>
              <div className="">
                <SelectComponent
                  value={formik.values.country}
                  onChange={(value) =>
                    formik.setFieldValue("country", value.value)
                  }
                  selectOptions={carData?.optionsCountry}
                  placeholder={"Choose Country"}
                  isSearchable
                />
                {formik.errors.country ? (
                  <div className="tw-error-text">{formik.errors.country}</div>
                ) : null}
              </div>
            </div>

            {/* ROW2 */}
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
                <div className="tw-error-text">{formik.errors.experience}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                How long you have been driving in the UAE?
              </p>
              <input
                type="text"
                onChange={formik.handleChange}
                className="input-date"
                name="duration"
                placeholder="Enter Duration in Years"
              />
              {formik.errors.duration ? (
                <div className="tw-error-text">{formik.errors.duration}</div>
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
                <div className="tw-error-text">{formik.errors.full_name}</div>
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
                <div className="tw-error-text">
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
                <div className="tw-error-text">{formik.errors.email}</div>
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
                <div className="tw-error-text">{formik.errors.dob}</div>
              ) : null}
            </div>
            <div className="tw-rounded-lg sm:tw-col-span-6 sm:tw-block">
              <p className="input-label 4xl:tw-text-sm">
                Are you looking for Fully Comprehensive insurance, or other?
              </p>
              <SelectComponent
                value={formik.values.insurance}
                onChange={(value) =>
                  formik.setFieldValue("insurance", value.value)
                }
                selectOptions={carData?.optionsInsurance}
                placeholder={"Choose"}
                isSearchable
              />
              {formik.errors.insurance ? (
                <div className="tw-error-text">{formik.errors.insurance}</div>
              ) : null}
            </div>
          </div>

          {/* //buttons div */}
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

  const makeRequest = (formData) => {
    setIsOpen(true);
    setCurrentStep(0);
    console.log(formData, "Form submitted");
  };
  const handleNextStep = (newData, final) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(data);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  return (
    <>
      <Modal modal={isOpen} setIsOpen={setIsOpen} />
      <div className="tw-border tw-rounded-xl tw-h-auto tw-contain-content md:tw-p-8">
        <div className="tw-items-center tw-justify-between">
          <div className="tw-text-center tw-mt-6 tw-text-3xl tw-leading-tight tw-text-lightgray">
            Get Your Insurance Quote
          </div>
          <div className="tw-text-center tw-font-normal tw-text-3xl tw-text-lightgray">
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
