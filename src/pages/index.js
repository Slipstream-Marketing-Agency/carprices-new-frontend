import { AddBox } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import altImage from "../../public/assets/images/blog-alt-image.png";
import Ad300x250 from "../components/ads/Ad300x250";
import Ad970x250 from "../components/ads/Ad970x250";
import FilterLayout from "../components/find-car-multi-step-filter/FilterLayout";
import useTranslate from "../utils/useTranslate";
import { useRouter } from "next/router";
import Head from "next/head";

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
  const currentYear = new Date().getFullYear();
  const carsData = [
    {
      model: "2024",
      brand: "Volvo",
      name: "XC40",
      category: "Most Popular",
      priceRange: "AED 185,850* - 299,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 3,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "BMW",
      name: "1 Series",
      priceRange: "AED 185,000*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 2,296*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/902f3f72aebf143656bbed380ae00b2201392a0a440e662b433d37df53c7fd62?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Audi",
      name: "Q3 Sportsback",
      priceRange: "AED 165,850* - 199,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 2,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e521907434b41dd95262fec39e1fd61a1a0cab1c0e2118987177637e1d095496?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Audi",
      name: "Q3 Sportsback",
      priceRange: "AED 165,850* - 199,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 2,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e521907434b41dd95262fec39e1fd61a1a0cab1c0e2118987177637e1d095496?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Audi",
      name: "Q3 Sportsback",
      priceRange: "AED 165,850* - 199,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 2,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e521907434b41dd95262fec39e1fd61a1a0cab1c0e2118987177637e1d095496?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Audi",
      name: "Q3 Sportsback",
      priceRange: "AED 165,850* - 199,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 2,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e521907434b41dd95262fec39e1fd61a1a0cab1c0e2118987177637e1d095496?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
  ];

  const electricData = [
    {
      model: "2024",
      brand: "Volvo",
      name: "XC40",
      category: "Most Popular",
      priceRange: "AED 185,850* - 299,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 3,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Volvo",
      name: "XC40",
      category: "Most Popular",
      priceRange: "AED 185,850* - 299,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 3,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Volvo",
      name: "XC40",
      category: "Most Popular",
      priceRange: "AED 185,850* - 299,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 3,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Volvo",
      name: "XC40",
      category: "Most Popular",
      priceRange: "AED 185,850* - 299,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 3,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
    {
      model: "2024",
      brand: "Volvo",
      name: "XC40",
      category: "Most Popular",
      priceRange: "AED 185,850* - 299,145*",
      mileage: "90 Litre",
      transmission: "Manual",
      seats: "5 Seater",
      emi: "AED 3,196*",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/569965a4a0b1bfa6bdfed279b557b5c7634e7186eff5e499bfdd0ed06379e3f2?apiKey=7580612134c3412b9f32a9330debcde8&width=800",
    },
  ];

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
      image:
        "/httpscarprices.aenewsall-new-geely-starray-launched-in-uae-at-aed-84900.jpg",
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
        "/httpscarprices.aenewsaston-martin-revives-its-twin-turbo-v12-engine-the-new-vanquish-will-be-the-first-car-to-get.jpg",
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
        "/httpscarprices.aenewsrefreshed-land-rover-defender-lineup-unveiled-with-extra-features-and-power.jpg",
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
        "/httpscarprices.aenewssoon-to-launch-g90-bmw-m5-teased-detailed-preview-and-analysis.jpg",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 4000,
    focusOnSelect: true,
    variableWidth: true,
    draggable: true,
    beforeChange: (current, next) => setActiveSlide(next),
    customPaging: (i) => (
      <div className="custom-dot">
        {i === activeSlide ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-self-stretch tw-mt-[-4px] tw-mr-4 tw-ml-4">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-[6px] tw-py-[6px] tw-rounded-full tw-border tw-border-black tw-border-solid">
              <div className="tw-shrink-0 tw-bg-black tw-rounded-full tw-border tw-border-black tw-border-solid tw-h-[9px] tw-w-[9px]" />
            </div>
          </div>
        ) : (
          <div className="tw-shrink-0 tw-self-stretch tw-my-auto tw-rounded-full tw-bg-zinc-400 tw-h-[11px] tw-w-[11px] tw-mr-4 tw-ml-4" />
        )}
      </div>
    ),
    appendDots: (dots) => (
      <div>
        <ul className="custom-dots tw-flex tw-justify-center tw-absolute tw-top-[-110px] md:tw-left-[48%] tw-items-center tw-gap-0">
          {dots}
        </ul>
      </div>
    ),
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
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

  const cars = [
    {
      imgSrc: "/Hyundai-Tucson.jpg",
      title: "Hyundai Tucson",
      price: "AED 185,850* - 299,145*",
    },
    {
      imgSrc: "/Kia.jpg",
      title: "Kia Sorento",
      price: "Visit Site",
    },
    {
      imgSrc: "/Lexus.jpg",
      title: "Lexus GX",
      price: "AED 185,850* - 299,145*",
    },
    // {
    //   imgSrc: "/Lexus.jpg",
    //   title: "Volvo XC40",
    //   price: "AED 185,850* - 299,145*",
    // },
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

  console.log(featuredcars?.carModels, "featuredcars?.carModels");

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
      <span className="tw-mt-1.5 tw-text-neutral-900 tw-font-bold md:tw-text-[21px] ">
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

    return <span className="tw-mt-1 tw-text-base tw-font-semibold">{emiString}</span>;
  };

  const t = useTranslate();

  const router = useRouter();

  const isSearchCarsPage = router.asPath.startsWith("/search-cars");

  const canonicalUrl = isSearchCarsPage
    ? "https://carprices.ae/search-cars"
    : "https://carprices.ae" + router.asPath.split("?")[0];

  return (
    <>
      <Head>
        {" "}
        <title>
          New Car Prices, Comparisons, Specifications, Models, Reviews & Auto
          News in UAE - Carprices.ae
        </title>
        <meta
          name="description"
          content="Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <main className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-w-full tw-font-gilroy tw-overflow-x-hidden">
        <div className="tw-flex tw-flex-col tw-bg-white tw-w-full md:tw-block tw-hidden">
          {/* <div className="tw-flex tw-flex-col tw-justify-center tw-px-10 tw-py-2 tw-w-full tw-text-sm tw-text-white tw-shadow-sm tw-bg-neutral-900 max-md:tw-px-5 max-md:max-w-full">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[70%_30%] tw-gap-5 tw-w-full">
              <div className="tw-flex tw-gap-4 tw-tracking-tight max-md:tw-flex-wrap max-md:tw-max-w-full">
                <div>About Us</div>
                <div className="tw-justify-center tw-items-start tw-px-4 tw-border-l tw-border-solid tw-border-zinc-700">
                  Contact Us
                </div>
                <div className="tw-justify-center tw-self-start tw-px-4 tw-py-px tw-text-red-400 tw-border-l tw-border-solid tw-border-zinc-700">
                  <span className="tw-text-white">Unlock Car Prices : </span>
                  <span className="tw-text-red-400">
                    Discover Transparent Pricing for Your Next Ride!
                  </span>
                </div>
              </div>
              <div className="tw-flex tw-gap-5 tw-justify-end">
              <div className="tw-flex tw-justify-between tw-items-center tw-gap-1 tw-tracking-tight tw-whitespace-nowrap">
                <div>English</div>
                <span className="material-symbols-outlined tw-h-6 tw-w-6 tw-text-gray-500 tw-ml-2">
                  keyboard_arrow_down
                </span>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-gap-1 tw-px-4 tw-tracking-wide tw-border-l tw-border-solid tw-border-zinc-700 tw-leading-[100%]">
                <span className="material-symbols-outlined tw-text-gray-500 tw-ml-2">
                  call
                </span>
                <div>(225) 555-0118</div>
              </div>
            </div>
            </div>
          </div> */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[50%_50%] tw-gap-5 tw-px-10 tw-py-4 tw-w-full max-md:tw-flex-wrap max-md:tw-px-5 max-md:tw-max-w-full">
            <div className="tw-flex tw-gap-5 tw-text-base tw-leading-5 tw-text-zinc-500 tw-w-full max-md:tw-flex-wrap">
              <img
                loading="lazy"
                srcSet="/assets/img/car-prices-logo.png"
                className="tw-shrink-0 tw-my-auto tw-max-w-full tw-aspect-[6.25] tw-w-[179px]"
              />
              <div className="tw-flex tw-flex-col tw-grow tw-shrink tw-justify-center tw-w-full max-md:tw-max-w-full">
                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-white tw-border tw-border-solid tw-border-neutral-200 tw-rounded-full tw-w-full max-md:tw-max-w-full">
                  <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-px-4 tw-py-1 max-md:tw-flex-wrap tw-w-full">
                    <span className="material-symbols-outlined">search</span>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search for brands, cars or price..."
                      className="tw-bg-transparent tw-border-none tw-text-gray-900 tw-text-sm tw-rounded-full tw-w-full tw-p-2.5 tw-focus:tw-outline-none tw-focus:tw-ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-justify-end tw-gap-5 max-md:tw-flex-wrap">
              <div className="tw-flex tw-flex-auto tw-justify-end  tw-gap-5  tw-my-auto tw-text-sm tw-font-medium tw-leading-5 tw-text-neutral-900 max-md:tw-flex-wrap">
                <Link
                  href="/search-cars"
                  className="tw-justify-center tw-font-semibold"
                >
                  Search New Cars
                </Link>
                <Link
                  href="/compare-cars"
                  className="tw-justify-center tw-font-semibold"
                >
                  Compare New Cars
                </Link>
                {/* <div className="tw-relative">
                <div
                  className="tw-flex tw-justify-center tw-font-semibold tw-cursor-pointer"
                  onClick={() => toggleMenu("blog")}
                >
                  {t.blog}
                  <i
                    className={`bi bi-${
                      state.activeMenu === "blog" ? "dash" : "plus"
                    } tw-dropdown-icon tw-ml-2`}
                  />
                </div>
                <div
                  className={`tw-absolute tw-left-0 tw-mt-2 tw-w-48 tw-bg-white tw-shadow-lg tw-rounded-md ${
                    state.activeMenu === "blog" ? "tw-block" : "tw-hidden"
                  }`}
                >
                  <Link
                    href="/news"
                    className="tw-block tw-px-4 tw-py-2 tw-hover:tw-bg-gray-100"
                  >
                    {t.news}
                  </Link>
                  <Link
                    href="/reviews"
                    className="tw-block tw-px-4 tw-py-2 tw-hover:tw-bg-gray-100"
                  >
                    {t.reviews}
                  </Link>
                </div>
              </div> */}
                <Link
                  href="/loan-calculator"
                  className="tw-justify-center tw-font-semibold"
                >
                  Car Loan Calculator
                </Link>

                <Link
                  href="/news"
                  className="tw-justify-center tw-font-semibold"
                >
                  News
                </Link>
                <Link
                  href="/review"
                  className="tw-justify-center tw-font-semibold"
                >
                  Reviews
                </Link>
              </div>
              {/* <div className="tw-flex tw-flex-col tw-justify-center tw-text-base tw-tracking-tight tw-leading-4 tw-text-center tw-text-white tw-bg-white">
              <button className="tw-btn tw-btn-primary tw-justify-center tw-px-7 tw-py-3 tw-border tw-border-solid tw-bg-neutral-900 tw-border-neutral-900 tw-rounded-[119px] max-md:tw-px-5 tw-hover:tw-bg-red-500">
                Sign In
              </button>{" "}
            </div> */}
            </div>
          </div>
        </div>
        <div className="tw-gap-5 tw-justify-between tw-px-5 tw-py-4 tw-bg-white tw-w-full md:tw-hidden tw-flex">
          <div className="tw-flex tw-gap-2 tw-text-xl tw-tracking-wider tw-text-center tw-whitespace-nowrap tw-text-neutral-900">
            <img
              loading="lazy"
              src="/assets/img/car-prices-logo.png"
              className="tw-w-[150px] tw-object-contain"
            />
            <div className="tw-my-auto"></div>
          </div>
          <div className="tw-flex tw-gap-4 tw-justify-center tw-my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/21ea1ee3a349af39481479e911636e030f9dc6ae5fb159c14a2e89fb64b53a21?apiKey=7580612134c3412b9f32a9330debcde8&"
              className="tw-shrink-0 tw-w-5 tw-aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffd71299533f8ebed0eb731e47a56e0fb50d0acd0bbae0dd3adc23ebaf110f29?apiKey=7580612134c3412b9f32a9330debcde8&"
              className="tw-shrink-0 tw-self-start tw-w-6 tw-aspect-[1.27]"
            />
          </div>
        </div>

        <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full tw-container">
          <div className="tw-row-span-1 md:tw-col-span-3 tw-col-span-12 tw-flex tw-flex-col tw-justify-center tw-rounded-2xl tw-border tw-border-neutral-100 tw-overflow-hidden">
            <FilterLayout />
          </div>

          <div className="tw-row-span-1 md:tw-col-span-7 tw-col-span-12 tw-flex tw-flex-col md:tw-justify-center tw-text-white tw-rounded-2xl tw-leading-[100%] tw-relative tw-overflow-hidden md:tw-h-full tw-h-[280px]">
            <img
              loading="lazy"
              src="/cp-banner.jpg"
              className="tw-object-cover tw-absolute tw-inset-0 tw-w-full md:tw-h-full tw-h-[280px]"
            />
            <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>{" "}
            {/* Overlay */}
            <div className="tw-relative tw-flex tw-flex-col md:tw-px-12 tw-px-3 md:tw-pt-12 tw-pt-3 md:tw-pb-20 tw-w-full tw-max-w-[622px]">
              {/* <div className="tw-text-center tw-text-sm tw-uppercase tw-tracking-wider">
      Carpricces - a car research platform
    </div> */}
              <h1 className="text-white md:tw-leading-9 tw-leading-6  tw-font-bold">
                World’s First Truly Interactive
                <br className="md:tw-block tw-hidden" />
                New Car Finder Platform
              </h1>
              <p className="md:tw-mt-5 tw-mt-2 tw-text-lg tw-leading-6">
                Experience a revolutionary approach to navigating car prices.
                Explore innovation as you navigate the world of automotive
                pricing with a fresh perspective.
              </p>
              {/* <button className="tw-self-start tw-px-4 tw-py-3 tw-mt-5 tw-text-base tw-font-medium tw-text-center tw-text-white tw-border tw-border-white tw-rounded-full tw-hover:tw-bg-white tw-hover:tw-text-black">
      Explore Now
    </button> */}
            </div>
          </div>
        </div>

        <div className="tw-container tw-mx-auto tw-px-4 md:tw-py-8">
          <header className="tw-mb-0">
            <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
              What's Trending?
            </h5>
            <h2 className="tw-text-2xl tw-font-semibold">
              Take A Look At Some Of Our Featured Cars
            </h2>
            {/* <a href="#" className="tw-text-blue-600 tw-hover:tw-underline">
    View More
  </a> */}
          </header>
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-5">
            <div className="lg:tw-col-span-3">
              <Slider {...sliderSettings}>
                {featuredcars?.carModels.map((car, index) => (
                  <div key={index} className="tw-px-2">
                    <div className="tw-flex tw-flex-col tw-h-full tw-py-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-lg">
                      <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-5 tw-flex-grow">
                        <div className="tw-self-start tw-py-1 tw-px-3 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
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
                        <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                          {car.brand.name}
                        </h6>
                        <h4 className=" tw-text-lg tw-leading-6 tw-text-gray-900 tw-font-semibold">
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
                        <Link
                          href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                        >
                          <button className="tw-mt-3 tw-px-7 tw-py-3 tw-text-base tw-font-semibold tw-tracking-tight tw-leading-4 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-rounded-full tw-hover:tw-bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="tw-pt-3">
              <div className="tw-flex tw-flex-col tw-h-full tw-py-5 ">
                <Ad300x250 dataAdSlot="8451638145" />
              </div>
            </div>
          </div>
        </div>

        <div className="tw-container tw-mx-auto tw-px-4 md:tw-py-8">
          <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
            <div className="tw-flex tw-flex-col tw-w-1/4 max-md:tw-w-full tw-justify-center">
              <div className="tw-flex tw-flex-col max-md:tw-mt-10">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Featured car news
                </h5>

                <h2 className="tw-mt-2 tw-text-4xl tw-leading-8 tw-font-semibold tw-text-neutral-900">
                  {FeaturedData[0].name}
                </h2>
                <p className="tw-mt-4 tw-text-base tw-leading-6 tw-text-neutral-900">
                  {FeaturedData[0].description}
                </p>
                <Link href="/news/all-new-geely-starray-launched-in-uae-at-aed-84900">
                  <button className="tw-self-start md:tw-px-14 tw-px-8 md:tw-py-5 tw-py-2 md:tw-mt-9 tw-mt-4 tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-rounded-full max-md:tw-px-5">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-w-3/4 max-md:tw-w-full featured-news-card tw-mt-5">
              <Slider {...settings}>
                {FeaturedData.map((car, index) => (
                  <Link href={car.url} key={index} className="tw-p-2">
                    <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-2xl tw-transition-transform tw-duration-500 tw-custom-scale">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.name}`}
                        className="tw-object-cover tw-w-full tw-h-96"
                      />
                      <div className="tw-m-2 tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-mt-96 tw-rounded-xl tw-border tw-border-solid tw-backdrop-blur-[32px] tw-bg-zinc-500 tw-bg-opacity-10 tw-border-white tw-border-opacity-10 max-md:tw-mt-10 tw-text-white">
                        <h6 className="tw-text-white">{car.name}</h6>
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

        <div className="tw-flex tw-flex-col tw-container">
          <div className="tw-flex tw-flex-col tw-self-start tw-px-5 max-md:tw-max-w-full">
            <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
              What's Trending?
            </h5>
            <h2 className="tw-text-2xl tw-font-semibold">
              Take a look at some of our Popular Cars
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

          <Slider {...categorysliderSettings}>
            {filterCars(selectedTab).map((car, index) => (
              <div key={index} className="tw-px-2">
                <div className="tw-flex tw-flex-col tw-h-full tw-py-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-lg">
                  <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-5 tw-flex-grow">
                    <div className="tw-self-start tw-py-1 tw-px-3 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
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
                    <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                      {car.brand.name}
                    </h6>
                    <h4 className=" tw-text-white tw-text-lg tw-leading-6 tw-text-gray-900 tw-font-semibold">
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
                    <Link
                      href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                    >
                      <button className="tw-mt-3 tw-px-7 tw-py-3 tw-text-base tw-font-semibold tw-tracking-tight tw-leading-4 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-rounded-full tw-hover:tw-bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="tw-container md:tw-my-20 tw-my-4">
          <div className="tw-flex tw-gap-5 tw-bg-zinc-50 max-md:tw-flex-wrap">
            <div className="tw-flex tw-flex-col tw-my-auto tw-text-neutral-900">
              <div className="tw-flex tw-flex-col tw-text-end">
                {/* Commented out the large number display */}
                {/* <div className="tw-self-end tw-text-7xl tw-leading-[96px] max-md:tw-text-4xl">
          20+
        </div> */}
                <div className="tw-text-3xl tw-font-bold">
                  Notable
                  <br className="md:tw-block tw-hidden" /> Upcoming Cars
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-grow tw-shrink-0 tw-justify-center tw-basis-0 tw-w-fit max-md:tw-max-w-full">
              <Slider {...settingsupcoming}>
                {cars.map((item, index) => (
                  <div
                    key={index}
                    className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-white tw-bg-black"
                  >
                    <div className="tw-relative tw-flex tw-flex-col tw-justify-end tw-pt-20 tw-w-full tw-min-h-[400px]">
                      <img
                        loading="lazy"
                        src={`${item.imgSrc}`}
                        className="tw-object-cover tw-absolute tw-inset-0 tw-w-full tw-h-full"
                      />
                      <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-px-4 tw-py-5 max-md:tw-mt-10 max-md:tw-max-w-full">
                        <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
                          <h4 className=" tw-text-white tw-self-start tw-font-bold">
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

        <div className="tw-w-full">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-5 max-md:tw-gap-0">
            <div className="tw-flex tw-flex-col max-md:tw-w-full">
              <div className="tw-relative tw-flex tw-flex-col tw-grow md:tw-items-end md:tw-px-16 md:tw-pb-20 md:tw-min-h-[645px] md:tw-mt-10">
                <img
                  loading="lazy"
                  srcSet="/car-side.png"
                  className="tw-object-contain tw-absolute tw-inset-0 tw-w-full tw-h-full md:tw-block tw-hidden"
                />
                <div className="tw-relative tw-flex tw-flex-col tw-justify-center">
                  <div className="tw-flex tw-flex-col tw-justify-center">
                    <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                      Choose your Brand
                    </h6>
                    <div className="tw-font-semibold tw-mt-2 tw-text-3xl tw-leading-9 tw-capitalize tw-text-neutral-900">
                      Shop By Brand
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-center tw-col-span-3 max-md:tw-w-full">
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
                      className="tw-object-cover tw-aspect-square tw-w-[100px] tw-grayscale tw-hover:tw-filter-none"
                    />
                    <div className="tw-mt-3.5 font-bold">{item.name}</div>
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
        <img
          loading="lazy"
          srcSet="/ferrari-sponsored.jpg"
          className="tw-object-contain tw-w-full tw-h-full md:tw-block tw-hidden"
        />
        <img
          loading="lazy"
          srcSet="/sponsored-mob.jpg"
          className="tw-object-contain tw-w-full tw-h-full md:tw-hidden tw-block"
        />

        <div className="tw-container md:tw-my-20 tw-my-4 tw-px-5">
          <div className="tw-flex tw-justify-between tw-items-start tw-gap-5 tw-w-full max-md:tw-flex-wrap max-md:tw-max-w-full">
            <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
              <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                Choose by Type
              </h6>
              <h2 className="tw-text-2xl tw-font-semibold">
                You can choose by the body type
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
                      className="tw-object-contain tw-w-full tw-h-full tw-transition-all tw-duration-300 tw-p-3"
                    />
                  </div>
                  <div className="md:tw-mt-6 tw-font-semibold">{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-2 md:tw-gap-10 tw-gap-0 max-md:tw-grid-cols-1 tw-container tw-px-5">
          <div className="tw-flex tw-flex-col tw-w-full">
            <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
              <img
                src="/emi.jpg"
                alt=""
                className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
              />
              <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                <div>
                  <div className="md:tw-text-3xl tw-text-xl">
                    Calculate Your Car Loan EMI
                  </div>
                  <p className="md:tw-mt-6 tw-leading-6 tw-w-[50%]">
                    Input your loan amount, interest rate, and loan term to get
                    instant results.
                  </p>
                </div>

                <Link
                  href="/loan-calculator"
                  className="tw-flex md:tw-gap-2.5 md:tw-mt-10 tw-mt-3"
                >
                  <p className="tw-text-white">Calculate Now</p>
                  <span className="material-symbols-outlined tw-text-white">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-w-full">
            <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
              <img
                src="/car-value.jpg"
                alt=""
                className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
              />
              <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                <div>
                  <div className="md:tw-text-3xl tw-text-xl">
                    Know Your Car's Worth
                  </div>
                  <p className="md:tw-mt-6 tw-leading-6 tw-w-[50%]">
                    Input your car's details to receive an instant valuation
                    based on real-time market data.
                  </p>
                </div>

                <div className="tw-flex md:tw-gap-2.5 md:tw-mt-10 tw-mt-3">
                  <p>Coming Soon</p>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
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
              <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                Trending automotive videos
              </h6>
              <h2 className="tw-text-2xl tw-font-semibold">Latest Videos</h2>
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
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9d5fef3659a0fe531b3dc3ad5973537a8ec930dbb49f5a75f67de7a78660e9f?apiKey=7580612134c3412b9f32a9330debcde8&"
                    className=" tw-absolute tw-right-5 tw-top-[-65px] tw-w-[70px]"
                  />
                  <div className="tw-flex tw-flex-wrap tw-justify-between tw-gap-5 tw-text-2xl">
                    <h4 className=" tw-text-black tw-font-semibold" line-clamp-2>
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

        <div className="tw-flex tw-flex-col tw-container tw-px-5">
          <div className="tw-flex tw-justify-between tw-gap-5 tw-px-px tw-w-full max-md:tw-flex-wrap">
            <div className="">
              <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                Trending automotive news
              </h6>
              <h2 className="tw-text-2xl tw-font-semibold">
                {" "}
                Latest Automotive News
              </h2>
            </div>
            {/* <div className="tw-self-start tw-px-6 tw-py-3 tw-mt-2.5 tw-text-base tw-tracking-tight tw-leading-4 tw-text-center tw-rounded-[119px] tw-text-neutral-900">
      View More
    </div> */}
          </div>
          <div className="tw-mt-7 tw-w-full">
            <div className="tw-grid tw-grid-cols-3 tw-gap-5 max-md:tw-grid-cols-1">
              <Link
                href={`/news/${articles.news[0]?.slug}`}
                className="md:tw-flex tw-hidden tw-col-span-2 tw-relative tw-flex-col tw-justify-center tw-p-8 tw-pt-20 tw-pb-9 tw-text-slate-100 tw-bg-cover tw-rounded-2xl tw-min-h-[838px]"
                style={{
                  backgroundImage: `url('${articles.news[0].coverImage}')`,
                }}
              >
                <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-py-3 tw-border-l-4 tw-border-blue-400 tw-backdrop-blur-[32px] tw-mt-[552px]">
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
                <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-p-4 tw-border-l-4 tw-border-blue-400 tw-backdrop-blur-[32px] tw-bg-opacity-10">
                  <div className="tw-text-lg tw-text-white">{articles.news[0].title}</div>
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
                      <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-p-4 tw-border-l-4 tw-border-blue-400 tw-backdrop-blur-[32px] tw-bg-opacity-10">
                        <div className="tw-text-lg tw-text-white">{item.title}</div>
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
                        <Link href="#">New Honda HR-V</Link>
                        <Link href="#" className="tw-mt-2">
                          JAC S3 Plus
                        </Link>
                        <Link href="#" className="tw-mt-2 max-md:tw-mr-2.5">
                          New Chevrolet Trailblazer
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Chevrolet Bolt EV
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Chevrolet Bolt EUV
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Ford Bronco
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Ford Maverick
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Ford Mustang Mach-E
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Honda Accord
                        </Link>
                        <Link href="#" className="tw-mt-2">
                          New Honda Civic
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="tw-flex tw-flex-col tw-ml-5 tw-w-6/12 max-md:tw-ml-0 max-md:tw-w-full">
                    <div className="tw-flex tw-flex-col tw-grow tw-mt-10 tw-text-sm tw-leading-6 tw-capitalize tw-text-neutral-900">
                      <Link href="#">New Honda HR-V</Link>
                      <Link href="#" className="tw-mt-2">
                        JAC S3 Plus
                      </Link>
                      <Link href="#" className="tw-mt-2 max-md:tw-mr-2.5">
                        New Chevrolet Trailblazer
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Chevrolet Bolt EV
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Chevrolet Bolt EUV
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Ford Bronco
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Ford Maverick
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Ford Mustang Mach-E
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Honda Accord
                      </Link>
                      <Link href="#" className="tw-mt-2">
                        New Honda Civic
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-ml-5 tw-w-[33%] max-md:tw-ml-0 max-md:tw-w-full">
              <div className="tw-flex tw-flex-col tw-text-sm tw-leading-6 tw-capitalize tw-text-neutral-900 max-md:tw-mt-10">
                <h4 className=" tw-font-semibold">Searched Keywords</h4>
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
                    10 Popular Cars In UAE With High Ground Clearance Sorted By
                    Price Low To High!
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
                    Are Chinese Cars Superior And Reliable Than Japanese Cars In
                    UAE?
                  </Link>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-ml-5 tw-w-[33%] max-md:tw-ml-0 max-md:tw-w-full tw-mb-10">
              <div className="tw-flex tw-flex-col tw-grow tw-px-8 tw-py-10 tw-w-full tw-bg-sky-100 tw-rounded-2xl max-md:tw-px-5 max-md:tw-mt-10 max-md:tw-max-w-full">
                <div className="tw-text-2xl tw-leading-9 tw-text-neutral-900">
                  Why Carprices.ae ?
                </div>
                <div className="tw-flex tw-flex-col tw-mt-9 tw-text-neutral-900">
                  <div className="tw-text-base tw-leading-6">
                    Innovative Search Filters
                  </div>
                  <div className="tw-mt-1 tw-text-sm tw-leading-5">
                    Say goodbye to endless scrolling and irrelevant listings.
                    Our advanced search filters allow you to find your dream car
                    with precision. Narrow down your search by make, model,
                    year, price range, mileage, and more, ensuring that every
                    result matches your exact preferences.
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-mt-6 tw-text-neutral-900">
                  <div className="tw-text-base tw-leading-6">
                    Comprehensive Database
                  </div>
                  <div className="tw-mt-1 tw-text-sm tw-leading-5">
                    With our extensive database of new and used cars, you'll
                    have access to a wide range of vehicles from trusted
                    dealerships across the UAE. Whether you're in the market for
                    a luxury sedan, a rugged SUV, or a fuel-efficient hatchback,
                    we've got you covered.
                  </div>
                </div>
                <div className="tw-flex tw-gap-0.5 tw-self-start tw-p-0.5 tw-mt-9 tw-border tw-border-blue-600 tw-border-solid tw-rounded-[36px]">
                  <div className="tw-shrink-0 tw-w-full tw-bg-blue-600 tw-h-[7px] tw-rounded-[36px]" />
                  <div className="tw-shrink-0 tw-bg-blue-600 tw-h-[7px] tw-rounded-[36px] tw-w-[7px]" />
                  <div className="tw-shrink-0 tw-bg-blue-600 tw-h-[7px] tw-rounded-[36px] tw-w-[7px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidemobile">
          <Ad970x250 dataAdSlot="6082880703" />
        </div>
        <div className="hidedesktop">
          <Ad300x250 dataAdSlot="9351332409" />
        </div>
        <div className="tw-flex tw-justify-center tw-items-center tw-px-16 tw-py-16 tw-bg-neutral-900 max-md:tw-px-5 tw-w-full ">
          <div className="tw-flex tw-flex-col tw-w-full tw-container">
            <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
              <div className="tw-flex tw-gap-5 tw-justify-between tw-py-8 tw-w-full tw-rounded-2xl max-md:tw-flex-wrap max-md:tw-max-w-full">
                <div className="tw-flex tw-flex-col tw-text-gray-50 max-md:tw-max-w-full">
                  <div className="tw-text-3xl tw-tracking-tight tw-leading-8 max-md:tw-max-w-full">
                    Do you need updates?
                  </div>
                  <div className="tw-mt-2.5 tw-text-sm tw-leading-5 max-md:tw-max-w-full">
                    We will provide updates, shopping tips and more.
                  </div>
                </div>
                <div className="tw-flex tw-gap-5 tw-justify-between tw-my-auto tw-text-xl tw-leading-7 tw-text-white">
                  <Link href="/contact-us" className="text-white">Get consultation</Link>
                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </div>
              </div>
              <div className="tw-flex tw-gap-5 tw-justify-between tw-mt-12 tw-w-full max-md:tw-flex-wrap max-md:tw-mt-10 max-md:tw-max-w-full">
                <div className="max-md:tw-max-w-full">
                  <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
                    <div className="tw-flex tw-flex-col tw-w-[29%] max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-grow tw-text-sm tw-leading-5 tw-text-white max-md:tw-mt-10">
                        <h4 className=" tw-text-white tw-tracking-wide tw-uppercase tw-font-semibold">
                          Top 10s
                        </h4>
                        <div className="tw-flex tw-flex-col tw-mt-6 tw-space-y-2">
                          <Link href="https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae" className="text-white">
                            10 Cars with High Ground Clearance
                          </Link>
                          <Link
                            href="https://carprices.ae/news/2023's-top-10-cars-that-buyers-searched-for-on-carprices.ae"
                            className="tw-mt-1 tw-text-white"
                          >
                            10 Most Searched Cars
                          </Link>
                          <Link
                            href="https://carprices.ae/news/chinese-car-brands-uae"
                            className="tw-mt-1 tw-text-white"
                          >
                            10 Best Chinese Brands
                          </Link>
                          <Link
                            href="https://carprices.ae/news/10-myths-busted-about-buying-a-new-car-in-the-uae"
                            className="tw-mt-1 tw-text-white"
                          >
                            10 Myths About Buying a Car
                          </Link>
                          <Link
                            href="https://carprices.ae/news/top-fuel-effnt"
                            className="tw-mt-1 tw-text-white"
                          >
                            10 Fuel Efficient Cars
                          </Link>
                          <Link
                            href="https://carprices.ae/news/top-10-hybrid-cars-AED-230k"
                            className="tw-mt-1 tw-text-white"
                          >
                            10 Best Hybrid Cars
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-ml-5 tw-w-[29%] max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-text-sm tw-leading-5 tw-text-white max-md:tw-mt-10">
                        <h4 className=" tw-text-white tw-tracking-wide tw-uppercase tw-font-semibold">
                          Comparisons
                        </h4>
                        <div className="tw-flex tw-flex-col tw-mt-6 tw-space-y-2">
                          <Link href="https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500" className="text-white">
                            2024 Toyota Prado Vs GWM Tank 500
                          </Link>
                          <Link
                            href="https://carprices.ae/news/2024-toyota-land-cruiser-prado-vs-land-rover-defender-vs-jeep-wrangler-vs-the-ford-bronco"
                            className="tw-mt-1 tw-text-white"
                          >
                            Battle Of 4 Popular SUVs
                          </Link>
                          <Link
                            href="https://carprices.ae/news/the-2023-toyota-land-cruiser-300-series-vs-the-2024-toyota-land-cruiser-prado"
                            className="tw-mt-1 tw-text-white"
                          >
                            LC 300 Vs 2024 Toyota Prado
                          </Link>
                          <Link
                            href="https://carprices.ae/news/new-vs-old-prado"
                            className="tw-mt-1 tw-text-white"
                          >
                            2024 LC Prado Vs Used LC Prado
                          </Link>
                          <Link
                            href="https://carprices.ae/news/lc-prado-vs-patrol"
                            className="tw-mt-1 tw-text-white"
                          >
                            2024 LC Prado Vs Nissan Patrol
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-ml-5 tw-w-[22%] max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-text-sm tw-leading-5 tw-text-white max-md:tw-mt-10">
                        <h4 className=" tw-text-white tw-tracking-wide tw-uppercase tw-font-semibold">
                          Quick Search
                        </h4>
                        <div className="tw-flex tw-flex-col tw-mt-6 tw-space-y-2">
                          <Link href="https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae" className="text-white">
                            ICE Vs Hybrid
                          </Link>
                          <Link
                            href="https://carprices.ae/news/analysing-the-cost-of-living-with-the-electric-vehicle-vs-internal-combustion-engine-vehicle-in-the-uae-ev-vs-ice"
                            className="tw-mt-1 tw-text-white"
                          >
                            ICE Vs EV
                          </Link>
                          <Link
                            href="https://carprices.ae/news/7-popular-reliable-sedans-to-buy-in-the-uae-in-2024-or-best-cars-in-uae"
                            className="tw-mt-1 tw-text-white"
                          >
                            Popular Reliable Sedans
                          </Link>
                          <Link
                            href="https://carprices.ae/news/5-exciting-car-launches-to-happen-in-the-uae-in-2024"
                            className="tw-mt-1 tw-text-white"
                          >
                            2024 Car Launches
                          </Link>
                          <Link
                            href="https://carprices.ae/news/6-best-chinese-suv-cars-in-uae-under-aed-70000"
                            className="tw-mt-1 tw-text-white"
                          >
                            Best Chinese SUVs
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-ml-5 tw-w-1/5 max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-text-sm tw-leading-5 tw-text-white max-md:tw-mt-10">
                        <h4 className=" tw-text-white tw-tracking-wide tw-uppercase tw-font-semibold">
                          Legal Bits
                        </h4>
                        <div className="tw-flex tw-flex-col tw-mt-6">
                          <Link href="/about" className="text-white">About us</Link>
                          <Link href="/contact-us" className="tw-mt-1 tw-text-white">
                            Contact Us
                          </Link>
                          <Link href="/privacy" className="tw-mt-1 tw-text-white">
                            Privacy Policy
                          </Link>
                          <Link
                            href="/terms-and-conditions"
                            className="tw-mt-1 tw-text-white"
                          >
                            Terms and Conditions
                          </Link>
                          <Link href="/code-of-conduct" className="tw-mt-1 tw-text-white">
                            Code of Conduct
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-justify-center tw-self-start">
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-shrink-0 tw-self-end tw-h-px tw-bg-white tw-w-[45px]" />
                    <div className="tw-flex tw-flex-col tw-mt-6">
                      <div className="tw-flex tw-flex-col tw-self-end tw-text-sm tw-leading-5 tw-text-white">
                        {/* <div>+971 50 649 4665</div> */}
                        <div className="tw-mt-1 tw-text-right tw-text-white">
                          <Link href="mailto:info@carprices.ae" className="text-white">
                            info@carprices.ae
                          </Link>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-mt-2">
                        <Link href="https://youtube.com/@carpricesuae?feature=shared">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89539fb8ec01af9a7f038afd91c58e261f280173a90f447aa81acbc97aa5bd68?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="tw-shrink-0 tw-w-6 tw-aspect-square"
                          />
                        </Link>
                        <Link href="https://www.facebook.com/carprices.ae/">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/989ca5cee220b9472a192b392c3c43f2675c6d4a9f075180fafad8163839aee5?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="tw-shrink-0 tw-w-6 tw-aspect-square"
                          />
                        </Link>
                        <Link href="https://x.com/CarPricesAe?t=_IgNE0J6jf5r1ZiiKrkaYw&s=09">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5105e8bdd60ff0245b9f094d1b7529a5939d0436f5ce2ebad352d77ca2bd6576?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="tw-shrink-0 tw-w-6 tw-aspect-square"
                          />
                        </Link>
                        <Link href="https://www.linkedin.com/company/car-prices-ae/">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/280619b280591c941855898a9c986f9346aa18dcf6ee0f84e15d1bfd4d37bcb1?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="tw-shrink-0 tw-w-6 tw-aspect-square"
                          />
                        </Link>
                        <Link href="https://www.instagram.com/carprices.ae?igsh=bnE4cnpudjFwMHg1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d67ce5820088e265263fd67a72a832801a8cf6b563bf67494b5d1b6113014034?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="tw-shrink-0 tw-w-6 tw-aspect-square"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-gap-5 tw-justify-between tw-mt-14 tw-text-sm tw-leading-5 tw-text-white max-md:tw-flex-wrap max-md:tw-mt-10 max-md:tw-max-w-full">
              <div className="tw-my-auto">
                ©2017 - {currentYear} Carprices.ae. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const carSection = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-sections/findAll`
    );
    const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`);

    const articles = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/home`
    );

    const compare = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}compare-car/home`
    );

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
