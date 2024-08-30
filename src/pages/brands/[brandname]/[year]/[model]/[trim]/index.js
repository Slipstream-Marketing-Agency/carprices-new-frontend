import React, { useEffect, useMemo, useRef, useState } from "react";

import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import MainLayout from "@/src/layout/MainLayout";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import axios from "axios";
import KeySpec from "@/src/components-old/trim-details/KeySpec";
import TrimDescription from "@/src/components-old/trim-details/TrimDescription";
import DetailedSpecification from "@/src/components-old/trim-details/DetailedSpecification";
import VehicleGallery from "@/src/components-old/trim-details/VehicleGallery";
import VehicleReview from "@/src/components-old/trim-details/VehicleReview";
import VehicleFaq from "@/src/components-old/trim-details/VehicleFaq";
import Price from "@/src/utils/Price";
import CarTestDriveForm from "@/src/components-old/CarTestDriveForm";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import BuyForm from "@/src/components-old/BuyForm";
import LoanEnquireForm from "@/src/components-old/LoanEnquireForm";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  .MuiToggleButtonGroup-grouped {
    margin-right: 6px;
    padding: 4px 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-transform: capitalize;
    font-size: 12px;
    font-weight: 600;
    &:not(:first-of-type) {
      border-left: 1px solid #ddd;
    }
    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &.Mui-selected {
      background-color: #1976d2;
      color: white;
    }
  }
