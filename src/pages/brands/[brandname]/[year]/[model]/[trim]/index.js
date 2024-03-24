import React, { useEffect, useMemo, useRef, useState } from "react";

import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import MainLayout from "@/src/layout/MainLayout";
import SelectComponent from "@/src/utils/SelectComponent";
import Ad728x90 from "@/src/components/ads/Ad728x90";
import Ad300x250 from "@/src/components/ads/Ad300x250";
import Image from "next/image";
import CarDetailsNav from "@/src/components/details/CarDetailsNav";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import Ad300x600 from "@/src/components/ads/Ad300x600";
import axios from "axios";
import KeySpec from "@/src/components/trim-details/KeySpec";
import TrimDescription from "@/src/components/trim-details/TrimDescription";
import DetailedSpecification from "@/src/components/trim-details/DetailedSpecification";
import VehicleGallery from "@/src/components/trim-details/VehicleGallery";
import VehicleReview from "@/src/components/trim-details/VehicleReview";
import VehicleFaq from "@/src/components/trim-details/VehicleFaq";
import NewShareBtns from "@/src/components/common/NewShareBtns";
import Price from "@/src/utils/Price";

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

  const calculateEMI = () => {
    const p =
      parseFloat(price) - (parseFloat(downPayment) / 100) * parseFloat(price);
    const r = parseFloat(interestRate) / 100 / 12; // monthly interest rate
    const n = parseFloat(years) * 12; // loan tenure in months

    const emi = (
      (p * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
    ).toFixed(2);
    setMonthlyRepaymentResult(emi);

    const totalCost = (emi * n).toFixed(2);
    setTotalCostResult(totalCost);
    const totalInterestPayment = (totalCost - p).toFixed(2);
    setDownPaymentResult(totalInterestPayment);
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
      ?.filter((trim) => trim.attributes.price > 0)
      .map((trim) => calculateEMI(trim.attributes.price));

    const minEMI = Math.min(...emis);

    // Format the minimum EMI for display
    const emiString = minEMI
      ? `AED ${minEMI.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}*`
      : "Not Available";

    return <span>{emiString}</span>;
  };

  const carSlide = useMemo(() => {
    return {
      speed: 1500,
      spaceBetween: 40,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-2",
        prevEl: ".prev-2",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        420: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    };
  });
  const upcommingSlide = useMemo(() => {
    return {
      slidesPerView: 3,
      speed: 1500,
      spaceBetween: 25,
      navigation: {
        nextEl: ".next-2",
        prevEl: ".prev-2",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  });
  const slideSettings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
      },
      navigation: {
        nextEl: ".next-4",
        prevEl: ".prev-4",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    };
  });
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
          {/* <div className="row mb-50">
            <div className="col-lg-12 position-relative">
              <div className={`car-details-menu ${isSticky ? "sticky" : ""}`}>
                <CarDetailsNav />
              </div>
            </div>
          </div> */}
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
                    <h1 className="fw-bold mb-1">
                      {trimData?.year} {trimData?.brand} {trimData?.model}{" "}
                      {trimData?.name}
                    </h1>{" "}
                    {/* <div className="shareBtnMobile">
                      <NewShareBtns />
                    </div> */}
                  </div>
                  <h2 className="fw-bold text-primary mb-3">
                    <Price data={trimData.price} />
                  </h2>

                  <div className="d-flex gap-2 align-items-center w-100 border py-1 rounded justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        fill="currentColor"
                        d="M21.5 13.3v7.2H2.5v-8.7l9-6.8 9 6.8zm-2 5.8V8.5l-8-6-8 6v10.6h16z"
                      />
                      <path fill="currentColor" d="M6 18.5h5v2H6z" />
                      <path fill="currentColor" d="M14 18.5h4v2h-4z" />
                      <path fill="currentColor" d="M6 14.5h12v2H6z" />
                      <path fill="currentColor" d="M6 10.5h12v2H6z" />
                    </svg>
                    <h6 className="p-0 m-0 ">
                      {t.monthlyEmi}{" "}
                      <Price
                        data={Math.round(
                          ((trimData.price -
                            trimData.price * (downPayment / 100)) *
                            (interestRate / 100 / 12) *
                            Math.pow(1 + interestRate / 100 / 12, years * 12)) /
                            (Math.pow(1 + interestRate / 100 / 12, years * 12) -
                              1)
                        )}
                      />
                    </h6>
                  </div>

                  <div className="mt-2 key_spec">
                    {/* <p className="fw-bold">{t.keySpecification}</p> */}
                    <div className="row px-2">
                      {trimData.price === null ? (
                        ""
                      ) : (
                        <div className="calculator mt-2">
                          <div className="calculator-body">
                            <div>
                              <div className="form-group model_insure_btn mb-1">
                                <small>{t.loanYears}</small>
                                <div
                                  className="btn-group btn-group-toggle"
                                  data-toggle="buttons"
                                >
                                  <label
                                    className={
                                      years === "1"
                                        ? "btn btn-outline-primary pt-2 px-1"
                                        : "btn btn-primary pt-2 px-1"
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="loan-years"
                                      id="loan-years-1"
                                      autoComplete="off"
                                      value="1"
                                      checked={years === "1"}
                                      onChange={(e) =>
                                        setYears(e?.target?.value)
                                      }
                                    />
                                    1 {t.year}
                                  </label>
                                  <label
                                    className={
                                      years === "2"
                                        ? "btn btn-outline-primary pt-2 px-1"
                                        : "btn btn-primary pt-2 px-1"
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="loan-years"
                                      id="loan-years-2"
                                      autoComplete="off"
                                      value="2"
                                      checked={years === "2"}
                                      onChange={(e) =>
                                        setYears(e?.target?.value)
                                      }
                                    />{" "}
                                    2 {t.years}
                                  </label>
                                  <label
                                    className={
                                      years === "3"
                                        ? "btn btn-outline-primary pt-2 px-1"
                                        : "btn btn-primary pt-2 px-1"
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="loan-years"
                                      id="loan-years-3"
                                      autoComplete="off"
                                      value="3"
                                      checked={years === "3"}
                                      onChange={(e) =>
                                        setYears(e?.target?.value)
                                      }
                                    />{" "}
                                    3 {t.years}
                                  </label>
                                  <label
                                    className={
                                      years === "4"
                                        ? "btn btn-outline-primary pt-2 px-1"
                                        : "btn btn-primary pt-2 px-1"
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="loan-years"
                                      id="loan-years-4"
                                      autoComplete="off"
                                      value="4"
                                      checked={years === "4"}
                                      onChange={(e) =>
                                        setYears(e?.target?.value)
                                      }
                                    />{" "}
                                    4 {t.years}
                                  </label>
                                  <label
                                    className={
                                      years === "5"
                                        ? "btn btn-outline-primary pt-2 px-1"
                                        : "btn btn-primary pt-2 px-1"
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name="loan-years"
                                      id="loan-years-5"
                                      autoComplete="off"
                                      value="5"
                                      checked={years === "5"}
                                      onChange={(e) =>
                                        setYears(e?.target?.value)
                                      }
                                    />{" "}
                                    5 {t.years}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="w-60">
                                <div className="form-group w-100">
                                  <small htmlFor="interest-rate">
                                    {t.interestRate} (%)
                                  </small>
                                  <input
                                    type="range"
                                    id="interest-rate"
                                    className="form-control-range"
                                    defaultValue={interestRate}
                                    min={2.0}
                                    max={8.0}
                                    step="0.1"
                                    onChange={(e) => {
                                      setInterestRate(e?.target?.value);
                                      document.getElementById(
                                        "interest-rate-value"
                                      ).innerHTML = e?.target?.value + "%";
                                    }}
                                  />
                                  <div className="d-flex justify-content-between">
                                    <small>1.99%</small>
                                    <small id="interest-rate-value">
                                      {interestRate}%
                                    </small>
                                    <small>8%</small>
                                  </div>
                                </div>

                                <div className="form-group w-100">
                                  <small htmlFor="down-payment">
                                    {t.downpayment} (AED)
                                  </small>
                                  <input
                                    type="range"
                                    id="down-payment"
                                    className="form-control-range"
                                    defaultValue={downPayment}
                                    min={20}
                                    max={80}
                                    step={1}
                                    onChange={(e) => {
                                      setDownPayment(e?.target?.value);
                                      document.getElementById(
                                        "down-payment-value"
                                      ).innerHTML = e?.target?.value + "%";
                                    }}
                                  />
                                  <div className="d-flex justify-content-between">
                                    <small>20%</small>
                                    <small id="down-payment-value">
                                      {downPayment}%
                                    </small>
                                    <small>80%</small>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group w-40 px-4">
                                <div
                                  type="button"
                                  className="calulate_btn font_small py-3 fw-bold"
                                  onClick={calculateEMI}
                                >
                                  {t.calculate}
                                </div>
                              </div>
                            </div>
                            {monthlyRepaymentResult !== 0 &&
                              downPaymentResult !== 0 &&
                              totalCostResult !== 0 && (
                                <div>
                                  <div className=" mt-1 ">
                                    <div className="white_bg_wrapper py-1 px-2 mt-1">
                                      <span className="fw-bold font_small me-1">
                                        {t.monthlyRepayment} (EMI):
                                      </span>
                                      <span
                                        className="fw-bold font_small"
                                        id="monthly-repayment-result"
                                      >
                                        <Price data={monthlyRepaymentResult} />
                                      </span>
                                    </div>
                                    <div className="white_bg_wrapper py-0 px-2 mt-1">
                                      <span className="fw-bold font_small me-1">
                                        {t.totalInterestPayment}:
                                      </span>
                                      <span
                                        className="fw-bold font_small"
                                        id="down-payment-result"
                                      >
                                        <Price data={downPaymentResult} />
                                      </span>
                                    </div>
                                    <div className="white_bg_wrapper py-0 px-2 mt-1">
                                      <span className="fw-bold font_small me-1">
                                        {t.totalAmountToPay}:
                                      </span>
                                      <span
                                        className="fw-bold font_small"
                                        id="total-cost-result"
                                      >
                                        <Price data={totalCostResult} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                {/* <div className="single-item mb-50" id="kye-features">
                  <div className="kye-features">
                    <div className="title mb-20">
                      <h5>Key Features</h5>
                    </div>
                    <ul>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 12 12"
                        >
                          <path d="M6 11.25C4.60761 11.25 3.27226 10.6969 2.28769 9.71231C1.30312 8.72774 0.75 7.39239 0.75 6C0.75 4.60761 1.30312 3.27226 2.28769 2.28769C3.27226 1.30312 4.60761 0.75 6 0.75C7.39239 0.75 8.72774 1.30312 9.71231 2.28769C10.6969 3.27226 11.25 4.60761 11.25 6C11.25 7.39239 10.6969 8.72774 9.71231 9.71231C8.72774 10.6969 7.39239 11.25 6 11.25ZM6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12Z" />
                          <path d="M8.22751 3.72747C8.22217 3.73264 8.21716 3.73816 8.21251 3.74397L5.60776 7.06272L4.03801 5.49222C3.93138 5.39286 3.79034 5.33876 3.64462 5.34134C3.49889 5.34391 3.35985 5.40294 3.25679 5.506C3.15373 5.60906 3.0947 5.7481 3.09213 5.89382C3.08956 6.03955 3.14365 6.18059 3.24301 6.28722L5.22751 8.27247C5.28097 8.32583 5.34463 8.36788 5.4147 8.39611C5.48476 8.42433 5.5598 8.43816 5.63532 8.43676C5.71084 8.43536 5.78531 8.41876 5.85428 8.38796C5.92325 8.35716 5.98531 8.31278 6.03676 8.25747L9.03076 4.51497C9.13271 4.40796 9.18845 4.26514 9.18593 4.11737C9.18341 3.9696 9.12284 3.82875 9.0173 3.72529C8.91177 3.62182 8.76975 3.56405 8.62196 3.56446C8.47417 3.56486 8.33247 3.62342 8.22751 3.72747Z" />
                        </svg>{" "}
                        Premium Wheel
                      </li>
                      
                    </ul>
                  </div>
                </div> */}
                <Ad728x90 dataAdSlot="5962627056" />

                <TrimDescription trim={trimData} />
                <Ad728x90 dataAdSlot="5962627056" />
                <DetailedSpecification trim={trimData} />
                {trimData.galleryImages.length > 0 && (
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
      notFound: true,
    };
  }
}
