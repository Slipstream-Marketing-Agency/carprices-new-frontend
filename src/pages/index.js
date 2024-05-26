import { AddBox } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import altImage from "../../public/assets/images/blog-alt-image.png";
import Ad300x250 from "../components/ads/Ad300x250";
import Ad970x250 from "../components/ads/Ad970x250";
import FilterLayout from "../components/find-car-multi-step-filter/FilterLayout";
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
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Ad728x90 from "../components/ads/Ad728x90";
import Ad300x600 from "../components/ads/Ad300x600";

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
  console.log(articles.news, "articles.news");
  const currentYear = new Date().getFullYear();
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
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    autoplay: false,
    focusOnSelect: true,
    variableWidth: true,
    draggable: true,
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
      <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-[21px] ">
        {priceInfo}
      </span>
    );
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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

  const links = [
    { href: "/search-cars", label: "Search New Cars" },
    { href: "/compare-cars", label: "Compare New Cars" },
    { href: "/loan-calculator", label: "Car Loan Calculator" },
    { href: "/news", label: "News" },
    { href: "/review", label: "Reviews" },
  ];

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

  const [isLoading, setIsLoading] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const client = createApolloClient();

  const fetchBrands = async (brandInput) => {
    try {
      setIsLoading(true);
      const { data } = await client.query({
        query: gql`
            query {
              carBrands(filters:{name:{containsi:"${brandInput}"}}) {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
            `,
      });

      const brands = data.carBrands.data;
      setBrandOptions(brands);
      //
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };
  const fetchTags = async (tagInput) => {
    try {
      const { data } = await client.query({
        query: gql`
            query{
              articleCategories(filters:{name:{containsi:"${tagInput}"}}){
                data{
                  attributes{
                    name
                    slug
                    articles{
                      data{
                        attributes{
                          title
                          slug
                          
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
      });
      const tags = data.articleCategories.data;
      setTagOptions(tags);

      //
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };

  const fetchAllBrands = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query SearchBrands {
            carBrands(pagination: { limit: -1 }, sort: "name:asc") {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
          }
        `,
      });

      setBrandOptions(data.carBrands.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
    setSearchLoading(false);
  };

  const [results, setResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleChangedd = (e) => {
    fetchBrands(e.target.value);
    fetchTags(e.target.value);
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    // const filteredValue = profiles.filter((profile) =>
    //   profile.name.toLowerCase().startsWith(target.value.toLowerCase())
    // );
    const filteredValue = brandOptions.map((brand) => brand.attributes.name);

    const tagsfilteredValue = tagOptions.map((tag) => tag.attributes.name);

    setResults([...tagsfilteredValue, ...filteredValue]);
  };

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Handle click outside the search bar to close the dropdown
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }car-models/search?searchTerm=${encodeURIComponent(searchTerm)}`
      );

      setSearchResults(response.data.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleItemClick = (item) => {
    if (item.type === "brand") {
      // Redirect to the brand page
      router.push(`/brands/${item.slug}`);
    } else if (item.type === "model") {
      // Redirect to the model page (assuming you have the year available in the item)
      router.push(`/brands/${item.brandSlug}/${item.year}/${item.slug}`);
    }
    setShowDropdown(false);
  };

  const formatLabel = (item) => {
    if (item.type === "brand") {
      return item.name;
    } else if (item.type === "model") {
      return `${item.year} ${item.brand} ${item.name}`;
    }
  };

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

      <div
        className={`tw-fixed tw-top-0 tw-left-0 tw-z-30 tw-w-3/4 tw-max-w-[480px] tw-h-full tw-bg-white tw-shadow-lg tw-transform tw-transition-transform tw-duration-300 ${
          isOpen ? "tw-translate-x-0" : "-tw-translate-x-full"
        }`}
      >
        <div className="tw-flex tw-flex-col tw-pb-20 tw-mx-auto tw-w-full tw-max-w-[480px]">
          <div className="tw-flex tw-flex-col tw-px-4 tw-pt-2 tw-w-full">
            <div className="tw-flex tw-justify-between tw-items-start tw-gap-5 tw-pt-7 tw-w-full tw-text-base tw-tracking-wider tw-text-center tw-whitespace-nowrap tw-text-neutral-900">
              <div className="tw-flex tw-items-center tw-gap-1.5 tw-mt-2">
                <img
                  loading="lazy"
                  src="/assets/img/car-prices-logo.png"
                  className="tw-w-[150px] tw-object-contain"
                />
              </div>
              <div onClick={toggleNavigation}>
                <img
                  loading="lazy"
                  src="/close-button.svg"
                  className="tw-shrink-0 tw-w-6 tw-aspect-[0.8]"
                />
              </div>
            </div>

            <div className="tw-flex tw-flex-col tw-pt-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="tw-justify-center tw-font-semibold tw-py-3"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* <div className="tw-flex tw-flex-col tw-self-center tw-px-3 tw-py-2 tw-mt-3 tw-w-full tw-text-base tw-tracking-wider tw-leading-6 tw-rounded-xl tw-bg-stone-50 tw-max-w-[288px] tw-text-slate-800">
            {[
              {
                text: "My Account",
                img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e292635af687a424882bb0b2199e2c86a9034ee7a9432fdef4e851d13e5d7493?apiKey=7580612134c3412b9f32a9330debcde8&",
              },
              {
                text: "About Us",
                img: "https://cdn.builder.io/api/v1/image/assets/TEMP/5419132d38579fff35b5f82c22021ccad4ebbe9b9c05cc273e19c98d1616d95f?apiKey=7580612134c3412b9f32a9330debcde8&",
              },
              {
                text: "(225) 555-0118",
                img: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f7a000a6a125d9417cfea7ec683a78dcc053e5b3d96c137a4eeb474fee0f5c2?apiKey=7580612134c3412b9f32a9330debcde8&",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="tw-flex tw-flex-col tw-justify-center tw-py-2"
              >
                <div className="tw-flex tw-items-center tw-gap-2">
                  <img
                    loading="lazy"
                    src={item.img}
                    className="tw-shrink-0 tw-w-6 tw-aspect-square"
                  />
                  <div>{item.text}</div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
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
          <div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[50%_50%] tw-gap-5 tw-px-10 tw-py-4 tw-w-full max-md:tw-flex-wrap max-md:tw-px-5 max-md:tw-max-w-full">
              <div className="tw-flex tw-gap-5 tw-text-base tw-leading-5 tw-text-zinc-500 tw-w-full max-md:tw-flex-wrap">
                <img
                  loading="lazy"
                  srcSet="/assets/img/car-prices-logo.png"
                  className="tw-shrink-0 tw-my-auto tw-max-w-full tw-aspect-[6.25] tw-w-[179px]"
                />
                <div
                  className="tw-flex tw-flex-col tw-grow tw-shrink tw-justify-center tw-w-full max-md:tw-max-w-full"
                  ref={searchRef}
                >
                  <form>
                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-white tw-border tw-border-solid tw-border-neutral-200 tw-rounded-full tw-w-full max-md:tw-max-w-full">
                      <div
                        className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-px-4 tw-py-1 max-md:tw-flex-wrap tw-w-full"
                        ref={searchRef}
                      >
                        <span className="material-symbols-outlined">
                          search
                        </span>
                        <input
                          type="search"
                          className="tw-bg-transparent tw-border-none tw-text-gray-900 tw-text-sm tw-rounded-full tw-w-full tw-p-2.5 tw-focus:tw-outline-none tw-focus:tw-ring-0"
                          value={query}
                          onChange={handleInputChange}
                          placeholder={t.searchForBrandandCars}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="tw-relative tw-w-full ">
                      {showDropdown && searchResults.length > 0 && (
                        <div className="tw-absolute tw-mt-1 tw-w-full tw-p-2 tw-bg-white tw-shadow-lg tw-rounded-b-lg tw-max-h-56 tw-overflow-auto tw-z-50">
                          {searchResults.map((item, index) => (
                            <button
                              key={index}
                              type="button"
                              className="tw-w-full tw-text-left tw-p-2 tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-bg-gray-200 tw-bg-white"
                              onClick={() => handleItemClick(item)}
                            >
                              {formatLabel(item)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className="tw-flex tw-justify-end tw-gap-5 max-md:tw-flex-wrap tw-mr-4">
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
                  src="/search.svg"
                  className="tw-shrink-0 tw-w-5 tw-aspect-square"
                  onClick={toggleSearch}
                />
                <IconButton onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </div>
            </div>

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
              <div
                className="tw-w-64 tw-px-5 tw-py-4"
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
              >
                <div className="tw-flex tw-justify-between tw-items-center">
                  <img
                    loading="lazy"
                    src="/assets/img/car-prices-logo.png"
                    className="tw-w-[150px] tw-object-contain"
                  />
                  <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <ListItem button component="a" href="/search-cars">
                    <ListItemText primary="Search New Cars" />
                  </ListItem>
                  <ListItem button component="a" href="/compare-cars">
                    <ListItemText primary="Compare New Cars" />
                  </ListItem>
                  <ListItem button component="a" href="/loan-calculator">
                    <ListItemText primary="Car Loan Calculator" />
                  </ListItem>
                  <ListItem button component="a" href="/news">
                    <ListItemText primary="News" />
                  </ListItem>
                  <ListItem button component="a" href="/review">
                    <ListItemText primary="Reviews" />
                  </ListItem>
                </List>
              </div>
            </Drawer>

            <Dialog open={isSearchOpen} onClose={toggleSearch} fullScreen>
              <DialogTitle>
                Search
                <IconButton
                  aria-label="close"
                  onClick={toggleSearch}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <div className="tw-flex tw-items-center tw-bg-gray-200 tw-rounded-full tw-px-4 tw-py-2">
                  <span className="material-symbols-outlined">search</span>
                  <input
                    type="search"
                    className="tw-bg-transparent tw-border-none tw-text-gray-900 tw-text-sm tw-rounded-full tw-w-full tw-p-2.5 tw-focus:tw-outline-none tw-focus:tw-ring-0"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={t.searchForBrandandCars}
                    autoComplete="off"
                  />
                </div>
                <div className="tw-w-full tw-px-5 tw-mt-4">
                  {showDropdown && searchResults.length > 0 && (
                    <div className="tw-w-full tw-bg-white tw-shadow-lg tw-rounded-lg tw-max-h-56 tw-overflow-auto tw-z-50">
                      {searchResults.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          className="tw-w-full tw-text-left tw-p-2 tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-bg-gray-200 tw-bg-white"
                          onClick={() => handleItemClick(item)}
                        >
                          {formatLabel(item)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
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
              src="/search.svg"
              className="tw-shrink-0 tw-w-5 tw-aspect-square"
            />

            <div onClick={toggleNavigation}>
              <img
                loading="lazy"
                src="/menu.svg"
                className="tw-shrink-0 tw-self-start tw-w-6 tw-aspect-[1.27]"
              />
            </div>
          </div>

          <div
            className={`tw-fixed tw-top-0 tw-left-0 tw-z-10 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-50 tw-transition-opacity tw-duration-300 ${
              isOpen ? "tw-opacity-100" : "tw-opacity-0 tw-pointer-events-none"
            }`}
            onClick={toggleNavigation}
          ></div>
        </div>

        <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full tw-container">
          <div className="tw-row-span-1 md:tw-col-span-3 tw-col-span-12 tw-flex tw-flex-col tw-justify-center tw-rounded-2xl tw-border tw-border-neutral-100 tw-overflow-hidden">
            <FilterLayout />
          </div>

          <div className="tw-row-span-1 md:tw-col-span-7 tw-col-span-12 tw-flex tw-flex-col md:tw-justify-start tw-text-white tw-rounded-2xl tw-leading-[100%] tw-relative tw-overflow-hidden md:tw-h-full tw-h-[536px]">
            <img
              loading="lazy"
              src="/Al-Ghandi-Auto-Chevrolet.jpg"
              className="md:tw-block tw-hidden tw-object-cover tw-absolute tw-inset-0 tw-w-full md:tw-h-[457px] tw-h-[536px] tw-rounded-2xl"
            />

            <img
              loading="lazy"
              src="/Al-Ghandi-Auto-Chevrolet-Mob.jpg"
              className="md:tw-hidden tw-block tw-object-cover tw-absolute tw-inset-0 tw-w-full md:tw-h-[457px] tw-h-[536px] tw-rounded-2xl"
            />

            {/* Overlay */}
            <div className="tw-relative tw-flex tw-flex-col md:tw-px-8 tw-px-3 md:tw-pt-8 tw-pt-3 md:tw-pb-0 tw-w-full md:tw-h-[457px] tw-h-[536px]">
              <h1 className="text-white md:tw-leading-10 tw-leading-6 tw-font-bold banner-header">
                World’s First Truly Interactive{" "}
                <br className="md:tw-block tw-hidden" />
                New Car Finder Platform
              </h1>
              <p className="md:tw-mt-2 tw-mt-2 md:tw-w-[90%]">
                Navigate the world of new car buying research with a fresh
                perspective and our interactive car finder. Explore all the
                latest 2024/25 new car models in the UAE. We have listed over
                <span className="tw-font-bold">
                  {" "}
                  74 car brands, 603 unique car models and 1,776 individual
                  vehicle trims
                </span>{" "}
                for you to choose from.
              </p>
              <img
                loading="lazy"
                src="/Logo-Al-Ghandi-Auto.png"
                className="tw-absolute tw-object-contain tw-bottom-0 tw-left-6 tw-w-[120px] tw-h-[55px] tw-mb-4 tw-ml-4"
              />
              <img
                loading="lazy"
                src="/Chevrolet-Logo.png"
                className="tw-absolute tw-bottom-0 tw-object-contain tw-right-6 tw-w-[110px] tw-h-[50px] tw-mb-4 tw-mr-4"
              />
            </div>

            <div className="md:tw-block tw-hidden">
              <Ad728x90 dataAdSlot="4367254600" />
            </div>

            {/* Logos at the bottom left and right */}
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
                  <div key={index} className="tw-px-2">
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

        <div className="tw-container tw-mx-auto tw-px-4 md:tw-py-8">
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
                  CarPrices.ae brings car buyers and enthusiasts automotive news
                  coverage with high-res images and video from car shows and
                  reveals around the world.
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
                      <div className="tw-m-2 tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-mt-96 tw-rounded-xl tw-border tw-border-solid tw-backdrop-blur-[4px] tw-bg-zinc-500 tw-bg-opacity-10 tw-border-white tw-border-opacity-10 max-md:tw-mt-10 tw-text-white">
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
            <div className="tw-flex tw-flex-col tw-rounded-2xl tw-shadow-lg tw-bg-stone-900 tw-relative max-md:tw-mt-6 md:tw-h-[350px] tw-h-[200px]">
              <img
                src="/emi.jpg"
                alt=""
                className="tw-absolute tw-inset-0 tw-object-cover tw-w-full md:tw-h-[350px] tw-h-[200px] tw-rounded-2xl"
              />
              <div className="md:hidden block tw-rounded-2xl tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>

              <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                <div>
                  <h2 className="tw-text-white">Calculate Your Car Loan EMI</h2>
                  <p className="md:tw-mt-6 tw-leading-6 md:tw-w-[50%] w-full">
                    Fill in the details and find out what the installment will
                    be for your new car. Our car loan calculator is interactive
                    and accurate.
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
              <div className="md:hidden block tw-rounded-2xl tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>
              <div className="tw-relative tw-z-10 tw-m-2 tw-bottom-0 tw-left-0 tw-right-0 md:tw-p-5 tw-p-3 tw-text-white">
                <div>
                  <h2 className="tw-text-white">
                    Find out the value of your current car
                  </h2>
                  <p className="md:tw-mt-6 tw-leading-6 md:tw-w-[50%] w-full">
                    Our car valuation calculator helps you find out what you can
                    expect for your current car. Fill in the details and get an
                    estimated current value for your used car.
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
                    <h4
                      className=" tw-text-black tw-font-semibold"
                      line-clamp-2
                    >
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
                    with a EMI calculator. This way, you can effortlessly find a
                    car that suits your lifestyle, needs, and budget.
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-mt-6 tw-text-neutral-900">
                  <div className="tw-text-base tw-leading-6 tw-font-semibold">
                    Comprehensive Database
                  </div>
                  <div className="tw-mt-1 tw-text-sm tw-leading-5">
                    Our extensive database of new and used cars provides access
                    to a wide range of vehicles from trusted new car dealerships
                    across the UAE. Whether you're looking for a luxury sedan, a
                    rugged SUV, or a fuel-efficient hatchback, we've got you
                    covered.
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

        <div className="tw-my-10">
          <div className="hidemobile">
            <Ad970x250 dataAdSlot="6082880703" />
          </div>
          <div className="hidedesktop">
            <Ad300x250 dataAdSlot="9351332409" />
          </div>
        </div>

        <div className="tw-flex tw-justify-center tw-items-center tw-px-16 tw-py-16 tw-bg-neutral-900 max-md:tw-px-5 tw-w-full ">
          <div className="tw-flex tw-flex-col tw-w-full tw-container">
            <div className="tw-flex tw-flex-col max-md:tw-max-w-full">
              {/* <div className="tw-flex tw-gap-5 tw-justify-between tw-py-8 tw-w-full tw-rounded-2xl max-md:tw-flex-wrap max-md:tw-max-w-full">
                <div className="tw-flex tw-flex-col tw-text-gray-50 max-md:tw-max-w-full">
                  <div className="tw-text-3xl tw-tracking-tight tw-leading-8 max-md:tw-max-w-full">
                    Do you need updates?
                  </div>
                  <div className="tw-mt-2.5 tw-text-sm tw-leading-5 max-md:tw-max-w-full">
                    We will provide updates, shopping tips and more.
                  </div>
                </div>
                <div className="tw-flex tw-gap-5 tw-justify-between tw-items-center tw-my-auto tw-text-xl tw-leading-7 tw-text-white">
                  <Link href="/contact-us" className="text-white">
                    Get consultation
                  </Link>
                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </div>
              </div> */}
              <div className="tw-flex tw-gap-5 tw-justify-between tw-mt-12 tw-w-full max-md:tw-flex-wrap md:tw-mt-10 tw-mt-0 max-md:tw-max-w-full">
                <div className="max-md:tw-max-w-full">
                  <div className="tw-flex tw-gap-5 max-md:tw-flex-col max-md:tw-gap-0">
                    <div className="tw-flex tw-flex-col tw-w-[29%] max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-grow tw-text-sm tw-leading-5 tw-text-white">
                        <h4 className=" tw-text-white tw-tracking-wide tw-uppercase tw-font-semibold">
                          Top 10s
                        </h4>
                        <div className="tw-flex tw-flex-col tw-mt-6 tw-space-y-2">
                          <Link
                            href="https://carprices.ae/news/10-popular-cars-in-uae-with-high-ground-clearance-sorted-by-price-low-to-high-best-cars-in-uae"
                            className="text-white"
                          >
                            10 Cars with High Ground Clearance
                          </Link>
                          <Link
                            href="https://carprices.ae/news/2023-s-top-10-cars-that-buyers-searched-for-on-carprices-ae"
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
                          <Link
                            href="https://carprices.ae/news/the-2024-toyota-land-cruiser-prado-vs-the-gwm-tank-500"
                            className="text-white"
                          >
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
                          <Link
                            href="https://carprices.ae/news/internal-combustion-engine-car-vs-hybrid-car-which-will-be-worth-buying-in-the-uae"
                            className="text-white"
                          >
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
                          <Link href="/about" className="text-white">
                            About us
                          </Link>
                          <Link
                            href="/contact-us"
                            className="tw-mt-1 tw-text-white"
                          >
                            Contact Us
                          </Link>
                          <Link
                            href="/privacy"
                            className="tw-mt-1 tw-text-white"
                          >
                            Privacy Policy
                          </Link>
                          {/* <Link
                            href="/terms-and-conditions"
                            className="tw-mt-1 tw-text-white"
                          >
                            Terms and Conditions
                          </Link>
                          <Link
                            href="/code-of-conduct"
                            className="tw-mt-1 tw-text-white"
                          >
                            Code of Conduct
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-justify-center tw-self-start">
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-shrink-0 md:tw-self-end tw-h-px tw-bg-white tw-w-[45px]" />
                    <div className="tw-flex tw-flex-col tw-mt-6">
                      <div className="tw-flex tw-flex-col md:tw-self-end tw-text-sm tw-leading-5 tw-text-white">
                        {/* <div>+971 50 649 4665</div> */}
                        <div className="tw-mt-1 md:tw-text-right tw-text-white">
                          <Link
                            href="mailto:info@carprices.ae"
                            className="text-white"
                          >
                            info@carprices.ae
                          </Link>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-mt-2">
                        <Link href="https://youtube.com/@carpricesuae?feature=shared">
                          <i className="bx bxl-youtube tw-text-white" />
                        </Link>
                        <Link href="https://www.facebook.com/carprices.ae/">
                          <i className="bx bxl-facebook tw-text-white" />
                        </Link>
                        <Link href="https://x.com/CarPricesAe?t=_IgNE0J6jf5r1ZiiKrkaYw&s=09">
                          <i className="bx bxl-twitter tw-text-white" />
                        </Link>
                        <Link href="https://www.linkedin.com/company/car-prices-ae/">
                          <i className="bx bxl-linkedin tw-text-white" />
                        </Link>
                        <Link href="https://www.instagram.com/carprices.ae?igsh=bnE4cnpudjFwMHg1">
                          <i className="bx bxl-instagram-alt tw-text-white" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-gap-5 tw-justify-between tw-mt-14 tw-text-sm tw-leading-5 tw-text-white max-md:tw-flex-wrap max-md:tw-mt-10 max-md:tw-max-w-full">
              <div className="tw-my-auto">
                ©2017 - {currentYear} CarPrices.ae. All rights reserved.
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
