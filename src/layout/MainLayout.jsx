import React, { useState, useRef, useEffect } from "react";
import Header from "../components-old/Home1/Header";
import Footer1 from "../components-old/Footer/Footer1";
import Topbar from "../components-old/Home1/Topbar";
import Modals from "../components-old/Home1/Modals";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { createApolloClient } from "@/src/lib/apolloClient";
import useTranslate from "../utils/useTranslate";
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
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";
import axios from "axios";
import Ad970x250 from "../components-old/ads/Ad970x250";
import Ad300x250 from "../components-old/ads/Ad300x250";
import Image from "next/image";

function MainLayout({ children, pageMeta }) {
  const router = useRouter();

  const meta = {
    title:
      "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - Carprices.ae",
    description:
      "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
    type: "Car Review Website",
    ...pageMeta,
  };

  const isSearchCarsPage = router.asPath.startsWith("/search-cars");

  const canonicalUrl = isSearchCarsPage
    ? "https://carprices.ae/search-cars"
    : "https://carprices.ae" + router.asPath.split("?")[0];

  const currentYear = new Date().getFullYear();

  const t = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { href: "/search-cars", label: "Search New Cars" },
    { href: "/compare-cars", label: "Compare New Cars" },
    { href: "/loan-calculator", label: "Car Loan Calculator" },
    { href: "/news", label: "News" },
    { href: "/reviews", label: "Reviews" },
  ];

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    // if (searchTerm.trim().length === 0) {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_URL}recent-searches`
    //     );

    //     setSearchResults(response.data.data);
    //     setShowDropdown(true);
    //   } catch (error) {
    //     console.error("Error fetching recent searches:", error);
    //     setSearchResults([]);
    //     setShowDropdown(false);
    //   }
    //   return;
    // }

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
    event.preventDefault();
    const value = event.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleItemClick = async (item) => {
    // try {
    //   await axios.post(`${process.env.NEXT_PUBLIC_API_URL}recent-searches`, {
    //     type: item.type,
    //     id: item.id,
    //     name: item.name,
    //     slug: item.slug,
    //     brand: item.brand,
    //     brandSlug: item.brandSlug,
    //     year: item.year,
    //   });
    // } catch (error) {
    //   console.error("Error updating recent searches:", error);
    // }

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

  const carItems = [
    {
      imgSrc: "/SUVs-that-offer-affordable-luxury-min.png",
      title: "SUVs that offer affordable luxury and good fuel economy",
      link: "/find-your-car?haveTechnology=1&isFuelEfficient=1&isAffordableLuxury=1&isFiveSeat=1&price=124900-341900&bodytype=midsize-suv",
    },
    {
      imgSrc:
        "/SUVs-that-offer-performance-and-off-road-capabilities-Cars-For-Sale-In-UAE-min.png",
      title: "SUVs that offer performance and off-road capabilities",
      link: "/find-your-car?havePerformance=1&isOffRoad=1&isSafety=1&isFourSeat=1&isFiveSeat=1&isSevenSeat=1&isEightSeat=1&price=169900-1554000&bodytype=midsize-suv%2Csuv",
    },
    {
      imgSrc: "/Electric-Cars-For-Sale-In-UAE-min.png",
      title: "Electric cars currently for sale in the UAE",
      link: "/find-your-car?isElectric=1&isFourSeat=1&isFiveSeat=1&isSevenSeat=1&price=76999-1785670&bodytype=coupe%2Csuv%2Chatchback%2Cmidsize-suv%2Csedan",
    },
    {
      imgSrc: "/Performance-Cars-That-You-Can-Drive-Daily-min.png",
      title: "Performance cars you can drive daily",
      link: "/find-your-car?havePerformance=1&isTwoSeat=1&isTwoPlusTwo=1&isFourSeat=1&isFiveSeat=1&price=139990-782605&bodytype=convertible%2Ccoupe%2Csedan",
    },
  ];

  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add("active");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove("active");
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const [searchClicked, setSearchClcked] = useState();

  return (
    <>
      <Head>
        {" "}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      {/* <Topbar />
      <Header /> */}
      <div
        className={`tw-fixed tw-top-0 tw-left-0 tw-z-[9999] tw-w-3/4 tw-max-w-[480px] tw-h-full tw-bg-white tw-shadow-lg tw-transform tw-transition-transform tw-duration-300 ${
          isOpen ? "tw-translate-x-0" : "-tw-translate-x-full"
        }`}
      >
        <div className="tw-flex tw-flex-col tw-pb-20 tw-mx-auto tw-w-full tw-max-w-[480px]">
          <div className="tw-flex tw-flex-col tw-px-4 tw-pt-2 tw-w-full">
            <div className="tw-flex tw-justify-between tw-items-start tw-gap-5 tw-pt-7 tw-w-full tw-text-base tw-tracking-wider tw-text-center tw-whitespace-nowrap tw-text-neutral-900">
              <Link
                href="/"
                className="tw-flex tw-items-center tw-gap-1.5 tw-mt-2 cursor-pointer"
              >
                <img
                  loading="lazy"
                  src="/assets/img/car-prices-logo.png"
                  className="tw-w-[150px] tw-object-contain"
                />
              </Link>
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
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-bg-white tw-w-full md:tw-block tw-hidden">
        <div>
          <div
            className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[50%_50%] tw-gap-5 tw-px-10 tw-py-4 tw-w-full max-md:tw-flex-wrap max-md:tw-px-5 max-md:tw-max-w-full"
            ref={searchRef}
          >
            <div className="tw-flex tw-gap-5 tw-text-base tw-leading-5 tw-text-zinc-500 tw-w-full max-md:tw-flex-wrap">
              <Link href="/" className="tw-flex tw-items-center">
                <img
                  loading="lazy"
                  srcSet="/assets/img/car-prices-logo.png"
                  className="tw-shrink-0 tw-my-auto tw-max-w-full tw-aspect-[6.25] tw-w-[179px]"
                />
              </Link>
              <div className="tw-flex tw-flex-col tw-grow tw-shrink tw-justify-center tw-w-full max-md:tw-max-w-full">
                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-white tw-border tw-border-solid tw-border-neutral-200 tw-rounded-full tw-w-full max-md:tw-max-w-full">
                  <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-px-4 tw-py-1 max-md:tw-flex-wrap tw-w-full">
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
                </div>

                <div className="tw-relative tw-w-full ">
                  {showDropdown && searchResults.length > 0 && (
                    <div className="tw-px-4 tw-py-6 tw-bg-white tw-rounded-xl tw-shadow-lg tw-absolute tw-z-50">
                      <div className="tw-flex tw-gap-5 tw-max-md:tw-flex-col tw-max-md:tw-gap-0">
                        <div className="tw-flex tw-flex-col tw-w-[22%] tw-max-md:tw-ml-0 tw-max-md:tw-w-full">
                          <div className="tw-flex tw-flex-col tw-max-md:tw-mt-10">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-6 tw-text-slate-800 tw-h-[325px] tw-w-[189px] tw-overflow-y-auto">
                              <div className="tw-justify-center tw-leading-[129%] tw-text-neutral-400">
                                Search Result
                              </div>
                              {searchResults.map((item, index) => (
                                <div className="tw-flex tw-justify-between tw-py-0 tw-px-0">
                                  <div className="tw-flex  tw-w-full">
                                    {/* <img
                                          loading="lazy"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b52b3f9b35f46f045a8a46c03f5d7e95a4c4e0f5f00d2a8939e31eb00504355?apiKey=7580612134c3412b9f32a9330debcde8&"
                                          className="tw-shrink-0 tw-w-6 tw-aspect-square"
                                        /> */}
                                    <button
                                      key={index}
                                      type="button"
                                      className="tw-w-full tw-text-left tw-py-1 tw-px-1 tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-bg-gray-200 tw-rounded-2xl tw-bg-white"
                                      onClick={() => handleItemClick(item)}
                                    >
                                      {formatLabel(item)}
                                    </button>
                                  </div>
                                  {/* <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/74b321bbdc5e630832324473665e26cc5cec64ae70f6bc6ac7059a2fb8b56dbe?apiKey=7580612134c3412b9f32a9330debcde8&"
                                        className="tw-shrink-0 tw-w-6 tw-aspect-square"
                                      /> */}
                                </div>
                              ))}
                            </div>
                            {/* <div className="tw-flex tw-flex-col tw-py-0.5 tw-mt-4 tw-text-xs tw-leading-4 tw-text-gray-600">
                                  <div className="tw-justify-center tw-text-sm tw-leading-5 tw-text-neutral-400">
                                    Popular Searches
                                  </div>
                                  <div className="tw-flex tw-gap-3 tw-pr-12 tw-mt-3 tw-max-md:tw-pr-5">
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Best Car
                                    </div>
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      News Cars
                                    </div>
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-whitespace-nowrap tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Trending
                                    </div>
                                  </div>
                                  <div className="tw-flex tw-gap-3 tw-mt-3 tw-whitespace-nowrap">
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Affordable
                                    </div>
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Luxury
                                    </div>
                                  </div>
                                </div> */}
                          </div>
                        </div>
                        <div className="tw-flex tw-flex-col tw-max-md:tw-ml-0 tw-max-md:tw-w-full">
                          <div className="tw-flex tw-flex-col tw-max-md:tw-mt-10 md:tw-w-[600px] tw-w-[390px]">
                            <div className="tw-justify-center tw-py-0.5 tw-text-sm tw-leading-5 tw-text-neutral-400 tw-max-md:tw-max-w-full">
                              Quick access
                            </div>

                            <div
                              ref={scrollRef}
                              className="scroll-container tw-pb-2 tw-mt-2 tw-max-md:tw-max-w-full tw-flex tw-overflow-x-auto tw-gap-3 no-scroll"
                              onMouseDown={handleMouseDown}
                              onMouseLeave={handleMouseLeave}
                              onMouseUp={handleMouseUp}
                              onMouseMove={handleMouseMove}
                            >
                              {carItems.map((item, index) => (
                                <Link
                                  href={item.link}
                                  key={index}
                                  className="tw-flex tw-flex-col tw-rounded-2xl tw-w-[250px] tw-gap-3 tw-max-md:tw-ml-0 tw-max-md:tw-w-full"
                                >
                                  <div className="tw-flex tw-flex-col tw-w-[250px]  tw-grow tw-justify-center tw-rounded-2xl tw-self-stretch tw-text-white tw-rounded-xl tw-max-md:tw-mt-4">
                                    <div className="tw-flex tw-overflow-hidden tw-relative tw-flex-col tw-rounded-2xl tw-justify-end tw-px-1 tw-pt-20 tw-pb-1 tw-w-full tw-aspect-[0.84]">
                                      <img
                                        loading="lazy"
                                        srcSet={`${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&`}
                                        className="tw-object-cover tw-absolute tw-inset-0 tw-size-full"
                                        alt={item.title}
                                      />
                                      <div className="tw-flex tw-relative tw-flex-col tw-justify-center tw-items-start tw-px-4 tw-py-3 tw-mt-44 tw-rounded-xl tw-border tw-border-solid tw-backdrop-blur-[32px] tw-bg-zinc-500 tw-bg-opacity-10 tw-border-white tw-border-opacity-10 tw-max-md:tw-pr-5 tw-max-md:tw-mt-10">
                                        <div className="tw-text-sm tw-leading-5">
                                          {item.title}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                  href="/reviews"
                  className="tw-justify-center tw-font-semibold"
                >
                  Reviews
                </Link>
              </div>
            </div>
          </div>
          <div className="tw-gap-5 tw-justify-between tw-px-5 tw-py-4 tw-bg-white tw-w-full md:tw-hidden tw-flex">
            <div className="tw-flex tw-gap-2 tw-text-xl tw-tracking-wider tw-text-center tw-whitespace-nowrap tw-text-neutral-900">
              <Link href="/">
                {" "}
                <img
                  loading="lazy"
                  src="/assets/img/car-prices-logo.png"
                  className="tw-w-[150px] tw-object-contain"
                />
              </Link>
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
                <Link href="/">
                  <img
                    loading="lazy"
                    src="/assets/img/car-prices-logo.png"
                    className="tw-w-[150px] tw-object-contain"
                  />
                </Link>
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
      <div className="tw-gap-5 tw-justify-between tw-bg-white tw-w-full md:tw-hidden tw-flex">
        {searchClicked ? (
          <div className="tw-flex tw-flex-col tw-grow tw-shrink tw-justify-center tw-w-full max-md:tw-max-w-full">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-white tw-border tw-border-solid tw-border-neutral-200 tw-rounded-full tw-w-full max-md:tw-max-w-full">
              <div className="tw-flex  tw-items-center tw-gap-2 tw-px-4 tw-py-1 tw-w-full">
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
            </div>
            <div className="tw-relative tw-w-full ">
              {showDropdown && searchResults.length > 0 && (
                // <div className="tw-absolute tw-mt-1 tw-w-full tw-p-2 tw-bg-white tw-shadow-lg tw-rounded-b-lg tw-max-h-56 tw-overflow-auto tw-z-50">
                //   {searchResults.map((item, index) => (
                //     <button
                //       key={index}
                //       type="button"
                //       className="tw-w-full tw-text-left tw-p-2 tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-bg-gray-200 tw-bg-white"
                //       onClick={() => handleItemClick(item)}
                //     >
                //       {formatLabel(item)}
                //     </button>
                //   ))}
                // </div>
                <div className="tw-px-4 tw-py-6 tw-bg-white tw-rounded-xl tw-shadow-lg tw-absolute tw-z-50">
                  <div className="tw-flex tw-gap-5 tw-flex-col">
                    <div className="tw-flex tw-flex-col tw-w-[100%] tw-max-md:tw-ml-0 tw-max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-max-md:tw-mt-10">
                        <div className="tw-flex tw-flex-col tw-text-sm tw-leading-6 tw-text-slate-800 tw-h-[325px] tw-w-full tw-overflow-y-auto">
                          <div className="tw-justify-center tw-leading-[129%] tw-text-neutral-400">
                            Search Result
                          </div>
                          {searchResults.map((item, index) => (
                            <div className="tw-flex tw-justify-between tw-py-0 tw-px-0">
                              <div className="tw-flex  tw-w-full">
                                {/* <img
                                          loading="lazy"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b52b3f9b35f46f045a8a46c03f5d7e95a4c4e0f5f00d2a8939e31eb00504355?apiKey=7580612134c3412b9f32a9330debcde8&"
                                          className="tw-shrink-0 tw-w-6 tw-aspect-square"
                                        /> */}
                                <button
                                  key={index}
                                  type="button"
                                  className="tw-w-full tw-text-left tw-py-1 tw-px-1 tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-bg-gray-200 tw-rounded-2xl tw-bg-white"
                                  onClick={() => handleItemClick(item)}
                                >
                                  {formatLabel(item)}
                                </button>
                              </div>
                              {/* <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/74b321bbdc5e630832324473665e26cc5cec64ae70f6bc6ac7059a2fb8b56dbe?apiKey=7580612134c3412b9f32a9330debcde8&"
                                        className="tw-shrink-0 tw-w-6 tw-aspect-square"
                                      /> */}
                            </div>
                          ))}
                        </div>
                        {/* <div className="tw-flex tw-flex-col tw-py-0.5 tw-mt-4 tw-text-xs tw-leading-4 tw-text-gray-600">
                                  <div className="tw-justify-center tw-text-sm tw-leading-5 tw-text-neutral-400">
                                    Popular Searches
                                  </div>
                                  <div className="tw-flex tw-gap-3 tw-pr-12 tw-mt-3 tw-max-md:tw-pr-5">
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Best Car
                                    </div>
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      News Cars
                                    </div>
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-whitespace-nowrap tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Trending
                                    </div>
                                  </div>
                                  <div className="tw-flex tw-gap-3 tw-mt-3 tw-whitespace-nowrap">
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Affordable
                                    </div>
                                    <div className="tw-justify-center tw-px-4 tw-pt-2 tw-pb-2.5 tw-border tw-border-solid tw-bg-zinc-100 tw-border-zinc-300 tw-rounded-[100px]">
                                      Luxury
                                    </div>
                                  </div>
                                </div> */}
                      </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-max-md:tw-ml-0 tw-max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-max-md:tw-mt-10 md:tw-w-[600px] tw-w-[390px]">
                        <div className="tw-justify-center tw-py-0.5 tw-text-sm tw-leading-5 tw-text-neutral-400 tw-max-md:tw-max-w-full">
                          Quick access
                        </div>

                        <div
                          ref={scrollRef}
                          className="scroll-container tw-pb-2 tw-mt-2 tw-max-md:tw-max-w-full tw-flex tw-overflow-x-auto tw-gap-3 no-scroll"
                          onMouseDown={handleMouseDown}
                          onMouseLeave={handleMouseLeave}
                          onMouseUp={handleMouseUp}
                          onMouseMove={handleMouseMove}
                        >
                          {carItems.map((item, index) => (
                            <Link
                              href={item.link}
                              key={index}
                              className="tw-flex tw-flex-col tw-rounded-2xl tw-w-[250px] tw-gap-3 tw-max-md:tw-ml-0 tw-max-md:tw-w-full"
                            >
                              <div className="tw-flex tw-flex-col tw-w-[250px]  tw-grow tw-justify-center tw-rounded-2xl tw-self-stretch tw-text-white tw-rounded-xl tw-max-md:tw-mt-4">
                                <div className="tw-flex tw-overflow-hidden tw-relative tw-flex-col tw-rounded-2xl tw-justify-end tw-px-1 tw-pt-20 tw-pb-1 tw-w-full tw-aspect-[0.84]">
                                  <img
                                    loading="lazy"
                                    srcSet={`${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&`}
                                    className="tw-object-cover tw-absolute tw-inset-0 tw-size-full"
                                    alt={item.title}
                                  />
                                  <div className="tw-flex tw-relative tw-flex-col tw-justify-center tw-items-start tw-px-4 tw-py-3 tw-mt-44 tw-rounded-xl tw-border tw-border-solid tw-backdrop-blur-[32px] tw-bg-zinc-500 tw-bg-opacity-10 tw-border-white tw-border-opacity-10 tw-max-md:tw-pr-5 tw-max-md:tw-mt-10">
                                    <div className="tw-text-sm tw-leading-5">
                                      {item.title}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="tw-gap-5 tw-justify-between tw-px-5 tw-py-4 tw-bg-white tw-w-full md:tw-hidden tw-flex">
            <div className="tw-flex tw-gap-2 tw-text-xl tw-tracking-wider tw-text-center tw-whitespace-nowrap tw-text-neutral-900">
              <Link href="/">
                <img
                  loading="lazy"
                  src="/assets/img/car-prices-logo.png"
                  className="tw-w-[150px] tw-object-contain"
                />
              </Link>
              <div className="tw-my-auto"></div>
            </div>
            <div className="tw-flex tw-gap-4 tw-justify-center tw-my-auto">
              <img
                loading="lazy"
                src="/search.svg"
                className="tw-shrink-0 tw-w-5 tw-aspect-square"
                onClick={() => setSearchClcked(true)}
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
                isOpen
                  ? "tw-opacity-100"
                  : "tw-opacity-0 tw-pointer-events-none"
              }`}
              onClick={toggleNavigation}
            ></div>
          </div>
        )}
      </div>
      {/* <Breadcrumb /> */}
      <main> {children}</main>
      {/* <Footer1 /> */}

      <footer>
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
                    <div className="tw-flex tw-flex-col tw-ml-5 tw-w-1/5 max-md:tw-ml-0 max-md:tw-w-full">
                      <div className="tw-flex tw-flex-col tw-text-sm tw-leading-5 tw-text-white max-md:tw-mt-10">
                        <h4 className=" tw-text-white tw-tracking-wide tw-uppercase tw-font-semibold">
                          Media
                        </h4>
                        <div className="tw-flex tw-flex-col tw-mt-6">
                          <Link href="/press-releases" className="text-white">
                           Press Releases
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
                      <div className="tw-mt-4">
                        <Image src="/assets/sponsored/Razrcorp-White-Logo.png" alt="" width={100} height={100}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-gap-5 tw-justify-between tw-mt-14 tw-text-sm tw-leading-5 tw-text-white max-md:tw-flex-wrap max-md:tw-mt-10 max-md:tw-max-w-full">
              <div className="tw-my-auto">
                *CarPrices.ae does not guarantee the accuracy of any brand,
                vehicle or specification information shown on our website.
                Models and specifications and vehicle availability are subject
                to change without prior notice. Users are advised to contact the
                authorised dealer/distributor for more up to date information on
                the vehicles and their specifications and availability.
              </div>
            </div>
            <div className="tw-flex tw-gap-5 tw-justify-between tw-mt-14 tw-text-sm tw-leading-5 tw-text-white max-md:tw-flex-wrap max-md:tw-mt-10 max-md:tw-max-w-full">
              <div className="tw-my-auto">
                ©2017 - {currentYear} CarPrices.ae. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MainLayout;
