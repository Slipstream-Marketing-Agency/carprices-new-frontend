import Ad300x250 from "@/components/ads/Ad300x250";
import Ad300x600 from "@/components/ads/Ad300x600";
import Ad728x90 from "@/components/ads/Ad728x90";
import FeaturedImage from "@/components/common/FeaturedImage";
import Price from "@/components/common/Price";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

export default function MobileLoanCalculator() {
const [loanFilter, setLoanFilter] = useState({
    make: null,
    model: null,
    year: null,
    trim: null,
    image: null,
  });

  


  const [brandsList, setBrandsList] = useState([]);

  const brandListOptions = brandsList.map((carBrand) => ({
    value: carBrand.id,
    label: carBrand.name,
  }));
  const [modelsList, setModelsList] = useState([]);

  const modelsListOptions = modelsList.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  const [yearList, setYearList] = useState([]);

  const yearListOptions = yearList.map((year) => ({
    value: year.year,
    label: year.year,
  }));

  const [trimList, setTrimList] = useState([]);
  const trimsListOptions = trimList.map((trim) => ({
    value: trim.price,
    label: trim.name,
    image: trim.featuredImage
  }));

  

  const [imageList, setImageList] = useState([]);

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);


  const [loanAmount, setLoanAmount] = useState(
    loanFilter?.trim?.value ? loanFilter?.trim?.value : 0
  );
  const [interestRate, setInterestRate] = useState(2.5);
  const [downPayment, setDownPayment] = useState("");
  const [loanTenure, setLoanTenure] = useState(60);
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [initialDownPayment, setInitialDownPayment] = useState("");
  const [edit, setEdit] = useState(false);
  const [customPrice, setCustomPrice] = useState();
  const [modelId, setModelId] = useState();

  useEffect(() => {
    if (loanFilter?.trim?.value === undefined) {
      setLoanAmount(0);
      setDownPayment(0);
    } else {
      setLoanAmount(loanFilter?.trim?.value);
      setDownPayment((parseFloat(loanFilter?.trim?.value) * 0.2));
      setInitialDownPayment(
        (parseFloat(loanFilter?.trim?.value) * 0.2)
      );
    }
  }, [loanFilter?.trim?.value]);





  const calculateEMI = () => {
    const p = parseFloat(loanAmount) - parseFloat(downPayment);
    const r = parseFloat(interestRate) / 1200; // monthly interest rate
    const n = parseFloat(loanTenure); // loan tenure in months

    const emi = (
      (p * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
    );
    setMonthlyInstallment(emi);

    const totalInterest = (emi * n - p);
    setTotalInterest(totalInterest);

    const totalAmount = (emi * n);
    setTotalAmount(totalAmount);
  };

  const handleloanTenureChange = (months) => {
    setLoanTenure(months);
  };

  const handleLoanAmountChange = (value) => {
    setLoanAmount(value);
  };

  const handleInterestRateChange = (value) => {
    setInterestRate(value);
  };

  const handleDownPaymentChange = (value) => {
    setDownPayment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEMI();
  };

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + `model/${loanFilter?.model?.value}`
      )
      .then((response) => {

        setLoanFilter({
          ...loanFilter,
          image: response.data.model.mainTrim.featuredImage,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [loanFilter?.model?.value]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "brands?isAll=1&&orderBy=name")
      .then((response) => {
        // 
        setBrandsList(response.data.carBrands);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
        `model/by-brand/min/${loanFilter?.make?.value}?isAll=1`
      )
      .then((response) => {

        setModelsList(response.data.models);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [loanFilter?.make?.value]);

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
        `trim/get-years/${loanFilter?.model?.value}?isAll=1`
      )
      .then((response) => {

        setYearList(response.data.trimYears);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [loanFilter?.model?.value]);

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
        `trim/by-model/min/${loanFilter?.model?.value}/${loanFilter?.year?.value}`
      )
      .then((response) => {

        setTrimList(response.data.trims);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [loanFilter?.year?.value]);

  const handleMakeChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedTrim(null);
    setSelectedModel(null);
    setLoanFilter({
      ...loanFilter,
      make: selectedOption,
      model: null,
      trim:null,
      year:null,
    });
  };
  const handleModelChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedTrim(null);
    setSelectedModel(selectedOption)
    setLoanFilter({
      ...loanFilter,
      model: selectedOption,
      trim:null,
      year:null,
    });
  };

  const handleYearChange = (selectedOption) => {
    setSelectedTrim(null);
    setSelectedYear(selectedOption)
    setLoanFilter({
      ...loanFilter,
      year: selectedOption,
      trim:null
    });
  };

  const handleTrimChange = (selectedOption) => {
    setSelectedTrim(selectedOption)
    setLoanFilter({
      ...loanFilter,
      trim: selectedOption,
    });
  };

  const isFilterComplete =
    loanFilter.make !== null &&
    loanFilter.model !== null &&
    loanFilter.year !== null;

  const [filterData, setFilterData] = useState({
    preferences: [],
    budget: [0, 100000],
    seating: [],
  });

  const marks = {
    5000: {
      style: {
        color: "var(--primary)",
        marginLeft: "20px",
        marginTop: "14px",
      },
      label: <strong>5000</strong>,
    },
    100000: {
      style: {
        color: "var(--primary)",
        marginLeft: "0px",
        marginTop: "14px",
      },
      label: <strong>100000</strong>,
    },
  };

  const handleStyle = {
    height: "25px",
    width: "25px",
    marginTop: "-3px",
    opacity: "1",
  };

  const trackStyle = {
    height: "20px",
    marginLeft: "0px",
    backgroundColor: "var(--primary)",
  };
  const railStyle = { height: "20px" };
  const dotStyle = { display: "none" };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "var(--light)" : "var(--primary)",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "var(--light)" : "var(--primary)",
      },
    }),
  };
  return (
    <Layout>
      <div className="whiteBG mt-1 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-2">
            <Ad728x90 dataAdSlot="5450108271" /> 
              <div className="white_bg_wrapper mt-2 px-4 py-4">
                <h1 className="fw-bold mb-3">Calculate EMI For Your Car</h1>
                <div className="row">
                <div className="col-12">
                    <FeaturedImage width={200} height={200}
                      src={loanFilter?.trim?.image}
                      alt={""}
                      title={""}
                    />
                    <h4 className="mx-auto text-center fw-bold text-danger mt-2">
                      {loanFilter?.trim?.value ? (
                        <>
                          {edit ? (
                            <>
                              <input
                                type="number"
                                value={customPrice}
                                onChange={(e) => setCustomPrice(e.target.value)}
                                className="form-control fw-bold text-center mx-auto w-25"
                              />
                              <small
                                className="primary_bg_wrapper py-1 mx-auto mt-2 pointer"
                                onClick={() => {
                                  setLoanAmount(parseFloat(customPrice));
                                  setDownPayment(
                                    (parseFloat(customPrice) * 0.2)
                                  ),
                                    setInitialDownPayment(
                                      (parseFloat(customPrice) * 0.2)
                                    );
                                  setEdit(false);
                                  toast.success("Custom price has applied")
                                }}
                              >
                                Apply Price
                              </small>
                            </>
                          ) : (
                            <div className="d-flex flex-column">
                              AED <Price data={loanAmount} />{" "}
                              <small
                                className="primary_bg_wrapper py-1 mx-auto mt-2 pointer"
                                onClick={() => setEdit(true)}
                              >
                                Edit Price
                              </small>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </h4>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <h3 className="fw-bold">Select Brand</h3>
                      <Select
                        id="long-value-select"
                        instanceId="long-value-select"
                        value={loanFilter.make}
                        options={brandListOptions}
                        onChange={handleMakeChange}
                        placeholder="Select make"
                        styles={customStyles}
                      />
                    </div>
                    <div className="mb-3">
                      <h3 className="fw-bold">Select Model</h3>
                       <Select
                        id="long-value-select"
                        instanceId="long-value-select"
                        value={selectedModel}
                        options={_.sortBy(modelsListOptions, 'label')}
                        onChange={handleModelChange}
                        isDisabled={!loanFilter.make}
                        placeholder="Select model"
                        styles={customStyles}
                      />
                    </div>
                    <div className="mb-3">
                      <h3 className="fw-bold">Select Year</h3>
                      <Select
                        id="long-value-select"
                        instanceId="long-value-select"
                        value={selectedYear}
                        options={yearListOptions}
                        onChange={handleYearChange}
                        isDisabled={!loanFilter.model}
                        placeholder="Select year"
                        styles={customStyles}
                      />
                    </div>
                    <div className="mb-3">
                      <h3 className="fw-bold">Select Trim</h3>
                       <Select
                        id="long-value-select"
                        instanceId="long-value-select"
                        value={selectedTrim}
                        options={_.sortBy(trimsListOptions, 'label')}
                        onChange={handleTrimChange}
                        isDisabled={!loanFilter.year}
                        placeholder="Select trim"
                        styles={customStyles}
                      />
                    </div>
                    <div className="mb-3">
                      <h3 className="fw-bold">
                        Down Payment* (Min set at 20%)
                      </h3>
                      <Slider
                        range
                        min={parseFloat(initialDownPayment)}
                        max={parseFloat(loanAmount)}
                        // marks={marks}
                        step={0.01}
                        value={parseFloat(downPayment)}
                        onChange={handleDownPaymentChange}
                        trackStyle={[trackStyle]}
                        railStyle={railStyle}
                        handleStyle={[handleStyle, handleStyle]}
                        dotStyle={dotStyle}
                        allowCross={false}
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-white bg-primary px-2 ffw-bold">
                        AED <Price data={downPayment} />
                      </span>
                    </div>
                    <div className="mb-3">
                      <h3 className="fw-bold">Interest Rate* (%)</h3>
                      <Slider
                        range
                        min={1.9}
                        max={8}
                        // marks={marks}
                        step={0.1}
                        defaultValue={interestRate}
                        // defaultValue={interestRate}
                        onChange={handleInterestRateChange}
                        trackStyle={[trackStyle]}
                        railStyle={railStyle}
                        handleStyle={[handleStyle, handleStyle]}
                        dotStyle={dotStyle}
                        allowCross={false}
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-white bg-primary px-2 ffw-bold">
                        {interestRate}%
                      </span>
                    </div>
                  </div>
                  
                </div>

                <h3 className="fw-bold">Loan Period* (year)</h3>
                <div className="d-flex align-items-center my-2">
                  <div
                    className={
                      loanTenure === 12
                        ? "btn btn-outline-primary me-2"
                        : "btn btn-primary me-2"
                    }
                    onClick={() => handleloanTenureChange(12)}
                  >
                    1 year
                  </div>
                  <div
                    className={
                      loanTenure === 24
                        ? "btn btn-outline-primary me-2"
                        : "btn btn-primary me-2"
                    }
                    onClick={() => handleloanTenureChange(24)}
                  >
                    2 years
                  </div>
                  <div
                    className={
                      loanTenure === 36
                        ? "btn btn-outline-primary me-2"
                        : "btn btn-primary me-2"
                    }
                    onClick={() => handleloanTenureChange(36)}
                  >
                    3 years
                  </div>
                  <div
                    className={
                      loanTenure === 48
                        ? "btn btn-outline-primary me-2"
                        : "btn btn-primary me-2"
                    }
                    onClick={() => handleloanTenureChange(48)}
                  >
                    4 years
                  </div>
                  <div
                    className={
                      loanTenure === 60
                        ? "btn btn-outline-primary me-2"
                        : "btn btn-primary me-2"
                    }
                    onClick={() => handleloanTenureChange(60)}
                  >
                    5 years
                  </div>
                </div>
                <button
                  className="btn btn-outline-primary py-2 px-5 mt-2 mb-3"
                  onClick={handleSubmit}
                  disabled={loanAmount === 0 ? true : false }
                >
                  Calculate
                </button>
                {monthlyInstallment && (
                  <div class="row">
                    <div class=" col-sm-4 col-12">
                      <div class="card">
                        <div class="card-content">
                          <div class="card-body">
                            <div class="media d-flex justify-content-start align-items-center">
                              <div class="align-self-center">
                                <i class="bi bi-bank2 primary fs-2 float-left"></i>
                              </div>
                              <div class="media-body text-right ms-4">
                                <h6 className="fw-bold">
                                  Monthly Payment <small>(AED)</small>
                                </h6>
                                <h3 className="fw-bold">
                                  <Price data={monthlyInstallment} />
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class=" col-sm-4 col-12">
                      <div class="card">
                        <div class="card-content">
                          <div class="card-body">
                            <div class="media d-flex justify-content-start align-items-center">
                              <div class="align-self-center">
                                <i class="bi bi-bank2 primary fs-2 float-left"></i>
                              </div>
                              <div class="media-body text-right ms-4">
                                <h6 className="fw-bold">
                                  Total Interest Payment <small>(AED)</small>
                                </h6>
                                <h3 className="fw-bold"><Price data={totalInterest} /></h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class=" col-sm-4 col-12">
                      <div class="card">
                        <div class="card-content">
                          <div class="card-body">
                            <div class="media d-flex justify-content-start align-items-center">
                              <div class="align-self-center">
                                <i class="bi bi-bank2 primary fs-3 float-left"></i>
                              </div>
                              <div class="media-body text-right ms-4">
                               <h6 className="fw-bold">
                                  Total Amount to Pay <small>(AED)</small>
                                </h6>
                                <h3 className="fw-bold"><Price data={totalAmount} /></h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
