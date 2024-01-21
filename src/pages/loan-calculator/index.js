import Ad728x90 from '@/src/components/ads/Ad728x90'
import MainLayout from '@/src/layout/MainLayout'
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import _ from "lodash";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import Price from '@/src/components/common/Price';
import FeaturedImage from '@/src/components/featuredImage';
import StarRating from '@/src/components/common/StarRating';
import Image from 'next/image';
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
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    trim: { value: 25000 },// Example trim value object
    image: 'https://example.com/car-image.jpg', // Example image URL
  });


  const [brandsList, setBrandsList] = useState([]);

  const brandListOptions = [
    { value: 'toyota', label: 'Toyota' },
    { value: 'honda', label: 'Honda' },
    { value: 'ford', label: 'Ford' },
    // Other brand options...
  ];


  // let brandListOptions = brandsList.map((carBrand) => ({
  //   value: carBrand.id,
  //   label: carBrand.name,
  // }));

  const [modelsList, setModelsList] = useState([]);

  // const modelsListOptions = modelsList.map((model) => ({
  //   value: model.id,
  //   label: model.name,
  // }));
  const modelsListOptions = [
    { value: 'camry', label: 'Camry' },
    { value: 'accord', label: 'Accord' },
    { value: 'mustang', label: 'Mustang' },
    // Add more model options as needed
  ];

  const [yearList, setYearList] = useState([]);

  // const yearListOptions = yearList.map((year) => ({
  //   value: year.year,
  //   label: year.year,
  // }));
  const yearListOptions = [
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    // Add more year options as needed
  ];

  const [trimList, setTrimList] = useState([]);
  // const trimsListOptions = trimList.map((trim) => ({
  //   value: trim.price,
  //   label: trim.name,
  //   image: trim.featuredImage
  // }));
  const trimsListOptions = [
    { value: 'lx', label: 'LX' },
    { value: 'ex', label: 'EX' },
    { value: 'touring', label: 'Touring' },
    // Add more trim options as needed
  ];


  const [imageList, setImageList] = useState([]);

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);


  // const [loanAmount, setLoanAmount] = useState(
  //   loanFilter?.trim?.value ? loanFilter?.trim?.value : 0
  // );  
  const [interestRate, setInterestRate] = useState(1.9);


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
    setShowCarAnimImage(true)
  }, [loanFilter?.trim?.value]);
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
  };
  const handleModelChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedTrim(null);
    setSelectedModel(selectedOption)
    setLoanFilter({
      ...loanFilter,
      model: selectedOption,
      trim: null,
      year: null,
    });
  };

  const handleYearChange = (selectedOption) => {
    setSelectedTrim(null);
    setSelectedYear(selectedOption)
    setLoanFilter({
      ...loanFilter,
      year: selectedOption,
      trim: null
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

  const handleDownPaymentChange = (value) => {
    setDownPayment(value);
  }

  const handleInputDownPaymentChange = (e) => {
    if (e.target.value > parseFloat(loanAmount)) {
      alert(`Loan Amount Cannot be greater than Showroom Price`)
    }
    else {
      setDownPayment(parseFloat(e.target.value)); // Update the interestRate state
    }
  };

  const handleInterestRateChange = (value) => {
    setInterestRate(value);
  };
  const handleInputInterestRateChange = (e) => {
    if (e.target.value > 8) {
      alert("Interest rate cannot be more than 8%")
    }
    else {
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



  return (
    <MainLayout>
      <Ad728x90 dataAdSlot="5962627056" />


      <div className="container mt-5">
        <h4 className="mb-4">Select Make, Model, Year & Variant to check the EMI</h4>
        <div className="row gx-3">
          <div className="col-md-3 mb-3">
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
          <div className="col-md-3 mb-3">
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
          <div className="col-md-3 mb-3">
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
          <div className="col-md-3 mb-3">
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
        </div>
      </div>
      {selectedTrim && <div className="calculatorContainer">
        <div className="headerImage">
        </div>
        <div className="calculatorContent">
          <div className="leftSection">
            <div>
              <div className="monthlyIncomeContainer">
                <label className='monthlyIncomeTxt'>Down Payment </label>
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
                <span >{parseFloat(initialDownPayment)}</span>
                <span>{parseFloat(loanAmount)}</span>
              </div>
            </div>
            <div className='mt-2'>
              <div className="monthlyIncomeContainer">
                <label className='monthlyIncomeTxt'>Interest Rate</label>
                <div className="amountContainer">
                  <input
                    type="number"
                    className="form-control interestInputTxt"
                    value={interestRate}
                    onChange={handleInputInterestRateChange}
                    min={1.9}
                    max={8}
                    step={0.1}
                    style={{width:"90px"}}
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
                <span >1.9%</span>
                <span>8%</span>
              </div>
            </div>
            <div className='mt-2'>
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
            <div className='totalAmountContainer'>
              {showCarAnimImage && <img title="" alt="" className='carImage ' width="300" height="300" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="/assets/img/car-placeholder.png" />}
              <h5 className='totalAmoutTxt'>AED 22446*</h5>
              {/* <h6 className='maxEmiTxt'>Max EMI</h6> */}
              <button onClick={handleSubmit} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='budgetBtn mt-3 '>Calculate EMI</button>
            </div >
          </div>
        </div>
        {/* viewbreakup modal*/}
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Loan Breakup</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body ">
                <div class="emi-InfoBox">
                  {/* <div class="emi-Head"> Your monthly EMI</div>
                  <div class="emi-Price">AED <span class="emi_div">5,932</span></div> */}
                  <div class="emi-Interest">Rate of interest @ <span class="interestRate">{interestRate}</span>%* for <span class="tenure_value">{loanTenure / 12}</span> year(s)</div>
                  <div class="row  g-2">
                    <div class=" col-sm-6 col-12">
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
                    <div class=" col-sm-6 col-12">
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
                    <div class=" col-sm-6 col-12">
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
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>}



      <div className="faq-page-wrap pt-100 mb-100">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-4 d-lg-flex d-none">
              <div className="faq-img">
                <img src="assets/img/inner-page/faq-img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="faq-area">
                <div className="section-title-and-filter mb-40">
                  <div className="section-title">
                    <h4>FAQ’s &amp; Latest Answer</h4>
                  </div>
                </div>
                <div className="faq-wrap">
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          How often should I get my car serviced?
                        </button>
                      </h5>
                      <div id="flush-collapseOne" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                          Follow your car's owner's manual for recommended service intervals based on mileage and time. Consider driving conditions and habits for adjustments. Address warning signs promptly.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                          How often should I change my car's oil?
                        </button>
                      </h5>
                      <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">It's always a good idea to research and read
                          reviews specific to the dealership you're interested in, as
                          experiences can vary even within the same dealership chain.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                          What type of fuel should I use for my car?
                        </button>
                      </h5>
                      <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">It's always a good idea to research and read
                          reviews specific to the dealership you're interested in, as
                          experiences can vary even within the same dealership chain.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                          What is the recommended tire pressure for my car?
                        </button>
                      </h5>
                      <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">It's always a good idea to research and read
                          reviews specific to the dealership you're interested in, as
                          experiences can vary even within the same dealership chain.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                          Can I trade in my old car at a dealership?
                        </button>
                      </h5>
                      <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">It's always a good idea to research and read
                          reviews specific to the dealership you're interested in, as
                          experiences can vary even within the same dealership chain.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                          Can I test drive a vehicle before purchasing it?
                        </button>
                      </h5>
                      <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">It's always a good idea to research and read
                          reviews specific to the dealership you're interested in, as
                          experiences can vary even within the same dealership chain.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="flush-headingSeven">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                          Can I negotiate the price of a car at a dealership?
                        </button>
                      </h5>
                      <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">It's always a good idea to research and read
                          reviews specific to the dealership you're interested in, as
                          experiences can vary even within the same dealership chain.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq-inquiery-form pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-20">
                <h4>If Any Inquirey, To Do Ask Somethings </h4>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-30">
                    <div className="form-inner">
                      <label>Your Name* :</label>
                      <input type="text" placeholder="Jackson Mile" />
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="form-inner">
                      <label>Your Email* :</label>
                      <input type="text" placeholder="example@gamil.com" />
                    </div>
                  </div>
                  <div className="col-md-12 mb-30">
                    <div className="select-category">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          Used Car
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          New Car
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" defaultChecked />
                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                          Auction Car
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-30">
                    <div className="form-inner">
                      <label>Type Your Question*</label>
                      <textarea placeholder="Type Your Question*" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-inner">
                      <button type="submit" className="primary-btn3">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default loanCalculator