`;

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function CarDeatilsPage({ model, trimList, trimData }) {
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const [isSticky, setIsSticky] = useState(false);
  const [price, setPrice] = useState(trimData.price ? trimData.price : "");
  const [years, setYears] = useState("5");
  const [interestRate, setInterestRate] = useState(2.5);
  const [downPayment, setDownPayment] = useState(20);
  const [downPaymentResult, setDownPaymentResult] = useState(0);
  const [totalCostResult, setTotalCostResult] = useState(0);
  const [monthlyRepaymentResult, setMonthlyRepaymentResult] = useState(0);
  const [calculateOpen, setCalculateOpen] = useState(false);

  const handleCalculateClose = () => {
    setCalculateOpen(false); // Close the dialog
  };

  const calculateEMI = () => {
    const p =
      parseFloat(price) - (parseFloat(downPayment) / 100) * parseFloat(price);
    const r = parseFloat(interestRate) / 100 / 12; // monthly interest rate
    const n = parseFloat(years) * 12; // loan tenure in months

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyRepaymentResult(emi);

    const totalRepayment = emi * n;
    const downPaymentAmount =
      (parseFloat(downPayment) / 100) * parseFloat(price);
    const totalCost = totalRepayment + downPaymentAmount;
    setDownPaymentResult(downPaymentAmount);
    setTotalCostResult(totalCost);
    setCalculateOpen(true);
  };

  const handleYearsChange = (event, newYears) => {
    if (newYears !== null) {
      setYears(newYears);
    }
  };

  const router = useRouter();
  const t = useTranslate();

  const brand = model?.car_brands?.data[0]?.attributes;
  const trim = model?.car_trims?.data[0]?.attributes;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };

  const CarEMIDisplay = ({ car }) => {
    const tenureInMonths = 60; // Loan tenure in months

    const calculateEMI = (principal) => {
      const annualInterestRate = 0.025; // Annual interest rate (2.5%)
      const monthlyInterestRate = annualInterestRate / 12; // Monthly interest rate
      const compoundInterestFactor = Math.pow(
        1 + monthlyInterestRate,
        tenureInMonths
      );
      const emi =
        (principal * monthlyInterestRate * compoundInterestFactor) /
        (compoundInterestFactor - 1);
      return Math.round(emi);
    };

    // Extract all non-zero prices, calculate EMI for each, and find the minimum EMI
    const emis = car
      ?.filter((trim) => trim?.attributes.price > 0)
      .map((trim) => calculateEMI(trim?.attributes?.price));

    const minEMI = Math.min(...emis);

    // Format the minimum EMI for display
    const emiString = minEMI
      ? `AED ${minEMI?.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}*`
      : "Not Available";

    return <span>{emiString}</span>;
  };
  const slideSetting = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      loop: false,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
      },
      navigation: {
        nextEl: ".product-stand-next",
        prevEl: ".product-stand-prev",
      },
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [loanOpen, setLoanOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleBuyOpen = () => setBuyOpen(true);
  const handleLoanOpen = () => {
    setCalculateOpen(false);
    setLoanOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleBuyClose = () => setBuyOpen(false);
  const handleLoanClose = () => setLoanOpen(false);

  return (
    <MainLayout
      pageMeta={{
        title: `${trimData?.brand} ${trimData?.model} ${trimData?.year} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
        description: `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${
          trimData?.name
        } price in UAE starts at ${
          trimData.price <= 0
            ? "TBD"
            : "AED" +
              " " +
              trimData.price?.toLocaleString("en-AE", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
        }*.Check out ${
          trimData?.model
        } colours, Features, Specifications, Reviews, Interior Images, & Mileage.`,
        type: "Car Review Website",
      }}
    >
      <div className="car-details-area mt-15 mb-15">
        <div className="container">
          <div className="row ">
            <div className="col-lg-9">
              <Ad728x90 dataAdSlot="5962627056" />
              <div className="row trim-content  white_bg_wrapper">
                <div className="col-lg-6 pe-3">
                  <div className="single-item mb-50" id="car-img">
                    <div className="car-img-area">
                      <div
                        className="tab-content mb-30 trim-content"
                        id="myTab5Content"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="exterior"
                          role="tabpanel"
                          aria-labelledby="exterior-tab"
                        >
                          <div className="product-img">
                            <div className="slider-btn-group">
                              <div className="product-stand-next swiper-arrow pb-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="20"
                                >
                                  <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
                                </svg>
                              </div>
                              <div className="product-stand-prev swiper-arrow pb-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="20"
                                >
                                  <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                                </svg>
                              </div>
                            </div>
                            <Swiper
                              {...slideSetting}
                              className="swiper product-img-slider"
                            >
                              <div className="swiper-wrapper">
                                <SwiperSlide className="swiper-slide">
                                  <Image
                                    src={
                                      trimData?.featuredImage === null
                                        ? "/assets/img/car-placeholder.png"
                                        : trimData?.featuredImage
                                    }
                                    alt="product image"
                                    fill
                                    className="object-contain"
                                  />
                                </SwiperSlide>
                                {trimData?.galleryImages?.map((item, idx) => (
                                  <SwiperSlide className="swiper-slide">
                                    <Image
                                      src={item}
                                      alt="product image"
                                      fill
                                      className="object-contain"
                                    />
                                  </SwiperSlide>
                                ))}
                              </div>
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex justify-content-between align-items-center position-relative">
                    <h1 className="fw-bold mb-0">
                      {trimData?.year} {trimData?.brand} {trimData?.model}{" "}
                      {trimData?.name}
                    </h1>{" "}
                  </div>
                  <h2 className="fw-bold text-primary mb-2">
                    <Price data={trimData.price} />
                  </h2>

                  <div className="tw-space-x-2 tw-mb-1 tw-ml-[-3px]">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleBuyOpen}
                    >
                      <strong>Reserve Online</strong>
                    </Button>
                    <Button variant="outlined" onClick={handleOpen}>
                      <strong>Book a Test Drive</strong>
                    </Button>
                  </div>
                  <div className="d-flex gap-2 align-items-center w-100  py-1 rounded justify-content-start ">
                    <p className="p-0 m-0 ">
                      Monthly EMI starting from{" "}
                      <strong>
                        {" "}
                        <Price
                          data={Math.round(
                            ((trimData.price -
                              trimData.price * (downPayment / 100)) *
                              (interestRate / 100 / 12) *
                              Math.pow(
                                1 + interestRate / 100 / 12,
                                years * 12
                              )) /
                              (Math.pow(
                                1 + interestRate / 100 / 12,
                                years * 12
                              ) -
                                1)
                          )}
                        />
                      </strong>
                    </p>
                  </div>

                  <div className="tw-mt-2 key_spec">
                    {trimData.price === null ? (
                      ""
                    ) : (
                      <Box className=" tw-mt-2">
                        <Box className="">
                          <Box className="tw-w-full tw-mb-2 tw-flex tw-items-center">
                            <p className="tw-font-bold tw-text-[13px] tw-mb-0 tw-mr-2">
                              Loan Years
                            </p>
                            <StyledToggleButtonGroup
                              value={years}
                              exclusive
                              onChange={handleYearsChange}
                              aria-label="loan period"
                            >
                              <ToggleButton value="1" aria-label="1 year">
                                1 Year
                              </ToggleButton>
                              <ToggleButton value="2" aria-label="2 years">
                                2 Years
                              </ToggleButton>
                              <ToggleButton value="3" aria-label="3 years">
                                3 Years
                              </ToggleButton>
                              <ToggleButton value="4" aria-label="4 years">
                                4 Years
                              </ToggleButton>
                              <ToggleButton value="5" aria-label="5 years">
                                5 Years
                              </ToggleButton>
                            </StyledToggleButtonGroup>
                          </Box>

                          <Box className="tw-d-flex tw-align-items-center ">
                            <Box className="tw-w-full">
                              <Box className="tw-mb-0 tw-w-[95%] ">
                                <p className="tw-font-bold tw-text-[13px]">
                                  Interest Rate (%)
                                </p>
                                <Slider
                                  value={interestRate}
                                  onChange={(e, value) =>
                                    setInterestRate(value)
                                  }
                                  step={0.1}
                                  min={2.0}
                                  max={8.0}
                                  valueLabelDisplay="auto"
                                  marks={[
                                    { value: 2.0, label: "2%" },
                                    { value: 8.0, label: "8%" },
                                  ]}
                                  className="tw-ml-2 tw-mb-4 "
                                />
                              </Box>

                              <Box className="tw-mb-0 tw-w-[95%]">
                                <p className="tw-font-bold tw-text-[13px]">
                                  Down Payment (%)
                                </p>
                                <Slider
                                  value={downPayment}
                                  onChange={(e, value) => setDownPayment(value)}
                                  step={1}
                                  min={20}
                                  max={80}
                                  valueLabelDisplay="auto"
                                  marks={[
                                    { value: 20, label: "20%" },
                                    { value: 80, label: "80%" },
                                  ]}
                                  className="tw-ml-2 "
                                />
                              </Box>
                            </Box>
                            <Box className="tw-w-full tw-px-0 ">
                              <div className="tw-justify-center tw-flex">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={calculateEMI}
                                  className="tw-w-full tw-py-1 tw-font-bold"
                                >
                                  Calculate
                                </Button>
                              </div>
                            </Box>
                            <p className="loan-disclaimer tw-leading-6 tw-mt-2">
                              *The rate mentioned in the calculator is an
                              indicative rate only. The actual rate may vary.
                            </p>

                            <Dialog
                              open={calculateOpen}
                              onClose={handleCalculateClose}
                            >
                              <DialogTitle className="tw-font-bold tw-px-16">
                                Loan Calculation Result
                              </DialogTitle>
                              <DialogContent className="tw-pb-3">
                                <div className="tw-bg-red-100 tw-mx-2 tw-py-10 tw-px-10 tw-border tw-rounded">
                                  <div className="tw-flex tw-justify-between">
                                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                                      <h5 className="tw-font-bold">
                                        AED{" "}
                                        {downPaymentResult.toLocaleString(
                                          "en-AE",
                                          {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2,
                                          }
                                        )}
                                      </h5>
                                      <h5>Down Payment</h5>
                                    </div>
                                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                                      <h5 className="tw-font-bold">
                                        AED{" "}
                                        {totalCostResult.toLocaleString(
                                          "en-AE",
                                          {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2,
                                          }
                                        )}
                                      </h5>
                                      <h5>Total Cost</h5>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                                    <h5>Monthly Repayment (EMI)</h5>
                                    <h2 className="tw-font-bold tw-text-red-500">
                                      AED{" "}
                                      {monthlyRepaymentResult.toLocaleString(
                                        "en-AE",
                                        {
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits: 2,
                                        }
                                      )}
                                    </h2>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleLoanOpen}
                                  color="primary"
                                  variant="contained"
                                >
                                  Inquire Now
                                </Button>
                                <Button
                                  onClick={handleCalculateClose}
                                  color="error"
                                  variant="outlined"
                                >
                                  Close
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </div>
                  <LoanEnquireForm
                    carName={trimData?.name}
                    brand={trimData?.brand}
                    model={trimData?.model}
                    year={trimData?.year}
                    loanOpen={loanOpen}
                    onClose={handleLoanClose}
                  />
                  <BuyForm
                    carName={trimData?.name}
                    brand={trimData?.brand}
                    model={trimData?.model}
                    year={trimData?.year}
                    buyOpen={buyOpen}
                    onClose={handleBuyClose}
                  />
                  <CarTestDriveForm
                    carName={trimData?.name}
                    brand={trimData?.brand}
                    model={trimData?.model}
                    year={trimData?.year}
                    open={open}
                    onClose={handleClose}
                  />
                </div>
              </div>
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-offset={0}
                className="scrollspy-example"
                tabIndex={0}
              >
                <div className="single-item" id="car-info">
                  <KeySpec trim={trimData} />
                </div>

                <Ad728x90 dataAdSlot="5962627056" />

                <TrimDescription trim={trimData} />
                <Ad728x90 dataAdSlot="5962627056" />
                <DetailedSpecification trim={trimData} />
                {trimData?.galleryImages?.length > 0 && (
                  <>
                    {" "}
                    <Ad728x90 dataAdSlot="5962627056" />
                    <VehicleGallery trim={trimData.galleryImages} />
                  </>
                )}

                <Ad728x90 dataAdSlot="5962627056" />
                <VehicleReview trim={trimData} />
                <Ad728x90 dataAdSlot="5962627056" />
                <VehicleFaq trim={trimData} />
              </div>
            </div>
            <div className="col-lg-3  ">
              <div className="positionStickyAd">
                <Ad300x600 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CarDeatilsPage;

export async function getServerSideProps(context) {
  const year = context.params.year;
  const brandname = context.params.brandname;
  const modelSlug = context.params.model;
  const trimSlug = context.params.trim;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-trims/findonetrim/${modelSlug}/${trimSlug}/${year}`
    );
    return {
      props: { trimData: response?.data?.data },
    };
  } catch (error) {
    console.error("Failed to fetch trim data:", error);

    // Redirect to a custom error page or return notFound: true
    return {
      // notFound: true,
    };
  }
}
