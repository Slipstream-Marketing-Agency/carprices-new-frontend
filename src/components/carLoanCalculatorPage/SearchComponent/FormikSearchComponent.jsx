"use client";
import SearchComponent from "./SearchComponent";
import { carData } from "../../../mocks/mock";
import { useFormik } from "formik";
import { useState } from "react";

const stepsConfig = [
  {
    field: "brand",
    options: carData?.chooseBrandModal,
    placeholder: "Search brand",
    additionalFields: { brand_icon: "" },
  },
  {
    field: "model",
    options: carData?.chooseModal,
    placeholder: "Search model",
    additionalFields: {},
  },
  {
    field: "year",
    options: carData?.chooseYear,
    placeholder: "Search year",
    additionalFields: {},
  },
  {
    field: "variant",
    options: carData?.chooseVariant,
    placeholder: "Search variant",
    additionalFields: {},
  },
];

function FormikSearchComponent({ setIsOpen, setCarSelected }) {
  const [data, setData] = useState({
    brand: "",
    brand_icon: "",
    model: "",
    year: "",
    variant: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log(formData, "Form submitted");
  };

  const handleNextStep = (newData, final) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(data);
      setIsOpen(false);
      setCarSelected(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const configureFormik = ({ field, additionalFields, handleSubmit }) => {
    const validate = (values) => {
      const errors = {};
      return errors;
    };

    return useFormik({
      initialValues: { [field]: "", ...additionalFields },
      validate,
      onSubmit: (value) => handleSubmit(value),
    });
  };

  const renderStep = ({ field, options, placeholder, additionalFields }, idx) => {
    const isFinalStep = idx === stepsConfig.length - 1;
    const formik = configureFormik({
      field,
      additionalFields,
      handleSubmit: (values) => handleNextStep(values, isFinalStep),
    });

    return (
      <div key={field}>
        <form onSubmit={formik.handleSubmit}>
          <SearchComponent
            options={options}
            fieldValue={field}
            placeholder={placeholder}
            Formik={formik}
            data={data}
            setData={setData}
            setCurrentStep={setCurrentStep}
          />
          {formik.errors[field] && <div className="tw-text-red-400">{formik.errors[field]}</div>}
        </form>
      </div>
    );
  };

  return (
    <div className="tw-rounded-xl">
      <div className="tw-p-0">{renderStep(stepsConfig[currentStep], currentStep)}</div>
    </div>
  );
}

export default FormikSearchComponent;
