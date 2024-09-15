import React, { useEffect, useMemo, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
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
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import Ad300x250 from "@/src/components-old/ads/Ad300x250";
import Image from "next/image";
import CarDetailsNav from "@/src/components-old/details/CarDetailsNav";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import ModelDescription from "@/src/components-old/details/ModelDescription";
import VariantsListing from "@/src/components-old/details/VariantsListing";
import VehicleFaq from "@/src/components-old/details/VehicleFaq";
import OldModel from "@/src/components-old/details/OldModel";
import axios from "axios";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import ModelVehicleGallery from "@/src/components-old/trim-details/ModelVehicleGallery";
import NewShareBtns from "@/src/components-old/common/NewShareBtns";
import Price from "@/src/utils/Price";
import Slider from "react-slick/lib/slider";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import KeyFeatures from "@/src/components-old/details/KeyFeatures";
import SeoLinksFilter from "@/src/components/common/SeoLinksFilter";

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function CarDeatilsPage({ oldModel, currentmodel }) {

  console.log(currentmodel,"currentmodel");
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

  const [sliderRef, setSliderRef] = useState(null);

  const mainSettings = {
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: (slider) => setSliderRef(slider),
    arrows: false,
  };

  const thumbSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: sliderRef,
    vertical: true, // Enable vertical scrolling
    verticalSwiping: true, // Enable vertical swiping
    focusOnSelect: true,
    swipeToSlide: true,
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // at 768px screen width
        settings: {
          vertical: false, // Horizontal scrolling on mobile
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 1024, // at 1024px and above screen width
        settings: {
          vertical: true, // Vertical scrolling on desktop
          verticalSwiping: true,
        },
      },
    ],
  };

  const [activeLink, setActiveLink] = useState("#overview");

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

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
      <div className="tw-grid tw-grid-cols-12 tw-gap-4 tw-mx-auto tw-container">
        <div className="tw-col-span-12 lg:tw-col-span-5">
          <div className="tw-grid tw-grid-cols-12 tw-gap-4">
            <div className="tw-order-2 md:tw-order-1 md:tw-col-span-2 tw-col-span-12 md:tw-h-[333px]">
              <Slider {...thumbSettings}>
                <div>
                  <Image
                    src={
                      mainTrim?.featuredImage === null
                        ? "/assets/img/car-placeholder.png"
                        : mainTrim?.featuredImage
                    }
                    alt="thumbnail image"
                    width={80}
                    height={80}
                    className="tw-object-contain tw-w-20 tw-h-20 tw-rounded-[10px]"
                  />
                </div>
                {mainTrim?.galleryImages?.map((item, index) => (
                  <div key={index}>
                    <Image
                      src={
                        item === null ? "/assets/img/car-placeholder.png" : item
                      }
                      alt={`thumbnail image ${index + 1}`}
                      width={80}
                      height={80}
                      className="tw-object-cover tw-w-20 tw-h-20 tw-rounded-[10px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="tw-order-1 md:tw-order-2 md:tw-col-span-10 tw-col-span-12 tw-border-solid tw-border-[1px] tw-border-gray-300 tw-rounded-[30px] car-detail-main-slider  tw-p-0">
              <Slider {...mainSettings} className="tw-h-full">
                <div className="tw-flex tw-items-center">
                  <Image
                    src={
                      mainTrim?.featuredImage === null
                        ? "/assets/img/car-placeholder.png"
                        : mainTrim?.featuredImage
                    }
                    alt="product image"
                    width={800}
                    height={6000}
                    className="tw-object-contain tw-w-full md:tw-h-[360px] tw-h-[250px] tw-rounded-[30px]"
                  />
                </div>
                {mainTrim?.galleryImages?.map((item, index) => (
                  <div key={index} className="tw-flex tw-items-center">
                    <Image
                      src={
                        item === null ? "/assets/img/car-placeholder.png" : item
                      }
                      alt={`product image ${index + 1}`}
                      width={800}
                      height={600}
                      className="tw-object-cover tw-w-full md:tw-h-[360px] tw-h-[250px] tw-rounded-[30px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="tw-col-span-12 lg:tw-col-span-6 md:tw-pl-10">
          <div className="tw-relative">
            <h1 className="tw-g tw-font-semibold tw-mb-1">
              {mainTrim?.year} {brand?.name} {model?.name}{" "}
              <span className="tw-text-[18px] tw-font-light">
                Variants ({allTrims?.length})
              </span>
            </h1>
          </div>
          {/* <span class="tw-inline-flex tw-items-center tw-rounded-full tw-bg-green-500 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-white tw-ring-1 tw-ring-inset tw-ring-green-600/20">
            4.2 <StarIcon className="tw-text-[14px] tw-ml-1" />
          </span>
          <span className="tw-text-[14px] tw-mx-2">182 Ratings & Reviews</span>
          <span className="tw-text-[14px] tw-font-semibold tw-underline">
            Rate Now
          </span> */}
          <div className="md:tw-my-3 tw-my-3">
            <h2>
              <CarPriceRange />
            </h2>
            <p className="tw-font-medium tw-text-gray-500 tw-mt-3">
              <CarEMIDisplay />
              /Monthly EMI*{" "}
              <span className="tw-underline ">
                <Link href="">Details</Link>
              </span>
            </p>
          </div>

          <div className="md:tw-my-10 tw-my-7">
            <div className="tw-grid tw-grid-cols-3 tw-gap-4 md:tw-w-[70%]">
              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {mainTrimFuelType === "Electric"
                      ? "Motor Type"
                      : t.NoOfCylinders}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {mainTrimFuelType === "Electric"
                      ? motorTypes
                      : cylinderList}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.transmission}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {transmissionList}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.power} (hp)
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {minPower === maxPower
                      ? minPower
                      : `${minPower} to ${maxPower}`}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.torque} (Nm)
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {minTorque === maxTorque
                      ? minTorque
                      : `${minTorque} to ${maxTorque}`}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.seats}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {seatList}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.fuelType}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {mainTrimFuelType}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <PrimaryButton label="View All Variants" href={"#variants"} />
        </div>
      </div>
      <div className=" tw-sticky tw-top-0">
        <nav className="tw-text-lg tw-leading-none tw-text-black tw-bg-zinc-50 tw-shadow tw-mt-10  tw-mb-10 tw-overflow-x-scroll no-scrollbar">
          <div className="tw-mx-auto tw-container tw-flex tw-gap-7 tw-items-center">
            <Link
              href="#overview"
              onClick={() => handleLinkClick("#overview")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-h-full tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#overview"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              Overview
            </Link>
            <Link
              href="#variants"
              onClick={() => handleLinkClick("#variants")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#variants"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              Variants
            </Link>
            {/* <Link
              href="#price"
              onClick={() => handleLinkClick("#price")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#price"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              Price
            </Link>
            <Link
              href="#key-features"
              onClick={() => handleLinkClick("#key-features")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#key-features"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              Key Features
            </Link>
            <Link
              href="#compare"
              onClick={() => handleLinkClick("#compare")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#compare"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              Compare
            </Link>
            <Link
              href="#news"
              onClick={() => handleLinkClick("#news")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#news"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              News
            </Link>
            <Link
              href="#user-reviews"
              onClick={() => handleLinkClick("#user-reviews")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#user-reviews"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              User Reviews
            </Link> */}
            <Link
              href="#faq"
              onClick={() => handleLinkClick("#faq")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#faq"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              FAQ
            </Link>
            {/* <Link
              href="#similar-cars"
              onClick={() => handleLinkClick("#similar-cars")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${
                activeLink === "#similar-cars"
                  ? "tw-border-b-blue-600 tw-text-black"
                  : "tw-border-transparent tw-text-gray-500"
              }`}
            >
              Similar Cars
            </Link> */}
          </div>
        </nav>
      </div>

      <div
        className="tw-container tw-mx-auto tw-grid tw-grid-cols-12"
        id="overview"
      >
        <div className="md:tw-col-span-9 tw-col-span-12">
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
          <Ad728x90 dataAdSlot={"tahoe"} />
        </div>
        <div className="md:tw-col-span-3 tw-col-span-12">
          <Ad300x600 dataAdSlot={"blazer"} />
        </div>
      </div>
      <div className="tw-container tw-mx-auto tw-mt-10" id="variants">
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
        <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-12 tw-mt-10">
          <div className="md:tw-col-span-9 tw-col-span-12">
            <OldModel model={oldModel} />
            <div className="tw-mt-14">
              <Ad728x90 dataAdSlot={"blazer"} />
            </div>
          </div>
          <div className="md:tw-col-span-3 tw-col-span-12">
            {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
            <Ad300x600 dataAdSlot={"corvette"} />
          </div>
        </div>

        {currentmodel?.highlightsList?.length > 0 && (
          <section className="tw-grid tw-grid-cols-12  tw-mt-12  tw-rounded-xl ">
            <div className="md:tw-col-span-9 tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-rounded-xl  tw-border tw-border-solid tw-border-gray-300">
              <div
                className="tw-flex tw-flex-col md:tw-w-7/12 tw-text-white  md:tw-h-full  md:tw-py-20 tw-py-10 md:tw-px-10 tw-px-4"
                style={{
                  background:
                    "linear-gradient(to right, #143529 0.8%, #000000 90%)",
                }}
              >
                <ul className=" tw-p-0 tw-space-y-8 tw-text-2xl tw-list-none tw-font-thin">
                  <p className=" tw-text-[36px] tw-text-white tw-font-light">
                    Things We Like in {mainTrim?.year} {brand?.name}{" "}
                    {model?.name}{" "}
                  </p>
                  {currentmodel?.highlightsList?.map((item, index) => (
                    <li>
                      {item.list}
                      <div className="tw-h-[2px] tw-bg-gradient-to-r tw-from-teal-600 tw-to-black-100 tw-mt-2 "></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tw-w-full md:tw-h-full md:tw-w-5/12  tw-mt-0">
                <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                  <img
                    src={
                      currentmodel?.highlightsExteriorImage === null
                        ? "/assets/img/car-placeholder.png"
                        : currentmodel?.highlightsExteriorImage
                    }
                    alt=""
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                  <img
                    src={
                      currentmodel?.highlightsImage === null
                        ? "/assets/img/car-placeholder.png"
                        : currentmodel?.highlightsInteriorImage
                    }
                    alt=""
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="md:tw-col-span-3 tw-col-span-12">
              <Ad300x600 dataAdSlot={"tahoe"} />
            </div>
          </section>
        )}

        {currentmodel?.key_features?.length > 0 && (
          <div id="key-features">
            <KeyFeatures data={currentmodel.key_features} />
          </div>
        )}

        {/* {gallery && (
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
              )} */}

        {/* <Ad728x90 dataAdSlot="7369694604" /> */}
        <div
          className="tw-container tw-mx-auto tw-grid tw-grid-cols-12 tw-mt-14"
          id="faq"
        >
          <div className="md:tw-col-span-9 tw-col-span-12">
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
          <div className="md:tw-col-span-3 tw-col-span-9">
            {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
            <Ad300x600 dataAdSlot="3792539533" />
          </div>
        </div>
        {/* <Ad300x250 dataAdSlot="5772723668" />{" "}
            <div className="car-details-sidebar positionStickyAd mt-4">
              <Ad300x600 dataAdSlot="3792539533" />
            </div> */}
      </div>
      <div className="tw-container tw-mx-auto">
        {" "}
        <SeoLinksFilter />v
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

    if (!currentmodel || currentmodel?.data?.data?.model?.trims.length  === 0) {
      return {
        notFound: true, // This will automatically render the 404 page
      };
    }
  

    return {
      props: {
        oldModel: oldModels?.data?.data,
        currentmodel: currentmodel?.data?.data?.model,
      },
    };
  } catch (error) {
    console.error('Error fetching model data:', error);

    if (error.response && error.response.status === 404) {
      try {
        // Attempt to fetch a redirect model
        const redirectModel = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}model/old-slug/${modelSlug}`
        );

        return {
          redirect: {
            permanent: false,
            destination: `/brands/${brandname}/${year}/${redirectModel.data.model.slug}`,
          },
          props: {},
        };
      } catch (redirectError) {
        console.error('Error fetching redirect model:', redirectError);
      }
    }

    // If all else fails, return 404
    return {
      notFound: true,
    };
  }
}

