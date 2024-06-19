import { AddBox } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import altImage from "../../public/assets/images/blog-alt-image.png";
import useTranslate from "../utils/useTranslate";
import { useRouter } from "next/router";
import Head from "next/head";
import NewSearch from "../utils/NewSearch";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/src/lib/apolloClient";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";
import FilterLayout from "../components/find-car-multi-step-filter/FilterLayout";
import Ad728x90 from "../components/ads/Ad728x90";
import Ad300x600 from "../components/ads/Ad300x600";
import Ad300x250 from "../components/ads/Ad300x250";
import Ad970x250 from "../components/ads/Ad970x250";
import MainLayout from "../layout/MainLayout";

export default function index({
  bannerImage,
  bannerText,
  bodyTypes,
  brand,

  popularcars,
  featuredcars,
  electriccars,
  suv,
  performance,
  compare,
  articles,
  error,
  errorMessage,
}) {
  const sliderRef = useRef(null);
  const featuredSliderRef = useRef(null);
  const featuredSliderRefMob = useRef(null);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`custom-arrow custom-next-arrow text-black`}
        onClick={onClick}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    );
  };

  // Custom Prev Arrow
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`custom-arrow custom-prev-arrow text-black`}
        onClick={onClick}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const FeaturedData = [
    {
      model: "2024",
      brand: "Volkswagen",
      name: "All-New Geely Starray Launched In UAE At AED 84,900!",
      description:
        "AGMC, UAE's Geely distributor, introduces the 2024 Geely Starray, priced at AED 84,900. This SUV blends luxury, technology, and modern design, promising an unparalleled driving experience.",
      createdOn: "11th April 2024",
      url: "/news/all-new-geely-starray-launched-in-uae-at-aed-84900",
      image: "/all-new-geely-starray-launched-in-uae-at-aed-84900.jpg",
    },
    {
      model: "2024",
      brand: "Chery",
      name: "Aston Martin Revives Its Twin-Turbo V12 Engine! The new Vanquish Will Be The First Car To Get.",
      description:
        "Aston Martin unveils a pioneering V12 engine, boasting 835hp and 1000Nm torque, heralding a new era of luxury and performance. Handcrafted and destined for the Vanquish, it redefines ultra-luxury driving.",
      createdOn: "12th April 2024",
      url: "/news/aston-martin-revives-its-twin-turbo-v12-engine-the-new-vanquish-will-be-the-first-car-to-get",
      image:
        "/aston-martin-revives-its-twin-turbo-v12-engine-the-new-vanquish-will-be-the-first-car-to-get.jpg",
    },

    {
      model: "2024",
      brand: "Volkswagen",
      name: "Refreshed Land Rover Defender Lineup Unveiled With Extra Features And Power!",
      description:
        "The latest Land Rover Defender offers luxury and adventure with upgrades overseen by Mark Cameron, ensuring refinement and innovation. Signature interior packs, Sedona Editions, simplified specs, and enhanced power redefine exploration.",
      createdOn: "11th April 2024",
      url: "/news/refreshed-land-rover-defender-lineup-unveiled-with-extra-features-and-power",
      image:
        "/refreshed-land-rover-defender-lineup-unveiled-with-extra-features-and-power.jpg",
    },

    {
      model: "2024",
      brand: "Volkswagen",
      name: "Soon To Launch G90 BMW M5 Teased! Detailed Preview And Analysis.",
      description:
        "The BMW M5, known as the 'supercar killer', has thrilled enthusiasts for 40 years. The upcoming 7th-gen G90 M5 promises fresher looks, advanced technology, hybrid powertrain, and the return of the M5 Touring.",
      createdOn: "11th April 2024",
      url: "/news/soon-to-launch-g90-bmw-m5-teased-detailed-preview-and-analysis",
      image:
        "/soon-to-launch-g90-bmw-m5-teased-detailed-preview-and-analysis.jpg",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    autoplay: false,
    focusOnSelect: true,
    variableWidth: true,
    draggable: false,
    // beforeChange: (current, next) => setActiveSlide(next),
    // customPaging: (i) => (
    //   <div className="custom-dot">
    //     {i === activeSlide ? (
    //       <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-self-stretch tw-mt-[-4px] ">
    //         <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-[6px] tw-py-[6px] tw-rounded-full tw-border tw-border-black tw-border-solid">
    //           <div className="tw-shrink-0 tw-bg-black tw-rounded-full tw-border tw-border-black tw-border-solid tw-h-[9px] tw-w-[9px]" />
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="tw-shrink-0 tw-self-stretch tw-my-auto tw-rounded-full tw-bg-zinc-400 tw-h-[11px] tw-w-[11px] " />
    //     )}
    //   </div>
    // ),
    // appendDots: (dots) => (
    //   <div>
    //     <ul className="custom-dots tw-flex tw-justify-center tw-items-center md:tw-absolute tw-top-[-90px] md:tw-left-[48%] tw-items-center tw-gap-6">
    //       {dots}
    //     </ul>
    //   </div>
    // ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  };

  const cars = [
    {
      imgSrc: "/2024_Lexus_GX_Overtrail_NoriGreen.png",
      title: "2024 Lexus GX",
      price: "AED 185,850* - 299,145*",
    },
    {
      imgSrc: "/2024-Kia-Sorento.png",
      title: "2024 Kia Sorento",
      price: "Visit Site",
    },
    {
      imgSrc: "/2024-Land-Cruiser-Prado.png",
      title: "2024 Toyota Land Cruiser Prado",
      price: "AED 185,850* - 299,145*",
    },
    {
      imgSrc: "/hyundai-new-tucson-korean-specs.png",
      title: "2024 Hyundai Tucson",
      price: "AED 185,850* - 299,145*",
    },
    {
      imgSrc: "/New-Mercedes-Benz-G-Class.png",
      title: "2024 Mercedes G-Class",
      price: "AED 185,850* - 299,145*",
    },
    // {
    //   imgSrc: "/Lexus.jpg",
    //   title: "Volvo XC40",
    //   price: "AED 185,850* - 299,145*",
    // },

    // {
    //   imgSrc:
    //     "https://cdn.builder.io/api/v1/image/assets/TEMP/06bf7f966260e8b765e3d06ff0e9fa087ebdcae3fec0f705f11b9f250c2e3256?apiKey=7580612134c3412b9f32a9330debcde8&",
    //   title: "Volvo XC40",
    //   price: "AED 185,850* - 299,145*",
    // },
  ];

  const categorysliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time when switching tabs
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, [selectedTab]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filterCars = (category) => {
    switch (category) {
      case 0:
        return popularcars?.carModels;
      case 1:
        return electriccars?.carModels;
      case 2:
        return suv?.carModels;
      case 3:
        return performance?.carModels;
      default:
        return popularcars?.carModels;
    }
  };

  const categories = [
    "Most Popular",
    "Electric Cars",
    "SUVs",
    "Performance Cars",
  ];

  const CarPriceRange = ({ minPrice, maxPrice }) => {
    const formatPrice = (price) => {
      return price.toLocaleString("en-AE", {
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

    return (
      <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-[21px] ">
        {priceInfo}
      </span>
    );
  };

  const CarEMIDisplay = ({ minPrice }) => {
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

    return (
      <span className="tw-mt-1 tw-text-base tw-font-semibold">{emiString}</span>
    );
  };

  const t = useTranslate();

  const router = useRouter();

  const isSearchCarsPage = router.asPath.startsWith("/search-cars");

  const canonicalUrl = isSearchCarsPage
    ? "https://carprices.ae/search-cars"
    : "https://carprices.ae" + router.asPath.split("?")[0];

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const UpcomingNextArrow = ({ onClick }) => {
    return (
      <button
        className="tw-bg-white tw-text-black tw-px-4 tw-pb-1 tw-pt-2 tw-rounded-full tw-shadow-md"
        onClick={onClick}
      >
        &gt;
      </button>
    );
  };

  // Custom Previous Button
  const UpcomingPrevArrow = ({ onClick }) => {
    return (
      <button
        className="tw-bg-white tw-text-black tw-px-4 tw-py-2 tw-rounded-full tw-shadow-md"
        onClick={onClick}
      >
        &lt;
      </button>
    );
  };

  const settingsupcoming = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // const Ad300x250 = dynamic(() => import("../components/ads/Ad300x250"), {
  //   ssr: false,
  // });
  // const Ad970x250 = dynamic(() => import("../components/ads/Ad970x250"), {
  //   ssr: false,
  // });
  // const Ad728x90 = dynamic(() => import("../components/ads/Ad728x90"), {
  //   ssr: false,
  // });
  // const Ad300x600 = dynamic(() => import("../components/ads/Ad300x600"), {
  //   ssr: false,
  // });
  // const FilterLayout = dynamic(
  //   () => import("../components/find-car-multi-step-filter/FilterLayout"),
  //   { ssr: false }
  // );

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
              description:
                "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
              url: canonicalUrl,
            }),
          }}
        />
      </Head>

      <MainLayout
        pageMeta={{
          title:
            "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
          description:
            "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
          type: "Car Review Website",
        }}
      >
        <main className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-w-full tw-font-gilroy tw-overflow-x-hidden">
          <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full tw-container">
           

            <div className="tw-row-span-1 md:tw-col-span-7 tw-col-span-12 tw-flex tw-flex-col md:tw-justify-start tw-text-white tw-rounded-2xl tw-leading-[100%] tw-relative tw-overflow-hidden md:tw-h-full tw-h-[230px] md:tw-order-1 tw-order-2">
              <div className="video-container">
                <video
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/path/to/poster.jpg"
                  className="banner-video"
                >
                  <source
                    src="https://cdn.carprices.ae/assets/Promo_Web_1_103eaf6dea.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Overlay and additional content can go here */}
              {/* <div className="md:tw-block tw-hidden">
                <Ad728x90 dataAdSlot="4367254600" />
              </div> */}
            </div>
            <div className="tw-row-span-1 md:tw-col-span-3 tw-col-span-12 tw-flex tw-flex-col tw-justify-center tw-rounded-2xl tw-border tw-border-neutral-100 tw-overflow-hidden md:tw-order-2 tw-order-1">
              <FilterLayout />
            </div>
          </div>

          <div className="tw-container tw-mx-auto tw-px-4 md:tw-py-8 tw-relative ">
            <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
              What’s trending in the new car market?
            </h5>
            <h2 className=" tw-font-semibold">
              Here are some of the featured new cars in the UAE
            </h2>
            {/* <a href="#" className="tw-text-blue-600 tw-hover:tw-underline">
    View More
  </a> */}

            <div className="tw-absolute tw-top-10 tw-right-0 md:tw-block tw-hidden">
              <Ad300x600 dataAdSlot="3792539533" />
            </div>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-5">
              <div className="lg:tw-col-span-3">
                <Slider {...sliderSettings}>
                  {featuredcars?.carModels.map((car, index) => (
                    <Link
                      key={car.id}
                      href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                    >
                      <div className="tw-px-2">
                        <div className="tw-flex tw-flex-col tw-h-full tw-py-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-lg">
                          <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-5 tw-flex-grow ">
                            <div className="tw-self-start tw-py-1 tw-px-3 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30 ">
                              Model: {car?.highTrim?.year}
                            </div>
                            <img
                              loading="lazy"
                              src={car?.highTrim?.featuredImage}
                              className="tw-self-center tw-w-full tw-h-48 tw-object-contain"
                              alt=""
                            />
                          </div>
                          <div className="tw-flex tw-flex-col tw-justify-center tw-px-5 tw-pt-3 tw-mt-2 tw-w-full tw-flex-grow">
                            <h6 className="tw-m-0 tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                              {car.brand.name}
                            </h6>
                            <h4 className=" tw-m-0 tw-text-lg tw-leading-6 tw-text-gray-900 tw-font-semibold">
                              {car.name}
                            </h4>
                            <CarPriceRange
                              minPrice={car?.minPrice}
                              maxPrice={car?.maxPrice}
                            />
                          </div>
                          {/* <div className="tw-px-5">
              <div className="tw-flex tw-justify-between tw-p-4 tw-mt-3 tw-w-full tw-rounded-lg tw-bg-slate-100 tw-text-neutral-900 ">
                <div className="tw-flex tw-flex-col tw-text-center">
                  <span className="tw-text-xs tw-leading-5 tw-uppercase">
                    Mileage
                  </span>
                  <span className="tw-text-base tw-font-semibold">
                    {car.mileage}
                  </span>
                </div>
                <div className="tw-flex tw-flex-col tw-text-center">
                  <span className="tw-text-xs tw-leading-5 tw-uppercase">
                    Transmission
                  </span>
                  <span className="tw-text-base tw-font-semibold">
                    {car.transmission}
                  </span>
                </div>
                <div className="tw-flex tw-flex-col tw-text-center">
                  <span className="tw-text-xs tw-leading-5 tw-uppercase">
                    Seats
                  </span>
                  <span className="tw-text-base tw-font-semibold">
                    {car.seats}
                  </span>
                </div>
              </div>
            </div> */}

                          <div className="tw-flex tw-mt-4 tw-w-full tw-justify-between tw-items-center tw-px-5">
                            <div className="tw-flex tw-flex-col tw-items-left">
                              <span className="tw-text-xs tw-leading-3">
                                EMI Starting from
                              </span>
                              <CarEMIDisplay minPrice={car?.minPrice} />
                            </div>
                            <button className="tw-mt-3 tw-px-7 tw-py-3 tw-text-base tw-font-semibold tw-tracking-tight tw-leading-4 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-rounded-full tw-hover:tw-bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
                <div className=" md:tw-block tw-hidden">
                  <Ad728x90 dataAdSlot="4367254600" />
                </div>
              </div>
              <div className="tw-top-0 tw-right-0">
                <div className="tw-flex tw-flex-col tw-h-full tw-py-5 ">
                  <div className="md:tw-hidden tw-block">
                    <Ad300x250 dataAdSlot="8451638145" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-container tw-mx-auto tw-px-4 md:tw-py-8 tw-overflow-hidden">
            <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
              <div className="tw-flex tw-flex-col  tw-justify-between tw-w-1/4 max-md:tw-w-full tw-justify-center">
                <div className="tw-flex tw-flex-col max-md:tw-mt-10">
                  {/* <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Featured car news
                </h5> */}

                  <h2 className="tw-mt-2 tw-text-4xl tw-leading-8 tw-font-semibold tw-text-neutral-900">
                    Featured car news
                  </h2>
                  <p className="md:tw-mt-4 tw-text-base tw-leading-6 tw-text-neutral-900">
                    CarPrices.ae brings car buyers and enthusiasts automotive
                    news coverage with high-res images and video from car shows
                    and reveals around the world.
                  </p>
                  <Link href="/news">
                    <button className="tw-self-start md:tw-px-14 tw-px-8 md:tw-py-5 tw-py-2 md:tw-mt-9 tw-mt-4 tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-rounded-full max-md:tw-px-5">
                      View More
                    </button>
                  </Link>
                </div>
                <div className="md:tw-flex tw-hidden tw-justify-end items-center tw-gap-4 py-2 ">
                  <button
                    className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                    onClick={() => featuredSliderRef.current.slickPrev()}
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                    onClick={() => featuredSliderRef.current.slickNext()}
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>

                <div className="md:tw-hidden tw-flex tw-justify-end items-center tw-gap-4 py-2">
                  <button
                    className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                    onClick={() => featuredSliderRefMob.current.slickPrev()}
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                    onClick={() => featuredSliderRefMob.current.slickNext()}
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
              <div className="md:tw-flex tw-hidden tw-flex-col tw-w-3/4 max-md:tw-w-full featured-news-card tw-mt-5">
                <Slider ref={featuredSliderRef} {...settings}>
                  {FeaturedData.map((car, index) => (
                    <Link href={car.url} key={index} className="tw-p-2">
                      <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-2xl tw-transition-transform tw-duration-500 tw-custom-scale">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.name}`}
                          className="tw-object-cover tw-w-full tw-h-96"
                        />
                        <div className="tw-m-2 tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-mt-96 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50  tw-bg-black tw-rounded-2xl tw-text-white">
                          <h6 className="tw-text-white tw-mb-0">{car.name}</h6>
                          {/* <small className="tw-mt-1 tw-text-white">
                Created on: {car.createdOn}
              </small> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
              <div className="md:tw-hidden tw-block">
                <Slider {...settings}>
                  {FeaturedData.map((item, index) => (
                    <Link href={item.url} key={index} className="tw-p-2">
                      <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-2xl tw-transition-transform tw-duration-500 tw-custom-scale">
                        <img
                          src={item.image}
                          alt={`${item.brand} ${item.name}`}
                          className="tw-object-cover tw-w-full tw-h-96"
                        />
                        <div className="tw-m-2 tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-mt-96 tw-rounded-xl tw-border tw-border-solid tw-backdrop-blur-[4px] tw-bg-zinc-500 tw-bg-opacity-10 tw-border-white tw-border-opacity-10 max-md:tw-mt-10 tw-text-white">
                          <h6 className="tw-text-white">{item.name}</h6>
                          {/* <small className="tw-mt-1 tw-text-white">
              Created on: {car.createdOn}
            </small> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-container md:tw-mt-14 tw-mt-8">
            <div className="tw-flex tw-flex-col tw-self-start tw-px-5 max-md:tw-max-w-full">
              <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                Most popular new cars in the UAE
              </h5>
              <h2 className=" tw-font-semibold">
                Here are some of the most popular new cars users look for in the
                UAE
              </h2>
            </div>

            <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-mt-3 tw-w-full tw-text-base tw-leading-4 tw-text-center tw-text-neutral-900 max-md:tw-flex-wrap max-md:tw-max-w-full">
              <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-px-5 max-md:tw-flex-wrap max-md:tw-max-w-full">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="tw-flex tw-flex-col tw-justify-center"
                  >
                    <div
                      className={`tw-justify-center md:tw-px-14 tw-px-10 md:tw-py-5 tw-py-3 tw-border tw-border-solid tw-rounded-[73px] max-md:tw-px-5 tw-cursor-pointer ${
                        selectedTab === index
                          ? "tw-bg-neutral-900 tw-text-white"
                          : "tw-bg-violet-100 tw-border-violet-100"
                      }`}
                      onClick={() => setSelectedTab(index)}
                    >
                      {category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tw-px-4">
              {/* {loading ? (
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                {Array.from(new Array(6)).map((_, index) => (
                  <div key={index} className="tw-px-2">
                    <Skeleton variant="rectangular" width="100%" height={250} />
                    <Skeleton width="60%" height={30} className="tw-mt-2" />
                    <Skeleton width="80%" height={30} className="tw-mt-2" />
                    <Skeleton width="40%" height={30} className="tw-mt-2" />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={50}
                      className="tw-mt-4"
                    />
                  </div>
                ))}
              </div>
            ) : ( */}
              <Slider key={selectedTab} {...categorysliderSettings}>
                {filterCars(selectedTab).map((car, index) => (
                  <Link
                    key={car.id}
                    href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                  >
                    <div key={index} className="tw-px-2">
                      <div className="tw-flex tw-flex-col tw-h-full tw-py-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-lg">
                        <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-5 tw-flex-grow">
                          <div className="tw-self-start tw-py-1 tw-px-3 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
                            Model: {car?.highTrim?.year}
                          </div>
                          {loading ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={192}
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src={car?.highTrim?.featuredImage}
                              className="tw-self-center tw-w-full tw-h-48 tw-object-contain"
                              alt=""
                            />
                          )}
                        </div>
                        <div className="tw-flex tw-flex-col tw-justify-center tw-px-5 tw-pt-3 tw-mt-2 tw-w-full tw-flex-grow tw-m-0">
                          <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold tw-m-0">
                            {car.brand.name}
                          </h6>
                          <h4 className="tw-text-lg tw-text-gray-900 tw-font-semibold tw-m-0">
                            {car.name}
                          </h4>
                          <CarPriceRange
                            minPrice={car?.minPrice}
                            maxPrice={car?.maxPrice}
                          />
                        </div>

                        {/* <div className="tw-px-5">
          <div className="tw-flex tw-justify-between tw-p-4 tw-mt-3 tw-w-full tw-rounded-lg tw-bg-slate-100 tw-text-neutral-900 ">
            <div className="tw-flex tw-flex-col tw-text-center">
              <span className="tw-text-xs tw-leading-5 tw-uppercase">
                Mileage
              </span>
              <span className="tw-text-base tw-font-semibold">
                {car.mileage}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-text-center">
              <span className="tw-text-xs tw-leading-5 tw-uppercase">
                Transmission
              </span>
              <span className="tw-text-base tw-font-semibold">
                {car.transmission}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-text-center">
              <span className="tw-text-xs tw-leading-5 tw-uppercase">
                Seats
              </span>
              <span className="tw-text-base tw-font-semibold">
                {car.seats}
              </span>
            </div>
          </div>
        </div> */}

                        <div className="tw-flex tw-mt-4 tw-w-full tw-justify-between tw-items-center tw-px-5">
                          <div className="tw-flex tw-flex-col tw-items-left">
                            <span className="tw-text-xs tw-leading-3">
                              EMI Starting from
                            </span>
                            <CarEMIDisplay minPrice={car?.minPrice} />
                          </div>

                          <button className="tw-mt-3 tw-px-7 tw-py-3 tw-text-base tw-font-semibold tw-tracking-tight tw-leading-4 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-rounded-full tw-hover:tw-bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
              {/* )} */}
            </div>
          </div>

          <div className="tw-container tw-mt-12 tw-mb-8">
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 w-full">
              <div className="tw-pt-3 lg:tw-col-span-2">
                <div className="tw-flex tw-flex-col tw-h-full tw-py-5">
                  <div className="tw-flex md:tw-flex-col tw-justify-between tw-h-full md:tw-p-4 md:tw-px-0 tw-px-5">
                    {/* <div className="tw-self-end tw-text-7xl tw-leading-[96px] max-md:tw-text-4xl">
          20+
        </div> */}
                    <div className="md:tw-text-3xl md:tw-text-left tw-text-xl tw-font-bold md:px-0 px-2">
                      Notable
                      <br /> Upcoming Cars
                    </div>
                    <div className="tw-flex tw-justify-center items-center tw-gap-4 py-2">
                      <button
                        className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                        onClick={() => sliderRef.current.slickPrev()}
                      >
                        <span className="material-symbols-outlined">
                          chevron_left
                        </span>
                      </button>
                      <button
                        className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                        onClick={() => sliderRef.current.slickNext()}
                      >
                        <span className="material-symbols-outlined">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:tw-col-span-10">
                <Slider ref={sliderRef} {...settingsupcoming}>
                  {cars.map((item, index) => (
                    <div
                      key={index}
                      className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-white tw-bg-black"
                    >
                      <div className="tw-relative tw-flex tw-flex-col tw-justify-end tw-pt-20 tw-w-full tw-min-h-[400px]">
                        <img
                          loading="lazy"
                          srcSet={`${item.imgSrc} 480w, ${item.imgSrc} 800w, ${item.imgSrc} 1200w`}
                          sizes="(max-width: 600px) 480px, (max-width: 960px) 800px, 1200px"
                          src={`${item.imgSrc}`}
                          className="tw-object-cover tw-absolute tw-inset-0 tw-w-full tw-h-full"
                          alt={item.title}
                        />
                        <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-px-4 tw-py-5 max-md:tw-mt-10 max-md:tw-max-w-full">
                          <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
                            <h4 className="tw-text-white tw-self-start tw-font-bold">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* <div className="tw-flex tw-flex-col tw-items-center tw-pt-3 tw-pr-2 tw-pb-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-max-w-[750px]">
          <div className="tw-flex tw-gap-5 tw-justify-between tw-px-5 tw-w-full tw-max-w-[718px] max-md:tw-flex-wrap max-md:tw-max-w-full">
            <div className="tw-flex tw-flex-col tw-justify-center tw-rounded-2xl tw-w-[150px] tw-h-[150px]">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&"
                className="tw-w-full tw-h-full tw-object-contain tw-rounded-2xl"
              />
            </div>
            <div className="tw-justify-center tw-items-center tw-self-end tw-px-2 tw-mt-24 tw-w-7 tw-h-7 tw-text-xs tw-font-semibold tw-tracking-tight tw-leading-5 tw-text-center tw-text-white tw-whitespace-nowrap tw-bg-blue-600 tw-rounded-full max-md:tw-mt-10">
              Vs
            </div>
            <div className="tw-flex tw-flex-col tw-justify-center tw-rounded-2xl tw-w-[150px] tw-h-[150px]">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1e4eafce27d84a9ee97ab9b1576be3ceeb27e225559b55bb742d09365e20a3aa?apiKey=7580612134c3412b9f32a9330debcde8&"
                className="tw-w-full tw-h-full tw-object-contain tw-rounded-2xl"
              />
            </div>
          </div>
          <div className="tw-flex tw-gap-3.5 tw-self-stretch tw-mt-2 max-md:tw-flex-wrap">
            <div className="tw-flex tw-flex-col tw-flex-1 tw-grow tw-shrink-0 tw-justify-center tw-px-5 tw-pt-3 tw-basis-0 tw-w-fit">
              <div className="tw-flex tw-flex-col">
                <div className="tw-flex tw-flex-col">
                  <div className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase">
                    Volvo
                  </div>
                  <div className="tw-text-lg tw-leading-6 tw-text-gray-900">
                    Volvo XC40
                  </div>
                </div>
                <div className="tw-mt-1.5 tw-text-2xl tw-leading-8 tw-text-center tw-text-neutral-900">
                  AED 185,850* - 299,145*
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-flex-1 tw-grow tw-shrink-0 tw-justify-center tw-px-5 tw-pt-3 tw-basis-0 tw-w-fit">
              <div className="tw-flex tw-flex-col">
                <div className="tw-flex tw-flex-col">
                  <div className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase">
                    BMW
                  </div>
                  <div className="tw-text-lg tw-leading-6 tw-text-gray-900">
                    1 Series
                  </div>
                </div>
                <div className="tw-mt-1.5 tw-text-2xl tw-leading-8 tw-text-center tw-text-neutral-900">
                  AED 185,000*
                </div>
              </div>
            </div>
          </div>
          <div className="tw-justify-center tw-items-center tw-px-4 tw-py-2 tw-mt-4 tw-w-full  tw-font-semibold tw-tracking-tight tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-max-w-[710px] tw-rounded-[73px] max-md:tw-px-5 max-md:tw-max-w-full">
            Compare Now
          </div>
        </div> */}

          <div className="tw-w-full md:px-0 tw-px-5 md:tw-mt-14">
            <div className="tw-relative tw-flex tw-flex-col tw-justify-center container">
              <div className="tw-flex tw-flex-col tw-justify-center">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Choose your Brand
                </h5>
                <h2 className=" tw-font-semibold">
                  Shop by car brands available in the UAE
                </h2>
              </div>
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-5 max-md:tw-gap-0">
              <div className="tw-flex tw-flex-col max-md:tw-w-full">
                <div className="tw-relative tw-flex tw-flex-col tw-grow md:tw-items-end md:tw-px-16 md:tw-pb-20 md:tw-min-h-[519px] ">
                  <img
                    loading="lazy"
                    srcSet="/car-side.png"
                    className="tw-object-contain tw-absolute tw-inset-0 tw-w-full tw-h-full md:tw-block tw-hidden"
                  />
                </div>
              </div>
              <div className="tw-flex tw-flex-col tw-justify-center tw-col-span-3 max-md:tw-w-full ">
                <div className="tw-grid md:tw-grid-cols-6 tw-grid-cols-3 tw-gap-5 md:tw-pr-20 max-md:tw-pr-5">
                  {brand.map((item, index) => (
                    <Link
                      href={`/brands/${item?.slug}`}
                      key={index}
                      className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-text-black tw-p-4"
                    >
                      <img
                        loading="lazy"
                        src={`${item?.logo}`}
                        className="tw-object-contain tw-aspect-square md:tw-w-[90px] tw-w-[80px] md:tw-grayscale hover:tw-filter-none"
                      />
                      <div className="md:tw-mt-6 tw-font-semibold tw-whitespace-nowrap">
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/brands">
                  <button className="tw-flex tw-justify-center tw-items-center tw-px-16 md:tw-py-5 tw-py-3 tw-mt-14 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-rounded-[73px] md:tw-w-[300px] tw-w-full max-md:tw-px-5 max-md:tw-mt-10">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/news/Ferrari-V12-has-arrived-again-with-the-12cilindri-redlines-at-9500rpm"
            className="tw-w-full tw-h-full md:tw-block tw-hidden"
          >
            <img
              loading="lazy"
              srcSet="/Banner-Sponsored-Desktop.jpg"
              className="tw-object-contain tw-w-full tw-h-full md:tw-block tw-hidden tw-mt-10 "
            />
          </Link>
          <Link
            href="/news/Ferrari-V12-has-arrived-again-with-the-12cilindri-redlines-at-9500rpm"
            className="tw-w-full tw-h-full md:tw-hidden tw-block"
          >
            <img
              loading="lazy"
              srcSet="/Banner-Sponsored-Mobile.jpg"
              className="tw-object-contain tw-w-full tw-h-full md:tw-hidden tw-block tw-mt-10 tw-mb-3"
            />
          </Link>

          <div className="tw-container md:tw-my-20 tw-my-4 tw-px-5">
            <div className="tw-flex tw-justify-between tw-items-start tw-gap-5 tw-w-full max-md:tw-flex-wrap max-md:tw-max-w-full">
              <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Choose by body type
                </h5>
                <h2 className=" tw-font-semibold">
                  Explore new cars based on body type
                </h2>
              </div>
              {/* <button className="tw-px-6 tw-py-3 tw-mt-4 tw-text-base tw-tracking-tight tw-leading-4 tw-text-center tw-rounded-[119px] tw-text-neutral-900">
      View More
    </button> */}
            </div>

            <div className="tw-grid md:tw-grid-cols-5 tw-grid-cols-3 md:tw-gap-10 tw-gap-8 md:tw-mt-10 tw-mt-5 tw-max-w-full">
              {bodyTypes.map((item, index) => (
                <Link href={`/category/${item?.slug}`} key={index}>
                  <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-text-black">
                    <div className="tw-w-full md:tw-h-32 tw-h-24 tw-overflow-hidden">
                      <img
                        loading="lazy"
                        src={`${item?.image}`}
                        className="tw-object-contain tw-w-full tw-h-full tw-transition-all tw-duration-300 md:tw-py-3 md:tw-px-3 py-1 px-1"
                      />
                    </div>
                    <div className=" tw-font-semibold">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-2 md:tw-gap-10 tw-gap-0 max-md:tw-grid-cols-1 tw-container tw-px-5">
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

          {/* <div className="container">
        <div className="grid grid-cols-2 md:gap-10 gap-0 max-md:grid-cols-1 md:mt-10 md:mb-10">
          <div className="flex flex-col w-full">
            <div className="flex flex-col  rounded-2xl shadow-lg bg-stone-900 relative max-md:mt-6  md:h-[300px] h-[200px]">
              <img
                src="/sponsored.jpg"
                alt=""
                className="absolute inset-0 object-cover w-full md:h-[350px] h-[200px] rounded-2xl"
              />
              <div className="relative z-10 m-2 bottom-0 left-0 right-0 md:p-5 p-3 tw-text-white"></div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col  rounded-2xl shadow-lg bg-stone-900 relative max-md:mt-6  md:h-[350px] h-[200px]">
              <img
                src="/sponsored-content-3.png"
                alt=""
                className="absolute inset-0 object-cover w-full md:h-[350px] h-[200px] rounded-2xl"
              />
              
            </div>
          </div>
        </div>
      </div> */}
          <div className="tw-flex tw-flex-col tw-container md:tw-mt-10 tw-my-6 tw-px-5">
            <div className="tw-flex tw-flex-wrap tw-justify-between tw-w-full tw-gap-5">
              <div className="tw-flex tw-flex-col tw-max-w-full">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Trending videos
                </h5>
                <h2 className=" tw-font-semibold">
                  Here are some of the trending videos from our YouTube channel
                </h2>
              </div>
              {/* <div className="tw-self-start tw-px-6 tw-py-3 tw-mt-2.5 tw-text-base tw-tracking-tight tw-leading-4 tw-text-center tw-rounded-[119px] tw-text-neutral-900">
      View More
    </div> */}
            </div>
            <div className="tw-grid tw-gap-5 md:tw-mt-7 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3">
              {[
                {
                  imgSrc: "/10-Facts-About-The-LC.png",
                  name: "10 Historic Facts & Milestones That Toyota Land Cruiser Achieved In Its 70 Years Of Existence!",
                  url: "https://www.youtube.com/watch?v=hZnYCpjc744&t=12s",
                },
                {
                  imgSrc: "/2024-GX-VS-2024-Prado.png",
                  name: "Battle Between Brothers From Same Mother | 2024 Lexus GX🤜 VS 🤛2024 Toyota Land Cruiser Prado!",
                  url: "https://www.youtube.com/watch?v=CpuigJn1tkA&t=42s",
                },
                {
                  imgSrc: "/2024-Prado-VS-LC300.png",
                  name: "2024 Toyota Land Cruiser Prado 🤜VS🤛 2023 Land Cruiser 300 Series | The Most Iconic SUV Battle💪!",
                  url: "https://www.youtube.com/watch?v=_yy4xm_p5fU",
                },
              ].map((item, index) => (
                <Link
                  href={item.url}
                  target="_blank"
                  key={index}
                  className="tw-flex tw-flex-col tw-bg-white tw-rounded-2xl tw-shadow-sm tw-pb-7 max-md:tw-mt-5"
                >
                  <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-justify-center tw-w-full tw-rounded-2xl md:tw-min-h-[250px] tw-min-h-[200px]">
                    <img
                      loading="lazy"
                      srcSet={item?.imgSrc}
                      className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-full tw-h-[200px]"
                    />
                  </div>
                  <div className="tw-relative tw-flex tw-flex-col tw-pl-7 tw-mt-7 tw-text-neutral-900 max-md:tw-pl-5">
                    <img
                      loading="lazy"
                      src="/playbutton.svg"
                      className=" tw-absolute tw-right-5 tw-top-[-53px] tw-w-[47px]"
                    />
                    <div className="tw-flex tw-flex-wrap tw-justify-between tw-gap-5 ">
                      <h4 className=" tw-text-black tw-font-semibold line-clamp-2">
                        {item.name}
                      </h4>
                    </div>
                    {/* <small className="tw-flex tw-flex-wrap tw-mt-2 tw-text-base">
            <div className="tw-uppercase">Carprices.ae Team -</div>
            <div>12th April 2024</div>
          </small> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-container tw-px-5 md:tw-mt-8 tw-mt-0">
            <div className="tw-flex tw-justify-between tw-gap-5 tw-px-px tw-w-full max-md:tw-flex-wrap">
              <div className="">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Trending automotive news
                </h5>
                <h2 className=" tw-font-semibold">Latest Automotive News</h2>
              </div>
              {/* <div className="tw-self-start tw-px-6 tw-py-3 tw-mt-2.5 tw-text-base tw-tracking-tight tw-leading-4 tw-text-center tw-rounded-[119px] tw-text-neutral-900">
      View More
    </div> */}
            </div>
            <div className="tw-mt-7 tw-w-full">
              <div className="tw-grid tw-grid-cols-3 tw-gap-5 max-md:tw-grid-cols-1">
                <Link
                  href={`/news/${articles.news[0]?.slug}`}
                  className="md:tw-flex tw-hidden tw-col-span-2 tw-relative tw-flex-col tw-justify-end tw-p-8 tw-pt-20 tw-pb-9 tw-text-slate-100 tw-bg-cover tw-rounded-2xl tw-min-h-[838px]"
                  style={{
                    backgroundImage: `url('${articles.news[0].coverImage}')`,
                  }}
                >
                  <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-p-4 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl">
                    <div className="tw-px-6">
                      <div className="tw-text-4xl tw-line-clamp-2 tw-text-white">
                        {articles.news[0].title}
                      </div>
                      <div className="tw-mt-1 tw-text-base tw-line-clamp-2 tw-text-white">
                        {articles.news[0].summary}
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href={`/news/${articles.news[0]?.slug}`}
                  key={index}
                  className="md:tw-hidden tw-flex tw-relative tw-flex-col tw-justify-end tw-p-4 tw-text-slate-100 tw-bg-cover tw-rounded-2xl tw-min-h-[269px]"
                  style={{
                    backgroundImage: `url('${articles.news[0].coverImage}')`,
                  }}
                >
                  <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-p-4 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50  tw-bg-black tw-rounded-2xl">
                    <div className="tw-text-lg tw-text-white">
                      {articles.news[0].title}
                    </div>
                    {/* <div className="tw-flex tw-mt-1 tw-text-sm">
            <div className="tw-uppercase">Carprices Team - </div>
            <div>12th April 2024</div>
          </div> */}
                  </div>
                </Link>

                <div className="tw-grid tw-grid-rows-3 tw-gap-4">
                  {articles.news.slice(1, 4).map((item, index) => (
                    <Link href={`/news/${item?.slug}`}>
                      <div
                        key={index}
                        className="tw-relative tw-flex tw-flex-col tw-justify-end tw-p-4 tw-text-slate-100 tw-bg-cover tw-rounded-2xl tw-min-h-[269px]"
                        style={{
                          backgroundImage: `url('${
                            item?.coverImage ? item?.coverImage : altImage
                          }')`,
                        }}
                      >
                        <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-p-4 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50  tw-bg-black tw-rounded-2xl">
                          <div className="tw-text-lg tw-text-white">
                            {item.title}
                          </div>
                          {/* <div className="tw-flex tw-mt-1 tw-text-sm">
                  <div className="tw-uppercase">Carprices Team - </div>
                  <div>12th April 2024</div>
                </div> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tw-mt-12 tw-w-full max-md:tw-pr-5 max-md:tw-mt-10 max-md:tw-max-w-full tw-container tw-px-5">
            <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
              <div className="tw-flex tw-flex-col tw-w-[33%] max-md:tw-ml-0 max-md:tw-w-full">
                <div className="max-md:tw-mt-10">
                  <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
                    <div className="tw-flex tw-flex-col tw-w-6/12 max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-grow tw-text-sm tw-leading-6 tw-capitalize tw-text-neutral-900 max-md:tw-mt-10">
                        <h4 className="tw-font-semibold">Popular New Cars</h4>
                        <div className="tw-flex tw-flex-col tw-mt-4">
                          <Link href="https://carprices.ae/brands/toyota/2024/land-cruiser-70">
                            New Toyota Land Cruiser 70 Series
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/toyota/2024/land-cruiser"
                            className="tw-mt-2"
                          >
                            New Toyota Land Cruiser 300 Series
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/toyota/2024/rav4-hybrid"
                            className="tw-mt-2 max-md:tw-mr-2.5"
                          >
                            New Toyota Rav 4
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/toyota/2024/hilux"
                            className="tw-mt-2"
                          >
                            New Toyota Hilux
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/toyota/2024/rav4"
                            className="tw-mt-2"
                          >
                            New Toyota Camry
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/hyundai/2024/tucson"
                            className="tw-mt-2"
                          >
                            New Hyundai Tucson
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/hyundai/2024/santa-fe"
                            className="tw-mt-2"
                          >
                            New Hyundai Santa Fe
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/ford/2024/bronco"
                            className="tw-mt-2"
                          >
                            New Ford Bronco
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/ford/2024/f-150"
                            className="tw-mt-2"
                          >
                            New Ford F-150
                          </Link>
                          <Link
                            href="https://carprices.ae/brands/chevrolet/2024/silverado"
                            className="tw-mt-2"
                          >
                            New Chevrolet Silverado
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-ml-5 tw-w-6/12 max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-grow tw-mt-12 tw-text-sm tw-leading-6 tw-capitalize tw-text-neutral-900">
                        <Link href="https://carprices.ae/brands/mitsubishi/2024/outlander">
                          New Mitsubishi Outlander
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/jeep/2024/wrangler"
                          className="tw-mt-2"
                        >
                          New Jeep Wrangler
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/honda/2024/accord"
                          className="tw-mt-2 max-md:tw-mr-2.5"
                        >
                          New Honda Accord
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/honda/2024/civic"
                          className="tw-mt-2"
                        >
                          New Honda Civic
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/honda/2024/cr-v"
                          className="tw-mt-2"
                        >
                          New Honda CR-V
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/geely/2024/coolray"
                          className="tw-mt-2"
                        >
                          New Geely Tugella
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/geely/2024/starray"
                          className="tw-mt-2"
                        >
                          New Geely Starray
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/nissan/2024/patrol-safari"
                          className="tw-mt-2"
                        >
                          New Nissan Patrol Safari
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/nissan/2024/patrol"
                          className="tw-mt-2"
                        >
                          New Nissan Patrol
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/audi/2024/a3-sedan"
                          className="tw-mt-2"
                        >
                          New Audi A3
                        </Link>
                        <Link
                          href="https://carprices.ae/brands/bmw/2024/3-series-sedan"
                          className="tw-mt-2"
                        >
                          New BMW 3-Series
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tw-flex tw-flex-col tw-ml-5 tw-w-[33%] max-md:tw-ml-0 max-md:tw-w-full">
                <div className="tw-flex tw-flex-col tw-text-sm tw-leading-6 tw-capitalize tw-text-neutral-900 max-md:tw-mt-10">
                  <h4 className=" tw-font-semibold">Most Searched Keywords</h4>
                  <div className="tw-flex tw-flex-col tw-mt-4">
                    <Link href="https://carprices.ae/news/10-important-things-to-know-about-the-2024-toyota-land-cruiser-prado-before-its-uae-launch">
                      10 Important Things To Know About the 2024 Toyota Land
                      Cruiser Prado Before Its UAE Launch!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500"
                      className="tw-mt-2"
                    >
                      The 2024 Toyota Land Cruiser Prado VS The GWM Tank 500!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/5-exciting-car-launches-to-happen-in-the-uae-in-2024"
                      className="tw-mt-2"
                    >
                      5 Exciting Car Launches To Happen In The UAE In 2024!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae"
                      className="tw-mt-2"
                    >
                      10 Popular Cars In UAE With High Ground Clearance Sorted
                      By Price Low To High!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae"
                      className="tw-mt-2"
                    >
                      Internal Combustion Engine Car VS Hybrid Car!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/are-chinese-luxury-cars-better-than-german-luxury-cars-in-uae-chinese-cars-vs-german-cars"
                      className="tw-mt-2"
                    >
                      Are Chinese Luxury Cars Better Than German Luxury Cars In
                      UAE?
                    </Link>
                    <Link
                      href="https://carprices.ae/news/heres-what-you-can-do-during-a-car-break-down-in-the-middle-of-nowhere-in-the-uae"
                      className="tw-mt-2"
                    >
                      Here's What You Can Do During A Car Break Down!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/6-best-and-cheapest-suvs-in-uae-under-aed-150000"
                      className="tw-mt-2"
                    >
                      6 Best And Cheapest SUVs In UAE Under AED 150,000!
                    </Link>
                    <Link
                      href="https://carprices.ae/news/10-best-cars-to-buy-in-uae-under-aed-100k"
                      className="tw-mt-2"
                    >
                      10 Best Cars To Buy In UAE Under AED 100K In 2024
                    </Link>
                    <Link
                      href="https://carprices.ae/news/are-chinese-cars-superior-and-reliable-than-japanese-cars-in-uae"
                      className="tw-mt-2"
                    >
                      Are Chinese Cars Superior And Reliable Than Japanese Cars
                      In UAE?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tw-flex tw-flex-col tw-ml-5 tw-w-[33%] max-md:tw-ml-0 max-md:tw-w-full tw-mb-10">
                <div className="tw-flex tw-flex-col tw-grow tw-px-8 tw-py-8 tw-w-full tw-bg-sky-100 tw-rounded-2xl max-md:tw-px-5 max-md:tw-mt-10 max-md:tw-max-w-full">
                  <div className="tw-text-2xl tw-leading-9 tw-text-neutral-900 tw-font-bold">
                    Why CarPrices.ae?
                  </div>
                  <div className="tw-flex tw-flex-col tw-mt-6 tw-text-neutral-900">
                    <div className="tw-text-base tw-leading-6 tw-font-semibold">
                      New Car Buyer’s Guide
                    </div>
                    <div className="tw-mt-1 tw-text-sm tw-leading-5">
                      Our interactive car finder platform is like no other. It
                      covers every car currently available in the UAE, neatly
                      organized into 10 categories and 12 body types, complete
                      with a EMI calculator. This way, you can effortlessly find
                      a car that suits your lifestyle, needs, and budget.
                    </div>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mt-6 tw-text-neutral-900">
                    <div className="tw-text-base tw-leading-6 tw-font-semibold">
                      Comprehensive Database
                    </div>
                    <div className="tw-mt-1 tw-text-sm tw-leading-5">
                      Our extensive database of new and used cars provides
                      access to a wide range of vehicles from trusted new car
                      dealerships across the UAE. Whether you're looking for a
                      luxury sedan, a rugged SUV, or a fuel-efficient hatchback,
                      we've got you covered.
                    </div>
                  </div>
                  {/* <div className="tw-flex tw-gap-0.5 tw-self-start tw-p-0.5 tw-mt-9 tw-border tw-border-blue-600 tw-border-solid tw-rounded-[36px]">
                  <div className="tw-shrink-0 tw-w-full tw-bg-blue-600 tw-h-[7px] tw-rounded-[36px]" />
                  <div className="tw-shrink-0 tw-bg-blue-600 tw-h-[7px] tw-rounded-[36px] tw-w-[7px]" />
                  <div className="tw-shrink-0 tw-bg-blue-600 tw-h-[7px] tw-rounded-[36px] tw-w-[7px]" />
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [carSection, home, articles, compare] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-sections/findAll`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/home`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}compare-car/home`),
    ]);

    return {
      props: {
        bannerImage: home?.data?.data?.bannerImage,
        bannerText: home?.data?.data?.bannerText,
        bodyTypes: home?.data?.data?.bodyTypes,
        brand: home?.data?.data?.brand,
        popularcars: carSection?.data[1],
        featuredcars: carSection?.data[0],
        electriccars: carSection?.data[2],
        suv: carSection?.data[3],
        performance: carSection?.data[4],
        compare: compare?.data,
        articles: articles?.data?.data,
      },
      revalidate: 60, // Regenerate the page at most once per minute
    };
  } catch (error) {
    return {
      props: {
        error: true,
        errorMessage: error.message,
      },
    };
  }
}
