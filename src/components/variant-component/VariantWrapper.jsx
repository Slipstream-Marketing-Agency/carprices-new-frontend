"use client"
import React, { Suspense, useEffect, useMemo, useState } from "react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import Image from "next/image";
import useTranslate from "@/utils/UseTranslate";
import axios from "axios";
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
import Link from "next/link";
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import Ad728x90 from "../ads/Ad728x90";
import VariantsListing from "./VariantListing";
import VehicleFaq from "./VehicleFaq";
import VehicleGallery from "./VehicleGallery";
import VehicleReview from "./VehicleReview";
import DetailedSpecification from "./DetailedSpecification";
import KeyFeatures from "./KeyFeatures";
import TrimDescription from "./TrimDescription";
import PrimaryButton from "../buttons/PrimaryButton";
import OutlinedButton from "../buttons/OutlinedButton";
import Price from "@/utils/Price";
import SeoLinksFilter from "../common/SeoLinksFilter";
import LoanEnquireForm from "../forms/LoanEnquireForm";
import BuyForm from "../forms/BuyForm";
import CarTestDriveForm from "../forms/CarTestDriveForm";
import CarDetailReview from "../reviews/CarDetailReview";
import Ad300x600 from "../ads/Ad300x600";


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

export default function VariantWrapper({ model, trimList, trimData, trimSlug }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

    const emis = car
      ?.filter((trim) => trim?.attributes.price > 0)
      .map((trim) => calculateEMI(trim?.attributes?.price));

    const minEMI = Math.min(...emis);

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
        delay: 2500,
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
    vertical: true,
    verticalSwiping: true,
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

  const [selectedTrim, setSelectedTrim] = useState("");

  const pageParams = useParams()

  const modelslug = pageParams.model;
  const brandslug = pageParams.brandname;
  const trimslug = pageParams.trim;
  const year = pageParams.year;

  useEffect(() => {
    const trim = pageParams.trim;
    if (trim) {
      setSelectedTrim(trim);
    }
  }, [pageParams]);

  const handleChange = (event) => {
    const selectedSlug = event.target.value;
    setSelectedTrim(selectedSlug);

    if (selectedSlug) {
      window.history.pushState(null, "", `/brands/${brandname}/${year}/${model}/${selectedSlug}`);
    }
  };

  const [activeLink, setActiveLink] = useState("#specs");

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <div><div className="grid grid-cols-12 gap-4 mx-auto container">
      <div className="col-span-12 lg:col-span-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="order-2 md:order-1 md:col-span-2 col-span-12 md:h-[333px]">
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
                  className="object-contain w-20 h-20 rounded-[10px]"
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
                    className="object-cover w-20 h-20 rounded-[10px]"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="order-1 md:order-2 md:col-span-10 col-span-12 border-solid border-[1px] border-gray-300 rounded-[30px] car-detail-main-slider  p-0">
            <Slider {...mainSettings} className="h-full">
              <div className="flex items-center">
                <Image
                  src={
                    trimData?.featuredImage === null
                      ? "/assets/img/car-placeholder.png"
                      : trimData?.featuredImage
                  }
                  alt="product image"
                  width={800}
                  height={6000}
                  className="object-contain w-full md:h-[360px] h-[250px] rounded-[30px]"
                />
              </div>
              {trimData?.galleryImages?.map((item, index) => (
                <div key={index} className="flex items-center">
                  <Image
                    src={
                      item === null ? "/assets/img/car-placeholder.png" : item
                    }
                    alt={`product image ${index + 1}`}
                    width={800}
                    height={600}
                    className="object-cover w-full md:h-[360px] h-[250px] rounded-[30px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 md:pl-10">
        <div className="relative">
          <h1 className="g font-semibold mb-1">
            {trimData?.year} {trimData?.brand} {trimData?.model}{" "}
            {trimData?.name}
          </h1>
        </div>
        {/* <span class="inline-flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-green-600/20">
        4.2 <StarIcon className="text-[14px] ml-1" />
      </span>
      <span className="text-[14px] mx-2">182 Ratings & Reviews</span>
      <span className="text-[14px] font-semibold underline">
        Rate Now
      </span> */}
        <div className="md:my-3 my-3">
          <h2>
            <Price data={trimData.price} />
          </h2>
          <p className="font-medium text-gray-500 mt-3">
            <Price
              data={Math.round(
                ((trimData.price - trimData.price * (downPayment / 100)) *
                  (interestRate / 100 / 12) *
                  Math.pow(1 + interestRate / 100 / 12, years * 12)) /
                (Math.pow(1 + interestRate / 100 / 12, years * 12) - 1)
              )}
            />
            /Monthly EMI*{" "}
            {/* <span className="underline ">
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
            className="flex items-center h-14 "
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
              <MenuItem key={index} value={trim.slug} className="flex">
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
                  className="inline-flex items-center pl-4 m-0"
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="md:my-5 my-7">
          <div className="grid grid-cols-3 gap-4 md:w-[70%]">
            <div className="flex items-center">
              <div>
                <h6 className="font-medium mb-0 text-gray-500">
                  {trimData?.fuelType === "Electric"
                    ? "Motor Type"
                    : "Engine Type"}
                </h6>
                <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                  {trimData?.fuelType === "Electric"
                    ? trimData?.motor?.split(" ")[0]
                    : `${(trimData?.displacement / 1000).toFixed(1)}L ${trimData?.engine
                    }`}
                </h5>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <h6 className="font-medium mb-0 text-gray-500">
                  {t.transmission}
                </h6>
                <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                  {trimData?.transmission}
                </h5>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <h6 className="font-medium mb-0 text-gray-500">
                  {t.power} (hp)
                </h6>
                <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                  {trimData?.power}
                </h5>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <h6 className="font-medium mb-0 text-gray-500">
                  {t.torque} (Nm)
                </h6>
                <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                  {trimData?.torque}
                </h5>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <h6 className="font-medium mb-0 text-gray-500">
                  {t.seats}
                </h6>
                <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                  {trimData?.seatingCapacity}
                </h5>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <h6 className="font-medium mb-0 text-gray-500">
                  {trimData?.fuelType === "Electric"
                    ? "Range"
                    : "Fuel Efficiency"}
                </h6>
                <h5 className="text-gray-500 font-semibold mt-1 mb-0">
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

        <div className="flex md:my-5 my-7 space-x-2">
          <PrimaryButton label="Reserve Online" additionalClass="font-bold" onClick={handleBuyOpen} />
          <OutlinedButton label="Book a Test Drive" onClick={handleOpen} />
        </div>
      </div>
    </div>

      <div className=" sticky top-0">
        <nav className="text-lg leading-none text-black bg-zinc-50 shadow mt-10  mb-10 overflow-x-scroll no-scrollbar">
          <div className="mx-auto container flex gap-7 items-center">
            <Link
              href="#specs"
              onClick={() => handleLinkClick("#specs")}
              className={`gap-2.5 py-5 self-stretch p-2.5 h-full whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#specs"
                ? "border-b-blue-600 text-black"
                : "border-transparent text-gray-500"
                }`}
            >
              Specs
            </Link>
            <Link
              href="#variants&prices"
              onClick={() => handleLinkClick("#variants&prices")}
              className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#variants&prices"
                ? "border-b-blue-600 text-black"
                : "border-transparent text-gray-500"
                }`}
            >
              Variants & Prices
            </Link>
            <Link
              href="#faq"
              onClick={() => handleLinkClick("#faq")}
              className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#faq"
                ? "border-b-blue-600 text-black"
                : "border-transparent text-gray-500"
                }`}
            >
              FAQ
            </Link>
          </div>
        </nav>
      </div>

      <div
        className="container mx-auto grid grid-cols-12"
        id="specs"
      >
        <div className="md:col-span-9 col-span-12">
          <TrimDescription trim={trimData} />
          <Suspense fallback={<div>Loading ad...</div>}>
            <Ad728x90 dataAdSlot="7369694604" />
          </Suspense>
        </div>
        <div className="md:col-span-3 col-span-12">
          {/* <Ad300x600 dataAdSlot="3792539533" /> */}
        </div>
      </div>

      {trimData?.key_features?.length > 0 && (
        <div id="key-features" className="container">
          <KeyFeatures data={trimData?.key_features} />

          <div className="my-10">
            <Suspense fallback={<div>Loading ad...</div>}>
              <Ad728x90 dataAdSlot="5962627056" />
            </Suspense>
          </div>
        </div>
      )}

      <div id="vehicle-details" className="container">
        <DetailedSpecification trim={trimData} />
      </div>

      <div className="my-10">
        <Suspense fallback={<div>Loading ad...</div>}>
          <Ad728x90 dataAdSlot="5962627056" />
        </Suspense>
      </div>
      <div id="vehicle-details" className="container">
        <VehicleReview trim={trimData} />
        <div className="my-10">
          <Suspense fallback={<div>Loading ad...</div>}>
            <Ad728x90 dataAdSlot="5962627056" />
          </Suspense>
        </div>
        {trimData?.galleryImages?.length > 0 && (
          <>
            {" "}  <Suspense fallback={<div>Loading ad...</div>}>
              <Ad728x90 dataAdSlot="5962627056" />
            </Suspense>
            <VehicleGallery trim={trimData.galleryImages} />
          </>
        )}

        <VehicleFaq trim={trimData} />
      </div>

      <div
        className="container mx-auto grid grid-cols-12 mt-14"
        id="reviews"
      >
        <div className="md:col-span-9 col-span-12">
          <CarDetailReview
              name={`${trimData?.brand} ${trimData?.model}`}
              year={trimData?.year}
              model={modelslug}
              brand={brandslug}
              link={`/brands/${brandslug}/${year}/${modelslug}/user-reviews#reviews`}
            />
        </div>
        <div className="md:col-span-3 col-span-9">
          {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
          <Ad300x600 dataAdSlot="3792539533" />
        </div>
      </div>

      <div id="variants&prices" className="container">
        <div className="my-10">
          <Suspense fallback={<div>Loading ad...</div>}>
            <Ad728x90 dataAdSlot="5962627056" />
          </Suspense>
        </div>
        <VariantsListing
          data={trimData}
          brandslug={brandslug}
          modelslug={modelslug}
          trimslug={trimslug}
        />
      </div>
      <div className="grid grid-cols-2 md:gap-10 gap-0 max-md:grid-cols-1 container px-5 my-10">
        <div className="flex flex-col w-full">
          <Link href="/loan-calculator" className="flex md:gap-2.5 ">
            <div className="flex flex-col rounded-2xl shadow-lg bg-stone-900 relative max-md:mt-6 md:h-[350px] h-[200px]">
              <img
                src="/emi.jpg"
                alt=""
                className="absolute inset-0 object-cover w-full md:h-[350px] h-[200px] rounded-2xl"
              />
              <div className="md:hidden block rounded-2xl absolute inset-0 bg-black opacity-30"></div>

              <div className="relative z-10 m-2 bottom-0 left-0 right-0 md:p-5 p-3 text-white">
                <div>
                  <h2 className="text-white">
                    Calculate Your Car Loan EMI
                  </h2>
                  <p className="md:mt-6 leading-6 md:w-[50%] w-full">
                    Fill in the details and find out what the installment
                    will be for your new car. Our car loan calculator is
                    interactive and accurate.
                  </p>
                </div>
                <div className="flex items-center gap-2 md:mt-10 mt-3">
                  <p className="text-white font-bold">
                    Calculate Now
                  </p>
                  <span className="material-symbols-outlined text-white">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col rounded-2xl shadow-lg bg-stone-900 relative max-md:mt-6 md:h-[350px] h-[200px]">
            <img
              src="/car-value.jpg"
              alt=""
              className="absolute inset-0 object-cover w-full md:h-[350px] h-[200px] rounded-2xl"
            />
            <div className="md:hidden block rounded-2xl absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 m-2 bottom-0 left-0 right-0 md:p-5 p-3 text-white">
              <div>
                <h2 className="text-white">
                  Find out the value of your current car
                </h2>
                <p className="md:mt-6 leading-6 md:w-[50%] w-full">
                  Our car valuation calculator helps you find out what you
                  can expect for your current car. Fill in the details and
                  get an estimated current value for your used car.
                </p>
              </div>

              <div className="flex md:gap-2.5 md:mt-10 mt-3">
                <p className="font-bold">Coming Soon</p>
                {/* <span className="material-symbols-outlined">
                arrow_forward
              </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {" "}
        <SeoLinksFilter />
      </div>

      <div className="car-details-area mt-15 mb-15">
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
      </div></div>
  )
}
