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
      <div className="custom-dot ">
        {i === activeSlide ? (
          <div className="flex flex-col items-center  justify-center self-stretch mt-[-4px] mr-4 ml-4">
            <div className="flex flex-col justify-center items-center  px-[6px] py-[6px] rounded-full border border-black border-solid">
              <div className="shrink-0 bg-black rounded-full border border-black border-solid h-[9px] w-[9px] " />
            </div>
          </div>
        ) : (
          <div className="shrink-0 self-stretch my-auto rounded-full bg-zinc-400 h-[11px] w-[11px] mr-4 ml-4" />
        )}
      </div>
    ),
    appendDots: (dots) => (
      <div>
        <ul className="custom-dots flex justify-center absolute top-[-110px] md:left-[48%] items-center gap-0">
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
      <span className="mt-1.5 text-neutral-900 font-bold md:text-[21px]">
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

    return <span className="mt-1 text-base font-semibold">{emiString}</span>;
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
      <main className="flex flex-col items-center justify-between w-full font-gilroy overflow-x-hidden">
        <div className="flex flex-col bg-white w-full md:block hidden">
          <div className="flex flex-col justify-center px-10 py-2 w-full text-sm text-white shadow-sm bg-neutral-900 max-md:px-5 max-md:max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-5 w-full">
              <div className="flex gap-4 tracking-tight max-md:flex-wrap max-md:max-w-full">
                <div>About Us</div>
                <div className="justify-center items-start px-4 border-l border-solid border-zinc-700">
                  Contact Us
                </div>
                <div className="justify-center self-start px-4 py-px text-red-400 border-l border-solid border-zinc-700">
                  <span className="text-white">Unlock Car Prices : </span>
                  <span className="text-red-400">
                    Discover Transparent Pricing for Your Next Ride!
                  </span>
                </div>
              </div>
              {/* <div className="flex gap-5 justify-end">
              <div className="flex justify-between items-center gap-1 tracking-tight whitespace-nowrap">
                <div>English</div>
                <span className="material-symbols-outlined h-6 w-6 text-gray-500 ml-2">
                  keyboard_arrow_down
                </span>
              </div>
              <div className="flex justify-between items-center gap-1 px-4 tracking-wide border-l border-solid border-zinc-700 leading-[100%]">
                <span className="material-symbols-outlined text-gray-500 ml-2">
                  call
                </span>
                <div>(225) 555-0118</div>
              </div>
            </div> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[50%_50%] gap-5 px-10 py-2 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 text-base leading-5 text-zinc-500 w-full max-md:flex-wrap">
              <img
                loading="lazy"
                srcSet="/assets/img/car-prices-logo.png"
                className="shrink-0 my-auto max-w-full aspect-[6.25] w-[179px]"
              />
              <div className="flex flex-col grow shrink justify-center w-full max-md:max-w-full">
                <div className="flex flex-col justify-center items-center bg-white border border-solid border-neutral-200 rounded-full w-full max-md:max-w-full">
                  <div className="flex justify-center items-center gap-2 px-4 py-1 max-md:flex-wrap w-full">
                    <span className="material-symbols-outlined">search</span>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search for brands, cars or price..."
                      className="bg-transparent border-none text-gray-900 text-sm rounded-full w-full p-2.5 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-5 max-md:flex-wrap">
              <div className="flex flex-auto justify-end  gap-5  my-auto text-sm font-medium leading-5 text-neutral-900 max-md:flex-wrap">
                <Link
                  href="/search-cars"
                  className="justify-center font-semibold"
                >
                  Search New Cars
                </Link>
                <Link
                  href="/compare-cars"
                  className="justify-center font-semibold"
                >
                  Compare New Cars
                </Link>
                {/* <div className="relative">
                <div
                  className="flex justify-center font-semibold cursor-pointer"
                  onClick={() => toggleMenu("blog")}
                >
                  {t.blog}
                  <i
                    className={`bi bi-${
                      state.activeMenu === "blog" ? "dash" : "plus"
                    } dropdown-icon ml-2`}
                  />
                </div>
                <div
                  className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md ${
                    state.activeMenu === "blog" ? "block" : "hidden"
                  }`}
                >
                  <Link
                    href="/news"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {t.news}
                  </Link>
                  <Link
                    href="/reviews"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {t.reviews}
                  </Link>
                </div>
              </div> */}
                <Link
                  href="/loan-calculator"
                  className="justify-center font-semibold"
                >
                  Car Loan Calculator
                </Link>

                <Link href="/news" className="justify-center font-semibold">
                  News
                </Link>
                <Link href="/review" className="justify-center font-semibold">
                  Reviews
                </Link>
              </div>
              {/* <div className="flex flex-col justify-center text-base tracking-tight leading-4 text-center text-white bg-white">
              <button className="btn btn-primary justify-center px-7 py-3 border border-solid bg-neutral-900 border-neutral-900 rounded-[119px] max-md:px-5 hover:bg-red-500">
                Sign In
              </button>{" "}
            </div> */}
            </div>
          </div>
        </div>

        <div className=" gap-5 justify-between px-5 py-4 bg-white w-full md:hidden flex">
          <div className="flex gap-2 text-xl tracking-wider text-center whitespace-nowrap text-neutral-900">
            <img
              loading="lazy"
              src="/assets/img/car-prices-logo.png"
              className="w-[150px] object-contain"
            />
            <div className="my-auto"></div>
          </div>
          <div className="flex gap-4 justify-center my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/21ea1ee3a349af39481479e911636e030f9dc6ae5fb159c14a2e89fb64b53a21?apiKey=7580612134c3412b9f32a9330debcde8&"
              className="shrink-0 w-5 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffd71299533f8ebed0eb731e47a56e0fb50d0acd0bbae0dd3adc23ebaf110f29?apiKey=7580612134c3412b9f32a9330debcde8&"
              className="shrink-0 self-start w-6 aspect-[1.27]"
            />
          </div>
        </div>

        <div className="grid  gap-4 p-4 lg:grid-rows-1 lg:grid-cols-10 w-full container">
          <div className="row-span-1 md:col-span-3 col-span-12 flex flex-col justify-center rounded-2xl border border-neutral-100 overflow-hidden">
            <FilterLayout />
          </div>
          {/* <div className="row-span-1 md:col-span-3 col-span-12 flex flex-col justify-center rounded-2xl border border-neutral-100 overflow-hidden">
          <div className="relative flex flex-col justify-center items-start px-7 py-8 text-2xl leading-7 text-white bg-gradient-to-r from-blue-500 to-blue-800">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bab8732d6429f1ac3aedfbc9eccfd4a3c451d479881fd9a558a59b846ba101d?apiKey=7580612134c3412b9f32a9330debcde8&"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <h2 className="relative z-10">
              Top three things you <br /> need from a car
            </h2>
          </div>
          <div className="flex flex-col px-6 pt-6 pb-3 bg-white border-t border-neutral-100 shadow-lg">
            <div className="grid grid-cols-3 gap-5">
              {[
                {
                  text: "Technology",
                  icon: "438c50b503902f6e252e47bd0a8d4daf8040c0aded89ad77892ea582bd592e80",
                },
                {
                  text: "Fuel Efficiency",
                  icon: "06208606e5a94790f819bd4a2505e45b102957beacd8437d135f7925dd85f2ac",
                },
                {
                  text: "Off-Road",
                  icon: "463360bb6afa3b7d2a1e9bde7c9f41604ea6b802c9d81278dcdf81425a795dd0",
                },
                {
                  text: "Performance",
                  icon: "0424d9ca34269c4253cf2c9b6e29b6fb0e00153bb0d0b78a0fe0053d5f2e5e85",
                },
                {
                  text: "Affordable Luxury",
                  icon: "3ebcd0c49da9e6a44886cf69e8934a0989f33c0ca8b96b9baf5476b7f139a469",
                },
                {
                  text: "Luxury",
                  icon: "52840919da3cdd448cc331fbe4786adff1859df3dfc2423aecc717126af4ed3b",
                },
                {
                  text: "Premium Luxury",
                  icon: "52840919da3cdd448cc331fbe4786adff1859df3dfc2423aecc717126af4ed3b",
                },
                {
                  text: "Space",
                  icon: "113620ef9ad5c397d2f98542e4ffeb2bc44f87245d9c53d653e8fad763362aa2",
                },
                {
                  text: "Electric",
                  icon: "071aae5f8732eb044c9c309c471d4106257d26c58774b3db939a6f225744c5a2",
                },
                {
                  text: "Manual Transmission",
                  icon: "31eb02410151d86a2ba546aa451d773e237a753d0d1f15279d80db4209d88f0e",
                },
                {
                  text: "Manual Transmission",
                  icon: "31eb02410151d86a2ba546aa451d773e237a753d0d1f15279d80db4209d88f0e",
                },
                {
                  text: "Manual Transmission",
                  icon: "31eb02410151d86a2ba546aa451d773e237a753d0d1f15279d80db4209d88f0e",
                },
              ].map((item) => (
                <button
                  key={item.text}
                  className="flex flex-col items-center p-2 rounded-xl border bg-white border-zinc-100 hover:bg-blue-100 focus:bg-blue-200"
                >
                  <div className="w-[31px] h-[31px] flex justify-center items-center">
                    <img
                      loading="lazy"
                      src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${item.icon}?apiKey=7580612134c3412b9f32a9330debcde8&width=100`}
                      className="w-full aspect-square"
                    />
                  </div>
                  <span className="text-xs text-center text-zinc-600">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2.5 bg-blue-600 text-white text-base font-bold rounded-full hover:bg-blue-700">
                Next
              </button>
            </div>
          </div>
        </div> */}
          <div className="row-span-1 md:col-span-7 col-span-12 flex flex-col md:justify-center text-white rounded-2xl leading-[100%] relative overflow-hidden md:h-full h-[280px]">
            <img
              loading="lazy"
              src="/cp-banner.jpg"
              className="object-cover absolute inset-0 w-full md:h-full h-[280px]"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
            {/* Overlay */}
            <div className="relative flex flex-col md:px-12 px-3 md:pt-12 pt-3 md:pb-20 w-full max-w-[622px]">
              {/* <div className="text-center text-sm uppercase tracking-wider">
      Carpricces - a car research platform
    </div> */}
              <h1 className=" md:leading-9 leading-6  font-bold">
                World’s First Truly Interactive
                <br className="md:block hidden" />
                New Car Finder Platform
              </h1>
              <p className="md:mt-5 mt-2 text-lg leading-6">
                Experience a revolutionary approach to navigating car prices.
                Explore innovation as you navigate the world of automotive
                pricing with a fresh perspective.
              </p>
              {/* <button className="self-start px-4 py-3 mt-5 text-base font-medium text-center text-white border border-white rounded-full hover:bg-white hover:text-black">
              Explore Now
            </button> */}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:py-8">
          <header className=" mb-0">
            <h5 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
              What's Trending?
            </h5>
            <h2 className="text-2xl font-semibold">
              Take A Look At Some Of Our Featured Cars
            </h2>
            {/* <a href="#" className="text-blue-600 hover:underline">
            View More
          </a> */}
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-3">
              <Slider {...sliderSettings}>
                {featuredcars?.carModels.map((car, index) => (
                  <div key={index} className="px-2">
                    <div className="flex flex-col h-full py-5 bg-white rounded-2xl border border-solid border-zinc-100 shadow-lg">
                      <div className="flex flex-col text-sm leading-4 text-neutral-900 px-5 flex-grow">
                        <div className="self-start py-1 px-3 mb-2 text-xs rounded-full border border-solid bg-slate-100 border-blue-600 border-opacity-30">
                          Model: {car?.highTrim?.year}
                        </div>
                        <img
                          loading="lazy"
                          src={car?.highTrim?.featuredImage}
                          className="self-center w-full h-48 object-contain"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-center px-5 pt-3 mt-2 w-full flex-grow">
                        <h6 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                          {car.brand.name}
                        </h6>
                        <h4 className="text-lg leading-6 text-gray-900 font-semibold">
                          {car.name}
                        </h4>
                        <CarPriceRange
                          minPrice={car?.minPrice}
                          maxPrice={car?.maxPrice}
                        />
                      </div>
                      {/* <div className="px-5">
                      <div className="flex justify-between p-4 mt-3 w-full rounded-lg bg-slate-100 text-neutral-900 ">
                        <div className="flex flex-col text-center">
                          <span className="text-xs leading-5 uppercase">
                            Mileage
                          </span>
                          <span className="text-base font-semibold">
                            {car.mileage}
                          </span>
                        </div>
                        <div className="flex flex-col text-center">
                          <span className="text-xs leading-5 uppercase">
                            Transmission
                          </span>
                          <span className="text-base font-semibold">
                            {car.transmission}
                          </span>
                        </div>
                        <div className="flex flex-col text-center">
                          <span className="text-xs leading-5 uppercase">
                            Seats
                          </span>
                          <span className="text-base font-semibold">
                            {car.seats}
                          </span>
                        </div>
                      </div>
                    </div> */}

                      <div className="flex mt-4 w-full justify-between items-center px-5">
                        <div className="flex flex-col items-left">
                          <span className="text-xs leading-3">
                            EMI Starting from
                          </span>
                          <CarEMIDisplay minPrice={car?.minPrice} />
                        </div>
                        <Link
                          href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                        >
                          <button className="mt-3 px-7 py-3 text-base font-semibold tracking-tight leading-4 text-white bg-blue-600 border border-blue-600 border-solid rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="pt-3">
              <div className="flex flex-col h-full py-5 ">
                <Ad300x250 dataAdSlot="8451638145" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:py-8">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-1/4 max-md:w-full justify-center">
              <div className="flex flex-col  max-md:mt-10">
                <h5 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                  Featured car news
                </h5>

                <h2 className="mt-2 text-4xl leading-8 font-semibold text-neutral-900">
                  {FeaturedData[0].name}
                </h2>
                <p className="mt-4 text-base leading-6 text-neutral-900">
                  {FeaturedData[0].description}
                </p>
                <Link href="/news/all-new-geely-starray-launched-in-uae-at-aed-84900">
                  <button className="self-start md:px-14 px-8 md:py-5 py-2 md:mt-9 mt-4 text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 rounded-full max-md:px-5">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-3/4 max-md:w-full featured-news-card mt-5">
              <Slider {...settings}>
                {FeaturedData.map((car, index) => (
                  <Link href={car.url} key={index} className="p-2">
                    <div className="relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-500 custom-scale">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.name}`}
                        className="object-cover w-full h-96"
                      />
                      <div className="m-2 absolute bottom-0 left-0 right-0 py-3 pl-4 mt-96 rounded-xl border border-solid backdrop-blur-[32px] bg-zinc-500 bg-opacity-10 border-white border-opacity-10 max-md:mt-10 text-white">
                        <h6 className="">{car.name}</h6>
                        {/* <small className="mt-1">
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

        <div className="flex flex-col container">
          <div className="flex flex-col self-start px-5 max-md:max-w-full">
            <h5 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
              What's Trending?
            </h5>
            <h2 className="text-2xl font-semibold">
              Take a look at some of our Popular Cars
            </h2>
          </div>

          <div className="flex md:gap-5 gap-2 md:justify-between mt-3 w-full text-base leading-4 text-center text-neutral-900 max-md:flex-wrap max-md:max-w-full">
            <div className="flex md:gap-5  gap-2 md:justify-between px-5 max-md:flex-wrap max-md:max-w-full">
              {categories.map((category, index) => (
                <div key={index} className="flex flex-col justify-center">
                  <div
                    className={`justify-center md:px-14 px-10 md:py-5 py-3 border border-solid rounded-[73px] max-md:px-5 cursor-pointer ${
                      selectedTab === index
                        ? "bg-neutral-900 text-white"
                        : "bg-violet-100 border-violet-100"
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
              <div key={index} className="px-2">
                <div className="flex flex-col h-full py-5 bg-white rounded-2xl border border-solid border-zinc-100 shadow-lg">
                  <div className="flex flex-col text-sm leading-4 text-neutral-900 px-5 flex-grow">
                    <div className="self-start py-1 px-3 mb-2 text-xs rounded-full border border-solid bg-slate-100 border-blue-600 border-opacity-30">
                      Model: {car?.highTrim?.year}
                    </div>
                    <img
                      loading="lazy"
                      src={car?.highTrim?.featuredImage}
                      className="self-center w-full h-48 object-contain"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-center px-5 pt-3 mt-2 w-full flex-grow">
                    <h6 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                      {car.brand.name}
                    </h6>
                    <h4 className="text-lg leading-6 text-gray-900 font-semibold">
                      {car.name}
                    </h4>
                    <CarPriceRange
                      minPrice={car?.minPrice}
                      maxPrice={car?.maxPrice}
                    />
                  </div>
                  {/* <div className="px-5">
                <div className="flex justify-between p-4 mt-3 w-full rounded-lg bg-slate-100 text-neutral-900 ">
                  <div className="flex flex-col text-center">
                    <span className="text-xs leading-5 uppercase">
                      Mileage
                    </span>
                    <span className="text-base font-semibold">
                      {car.mileage}
                    </span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-xs leading-5 uppercase">
                      Transmission
                    </span>
                    <span className="text-base font-semibold">
                      {car.transmission}
                    </span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-xs leading-5 uppercase">
                      Seats
                    </span>
                    <span className="text-base font-semibold">
                      {car.seats}
                    </span>
                  </div>
                </div>
              </div> */}

                  <div className="flex mt-4 w-full justify-between items-center px-5">
                    <div className="flex flex-col items-left">
                      <span className="text-xs leading-3">
                        EMI Starting from
                      </span>
                      <CarEMIDisplay minPrice={car?.minPrice} />
                    </div>
                    <Link
                      href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                    >
                      <button className="mt-3 px-7 py-3 text-base font-semibold tracking-tight leading-4 text-white bg-blue-600 border border-blue-600 border-solid rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="container md:my-20 my-4">
          <div className="flex gap-5 bg-zinc-50 max-md:flex-wrap">
            <div className="flex flex-col my-auto text-neutral-900">
              <div className="flex flex-col text-end">
                {/* Commented out the large number display */}
                {/* <div className="self-end text-7xl leading-[96px] max-md:text-4xl">
          20+
        </div> */}
                <div className="text-3xl font-bold">
                  Notable
                  <br className="md:block hidden" /> Upcoming Cars
                </div>
              </div>
            </div>
            <div className="flex flex-col grow shrink-0 justify-center basis-0 w-fit max-md:max-w-full">
              <Slider {...settingsupcoming}>
                {cars.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center text-white bg-black"
                  >
                    <div className="relative flex flex-col justify-end pt-20 w-full min-h-[400px]">
                      <img
                        loading="lazy"
                        src={`${item.imgSrc}`}
                        className="object-cover absolute inset-0 w-full h-full"
                      />
                      <div className="relative flex flex-col justify-center px-4 py-5 max-md:mt-10 max-md:max-w-full">
                        <div className="flex flex-col max-md:max-w-full">
                          <h4 className="self-start font-bold">{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-md:gap-0">
            <div className="flex flex-col max-md:w-full">
              <div className="relative flex flex-col grow md:items-end md:px-16 md:pb-20 md:min-h-[645px] md:mt-10">
                <img
                  loading="lazy"
                  srcSet="/car-side.png"
                  className="object-contain absolute inset-0 w-full h-full md:block hidden"
                />
                <div className="relative flex flex-col justify-center">
                  <div className="flex flex-col justify-center">
                    <h6 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                      Choose your Brand
                    </h6>
                    <div className="font-semibold mt-2 text-3xl leading-9 capitalize text-neutral-900">
                      Shop By Brand
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center col-span-3 max-md:w-full">
              <div className="grid md:grid-cols-6 grid-cols-3 gap-5 md:pr-20 max-md:pr-5">
                {brand.map((item, index) => (
                  <Link
                    href={`/brands/${item?.slug}`}
                    key={index}
                    className="flex flex-col justify-center items-center text-center text-black p-4"
                  >
                    <img
                      loading="lazy"
                      src={`${item?.logo}`}
                      className="object-cover aspect-square w-[100px] grayscale hover:filter-none"
                    />
                    <div className="mt-3.5">{item.name}</div>
                  </Link>
                ))}
              </div>
              <Link href="/brands">
                <button className="flex justify-center items-center px-16 md:py-5 py-3 mt-14 max-w-full text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 border-solid rounded-[73px] md:w-[300px] w-full max-md:px-5 max-md:mt-10">
                  View All
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden flex flex-col items-start md:pr-20 md:pb-20 text-white md:h-[400px] min-h-[320px] max-md:pr-5 w-full md:my-5 my-4">
          <img
            loading="lazy"
            srcSet="/ferrari-sponsored.jpg"
            className="object-contain absolute inset-0 w-full h-full md:block hidden"
          />
          <img
            loading="lazy"
            srcSet="/sponsored-mob.jpg"
            className="object-contain absolute inset-0 w-full h-full md:hidden block"
          />
        </div>

        <div className="container md:my-20 my-4 px-5">
          <div className="flex justify-between items-start gap-5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <h6 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                Choose by Type
              </h6>
              <h2 className="text-2xl font-semibold">
                You can choose by the body type
              </h2>
            </div>
            {/* <button className="px-6 py-3 mt-4 text-base tracking-tight leading-4 text-center rounded-[119px] text-neutral-900">
            View More
          </button> */}
          </div>

          <div className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-8 md:mt-10 mt-5 max-w-full">
            {bodyTypes.map((item, index) => (
              <Link href={`/category/${item?.slug}`} key={index}>
                <div className="flex flex-col justify-center items-center text-center text-black">
                  <div className="w-full md:h-32 h-24 overflow-hidden">
                    <img
                      loading="lazy"
                      src={`${item?.image}`}
                      className="object-contain w-full h-full transition-all duration-300 p-3"
                    />
                  </div>
                  <div className="md:mt-6 font-semibold">{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-10 gap-0 max-md:grid-cols-1 container px-5">
          <div className="flex flex-col w-full">
            <div className="flex flex-col  rounded-2xl shadow-lg bg-stone-900 relative max-md:mt-6  md:h-[350px] h-[200px]">
              <img
                src="/emi.jpg"
                alt=""
                className="absolute inset-0 object-cover w-full md:h-[350px] h-[200px] rounded-2xl"
              />
              <div className="relative z-10 m-2 bottom-0 left-0 right-0 md:p-5 p-3 text-white">
                <div>
                  {" "}
                  <div className="md:text-3xl text-xl">
                    Calculate Your Car Loan EMI
                  </div>
                  <p className="md:mt-6 leading-6 w-[50%]">
                    Input your loan amount, interest rate, and loan term to get
                    instant results.
                  </p>
                </div>

                <Link
                  href="/loan-calculator"
                  className="flex md:gap-2.5 md:mt-10 mt-3 "
                >
                  <p>Calculate Now</p>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col  rounded-2xl shadow-lg bg-stone-900 relative max-md:mt-6  md:h-[350px] h-[200px]">
              <img
                src="/car-value.jpg"
                alt=""
                className="absolute inset-0 object-cover w-full md:h-[350px] h-[200px] rounded-2xl"
              />
              <div className="relative z-10 m-2 bottom-0 left-0 right-0 md:p-5 p-3 text-white">
                <div>
                  {" "}
                  <div className="md:text-3xl text-xl">
                    Know Your Car's Worth
                  </div>
                  <p className="md:mt-6 leading-6 w-[50%]">
                    Input your car's details to receive an instant valuation
                    based on real-time market data.
                  </p>
                </div>

                <div className="flex md:gap-2.5 md:mt-10 mt-3 ">
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
              <div className="relative z-10 m-2 bottom-0 left-0 right-0 md:p-5 p-3 text-white"></div>
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

        <div className="flex flex-col container md:mt-10 my-6 px-5">
          <div className="flex flex-wrap justify-between w-full gap-5 ">
            <div className="flex flex-col max-w-full">
              <h6 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                Trending automotive videos
              </h6>
              <h2 className="text-2xl font-semibold">Latest Videos</h2>
            </div>
            {/* <div className="self-start px-6 py-3 mt-2.5 text-base tracking-tight leading-4 text-center rounded-[119px] text-neutral-900">
            View More
          </div> */}
          </div>
          <div className="grid gap-5 md:mt-7  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                className="flex flex-col bg-white rounded-2xl shadow-sm pb-7 max-md:mt-5"
              >
                <div className="relative flex flex-col overflow-hidden justify-center w-full rounded-2xl md:min-h-[250px] min-h-[200px]">
                  <img
                    loading="lazy"
                    srcSet={item?.imgSrc}
                    className="absolute inset-0 object-cover w-full md:h-full h-[200px]"
                  />
                </div>
                <div className="relative flex flex-col pl-7 mt-7 text-neutral-900 max-md:pl-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9d5fef3659a0fe531b3dc3ad5973537a8ec930dbb49f5a75f67de7a78660e9f?apiKey=7580612134c3412b9f32a9330debcde8&"
                    className=" absolute right-5 top-[-65px] w-[70px] "
                  />
                  <div className="flex flex-wrap justify-between gap-5 text-2xl">
                    <h4 className="font-semibold" line-clamp-2>
                      {item.name}
                    </h4>
                  </div>
                  {/* <small className="flex flex-wrap mt-2 text-base">
                  <div className="uppercase">Carprices.ae Team -</div>
                  <div>12th April 2024</div>
                </small> */}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col container px-5">
          <div className="flex justify-between gap-5 px-px w-full max-md:flex-wrap">
            <div className="">
              <h6 className="text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                Trending automotive news
              </h6>
              <h2 className="text-2xl font-semibold">
                {" "}
                Latest Automotive News
              </h2>
            </div>
            {/* <div className="self-start px-6 py-3 mt-2.5 text-base tracking-tight leading-4 text-center rounded-[119px] text-neutral-900">
            View More
          </div> */}
          </div>
          <div className="mt-7 w-full">
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              <Link href={`/news/${articles.news[0]?.slug}`}>
                <div
                  className="md:flex hidden col-span-2 relative flex-col justify-center p-8 pt-20 pb-9 text-slate-100 bg-cover rounded-2xl min-h-[838px]"
                  style={{
                    backgroundImage: `url('${articles.news[0].coverImage}')`,
                  }}
                >
                  <div className="relative flex flex-col justify-center py-3 border-l-4 border-blue-400 backdrop-blur-[32px] mt-[552px]">
                    <div className="px-6">
                      <div className="text-4xl line-clamp-2">
                        {articles.news[0].title}
                      </div>
                      <div className="mt-1 text-base line-clamp-2 ">
                        {articles.news[0].summary}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href={`/news/${articles.news[0]?.slug}`}
                className="md:hidden flex"
              >
                <div
                  key={index}
                  className="md:hidden flex relative flex-col justify-end p-4  text-slate-100 bg-cover rounded-2xl min-h-[269px]"
                  style={{
                    backgroundImage: `url('${articles.news[0].coverImage}')`,
                  }}
                >
                  <div className="relative flex flex-col justify-center p-4 border-l-4 border-blue-400 backdrop-blur-[32px] bg-opacity-10">
                    <div className="text-lg">{articles.news[0].title}</div>
                    {/* <div className="flex mt-1 text-sm">
                      <div className="uppercase">Carprices Team - </div>
                      <div>12th April 2024</div>
                    </div> */}
                  </div>
                </div>
              </Link>
              <div className="grid grid-rows-3 gap-4">
                {articles.news.slice(1, 4).map((item, index) => (
                  <Link href={`/news/${item?.slug}`}>
                    <div
                      key={index}
                      className="relative flex flex-col justify-end p-4  text-slate-100 bg-cover rounded-2xl min-h-[269px]"
                      style={{
                        backgroundImage: `url('${
                          item?.coverImage ? item?.coverImage : altImage
                        }')`,
                      }}
                    >
                      <div className="relative flex flex-col justify-center p-4 border-l-4 border-blue-400 backdrop-blur-[32px] bg-opacity-10">
                        <div className="text-lg">{item.title}</div>
                        {/* <div className="flex mt-1 text-sm">
                      <div className="uppercase">Carprices Team - </div>
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

        <div className="mt-12 w-full max-md:pr-5 max-md:mt-10 max-md:max-w-full container px-5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="max-md:mt-10">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-sm leading-6 capitalize text-neutral-900 max-md:mt-10">
                      <h4 className="font-semibold">Popular New Cars</h4>
                      <div className="flex flex-col mt-4">
                        <Link href="#">New Honda HR-V</Link>
                        <Link href="#" className="mt-2">
                          JAC S3 Plus
                        </Link>
                        <Link href="#" className="mt-2 max-md:mr-2.5">
                          New Chevrolet Trailblazer
                        </Link>
                        <Link href="#" className="mt-2">
                          New Chevrolet Bolt EV
                        </Link>
                        <Link href="#" className="mt-2">
                          New Chevrolet Bolt EUV
                        </Link>
                        <Link href="#" className="mt-2">
                          New Ford Bronco
                        </Link>
                        <Link href="#" className="mt-2">
                          New Ford Maverick
                        </Link>
                        <Link href="#" className="mt-2">
                          New Ford Mustang Mach-E
                        </Link>
                        <Link href="#" className="mt-2">
                          New Honda Accord
                        </Link>
                        <Link href="#" className="mt-2">
                          New Honda Civic
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-10 text-sm leading-6 capitalize text-neutral-900">
                      <Link href="#">New Honda HR-V</Link>
                      <Link href="#" className="mt-2">
                        JAC S3 Plus
                      </Link>
                      <Link href="#" className="mt-2 max-md:mr-2.5">
                        New Chevrolet Trailblazer
                      </Link>
                      <Link href="#" className="mt-2">
                        New Chevrolet Bolt EV
                      </Link>
                      <Link href="#" className="mt-2">
                        New Chevrolet Bolt EUV
                      </Link>
                      <Link href="#" className="mt-2">
                        New Ford Bronco
                      </Link>
                      <Link href="#" className="mt-2">
                        New Ford Maverick
                      </Link>
                      <Link href="#" className="mt-2">
                        New Ford Mustang Mach-E
                      </Link>
                      <Link href="#" className="mt-2">
                        New Honda Accord
                      </Link>
                      <Link href="#" className="mt-2">
                        New Honda Civic
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-sm leading-6 capitalize text-neutral-900 max-md:mt-10">
                <h4 className="font-semibold">Searched Keywords</h4>
                <div className="flex flex-col mt-4">
                  <Link href="https://carprices.ae/news/10-important-things-to-know-about-the-2024-toyota-land-cruiser-prado-before-its-uae-launch">
                    10 Important Things To Know About the 2024 Toyota Land
                    Cruiser Prado Before Its UAE Launch!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500"
                    className="mt-2"
                  >
                    The 2024 Toyota Land Cruiser Prado VS The GWM Tank 500!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/5-exciting-car-launches-to-happen-in-the-uae-in-2024"
                    className="mt-2"
                  >
                    5 Exciting Car Launches To Happen In The UAE In 2024!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae"
                    className="mt-2"
                  >
                    10 Popular Cars In UAE With High Ground Clearance Sorted By
                    Price Low To High!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae"
                    className="mt-2"
                  >
                    Internal Combustion Engine Car VS Hybrid Car!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/are-chinese-luxury-cars-better-than-german-luxury-cars-in-uae-chinese-cars-vs-german-cars"
                    className="mt-2"
                  >
                    Are Chinese Luxury Cars Better Than German Luxury Cars In
                    UAE?
                  </Link>
                  <Link
                    href="https://carprices.ae/news/heres-what-you-can-do-during-a-car-break-down-in-the-middle-of-nowhere-in-the-uae"
                    className="mt-2"
                  >
                    Here's What You Can Do During A Car Break Down!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/6-best-and-cheapest-suvs-in-uae-under-aed-150000"
                    className="mt-2"
                  >
                    6 Best And Cheapest SUVs In UAE Under AED 150,000!
                  </Link>
                  <Link
                    href="https://carprices.ae/news/10-best-cars-to-buy-in-uae-under-aed-100k"
                    className="mt-2"
                  >
                    10 Best Cars To Buy In UAE Under AED 100K In 2024
                  </Link>
                  <Link
                    href="https://carprices.ae/news/are-chinese-cars-superior-and-reliable-than-japanese-cars-in-uae"
                    className="mt-2"
                  >
                    Are Chinese Cars Superior And Reliable Than Japanese Cars In
                    UAE?
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full mb-10">
              <div className="flex flex-col grow px-8 py-10 w-full bg-sky-100 rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="text-2xl leading-9 text-neutral-900">
                  Why Carprices.ae ?
                </div>
                <div className="flex flex-col mt-9 text-neutral-900">
                  <div className="text-base leading-6">
                    Innovative Search Filters
                  </div>
                  <div className="mt-1 text-sm leading-5">
                    Say goodbye to endless scrolling and irrelevant listings.
                    Our advanced search filters allow you to find your dream car
                    with precision. Narrow down your search by make, model,
                    year, price range, mileage, and more, ensuring that every
                    result matches your exact preferences.
                  </div>
                </div>
                <div className="flex flex-col mt-6 text-neutral-900">
                  <div className="text-base leading-6">
                    Comprehensive Database
                  </div>
                  <div className="mt-1 text-sm leading-5">
                    With our extensive database of new and used cars, you'll
                    have access to a wide range of vehicles from trusted
                    dealerships across the UAE. Whether you're in the market for
                    a luxury sedan, a rugged SUV, or a fuel-efficient hatchback,
                    we've got you covered.
                  </div>
                </div>
                <div className="flex gap-0.5 self-start p-0.5 mt-9 border border-blue-600 border-solid rounded-[36px]">
                  <div className="shrink-0 w-full bg-blue-600 h-[7px] rounded-[36px]" />
                  <div className="shrink-0 bg-blue-600 h-[7px] rounded-[36px] w-[7px]" />
                  <div className="shrink-0 bg-blue-600 h-[7px] rounded-[36px] w-[7px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidemobile">
          <Ad970x250 dataAdSlot="6082880703" />{" "}
        </div>
        <div className="hidedesktop">
          <Ad300x250 dataAdSlot="9351332409" />
        </div>
        <div className="flex justify-center items-center px-16 py-16 bg-neutral-900 max-md:px-5 w-full">
          <div className="flex flex-col w-full container">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex gap-5 justify-between py-8 w-full rounded-2xl max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col text-gray-50 max-md:max-w-full">
                  <div className="text-3xl tracking-tight leading-8 max-md:max-w-full">
                    Do you need updates?
                  </div>
                  <div className="mt-2.5 text-sm leading-5 max-md:max-w-full">
                    We will provide updates, shopping tips and more.
                  </div>
                </div>
                <div className="flex gap-5 justify-between my-auto text-xl leading-7 text-white">
                  <Link href="/contact-us">Get consultation</Link>
                  <span class="material-symbols-outlined">arrow_right_alt</span>
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <div className="max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow text-sm leading-5 text-white max-md:mt-10">
                        <h4 className="tracking-wide uppercase font-semibold">
                          Top 10s
                        </h4>
                        <div className="flex flex-col mt-6 space-y-2">
                          <Link href="https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae">
                            10 Cars with High Ground Clearance
                          </Link>
                          <Link
                            href="https://carprices.ae/news/2023's-top-10-cars-that-buyers-searched-for-on-carprices.ae"
                            className="mt-1"
                          >
                            10 Most Searched Cars
                          </Link>
                          <Link
                            href="https://carprices.ae/news/chinese-car-brands-uae"
                            className="mt-1"
                          >
                            10 Best Chinese Brands
                          </Link>
                          <Link
                            href="https://carprices.ae/news/10-myths-busted-about-buying-a-new-car-in-the-uae"
                            className="mt-1"
                          >
                            10 Myths About Buying a Car
                          </Link>
                          <Link
                            href="https://carprices.ae/news/top-fuel-effnt"
                            className="mt-1"
                          >
                            10 Fuel Efficient Cars
                          </Link>
                          <Link
                            href="https://carprices.ae/news/top-10-hybrid-cars-AED-230k"
                            className="mt-1"
                          >
                            10 Best Hybrid Cars
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                        <h4 className="tracking-wide uppercase font-semibold">
                          Comparisons
                        </h4>
                        <div className="flex flex-col mt-6 space-y-2">
                          <Link href="https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500">
                            2024 Toyota Prado Vs GWM Tank 500
                          </Link>
                          <Link
                            href="https://carprices.ae/news/2024-toyota-land-cruiser-prado-vs-land-rover-defender-vs-jeep-wrangler-vs-the-ford-bronco"
                            className="mt-1"
                          >
                            Battle Of 4 Popular SUVs
                          </Link>
                          <Link
                            href="https://carprices.ae/news/the-2023-toyota-land-cruiser-300-series-vs-the-2024-toyota-land-cruiser-prado"
                            className="mt-1"
                          >
                            LC 300 Vs 2024 Toyota Prado
                          </Link>
                          <Link
                            href="https://carprices.ae/news/new-vs-old-prado"
                            className="mt-1"
                          >
                            2024 LC Prado Vs Used LC Prado
                          </Link>
                          <Link
                            href="https://carprices.ae/news/lc-prado-vs-patrol"
                            className="mt-1"
                          >
                            2024 LC Prado Vs Nissan Patrol
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[22%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                        <h4 className="tracking-wide uppercase font-semibold">
                          Quick Search
                        </h4>
                        <div className="flex flex-col mt-6 space-y-2">
                          <Link href="https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae">
                            ICE Vs Hybrid
                          </Link>
                          <Link
                            href="https://carprices.ae/news/analysing-the-cost-of-living-with-the-electric-vehicle-vs-internal-combustion-engine-vehicle-in-the-uae-ev-vs-ice"
                            className="mt-1"
                          >
                            ICE Vs EV
                          </Link>
                          <Link
                            href="https://carprices.ae/news/7-popular-reliable-sedans-to-buy-in-the-uae-in-2024-or-best-cars-in-uae"
                            className="mt-1"
                          >
                            Popular Reliable Sedans
                          </Link>
                          <Link
                            href="https://carprices.ae/news/5-exciting-car-launches-to-happen-in-the-uae-in-2024"
                            className="mt-1"
                          >
                            2024 Car Launches
                          </Link>
                          <Link
                            href="https://carprices.ae/news/6-best-chinese-suv-cars-in-uae-under-aed-70000"
                            className="mt-1"
                          >
                            Best Chinese SUVs
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-sm leading-5 text-white max-md:mt-10">
                        <h4 className="tracking-wide uppercase font-semibold">
                          Legal Bits
                        </h4>
                        <div className="flex flex-col mt-6">
                          <Link href="/about">About us</Link>
                          <Link href="/contact-us" className="mt-1">
                            Contact Us
                          </Link>
                          <Link href="/privacy" className="mt-1">
                            Privacy Policy
                          </Link>
                          <Link href="/terms-and-conditions" className="mt-1">
                            Terms and Conditions
                          </Link>
                          <Link href="/code-of-conduct" className="mt-1">
                            Code of Conduct
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center self-start">
                  <div className="flex flex-col">
                    <div className="shrink-0 self-end h-px bg-white w-[45px]" />
                    <div className="flex flex-col mt-6">
                      <div className="flex flex-col self-end text-sm leading-5 text-white">
                        {/* <div>+971 50 649 4665</div> */}
                        <div className="mt-1 text-right">
                          <Link href="mailto:info@carprices.ae">
                            info@carprices.ae
                          </Link>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Link href="https://youtube.com/@carpricesuae?feature=shared">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89539fb8ec01af9a7f038afd91c58e261f280173a90f447aa81acbc97aa5bd68?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="shrink-0 w-6 aspect-square"
                          />
                        </Link>
                        <Link href="https://www.facebook.com/carprices.ae/">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/989ca5cee220b9472a192b392c3c43f2675c6d4a9f075180fafad8163839aee5?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="shrink-0 w-6 aspect-square"
                          />
                        </Link>
                        <Link href="https://x.com/CarPricesAe?t=_IgNE0J6jf5r1ZiiKrkaYw&s=09">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5105e8bdd60ff0245b9f094d1b7529a5939d0436f5ce2ebad352d77ca2bd6576?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="shrink-0 w-6 aspect-square"
                          />
                        </Link>
                        <Link href="https://www.linkedin.com/company/car-prices-ae/">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/280619b280591c941855898a9c986f9346aa18dcf6ee0f84e15d1bfd4d37bcb1?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="shrink-0 w-6 aspect-square"
                          />
                        </Link>
                        <Link href="https://www.instagram.com/carprices.ae?igsh=bnE4cnpudjFwMHg1">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d67ce5820088e265263fd67a72a832801a8cf6b563bf67494b5d1b6113014034?apiKey=7580612134c3412b9f32a9330debcde8&"
                            className="shrink-0 w-6 aspect-square"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-14 text-sm leading-5 text-white max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              <div className="my-auto">
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
