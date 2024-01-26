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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert('Link copied to clipboard!');
  };

  const currentURL = typeof window !== 'undefined' ? window.location.href : '';
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

      <div className="car-details-area mt-15 ">
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
           
                  <div className="shareBtn" onClick={handleCopyLink}>
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
               
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-8">
              <ModelDescription model={trimList} hightTrim={trim} />
              <VariantsListing model={trimList} highTrim={trim} />
              <VehicleFaq model={trimList} highTrim={trim} />

            </div>
            <div className="col-lg-4">
              <div className="car-details-sidebar positionStickyAd">
              
                <div
                  className="contact-info mb-50"
                  style={{ backgroundColor: "rosybrown" }}
                >
                  <Ad300x250 dataAdSlot="5772723668" />
                </div>
                </div>
                </div>
               </div>
               </div>
               </div>
      <Ad728x90 dataAdSlot="5962627056" />

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
