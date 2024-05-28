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
import NewShareBtns from "@/src/components/common/NewShareBtns";
import Price from "@/src/utils/Price";


SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function CarDeatilsPage({ oldModel, currentmodel }) {
  // const currentURL = typeof window !== "undefined" ? window.location.href : "";
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  const mainTrim = currentmodel?.highTrim[0];

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

  const gallery = mainTrim?.galleryImages > 0;

  const getTransmissionType = () => {
    const hasAutomatic = allTrims.some((t) => t?.transmission === "Automatic");
    const hasManual = allTrims.some((t) => t?.transmission === "Manual");

    if (hasAutomatic && hasManual) {
      return <b>Automatic/Manual</b>;
    } else if (hasAutomatic) {
      return (
        <>
          an <b>Automatic</b>
        </>
      );
    } else if (hasManual) {
      return (
        <>
          a <b>Manual</b>
        </>
      );
    } else {
      return (
        <>
          a <b>CVT</b>
        </>
      );
    }
  };

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

  return (
    <MainLayout
      pageMeta={{
        title: `${brand?.name} ${model?.name} ${year} Car Prices In UAE | Variants, Spec & Features - Carprices.ae`,
        description: `Explore the ${year} ${brand?.name} ${
          model?.name
        } starting at ${
          minPrice <= 0
            ? "TBD"
            : "AED" +
              " " +
              minPrice?.toLocaleString("en-AE", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
        }* in UAE. Check out Variants, Mileage, Colors, Interiors, specifications, Features and performance details.`,
        type: "Car Review Website",
      }}
    >
      <div className="car-details-area mt-15 ">
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
                  <div className="single-item " id="car-img">
                    <div className="car-img-area">
                      <div className="tab-content " id="myTab5Content">
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
                                      mainTrim?.featuredImage === null
                                        ? "/assets/img/car-placeholder.png"
                                        : mainTrim?.featuredImage
                                    }
                                    alt="product image"
                                    fill
                                    className="object-contain"
                                  />
                                </SwiperSlide>
                                {mainTrim?.galleryImages?.map((item, index) => (
                                  <SwiperSlide className="swiper-slide">
                                    <Image
                                      src={
                                        item === null
                                          ? "/assets/img/car-placeholder.png"
                                          : item
                                      }
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
                  <div className="nameNShareContainer position-relative">
                    <h1 className="carNameTxt fw-bold mb-1">
                      {mainTrim?.year} {brand?.name} {model?.name}
                    </h1>{" "}
                    {/* <span className="shareBtnMobile">
                      {" "}
                      <NewShareBtns />
                    </span> */}
                  </div>
                  <h2 className="fw-bold text-primary mb-3 ">
                    <CarPriceRange />
                  </h2>

                  <div className="monthlyEMIContainer d-flex gap-2 align-items-center w-75 border py-1 rounded justify-content-center">
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
                  <div className="availableVariantsContainer mt-3 d-flex gap-2 align-items-center w-75 border py-1 rounded justify-content-center">
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
                      Available Variants: {allTrims?.length}
                    </h6>
                  </div>

                  <div className="mt-2 key_spec">
                    <p className="fw-bold mb-0">{t.keySpecification}</p>
                    <hr className="my-1 heading-bottom " />
                    <div className="row px-2">
                      <div className="col-6 mt-1 ps-0 col-sm-4">
                        <div className="d-flex d-flex align-items-center justify-content-start">
                          <img
                            className="spec_image p-2"
                            src="/assets/images/specs/Cylinder.png"
                            alt=""
                          />
                          <div className="d-flex flex-column">
                            <h6 className="fw-bold mb-0">
                              {mainTrimFuelType === "Electric"
                                ? "Motor Type"
                                : t.NoOfCylinders}
                            </h6>
                            <div className="d-flex flex-wrap mt-1">
                              <h6 className="mb-0">
                                {mainTrimFuelType === "Electric"
                                  ? motorTypes
                                  : cylinderList}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 mt-1 ps-0 col-sm-4">
                        <div className="d-flex d-flex align-items-center justify-content-start">
                          <img
                            className="spec_image p-2"
                            src="/assets/images/specs/Transmission.png"
                            alt=""
                          />
                          <div className="d-flex flex-column">
                            <h6 className="fw-bold mb-0">{t.transmission}</h6>
                            <div className="d-flex flex-wrap">
                              <h6 className="mb-0">{transmissionList}</h6>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 mt-1 ps-0 col-sm-4">
                        <div className="d-flex d-flex align-items-center justify-content-start">
                          <img
                            className="spec_image"
                            src="/assets/images/specs/KM.svg"
                            alt=""
                          />
                          <div className="d-flex flex-column">
                            <h6 className="fw-bolder mb-0">{t.power} (hp)</h6>
                            <h6 className="mb-0">
                              {minPower === maxPower
                                ? minPower
                                : `${minPower} to ${maxPower}`}
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 mt-1 ps-0 col-sm-4">
                        <div className="d-flex d-flex align-items-center justify-content-start">
                          <img
                            className="spec_image p-2"
                            src="/assets/images/specs/Torque.png"
                            alt=""
                          />
                          <div className="d-flex flex-column">
                            <h6 className="fw-bolder mb-0">{t.torque} (Nm)</h6>
                            <h6 className="mb-0">
                              {minTorque === maxTorque
                                ? minTorque
                                : `${minTorque} to ${maxTorque}`}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-1 ps-0 col-sm-4">
                        <div className="d-flex d-flex align-items-center justify-content-start">
                          <img
                            className="spec_image p-2"
                            src="/assets/images/specs/Seats.png"
                            alt=""
                          />
                          <div className="d-flex flex-column">
                            <h6 className="fw-bold mb-0">{t.seats}</h6>
                            <h6 className="mb-0">{seatList}</h6>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 mt-1 ps-0 col-sm-4">
                        <div className="d-flex d-flex align-items-center justify-content-start">
                          <img
                            className="spec_image p-2"
                            src="/assets/images/specs/FuelType.png"
                            alt=""
                          />
                          <div className="d-flex flex-column">
                            <h6 className="fw-bold mb-0">{t.fuelType}</h6>
                            <h6 className="mb-0">{mainTrimFuelType}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                getTransmissionType={getTransmissionType}
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

              {gallery && (
                <>
                  <Ad728x90 dataAdSlot="7369694604" />

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
                </>
              )}

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
                getTransmissionType={getTransmissionType}
              />
            </div>
            <div className="col-3">
              {" "}
              <Ad300x250 dataAdSlot="5772723668" />{" "}
              <div className="car-details-sidebar positionStickyAd mt-4">
                <Ad300x600 dataAdSlot="3792539533" />
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
  let year = context.params.year;
  year = parseInt(year, 10);
  const brandname = context.params.brandname;
  const modelSlug = context.params.model;

  try {
    const oldModels = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-models/find-model/${modelSlug}`
    );

    const currentmodel = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${modelSlug}/${year}`
    );

    return {
      props: {
        oldModel: oldModels?.data?.data,
        currentmodel: currentmodel?.data?.data?.model,
      },
    };
  } catch (error) {
    return {
      notFound: true, // This will trigger Next.js to render the 404 page
    };

    // if (error) {
    //   try {
    //     let redirectModel = await axios.get(
    //       process.env.NEXT_PUBLIC_API_URL_OLD + "model/old-slug/" + modelSlug
    //     );
    //     return {
    //       redirect: {
    //         permanent: true,
    //         destination: `/brands/${brandname}/${year}/${redirectModel.data.model.slug}`,
    //       },
    //       props: {},
    //     };
    //   } catch (error) {
    //     if (error.response && error.response.status !== 200) {
    //       return {
    //         notFound: true, // Treat non-200 responses as 404 errors
    //       };
    //     }
    //   }
    // } else {
    //   return {
    //     notFound: true, // Treat non-200 responses as 404 errors
    //   };
    // }
  }
}
