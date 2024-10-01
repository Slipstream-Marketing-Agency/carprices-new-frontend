import { AddBox } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";
import Image from "next/image";
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
import FilterLayout from "../components-old/find-car-multi-step-filter/FilterLayout";
import Ad728x90 from "../components-old/ads/Ad728x90";
import Ad300x600 from "../components-old/ads/Ad300x600";
import Ad300x250 from "../components-old/ads/Ad300x250";
import Ad970x250 from "../components-old/ads/Ad970x250";
import MainLayout from "../layout/MainLayout";
import SeoLinksHome from "../components/common/SeoLinksHome";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CarCard from "../components/home/CarCard";
import SearchForTheBest from "../components/home/SearchForTheBest";
import CompareCars from "../components/home/CompareCars";
import WebStories from "../components/home/WebStories";
import { fetchMetaData } from "../lib/fetchMetaData";

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
  metaData,
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
        },
      },
      {
        breakpoint: 720,
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
      model: "2025",
      brand: "Audi",
      name: "2025 All-New Audi e-tron GT! New Variants and More Power",
      description:
        "The 2025 Audi e-tron GT features a facelift, new variants, improved range, performance, and charging. The lineup includes the first fully electric RS performance model, the RS e-tron GT Performance, with striking design and advanced technology.",
      createdOn: "09th September 2024",
      url: "https://carprices.ae/news/2025-all-new-audi-e-tron-gt-new-variants-and-more-power",
      image: "https://cdn.carprices.ae/assets/Audi_RS_E_Tron_2e8984e401.jpg",
    },
    {
      model: "2024",
      brand: "Toyota",
      name: "All-New 2024 Toyota Land Cruiser Prado Returns To Rule The Off-Roads!",
      description:
        "The new Land Cruiser Prado features a body-on-frame design and is a more capable off-roader than before.",
      createdOn: "09th September 2024",
      url: "https://carprices.ae/news/2024-toyota-land-cruiser-prado",
      image: "https://cdn.carprices.ae/assets/LC_Prado_6286422331.jpg",
    },

    {
      model: "2024",
      brand: "Porsche",
      name: "Development Of The 2025 Porsche 911 Hybrid Came To An End | To Debut On May 28!",
      description:
        "Porsche has concluded the testing of the first-ever hybrid model of the iconic 992 Gen 911. The 7:16.934 lap time at Nürburgring showcases its enhanced capabilities. A milestone in Porsche's history, it sets new standards for automotive excellence.",
      createdOn: "09th September 2024",
      url: "https://carprices.ae/news/development-of-the-2025-porsche-911-hybrid-came-to-an-end-to-debut-on-may-28",
      image:
        "https://cdn.carprices.ae/assets/Porsche_Hybrid_911_dc05da8cdd.jpg",
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
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    autoplay: true,
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
      imgSrc:
        "https://cdn.carprices.ae/assets/Nissan_Patrol_2025_0f06f3dee1.jpg",
      title: "2025 Nissan Patrol",
      price: "Visit Site",
    },
    {
      imgSrc:
        "https://cdn.carprices.ae/assets/Mercedes_Benz_AMG_CLE_e7e6c9c59b.jpg",
      title: "2024 Mercedes Benz AMG CLE",
      price: "Visit Site",
    },
    {
      imgSrc: "https://cdn.carprices.ae/assets/BMW_M5_e2c0b94f35.jpg",
      title: "2024 BMW M5",
      price: "Visit Site",
    },
    {
      imgSrc: "https://cdn.carprices.ae/assets/Nissan_GTR_ba369e591d.jpg",
      title: "2024 Nissan GTR",
      price: "Visit Site",
    },
    {
      imgSrc: "https://cdn.carprices.ae/assets/Wagoneer_23cdadfe7b.jpg",
      title: "2024 Jeep Wagoneer",
      price: "Visit Site",
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
    // speed: 2000,
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

  // const Ad300x250 = dynamic(() => import("../components-old/ads/Ad300x250"), {
  //   ssr: false,
  // });
  // const Ad970x250 = dynamic(() => import("../components-old/ads/Ad970x250"), {
  //   ssr: false,
  // });
  // const Ad728x90 = dynamic(() => import("../components-old/ads/Ad728x90"), {
  //   ssr: false,
  // });
  // const Ad300x600 = dynamic(() => import("../components-old/ads/Ad300x600"), {
  //   ssr: false,
  // });
  // const FilterLayout = dynamic(
  //   () => import("../components-old/find-car-multi-step-filter/FilterLayout"),
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
          title: metaData?.title ? metaData.title :
            "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
          description: metaData?.description ? metaData.description :
            "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
          type: "Car Review Website",
        }}
      >
        <main className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-w-full tw-font-gilroy tw-overflow-x-hidden">
          <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full">
            <div className="tw-row-span-1 lg:tw-col-span-7 tw-col-span-12 tw-flex tw-flex-col tw-justify-start tw-text-white tw-rounded-2xl tw-relative tw-overflow-hidden lg:tw-h-full tw-h-[230px] lg:tw-order-1 tw-order-2">
              <div className="video-container tw-relative tw-w-full tw-h-full">
                <video
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/path/to/poster.jpg"
                  className="banner-video tw-w-full tw-h-full object-cover"
                >
                  <source
                    src="https://cdn.carprices.ae/assets/Promo_Web_1_103eaf6dea.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="tw-row-span-1 lg:tw-col-span-3 tw-col-span-12 tw-flex tw-flex-col tw-justify-center tw-border tw-border-neutral-100 lg:tw-order-2 tw-order-1">
              <FilterLayout />
            </div>
          </div>
          <SearchForTheBest />
          <div className="tw-container tw-mx-auto tw-py-8 tw-relative ">
            <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
              What’s trending in the new car market?
            </h5>
            <h2 className=" tw-font-semibold tw-capitalize">
              Here are some of the featured new cars in the UAE
            </h2>

            <div className="tw-absolute tw-top-10 tw-right-0 xl:tw-block tw-hidden">
              <Ad300x600 dataAdSlot="3792539533" />
            </div>
            <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-4 tw-gap-5">
              <div className="xl:tw-col-span-3 tw-relative tw-half-card-slider tw-hidden sm:tw-block">
                <Slider {...sliderSettings}>
                  {featuredcars?.carModels.map((car) => (
                    <div className="tw-px-2" key={car.id}>
                      <CarCard car={car} loading={false} />
                    </div>
                  ))}
                </Slider>
                <div className="md:tw-block tw-hidden tw-mt-4"> {/* Added margin-top */}
                  <Ad728x90 dataAdSlot="4367254600" />
                </div>
              </div>
              {/* Horizontal scrolling for screens 720px and smaller */}
              <div className="sm:tw-hidden tw-block tw-overflow-x-auto tw-m-2 custom-scrollbar">
                <div className="tw-flex tw-nowrap tw-pr-1">
                  {featuredcars?.carModels.map((car) => (
                    <div className="tw-inline-block tw-pr-2" style={{ minWidth: '75%' }} key={car.id}>
                      <CarCard car={car} loading={false} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:tw-hidden tw-block sm:tw-mb-4 tw-w-full">
                <Ad300x250 dataAdSlot="8451638145" />
              </div>
            </div>
          </div>
          {/* featured cars */}
          <div className="tw-container md:tw-py-8 tw-overflow-hidden ">
            <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
              <div className="tw-flex tw-flex-col  tw-justify-between tw-w-1/4 max-md:tw-w-full sm:tw-my-3">
                <div className="tw-flex tw-flex-col max-md:tw-mt-10">
                  <h1 className="sm:tw-mt-2 !tw-text-[1.6rem] tw-leading-8 tw-font-semibold tw-text-neutral-900 tw-capitalize">
                    Featured car news
                  </h1>
                  <p className="md:tw-mt-4 tw-text-base tw-leading-6 tw-text-neutral-900">
                    CarPrices.ae brings car buyers and enthusiasts automotive
                    news coverage with high-res images and video from car shows
                    and reveals around the world.
                  </p>
                  <Link href="/news">
                    <button className="md:tw-block tw-hidden tw-self-start md:tw-px-14 tw-px-8 md:tw-py-5 tw-py-2 md:tw-mt-9 tw-mt-4 tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-rounded-full max-md:tw-px-5 active:tw-bg-blue-700">
                      View More
                    </button>
                  </Link>
                </div>
                <div className="md:tw-flex tw-hidden tw-justify-end items-center tw-gap-4 py-2">
                  <button
                    className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center hover:tw-shadow-md active:tw-shadow-md focus:tw-shadow-md"
                    onClick={() => featuredSliderRef.current.slickPrev()}
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center hover:tw-shadow-md active:tw-shadow-md focus:tw-shadow-md"
                    onClick={() => featuredSliderRef.current.slickNext()}
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
                {/* <div className="md:tw-hidden tw-flex tw-justify-end items-center tw-gap-4 py-2">
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
                </div> */}
              </div>
              <div className="md:tw-flex tw-hidden tw-flex-col tw-w-3/4 max-md:tw-w-full featured-news-card tw-mt-5">
                <Slider ref={featuredSliderRef} {...settings}>
                  {FeaturedData.map((car, index) => (
                    <Link href={car.url} key={index} className="tw-p-2">
                      <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-2xl tw-transition-transform tw-duration-500 tw-custom-scale">
                        <Image
                          src={car.image}
                          alt={`${car.brand} ${car.name}`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="tw-object-cover tw-w-full tw-h-96"
                        />
                        <div className="tw-m-2 tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-mt-96 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50  tw-bg-black tw-rounded-2xl tw-text-white">
                          <h6 className="tw-text-white tw-mb-0">{car.name}</h6>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
              <div className="md:tw-hidden tw-block tw-mt-4">
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                  {FeaturedData.map((item, index) => (
                    <Link href={item.url} key={index}>
                      <div className="tw-flex tw-flex-col tw-h-full tw-overflow-hidden tw-rounded-2xl tw-shadow-lg tw-transition-transform tw-duration-500 tw-bg-white">
                        <Image
                          src={item.image}
                          alt={`${item.brand} ${item.name}`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="tw-object-cover tw-w-full tw-h-48 tw-rounded-t-2xl"
                        />
                        <div className="tw-p-4 tw-flex tw-flex-col tw-flex-grow">
                          <h6 className="tw-text-lg tw-font-semibold tw-leading-4 tw-text-gray-800">{item.name}</h6>
                          <p className="tw-text-sm tw-text-gray-600 tw-mt-1">{item.brand}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="tw-text-center tw-mt-4">
                  <Link href="/news">
                    <button className="tw-self-start md:tw-px-14 tw-px-8 md:tw-py-5 tw-py-2 md:tw-mt-9 tw-mt-4 tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-rounded-full max-md:tw-px-5 active:tw-bg-blue-700">
                      View More
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
          {/* popular new cars */}
          <div className="tw-flex tw-flex-col tw-container md:tw-mt-12 tw-mt-6">
            <div className="tw-flex tw-flex-col tw-self-start sm:tw-px-5 max-md:tw-max-w-full">
              <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold ">
                Most popular new cars in the UAE
              </h5>
              <h2 className=" tw-font-semibold tw-capitalize">
                Here are some of the most popular new cars users look for in the
                UAE
              </h2>
            </div>

            <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-mt-3 tw-w-full tw-text-base tw-leading-4 tw-text-center tw-text-neutral-900 max-md:tw-flex-wrap max-md:tw-max-w-full">
              <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between sm:tw-px-5 max-md:tw-flex-wrap max-md:tw-max-w-full">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="tw-flex tw-flex-col tw-justify-center"
                  >
                    <div
                      className={`tw-justify-center md:tw-px-14 tw-px-10 md:tw-py-5 tw-py-3 tw-border tw-border-solid tw-rounded-[73px] max-md:tw-px-5 tw-cursor-pointer ${selectedTab === index
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

            <div className="tw-px-4 tw-hidden sm:tw-block">
              <Slider key={selectedTab} {...categorysliderSettings}>
                {filterCars(selectedTab).map((car, index) => (
                  <div className="tw-px-2" key={car.id}>
                    <CarCard car={car} loading={loading} />
                  </div>
                ))}
              </Slider>
              {/* )} */}
            </div>
            {/* Horizontal scrolling for screens 720px and smaller */}
            <div className="sm:tw-hidden tw-block tw-overflow-x-auto tw-m-2 custom-scrollbar">
              <div className="tw-flex tw-nowrap tw-pr-1">
                {filterCars(selectedTab).map((car) => (
                  <div className="tw-inline-block tw-pr-2" style={{ minWidth: '75%' }} key={car.id}>
                    <CarCard car={car} loading={loading} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* notable upcoming cars */}
          {/* new */}
          <div className="tw-container sm:tw-mt-12  tw-mt-6">
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 w-full">
              {/* Sidebar for title and navigation buttons */}

              <div className="tw-pt-3 lg:tw-col-span-2">
                <div className="tw-flex tw-flex-col tw-h-full sm:tw-py-5">
                  <div className="tw-flex md:tw-flex-col tw-justify-between tw-h-full md:tw-p-4 tw-px-5">
                    <div className="md:tw-text-3xl tw-text-xl tw-font-bold">
                      Notable
                      <br /> Upcoming Cars
                    </div>
                    <div className="tw-flex tw-justify-center tw-items-center tw-gap-4 py-2">
                      <button
                        className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                        onClick={() => sliderRef.current.slickPrev()}
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      <button
                        className="tw-bg-white tw-text-black tw-px-3 tw-py-3 tw-rounded-full tw-shadow-md tw-flex tw-items-center"
                        onClick={() => sliderRef.current.slickNext()}
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Section */}
              <div className="lg:tw-col-span-10">
                <Slider ref={sliderRef} {...settingsupcoming}>
                  {cars.map((item, index) => (
                    <div
                      key={index}
                      className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-white tw-bg-black"
                    >
                      <div className="tw-relative tw-flex tw-flex-col tw-justify-end tw-pt-20 tw-min-h-[290px]">
                        <Image
                          loading="lazy"
                          layout="fill"
                          src={item.imgSrc}
                          alt={item.title}
                        />
                        <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-px-4 tw-py-5 max-md:tw-mt-10">
                          <h4 className="tw-text-white tw-font-bold">{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* <div className="tw-w-full md:px-0 tw-px-5 md:tw-mt-12 tw-mt-6">
            <div className="tw-relative tw-flex tw-justify-between container">
              <div className="tw-flex tw-flex-col tw-justify-center">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  What's the Best ?
                </h5>
                <h2 className=" tw-font-semibold tw-capitalize">
                  Popular Car Comparison
                </h2>
              </div>
              <Link href="/compare-cars">
                <span className="tw-capitalize tw-font-semibold">Compare Cars</span>
              </Link>
            </div>
            <CompareCars />
          </div> */}
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

          <div className="tw-w-full md:px-0 tw-px-5 md:tw-mt-12 tw-mt-6">
            <div className="tw-relative tw-flex tw-flex-col tw-justify-center container">
              <div className="tw-flex tw-flex-col tw-justify-center">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Choose your Brand
                </h5>
                <h2 className=" tw-font-semibold tw-capitalize">
                  Shop by car brands available in the UAE
                </h2>
              </div>
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-5 max-md:tw-gap-0">
              <div className="tw-flex tw-flex-col max-md:tw-w-full">
                <div className="tw-relative tw-flex tw-flex-col tw-grow md:tw-items-end md:tw-px-16 md:tw-pb-20 md:tw-min-h-[519px] ">
                  <Image
                    loading="lazy"
                    alt="car-side"
                    src="/car-side.png"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="tw-object-contain tw-absolute tw-inset-0 tw-w-full tw-h-full md:tw-block tw-hidden"
                  />
                </div>
              </div>
              <div className="tw-flex tw-flex-col tw-justify-center tw-col-span-3 max-md:tw-w-full ">
                <div className="tw-grid md:tw-grid-cols-6 tw-grid-cols-3 tw-gap-5">
                  {brand.map((item, index) => (
                    <Link
                      href={`/brands/${item?.slug}`}
                      key={index}
                      className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-text-black tw-p-4"
                    >
                      <Image
                        loading="lazy"
                        alt={`brand-${item?.name}`}
                        src={`${item?.logo}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="tw-object-contain tw-aspect-square md:tw-w-[90px] tw-w-[80px] md:tw-grayscale hover:tw-filter-none"
                      />
                      <div className="md:tw-mt-6 tw-mt-2 tw-font-semibold tw-whitespace-nowrap tw-text-xs md:tw-text-base">
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/brands">
                  <button className="tw-flex tw-justify-center tw-items-center tw-px-16 md:tw-py-5 tw-py-3 tw-mt-14 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] md:tw-w-[300px] tw-w-full max-md:tw-px-5 max-md:tw-mt-10">
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
            <Image
              loading="lazy"
              alt="Banner-Sponsored-Desktop"
              src="/Banner-Sponsored-Desktop.jpg"
              srcSet="/Banner-Sponsored-Desktop.jpg"
              width={0}
              height={0}
              sizes="100vw"
              className="tw-object-contain tw-w-full tw-h-full md:tw-block tw-hidden tw-mt-10 "
            />
          </Link>
          <Link
            href="/news/Ferrari-V12-has-arrived-again-with-the-12cilindri-redlines-at-9500rpm"
            className="tw-w-full tw-h-full md:tw-hidden tw-block"
          >
            <Image
              loading="lazy"
              alt="Banner-Sponsored-Desktop"
              src="/Banner-Sponsored-Desktop.jpg"
              srcSet="/Banner-Sponsored-Desktop.jpg"
              width={0}
              height={0}
              sizes="100vw"
              className="tw-object-contain tw-w-full tw-h-full md:tw-hidden tw-block tw-mt-10 tw-mb-3"
            />
          </Link>

          <div className="tw-container md:tw-my-20 tw-my-4 tw-px-5">
            <div className="tw-flex tw-justify-between tw-items-start tw-gap-5 tw-w-full max-md:tw-flex-wrap max-md:tw-max-w-full">
              <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Choose by body type
                </h5>
                <h2 className=" tw-font-semibold tw-capitalize">
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
                    <div className="tw-w-full md:tw-h-32 sm:tw-h-24 tw-overflow-hidden">
                      <Image
                        loading="lazy"
                        src={`${item?.image}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt={`category-${item?.name}`}
                        className="tw-object-contain tw-w-full tw-h-full tw-transition-all tw-duration-300 md:tw-py-3 md:tw-px-3 py-1 px-1"
                      />
                    </div>
                    <div className=" tw-font-semibold tw-text-xs md:tw-text-base">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* image section */}
          <div className="tw-grid tw-grid-cols-2 md:tw-gap-10 tw-gap-0 max-md:tw-grid-cols-1 tw-container">
            {/* calculate your car loan EMI */}
            {/* <div className="tw-flex tw-flex-col tw-w-full">
              <Link href="/loan-calculator" className="tw-flex md:tw-gap-2.5 ">
                <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
                  <img
                    src="/emi.jpg"
                    alt="emi-Icon"
                    className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
                  />
                  <div className="md:hidden block tw-rounded-2xl tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>

                  <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                    <div>
                      <h2 className="tw-text-white">
                        Calculate Your Car Loan EMI
                      </h2>
                      <p className="tw-text-sm sm:tw-text-base md:tw-mt-6 tw-leading-6 md:tw-w-[50%] w-full">
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
            </div> */}
            {/* value of  current car */}
            {/* <div className="tw-flex tw-flex-col tw-w-full">
              <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
                <img
                  src="/car-value.jpg"
                  alt="value-of-car Icon"
                  className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
                />
                <div className="md:hidden block tw-rounded-2xl tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>
                <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                  <div>
                    <h2 className="tw-text-white">
                      Find out the value of your current car
                    </h2>
                    <p className="tw-text-sm sm:tw-text-base md:tw-mt-6 tw-leading-6 md:tw-w-[50%] w-full">
                      Our car valuation calculator helps you find out what you
                      can expect for your current car. Fill in the details and
                      get an estimated current value for your used car.
                    </p>
                  </div>

                  <div className="tw-flex md:tw-gap-2.5 md:tw-mt-10 tw-mt-3">
                    <p className="tw-font-bold">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>


          {/* image section NEw */}
          <div className=" tw-container sm:tw-grid tw-grid-cols-2 tw-w-full tw-gap-4 tw-space-y-4 sm:tw-space-y-0">
            <div className="tw-bg-gradient-to-tl tw-from-blue-800 tw-via-blue-600 tw-to-blue-700  tw-rounded-2xl tw-p-4 sm:tw-p-6 tw-text-white tw-flex tw-relative tw-overflow-hidden tw-custom-gradient">
              <div>
                <div className="tw-font-semibold sm:tw-text-2xl  tw-capitalize">
                  calculate your car loan EMI
                </div>
                <div className="  tw-text-xs sm:tw-text-sm tw-mb-6 tw-w-[60%] sm:tw-w-2/3 tw-opacity-80 tw-mt-1">
                  Input your loan amount, interest rate, and loan term to get instant results.
                </div>
                <Link href="/loan-calculator">
                  <button
                    className=" tw-text-sm tw-capitalize  tw-bg-transparent tw-text-white tw-mt-16"
                  >
                    Calculate Now
                  </button>
                </Link>
                <ArrowForwardIcon fontSize="small" className="tw-mx-2" />
              </div>
              <Image
                className="tw-object-contain tw-min-h-0 tw-absolute sm:tw-bottom-6 sm:tw-left-56 tw-bottom-10 tw-left-40 tw-w-[60%] tw-h-[60%] xl:tw-w-[75%] xl:tw-h-[75%]"
                src={"https://cdn.carprices.ae/assets/car_Loan_EMI_icon_97f07e7ea8.png"}
                alt="car_Loan_EMI-icon"
                height={200}
                width={200}
              // layout="responsive"
              />
            </div>
            <div className="tw-bg-gradient-to-tl tw-from-gray-700 tw-via-gray-800 tw-to-black  tw-rounded-2xl tw-p-4 sm:tw-p-6 tw-text-white tw-flex tw-relative tw-overflow-hidden tw-custom-gradient">
              <div>
                <div className=" tw-font-semibold sm:tw-text-2xl  tw-capitalize ">
                  Know your car's worth
                </div>
                <div className="  tw-text-xs sm:tw-text-sm tw-mb-6 tw-w-[60%] sm:tw-w-2/3 tw-opacity-80 tw-mt-1">
                  Input your car's details to receive an instant valuation based on real-time market data.
                </div>
                <Link href="/insurance-calculator">

                  <button
                    className=" tw-text-sm tw-capitalize  tw-bg-transparent tw-text-white tw-mt-16"
                  >
                    Value My Car
                  </button>
                </Link>
                <ArrowForwardIcon fontSize="small" className="tw-mx-2" />
              </div>
              <Image
                className="tw-object-contain tw-min-h-0 tw-absolute sm:tw-bottom-6 sm:tw-left-52 tw-bottom-10 tw-left-36 tw-w-[65%] tw-h-[65%] xl:tw-w-[80%] xl:tw-h-[80%]"
                src={"https://cdn.carprices.ae/assets/car_Worth_icon_9226a22e4a.png"}
                alt="car_worth-icon"
                height={200}
                width={200}
              // layout="responsive"
              />
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
          {/* <div className="tw-w-full md:px-0 tw-px-5 md:tw-mt-12 tw-mt-6">
            <div className="tw-relative tw-flex tw-justify-between container">
              <div className="tw-flex tw-flex-col tw-justify-center">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  What's the News
                </h5>
                <h2 className=" tw-font-semibold tw-capitalize">
                  Web Stories
                </h2>
              </div>
              <Link href="#">
                <span className="tw-capitalize tw-font-semibold">View More</span>
              </Link>
            </div>
            <WebStories />
          </div> */}
          <div className="tw-flex tw-flex-col tw-container md:tw-mt-10 tw-my-6 tw-px-5">
            <div className="tw-flex tw-flex-wrap tw-justify-between tw-w-full tw-gap-5">
              <div className="tw-flex tw-flex-col tw-max-w-full">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Trending videos
                </h5>
                <h2 className=" tw-font-semibold tw-capitalize">
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
                  imgSrc:
                    "https://cdn.carprices.ae/assets/LC_2024_280082ac3e.jpg",
                  name: "The 2024 Toyota Land Cruiser Prado Arrives In UAE 🤩 | Prices and Variants Discussed!",
                  url: "https://www.youtube.com/watch?v=_xLXi8Si2f8",
                },
                {
                  imgSrc:
                    "https://cdn.carprices.ae/assets/Lexus_GX_vs_Patrol_a903e1ef66.jpg",
                  name: "2024 Lexus GX 🤜VS🤛 2024 Nissan Patrol! Ultimate Battle Of Luxury and Off-Road Dynamics 💪",
                  url: "https://www.youtube.com/watch?v=4MbZpuqDXrM&t=190s",
                },
                {
                  imgSrc:
                    "https://cdn.carprices.ae/assets/BYD_Shark_vs_Hilux_fe36d1aad2.jpg",
                  name: "BYD Shark PHEV VS Toyota Hilux 🤜🤛: Which Will Dominate the Trails, China or Japan?",
                  url: "https://www.youtube.com/watch?v=R5cXg7E416U",
                },
              ].map((item, index) => (
                <Link
                  href={item.url}
                  target="_blank"
                  key={index}
                  className="tw-flex tw-flex-col tw-bg-white tw-rounded-2xl tw-shadow-sm tw-pb-7 max-md:tw-mt-5"
                >
                  <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-justify-center tw-w-full tw-rounded-2xl md:tw-min-h-[177px] tw-min-h-[188px] xl:tw-min-h-[240px]">
                    <Image
                      loading="lazy"
                      width={0}
                      height={0}
                      layout="fill"
                      alt={item.name}
                      src={item?.imgSrc}
                    />
                  </div>
                  <div className="tw-relative tw-flex tw-flex-col tw-pl-7 tw-mt-7 tw-text-neutral-900 max-md:tw-pl-5">
                    <Image
                      loading="lazy"
                      alt="playbutton-icon"
                      width={0}
                      height={0}
                      src="/playbutton.svg"
                      className=" tw-absolute tw-right-5 tw-top-[-53px] tw-w-[47px]"
                    />
                    <div className="tw-flex tw-flex-wrap tw-justify-between tw-gap-5 ">
                      <h5 className=" tw-text-black  tw-font-semibold line-clamp-2">
                        {item.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-container md:tw-mt-8 tw-mt-0">
            <div className="tw-flex tw-justify-between tw-gap-5 tw-px-px tw-w-full max-md:tw-flex-wrap">
              <div className="">
                <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                  Trending automotive news
                </h5>
                <h2 className=" tw-font-semibold tw-capitalize">Latest Automotive News</h2>
              </div>
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
                      <div className="tw-mt-1 tw-opacity-70 tw-text-base tw-line-clamp-2 tw-text-white">
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
                    <div className="tw-text-sm sm:tw-text-lg tw-text-white">
                      {articles.news[0].title}
                    </div>
                  </div>
                </Link>

                <div className="tw-grid tw-grid-rows-3 tw-gap-4">
                  {articles.news.slice(1, 4).map((item, index) => (
                    <Link href={`/news/${item?.slug}`}>
                      <div
                        key={index}
                        className="tw-relative tw-flex tw-flex-col tw-justify-end tw-p-4 tw-text-slate-100 tw-bg-cover tw-rounded-2xl tw-min-h-[269px]"
                        style={{
                          backgroundImage: `url('${item?.coverImage ? item?.coverImage : altImage
                            }')`,
                        }}
                      >
                        <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-p-4 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50  tw-bg-black tw-rounded-2xl">
                          <div className="tw-text-sm sm:tw-text-lg tw-text-white">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <SeoLinksHome />
        </main>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [carSection, home, articles, compare, metaData] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-sections/findAll`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/home`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}compare-car/home`),
      fetchMetaData('home'),
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
        metaData: metaData
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
