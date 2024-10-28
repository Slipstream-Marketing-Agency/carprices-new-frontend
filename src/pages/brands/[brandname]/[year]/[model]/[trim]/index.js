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
import Slider from "react-slick/lib/slider";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import BuyForm from "@/src/components-old/BuyForm";
import LoanEnquireForm from "@/src/components-old/LoanEnquireForm";
import Link from "next/link";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import OutlinedButton from "@/src/components/buttons/OutlinedButton";
import KeyFeatures from "@/src/components-old/details/KeyFeatures";
import VariantsListing from "@/src/components/variant/VariantListing";
import SeoLinksFilter from "@/src/components/common/SeoLinksFilter";
import Head from "next/head";
import OptimizedImage from "@/src/components/common/image/OptimisedImage";
import UserReviews from "@/src/components/car-detail/UserReviews";
import UserReviewsNew from "@/src/components/car-detail/UserReviewsNew";

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

function CarDeatilsPage({ model, trimList, trimData, trimSlug }) {
  console.log(trimSlug, "trimSlugtrimSlugtrimSlug");
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

  const [selectedTrim, setSelectedTrim] = React.useState("");

  useEffect(() => {
    // Get the current trim from the URL
    const { trim } = router.query;
    if (trim) {
      setSelectedTrim(trim);
    }
  }, [router.query]);

  const handleChange = (event) => {
    const selectedSlug = event.target.value;
    setSelectedTrim(selectedSlug);

    if (selectedSlug) {
      const { brandname, year, model } = router.query;
      // Navigate to the new URL with the updated trim
      router.push(`/brands/${brandname}/${year}/${model}/${selectedSlug}`);
    }
  };

  console.log(trimData, "trimDatatrimData");

  const [activeLink, setActiveLink] = useState("#specs");

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  const modelslug = router.query.model;
  const brandslug = router.query.brandname;
  const trimslug = router.query.trim;

  console.log(modelslug, brandslug, trimslug, "modelslug");

  return (
    <MainLayout
      pageMeta={{
        title: trimData?.seo?.metaTitle ? trimData.seo.metaTitle : `${trimData?.brand} ${trimData?.model} ${trimData?.year} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
        description: trimData?.seo?.metaDescription ? trimData.seo.metaDescription : `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name
          } price in UAE starts at ${trimData.price <= 0
            ? "TBD"
            : "AED" +
            " " +
            trimData.price?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          }*.Check out ${trimData?.model
          } colours, Features, Specifications, Reviews, Interior Images, & Mileage.`,
        type: "Car Review Website",
        ...(trimData?.seo?.metaRobots && { robots: trimData.seo.metaRobots }),
        ...(trimData?.seo?.canonicalURL && { canonical: trimData.seo.canonicalURL }),
      }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Product", "Car"],
              "brand": {
                "@type": "Brand",
                "name": trimData?.brand || "Unknown Brand",
              },
              "url": `/brands/${router?.query?.brandname || "unknown"}/${router?.query?.year || "unknown"}/${router?.query?.model || "unknown"}/${trimData?.slug || "unknown"}`,
              "description": trimData?.price
                ? `${trimData?.name} is priced at AED ${trimData?.price}.`
                : `${trimData?.name} price information is not available.`,
              "itemCondition": "NewCondition",
              "manufacturer": trimData?.brand || "Unknown Manufacturer",
              "model": trimData?.name || "Unknown Model",
              "name": `${trimData?.year} ${trimData?.brand || "Unknown"} ${trimData?.model || "unknown"} ${trimData?.name || "Unknown"}`,
              "image": trimData?.featuredImage || "/default-car-image.jpg", // Fallback to a default image
              "vehicleModelDate": trimData?.year,
              "offers": {
                "@type": "Offer",
                "price": trimData?.price || "N/A",
                "availability": "http://schema.org/InStock",
                "priceCurrency": "AED",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "minPrice": trimData?.price || "N/A",
                  "maxPrice": trimData?.price || "N/A",
                  "price": trimData?.price || "N/A",
                  "priceCurrency": "AED",
                },
              },
              // "aggregateRating": {
              //   "@type": "AggregateRating",
              //   "ratingValue":0, 
              //   "reviewCount": 0, 
              //   "worstRating": 0,
              //   "bestRating": 0,
              // },
            }),
          }}
        />
      </Head>
      <div className="tw-grid tw-grid-cols-12 tw-gap-4 tw-mx-auto tw-container">
        <div className="tw-col-span-12 lg:tw-col-span-5">
          <div className="tw-grid tw-grid-cols-12 tw-gap-4">
            <div className="tw-order-2 md:tw-order-1 md:tw-col-span-2 tw-col-span-12 md:tw-h-[333px]">
              <Slider {...thumbSettings}>
                <div>
                  <Image
                    src={
                      trimData?.featuredImage === null
                        ? "/assets/img/car-placeholder.png"
                        : trimData?.featuredImage
                    }
                    alt="thumbnail image"
                    width={80}
                    height={80}
                    className="tw-object-contain tw-w-20 tw-h-20 tw-rounded-[10px]"
                  />
                </div>
                {trimData?.galleryImages?.map((item, index) => (
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
                      trimData?.featuredImage === null
                        ? "/assets/img/car-placeholder.png"
                        : trimData?.featuredImage
                    }
                    alt="product image"
                    width={800}
                    height={6000}
                    className="tw-object-contain tw-w-full md:tw-h-[360px] tw-h-[250px] tw-rounded-[30px]"
                  />
                </div>
                {trimData?.galleryImages?.map((item, index) => (
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
              {trimData?.year} {trimData?.brand} {trimData?.model}{" "}
              {trimData?.name}
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
              <Price data={trimData.price} />
            </h2>
            <p className="tw-font-medium tw-text-gray-500 tw-mt-3">
              <Price
                data={Math.round(
                  ((trimData.price - trimData.price * (downPayment / 100)) *
                    (interestRate / 100 / 12) *
                    Math.pow(1 + interestRate / 100 / 12, years * 12)) /
                  (Math.pow(1 + interestRate / 100 / 12, years * 12) - 1)
                )}
              />
              /Monthly EMI*{" "}
              {/* <span className="tw-underline ">
                <Link href="">Details</Link>
              </span> */}
            </p>
          </div>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="trim-select-label">Choose Trim</InputLabel>
            <Select
              labelId="trim-select-label"
              id="trim-select"
              value={selectedTrim}
              onChange={handleChange}
              IconComponent={ArrowDropDownIcon}
              label="Choose Trim"
              className="tw-flex tw-items-center tw-h-14 "
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                minWidth: "300px",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxWidth: "300px",
                  },
                },
              }}
            >
              {trimData?.relatedTrims?.map((trim, index) => (
                <MenuItem key={index} value={trim.slug} className="tw-flex">
                  <ListItemIcon>
                    <Image
                      layout="fixed"
                      width={60}
                      height={60}
                      src={trim.featuredImage}
                      alt={trim.name}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={trim.name}
                    className="tw-inline-flex tw-items-center tw-pl-4 tw-m-0"
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="md:tw-my-5 tw-my-7">
            <div className="tw-grid tw-grid-cols-3 tw-gap-4 md:tw-w-[70%]">
              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {trimData?.fuelType === "Electric"
                      ? "Motor Type"
                      : "Engine Type"}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {trimData?.fuelType === "Electric"
                      ? trimData?.motor?.split(" ")[0]
                      : `${(trimData?.displacement / 1000).toFixed(1)}L ${trimData?.engine
                      }`}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.transmission}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {trimData?.transmission}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.power} (hp)
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {trimData?.power}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.torque} (Nm)
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {trimData?.torque}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {t.seats}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {trimData?.seatingCapacity}
                  </h5>
                </div>
              </div>

              <div className="tw-flex tw-items-center">
                <div>
                  <h6 className="tw-font-medium tw-mb-0 tw-text-gray-500">
                    {trimData?.fuelType === "Electric"
                      ? "Range"
                      : "Fuel Efficiency"}
                  </h6>
                  <h5 className="tw-text-gray-500 tw-font-semibold tw-mt-1 tw-mb-0">
                    {trimData?.fuelType === "Electric" &&
                      trimData?.fuelConsumption === null &&
                      trimData?.range !== 0
                      ? trimData?.range
                      : trimData?.fuelConsumption + "kmpl"}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-flex md:tw-my-5 tw-my-7 tw-space-x-2">
            <PrimaryButton label="Reserve Online" additionalClass="tw-font-bold" onClick={handleBuyOpen} />
            <OutlinedButton label="Book a Test Drive" onClick={handleOpen} />
          </div>
        </div>
      </div>

      <div className=" tw-sticky tw-top-0 tw-z-10">
        <nav className="tw-text-lg tw-leading-none tw-text-black tw-bg-zinc-50 tw-shadow tw-mt-10  tw-mb-10 tw-overflow-x-scroll no-scrollbar">
          <div className="tw-mx-auto tw-container tw-flex tw-gap-7 tw-items-center">
            <Link
              href="#specs"
              onClick={() => handleLinkClick("#specs")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-h-full tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${activeLink === "#specs"
                ? "tw-border-b-blue-600 tw-text-black"
                : "tw-border-transparent tw-text-gray-500"
                }`}
            >
              Specs
            </Link>
            <Link
              href="#variants&prices"
              onClick={() => handleLinkClick("#variants&prices")}
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${activeLink === "#variants&prices"
                ? "tw-border-b-blue-600 tw-text-black"
                : "tw-border-transparent tw-text-gray-500"
                }`}
            >
              Variants & Prices
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
              className={`tw-gap-2.5 tw-py-5 tw-self-stretch tw-p-2.5 tw-my-auto tw-whitespace-nowrap tw-border-0 tw-border-b-2 tw-border-solid ${activeLink === "#faq"
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
        id="specs"
      >
        <div className="md:tw-col-span-9 tw-col-span-12">
          <TrimDescription trim={trimData} />
          <Ad728x90 dataAdSlot="7369694604" />
        </div>
        <div className="md:tw-col-span-3 tw-col-span-12">
          {/* <Ad300x600 dataAdSlot="3792539533" /> */}
        </div>
      </div>

      {trimData?.key_features?.length > 0 && (
        <div id="key-features" className="tw-container">
          <KeyFeatures data={trimData?.key_features} />

          <div className="tw-my-10">
            <Ad728x90 dataAdSlot="5962627056" />
          </div>
        </div>
      )}

      <div id="vehicle-details" className="tw-container">
        <DetailedSpecification trim={trimData} />
      </div>

      <div className="tw-my-10">
        <Ad728x90 dataAdSlot="5962627056" />
      </div>
      <div id="vehicle-details" className="tw-container">
        <VehicleReview trim={trimData} />
        <div className="tw-my-10">
          <Ad728x90 dataAdSlot="5962627056" />
        </div>
        {trimData?.galleryImages?.length > 0 && (
          <>
            {" "}
            <Ad728x90 dataAdSlot="5962627056" />
            <VehicleGallery trim={trimData.galleryImages} />
          </>
        )}

        <VehicleFaq trim={trimData} />
      </div>
      <div
        className="tw-container tw-mx-auto tw-grid tw-grid-cols-12 tw-mt-14"
        id="reviews"
      >
        <div className="md:tw-col-span-9 tw-col-span-12">
          {/* <UserReviews
            name={`${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name}`}
          /> */}
          <UserReviewsNew
              name={`${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name}`}
              year={trimData?.year}
              model={trimData?.model}
              brand={trimData?.brand}
            />
        </div>
        <div className="md:tw-col-span-3 tw-col-span-9">
          {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
          <Ad300x600 dataAdSlot="3792539533" />
        </div>
      </div>

      <div id="variants&prices" className="tw-container">
        <div className="tw-my-10">
          <Ad728x90 dataAdSlot="5962627056" />
        </div>
        <VariantsListing
          data={trimData}
          brandslug={brandslug}
          modelslug={modelslug}
          trimslug={trimslug}
        />
      </div>
      <div className="tw-grid tw-grid-cols-2 md:tw-gap-10 tw-gap-0 max-md:tw-grid-cols-1 tw-container tw-px-5 tw-my-10">
        <div className="tw-flex tw-flex-col tw-w-full">
          <Link href="/loan-calculator" className="tw-flex md:tw-gap-2.5 ">
            <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
              <img
                src="/emi.jpg"
                alt=""
                className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
              />
              <div className="md:hidden block tw-rounded-2xl tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>

              <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                <div>
                  <h2 className="tw-text-white">
                    Calculate Your Car Loan EMI
                  </h2>
                  <p className="md:tw-mt-6 tw-leading-6 md:tw-w-[50%] w-full">
                    Fill in the details and find out what the installment
                    will be for your new car. Our car loan calculator is
                    interactive and accurate.
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2 md:tw-mt-10 tw-mt-3">
                  <p className="tw-text-white tw-font-bold">
                    Calculate Now
                  </p>
                  <span className="material-symbols-outlined tw-text-white">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="tw-flex tw-flex-col tw-w-full">
          <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
            <img
              src="/car-value.jpg"
              alt=""
              className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
            />
            <div className="md:hidden block tw-rounded-2xl tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>
            <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
              <div>
                <h2 className="tw-text-white">
                  Find out the value of your current car
                </h2>
                <p className="md:tw-mt-6 tw-leading-6 md:tw-w-[50%] w-full">
                  Our car valuation calculator helps you find out what you
                  can expect for your current car. Fill in the details and
                  get an estimated current value for your used car.
                </p>
              </div>

              <div className="tw-flex md:tw-gap-2.5 md:tw-mt-10 tw-mt-3">
                <p className="tw-font-bold">Coming Soon</p>
                {/* <span className="material-symbols-outlined">
                    arrow_forward
                  </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tw-container tw-mx-auto">
        {" "}
        <SeoLinksFilter />
      </div>

      <div className="car-details-area mt-15 mb-15">
        {/* <div className="tw-mt-2 key_spec">
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
                  </div> */}
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
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-offset={0}
          className="scrollspy-example"
          tabIndex={0}
        ></div>
      </div>
    </MainLayout>
  );
}

export default CarDeatilsPage;

export async function getServerSideProps(context) {
  const year = context.params.year;
  const brandname = context.params.brandname;
  const modelSlug = context.params.model;

  // Decode the URL components
  let trimSlug = decodeURIComponent(context.params.trim);

  // Replace any spaces with '+'
  trimSlug = trimSlug.replace(/ /g, "+");

  console.log(trimSlug, "Final trimSlug");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-trims/findonetrim/${modelSlug}/${trimSlug}/${year}`
    );
    return {
      props: { trimData: response?.data?.data, trimSlug: trimSlug },
    };
  } catch (error) {
    console.error("Failed to fetch trim data:", error);

    // Redirect to a custom error page or return notFound: true
    return {
      notFound: true,
    };
  }
}
