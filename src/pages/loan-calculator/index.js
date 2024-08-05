import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import MainLayout from "@/src/layout/MainLayout";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import Price from "@/src/components-old/common/Price";
import FeaturedImage from "@/src/components-old/featuredImage";
import StarRating from "@/src/components-old/common/StarRating";
import Image from "next/image";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import axios from "axios";

function loanCalculator() {
  // const [loanFilter, setLoanFilter] = useState({
  //   make: null,
  //   model: null,
  //   year: null,
  //   trim: null,
  //   image: null,
  // });

  const [showCarAnimImage, setShowCarAnimImage] = useState(false);
  const [loanFilter, setLoanFilter] = useState({
    make: "",
    model: "",
    year: "",
    trim: "", // Example trim value object
    image: "", // Example image URL
  });

  

  const [brandsList, setBrandsList] = useState([]);

  const [modelsList, setModelsList] = useState([]);

  const [yearList, setYearList] = useState([]);

  const [trimList, setTrimList] = useState([]);

  

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);

  // const [loanAmount, setLoanAmount] = useState(
  //   loanFilter?.trim?.value ? loanFilter?.trim?.value : 0
  // );
  const [interestRate, setInterestRate] = useState(2.5);

  const [downPayment, setDownPayment] = useState("");
  const [loanTenure, setLoanTenure] = useState(60);
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [initialDownPayment, setInitialDownPayment] = useState(1000); // Example initial down payment
  const [loanAmount, setLoanAmount] = useState(50000);
  const [edit, setEdit] = useState(false);
  const [customPrice, setCustomPrice] = useState();
  const [modelId, setModelId] = useState();

  useEffect(() => {
    if (loanFilter?.trim === "") {
      setLoanAmount(0);
      setDownPayment(0);
    } else {
      setLoanAmount(loanFilter?.trim);
      setDownPayment(parseFloat(loanFilter?.trim) * 0.2);
      setInitialDownPayment(parseFloat(loanFilter?.trim) * 0.2);
    }
  }, [loanFilter?.trim]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Update the URL to match your API endpoint and environment
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
        // Handle error appropriately in your UI
      }
    };

    fetchBrands();
  }, []);

  const handleMakeChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedTrim(null);
    setSelectedModel(null);
    setLoanFilter({
      ...loanFilter,
      make: selectedOption,
      model: null,
      trim: null,
      year: null,
    });

    // Fetch models for the selected brand
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
        toast.error("Failed to load models.");
      });
  };

  const handleModelChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedTrim(null);
    setSelectedModel(selectedOption);
    setLoanFilter({
      ...loanFilter,
      model: selectedOption,
      trim: null,
      year: null,
    });

    // Fetch years for the selected model
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
        toast.error("Failed to load years.");
      });
  };

  const handleYearChange = (selectedOption) => {
    setSelectedTrim(null);
    setSelectedYear(selectedOption);
    setLoanFilter({
      ...loanFilter,
      year: selectedOption,
      trim: null,
    });

    // Fetch trims for the selected model and year
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}car-models/${loanFilter.model.value}/trims/${selectedOption.value}`
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
        toast.error("Failed to load trims.");
      });
  };

  const handleTrimChange = (selectedOption) => {
    
    setSelectedTrim(selectedOption);
    setLoanAmount(selectedOption.price);
    setLoanFilter({
      ...loanFilter,
      trim: selectedOption.price,
      image: selectedOption.image,
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
        color: "var(--primary-color1)",
        marginLeft: "20px",
        marginTop: "14px",
      },
      label: <strong>5000</strong>,
    },
    100000: {
      style: {
        color: "var(--primary-color1)",
        marginLeft: "0px",
        marginTop: "14px",
      },
      label: <strong>100000</strong>,
    },
  };

  const handleStyle = {
    height: "25px",
    width: "25px",
    marginTop: "-10px",
    opacity: "1",
  };

  const trackStyle = {
    height: "10px",
    marginLeft: "0px",
    backgroundColor: "var(--primary-color1)",
  };
  const railStyle = { height: "5px" };
  const dotStyle = { display: "none" };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "var(--light)" : "var(--primary-color1)",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "var(--light)" : "var(--primary-color1)",
      },
    }),
  };

  const calculateEMI = () => {
    const p = parseFloat(loanAmount) - parseFloat(downPayment);
    const r = parseFloat(interestRate) / 1200; // monthly interest rate
    const n = parseFloat(loanTenure); // loan tenure in months

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyInstallment(emi);

    const totalInterest = emi * n - p;
    setTotalInterest(totalInterest);

    const totalAmount = emi * n;
    setTotalAmount(totalAmount);
  };

  const handleDownPaymentChange = (value) => {
    setDownPayment(value);
  };

  const handleInputDownPaymentChange = (e) => {
    if (e.target.value > parseFloat(loanAmount)) {
      alert(`Loan Amount Cannot be greater than Showroom Price`);
    } else {
      setDownPayment(parseFloat(e.target.value)); // Update the interestRate state
    }
  };

  const handleInterestRateChange = (value) => {
    setInterestRate(value);
  };
  const handleInputInterestRateChange = (e) => {
    if (e.target.value > 8) {
      alert("Interest rate cannot be more than 8%");
    } else {
      setInterestRate(parseFloat(e.target.value)); // Update the interestRate state
    }
  };

  const handleloanTenureChange = (months) => {
    setLoanTenure(months);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEMI();
  };

  const faq = [
    {
      question: <>Can I get a car loan in the UAE if I'm not a UAE national?</>,
      answer: (
        <>
          Yes, many banks offer car loans to expatriates, but eligibility
          criteria may differ based on your visa type.
        </>
      ),
      id: 1,
      condition: true,
    },
    {
      question: (
        <>What interest rates can I expect for a car loan in the UAE?</>
      ),
      answer: (
        <>
          Interest rates vary between banks and can depend on factors like loan
          amount, tenure, and your creditworthiness.
        </>
      ),
      id: 2,
      condition: true,
    },
    {
      question: (
        <> Is it possible to finance a used luxury car with a car loan?</>
      ),
      answer: (
        <>
          Yes, some banks in the UAE offer financing options for used luxury
          cars.
        </>
      ),
      id: 3,
      condition: true,
    },
    {
      question: <>Can I apply for a car loan without a UAE residence visa?</>,
      answer: (
        <>
          It's challenging, but some lenders offer car loans to individuals with
          certain visa types, such as employment or investor visas.
        </>
      ),
      id: 4,
      condition: true,
    },
    {
      question: <>What happens if I miss an EMI payment?</>,
      answer: (
        <>
          Missing an EMI payment can result in late payment fees and negatively
          impact your credit score. It's essential to make payments on time.
        </>
      ),
      id: 5,
      condition: true,
    },
    {
      question: (
        <>What banks can be loan providers for a Car loan in the UAE?</>
      ),
      answer: (
        <>
          Emirates NBD, Dubai Islamic Bank, First Abu Dhabi Bank etc. offer a
          wide range of car loan options, including competitive interest rates
          and flexible repayment terms. Their customer-centric approach makes
          them a top choice for many residents.
        </>
      ),
      id: 6,
      condition: true,
    },
  ];

  

  return (
    <MainLayout
      pageMeta={{
        title:
          "Car Loan Calculator: Easily Calculate Your Car Financing Options - Carprices.ae",
        description:
          "Calculate car loans effortlessly. Get accurate estimates, explore repayment options, and make informed decisions. Plan confidently with CarPrices UAE.",
        type: "Car Review Website",
      }}
    >
      <Ad728x90 dataAdSlot="5962627056" />

      <div className="container mt-5">
        <h1 className="fw-bold mb-3">Car Loan EMI calculator in UAE</h1>
        <h4 className="mb-4">
          Select Make, Model, Year & Variant to check the EMI
        </h4>
        <div className="row gx-3">
          <div className="col-md-3 mb-3">
            <Select
              id="brand-select"
              instanceId="brand-select"
              value={loanFilter.make}
              options={brandsList} // Use the state that contains the fetched brands
              onChange={handleMakeChange}
              placeholder="Select make"
              styles={customStyles}
            />
          </div>
          <div className="col-md-3 mb-3">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={selectedModel}
              options={modelsList}
              onChange={handleModelChange}
              isDisabled={!loanFilter.make}
              placeholder="Select model"
              styles={customStyles}
            />
          </div>
          <div className="col-md-3 mb-3">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={selectedYear}
              options={yearList}
              onChange={handleYearChange}
              isDisabled={!loanFilter.model}
              placeholder="Select year"
              styles={customStyles}
            />
          </div>
          <div className="col-md-3 mb-3">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={selectedTrim}
              options={trimList}
              onChange={handleTrimChange}
              isDisabled={!loanFilter.year}
              placeholder="Select trim"
              styles={customStyles}
            />
          </div>
        </div>
      </div>
      {selectedTrim && (
        <div className="d-flex justify-content-center">
          <div className="calculatorContent ">
            <div className="calculatorContentInner d-flex justify-content-center">
              <div className="leftSection">
                <div>
                  <div className="monthlyIncomeContainer">
                    <label className="monthlyIncomeTxt">Down Payment </label>
                    <div className="amountContainer">
                      <input
                        type="number"
                        className="form-control downPaymentInputTxt"
                        value={parseFloat(downPayment)}
                        onChange={handleInputDownPaymentChange}
                        min={parseFloat(initialDownPayment)} // Set the minimum value
                        max={parseFloat(loanAmount)} // Set the maximum value
                        step={1}
                      />
                    </div>
                  </div>
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
                  <div className="bottomAmount">
                    <span>{parseFloat(initialDownPayment)}</span>
                    <span>{parseFloat(loanAmount)}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="monthlyIncomeContainer">
                    <label className="monthlyIncomeTxt">Interest Rate</label>
                    <div className="amountContainer">
                      <input
                        type="number"
                        className="form-control interestInputTxt"
                        value={interestRate}
                        onChange={handleInputInterestRateChange}
                        min={1.9}
                        max={8}
                        step={0.1}
                        style={{ width: "90px" }}
                      />
                    </div>
                  </div>
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
                  <div className="bottomAmount">
                    <span>1.9%</span>
                    <span>8%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="mt-3 monthlyIncomeTxt">Loan Period* (year)</h3>
                  <div className="d-flex my-2 mt-3">
                    <div
                      className={
                        loanTenure === 12
                          ? "loanBtn loanBtn-outline-primary me-2"
                          : "loanBtn loanBtn-primary me-2"
                      }
                      onClick={() => handleloanTenureChange(12)}
                    >
                      1
                    </div>
                    <div
                      className={
                        loanTenure === 24
                          ? "loanBtn loanBtn-outline-primary me-2"
                          : "loanBtn loanBtn-primary me-2"
                      }
                      onClick={() => handleloanTenureChange(24)}
                    >
                      2
                    </div>
                    <div
                      className={
                        loanTenure === 36
                          ? "loanBtn loanBtn-outline-primary me-2"
                          : "loanBtn loanBtn-primary me-2"
                      }
                      onClick={() => handleloanTenureChange(36)}
                    >
                      3
                    </div>
                    <div
                      className={
                        loanTenure === 48
                          ? "loanBtn loanBtn-outline-primary me-2"
                          : "loanBtn loanBtn-primary me-2"
                      }
                      onClick={() => handleloanTenureChange(48)}
                    >
                      4
                    </div>
                    <div
                      className={
                        loanTenure === 60
                          ? "loanBtn loanBtn-outline-primary me-2"
                          : "loanBtn loanBtn-primary me-2"
                      }
                      onClick={() => handleloanTenureChange(60)}
                    >
                      5
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightSection">
                <div className="totalAmountContainer">
                  <img
                    title=""
                    alt=""
                    className="carImage "
                    width="300"
                    height="300"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src={
                      loanFilter.image !== ""
                        ? loanFilter.image
                        : "/assets/img/car-placeholder.png"
                    }
                  />
                  <h5 className="totalAmoutTxt">
                    AED <Price data={loanFilter.trim} />
                  </h5>
                  {/* <h6 className='maxEmiTxt'>Max EMI</h6> */}
                  <button
                    className="btn btn-primary py-2 px-5 mt-2 mb-3"
                    onClick={handleSubmit}
                    disabled={loanAmount === 0 ? true : false}
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
            {monthlyInstallment && (
              <div className="d-flex justify-content-center">
                <div class="row resultContainer">
                  <div class=" col-sm-4 col-12">
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
                  <div class=" col-sm-4 col-12">
                    <div class="media d-flex justify-content-start align-items-center">
                      <div class="align-self-center">
                        <i class="bi bi-bank2 primary fs-2 float-left"></i>
                      </div>
                      <div class="media-body text-right ms-4">
                        <h6 className="fw-bold">
                          Total Interest Payment <small>(AED)</small>
                        </h6>
                        <h3 className="fw-bold">
                          <Price data={totalInterest} />
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class=" col-sm-4 col-12">
                    <div class="media d-flex justify-content-start align-items-center">
                      <div class="align-self-center">
                        <i class="bi bi-bank2 primary fs-3 float-left"></i>
                      </div>
                      <div class="media-body text-right ms-4">
                        <h6 className="fw-bold">
                          Total Amount to Pay <small>(AED)</small>
                        </h6>
                        <h3 className="fw-bold">
                          <Price data={totalAmount} />
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="faq-page-wrap pt-100 mb-100">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 my-3 hideOnSmallScreen">
              <div className="sticky_scroll">
                <Ad300x600 dataAdSlot="3792539533" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="faq-area">
                <div>
                  <p className="mt-4">
                    When it comes to financing your dream car in the UAE,
                    securing a car loan is a common route taken by many
                    residents and expatriates alike. Car ownership is a symbol
                    of status and convenience in the Emirates, and obtaining the
                    right car loan can make it easily attainable. The allure of
                    owning a car in the UAE, with its well-maintained roads and
                    world-class infrastructure, is a dream shared by many
                    residents and expatriates alike. However, the reality is
                    that purchasing a car in the UAE often requires a
                    substantial financial commitment, and that's where a car
                    loan can make all the difference.
                  </p>
                  <h2 className="mt-4 fw-bold">Car Loan EMI and Downpayment</h2>
                  <h4 className="mt-4 fw-bold">
                    Interest Rate and Monthly Installment
                  </h4>
                  <p className="mt-2">
                    Interest rates play a pivotal role in determining the cost
                    of your car loan. Typically, car loan interest rates in the
                    UAE can vary depending on the lender and the prevailing
                    market conditions. Therefore, it's essential to compare
                    interest rates across different financial institutions to
                    secure the most favorable deal. Lower interest rates
                    translate to reduced monthly installments, which means less
                    financial strain over the loan tenure. By doing your
                    research and finding the best interest rate, you can
                    optimize your car loan for affordability.
                  </p>
                  <h4 className="mt-4 fw-bold">
                    Loan Installment and Downpayment Variability on Car Finance
                  </h4>
                  <p className="mt-2">
                    Car loan providers in the UAE offer various loan tenures and
                    down payment options, allowing you to choose the one that
                    aligns with your financial goals. Whether you prefer a
                    shorter loan tenure with higher EMI instalments or a longer
                    tenure with lower monthly payments, the flexibility offered
                    by car loan providers ensures you can adapt the loan
                    structure to suit your unique financial situation. Moreover,
                    the down payment amount can also vary, giving you the
                    freedom to decide how much you can contribute upfront.
                  </p>
                  <h4 className="mt-4 fw-bold">
                    Monthly Budgeting with Car Loans
                  </h4>
                  <p className="mt-2">
                    A significant advantage of opting for a car loan in the UAE
                    is the ability to plan your monthly budget effectively. With
                    a fixed EMI amount, you can confidently allocate your
                    resources and manage your finances without unexpected
                    surprises. This predictability allows you to strike a
                    balance between fulfilling your car ownership dreams and
                    maintaining financial stability.
                  </p>
                </div>
                <div className="section-title-and-filter mt-4">
                  <div className="section-title">
                    <h2 className="fw-bold mb-4">
                      FAQs (Frequently Asked Questions) on car loan in UAE
                    </h2>
                  </div>
                </div>

                <div className="faq-wrap">
                  {faq.map((item, index) => (
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                      key={index}
                    >
                      <div className="accordion-item">
                        <h5
                          className="accordion-header"
                          id={`flush-heading${index}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapse${index}`}
                          >
                            {item.question}
                          </button>
                        </h5>
                        <div
                          id={`flush-collapse${index}`}
                          className="accordion-collapse collapse show"
                          aria-labelledby={`flush-heading${index}`}
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">{item.answer}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default loanCalculator;
