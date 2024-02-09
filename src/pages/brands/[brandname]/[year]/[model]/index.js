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
import OldModel from "@/src/components/details/OldModel";
import axios from "axios";
import Ad300x600 from "@/src/components/ads/Ad300x600";
import ModelVehicleGallery from "@/src/components/trim-details/ModelVehicleGallery";

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function CarDeatilsPage({ oldModel, currentmodel }) {
  console.log(currentmodel, "currentmodel");

  const mainTrim = currentmodel?.highTrim[0];

  console.log(mainTrim,"mainTrimmainTrim");
  const allTrims = currentmodel?.trims;
  const minPower = currentmodel?.power?.min;
  const maxPower = currentmodel?.power?.max;
  const minPrice = currentmodel?.price?.min;
  const maxPrice = currentmodel?.price?.max;
  const minTorque = currentmodel?.torque?.min;
  const maxTorque = currentmodel?.torque?.max;
  const minFuelConsumption = currentmodel?.fuelConsumption?.min;
  const maxFuelConsumption = currentmodel?.fuelConsumption?.max;

  const engines = currentmodel?.engines;
  const brand = currentmodel?.brand;
  const model = { name: currentmodel?.name, slug: currentmodel?.slug };
  const year = currentmodel?.highTrim[0]?.year;
  const mainTrimFuelType = mainTrim?.fuelType;
  const motorTypes = currentmodel?.motors
    ?.join(", ")
    .replace(/,([^,]*)$/, " or$1");
  const engineTypes = engines?.join(", ").replace(/,([^,]*)$/, " or$1");
  const cylinderList = currentmodel?.cylinders.join(", ");
  const transmissionList = currentmodel?.transmissionList
    .join(", ")
    .replace(/,([^,]*)$/, " or$1");
  const seatList = currentmodel?.seats.join(", ");

  console.log(
    "Minimum power:",
    minPower,
    "Maximum power:",
    maxPower,
    "Minimum price:",
    minPrice,
    "Maximum price:",
    maxPrice,
    "Minimum torque:",
    minTorque,
    "Maximum torque:",
    maxTorque,
    "Minimum fuel consumption:",
    minFuelConsumption,
    "Maximum fuel consumption:",
    maxFuelConsumption
  );

  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const t = useTranslate();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };

  // const currentURL = typeof window !== "undefined" ? window.location.href : "";
  const CarPriceRange = () => {
    // Format price for display
    const formatPrice = (price) => {
      return price?.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };
  
    let priceInfo;
    if (minPrice === null || maxPrice === null) {
      // If either min or max price is null, display TBD
      priceInfo = "TBD*";
    } else if (minPrice === maxPrice) {
      // If min and max prices are the same, display only one price
      priceInfo = `AED ${formatPrice(minPrice)}*`;
    } else {
      // Display price range
      priceInfo = `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;
    }
  
    return priceInfo;
  };
  
  

  const CarEMIDisplay = () => {
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

    // Calculate EMI using the minimum price
    const minEMI = calculateEMI(minPrice);

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= 600) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // function TransmissionList(props) {
  //   const transmissions = Array.from(
  //     new Set(props?.map((transmission) => transmission?.attributes?.gearBox))
  //   )
  //     .filter((transmission) => transmission !== undefined)
  //     .map((transmission) => {
  //       let type;
  //       let speed;

  //       if (transmission?.includes("A")) {
  //         type = "Automatic";
  //         speed = `${type}`;
  //       } else if (transmission?.includes("M")) {
  //         type = "Manual";
  //         speed = `${type}`;
  //       } else {
  //         type = "CVT";
  //         speed = `${type}`;
  //       }

  //       return `${speed}`;
  //     });

  //   if (transmissions.length === 1) {
  //     return <>{transmissions[0]}</>;
  //   } else if (transmissions.length === 2) {
  //     if (transmissions[0] === transmissions[1]) {
  //       return <>{transmissions[0]}</>;
  //     } else {
  //       return (
  //         <>
  //           {transmissions[0]} or {transmissions[1]}
  //         </>
  //       );
  //     }
  //   } else {
  //     const last = transmissions.pop();
  //     const joined = transmissions.join(", ");
  //     const hasDuplicates = transmissions.includes(last);

  //     if (hasDuplicates) {
  //       return <p>{joined}</p>;
  //     } else {
  //       return (
  //         <p>
  //           {joined} or {last}
  //         </p>
  //       );
  //     }
  //   }
  // }

  // const fuelType = trimList
  //   ?.map((item) => item?.attributes?.fuelType)
  //   .filter((value, index, self) => self.indexOf(value) === index) // add this line to filter duplicates
  //   .reduce((acc, cur, idx, arr) => {
  //     if (arr.length === 1) {
  //       return cur;
  //     } else if (idx === arr.length - 1) {
  //       return `${acc} or ${cur}`;
  //     } else {
  //       return `${acc && acc + ","} ${cur}`;
  //     }
  //   }, "");

  // console.log(fuelType, "ttttttt");

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
          <div className="row trim-content">
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
                                src={mainTrim?.featuredImage}
                                alt="product image"
                                fill
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
                  {mainTrim?.year} {brand?.name} {model?.name}
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
                <CarPriceRange />
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
                  Monthly EMI starting from <CarEMIDisplay />
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
                  Available Variants : {allTrims?.length}
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
                          {mainTrimFuelType === "Electric"
                            ? "Motor Type"
                            : t.NoOfCylinders}
                        </small>
                        <div className="d-flex flex-wrap mt-1">
                          <small>
                            {mainTrimFuelType === "Electric"
                              ? motorTypes
                              : cylinderList}
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
                          <small>{transmissionList}</small>
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
                        <small>{seatList}</small>
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
                        <small>{mainTrimFuelType}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-9">
              <Ad728x90 dataAdSlot="7369694604" />
              <ModelDescription
                year={year}
                brand={brand}
                model={model}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minFuelConsumption={minFuelConsumption}
                maxFuelConsumption={maxFuelConsumption}
                engineTypes={engineTypes}
                transmissionList={transmissionList}
                motorTypes={motorTypes}
                mainTrimFuelType={mainTrimFuelType}
                allTrims={allTrims}
                mainTrim={mainTrim}
              />
              <Ad728x90 dataAdSlot="7369694604" />
              <VariantsListing
                year={year}
                brand={brand}
                model={model}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minFuelConsumption={minFuelConsumption}
                maxFuelConsumption={maxFuelConsumption}
                engineTypes={engineTypes}
                transmissionList={transmissionList}
                motorTypes={motorTypes}
                mainTrimFuelType={mainTrimFuelType}
                allTrims={allTrims}
                mainTrim={mainTrim}
              />
              <Ad728x90 dataAdSlot="7369694604" />
              <OldModel model={oldModel} />
              <ModelVehicleGallery
                year={year}
                brand={brand}
                model={model}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minFuelConsumption={minFuelConsumption}
                maxFuelConsumption={maxFuelConsumption}
                engineTypes={engineTypes}
                transmissionList={transmissionList}
                motorTypes={motorTypes}
                mainTrimFuelType={mainTrimFuelType}
                allTrims={allTrims}
                mainTrim={mainTrim}
              />
              <Ad728x90 dataAdSlot="7369694604" />

              <VehicleFaq
                 year={year}
                 brand={brand}
                 model={model}
                 minPrice={minPrice}
                 maxPrice={maxPrice}
                 minFuelConsumption={minFuelConsumption}
                 maxFuelConsumption={maxFuelConsumption}
                 engineTypes={engineTypes}
                 transmissionList={transmissionList}
                 motorTypes={motorTypes}
                 mainTrimFuelType={mainTrimFuelType}
                 allTrims={allTrims}
                 mainTrim={mainTrim}
                CarPriceRange={CarPriceRange}
              />
            </div>
            <div className="col-lg-3">
              <div className="car-details-sidebar positionStickyAd">
                <div className="contact-info mb-50">
                  <Ad300x600 dataAdSlot="3792539533" />
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
  let year = context.params.year;
  year = parseInt(year, 10);
  const brandname = context.params.brandname;
  const modelSlug = context.params.model;

  console.log(typeof year, "year");

  try {
    const oldModels = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-models/find-model/${modelSlug}`
    );

    const currentmodel = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${modelSlug}/${year}`
    );

    console.log(currentmodel, "currentmodel");

    return {
      props: {
        oldModel: oldModels?.data?.data,
        currentmodel: currentmodel?.data?.data?.model,
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
