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
import ModelDescription from "@/src/components/details/ModelDescription";
import VariantsListing from "@/src/components/details/VariantsListing";
import VehicleFaq from "@/src/components/details/VehicleFaq";

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function CarDeatilsPage({ model, trimList }) {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const t = useTranslate();

  const brand = model?.car_brands?.data[0]?.attributes;
  const trim = model?.car_trims?.data[0]?.attributes;

  console.log(model, "model");

  const CarPriceRange = ({ car }) => {
    // Extracting and filtering prices (excluding zeros) from car trims
    const prices = car
      ?.map((trim) => trim.attributes.price)
      .filter((price) => price > 0);

    // Format price for display
    const formatPrice = (price) => {
      return price.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    // Check if there are valid prices available
    if (prices.length > 0) {
      // Finding minimum and maximum prices
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Determine how to display the price information
      let priceInfo;
      if (minPrice === maxPrice) {
        // If min and max prices are the same, display only one price
        priceInfo = `AED ${formatPrice(minPrice)}*`;
      } else {
        // Display price range
        priceInfo = `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;
      }

      return priceInfo;
    } else {
      // If no valid prices are available, display "TBD"
      return TBD;
    }
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
      loop: true,
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

  const phoneInputField = useRef(null);

  useEffect(() => {
    if (phoneInputField.current) {
      window.intlTelInput(phoneInputField.current, {
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }
  }, []);

  const [contactData, setContactData] = useState({
    phoneNumber: "+990737621432",
    email: "info@gmail.com",
    whatsapp: "+990737621432",
  });

  const handleClick = (type) => {
    let hrefValue = "";
    let newText = "";

    switch (type) {
      case "phoneNumber":
        hrefValue = `tel:${contactData.phoneNumber}`;
        newText = contactData.phoneNumber;
        break;
      case "emailAdress":
        hrefValue = `mailto:${contactData.email}`;
        newText = contactData.email;
        break;
      case "emailAdresss":
        hrefValue = contactData.whatsapp
          ? `https://api.whatsapp.com/send?phone=${contactData.whatsapp}&text=Hello this is the starting message`
          : "";
        newText = contactData.whatsapp || "Whatsapp";
        break;
      default:
        break;
    }

    // Set the href attribute and update the text for the clicked element
    const element = document.getElementById(type);
    if (element) {
      const link = element.querySelector("a");
      link.setAttribute("href", hrefValue);
      link.textContent = `${newText}`;
    }
  };

  const engineText = trimList
    ?.map((engine) => {
      const engineParts = engine?.attributes?.engine?.split(" ");
      const size = engineParts && engineParts[0];
      const type = engineParts && engineParts[1];

      return `${size}`;
    })
    .reduce((acc, cur, idx, arr) => {
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  function TransmissionList(props) {
    const transmissions = Array.from(
      new Set(props?.map((transmission) => transmission?.attributes?.gearBox))
    )
      .filter((transmission) => transmission !== undefined)
      .map((transmission) => {
        let type;
        let speed;

        if (transmission?.includes("A")) {
          type = "Automatic";
          speed = `${type}`;
        } else if (transmission?.includes("M")) {
          type = "Manual";
          speed = `${type}`;
        } else {
          type = "CVT";
          speed = `${type}`;
        }

        return `${speed}`;
      });

    if (transmissions.length === 1) {
      return <>{transmissions[0]}</>;
    } else if (transmissions.length === 2) {
      if (transmissions[0] === transmissions[1]) {
        return <>{transmissions[0]}</>;
      } else {
        return (
          <>
            {transmissions[0]} or {transmissions[1]}
          </>
        );
      }
    } else {
      const last = transmissions.pop();
      const joined = transmissions.join(", ");
      const hasDuplicates = transmissions.includes(last);

      if (hasDuplicates) {
        return <p>{joined}</p>;
      } else {
        return (
          <p>
            {joined} or {last}
          </p>
        );
      }
    }
  }

  const fuelType = trimList
    ?.map((item) => item?.attributes?.fuelType)
    .filter((value, index, self) => self.indexOf(value) === index) // add this line to filter duplicates
    .reduce((acc, cur, idx, arr) => {
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  console.log(fuelType, "ttttttt");

  const motorTypes = trimList
    ?.map((item) => item?.attributes?.motor)
    .filter((value, index, self) => self.indexOf(value) === index) // add this line to filter duplicates
    .reduce((acc, cur, idx, arr) => {
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  const cylinderList = [
    ...new Set(trimList?.map((item) => item?.attributes?.cylinders)),
  ];
  const seatList = [
    ...new Set(
      trimList?.map((item) =>
        Number(item?.attributes?.seatingCapacity?.replace("Seater", ""))
      )
    ),
  ].sort((a, b) => a - b);

  const powers = trimList.map((car) => car.attributes.power);
  const minPower = Math.min(...powers);
  const maxPower = Math.max(...powers);

  const torques = trimList.map((car) => car.attributes.torque);
  const minTorque = Math.min(...torques);
  const maxTorque = Math.max(...torques);

  console.log(minPower, maxPower, "fjfjfj");
  return (
    <MainLayout>
      <Ad728x90 dataAdSlot="5962627056" />

      <div className="car-details-area mt-15 mb-100">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12 position-relative">
              <div className={`car-details-menu ${isSticky ? "sticky" : ""}`}>
                <CarDetailsNav />
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-6 pe-3">
              <div className="single-item mb-50" id="car-img">
                <div className="car-img-area">
                  <div className="tab-content mb-30" id="myTab5Content">
                    <div
                      className="tab-pane fade show active"
                      id="exterior"
                      role="tabpanel"
                      aria-labelledby="exterior-tab"
                    >
                      <div className="product-img">
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow pb-1">
                            {/* <svg width={8} height={13} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                                </svg> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="20"
                            >
                              <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow pb-1">
                            {/* <svg width={8} height={13} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                                </svg> */}
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
                                src={trim?.featuredImage?.data?.attributes?.url}
                                width={400}
                                height={300}
                                alt="product image"
                                className="object-contain"
                              />
                            </SwiperSlide>
                          </div>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-between align-items-center">
                <h1>
                  {model?.year} {brand?.name} {model?.name}
                </h1>{" "}
                <a href="#">
                  <div className="shareBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.06-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.03 8.81C6.49 8.31 5.78 8 5 8c-1.66 0-3 1.34-3 3s1.34 3 3 3c.78 0 1.49-.31 2.03-.81l7.12 4.15c-.05.21-.08.43-.08.66 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                      />
                    </svg>
                    <span>Share</span>
                  </div>
                </a>
              </div>
              <h4 className="mt-1">
                <CarPriceRange car={trimList} />
              </h4>

              <div className="d-flex gap-2 align-items-center w-75 border py-1 rounded justify-content-center">
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
                <h6 className="p-0 m-0">
                  Monthly EMI starting from <CarEMIDisplay car={trimList} />
                </h6>
              </div>
              <div className="mt-3 d-flex gap-2 align-items-center w-75 border py-1 rounded justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.5 9.5l-2-6H4.5l-2 6H1v2h1.7l.9 2.7c.1.3.4.5.8.5h14.1c.4 0 .7-.2.8-.5l.9-2.7H23v-2h-1.5zM4.78 8H19.22l1-3H3.78zM6 16v-5h12v5H6zm12-7h-4V4h4v5z"
                  />
                </svg>

                <h6 className="p-0 m-0">
                  Available Variants : {trimList.length}
                </h6>
              </div>

              <div className="mt-2 key_spec">
                <p className="fw-bold">{t.keySpecification}</p>
                <div className="row px-2">
                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Cylinder.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">
                          {engineText.includes("Electric")
                            ? "Motor Type"
                            : t.NoOfCylinders}
                        </small>
                        <div className="d-flex flex-wrap mt-1">
                          <small>
                            {engineText.includes("Electric")
                              ? motorTypes.split(" ")[0]
                              : cylinderList.length > 1
                              ? cylinderList.join(", ")
                              : cylinderList[0]}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Transmission.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">{t.transmission}</small>
                        <div className="d-flex flex-wrap">
                          <small>{TransmissionList(trimList)}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image"
                        src="/assets/images/specs/KM.svg"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bolder">{t.power} (HP)</small>
                        <small>
                          {minPower === maxPower
                            ? minPower
                            : `${minPower} to ${maxPower}`}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Torque.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bolder">{t.torque} (Nm)</small>
                        <small>
                          {minTorque === maxTorque
                            ? minTorque
                            : `${minTorque} to ${maxTorque}`}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/Seats.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">{t.seats}</small>
                        <small>
                          {seatList.length > 1
                            ? seatList.join(", ")
                            : seatList[0]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image p-2"
                        src="/assets/images/specs/FuelType.png"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">{t.fuelType}</small>
                        <small>{fuelType}</small>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-4 mt-1 ps-0">
                    <div className="d-flex d-flex align-items-center justify-content-start">
                      <img
                        className="spec_image"
                        src="/assets/images/specs/FWD.svg"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <small className="fw-bold">Crossover</small>
                        <small>SUV</small>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-8">
              <ModelDescription model={trimList} hightTrim={trim} />
              <VariantsListing model={trimList} highTrim={trim} />
              <VehicleFaq model={trimList} highTrim={trim} />
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-offset={0}
                className="scrollspy-example"
                tabIndex={0}
              >
                <div className="single-item mb-50" id="faqs">
                  <div className="faq-area">
                    <div className="title mb-25">
                      <h5>FAQ’s &amp; Latest Answer</h5>
                    </div>
                    <div className="faq-wrap">
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item">
                          <h5
                            className="accordion-header"
                            id="flush-headingOne"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              How often should I get my car serviced?
                            </button>
                          </h5>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              It's always a good idea to research and read
                              reviews specific to the dealership you're
                              interested in, as experiences can vary even within
                              the same dealership chain.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h5
                            className="accordion-header"
                            id="flush-headingTwo"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              How often should I change my car's oil?
                            </button>
                          </h5>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              It's always a good idea to research and read
                              reviews specific to the dealership you're
                              interested in, as experiences can vary even within
                              the same dealership chain.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h5
                            className="accordion-header"
                            id="flush-headingThree"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              What type of fuel should I use for my car?
                            </button>
                          </h5>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              It's always a good idea to research and read
                              reviews specific to the dealership you're
                              interested in, as experiences can vary even within
                              the same dealership chain.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h5
                            className="accordion-header"
                            id="flush-headingFour"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseFour"
                              aria-expanded="false"
                              aria-controls="flush-collapseFour"
                            >
                              What is the recommended tire pressure for my car?
                            </button>
                          </h5>
                          <div
                            id="flush-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingFour"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              It's always a good idea to research and read
                              reviews specific to the dealership you're
                              interested in, as experiences can vary even within
                              the same dealership chain.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="car-details-sidebar">
                {/* <div className="contact-info mb-50">
              <div className="single-contact" id="phoneNumber">
                <a onClick={() => handleClick('phoneNumber')}>
                  <i className="bx bx-phone-call" /> Show Number
                </a>
              </div>
              <div className="single-contact" id="emailAdress">
                <a onClick={() => handleClick('emailAdress')}>
                  <i className="bx bx-at" /> Email Now
                </a>
              </div>
              <div className="single-contact" id="emailAdresss">
                <a onClick={() => handleClick('emailAdresss')}>
                  <i className="bx bxl-whatsapp" /> Whatsapp
                </a>
              </div>
              </div > */}
                <div
                  className="contact-info mb-50"
                  style={{ backgroundColor: "rosybrown" }}
                >
                  <Ad300x250 dataAdSlot="5772723668" />
                </div>
                <div className="inquiry-form mb-40">
                  <div className="title">
                    <h4>To More inquiry </h4>
                    <p>If choose this car to contact easily with us.</p>
                  </div>
                  <form>
                    <div className="form-inner mb-20">
                      <label>Name*</label>
                      <input type="text" placeholder="Ex- Jhon Numan" />
                    </div>
                    <div className="form-inner mb-20">
                      <label>Email*</label>
                      <input type="email" placeholder="Ex- info@gmail.com" />
                    </div>
                    <div className="form-inner mb-20">
                      <label>Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="phone"
                        name="phone"
                      />
                    </div>
                    <div className="form-inner mb-20">
                      <label>Message*</label>
                      <textarea
                        placeholder="Write your message..."
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-inner">
                      <button className="primary-btn3" type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                        >
                          <path d="M13.8697 0.129409C13.9314 0.191213 13.9736 0.269783 13.991 0.355362C14.0085 0.44094 14.0004 0.529754 13.9678 0.610771L8.78063 13.5781C8.73492 13.6923 8.65859 13.7917 8.56003 13.8653C8.46148 13.9389 8.34453 13.9839 8.22206 13.9954C8.09958 14.0068 7.97633 13.9842 7.86586 13.9301C7.75539 13.876 7.66199 13.7924 7.59594 13.6887L4.76304 9.23607L0.310438 6.40316C0.206426 6.33718 0.122663 6.24375 0.0683925 6.13318C0.0141218 6.02261 -0.00854707 5.89919 0.00288719 5.77655C0.0143215 5.65391 0.0594144 5.53681 0.13319 5.43817C0.206966 5.33954 0.306557 5.2632 0.420973 5.21759L13.3883 0.0322452C13.4694 -0.000369522 13.5582 -0.00846329 13.6437 0.00896931C13.7293 0.0264019 13.8079 0.0685926 13.8697 0.1303V0.129409ZM5.65267 8.97578L8.11385 12.8427L12.3329 2.29554L5.65267 8.97578ZM11.7027 1.66531L1.1555 5.88436L5.02333 8.34466L11.7027 1.66531Z" />
                        </svg>{" "}
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
                <div className="recent-car-area">
                  <div className="title mb-30">
                    <h5>Recent Used Car</h5>
                  </div>
                  <ul className="nav nav-tabs" id="myTab6" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="new-car-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#new-car"
                        type="button"
                        role="tab"
                        aria-controls="new-car"
                        aria-selected="true"
                      >
                        New Car
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="used-car-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#used-car"
                        type="button"
                        role="tab"
                        aria-controls="used-car"
                        aria-selected="false"
                      >
                        Used Car
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="auction-car-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#auction-car"
                        type="button"
                        role="tab"
                        aria-controls="auction-car"
                        aria-selected="false"
                      >
                        Auction Car
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content mb-30" id="myTab6Content">
                    <div
                      className="tab-pane fade show active"
                      id="new-car"
                      role="tabpanel"
                      aria-labelledby="new-car-tab"
                    >
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-01.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Mercedes-Benz-2023</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-02.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Hyundai Sonata-2022</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-03.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Lexus RX-2023</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-04.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Ferrari 458 Italia</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="view-all-btn">
                        <Link legacyBehavior href="/car-listing-left-sidebar">
                          <a className="primary-btn3 two">
                            <svg
                              width={35}
                              height={21}
                              viewBox="0 0 35 21"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                strokeLinecap="round"
                              />
                              <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                              />
                              <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                            </svg>
                            View All Car
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="used-car"
                      role="tabpanel"
                      aria-labelledby="used-car-tab"
                    >
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-01.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Mercedes-Benz-2023</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-02.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Hyundai Sonata-2022</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-03.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Lexus RX-2023</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-04.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Ferrari 458 Italia</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="view-all-btn">
                        <Link legacyBehavior href="/car-listing-left-sidebar">
                          <a className="primary-btn3 two">
                            <svg
                              width={35}
                              height={21}
                              viewBox="0 0 35 21"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                strokeLinecap="round"
                              />
                              <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                              />
                              <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                            </svg>
                            View All Car
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="auction-car"
                      role="tabpanel"
                      aria-labelledby="auction-car-tab"
                    >
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-01.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Mercedes-Benz-2023</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-02.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Hyundai Sonata-2022</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-03.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Lexus RX-2023</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-st-card1 two mb-30">
                        <div className="product-img">
                          <div className="product-price">
                            <span>$7,656.00</span>
                          </div>
                          <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a>
                          <div className="car-img">
                            <img
                              className="img-fluid"
                              src="/assets/img/inner-page/sb-img-04.png"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="product-content">
                          <h6>
                            <Link legacyBehavior href="/car-deatils">
                              <a>Ferrari 458 Italia</a>
                            </Link>
                          </h6>
                          <ul className="features">
                            <li>
                              <img
                                src="/assets/img/home4/icon/menual.svg"
                                alt=""
                              />
                              Automatic
                            </li>
                            <li>
                              <img
                                src="assets/img/home4/icon/fuel.svg"
                                alt=""
                              />
                              Petrol
                            </li>
                            <li>
                              <img
                                src="/assets/img/home4/icon/electric.svg"
                                alt=""
                              />
                              Electric
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="view-all-btn">
                        <Link legacyBehavior href="/car-listing-left-sidebar">
                          <a className="primary-btn3 two">
                            <svg
                              width={35}
                              height={21}
                              viewBox="0 0 35 21"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                strokeLinecap="round"
                              />
                              <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                              />
                              <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                            </svg>
                            View All Car
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="most-search-area style-2 pt-90 pb-90 mb-100">
        <div className="container">
          <div className="row mb-60 wow fadeInUp" data-wow-delay="200ms">
            <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
              <div className="section-title1">
                <span>Similar Car</span>
                <h2>Similar Car From This Brand</h2>
              </div>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-12 position-relative">
              <Swiper
                {...upcommingSlide}
                className="swiper upcoming-car-slider mb-50"
              >
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="product-card">
                      <div className="product-img">
                        <div className="number-of-img p-1">
                          <Image
                            src="assets/img/home1/icon/gallery-icon-1.svg"
                            fill
                            objectFit="contain"
                            alt="gallery icon"
                          />
                          10
                        </div>
                        <a href="#" className="fav">
                          <svg
                            width={14}
                            height={13}
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                          </svg>
                        </a>
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="swiper product-img-slider">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h5>
                          <Link legacyBehavior href="/car-deatils">
                            <a>Mercedes-Benz C-Class-2023</a>
                          </Link>
                        </h5>
                        <div className="price-location">
                          <div className="price">
                            <strong>$7,656.00</strong>
                          </div>
                          <div className="location">
                            <a href="#">
                              <i className="bi bi-geo-alt" /> Panama City
                            </a>
                          </div>
                        </div>
                        <ul className="features">
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14491"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14491)">
                                <path d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                <path d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                              </g>
                            </svg>
                            2500 miles
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14392"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14392)">
                                <path d="M6.42663 3.45316H10.8878C10.949 3.45316 11.0077 3.43176 11.051 3.39366C11.0943 3.35557 11.1186 3.3039 11.1186 3.25003V1.82813C11.1186 1.77426 11.0943 1.72259 11.051 1.6845C11.0077 1.6464 10.949 1.625 10.8878 1.625H7.19516C7.15154 1.62499 7.10882 1.63587 7.07193 1.65636C7.03505 1.67685 7.00551 1.70612 6.98676 1.74078L6.21823 3.16268C6.20147 3.19365 6.1939 3.22784 6.19621 3.26208C6.19852 3.29632 6.21064 3.32948 6.23145 3.35848C6.25226 3.38748 6.28107 3.41138 6.3152 3.42793C6.34933 3.44448 6.38766 3.45316 6.42663 3.45316ZM7.34102 2.03126H10.657V3.0469H6.79197L7.34102 2.03126Z" />
                                <path d="M1.49911 3.21956C1.56073 3.24028 1.64058 3.21936 1.67497 3.2027L1.87622 3.10601L2.16332 3.56955C1.79404 3.78793 1.49148 4.08293 1.28231 4.42852C1.07314 4.77412 0.963791 5.1597 0.963905 5.55127V11.5781C0.963905 12.3622 1.68859 13 2.57944 13H10.8879C11.7787 13 12.5034 12.3622 12.5034 11.5781V1.42187C12.5034 0.861847 11.9858 0.406229 11.3495 0.406229H7.42603C7.03602 0.404981 6.6534 0.499924 6.32156 0.680298C5.98972 0.860671 5.72194 1.11926 5.54855 1.42675L5.17444 2.08732L4.57947 2.3778L4.30759 1.93944L4.51115 1.84174C4.56484 1.81594 4.60469 1.77244 4.62196 1.72079C4.63923 1.66914 4.63249 1.61358 4.60324 1.5663L3.82986 0.316853C3.74165 0.175448 3.59347 0.0704953 3.41766 0.0249036C3.24185 -0.0206881 3.05269 -0.00321658 2.89147 0.0735044L0.862588 1.04649C0.53025 1.20635 0.405854 1.57645 0.586101 1.87261L1.36156 3.12186C1.37608 3.1453 1.39574 3.16598 1.41938 3.18272C1.44303 3.19945 1.4702 3.2119 1.49934 3.21936L1.49911 3.21956ZM3.11164 0.430605C3.16571 0.406431 3.22823 0.401358 3.2864 0.416425C3.34458 0.431492 3.39402 0.465558 3.42459 0.511653L4.08742 1.58255L3.58084 1.82529L3.24804 1.28984C3.21792 1.24381 3.16853 1.21 3.11043 1.19564C3.05234 1.18128 2.99016 1.18752 2.93723 1.21302C2.8843 1.23852 2.84482 1.28125 2.82725 1.33206C2.80968 1.38287 2.81541 1.43771 2.84323 1.48484L3.17557 2.01948L2.56697 2.31117L2.2351 1.77714C2.20498 1.73112 2.15559 1.69731 2.09749 1.68295C2.0394 1.66859 1.97723 1.67483 1.92429 1.70033C1.87136 1.72583 1.83188 1.76856 1.81431 1.81936C1.79674 1.87017 1.80248 1.92502 1.83029 1.97215L2.16171 2.50536L1.85845 2.6508L1.85729 2.65121L1.65604 2.74851L0.992292 1.67924C0.963266 1.63183 0.956605 1.57627 0.973751 1.52457C0.990897 1.47288 1.03047 1.4292 1.08392 1.40298L3.11164 0.430605ZM3.60391 3.33778L5.46085 2.41212C5.5017 2.39222 5.53448 2.36175 5.55548 2.32519L5.96144 1.60834C6.09866 1.36989 6.30803 1.16942 6.56646 1.02903C6.82489 0.888634 7.12234 0.81377 7.42603 0.812689H11.3495C11.7312 0.812689 12.0418 1.0861 12.0418 1.42208V11.5783C12.0418 12.1383 11.5242 12.5939 10.8879 12.5939H2.57944C1.94315 12.5939 1.42549 12.1383 1.42549 11.5783V5.55148C1.42528 5.19819 1.53251 4.8513 1.73603 4.5468C1.93955 4.2423 2.23196 3.99128 2.5829 3.81981C2.63616 3.7938 2.67559 3.75032 2.69258 3.69883C2.70957 3.64735 2.70275 3.59205 2.6736 3.54497L2.28149 2.91182L3.9021 2.13424L4.17743 2.57808L3.37359 2.98596C3.34732 2.99928 3.32429 3.01703 3.30582 3.03818C3.28735 3.05934 3.27379 3.08349 3.26593 3.10926C3.25806 3.13502 3.25604 3.1619 3.25998 3.18836C3.26392 3.21481 3.27374 3.24032 3.28889 3.26344C3.33158 3.32864 3.47629 3.38795 3.60415 3.33798L3.60391 3.33778Z" />
                                <path d="M9.50334 9.46291V6.58418L10.8205 5.42492C10.8419 5.40607 10.8589 5.38369 10.8705 5.35904C10.8822 5.3344 10.8881 5.30799 10.8881 5.28131C10.8881 5.25463 10.8822 5.22822 10.8705 5.20357C10.8589 5.17893 10.8419 5.15654 10.8205 5.1377L9.8973 4.32518C9.87589 4.3063 9.85046 4.29132 9.82246 4.2811C9.79446 4.27089 9.76445 4.26562 9.73414 4.26562C9.70382 4.26562 9.67381 4.27089 9.64581 4.2811C9.61781 4.29132 9.59238 4.3063 9.57097 4.32518L8.25385 5.48444H5.21388L3.89676 4.32518C3.87534 4.3063 3.84991 4.29132 3.82191 4.2811C3.79391 4.27089 3.7639 4.26562 3.73359 4.26562C3.70328 4.26562 3.67326 4.27089 3.64527 4.2811C3.61727 4.29132 3.59183 4.3063 3.57042 4.32518L2.64726 5.1377C2.62581 5.15654 2.60879 5.17893 2.59718 5.20357C2.58557 5.22822 2.57959 5.25463 2.57959 5.28131C2.57959 5.30799 2.58557 5.3344 2.59718 5.35904C2.60879 5.38369 2.62581 5.40607 2.64726 5.42492L3.96438 6.58418V9.46291L2.64726 10.6222C2.62581 10.641 2.60879 10.6634 2.59718 10.688C2.58557 10.7127 2.57959 10.7391 2.57959 10.7658C2.57959 10.7925 2.58557 10.8189 2.59718 10.8435C2.60879 10.8682 2.62581 10.8905 2.64726 10.9094L3.57042 11.7219C3.59183 11.7408 3.61727 11.7558 3.64527 11.766C3.67326 11.7762 3.70328 11.7815 3.73359 11.7815C3.7639 11.7815 3.79391 11.7762 3.82191 11.766C3.84991 11.7558 3.87534 11.7408 3.89676 11.7219L5.21388 10.5627H8.25385L9.57097 11.7219C9.59235 11.7408 9.61777 11.7559 9.64578 11.7661C9.67378 11.7764 9.70381 11.7816 9.73414 11.7816C9.76446 11.7816 9.79449 11.7764 9.82249 11.7661C9.8505 11.7559 9.87592 11.7408 9.8973 11.7219L10.8205 10.9094C10.8419 10.8905 10.8589 10.8682 10.8705 10.8435C10.8822 10.8189 10.8881 10.7925 10.8881 10.7658C10.8881 10.7391 10.8822 10.7127 10.8705 10.688C10.8589 10.6634 10.8419 10.641 10.8205 10.6222L9.50334 9.46291ZM9.73414 11.2911L8.51256 10.2159C8.46929 10.1778 8.4106 10.1564 8.34939 10.1564H5.11833C5.08802 10.1564 5.058 10.1616 5.03 10.1718C5.002 10.182 4.97656 10.197 4.95516 10.2159L3.73359 11.2911L3.13676 10.7658L4.35834 9.69062C4.40162 9.65254 4.42595 9.60088 4.42596 9.54701V6.50008C4.42599 6.4734 4.42003 6.44698 4.40843 6.42234C4.39682 6.39769 4.3798 6.37531 4.35834 6.35647L3.13676 5.28131L3.73359 4.75602L4.95516 5.83118C4.99843 5.86927 5.05712 5.89068 5.11833 5.89069H8.34939C8.41055 5.89069 8.4694 5.86937 8.51256 5.83118L9.73414 4.75602L10.331 5.28131L9.10939 6.35647C9.0661 6.39455 9.04178 6.44621 9.04176 6.50008V9.54701C9.04176 9.60084 9.066 9.65264 9.10939 9.69062L10.331 10.7658L9.73414 11.2911Z" />
                                <path d="M8.11844 6.5H5.34895C5.28774 6.5 5.22904 6.5214 5.18576 6.55949C5.14248 6.59759 5.11816 6.64926 5.11816 6.70313V9.3438C5.11816 9.39767 5.14248 9.44934 5.18576 9.48743C5.22904 9.52553 5.28774 9.54693 5.34895 9.54693H7.19528C7.25649 9.54693 7.31519 9.52553 7.35847 9.48743C7.40175 9.44934 7.42607 9.39767 7.42607 9.3438C7.42607 9.28993 7.40175 9.23826 7.35847 9.20017C7.31519 9.16207 7.25649 9.14067 7.19528 9.14067H5.57974V6.90626H7.88765V8.53129C7.88765 8.58516 7.91196 8.63683 7.95524 8.67492C7.99853 8.71301 8.05723 8.73441 8.11844 8.73441C8.17965 8.73441 8.23835 8.71301 8.28163 8.67492C8.32491 8.63683 8.34923 8.58516 8.34923 8.53129V6.70313C8.34923 6.64926 8.32491 6.59759 8.28163 6.55949C8.23835 6.5214 8.17965 6.5 8.11844 6.5ZM11.1187 6.5C11.0575 6.5 10.9988 6.5214 10.9555 6.55949C10.9122 6.59759 10.8879 6.64926 10.8879 6.70313V8.53129C10.8879 8.58516 10.9122 8.63683 10.9555 8.67492C10.9988 8.71301 11.0575 8.73441 11.1187 8.73441C11.1799 8.73441 11.2386 8.71301 11.2819 8.67492C11.3252 8.63683 11.3495 8.58516 11.3495 8.53129V6.70313C11.3495 6.64926 11.3252 6.59759 11.2819 6.55949C11.2386 6.5214 11.1799 6.5 11.1187 6.5Z" />
                                <path d="M11.1187 9.54713C11.2462 9.54713 11.3495 9.45618 11.3495 9.344C11.3495 9.23181 11.2462 9.14087 11.1187 9.14087C10.9913 9.14087 10.8879 9.23181 10.8879 9.344C10.8879 9.45618 10.9913 9.54713 11.1187 9.54713Z" />
                              </g>
                            </svg>
                            Petrol + Gas
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14323"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14323)">
                                <path d="M8.28713 6.95811H7.8187L8.04511 5.25406C8.05414 5.18229 8.0395 5.10942 8.00367 5.04772C7.96783 4.98603 7.91299 4.93928 7.84838 4.91536C7.71188 4.86288 7.56173 4.91605 7.49608 5.02788L5.69038 7.50535C5.65489 7.56344 5.63505 7.63066 5.63299 7.69979C5.63093 7.76892 5.64673 7.83733 5.67868 7.89767C5.74498 8.02486 5.87281 8.10369 6.01256 8.10369H6.481L6.25458 9.80774C6.24555 9.87951 6.26019 9.95238 6.29602 10.0141C6.33186 10.0758 6.3867 10.1225 6.45131 10.1464C6.48728 10.1604 6.52433 10.1668 6.56051 10.1668C6.66148 10.1668 6.7553 10.1162 6.80361 10.0339L8.60931 7.55645C8.6448 7.49836 8.66464 7.43113 8.6667 7.36201C8.66876 7.29288 8.65297 7.22446 8.62101 7.16412C8.58787 7.10133 8.53941 7.0491 8.48068 7.01286C8.42196 6.97663 8.35512 6.95772 8.28713 6.95811ZM6.75226 9.35537L6.94488 7.90684C6.94922 7.87436 6.94692 7.84127 6.93813 7.80981C6.92934 7.77836 6.91427 7.74926 6.89394 7.7245C6.8736 7.69973 6.84848 7.67987 6.82026 7.66626C6.79204 7.65264 6.76139 7.6456 6.73038 7.64559H6.13433L7.54743 5.70665L7.35481 7.15519C7.35047 7.18767 7.35277 7.22075 7.36156 7.25221C7.37035 7.28367 7.38542 7.31276 7.40575 7.33753C7.42609 7.36229 7.45121 7.38215 7.47943 7.39577C7.50765 7.40938 7.5383 7.41643 7.56931 7.41643H8.16536L6.75226 9.35537Z" />
                                <path d="M12.35 4.89575H11.9167C11.5583 4.89575 11.2667 5.2042 11.2667 5.58324V6.27072H10.8333V4.20827C10.8333 3.70274 10.4446 3.29162 9.96667 3.29162H8.88333V2.83329H10.1833C10.5417 2.83329 10.8333 2.52484 10.8333 2.14581V1.68749C10.8333 1.30845 10.5417 1 10.1833 1H5.85C5.49163 1 5.2 1.30845 5.2 1.68749V2.14581C5.2 2.52484 5.49163 2.83329 5.85 2.83329H7.15V3.29162H5.86863C5.66627 3.29162 5.46932 3.36701 5.31397 3.50405L4.37515 4.3311C4.29737 4.39972 4.19932 4.43735 4.09803 4.43743H3.03333C2.55537 4.43743 2.16667 4.84854 2.16667 5.35408V6.27072H1.73333V4.89575C1.73333 4.51672 1.4417 4.20827 1.08333 4.20827H0.65C0.291633 4.20827 0 4.51672 0 4.89575V9.47899C0 9.85802 0.291633 10.1665 0.65 10.1665H1.08333C1.4417 10.1665 1.73333 9.85802 1.73333 9.47899V8.10402H2.16667V9.47899C2.16667 9.98452 2.55537 10.3956 3.03333 10.3956H3.73945C3.89458 10.3956 4.03888 10.4841 4.11558 10.6266L4.60807 11.5378C4.68391 11.6781 4.79344 11.7947 4.92557 11.8759C5.0577 11.957 5.20775 11.9998 5.36055 12H9.22892C9.35599 12.0002 9.48154 11.9707 9.59662 11.9137C9.7117 11.8567 9.81349 11.7736 9.89473 11.6702L10.6325 10.7339C10.7622 10.569 10.8332 10.3614 10.8333 10.147V8.10425H11.2667V8.79173C11.2667 9.17077 11.5583 9.47922 11.9167 9.47922H12.35C12.7084 9.47922 13 9.17077 13 8.79173V5.58347C13 5.20443 12.7084 4.89575 12.35 4.89575ZM1.3 9.47899C1.3 9.53977 1.27717 9.59805 1.23654 9.64103C1.19591 9.68401 1.1408 9.70815 1.08333 9.70815H0.65C0.592536 9.70815 0.537426 9.68401 0.496794 9.64103C0.456161 9.59805 0.433333 9.53977 0.433333 9.47899V4.89575C0.433333 4.83497 0.456161 4.77669 0.496794 4.73371C0.537426 4.69073 0.592536 4.66659 0.65 4.66659H1.08333C1.1408 4.66659 1.19591 4.69073 1.23654 4.73371C1.27717 4.77669 1.3 4.83497 1.3 4.89575V9.47899ZM1.73333 7.64569V6.72905H2.16667V7.64569H1.73333ZM5.63333 2.14581V1.68749C5.63333 1.62671 5.65616 1.56842 5.69679 1.52544C5.73743 1.48247 5.79254 1.45832 5.85 1.45832H10.1833C10.2408 1.45832 10.2959 1.48247 10.3365 1.52544C10.3772 1.56842 10.4 1.62671 10.4 1.68749V2.14581C10.4 2.20659 10.3772 2.26488 10.3365 2.30785C10.2959 2.35083 10.2408 2.37497 10.1833 2.37497H5.85C5.79254 2.37497 5.73743 2.35083 5.69679 2.30785C5.65616 2.26488 5.63333 2.20659 5.63333 2.14581ZM7.58333 2.83329H8.45V3.29162H7.58333V2.83329ZM10.4 10.1468C10.4 10.2538 10.3643 10.3578 10.2995 10.4401L9.56193 11.3764C9.52126 11.4281 9.47034 11.4697 9.41279 11.4982C9.35524 11.5267 9.29247 11.5415 9.22892 11.5414H5.36055C5.28417 11.5414 5.20916 11.52 5.14311 11.4794C5.07706 11.4389 5.02232 11.3806 4.98442 11.3105L4.49193 10.3993C4.41609 10.259 4.30656 10.1424 4.17443 10.0612C4.0423 9.98006 3.89225 9.93724 3.73945 9.93708H3.03333C2.79435 9.93708 2.6 9.73153 2.6 9.47876V5.35385C2.6 5.10108 2.79435 4.89552 3.03333 4.89552H4.09803C4.3004 4.89552 4.49735 4.82013 4.6527 4.68309L5.59152 3.85604C5.66929 3.78742 5.76735 3.7498 5.86863 3.74971H9.96667C10.2057 3.74971 10.4 3.95527 10.4 4.20804V10.1465V10.1468ZM10.8333 7.64569V6.72905H11.2667V7.64569H10.8333ZM12.5667 8.7915C12.5667 8.85228 12.5438 8.91057 12.5032 8.95355C12.4626 8.99652 12.4075 9.02067 12.35 9.02067H11.9167C11.8592 9.02067 11.8041 8.99652 11.7635 8.95355C11.7228 8.91057 11.7 8.85228 11.7 8.7915V5.58324C11.7 5.52246 11.7228 5.46417 11.7635 5.4212C11.8041 5.37822 11.8592 5.35408 11.9167 5.35408H12.35C12.4075 5.35408 12.4626 5.37822 12.5032 5.4212C12.5438 5.46417 12.5667 5.52246 12.5667 5.58324V8.7915Z" />
                              </g>
                            </svg>
                            Electric
                          </li>
                        </ul>
                        <div className="content-btm">
                          <Link legacyBehavior href="/car-deatils">
                            <a className="view-btn2">
                              <svg
                                width={35}
                                height={21}
                                viewBox="0 0 35 21"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                  strokeLinecap="round"
                                />
                                <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                                />
                                <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                              </svg>
                              View Details
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="product-card">
                      <div className="product-img">
                        <div className="number-of-img ">
                          <Image
                            src="/assets/img/home1/icon/gallery-icon-1.svg"
                            fill
                            objectFit="contain"
                            alt="gallery icon"
                          />
                          10
                        </div>
                        <a href="#" className="fav">
                          <svg
                            width={14}
                            height={13}
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                          </svg>
                        </a>
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="swiper product-img-slider">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h5>
                          <Link legacyBehavior href="/car-deatils">
                            <a>Chevrolet Silverado-2023</a>
                          </Link>
                        </h5>
                        <div className="price-location">
                          <div className="price">
                            <strong>$7,656.00</strong>
                          </div>
                          <div className="location">
                            <a href="#">
                              <i className="bi bi-geo-alt" /> Panama City
                            </a>
                          </div>
                        </div>
                        <ul className="features">
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14494"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14494)">
                                <path d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                <path d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                              </g>
                            </svg>
                            2500 miles
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14395"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14395)">
                                <path d="M6.42663 3.45316H10.8878C10.949 3.45316 11.0077 3.43176 11.051 3.39366C11.0943 3.35557 11.1186 3.3039 11.1186 3.25003V1.82813C11.1186 1.77426 11.0943 1.72259 11.051 1.6845C11.0077 1.6464 10.949 1.625 10.8878 1.625H7.19516C7.15154 1.62499 7.10882 1.63587 7.07193 1.65636C7.03505 1.67685 7.00551 1.70612 6.98676 1.74078L6.21823 3.16268C6.20147 3.19365 6.1939 3.22784 6.19621 3.26208C6.19852 3.29632 6.21064 3.32948 6.23145 3.35848C6.25226 3.38748 6.28107 3.41138 6.3152 3.42793C6.34933 3.44448 6.38766 3.45316 6.42663 3.45316ZM7.34102 2.03126H10.657V3.0469H6.79197L7.34102 2.03126Z" />
                                <path d="M1.49911 3.21956C1.56073 3.24028 1.64058 3.21936 1.67497 3.2027L1.87622 3.10601L2.16332 3.56955C1.79404 3.78793 1.49148 4.08293 1.28231 4.42852C1.07314 4.77412 0.963791 5.1597 0.963905 5.55127V11.5781C0.963905 12.3622 1.68859 13 2.57944 13H10.8879C11.7787 13 12.5034 12.3622 12.5034 11.5781V1.42187C12.5034 0.861847 11.9858 0.406229 11.3495 0.406229H7.42603C7.03602 0.404981 6.6534 0.499924 6.32156 0.680298C5.98972 0.860671 5.72194 1.11926 5.54855 1.42675L5.17444 2.08732L4.57947 2.3778L4.30759 1.93944L4.51115 1.84174C4.56484 1.81594 4.60469 1.77244 4.62196 1.72079C4.63923 1.66914 4.63249 1.61358 4.60324 1.5663L3.82986 0.316853C3.74165 0.175448 3.59347 0.0704953 3.41766 0.0249036C3.24185 -0.0206881 3.05269 -0.00321658 2.89147 0.0735044L0.862588 1.04649C0.53025 1.20635 0.405854 1.57645 0.586101 1.87261L1.36156 3.12186C1.37608 3.1453 1.39574 3.16598 1.41938 3.18272C1.44303 3.19945 1.4702 3.2119 1.49934 3.21936L1.49911 3.21956ZM3.11164 0.430605C3.16571 0.406431 3.22823 0.401358 3.2864 0.416425C3.34458 0.431492 3.39402 0.465558 3.42459 0.511653L4.08742 1.58255L3.58084 1.82529L3.24804 1.28984C3.21792 1.24381 3.16853 1.21 3.11043 1.19564C3.05234 1.18128 2.99016 1.18752 2.93723 1.21302C2.8843 1.23852 2.84482 1.28125 2.82725 1.33206C2.80968 1.38287 2.81541 1.43771 2.84323 1.48484L3.17557 2.01948L2.56697 2.31117L2.2351 1.77714C2.20498 1.73112 2.15559 1.69731 2.09749 1.68295C2.0394 1.66859 1.97723 1.67483 1.92429 1.70033C1.87136 1.72583 1.83188 1.76856 1.81431 1.81936C1.79674 1.87017 1.80248 1.92502 1.83029 1.97215L2.16171 2.50536L1.85845 2.6508L1.85729 2.65121L1.65604 2.74851L0.992292 1.67924C0.963266 1.63183 0.956605 1.57627 0.973751 1.52457C0.990897 1.47288 1.03047 1.4292 1.08392 1.40298L3.11164 0.430605ZM3.60391 3.33778L5.46085 2.41212C5.5017 2.39222 5.53448 2.36175 5.55548 2.32519L5.96144 1.60834C6.09866 1.36989 6.30803 1.16942 6.56646 1.02903C6.82489 0.888634 7.12234 0.81377 7.42603 0.812689H11.3495C11.7312 0.812689 12.0418 1.0861 12.0418 1.42208V11.5783C12.0418 12.1383 11.5242 12.5939 10.8879 12.5939H2.57944C1.94315 12.5939 1.42549 12.1383 1.42549 11.5783V5.55148C1.42528 5.19819 1.53251 4.8513 1.73603 4.5468C1.93955 4.2423 2.23196 3.99128 2.5829 3.81981C2.63616 3.7938 2.67559 3.75032 2.69258 3.69883C2.70957 3.64735 2.70275 3.59205 2.6736 3.54497L2.28149 2.91182L3.9021 2.13424L4.17743 2.57808L3.37359 2.98596C3.34732 2.99928 3.32429 3.01703 3.30582 3.03818C3.28735 3.05934 3.27379 3.08349 3.26593 3.10926C3.25806 3.13502 3.25604 3.1619 3.25998 3.18836C3.26392 3.21481 3.27374 3.24032 3.28889 3.26344C3.33158 3.32864 3.47629 3.38795 3.60415 3.33798L3.60391 3.33778Z" />
                                <path d="M9.50334 9.46291V6.58418L10.8205 5.42492C10.8419 5.40607 10.8589 5.38369 10.8705 5.35904C10.8822 5.3344 10.8881 5.30799 10.8881 5.28131C10.8881 5.25463 10.8822 5.22822 10.8705 5.20357C10.8589 5.17893 10.8419 5.15654 10.8205 5.1377L9.8973 4.32518C9.87589 4.3063 9.85046 4.29132 9.82246 4.2811C9.79446 4.27089 9.76445 4.26562 9.73414 4.26562C9.70382 4.26562 9.67381 4.27089 9.64581 4.2811C9.61781 4.29132 9.59238 4.3063 9.57097 4.32518L8.25385 5.48444H5.21388L3.89676 4.32518C3.87534 4.3063 3.84991 4.29132 3.82191 4.2811C3.79391 4.27089 3.7639 4.26562 3.73359 4.26562C3.70328 4.26562 3.67326 4.27089 3.64527 4.2811C3.61727 4.29132 3.59183 4.3063 3.57042 4.32518L2.64726 5.1377C2.62581 5.15654 2.60879 5.17893 2.59718 5.20357C2.58557 5.22822 2.57959 5.25463 2.57959 5.28131C2.57959 5.30799 2.58557 5.3344 2.59718 5.35904C2.60879 5.38369 2.62581 5.40607 2.64726 5.42492L3.96438 6.58418V9.46291L2.64726 10.6222C2.62581 10.641 2.60879 10.6634 2.59718 10.688C2.58557 10.7127 2.57959 10.7391 2.57959 10.7658C2.57959 10.7925 2.58557 10.8189 2.59718 10.8435C2.60879 10.8682 2.62581 10.8905 2.64726 10.9094L3.57042 11.7219C3.59183 11.7408 3.61727 11.7558 3.64527 11.766C3.67326 11.7762 3.70328 11.7815 3.73359 11.7815C3.7639 11.7815 3.79391 11.7762 3.82191 11.766C3.84991 11.7558 3.87534 11.7408 3.89676 11.7219L5.21388 10.5627H8.25385L9.57097 11.7219C9.59235 11.7408 9.61777 11.7559 9.64578 11.7661C9.67378 11.7764 9.70381 11.7816 9.73414 11.7816C9.76446 11.7816 9.79449 11.7764 9.82249 11.7661C9.8505 11.7559 9.87592 11.7408 9.8973 11.7219L10.8205 10.9094C10.8419 10.8905 10.8589 10.8682 10.8705 10.8435C10.8822 10.8189 10.8881 10.7925 10.8881 10.7658C10.8881 10.7391 10.8822 10.7127 10.8705 10.688C10.8589 10.6634 10.8419 10.641 10.8205 10.6222L9.50334 9.46291ZM9.73414 11.2911L8.51256 10.2159C8.46929 10.1778 8.4106 10.1564 8.34939 10.1564H5.11833C5.08802 10.1564 5.058 10.1616 5.03 10.1718C5.002 10.182 4.97656 10.197 4.95516 10.2159L3.73359 11.2911L3.13676 10.7658L4.35834 9.69062C4.40162 9.65254 4.42595 9.60088 4.42596 9.54701V6.50008C4.42599 6.4734 4.42003 6.44698 4.40843 6.42234C4.39682 6.39769 4.3798 6.37531 4.35834 6.35647L3.13676 5.28131L3.73359 4.75602L4.95516 5.83118C4.99843 5.86927 5.05712 5.89068 5.11833 5.89069H8.34939C8.41055 5.89069 8.4694 5.86937 8.51256 5.83118L9.73414 4.75602L10.331 5.28131L9.10939 6.35647C9.0661 6.39455 9.04178 6.44621 9.04176 6.50008V9.54701C9.04176 9.60084 9.066 9.65264 9.10939 9.69062L10.331 10.7658L9.73414 11.2911Z" />
                                <path d="M8.11844 6.5H5.34895C5.28774 6.5 5.22904 6.5214 5.18576 6.55949C5.14248 6.59759 5.11816 6.64926 5.11816 6.70313V9.3438C5.11816 9.39767 5.14248 9.44934 5.18576 9.48743C5.22904 9.52553 5.28774 9.54693 5.34895 9.54693H7.19528C7.25649 9.54693 7.31519 9.52553 7.35847 9.48743C7.40175 9.44934 7.42607 9.39767 7.42607 9.3438C7.42607 9.28993 7.40175 9.23826 7.35847 9.20017C7.31519 9.16207 7.25649 9.14067 7.19528 9.14067H5.57974V6.90626H7.88765V8.53129C7.88765 8.58516 7.91196 8.63683 7.95524 8.67492C7.99853 8.71301 8.05723 8.73441 8.11844 8.73441C8.17965 8.73441 8.23835 8.71301 8.28163 8.67492C8.32491 8.63683 8.34923 8.58516 8.34923 8.53129V6.70313C8.34923 6.64926 8.32491 6.59759 8.28163 6.55949C8.23835 6.5214 8.17965 6.5 8.11844 6.5ZM11.1187 6.5C11.0575 6.5 10.9988 6.5214 10.9555 6.55949C10.9122 6.59759 10.8879 6.64926 10.8879 6.70313V8.53129C10.8879 8.58516 10.9122 8.63683 10.9555 8.67492C10.9988 8.71301 11.0575 8.73441 11.1187 8.73441C11.1799 8.73441 11.2386 8.71301 11.2819 8.67492C11.3252 8.63683 11.3495 8.58516 11.3495 8.53129V6.70313C11.3495 6.64926 11.3252 6.59759 11.2819 6.55949C11.2386 6.5214 11.1799 6.5 11.1187 6.5Z" />
                                <path d="M11.1187 9.54713C11.2462 9.54713 11.3495 9.45618 11.3495 9.344C11.3495 9.23181 11.2462 9.14087 11.1187 9.14087C10.9913 9.14087 10.8879 9.23181 10.8879 9.344C10.8879 9.45618 10.9913 9.54713 11.1187 9.54713Z" />
                              </g>
                            </svg>
                            Petrol + Gas
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14326"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14326)">
                                <path d="M8.28713 6.95811H7.8187L8.04511 5.25406C8.05414 5.18229 8.0395 5.10942 8.00367 5.04772C7.96783 4.98603 7.91299 4.93928 7.84838 4.91536C7.71188 4.86288 7.56173 4.91605 7.49608 5.02788L5.69038 7.50535C5.65489 7.56344 5.63505 7.63066 5.63299 7.69979C5.63093 7.76892 5.64673 7.83733 5.67868 7.89767C5.74498 8.02486 5.87281 8.10369 6.01256 8.10369H6.481L6.25458 9.80774C6.24555 9.87951 6.26019 9.95238 6.29602 10.0141C6.33186 10.0758 6.3867 10.1225 6.45131 10.1464C6.48728 10.1604 6.52433 10.1668 6.56051 10.1668C6.66148 10.1668 6.7553 10.1162 6.80361 10.0339L8.60931 7.55645C8.6448 7.49836 8.66464 7.43113 8.6667 7.36201C8.66876 7.29288 8.65297 7.22446 8.62101 7.16412C8.58787 7.10133 8.53941 7.0491 8.48068 7.01286C8.42196 6.97663 8.35512 6.95772 8.28713 6.95811ZM6.75226 9.35537L6.94488 7.90684C6.94922 7.87436 6.94692 7.84127 6.93813 7.80981C6.92934 7.77836 6.91427 7.74926 6.89394 7.7245C6.8736 7.69973 6.84848 7.67987 6.82026 7.66626C6.79204 7.65264 6.76139 7.6456 6.73038 7.64559H6.13433L7.54743 5.70665L7.35481 7.15519C7.35047 7.18767 7.35277 7.22075 7.36156 7.25221C7.37035 7.28367 7.38542 7.31276 7.40575 7.33753C7.42609 7.36229 7.45121 7.38215 7.47943 7.39577C7.50765 7.40938 7.5383 7.41643 7.56931 7.41643H8.16536L6.75226 9.35537Z" />
                                <path d="M12.35 4.89575H11.9167C11.5583 4.89575 11.2667 5.2042 11.2667 5.58324V6.27072H10.8333V4.20827C10.8333 3.70274 10.4446 3.29162 9.96667 3.29162H8.88333V2.83329H10.1833C10.5417 2.83329 10.8333 2.52484 10.8333 2.14581V1.68749C10.8333 1.30845 10.5417 1 10.1833 1H5.85C5.49163 1 5.2 1.30845 5.2 1.68749V2.14581C5.2 2.52484 5.49163 2.83329 5.85 2.83329H7.15V3.29162H5.86863C5.66627 3.29162 5.46932 3.36701 5.31397 3.50405L4.37515 4.3311C4.29737 4.39972 4.19932 4.43735 4.09803 4.43743H3.03333C2.55537 4.43743 2.16667 4.84854 2.16667 5.35408V6.27072H1.73333V4.89575C1.73333 4.51672 1.4417 4.20827 1.08333 4.20827H0.65C0.291633 4.20827 0 4.51672 0 4.89575V9.47899C0 9.85802 0.291633 10.1665 0.65 10.1665H1.08333C1.4417 10.1665 1.73333 9.85802 1.73333 9.47899V8.10402H2.16667V9.47899C2.16667 9.98452 2.55537 10.3956 3.03333 10.3956H3.73945C3.89458 10.3956 4.03888 10.4841 4.11558 10.6266L4.60807 11.5378C4.68391 11.6781 4.79344 11.7947 4.92557 11.8759C5.0577 11.957 5.20775 11.9998 5.36055 12H9.22892C9.35599 12.0002 9.48154 11.9707 9.59662 11.9137C9.7117 11.8567 9.81349 11.7736 9.89473 11.6702L10.6325 10.7339C10.7622 10.569 10.8332 10.3614 10.8333 10.147V8.10425H11.2667V8.79173C11.2667 9.17077 11.5583 9.47922 11.9167 9.47922H12.35C12.7084 9.47922 13 9.17077 13 8.79173V5.58347C13 5.20443 12.7084 4.89575 12.35 4.89575ZM1.3 9.47899C1.3 9.53977 1.27717 9.59805 1.23654 9.64103C1.19591 9.68401 1.1408 9.70815 1.08333 9.70815H0.65C0.592536 9.70815 0.537426 9.68401 0.496794 9.64103C0.456161 9.59805 0.433333 9.53977 0.433333 9.47899V4.89575C0.433333 4.83497 0.456161 4.77669 0.496794 4.73371C0.537426 4.69073 0.592536 4.66659 0.65 4.66659H1.08333C1.1408 4.66659 1.19591 4.69073 1.23654 4.73371C1.27717 4.77669 1.3 4.83497 1.3 4.89575V9.47899ZM1.73333 7.64569V6.72905H2.16667V7.64569H1.73333ZM5.63333 2.14581V1.68749C5.63333 1.62671 5.65616 1.56842 5.69679 1.52544C5.73743 1.48247 5.79254 1.45832 5.85 1.45832H10.1833C10.2408 1.45832 10.2959 1.48247 10.3365 1.52544C10.3772 1.56842 10.4 1.62671 10.4 1.68749V2.14581C10.4 2.20659 10.3772 2.26488 10.3365 2.30785C10.2959 2.35083 10.2408 2.37497 10.1833 2.37497H5.85C5.79254 2.37497 5.73743 2.35083 5.69679 2.30785C5.65616 2.26488 5.63333 2.20659 5.63333 2.14581ZM7.58333 2.83329H8.45V3.29162H7.58333V2.83329ZM10.4 10.1468C10.4 10.2538 10.3643 10.3578 10.2995 10.4401L9.56193 11.3764C9.52126 11.4281 9.47034 11.4697 9.41279 11.4982C9.35524 11.5267 9.29247 11.5415 9.22892 11.5414H5.36055C5.28417 11.5414 5.20916 11.52 5.14311 11.4794C5.07706 11.4389 5.02232 11.3806 4.98442 11.3105L4.49193 10.3993C4.41609 10.259 4.30656 10.1424 4.17443 10.0612C4.0423 9.98006 3.89225 9.93724 3.73945 9.93708H3.03333C2.79435 9.93708 2.6 9.73153 2.6 9.47876V5.35385C2.6 5.10108 2.79435 4.89552 3.03333 4.89552H4.09803C4.3004 4.89552 4.49735 4.82013 4.6527 4.68309L5.59152 3.85604C5.66929 3.78742 5.76735 3.7498 5.86863 3.74971H9.96667C10.2057 3.74971 10.4 3.95527 10.4 4.20804V10.1465V10.1468ZM10.8333 7.64569V6.72905H11.2667V7.64569H10.8333ZM12.5667 8.7915C12.5667 8.85228 12.5438 8.91057 12.5032 8.95355C12.4626 8.99652 12.4075 9.02067 12.35 9.02067H11.9167C11.8592 9.02067 11.8041 8.99652 11.7635 8.95355C11.7228 8.91057 11.7 8.85228 11.7 8.7915V5.58324C11.7 5.52246 11.7228 5.46417 11.7635 5.4212C11.8041 5.37822 11.8592 5.35408 11.9167 5.35408H12.35C12.4075 5.35408 12.4626 5.37822 12.5032 5.4212C12.5438 5.46417 12.5667 5.52246 12.5667 5.58324V8.7915Z" />
                              </g>
                            </svg>
                            Electric
                          </li>
                        </ul>
                        <div className="content-btm">
                          <Link legacyBehavior href="/car-deatils">
                            <a className="view-btn2">
                              <svg
                                width={35}
                                height={21}
                                viewBox="0 0 35 21"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                  strokeLinecap="round"
                                />
                                <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                                />
                                <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                              </svg>
                              View Details
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="product-card">
                      <div className="product-img">
                        <div className="number-of-img">
                          <Image
                            src="/assets/img/home1/icon/gallery-icon-1.svg"
                            fill
                            objectFit="contain"
                            alt="gallery icon"
                          />
                          10
                        </div>
                        <a href="#" className="fav">
                          <svg
                            width={14}
                            height={13}
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                          </svg>
                        </a>
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="swiper product-img-slider">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-13.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-13.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-13.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-13.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h5>
                          <Link legacyBehavior href="/car-deatils">
                            <a>Hyundai Sonata-2022</a>
                          </Link>
                        </h5>
                        <div className="price-location">
                          <div className="price">
                            <strong>$17,656.00</strong>
                          </div>
                          <div className="location">
                            <a href="#">
                              <i className="bi bi-geo-alt" /> Sydne City
                            </a>
                          </div>
                        </div>
                        <ul className="features">
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_14497"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_14497)">
                                <path d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                <path d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                              </g>
                            </svg>
                            2500 miles
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_1855855"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_1855855)">
                                <path d="M6.42663 3.45316H10.8878C10.949 3.45316 11.0077 3.43176 11.051 3.39366C11.0943 3.35557 11.1186 3.3039 11.1186 3.25003V1.82813C11.1186 1.77426 11.0943 1.72259 11.051 1.6845C11.0077 1.6464 10.949 1.625 10.8878 1.625H7.19516C7.15154 1.62499 7.10882 1.63587 7.07193 1.65636C7.03505 1.67685 7.00551 1.70612 6.98676 1.74078L6.21823 3.16268C6.20147 3.19365 6.1939 3.22784 6.19621 3.26208C6.19852 3.29632 6.21064 3.32948 6.23145 3.35848C6.25226 3.38748 6.28107 3.41138 6.3152 3.42793C6.34933 3.44448 6.38766 3.45316 6.42663 3.45316ZM7.34102 2.03126H10.657V3.0469H6.79197L7.34102 2.03126Z" />
                                <path d="M1.49911 3.21956C1.56073 3.24028 1.64058 3.21936 1.67497 3.2027L1.87622 3.10601L2.16332 3.56955C1.79404 3.78793 1.49148 4.08293 1.28231 4.42852C1.07314 4.77412 0.963791 5.1597 0.963905 5.55127V11.5781C0.963905 12.3622 1.68859 13 2.57944 13H10.8879C11.7787 13 12.5034 12.3622 12.5034 11.5781V1.42187C12.5034 0.861847 11.9858 0.406229 11.3495 0.406229H7.42603C7.03602 0.404981 6.6534 0.499924 6.32156 0.680298C5.98972 0.860671 5.72194 1.11926 5.54855 1.42675L5.17444 2.08732L4.57947 2.3778L4.30759 1.93944L4.51115 1.84174C4.56484 1.81594 4.60469 1.77244 4.62196 1.72079C4.63923 1.66914 4.63249 1.61358 4.60324 1.5663L3.82986 0.316853C3.74165 0.175448 3.59347 0.0704953 3.41766 0.0249036C3.24185 -0.0206881 3.05269 -0.00321658 2.89147 0.0735044L0.862588 1.04649C0.53025 1.20635 0.405854 1.57645 0.586101 1.87261L1.36156 3.12186C1.37608 3.1453 1.39574 3.16598 1.41938 3.18272C1.44303 3.19945 1.4702 3.2119 1.49934 3.21936L1.49911 3.21956ZM3.11164 0.430605C3.16571 0.406431 3.22823 0.401358 3.2864 0.416425C3.34458 0.431492 3.39402 0.465558 3.42459 0.511653L4.08742 1.58255L3.58084 1.82529L3.24804 1.28984C3.21792 1.24381 3.16853 1.21 3.11043 1.19564C3.05234 1.18128 2.99016 1.18752 2.93723 1.21302C2.8843 1.23852 2.84482 1.28125 2.82725 1.33206C2.80968 1.38287 2.81541 1.43771 2.84323 1.48484L3.17557 2.01948L2.56697 2.31117L2.2351 1.77714C2.20498 1.73112 2.15559 1.69731 2.09749 1.68295C2.0394 1.66859 1.97723 1.67483 1.92429 1.70033C1.87136 1.72583 1.83188 1.76856 1.81431 1.81936C1.79674 1.87017 1.80248 1.92502 1.83029 1.97215L2.16171 2.50536L1.85845 2.6508L1.85729 2.65121L1.65604 2.74851L0.992292 1.67924C0.963266 1.63183 0.956605 1.57627 0.973751 1.52457C0.990897 1.47288 1.03047 1.4292 1.08392 1.40298L3.11164 0.430605ZM3.60391 3.33778L5.46085 2.41212C5.5017 2.39222 5.53448 2.36175 5.55548 2.32519L5.96144 1.60834C6.09866 1.36989 6.30803 1.16942 6.56646 1.02903C6.82489 0.888634 7.12234 0.81377 7.42603 0.812689H11.3495C11.7312 0.812689 12.0418 1.0861 12.0418 1.42208V11.5783C12.0418 12.1383 11.5242 12.5939 10.8879 12.5939H2.57944C1.94315 12.5939 1.42549 12.1383 1.42549 11.5783V5.55148C1.42528 5.19819 1.53251 4.8513 1.73603 4.5468C1.93955 4.2423 2.23196 3.99128 2.5829 3.81981C2.63616 3.7938 2.67559 3.75032 2.69258 3.69883C2.70957 3.64735 2.70275 3.59205 2.6736 3.54497L2.28149 2.91182L3.9021 2.13424L4.17743 2.57808L3.37359 2.98596C3.34732 2.99928 3.32429 3.01703 3.30582 3.03818C3.28735 3.05934 3.27379 3.08349 3.26593 3.10926C3.25806 3.13502 3.25604 3.1619 3.25998 3.18836C3.26392 3.21481 3.27374 3.24032 3.28889 3.26344C3.33158 3.32864 3.47629 3.38795 3.60415 3.33798L3.60391 3.33778Z" />
                                <path d="M9.50334 9.46291V6.58418L10.8205 5.42492C10.8419 5.40607 10.8589 5.38369 10.8705 5.35904C10.8822 5.3344 10.8881 5.30799 10.8881 5.28131C10.8881 5.25463 10.8822 5.22822 10.8705 5.20357C10.8589 5.17893 10.8419 5.15654 10.8205 5.1377L9.8973 4.32518C9.87589 4.3063 9.85046 4.29132 9.82246 4.2811C9.79446 4.27089 9.76445 4.26562 9.73414 4.26562C9.70382 4.26562 9.67381 4.27089 9.64581 4.2811C9.61781 4.29132 9.59238 4.3063 9.57097 4.32518L8.25385 5.48444H5.21388L3.89676 4.32518C3.87534 4.3063 3.84991 4.29132 3.82191 4.2811C3.79391 4.27089 3.7639 4.26562 3.73359 4.26562C3.70328 4.26562 3.67326 4.27089 3.64527 4.2811C3.61727 4.29132 3.59183 4.3063 3.57042 4.32518L2.64726 5.1377C2.62581 5.15654 2.60879 5.17893 2.59718 5.20357C2.58557 5.22822 2.57959 5.25463 2.57959 5.28131C2.57959 5.30799 2.58557 5.3344 2.59718 5.35904C2.60879 5.38369 2.62581 5.40607 2.64726 5.42492L3.96438 6.58418V9.46291L2.64726 10.6222C2.62581 10.641 2.60879 10.6634 2.59718 10.688C2.58557 10.7127 2.57959 10.7391 2.57959 10.7658C2.57959 10.7925 2.58557 10.8189 2.59718 10.8435C2.60879 10.8682 2.62581 10.8905 2.64726 10.9094L3.57042 11.7219C3.59183 11.7408 3.61727 11.7558 3.64527 11.766C3.67326 11.7762 3.70328 11.7815 3.73359 11.7815C3.7639 11.7815 3.79391 11.7762 3.82191 11.766C3.84991 11.7558 3.87534 11.7408 3.89676 11.7219L5.21388 10.5627H8.25385L9.57097 11.7219C9.59235 11.7408 9.61777 11.7559 9.64578 11.7661C9.67378 11.7764 9.70381 11.7816 9.73414 11.7816C9.76446 11.7816 9.79449 11.7764 9.82249 11.7661C9.8505 11.7559 9.87592 11.7408 9.8973 11.7219L10.8205 10.9094C10.8419 10.8905 10.8589 10.8682 10.8705 10.8435C10.8822 10.8189 10.8881 10.7925 10.8881 10.7658C10.8881 10.7391 10.8822 10.7127 10.8705 10.688C10.8589 10.6634 10.8419 10.641 10.8205 10.6222L9.50334 9.46291ZM9.73414 11.2911L8.51256 10.2159C8.46929 10.1778 8.4106 10.1564 8.34939 10.1564H5.11833C5.08802 10.1564 5.058 10.1616 5.03 10.1718C5.002 10.182 4.97656 10.197 4.95516 10.2159L3.73359 11.2911L3.13676 10.7658L4.35834 9.69062C4.40162 9.65254 4.42595 9.60088 4.42596 9.54701V6.50008C4.42599 6.4734 4.42003 6.44698 4.40843 6.42234C4.39682 6.39769 4.3798 6.37531 4.35834 6.35647L3.13676 5.28131L3.73359 4.75602L4.95516 5.83118C4.99843 5.86927 5.05712 5.89068 5.11833 5.89069H8.34939C8.41055 5.89069 8.4694 5.86937 8.51256 5.83118L9.73414 4.75602L10.331 5.28131L9.10939 6.35647C9.0661 6.39455 9.04178 6.44621 9.04176 6.50008V9.54701C9.04176 9.60084 9.066 9.65264 9.10939 9.69062L10.331 10.7658L9.73414 11.2911Z" />
                                <path d="M8.11844 6.5H5.34895C5.28774 6.5 5.22904 6.5214 5.18576 6.55949C5.14248 6.59759 5.11816 6.64926 5.11816 6.70313V9.3438C5.11816 9.39767 5.14248 9.44934 5.18576 9.48743C5.22904 9.52553 5.28774 9.54693 5.34895 9.54693H7.19528C7.25649 9.54693 7.31519 9.52553 7.35847 9.48743C7.40175 9.44934 7.42607 9.39767 7.42607 9.3438C7.42607 9.28993 7.40175 9.23826 7.35847 9.20017C7.31519 9.16207 7.25649 9.14067 7.19528 9.14067H5.57974V6.90626H7.88765V8.53129C7.88765 8.58516 7.91196 8.63683 7.95524 8.67492C7.99853 8.71301 8.05723 8.73441 8.11844 8.73441C8.17965 8.73441 8.23835 8.71301 8.28163 8.67492C8.32491 8.63683 8.34923 8.58516 8.34923 8.53129V6.70313C8.34923 6.64926 8.32491 6.59759 8.28163 6.55949C8.23835 6.5214 8.17965 6.5 8.11844 6.5ZM11.1187 6.5C11.0575 6.5 10.9988 6.5214 10.9555 6.55949C10.9122 6.59759 10.8879 6.64926 10.8879 6.70313V8.53129C10.8879 8.58516 10.9122 8.63683 10.9555 8.67492C10.9988 8.71301 11.0575 8.73441 11.1187 8.73441C11.1799 8.73441 11.2386 8.71301 11.2819 8.67492C11.3252 8.63683 11.3495 8.58516 11.3495 8.53129V6.70313C11.3495 6.64926 11.3252 6.59759 11.2819 6.55949C11.2386 6.5214 11.1799 6.5 11.1187 6.5Z" />
                                <path d="M11.1187 9.54713C11.2462 9.54713 11.3495 9.45618 11.3495 9.344C11.3495 9.23181 11.2462 9.14087 11.1187 9.14087C10.9913 9.14087 10.8879 9.23181 10.8879 9.344C10.8879 9.45618 10.9913 9.54713 11.1187 9.54713Z" />
                              </g>
                            </svg>
                            Petrol + Gas
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_1432777"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_1432777)">
                                <path d="M8.28713 6.95811H7.8187L8.04511 5.25406C8.05414 5.18229 8.0395 5.10942 8.00367 5.04772C7.96783 4.98603 7.91299 4.93928 7.84838 4.91536C7.71188 4.86288 7.56173 4.91605 7.49608 5.02788L5.69038 7.50535C5.65489 7.56344 5.63505 7.63066 5.63299 7.69979C5.63093 7.76892 5.64673 7.83733 5.67868 7.89767C5.74498 8.02486 5.87281 8.10369 6.01256 8.10369H6.481L6.25458 9.80774C6.24555 9.87951 6.26019 9.95238 6.29602 10.0141C6.33186 10.0758 6.3867 10.1225 6.45131 10.1464C6.48728 10.1604 6.52433 10.1668 6.56051 10.1668C6.66148 10.1668 6.7553 10.1162 6.80361 10.0339L8.60931 7.55645C8.6448 7.49836 8.66464 7.43113 8.6667 7.36201C8.66876 7.29288 8.65297 7.22446 8.62101 7.16412C8.58787 7.10133 8.53941 7.0491 8.48068 7.01286C8.42196 6.97663 8.35512 6.95772 8.28713 6.95811ZM6.75226 9.35537L6.94488 7.90684C6.94922 7.87436 6.94692 7.84127 6.93813 7.80981C6.92934 7.77836 6.91427 7.74926 6.89394 7.7245C6.8736 7.69973 6.84848 7.67987 6.82026 7.66626C6.79204 7.65264 6.76139 7.6456 6.73038 7.64559H6.13433L7.54743 5.70665L7.35481 7.15519C7.35047 7.18767 7.35277 7.22075 7.36156 7.25221C7.37035 7.28367 7.38542 7.31276 7.40575 7.33753C7.42609 7.36229 7.45121 7.38215 7.47943 7.39577C7.50765 7.40938 7.5383 7.41643 7.56931 7.41643H8.16536L6.75226 9.35537Z" />
                                <path d="M12.35 4.89575H11.9167C11.5583 4.89575 11.2667 5.2042 11.2667 5.58324V6.27072H10.8333V4.20827C10.8333 3.70274 10.4446 3.29162 9.96667 3.29162H8.88333V2.83329H10.1833C10.5417 2.83329 10.8333 2.52484 10.8333 2.14581V1.68749C10.8333 1.30845 10.5417 1 10.1833 1H5.85C5.49163 1 5.2 1.30845 5.2 1.68749V2.14581C5.2 2.52484 5.49163 2.83329 5.85 2.83329H7.15V3.29162H5.86863C5.66627 3.29162 5.46932 3.36701 5.31397 3.50405L4.37515 4.3311C4.29737 4.39972 4.19932 4.43735 4.09803 4.43743H3.03333C2.55537 4.43743 2.16667 4.84854 2.16667 5.35408V6.27072H1.73333V4.89575C1.73333 4.51672 1.4417 4.20827 1.08333 4.20827H0.65C0.291633 4.20827 0 4.51672 0 4.89575V9.47899C0 9.85802 0.291633 10.1665 0.65 10.1665H1.08333C1.4417 10.1665 1.73333 9.85802 1.73333 9.47899V8.10402H2.16667V9.47899C2.16667 9.98452 2.55537 10.3956 3.03333 10.3956H3.73945C3.89458 10.3956 4.03888 10.4841 4.11558 10.6266L4.60807 11.5378C4.68391 11.6781 4.79344 11.7947 4.92557 11.8759C5.0577 11.957 5.20775 11.9998 5.36055 12H9.22892C9.35599 12.0002 9.48154 11.9707 9.59662 11.9137C9.7117 11.8567 9.81349 11.7736 9.89473 11.6702L10.6325 10.7339C10.7622 10.569 10.8332 10.3614 10.8333 10.147V8.10425H11.2667V8.79173C11.2667 9.17077 11.5583 9.47922 11.9167 9.47922H12.35C12.7084 9.47922 13 9.17077 13 8.79173V5.58347C13 5.20443 12.7084 4.89575 12.35 4.89575ZM1.3 9.47899C1.3 9.53977 1.27717 9.59805 1.23654 9.64103C1.19591 9.68401 1.1408 9.70815 1.08333 9.70815H0.65C0.592536 9.70815 0.537426 9.68401 0.496794 9.64103C0.456161 9.59805 0.433333 9.53977 0.433333 9.47899V4.89575C0.433333 4.83497 0.456161 4.77669 0.496794 4.73371C0.537426 4.69073 0.592536 4.66659 0.65 4.66659H1.08333C1.1408 4.66659 1.19591 4.69073 1.23654 4.73371C1.27717 4.77669 1.3 4.83497 1.3 4.89575V9.47899ZM1.73333 7.64569V6.72905H2.16667V7.64569H1.73333ZM5.63333 2.14581V1.68749C5.63333 1.62671 5.65616 1.56842 5.69679 1.52544C5.73743 1.48247 5.79254 1.45832 5.85 1.45832H10.1833C10.2408 1.45832 10.2959 1.48247 10.3365 1.52544C10.3772 1.56842 10.4 1.62671 10.4 1.68749V2.14581C10.4 2.20659 10.3772 2.26488 10.3365 2.30785C10.2959 2.35083 10.2408 2.37497 10.1833 2.37497H5.85C5.79254 2.37497 5.73743 2.35083 5.69679 2.30785C5.65616 2.26488 5.63333 2.20659 5.63333 2.14581ZM7.58333 2.83329H8.45V3.29162H7.58333V2.83329ZM10.4 10.1468C10.4 10.2538 10.3643 10.3578 10.2995 10.4401L9.56193 11.3764C9.52126 11.4281 9.47034 11.4697 9.41279 11.4982C9.35524 11.5267 9.29247 11.5415 9.22892 11.5414H5.36055C5.28417 11.5414 5.20916 11.52 5.14311 11.4794C5.07706 11.4389 5.02232 11.3806 4.98442 11.3105L4.49193 10.3993C4.41609 10.259 4.30656 10.1424 4.17443 10.0612C4.0423 9.98006 3.89225 9.93724 3.73945 9.93708H3.03333C2.79435 9.93708 2.6 9.73153 2.6 9.47876V5.35385C2.6 5.10108 2.79435 4.89552 3.03333 4.89552H4.09803C4.3004 4.89552 4.49735 4.82013 4.6527 4.68309L5.59152 3.85604C5.66929 3.78742 5.76735 3.7498 5.86863 3.74971H9.96667C10.2057 3.74971 10.4 3.95527 10.4 4.20804V10.1465V10.1468ZM10.8333 7.64569V6.72905H11.2667V7.64569H10.8333ZM12.5667 8.7915C12.5667 8.85228 12.5438 8.91057 12.5032 8.95355C12.4626 8.99652 12.4075 9.02067 12.35 9.02067H11.9167C11.8592 9.02067 11.8041 8.99652 11.7635 8.95355C11.7228 8.91057 11.7 8.85228 11.7 8.7915V5.58324C11.7 5.52246 11.7228 5.46417 11.7635 5.4212C11.8041 5.37822 11.8592 5.35408 11.9167 5.35408H12.35C12.4075 5.35408 12.4626 5.37822 12.5032 5.4212C12.5438 5.46417 12.5667 5.52246 12.5667 5.58324V8.7915Z" />
                              </g>
                            </svg>
                            Electric
                          </li>
                        </ul>
                        <div className="content-btm">
                          <Link legacyBehavior href="/car-deatils">
                            <a className="view-btn2">
                              <svg
                                width={35}
                                height={21}
                                viewBox="0 0 35 21"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                  strokeLinecap="round"
                                />
                                <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                                />
                                <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                              </svg>
                              View Details
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="product-card">
                      <div className="product-img">
                        <div className="number-of-img">
                          <Image
                            src="/assets/img/home1/icon/gallery-icon-1.svg"
                            fill
                            objectFit="contain"
                            alt="gallery icon"
                          />
                          10
                        </div>
                        <a href="#" className="fav">
                          <svg
                            width={14}
                            height={13}
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                          </svg>
                        </a>
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="swiper product-img-slider">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-11.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h5>
                          <Link legacyBehavior href="/car-deatils">
                            <a>Jeep Grand Cherokee-2022</a>
                          </Link>
                        </h5>
                        <div className="price-location">
                          <div className="price">
                            <strong>$22,656.00</strong>
                          </div>
                          <div className="location">
                            <a href="#">
                              <i className="bi bi-geo-alt" /> Panama City
                            </a>
                          </div>
                        </div>
                        <ul className="features">
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_1449888"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_1449888)">
                                <path d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                <path d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                              </g>
                            </svg>
                            2500 miles
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_1439999"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_1439999)">
                                <path d="M6.42663 3.45316H10.8878C10.949 3.45316 11.0077 3.43176 11.051 3.39366C11.0943 3.35557 11.1186 3.3039 11.1186 3.25003V1.82813C11.1186 1.77426 11.0943 1.72259 11.051 1.6845C11.0077 1.6464 10.949 1.625 10.8878 1.625H7.19516C7.15154 1.62499 7.10882 1.63587 7.07193 1.65636C7.03505 1.67685 7.00551 1.70612 6.98676 1.74078L6.21823 3.16268C6.20147 3.19365 6.1939 3.22784 6.19621 3.26208C6.19852 3.29632 6.21064 3.32948 6.23145 3.35848C6.25226 3.38748 6.28107 3.41138 6.3152 3.42793C6.34933 3.44448 6.38766 3.45316 6.42663 3.45316ZM7.34102 2.03126H10.657V3.0469H6.79197L7.34102 2.03126Z" />
                                <path d="M1.49911 3.21956C1.56073 3.24028 1.64058 3.21936 1.67497 3.2027L1.87622 3.10601L2.16332 3.56955C1.79404 3.78793 1.49148 4.08293 1.28231 4.42852C1.07314 4.77412 0.963791 5.1597 0.963905 5.55127V11.5781C0.963905 12.3622 1.68859 13 2.57944 13H10.8879C11.7787 13 12.5034 12.3622 12.5034 11.5781V1.42187C12.5034 0.861847 11.9858 0.406229 11.3495 0.406229H7.42603C7.03602 0.404981 6.6534 0.499924 6.32156 0.680298C5.98972 0.860671 5.72194 1.11926 5.54855 1.42675L5.17444 2.08732L4.57947 2.3778L4.30759 1.93944L4.51115 1.84174C4.56484 1.81594 4.60469 1.77244 4.62196 1.72079C4.63923 1.66914 4.63249 1.61358 4.60324 1.5663L3.82986 0.316853C3.74165 0.175448 3.59347 0.0704953 3.41766 0.0249036C3.24185 -0.0206881 3.05269 -0.00321658 2.89147 0.0735044L0.862588 1.04649C0.53025 1.20635 0.405854 1.57645 0.586101 1.87261L1.36156 3.12186C1.37608 3.1453 1.39574 3.16598 1.41938 3.18272C1.44303 3.19945 1.4702 3.2119 1.49934 3.21936L1.49911 3.21956ZM3.11164 0.430605C3.16571 0.406431 3.22823 0.401358 3.2864 0.416425C3.34458 0.431492 3.39402 0.465558 3.42459 0.511653L4.08742 1.58255L3.58084 1.82529L3.24804 1.28984C3.21792 1.24381 3.16853 1.21 3.11043 1.19564C3.05234 1.18128 2.99016 1.18752 2.93723 1.21302C2.8843 1.23852 2.84482 1.28125 2.82725 1.33206C2.80968 1.38287 2.81541 1.43771 2.84323 1.48484L3.17557 2.01948L2.56697 2.31117L2.2351 1.77714C2.20498 1.73112 2.15559 1.69731 2.09749 1.68295C2.0394 1.66859 1.97723 1.67483 1.92429 1.70033C1.87136 1.72583 1.83188 1.76856 1.81431 1.81936C1.79674 1.87017 1.80248 1.92502 1.83029 1.97215L2.16171 2.50536L1.85845 2.6508L1.85729 2.65121L1.65604 2.74851L0.992292 1.67924C0.963266 1.63183 0.956605 1.57627 0.973751 1.52457C0.990897 1.47288 1.03047 1.4292 1.08392 1.40298L3.11164 0.430605ZM3.60391 3.33778L5.46085 2.41212C5.5017 2.39222 5.53448 2.36175 5.55548 2.32519L5.96144 1.60834C6.09866 1.36989 6.30803 1.16942 6.56646 1.02903C6.82489 0.888634 7.12234 0.81377 7.42603 0.812689H11.3495C11.7312 0.812689 12.0418 1.0861 12.0418 1.42208V11.5783C12.0418 12.1383 11.5242 12.5939 10.8879 12.5939H2.57944C1.94315 12.5939 1.42549 12.1383 1.42549 11.5783V5.55148C1.42528 5.19819 1.53251 4.8513 1.73603 4.5468C1.93955 4.2423 2.23196 3.99128 2.5829 3.81981C2.63616 3.7938 2.67559 3.75032 2.69258 3.69883C2.70957 3.64735 2.70275 3.59205 2.6736 3.54497L2.28149 2.91182L3.9021 2.13424L4.17743 2.57808L3.37359 2.98596C3.34732 2.99928 3.32429 3.01703 3.30582 3.03818C3.28735 3.05934 3.27379 3.08349 3.26593 3.10926C3.25806 3.13502 3.25604 3.1619 3.25998 3.18836C3.26392 3.21481 3.27374 3.24032 3.28889 3.26344C3.33158 3.32864 3.47629 3.38795 3.60415 3.33798L3.60391 3.33778Z" />
                                <path d="M9.50334 9.46291V6.58418L10.8205 5.42492C10.8419 5.40607 10.8589 5.38369 10.8705 5.35904C10.8822 5.3344 10.8881 5.30799 10.8881 5.28131C10.8881 5.25463 10.8822 5.22822 10.8705 5.20357C10.8589 5.17893 10.8419 5.15654 10.8205 5.1377L9.8973 4.32518C9.87589 4.3063 9.85046 4.29132 9.82246 4.2811C9.79446 4.27089 9.76445 4.26562 9.73414 4.26562C9.70382 4.26562 9.67381 4.27089 9.64581 4.2811C9.61781 4.29132 9.59238 4.3063 9.57097 4.32518L8.25385 5.48444H5.21388L3.89676 4.32518C3.87534 4.3063 3.84991 4.29132 3.82191 4.2811C3.79391 4.27089 3.7639 4.26562 3.73359 4.26562C3.70328 4.26562 3.67326 4.27089 3.64527 4.2811C3.61727 4.29132 3.59183 4.3063 3.57042 4.32518L2.64726 5.1377C2.62581 5.15654 2.60879 5.17893 2.59718 5.20357C2.58557 5.22822 2.57959 5.25463 2.57959 5.28131C2.57959 5.30799 2.58557 5.3344 2.59718 5.35904C2.60879 5.38369 2.62581 5.40607 2.64726 5.42492L3.96438 6.58418V9.46291L2.64726 10.6222C2.62581 10.641 2.60879 10.6634 2.59718 10.688C2.58557 10.7127 2.57959 10.7391 2.57959 10.7658C2.57959 10.7925 2.58557 10.8189 2.59718 10.8435C2.60879 10.8682 2.62581 10.8905 2.64726 10.9094L3.57042 11.7219C3.59183 11.7408 3.61727 11.7558 3.64527 11.766C3.67326 11.7762 3.70328 11.7815 3.73359 11.7815C3.7639 11.7815 3.79391 11.7762 3.82191 11.766C3.84991 11.7558 3.87534 11.7408 3.89676 11.7219L5.21388 10.5627H8.25385L9.57097 11.7219C9.59235 11.7408 9.61777 11.7559 9.64578 11.7661C9.67378 11.7764 9.70381 11.7816 9.73414 11.7816C9.76446 11.7816 9.79449 11.7764 9.82249 11.7661C9.8505 11.7559 9.87592 11.7408 9.8973 11.7219L10.8205 10.9094C10.8419 10.8905 10.8589 10.8682 10.8705 10.8435C10.8822 10.8189 10.8881 10.7925 10.8881 10.7658C10.8881 10.7391 10.8822 10.7127 10.8705 10.688C10.8589 10.6634 10.8419 10.641 10.8205 10.6222L9.50334 9.46291ZM9.73414 11.2911L8.51256 10.2159C8.46929 10.1778 8.4106 10.1564 8.34939 10.1564H5.11833C5.08802 10.1564 5.058 10.1616 5.03 10.1718C5.002 10.182 4.97656 10.197 4.95516 10.2159L3.73359 11.2911L3.13676 10.7658L4.35834 9.69062C4.40162 9.65254 4.42595 9.60088 4.42596 9.54701V6.50008C4.42599 6.4734 4.42003 6.44698 4.40843 6.42234C4.39682 6.39769 4.3798 6.37531 4.35834 6.35647L3.13676 5.28131L3.73359 4.75602L4.95516 5.83118C4.99843 5.86927 5.05712 5.89068 5.11833 5.89069H8.34939C8.41055 5.89069 8.4694 5.86937 8.51256 5.83118L9.73414 4.75602L10.331 5.28131L9.10939 6.35647C9.0661 6.39455 9.04178 6.44621 9.04176 6.50008V9.54701C9.04176 9.60084 9.066 9.65264 9.10939 9.69062L10.331 10.7658L9.73414 11.2911Z" />
                                <path d="M8.11844 6.5H5.34895C5.28774 6.5 5.22904 6.5214 5.18576 6.55949C5.14248 6.59759 5.11816 6.64926 5.11816 6.70313V9.3438C5.11816 9.39767 5.14248 9.44934 5.18576 9.48743C5.22904 9.52553 5.28774 9.54693 5.34895 9.54693H7.19528C7.25649 9.54693 7.31519 9.52553 7.35847 9.48743C7.40175 9.44934 7.42607 9.39767 7.42607 9.3438C7.42607 9.28993 7.40175 9.23826 7.35847 9.20017C7.31519 9.16207 7.25649 9.14067 7.19528 9.14067H5.57974V6.90626H7.88765V8.53129C7.88765 8.58516 7.91196 8.63683 7.95524 8.67492C7.99853 8.71301 8.05723 8.73441 8.11844 8.73441C8.17965 8.73441 8.23835 8.71301 8.28163 8.67492C8.32491 8.63683 8.34923 8.58516 8.34923 8.53129V6.70313C8.34923 6.64926 8.32491 6.59759 8.28163 6.55949C8.23835 6.5214 8.17965 6.5 8.11844 6.5ZM11.1187 6.5C11.0575 6.5 10.9988 6.5214 10.9555 6.55949C10.9122 6.59759 10.8879 6.64926 10.8879 6.70313V8.53129C10.8879 8.58516 10.9122 8.63683 10.9555 8.67492C10.9988 8.71301 11.0575 8.73441 11.1187 8.73441C11.1799 8.73441 11.2386 8.71301 11.2819 8.67492C11.3252 8.63683 11.3495 8.58516 11.3495 8.53129V6.70313C11.3495 6.64926 11.3252 6.59759 11.2819 6.55949C11.2386 6.5214 11.1799 6.5 11.1187 6.5Z" />
                                <path d="M11.1187 9.54713C11.2462 9.54713 11.3495 9.45618 11.3495 9.344C11.3495 9.23181 11.2462 9.14087 11.1187 9.14087C10.9913 9.14087 10.8879 9.23181 10.8879 9.344C10.8879 9.45618 10.9913 9.54713 11.1187 9.54713Z" />
                              </g>
                            </svg>
                            Petrol + Gas
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_143299"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_143299)">
                                <path d="M8.28713 6.95811H7.8187L8.04511 5.25406C8.05414 5.18229 8.0395 5.10942 8.00367 5.04772C7.96783 4.98603 7.91299 4.93928 7.84838 4.91536C7.71188 4.86288 7.56173 4.91605 7.49608 5.02788L5.69038 7.50535C5.65489 7.56344 5.63505 7.63066 5.63299 7.69979C5.63093 7.76892 5.64673 7.83733 5.67868 7.89767C5.74498 8.02486 5.87281 8.10369 6.01256 8.10369H6.481L6.25458 9.80774C6.24555 9.87951 6.26019 9.95238 6.29602 10.0141C6.33186 10.0758 6.3867 10.1225 6.45131 10.1464C6.48728 10.1604 6.52433 10.1668 6.56051 10.1668C6.66148 10.1668 6.7553 10.1162 6.80361 10.0339L8.60931 7.55645C8.6448 7.49836 8.66464 7.43113 8.6667 7.36201C8.66876 7.29288 8.65297 7.22446 8.62101 7.16412C8.58787 7.10133 8.53941 7.0491 8.48068 7.01286C8.42196 6.97663 8.35512 6.95772 8.28713 6.95811ZM6.75226 9.35537L6.94488 7.90684C6.94922 7.87436 6.94692 7.84127 6.93813 7.80981C6.92934 7.77836 6.91427 7.74926 6.89394 7.7245C6.8736 7.69973 6.84848 7.67987 6.82026 7.66626C6.79204 7.65264 6.76139 7.6456 6.73038 7.64559H6.13433L7.54743 5.70665L7.35481 7.15519C7.35047 7.18767 7.35277 7.22075 7.36156 7.25221C7.37035 7.28367 7.38542 7.31276 7.40575 7.33753C7.42609 7.36229 7.45121 7.38215 7.47943 7.39577C7.50765 7.40938 7.5383 7.41643 7.56931 7.41643H8.16536L6.75226 9.35537Z" />
                                <path d="M12.35 4.89575H11.9167C11.5583 4.89575 11.2667 5.2042 11.2667 5.58324V6.27072H10.8333V4.20827C10.8333 3.70274 10.4446 3.29162 9.96667 3.29162H8.88333V2.83329H10.1833C10.5417 2.83329 10.8333 2.52484 10.8333 2.14581V1.68749C10.8333 1.30845 10.5417 1 10.1833 1H5.85C5.49163 1 5.2 1.30845 5.2 1.68749V2.14581C5.2 2.52484 5.49163 2.83329 5.85 2.83329H7.15V3.29162H5.86863C5.66627 3.29162 5.46932 3.36701 5.31397 3.50405L4.37515 4.3311C4.29737 4.39972 4.19932 4.43735 4.09803 4.43743H3.03333C2.55537 4.43743 2.16667 4.84854 2.16667 5.35408V6.27072H1.73333V4.89575C1.73333 4.51672 1.4417 4.20827 1.08333 4.20827H0.65C0.291633 4.20827 0 4.51672 0 4.89575V9.47899C0 9.85802 0.291633 10.1665 0.65 10.1665H1.08333C1.4417 10.1665 1.73333 9.85802 1.73333 9.47899V8.10402H2.16667V9.47899C2.16667 9.98452 2.55537 10.3956 3.03333 10.3956H3.73945C3.89458 10.3956 4.03888 10.4841 4.11558 10.6266L4.60807 11.5378C4.68391 11.6781 4.79344 11.7947 4.92557 11.8759C5.0577 11.957 5.20775 11.9998 5.36055 12H9.22892C9.35599 12.0002 9.48154 11.9707 9.59662 11.9137C9.7117 11.8567 9.81349 11.7736 9.89473 11.6702L10.6325 10.7339C10.7622 10.569 10.8332 10.3614 10.8333 10.147V8.10425H11.2667V8.79173C11.2667 9.17077 11.5583 9.47922 11.9167 9.47922H12.35C12.7084 9.47922 13 9.17077 13 8.79173V5.58347C13 5.20443 12.7084 4.89575 12.35 4.89575ZM1.3 9.47899C1.3 9.53977 1.27717 9.59805 1.23654 9.64103C1.19591 9.68401 1.1408 9.70815 1.08333 9.70815H0.65C0.592536 9.70815 0.537426 9.68401 0.496794 9.64103C0.456161 9.59805 0.433333 9.53977 0.433333 9.47899V4.89575C0.433333 4.83497 0.456161 4.77669 0.496794 4.73371C0.537426 4.69073 0.592536 4.66659 0.65 4.66659H1.08333C1.1408 4.66659 1.19591 4.69073 1.23654 4.73371C1.27717 4.77669 1.3 4.83497 1.3 4.89575V9.47899ZM1.73333 7.64569V6.72905H2.16667V7.64569H1.73333ZM5.63333 2.14581V1.68749C5.63333 1.62671 5.65616 1.56842 5.69679 1.52544C5.73743 1.48247 5.79254 1.45832 5.85 1.45832H10.1833C10.2408 1.45832 10.2959 1.48247 10.3365 1.52544C10.3772 1.56842 10.4 1.62671 10.4 1.68749V2.14581C10.4 2.20659 10.3772 2.26488 10.3365 2.30785C10.2959 2.35083 10.2408 2.37497 10.1833 2.37497H5.85C5.79254 2.37497 5.73743 2.35083 5.69679 2.30785C5.65616 2.26488 5.63333 2.20659 5.63333 2.14581ZM7.58333 2.83329H8.45V3.29162H7.58333V2.83329ZM10.4 10.1468C10.4 10.2538 10.3643 10.3578 10.2995 10.4401L9.56193 11.3764C9.52126 11.4281 9.47034 11.4697 9.41279 11.4982C9.35524 11.5267 9.29247 11.5415 9.22892 11.5414H5.36055C5.28417 11.5414 5.20916 11.52 5.14311 11.4794C5.07706 11.4389 5.02232 11.3806 4.98442 11.3105L4.49193 10.3993C4.41609 10.259 4.30656 10.1424 4.17443 10.0612C4.0423 9.98006 3.89225 9.93724 3.73945 9.93708H3.03333C2.79435 9.93708 2.6 9.73153 2.6 9.47876V5.35385C2.6 5.10108 2.79435 4.89552 3.03333 4.89552H4.09803C4.3004 4.89552 4.49735 4.82013 4.6527 4.68309L5.59152 3.85604C5.66929 3.78742 5.76735 3.7498 5.86863 3.74971H9.96667C10.2057 3.74971 10.4 3.95527 10.4 4.20804V10.1465V10.1468ZM10.8333 7.64569V6.72905H11.2667V7.64569H10.8333ZM12.5667 8.7915C12.5667 8.85228 12.5438 8.91057 12.5032 8.95355C12.4626 8.99652 12.4075 9.02067 12.35 9.02067H11.9167C11.8592 9.02067 11.8041 8.99652 11.7635 8.95355C11.7228 8.91057 11.7 8.85228 11.7 8.7915V5.58324C11.7 5.52246 11.7228 5.46417 11.7635 5.4212C11.8041 5.37822 11.8592 5.35408 11.9167 5.35408H12.35C12.4075 5.35408 12.4626 5.37822 12.5032 5.4212C12.5438 5.46417 12.5667 5.52246 12.5667 5.58324V8.7915Z" />
                              </g>
                            </svg>
                            Electric
                          </li>
                        </ul>
                        <div className="content-btm">
                          <Link legacyBehavior href="/car-deatils">
                            <a className="view-btn2">
                              <svg
                                width={35}
                                height={21}
                                viewBox="0 0 35 21"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                  strokeLinecap="round"
                                />
                                <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                                />
                                <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                              </svg>
                              View Details
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="product-card">
                      <div className="product-img">
                        <div className="number-of-img">
                          <Image
                            src="/assets/img/home1/icon/gallery-icon-1.svg"
                            fill
                            objectFit="contain"
                            alt="gallery icon"
                          />
                          10
                        </div>
                        <a href="#" className="fav">
                          <svg
                            width={14}
                            height={13}
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                          </svg>
                        </a>
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="swiper product-img-slider">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h5>
                          <Link legacyBehavior href="/car-deatils">
                            <a>Mercedes-Benz C-Class-2023</a>
                          </Link>
                        </h5>
                        <div className="price-location">
                          <div className="price">
                            <strong>$7,656.00</strong>
                          </div>
                          <div className="location">
                            <a href="#">
                              <i className="bi bi-geo-alt" /> Panama City
                            </a>
                          </div>
                        </div>
                        <ul className="features">
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_144966"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_144966)">
                                <path d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                <path d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                              </g>
                            </svg>
                            2500 miles
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_143901"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_143901)">
                                <path d="M6.42663 3.45316H10.8878C10.949 3.45316 11.0077 3.43176 11.051 3.39366C11.0943 3.35557 11.1186 3.3039 11.1186 3.25003V1.82813C11.1186 1.77426 11.0943 1.72259 11.051 1.6845C11.0077 1.6464 10.949 1.625 10.8878 1.625H7.19516C7.15154 1.62499 7.10882 1.63587 7.07193 1.65636C7.03505 1.67685 7.00551 1.70612 6.98676 1.74078L6.21823 3.16268C6.20147 3.19365 6.1939 3.22784 6.19621 3.26208C6.19852 3.29632 6.21064 3.32948 6.23145 3.35848C6.25226 3.38748 6.28107 3.41138 6.3152 3.42793C6.34933 3.44448 6.38766 3.45316 6.42663 3.45316ZM7.34102 2.03126H10.657V3.0469H6.79197L7.34102 2.03126Z" />
                                <path d="M1.49911 3.21956C1.56073 3.24028 1.64058 3.21936 1.67497 3.2027L1.87622 3.10601L2.16332 3.56955C1.79404 3.78793 1.49148 4.08293 1.28231 4.42852C1.07314 4.77412 0.963791 5.1597 0.963905 5.55127V11.5781C0.963905 12.3622 1.68859 13 2.57944 13H10.8879C11.7787 13 12.5034 12.3622 12.5034 11.5781V1.42187C12.5034 0.861847 11.9858 0.406229 11.3495 0.406229H7.42603C7.03602 0.404981 6.6534 0.499924 6.32156 0.680298C5.98972 0.860671 5.72194 1.11926 5.54855 1.42675L5.17444 2.08732L4.57947 2.3778L4.30759 1.93944L4.51115 1.84174C4.56484 1.81594 4.60469 1.77244 4.62196 1.72079C4.63923 1.66914 4.63249 1.61358 4.60324 1.5663L3.82986 0.316853C3.74165 0.175448 3.59347 0.0704953 3.41766 0.0249036C3.24185 -0.0206881 3.05269 -0.00321658 2.89147 0.0735044L0.862588 1.04649C0.53025 1.20635 0.405854 1.57645 0.586101 1.87261L1.36156 3.12186C1.37608 3.1453 1.39574 3.16598 1.41938 3.18272C1.44303 3.19945 1.4702 3.2119 1.49934 3.21936L1.49911 3.21956ZM3.11164 0.430605C3.16571 0.406431 3.22823 0.401358 3.2864 0.416425C3.34458 0.431492 3.39402 0.465558 3.42459 0.511653L4.08742 1.58255L3.58084 1.82529L3.24804 1.28984C3.21792 1.24381 3.16853 1.21 3.11043 1.19564C3.05234 1.18128 2.99016 1.18752 2.93723 1.21302C2.8843 1.23852 2.84482 1.28125 2.82725 1.33206C2.80968 1.38287 2.81541 1.43771 2.84323 1.48484L3.17557 2.01948L2.56697 2.31117L2.2351 1.77714C2.20498 1.73112 2.15559 1.69731 2.09749 1.68295C2.0394 1.66859 1.97723 1.67483 1.92429 1.70033C1.87136 1.72583 1.83188 1.76856 1.81431 1.81936C1.79674 1.87017 1.80248 1.92502 1.83029 1.97215L2.16171 2.50536L1.85845 2.6508L1.85729 2.65121L1.65604 2.74851L0.992292 1.67924C0.963266 1.63183 0.956605 1.57627 0.973751 1.52457C0.990897 1.47288 1.03047 1.4292 1.08392 1.40298L3.11164 0.430605ZM3.60391 3.33778L5.46085 2.41212C5.5017 2.39222 5.53448 2.36175 5.55548 2.32519L5.96144 1.60834C6.09866 1.36989 6.30803 1.16942 6.56646 1.02903C6.82489 0.888634 7.12234 0.81377 7.42603 0.812689H11.3495C11.7312 0.812689 12.0418 1.0861 12.0418 1.42208V11.5783C12.0418 12.1383 11.5242 12.5939 10.8879 12.5939H2.57944C1.94315 12.5939 1.42549 12.1383 1.42549 11.5783V5.55148C1.42528 5.19819 1.53251 4.8513 1.73603 4.5468C1.93955 4.2423 2.23196 3.99128 2.5829 3.81981C2.63616 3.7938 2.67559 3.75032 2.69258 3.69883C2.70957 3.64735 2.70275 3.59205 2.6736 3.54497L2.28149 2.91182L3.9021 2.13424L4.17743 2.57808L3.37359 2.98596C3.34732 2.99928 3.32429 3.01703 3.30582 3.03818C3.28735 3.05934 3.27379 3.08349 3.26593 3.10926C3.25806 3.13502 3.25604 3.1619 3.25998 3.18836C3.26392 3.21481 3.27374 3.24032 3.28889 3.26344C3.33158 3.32864 3.47629 3.38795 3.60415 3.33798L3.60391 3.33778Z" />
                                <path d="M9.50334 9.46291V6.58418L10.8205 5.42492C10.8419 5.40607 10.8589 5.38369 10.8705 5.35904C10.8822 5.3344 10.8881 5.30799 10.8881 5.28131C10.8881 5.25463 10.8822 5.22822 10.8705 5.20357C10.8589 5.17893 10.8419 5.15654 10.8205 5.1377L9.8973 4.32518C9.87589 4.3063 9.85046 4.29132 9.82246 4.2811C9.79446 4.27089 9.76445 4.26562 9.73414 4.26562C9.70382 4.26562 9.67381 4.27089 9.64581 4.2811C9.61781 4.29132 9.59238 4.3063 9.57097 4.32518L8.25385 5.48444H5.21388L3.89676 4.32518C3.87534 4.3063 3.84991 4.29132 3.82191 4.2811C3.79391 4.27089 3.7639 4.26562 3.73359 4.26562C3.70328 4.26562 3.67326 4.27089 3.64527 4.2811C3.61727 4.29132 3.59183 4.3063 3.57042 4.32518L2.64726 5.1377C2.62581 5.15654 2.60879 5.17893 2.59718 5.20357C2.58557 5.22822 2.57959 5.25463 2.57959 5.28131C2.57959 5.30799 2.58557 5.3344 2.59718 5.35904C2.60879 5.38369 2.62581 5.40607 2.64726 5.42492L3.96438 6.58418V9.46291L2.64726 10.6222C2.62581 10.641 2.60879 10.6634 2.59718 10.688C2.58557 10.7127 2.57959 10.7391 2.57959 10.7658C2.57959 10.7925 2.58557 10.8189 2.59718 10.8435C2.60879 10.8682 2.62581 10.8905 2.64726 10.9094L3.57042 11.7219C3.59183 11.7408 3.61727 11.7558 3.64527 11.766C3.67326 11.7762 3.70328 11.7815 3.73359 11.7815C3.7639 11.7815 3.79391 11.7762 3.82191 11.766C3.84991 11.7558 3.87534 11.7408 3.89676 11.7219L5.21388 10.5627H8.25385L9.57097 11.7219C9.59235 11.7408 9.61777 11.7559 9.64578 11.7661C9.67378 11.7764 9.70381 11.7816 9.73414 11.7816C9.76446 11.7816 9.79449 11.7764 9.82249 11.7661C9.8505 11.7559 9.87592 11.7408 9.8973 11.7219L10.8205 10.9094C10.8419 10.8905 10.8589 10.8682 10.8705 10.8435C10.8822 10.8189 10.8881 10.7925 10.8881 10.7658C10.8881 10.7391 10.8822 10.7127 10.8705 10.688C10.8589 10.6634 10.8419 10.641 10.8205 10.6222L9.50334 9.46291ZM9.73414 11.2911L8.51256 10.2159C8.46929 10.1778 8.4106 10.1564 8.34939 10.1564H5.11833C5.08802 10.1564 5.058 10.1616 5.03 10.1718C5.002 10.182 4.97656 10.197 4.95516 10.2159L3.73359 11.2911L3.13676 10.7658L4.35834 9.69062C4.40162 9.65254 4.42595 9.60088 4.42596 9.54701V6.50008C4.42599 6.4734 4.42003 6.44698 4.40843 6.42234C4.39682 6.39769 4.3798 6.37531 4.35834 6.35647L3.13676 5.28131L3.73359 4.75602L4.95516 5.83118C4.99843 5.86927 5.05712 5.89068 5.11833 5.89069H8.34939C8.41055 5.89069 8.4694 5.86937 8.51256 5.83118L9.73414 4.75602L10.331 5.28131L9.10939 6.35647C9.0661 6.39455 9.04178 6.44621 9.04176 6.50008V9.54701C9.04176 9.60084 9.066 9.65264 9.10939 9.69062L10.331 10.7658L9.73414 11.2911Z" />
                                <path d="M8.11844 6.5H5.34895C5.28774 6.5 5.22904 6.5214 5.18576 6.55949C5.14248 6.59759 5.11816 6.64926 5.11816 6.70313V9.3438C5.11816 9.39767 5.14248 9.44934 5.18576 9.48743C5.22904 9.52553 5.28774 9.54693 5.34895 9.54693H7.19528C7.25649 9.54693 7.31519 9.52553 7.35847 9.48743C7.40175 9.44934 7.42607 9.39767 7.42607 9.3438C7.42607 9.28993 7.40175 9.23826 7.35847 9.20017C7.31519 9.16207 7.25649 9.14067 7.19528 9.14067H5.57974V6.90626H7.88765V8.53129C7.88765 8.58516 7.91196 8.63683 7.95524 8.67492C7.99853 8.71301 8.05723 8.73441 8.11844 8.73441C8.17965 8.73441 8.23835 8.71301 8.28163 8.67492C8.32491 8.63683 8.34923 8.58516 8.34923 8.53129V6.70313C8.34923 6.64926 8.32491 6.59759 8.28163 6.55949C8.23835 6.5214 8.17965 6.5 8.11844 6.5ZM11.1187 6.5C11.0575 6.5 10.9988 6.5214 10.9555 6.55949C10.9122 6.59759 10.8879 6.64926 10.8879 6.70313V8.53129C10.8879 8.58516 10.9122 8.63683 10.9555 8.67492C10.9988 8.71301 11.0575 8.73441 11.1187 8.73441C11.1799 8.73441 11.2386 8.71301 11.2819 8.67492C11.3252 8.63683 11.3495 8.58516 11.3495 8.53129V6.70313C11.3495 6.64926 11.3252 6.59759 11.2819 6.55949C11.2386 6.5214 11.1799 6.5 11.1187 6.5Z" />
                                <path d="M11.1187 9.54713C11.2462 9.54713 11.3495 9.45618 11.3495 9.344C11.3495 9.23181 11.2462 9.14087 11.1187 9.14087C10.9913 9.14087 10.8879 9.23181 10.8879 9.344C10.8879 9.45618 10.9913 9.54713 11.1187 9.54713Z" />
                              </g>
                            </svg>
                            Petrol + Gas
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_143202"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_143202)">
                                <path d="M8.28713 6.95811H7.8187L8.04511 5.25406C8.05414 5.18229 8.0395 5.10942 8.00367 5.04772C7.96783 4.98603 7.91299 4.93928 7.84838 4.91536C7.71188 4.86288 7.56173 4.91605 7.49608 5.02788L5.69038 7.50535C5.65489 7.56344 5.63505 7.63066 5.63299 7.69979C5.63093 7.76892 5.64673 7.83733 5.67868 7.89767C5.74498 8.02486 5.87281 8.10369 6.01256 8.10369H6.481L6.25458 9.80774C6.24555 9.87951 6.26019 9.95238 6.29602 10.0141C6.33186 10.0758 6.3867 10.1225 6.45131 10.1464C6.48728 10.1604 6.52433 10.1668 6.56051 10.1668C6.66148 10.1668 6.7553 10.1162 6.80361 10.0339L8.60931 7.55645C8.6448 7.49836 8.66464 7.43113 8.6667 7.36201C8.66876 7.29288 8.65297 7.22446 8.62101 7.16412C8.58787 7.10133 8.53941 7.0491 8.48068 7.01286C8.42196 6.97663 8.35512 6.95772 8.28713 6.95811ZM6.75226 9.35537L6.94488 7.90684C6.94922 7.87436 6.94692 7.84127 6.93813 7.80981C6.92934 7.77836 6.91427 7.74926 6.89394 7.7245C6.8736 7.69973 6.84848 7.67987 6.82026 7.66626C6.79204 7.65264 6.76139 7.6456 6.73038 7.64559H6.13433L7.54743 5.70665L7.35481 7.15519C7.35047 7.18767 7.35277 7.22075 7.36156 7.25221C7.37035 7.28367 7.38542 7.31276 7.40575 7.33753C7.42609 7.36229 7.45121 7.38215 7.47943 7.39577C7.50765 7.40938 7.5383 7.41643 7.56931 7.41643H8.16536L6.75226 9.35537Z" />
                                <path d="M12.35 4.89575H11.9167C11.5583 4.89575 11.2667 5.2042 11.2667 5.58324V6.27072H10.8333V4.20827C10.8333 3.70274 10.4446 3.29162 9.96667 3.29162H8.88333V2.83329H10.1833C10.5417 2.83329 10.8333 2.52484 10.8333 2.14581V1.68749C10.8333 1.30845 10.5417 1 10.1833 1H5.85C5.49163 1 5.2 1.30845 5.2 1.68749V2.14581C5.2 2.52484 5.49163 2.83329 5.85 2.83329H7.15V3.29162H5.86863C5.66627 3.29162 5.46932 3.36701 5.31397 3.50405L4.37515 4.3311C4.29737 4.39972 4.19932 4.43735 4.09803 4.43743H3.03333C2.55537 4.43743 2.16667 4.84854 2.16667 5.35408V6.27072H1.73333V4.89575C1.73333 4.51672 1.4417 4.20827 1.08333 4.20827H0.65C0.291633 4.20827 0 4.51672 0 4.89575V9.47899C0 9.85802 0.291633 10.1665 0.65 10.1665H1.08333C1.4417 10.1665 1.73333 9.85802 1.73333 9.47899V8.10402H2.16667V9.47899C2.16667 9.98452 2.55537 10.3956 3.03333 10.3956H3.73945C3.89458 10.3956 4.03888 10.4841 4.11558 10.6266L4.60807 11.5378C4.68391 11.6781 4.79344 11.7947 4.92557 11.8759C5.0577 11.957 5.20775 11.9998 5.36055 12H9.22892C9.35599 12.0002 9.48154 11.9707 9.59662 11.9137C9.7117 11.8567 9.81349 11.7736 9.89473 11.6702L10.6325 10.7339C10.7622 10.569 10.8332 10.3614 10.8333 10.147V8.10425H11.2667V8.79173C11.2667 9.17077 11.5583 9.47922 11.9167 9.47922H12.35C12.7084 9.47922 13 9.17077 13 8.79173V5.58347C13 5.20443 12.7084 4.89575 12.35 4.89575ZM1.3 9.47899C1.3 9.53977 1.27717 9.59805 1.23654 9.64103C1.19591 9.68401 1.1408 9.70815 1.08333 9.70815H0.65C0.592536 9.70815 0.537426 9.68401 0.496794 9.64103C0.456161 9.59805 0.433333 9.53977 0.433333 9.47899V4.89575C0.433333 4.83497 0.456161 4.77669 0.496794 4.73371C0.537426 4.69073 0.592536 4.66659 0.65 4.66659H1.08333C1.1408 4.66659 1.19591 4.69073 1.23654 4.73371C1.27717 4.77669 1.3 4.83497 1.3 4.89575V9.47899ZM1.73333 7.64569V6.72905H2.16667V7.64569H1.73333ZM5.63333 2.14581V1.68749C5.63333 1.62671 5.65616 1.56842 5.69679 1.52544C5.73743 1.48247 5.79254 1.45832 5.85 1.45832H10.1833C10.2408 1.45832 10.2959 1.48247 10.3365 1.52544C10.3772 1.56842 10.4 1.62671 10.4 1.68749V2.14581C10.4 2.20659 10.3772 2.26488 10.3365 2.30785C10.2959 2.35083 10.2408 2.37497 10.1833 2.37497H5.85C5.79254 2.37497 5.73743 2.35083 5.69679 2.30785C5.65616 2.26488 5.63333 2.20659 5.63333 2.14581ZM7.58333 2.83329H8.45V3.29162H7.58333V2.83329ZM10.4 10.1468C10.4 10.2538 10.3643 10.3578 10.2995 10.4401L9.56193 11.3764C9.52126 11.4281 9.47034 11.4697 9.41279 11.4982C9.35524 11.5267 9.29247 11.5415 9.22892 11.5414H5.36055C5.28417 11.5414 5.20916 11.52 5.14311 11.4794C5.07706 11.4389 5.02232 11.3806 4.98442 11.3105L4.49193 10.3993C4.41609 10.259 4.30656 10.1424 4.17443 10.0612C4.0423 9.98006 3.89225 9.93724 3.73945 9.93708H3.03333C2.79435 9.93708 2.6 9.73153 2.6 9.47876V5.35385C2.6 5.10108 2.79435 4.89552 3.03333 4.89552H4.09803C4.3004 4.89552 4.49735 4.82013 4.6527 4.68309L5.59152 3.85604C5.66929 3.78742 5.76735 3.7498 5.86863 3.74971H9.96667C10.2057 3.74971 10.4 3.95527 10.4 4.20804V10.1465V10.1468ZM10.8333 7.64569V6.72905H11.2667V7.64569H10.8333ZM12.5667 8.7915C12.5667 8.85228 12.5438 8.91057 12.5032 8.95355C12.4626 8.99652 12.4075 9.02067 12.35 9.02067H11.9167C11.8592 9.02067 11.8041 8.99652 11.7635 8.95355C11.7228 8.91057 11.7 8.85228 11.7 8.7915V5.58324C11.7 5.52246 11.7228 5.46417 11.7635 5.4212C11.8041 5.37822 11.8592 5.35408 11.9167 5.35408H12.35C12.4075 5.35408 12.4626 5.37822 12.5032 5.4212C12.5438 5.46417 12.5667 5.52246 12.5667 5.58324V8.7915Z" />
                              </g>
                            </svg>
                            Electric
                          </li>
                        </ul>
                        <div className="content-btm">
                          <Link legacyBehavior href="/car-deatils">
                            <a className="view-btn2">
                              <svg
                                width={35}
                                height={21}
                                viewBox="0 0 35 21"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                  strokeLinecap="round"
                                />
                                <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                                />
                                <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                              </svg>
                              View Details
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="product-card">
                      <div className="product-img">
                        <div className="number-of-img">
                          <Image
                            src="/assets/img/home1/icon/gallery-icon-1.svg"
                            fill
                            objectFit="contain"
                            alt="gallery icon"
                          />
                          10
                        </div>
                        <a href="#" className="fav">
                          <svg
                            width={14}
                            height={13}
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                          </svg>
                        </a>
                        <div className="slider-btn-group">
                          <div className="product-stand-next swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                            </svg>
                          </div>
                          <div className="product-stand-prev swiper-arrow">
                            <svg
                              width={8}
                              height={13}
                              viewBox="0 0 8 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="swiper product-img-slider">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                            <div className="swiper-slide">
                              <Image
                                src="/assets/img/home1/product-img-12.png"
                                width={400}
                                height={70}
                                alt="product image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-content">
                        <h5>
                          <Link legacyBehavior href="/car-deatils">
                            <a>Chevrolet Silverado-2023</a>
                          </Link>
                        </h5>
                        <div className="price-location">
                          <div className="price">
                            <strong>$7,656.00</strong>
                          </div>
                          <div className="location">
                            <a href="#">
                              <i className="bi bi-geo-alt" /> Panama City
                            </a>
                          </div>
                        </div>
                        <ul className="features">
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_144904"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_144904)">
                                <path d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                <path d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                              </g>
                            </svg>
                            2500 miles
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_143905"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_143905)">
                                <path d="M6.42663 3.45316H10.8878C10.949 3.45316 11.0077 3.43176 11.051 3.39366C11.0943 3.35557 11.1186 3.3039 11.1186 3.25003V1.82813C11.1186 1.77426 11.0943 1.72259 11.051 1.6845C11.0077 1.6464 10.949 1.625 10.8878 1.625H7.19516C7.15154 1.62499 7.10882 1.63587 7.07193 1.65636C7.03505 1.67685 7.00551 1.70612 6.98676 1.74078L6.21823 3.16268C6.20147 3.19365 6.1939 3.22784 6.19621 3.26208C6.19852 3.29632 6.21064 3.32948 6.23145 3.35848C6.25226 3.38748 6.28107 3.41138 6.3152 3.42793C6.34933 3.44448 6.38766 3.45316 6.42663 3.45316ZM7.34102 2.03126H10.657V3.0469H6.79197L7.34102 2.03126Z" />
                                <path d="M1.49911 3.21956C1.56073 3.24028 1.64058 3.21936 1.67497 3.2027L1.87622 3.10601L2.16332 3.56955C1.79404 3.78793 1.49148 4.08293 1.28231 4.42852C1.07314 4.77412 0.963791 5.1597 0.963905 5.55127V11.5781C0.963905 12.3622 1.68859 13 2.57944 13H10.8879C11.7787 13 12.5034 12.3622 12.5034 11.5781V1.42187C12.5034 0.861847 11.9858 0.406229 11.3495 0.406229H7.42603C7.03602 0.404981 6.6534 0.499924 6.32156 0.680298C5.98972 0.860671 5.72194 1.11926 5.54855 1.42675L5.17444 2.08732L4.57947 2.3778L4.30759 1.93944L4.51115 1.84174C4.56484 1.81594 4.60469 1.77244 4.62196 1.72079C4.63923 1.66914 4.63249 1.61358 4.60324 1.5663L3.82986 0.316853C3.74165 0.175448 3.59347 0.0704953 3.41766 0.0249036C3.24185 -0.0206881 3.05269 -0.00321658 2.89147 0.0735044L0.862588 1.04649C0.53025 1.20635 0.405854 1.57645 0.586101 1.87261L1.36156 3.12186C1.37608 3.1453 1.39574 3.16598 1.41938 3.18272C1.44303 3.19945 1.4702 3.2119 1.49934 3.21936L1.49911 3.21956ZM3.11164 0.430605C3.16571 0.406431 3.22823 0.401358 3.2864 0.416425C3.34458 0.431492 3.39402 0.465558 3.42459 0.511653L4.08742 1.58255L3.58084 1.82529L3.24804 1.28984C3.21792 1.24381 3.16853 1.21 3.11043 1.19564C3.05234 1.18128 2.99016 1.18752 2.93723 1.21302C2.8843 1.23852 2.84482 1.28125 2.82725 1.33206C2.80968 1.38287 2.81541 1.43771 2.84323 1.48484L3.17557 2.01948L2.56697 2.31117L2.2351 1.77714C2.20498 1.73112 2.15559 1.69731 2.09749 1.68295C2.0394 1.66859 1.97723 1.67483 1.92429 1.70033C1.87136 1.72583 1.83188 1.76856 1.81431 1.81936C1.79674 1.87017 1.80248 1.92502 1.83029 1.97215L2.16171 2.50536L1.85845 2.6508L1.85729 2.65121L1.65604 2.74851L0.992292 1.67924C0.963266 1.63183 0.956605 1.57627 0.973751 1.52457C0.990897 1.47288 1.03047 1.4292 1.08392 1.40298L3.11164 0.430605ZM3.60391 3.33778L5.46085 2.41212C5.5017 2.39222 5.53448 2.36175 5.55548 2.32519L5.96144 1.60834C6.09866 1.36989 6.30803 1.16942 6.56646 1.02903C6.82489 0.888634 7.12234 0.81377 7.42603 0.812689H11.3495C11.7312 0.812689 12.0418 1.0861 12.0418 1.42208V11.5783C12.0418 12.1383 11.5242 12.5939 10.8879 12.5939H2.57944C1.94315 12.5939 1.42549 12.1383 1.42549 11.5783V5.55148C1.42528 5.19819 1.53251 4.8513 1.73603 4.5468C1.93955 4.2423 2.23196 3.99128 2.5829 3.81981C2.63616 3.7938 2.67559 3.75032 2.69258 3.69883C2.70957 3.64735 2.70275 3.59205 2.6736 3.54497L2.28149 2.91182L3.9021 2.13424L4.17743 2.57808L3.37359 2.98596C3.34732 2.99928 3.32429 3.01703 3.30582 3.03818C3.28735 3.05934 3.27379 3.08349 3.26593 3.10926C3.25806 3.13502 3.25604 3.1619 3.25998 3.18836C3.26392 3.21481 3.27374 3.24032 3.28889 3.26344C3.33158 3.32864 3.47629 3.38795 3.60415 3.33798L3.60391 3.33778Z" />
                                <path d="M9.50334 9.46291V6.58418L10.8205 5.42492C10.8419 5.40607 10.8589 5.38369 10.8705 5.35904C10.8822 5.3344 10.8881 5.30799 10.8881 5.28131C10.8881 5.25463 10.8822 5.22822 10.8705 5.20357C10.8589 5.17893 10.8419 5.15654 10.8205 5.1377L9.8973 4.32518C9.87589 4.3063 9.85046 4.29132 9.82246 4.2811C9.79446 4.27089 9.76445 4.26562 9.73414 4.26562C9.70382 4.26562 9.67381 4.27089 9.64581 4.2811C9.61781 4.29132 9.59238 4.3063 9.57097 4.32518L8.25385 5.48444H5.21388L3.89676 4.32518C3.87534 4.3063 3.84991 4.29132 3.82191 4.2811C3.79391 4.27089 3.7639 4.26562 3.73359 4.26562C3.70328 4.26562 3.67326 4.27089 3.64527 4.2811C3.61727 4.29132 3.59183 4.3063 3.57042 4.32518L2.64726 5.1377C2.62581 5.15654 2.60879 5.17893 2.59718 5.20357C2.58557 5.22822 2.57959 5.25463 2.57959 5.28131C2.57959 5.30799 2.58557 5.3344 2.59718 5.35904C2.60879 5.38369 2.62581 5.40607 2.64726 5.42492L3.96438 6.58418V9.46291L2.64726 10.6222C2.62581 10.641 2.60879 10.6634 2.59718 10.688C2.58557 10.7127 2.57959 10.7391 2.57959 10.7658C2.57959 10.7925 2.58557 10.8189 2.59718 10.8435C2.60879 10.8682 2.62581 10.8905 2.64726 10.9094L3.57042 11.7219C3.59183 11.7408 3.61727 11.7558 3.64527 11.766C3.67326 11.7762 3.70328 11.7815 3.73359 11.7815C3.7639 11.7815 3.79391 11.7762 3.82191 11.766C3.84991 11.7558 3.87534 11.7408 3.89676 11.7219L5.21388 10.5627H8.25385L9.57097 11.7219C9.59235 11.7408 9.61777 11.7559 9.64578 11.7661C9.67378 11.7764 9.70381 11.7816 9.73414 11.7816C9.76446 11.7816 9.79449 11.7764 9.82249 11.7661C9.8505 11.7559 9.87592 11.7408 9.8973 11.7219L10.8205 10.9094C10.8419 10.8905 10.8589 10.8682 10.8705 10.8435C10.8822 10.8189 10.8881 10.7925 10.8881 10.7658C10.8881 10.7391 10.8822 10.7127 10.8705 10.688C10.8589 10.6634 10.8419 10.641 10.8205 10.6222L9.50334 9.46291ZM9.73414 11.2911L8.51256 10.2159C8.46929 10.1778 8.4106 10.1564 8.34939 10.1564H5.11833C5.08802 10.1564 5.058 10.1616 5.03 10.1718C5.002 10.182 4.97656 10.197 4.95516 10.2159L3.73359 11.2911L3.13676 10.7658L4.35834 9.69062C4.40162 9.65254 4.42595 9.60088 4.42596 9.54701V6.50008C4.42599 6.4734 4.42003 6.44698 4.40843 6.42234C4.39682 6.39769 4.3798 6.37531 4.35834 6.35647L3.13676 5.28131L3.73359 4.75602L4.95516 5.83118C4.99843 5.86927 5.05712 5.89068 5.11833 5.89069H8.34939C8.41055 5.89069 8.4694 5.86937 8.51256 5.83118L9.73414 4.75602L10.331 5.28131L9.10939 6.35647C9.0661 6.39455 9.04178 6.44621 9.04176 6.50008V9.54701C9.04176 9.60084 9.066 9.65264 9.10939 9.69062L10.331 10.7658L9.73414 11.2911Z" />
                                <path d="M8.11844 6.5H5.34895C5.28774 6.5 5.22904 6.5214 5.18576 6.55949C5.14248 6.59759 5.11816 6.64926 5.11816 6.70313V9.3438C5.11816 9.39767 5.14248 9.44934 5.18576 9.48743C5.22904 9.52553 5.28774 9.54693 5.34895 9.54693H7.19528C7.25649 9.54693 7.31519 9.52553 7.35847 9.48743C7.40175 9.44934 7.42607 9.39767 7.42607 9.3438C7.42607 9.28993 7.40175 9.23826 7.35847 9.20017C7.31519 9.16207 7.25649 9.14067 7.19528 9.14067H5.57974V6.90626H7.88765V8.53129C7.88765 8.58516 7.91196 8.63683 7.95524 8.67492C7.99853 8.71301 8.05723 8.73441 8.11844 8.73441C8.17965 8.73441 8.23835 8.71301 8.28163 8.67492C8.32491 8.63683 8.34923 8.58516 8.34923 8.53129V6.70313C8.34923 6.64926 8.32491 6.59759 8.28163 6.55949C8.23835 6.5214 8.17965 6.5 8.11844 6.5ZM11.1187 6.5C11.0575 6.5 10.9988 6.5214 10.9555 6.55949C10.9122 6.59759 10.8879 6.64926 10.8879 6.70313V8.53129C10.8879 8.58516 10.9122 8.63683 10.9555 8.67492C10.9988 8.71301 11.0575 8.73441 11.1187 8.73441C11.1799 8.73441 11.2386 8.71301 11.2819 8.67492C11.3252 8.63683 11.3495 8.58516 11.3495 8.53129V6.70313C11.3495 6.64926 11.3252 6.59759 11.2819 6.55949C11.2386 6.5214 11.1799 6.5 11.1187 6.5Z" />
                                <path d="M11.1187 9.54713C11.2462 9.54713 11.3495 9.45618 11.3495 9.344C11.3495 9.23181 11.2462 9.14087 11.1187 9.14087C10.9913 9.14087 10.8879 9.23181 10.8879 9.344C10.8879 9.45618 10.9913 9.54713 11.1187 9.54713Z" />
                              </g>
                            </svg>
                            Petrol + Gas
                          </li>
                          <li>
                            <svg
                              width={13}
                              height={13}
                              viewBox="0 0 13 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_611_143206"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={13}
                                height={13}
                              >
                                <rect width={13} height={13} />
                              </mask>
                              <g mask="url(#mask0_611_143206)">
                                <path d="M8.28713 6.95811H7.8187L8.04511 5.25406C8.05414 5.18229 8.0395 5.10942 8.00367 5.04772C7.96783 4.98603 7.91299 4.93928 7.84838 4.91536C7.71188 4.86288 7.56173 4.91605 7.49608 5.02788L5.69038 7.50535C5.65489 7.56344 5.63505 7.63066 5.63299 7.69979C5.63093 7.76892 5.64673 7.83733 5.67868 7.89767C5.74498 8.02486 5.87281 8.10369 6.01256 8.10369H6.481L6.25458 9.80774C6.24555 9.87951 6.26019 9.95238 6.29602 10.0141C6.33186 10.0758 6.3867 10.1225 6.45131 10.1464C6.48728 10.1604 6.52433 10.1668 6.56051 10.1668C6.66148 10.1668 6.7553 10.1162 6.80361 10.0339L8.60931 7.55645C8.6448 7.49836 8.66464 7.43113 8.6667 7.36201C8.66876 7.29288 8.65297 7.22446 8.62101 7.16412C8.58787 7.10133 8.53941 7.0491 8.48068 7.01286C8.42196 6.97663 8.35512 6.95772 8.28713 6.95811ZM6.75226 9.35537L6.94488 7.90684C6.94922 7.87436 6.94692 7.84127 6.93813 7.80981C6.92934 7.77836 6.91427 7.74926 6.89394 7.7245C6.8736 7.69973 6.84848 7.67987 6.82026 7.66626C6.79204 7.65264 6.76139 7.6456 6.73038 7.64559H6.13433L7.54743 5.70665L7.35481 7.15519C7.35047 7.18767 7.35277 7.22075 7.36156 7.25221C7.37035 7.28367 7.38542 7.31276 7.40575 7.33753C7.42609 7.36229 7.45121 7.38215 7.47943 7.39577C7.50765 7.40938 7.5383 7.41643 7.56931 7.41643H8.16536L6.75226 9.35537Z" />
                                <path d="M12.35 4.89575H11.9167C11.5583 4.89575 11.2667 5.2042 11.2667 5.58324V6.27072H10.8333V4.20827C10.8333 3.70274 10.4446 3.29162 9.96667 3.29162H8.88333V2.83329H10.1833C10.5417 2.83329 10.8333 2.52484 10.8333 2.14581V1.68749C10.8333 1.30845 10.5417 1 10.1833 1H5.85C5.49163 1 5.2 1.30845 5.2 1.68749V2.14581C5.2 2.52484 5.49163 2.83329 5.85 2.83329H7.15V3.29162H5.86863C5.66627 3.29162 5.46932 3.36701 5.31397 3.50405L4.37515 4.3311C4.29737 4.39972 4.19932 4.43735 4.09803 4.43743H3.03333C2.55537 4.43743 2.16667 4.84854 2.16667 5.35408V6.27072H1.73333V4.89575C1.73333 4.51672 1.4417 4.20827 1.08333 4.20827H0.65C0.291633 4.20827 0 4.51672 0 4.89575V9.47899C0 9.85802 0.291633 10.1665 0.65 10.1665H1.08333C1.4417 10.1665 1.73333 9.85802 1.73333 9.47899V8.10402H2.16667V9.47899C2.16667 9.98452 2.55537 10.3956 3.03333 10.3956H3.73945C3.89458 10.3956 4.03888 10.4841 4.11558 10.6266L4.60807 11.5378C4.68391 11.6781 4.79344 11.7947 4.92557 11.8759C5.0577 11.957 5.20775 11.9998 5.36055 12H9.22892C9.35599 12.0002 9.48154 11.9707 9.59662 11.9137C9.7117 11.8567 9.81349 11.7736 9.89473 11.6702L10.6325 10.7339C10.7622 10.569 10.8332 10.3614 10.8333 10.147V8.10425H11.2667V8.79173C11.2667 9.17077 11.5583 9.47922 11.9167 9.47922H12.35C12.7084 9.47922 13 9.17077 13 8.79173V5.58347C13 5.20443 12.7084 4.89575 12.35 4.89575ZM1.3 9.47899C1.3 9.53977 1.27717 9.59805 1.23654 9.64103C1.19591 9.68401 1.1408 9.70815 1.08333 9.70815H0.65C0.592536 9.70815 0.537426 9.68401 0.496794 9.64103C0.456161 9.59805 0.433333 9.53977 0.433333 9.47899V4.89575C0.433333 4.83497 0.456161 4.77669 0.496794 4.73371C0.537426 4.69073 0.592536 4.66659 0.65 4.66659H1.08333C1.1408 4.66659 1.19591 4.69073 1.23654 4.73371C1.27717 4.77669 1.3 4.83497 1.3 4.89575V9.47899ZM1.73333 7.64569V6.72905H2.16667V7.64569H1.73333ZM5.63333 2.14581V1.68749C5.63333 1.62671 5.65616 1.56842 5.69679 1.52544C5.73743 1.48247 5.79254 1.45832 5.85 1.45832H10.1833C10.2408 1.45832 10.2959 1.48247 10.3365 1.52544C10.3772 1.56842 10.4 1.62671 10.4 1.68749V2.14581C10.4 2.20659 10.3772 2.26488 10.3365 2.30785C10.2959 2.35083 10.2408 2.37497 10.1833 2.37497H5.85C5.79254 2.37497 5.73743 2.35083 5.69679 2.30785C5.65616 2.26488 5.63333 2.20659 5.63333 2.14581ZM7.58333 2.83329H8.45V3.29162H7.58333V2.83329ZM10.4 10.1468C10.4 10.2538 10.3643 10.3578 10.2995 10.4401L9.56193 11.3764C9.52126 11.4281 9.47034 11.4697 9.41279 11.4982C9.35524 11.5267 9.29247 11.5415 9.22892 11.5414H5.36055C5.28417 11.5414 5.20916 11.52 5.14311 11.4794C5.07706 11.4389 5.02232 11.3806 4.98442 11.3105L4.49193 10.3993C4.41609 10.259 4.30656 10.1424 4.17443 10.0612C4.0423 9.98006 3.89225 9.93724 3.73945 9.93708H3.03333C2.79435 9.93708 2.6 9.73153 2.6 9.47876V5.35385C2.6 5.10108 2.79435 4.89552 3.03333 4.89552H4.09803C4.3004 4.89552 4.49735 4.82013 4.6527 4.68309L5.59152 3.85604C5.66929 3.78742 5.76735 3.7498 5.86863 3.74971H9.96667C10.2057 3.74971 10.4 3.95527 10.4 4.20804V10.1465V10.1468ZM10.8333 7.64569V6.72905H11.2667V7.64569H10.8333ZM12.5667 8.7915C12.5667 8.85228 12.5438 8.91057 12.5032 8.95355C12.4626 8.99652 12.4075 9.02067 12.35 9.02067H11.9167C11.8592 9.02067 11.8041 8.99652 11.7635 8.95355C11.7228 8.91057 11.7 8.85228 11.7 8.7915V5.58324C11.7 5.52246 11.7228 5.46417 11.7635 5.4212C11.8041 5.37822 11.8592 5.35408 11.9167 5.35408H12.35C12.4075 5.35408 12.4626 5.37822 12.5032 5.4212C12.5438 5.46417 12.5667 5.52246 12.5667 5.58324V8.7915Z" />
                              </g>
                            </svg>
                            Electric
                          </li>
                        </ul>
                        <div className="content-btm">
                          <Link legacyBehavior href="/car-deatils">
                            <a className="view-btn2">
                              <svg
                                width={35}
                                height={21}
                                viewBox="0 0 35 21"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                  strokeLinecap="round"
                                />
                                <path d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z"
                                />
                                <path d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                              </svg>
                              View Details
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay="400ms">
            <div className="col-lg-12 divider">
              <div className="slider-btn-group style-2 justify-content-md-between justify-content-center">
                <div className="slider-btn prev-2 d-md-flex d-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                  >
                    <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
                  </svg>
                </div>
                <div className="view-btn-area">
                  <p>There will be 100+ Similar Car</p>
                  <Link legacyBehavior href="/single-brand-category">
                    <a className="view-btn">View More</a>
                  </Link>
                </div>
                <div className="slider-btn next-2 d-md-flex d-none">
                  <svg
                    width={11}
                    height={19}
                    viewBox="0 0 8 13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="customar-feedback-area mb-100">
        <div className="container">
          <div className="row mb-60 wow fadeInUp" data-wow-delay="200ms">
            <div className="col-lg-12">
              <div className="section-title1">
                <span>Customer Feedback</span>
                <h2>What Our Customers Are Saying</h2>
              </div>
            </div>
          </div>
          <div className="row g-4 mb-100">
            <div className="col-lg-3 wow fadeInUp" data-wow-delay="200ms">
              <div className="customer-feedback-left">
                <a href="#" className="trustpilot">
                  <h5>Excellent!</h5>
                  <Image
                    className="star"
                    src="/assets/img/home1/icon/trustpilot-star3.svg"
                    width={50}
                    height={50}
                    alt="star icon"
                  />
                  <span>
                    Based On <strong>2348</strong> Reviews
                  </span>
                  <Image
                    className="logo"
                    src="/assets/img/home1/icon/trustpilot-log3.svg"
                    width={50}
                    height={50}
                    alt="icon"
                  />
                </a>
                <a href="#" className="google">
                  <img
                    className="logo"
                    src="assets/img/home1/icon/google3.svg"
                    alt=""
                  />
                  <div className="star">
                    <ul>
                      <li className="active">
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li className>
                        <i className="bi bi-star-half" />
                      </li>
                    </ul>
                  </div>
                  <span>
                    Based On <strong>1448</strong> Reviews
                  </span>
                </a>
              </div>
            </div>
            <div className="col-lg-9 wow fadeInUp" data-wow-delay="200ms">
              <div className="customer-feedback-right">
                <Swiper
                  {...slideSettings}
                  className="swiper customer-feedback-slider mb-40"
                >
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div className="feedback-card">
                        <div className="feedback-top">
                          <div className="stat-area">
                            <div className="star">
                              <ul>
                                <li className="active">
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li className>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </div>
                            <span>Great Services!</span>
                          </div>
                          <div className="logo">
                            <Image
                              src="/assets/img/home1/icon/google3.svg"
                              width={50}
                              height={50}
                              alt="google icon"
                            />
                          </div>
                        </div>
                        <p>
                          Drivco-Agency to the actively encourage customers to
                          leave reviews to the help promote their products and
                          services.”
                        </p>
                        <div className="author-name">
                          <h6>Nowry Jahan</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="feedback-card">
                        <div className="feedback-top">
                          <div className="stat-area">
                            <Image
                              src="/assets/img/home1/icon/trustpilot-star.svg"
                              width={50}
                              height={50}
                              alt="star icon"
                            />
                            <span>Trusted Company</span>
                          </div>
                          <div className="logo">
                            <Image
                              src="/assets/img/home1/icon/trustpilot-log3.svg"
                              width={50}
                              height={50}
                              alt="icon"
                            />
                          </div>
                        </div>
                        <p>
                          Drivco-Agency customer feedback is an invaluable
                          source of information that can help businesses improve
                          their offerings and provide better experiences.
                        </p>
                        <div className="author-name">
                          <h6>Jhon Abraham</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="feedback-card">
                        <div className="feedback-top">
                          <div className="stat-area">
                            <div className="star">
                              <ul>
                                <li className="active">
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li className>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </div>
                            <span>Great Services!</span>
                          </div>
                          <div className="logo">
                            <img
                              src="/assets/img/home1/icon/google3.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <p>
                          Drivco-Agency to the actively encourage customers to
                          leave reviews to the help promote their products and
                          services.”
                        </p>
                        <div className="author-name">
                          <h6>Nowry Jahan</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="feedback-card">
                        <div className="feedback-top">
                          <div className="stat-area">
                            <Image
                              src="/assets/img/home1/icon/trustpilot-star.svg"
                              width={50}
                              height={50}
                              alt="star icon"
                            />
                            <span>Trusted Company</span>
                          </div>
                          <div className="logo">
                            <Image
                              src="/assets/img/home1/icon/trustpilot-log3.svg"
                              width={50}
                              height={50}
                              alt="icon"
                            />
                          </div>
                        </div>
                        <p>
                          Drivco-Agency customer feedback is an invaluable
                          source of information that can help businesses improve
                          their offerings and provide better experiences.
                        </p>
                        <div className="author-name">
                          <h6>Jhon Abraham</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                </Swiper>
                <div className="row ">
                  <div className="col-lg-12 divider">
                    <div className="slider-btn-group style-2 justify-content-md-between justify-content-center">
                      <div className="slider-btn prev-4 d-md-flex d-none pb-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="20"
                        >
                          <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
                        </svg>
                      </div>
                      <div className="view-btn-area">
                        <p>Thousand of People Reviews to Us</p>
                        <Link legacyBehavior href="/customer-review">
                          <a className="view-btn">View All Review</a>
                        </Link>
                      </div>
                      <div className="slider-btn next-4 d-md-flex d-none pb-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="20"
                        >
                          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay="400ms">
            <div className="col-lg-12">
              <div className="sub-title">
                <h6>Our Trusted Partners</h6>
                <div className="dash" />
              </div>
              <div className="partner-slider">
                <h2 className="marquee_text2">
                  <Marquee autoFill="true">
                    <Image
                      src="/assets/img/home1/company-logo-01.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-02.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-03.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-04.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-05.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-06.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-01.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-02.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-03.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-04.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-05.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-06.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-01.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-02.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-03.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-04.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-05.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-06.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-01.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-02.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-03.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-04.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-05.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                    <Image
                      src="/assets/img/home1/company-logo-06.png"
                      width={50}
                      height={50}
                      alt="company logo"
                    />
                  </Marquee>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Ad728x90 dataAdSlot="5962627056" />

      <div className="news-section two pt-90 pb-90">
        <div className="container">
          <div className="row mb-50 wow fadeInUp" data-wow-delay="200ms">
            <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
              <div className="section-title-2">
                <h2>Latest Car Advice</h2>
                <p>
                  Here are some of the featured cars in different categories
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="200ms"
            >
              <div className="news-card style-2">
                <div className="news-img">
                  <Link legacyBehavior href="/blog-details">
                    <a>
                      <img src="/assets/img/home1/news-01.png" alt="" />
                    </a>
                  </Link>
                  <div className="date">
                    <Link legacyBehavior href="/blog-standard">
                      <a>Buying Advice</a>
                    </Link>
                  </div>
                </div>
                <div className="content">
                  <h6>
                    <Link legacyBehavior href="/blog-details">
                      <a>
                        The Car Enthusiast: Exploring the World of Cars and
                        Driving.
                      </a>
                    </Link>
                  </h6>
                  <div className="news-btm d-flex align-items-center justify-content-between">
                    <div className="author-area">
                      <div className="author-img">
                        <Image
                          src="/assets/img/home1/author-01.png"
                          width={50}
                          height={50}
                          alt="author"
                        />
                      </div>
                      <div className="author-content">
                        <h6>Mr. Morris Mannu</h6>
                        <Link legacyBehavior href="/blog-standard">
                          <a>Posted on - 03 April, 2023</a>
                        </Link>
                      </div>
                    </div>
                    <div className="social-area">
                      <ul className="social-icons">
                        <li>
                          <a href="https://www.facebook.com/">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.pinterest.com/">
                            <i className="bx bxl-pinterest-alt" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                      </ul>
                      <div className="share-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={13}
                          viewBox="0 0 12 13"
                        >
                          <path d="M10.125 0.750223C9.82667 0.750223 9.54052 0.868748 9.32955 1.07972C9.11857 1.2907 9.00005 1.57684 9.00005 1.8752C9.00005 2.17357 9.11857 2.45971 9.32955 2.67069C9.54052 2.88166 9.82667 3.00019 10.125 3.00019C10.4234 3.00019 10.7095 2.88166 10.9205 2.67069C11.1315 2.45971 11.25 2.17357 11.25 1.8752C11.25 1.57684 11.1315 1.2907 10.9205 1.07972C10.7095 0.868748 10.4234 0.750223 10.125 0.750223ZM8.25006 1.8752C8.25001 1.43529 8.40464 1.00936 8.68691 0.671933C8.96917 0.33451 9.3611 0.107081 9.79411 0.0294379C10.2271 -0.0482056 10.6736 0.0288801 11.0556 0.247208C11.4375 0.465536 11.7305 0.811204 11.8833 1.22373C12.0361 1.63626 12.0389 2.08939 11.8914 2.50382C11.7439 2.91826 11.4553 3.26762 11.0762 3.49078C10.6971 3.71395 10.2515 3.7967 9.81758 3.72456C9.38362 3.65243 8.98883 3.42999 8.7023 3.09618L3.66389 5.43615C3.77972 5.80322 3.77972 6.19705 3.66389 6.56413L8.7023 8.90409C9.00518 8.55184 9.42804 8.32458 9.88893 8.26634C10.3498 8.2081 10.8159 8.32303 11.1969 8.58886C11.5779 8.85469 11.8466 9.25249 11.951 9.70517C12.0554 10.1578 11.988 10.6332 11.7619 11.039C11.5359 11.4448 11.1672 11.7523 10.7273 11.9018C10.2875 12.0512 9.8078 12.0321 9.38125 11.8481C8.9547 11.6641 8.61165 11.3282 8.4186 10.9057C8.22554 10.4832 8.19621 10.004 8.33631 9.56108L3.29789 7.22112C3.04847 7.51179 2.71602 7.7191 2.34524 7.81517C1.97447 7.91124 1.58317 7.89145 1.22398 7.75847C0.864793 7.62548 0.554947 7.38569 0.336124 7.07133C0.117301 6.75698 0 6.38315 0 6.00014C0 5.61712 0.117301 5.24329 0.336124 4.92894C0.554947 4.61459 0.864793 4.37479 1.22398 4.24181C1.58317 4.10882 1.97447 4.08903 2.34524 4.1851C2.71602 4.28117 3.04847 4.48848 3.29789 4.77916L8.33631 2.4392C8.27896 2.2567 8.24987 2.0665 8.25006 1.8752ZM1.87517 4.87515C1.5768 4.87515 1.29066 4.99368 1.07969 5.20465C0.868711 5.41563 0.750187 5.70177 0.750187 6.00014C0.750187 6.2985 0.868711 6.58464 1.07969 6.79562C1.29066 7.00659 1.5768 7.12512 1.87517 7.12512C2.17353 7.12512 2.45968 7.00659 2.67065 6.79562C2.88162 6.58464 3.00015 6.2985 3.00015 6.00014C3.00015 5.70177 2.88162 5.41563 2.67065 5.20465C2.45968 4.99368 2.17353 4.87515 1.87517 4.87515ZM10.125 9.00009C9.82667 9.00009 9.54052 9.11861 9.32955 9.32959C9.11857 9.54056 9.00005 9.8267 9.00005 10.1251C9.00005 10.4234 9.11857 10.7096 9.32955 10.9205C9.54052 11.1315 9.82667 11.25 10.125 11.25C10.4234 11.25 10.7095 11.1315 10.9205 10.9205C11.1315 10.7096 11.25 10.4234 11.25 10.1251C11.25 9.8267 11.1315 9.54056 10.9205 9.32959C10.7095 9.11861 10.4234 9.00009 10.125 9.00009Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="news-card style-2">
                <div className="news-img">
                  <Link legacyBehavior href="/blog-details">
                    <a>
                      <img src="/assets/img/home1/news-02.png" alt="" />
                    </a>
                  </Link>
                  <div className="date">
                    <Link legacyBehavior href="/blog-standard">
                      <a>Car Advice</a>
                    </Link>
                  </div>
                </div>
                <div className="content">
                  <h6>
                    <Link legacyBehavior href="/blog-details">
                      <a>
                        The Best Car Brands for Performance and Reliability.
                      </a>
                    </Link>
                  </h6>
                  <div className="news-btm d-flex align-items-center justify-content-between">
                    <div className="author-area">
                      <div className="author-img">
                        <Image
                          src="/assets/img/home1/author-02.png"
                          width={50}
                          height={50}
                          alt="author"
                        />
                      </div>
                      <div className="author-content">
                        <h6>Mulish Kary</h6>
                        <Link legacyBehavior href="/blog-standard">
                          <a>Posted on - 03 April, 2023</a>
                        </Link>
                      </div>
                    </div>
                    <div className="social-area">
                      <ul className="social-icons">
                        <li>
                          <a href="https://www.facebook.com/">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.pinterest.com/">
                            <i className="bx bxl-pinterest-alt" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                      </ul>
                      <div className="share-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={13}
                          viewBox="0 0 12 13"
                        >
                          <path d="M10.125 0.750223C9.82667 0.750223 9.54052 0.868748 9.32955 1.07972C9.11857 1.2907 9.00005 1.57684 9.00005 1.8752C9.00005 2.17357 9.11857 2.45971 9.32955 2.67069C9.54052 2.88166 9.82667 3.00019 10.125 3.00019C10.4234 3.00019 10.7095 2.88166 10.9205 2.67069C11.1315 2.45971 11.25 2.17357 11.25 1.8752C11.25 1.57684 11.1315 1.2907 10.9205 1.07972C10.7095 0.868748 10.4234 0.750223 10.125 0.750223ZM8.25006 1.8752C8.25001 1.43529 8.40464 1.00936 8.68691 0.671933C8.96917 0.33451 9.3611 0.107081 9.79411 0.0294379C10.2271 -0.0482056 10.6736 0.0288801 11.0556 0.247208C11.4375 0.465536 11.7305 0.811204 11.8833 1.22373C12.0361 1.63626 12.0389 2.08939 11.8914 2.50382C11.7439 2.91826 11.4553 3.26762 11.0762 3.49078C10.6971 3.71395 10.2515 3.7967 9.81758 3.72456C9.38362 3.65243 8.98883 3.42999 8.7023 3.09618L3.66389 5.43615C3.77972 5.80322 3.77972 6.19705 3.66389 6.56413L8.7023 8.90409C9.00518 8.55184 9.42804 8.32458 9.88893 8.26634C10.3498 8.2081 10.8159 8.32303 11.1969 8.58886C11.5779 8.85469 11.8466 9.25249 11.951 9.70517C12.0554 10.1578 11.988 10.6332 11.7619 11.039C11.5359 11.4448 11.1672 11.7523 10.7273 11.9018C10.2875 12.0512 9.8078 12.0321 9.38125 11.8481C8.9547 11.6641 8.61165 11.3282 8.4186 10.9057C8.22554 10.4832 8.19621 10.004 8.33631 9.56108L3.29789 7.22112C3.04847 7.51179 2.71602 7.7191 2.34524 7.81517C1.97447 7.91124 1.58317 7.89145 1.22398 7.75847C0.864793 7.62548 0.554947 7.38569 0.336124 7.07133C0.117301 6.75698 0 6.38315 0 6.00014C0 5.61712 0.117301 5.24329 0.336124 4.92894C0.554947 4.61459 0.864793 4.37479 1.22398 4.24181C1.58317 4.10882 1.97447 4.08903 2.34524 4.1851C2.71602 4.28117 3.04847 4.48848 3.29789 4.77916L8.33631 2.4392C8.27896 2.2567 8.24987 2.0665 8.25006 1.8752ZM1.87517 4.87515C1.5768 4.87515 1.29066 4.99368 1.07969 5.20465C0.868711 5.41563 0.750187 5.70177 0.750187 6.00014C0.750187 6.2985 0.868711 6.58464 1.07969 6.79562C1.29066 7.00659 1.5768 7.12512 1.87517 7.12512C2.17353 7.12512 2.45968 7.00659 2.67065 6.79562C2.88162 6.58464 3.00015 6.2985 3.00015 6.00014C3.00015 5.70177 2.88162 5.41563 2.67065 5.20465C2.45968 4.99368 2.17353 4.87515 1.87517 4.87515ZM10.125 9.00009C9.82667 9.00009 9.54052 9.11861 9.32955 9.32959C9.11857 9.54056 9.00005 9.8267 9.00005 10.1251C9.00005 10.4234 9.11857 10.7096 9.32955 10.9205C9.54052 11.1315 9.82667 11.25 10.125 11.25C10.4234 11.25 10.7095 11.1315 10.9205 10.9205C11.1315 10.7096 11.25 10.4234 11.25 10.1251C11.25 9.8267 11.1315 9.54056 10.9205 9.32959C10.7095 9.11861 10.4234 9.00009 10.125 9.00009Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="400ms"
            >
              <div className="news-card style-2">
                <div className="news-img">
                  <Link legacyBehavior href="/blog-details">
                    <a>
                      <img src="assets/img/home1/news-03.png" alt="" />
                    </a>
                  </Link>
                  <div className="date">
                    <Link legacyBehavior href="/blog-standard">
                      <a>Driving Advice</a>
                    </Link>
                  </div>
                </div>
                <div className="content">
                  <h6>
                    <Link legacyBehavior href="/blog-details">
                      <a>
                        The Environmental Impact of Cars and How to Minimize It.
                      </a>
                    </Link>
                  </h6>
                  <div className="news-btm d-flex align-items-center justify-content-between">
                    <div className="author-area">
                      <div className="author-img">
                        <Image
                          src="/assets/img/home1/author-03.png"
                          width={50}
                          height={50}
                          alt="author"
                        />
                      </div>
                      <div className="author-content">
                        <h6>Daniel Scoot</h6>
                        <Link legacyBehavior href="/blog-standard">
                          <a>Posted on - 03 April, 2023</a>
                        </Link>
                      </div>
                    </div>
                    <div className="social-area">
                      <ul className="social-icons">
                        <li>
                          <a href="https://www.facebook.com/">
                            <i className="bx bxl-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">
                            <i className="bx bxl-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.pinterest.com/">
                            <i className="bx bxl-pinterest-alt" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/">
                            <i className="bx bxl-instagram" />
                          </a>
                        </li>
                      </ul>
                      <div className="share-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={13}
                          viewBox="0 0 12 13"
                        >
                          <path d="M10.125 0.750223C9.82667 0.750223 9.54052 0.868748 9.32955 1.07972C9.11857 1.2907 9.00005 1.57684 9.00005 1.8752C9.00005 2.17357 9.11857 2.45971 9.32955 2.67069C9.54052 2.88166 9.82667 3.00019 10.125 3.00019C10.4234 3.00019 10.7095 2.88166 10.9205 2.67069C11.1315 2.45971 11.25 2.17357 11.25 1.8752C11.25 1.57684 11.1315 1.2907 10.9205 1.07972C10.7095 0.868748 10.4234 0.750223 10.125 0.750223ZM8.25006 1.8752C8.25001 1.43529 8.40464 1.00936 8.68691 0.671933C8.96917 0.33451 9.3611 0.107081 9.79411 0.0294379C10.2271 -0.0482056 10.6736 0.0288801 11.0556 0.247208C11.4375 0.465536 11.7305 0.811204 11.8833 1.22373C12.0361 1.63626 12.0389 2.08939 11.8914 2.50382C11.7439 2.91826 11.4553 3.26762 11.0762 3.49078C10.6971 3.71395 10.2515 3.7967 9.81758 3.72456C9.38362 3.65243 8.98883 3.42999 8.7023 3.09618L3.66389 5.43615C3.77972 5.80322 3.77972 6.19705 3.66389 6.56413L8.7023 8.90409C9.00518 8.55184 9.42804 8.32458 9.88893 8.26634C10.3498 8.2081 10.8159 8.32303 11.1969 8.58886C11.5779 8.85469 11.8466 9.25249 11.951 9.70517C12.0554 10.1578 11.988 10.6332 11.7619 11.039C11.5359 11.4448 11.1672 11.7523 10.7273 11.9018C10.2875 12.0512 9.8078 12.0321 9.38125 11.8481C8.9547 11.6641 8.61165 11.3282 8.4186 10.9057C8.22554 10.4832 8.19621 10.004 8.33631 9.56108L3.29789 7.22112C3.04847 7.51179 2.71602 7.7191 2.34524 7.81517C1.97447 7.91124 1.58317 7.89145 1.22398 7.75847C0.864793 7.62548 0.554947 7.38569 0.336124 7.07133C0.117301 6.75698 0 6.38315 0 6.00014C0 5.61712 0.117301 5.24329 0.336124 4.92894C0.554947 4.61459 0.864793 4.37479 1.22398 4.24181C1.58317 4.10882 1.97447 4.08903 2.34524 4.1851C2.71602 4.28117 3.04847 4.48848 3.29789 4.77916L8.33631 2.4392C8.27896 2.2567 8.24987 2.0665 8.25006 1.8752ZM1.87517 4.87515C1.5768 4.87515 1.29066 4.99368 1.07969 5.20465C0.868711 5.41563 0.750187 5.70177 0.750187 6.00014C0.750187 6.2985 0.868711 6.58464 1.07969 6.79562C1.29066 7.00659 1.5768 7.12512 1.87517 7.12512C2.17353 7.12512 2.45968 7.00659 2.67065 6.79562C2.88162 6.58464 3.00015 6.2985 3.00015 6.00014C3.00015 5.70177 2.88162 5.41563 2.67065 5.20465C2.45968 4.99368 2.17353 4.87515 1.87517 4.87515ZM10.125 9.00009C9.82667 9.00009 9.54052 9.11861 9.32955 9.32959C9.11857 9.54056 9.00005 9.8267 9.00005 10.1251C9.00005 10.4234 9.11857 10.7096 9.32955 10.9205C9.54052 11.1315 9.82667 11.25 10.125 11.25C10.4234 11.25 10.7095 11.1315 10.9205 10.9205C11.1315 10.7096 11.25 10.4234 11.25 10.1251C11.25 9.8267 11.1315 9.54056 10.9205 9.32959C10.7095 9.11861 10.4234 9.00009 10.125 9.00009Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
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

  console.log(context, "contextcontext");

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
  try {
    const models = await client.query({
      query: gql`
        query carModels($modelSlug: String!) {
          carModels(
            filters: {
              slug: { eq: $modelSlug }
              car_trims: { highTrim: { eq: true }, year: { eq: 2023 } }
            }
          ) {
            data {
              id
              attributes {
                name
                year
                slug
                car_brands {
                  data {
                    id
                    attributes {
                      name
                      slug
                      brandLogo {
                        data {
                          id
                          attributes {
                            name
                            url
                          }
                        }
                      }
                    }
                  }
                }
                isFeatured
                isElectric
                featuredImage {
                  data {
                    id
                    attributes {
                      name
                      url
                    }
                  }
                }
                car_trims(
                  filters: { highTrim: { eq: true }, year: { eq: 2023 } }
                ) {
                  data {
                    id
                    attributes {
                      name
                      metaTitle
                      mainSlug
                      description
                      car_brands {
                        data {
                          id
                          attributes {
                            name
                            brandLogo {
                              data {
                                id
                                attributes {
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                      car_models {
                        data {
                          id
                          attributes {
                            name
                          }
                        }
                      }
                      year
                      price
                      featuredImage {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      gallery_images {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      engine
                      displacement
                      power
                      torque
                      transmission
                      gearBox
                      drive
                      fuelType
                      motor
                      motorType
                      batteryCapacity
                      chargingTime
                      batteryWarranty
                      range
                      zeroToHundred
                      topSpeed
                      fuelConsumption
                      cylinders
                      haveABS
                      haveFrontAirbags
                      haveSideAirbags
                      haveRearAirbags
                      haveFrontParkAssist
                      haveRearParkAssist
                      haveRearParkingCamera
                      have360ParkingCamera
                      haveCruiseControl
                      haveAdaptiveCruiseControl
                      haveLaneChangeAssist
                      car_body_types {
                        data {
                          id
                          attributes {
                            name
                          }
                        }
                      }
                      airbags
                      doors
                      frontBrakes
                      rearBrakes
                      length
                      width
                      height
                      wheelbase
                      weight
                      wheels
                      tyresFront
                      tyresRear
                      seatingCapacity
                      haveLeatherInterior
                      haveFabricInterior
                      haveAppleCarPlay
                      haveAndroidAuto
                      haveRearSeatEntertainment
                      haveCooledSeats
                      haveClimateControl
                      isLuxury
                      isPremiumLuxury
                      isSafety
                      isFuelEfficient
                      isOffRoad
                      haveMusic
                      haveTechnology
                      havePerformance
                      isSpacious
                      isElectric
                      isDiscontinued
                      slug
                      fuelTankSize
                      cargoSpace
                      highTrim
                    }
                  }
                }
              }
            }
            meta {
              pagination {
                page
                pageSize
                pageCount
                total
              }
            }
          }
        }
      `,
      variables: {
        modelSlug,
      },
    });

    const trimList = await client.query({
      query: gql`
        query carModels($modelSlug: String!) {
          carModels(
            filters: {
              slug: { eq: $modelSlug }
              car_trims: { highTrim: { eq: true }, year: { eq: 2023 } }
            }
          ) {
            data {
              id
              attributes {
                name
                year
                slug
                car_brands {
                  data {
                    id
                    attributes {
                      name
                      slug
                    }
                  }
                }

                car_trims(filters: { year: { eq: 2023 } }) {
                  data {
                    id
                    attributes {
                      name
                      car_brands {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
                        }
                      }
                      car_models {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
                        }
                      }
                      year
                      price
                      featuredImage {
                        data {
                          attributes {
                            url
                          }
                        }
                      }

                      engine
                      displacement
                      power
                      torque
                      transmission
                      gearBox
                      drive
                      fuelType
                      motor
                      motorType
                      batteryCapacity
                      chargingTime
                      batteryWarranty
                      range
                      zeroToHundred
                      topSpeed
                      fuelConsumption
                      cylinders
                      haveABS
                      haveFrontAirbags
                      haveSideAirbags
                      haveRearAirbags
                      haveFrontParkAssist
                      haveRearParkAssist
                      haveRearParkingCamera
                      have360ParkingCamera
                      haveCruiseControl
                      haveAdaptiveCruiseControl
                      haveLaneChangeAssist
                      car_body_types {
                        data {
                          id
                          attributes {
                            name
                          }
                        }
                      }
                      airbags
                      doors
                      frontBrakes
                      rearBrakes
                      length
                      width
                      height
                      wheelbase
                      weight
                      wheels
                      tyresFront
                      tyresRear
                      seatingCapacity
                      haveLeatherInterior
                      haveFabricInterior
                      haveAppleCarPlay
                      haveAndroidAuto
                      haveRearSeatEntertainment
                      haveCooledSeats
                      haveClimateControl
                      isLuxury
                      isPremiumLuxury
                      isSafety
                      isFuelEfficient
                      isOffRoad
                      haveMusic
                      haveTechnology
                      havePerformance
                      isSpacious
                      isElectric
                      isDiscontinued
                      slug
                      fuelTankSize
                      cargoSpace
                      highTrim
                    }
                  }
                }
              }
            }
            meta {
              pagination {
                page
                pageSize
                pageCount
                total
              }
            }
          }
        }
      `,
      variables: {
        modelSlug,
      },
    });

    console.log(models, "models");

    return {
      props: {
        model: models?.data?.carModels?.data[0]?.attributes,
        trimList:
          trimList?.data?.carModels?.data[0]?.attributes?.car_trims?.data,
      },
    };
  } catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    return {
      props: {
        error: true,
        errorMessage: error.message,
      },
    };
  }
}
