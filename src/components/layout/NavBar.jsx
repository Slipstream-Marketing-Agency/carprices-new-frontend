"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useTranslate from "@/utils/UseTranslate";
import SearchIcon from '@mui/icons-material/Search';
import HoveredSearchNewCar from "./NavbarComponents/HoveredSearchNewCar";
import HoveredCompareCars from "./NavbarComponents/HoveredCompareCars";
import HoveredServices from "./NavbarComponents/HoveredServices";
import HoveredBlog from "./NavbarComponents/HoveredBlog";
import HoveredMore from "./NavbarComponents/HoveredMore";
import MobileSidebar from "./NavbarComponents/MobileSidebar";
import { createApolloClient } from "@/lib/apolloClient";
import PrimaryButton from "../buttons/PrimaryButton";
import LoginModal from "../login-modal/LoginModal";
import { getCookie } from "@/lib/helper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HoveredProfile from "./NavbarComponents/HoveredProfile";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "@/store/slices/authSlice";
import Search from "../common/Search";


export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();
    const isSearchCarsPage = pathname?.startsWith("/search-cars");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyUser());
    }, [dispatch]);

    // const setMyUserInfo = () => {
    //     setLoggedInJwt(getCookie('jwt'))
    //     setLoggedInUser(JSON.parse(getCookie('user')))
    // }

    const currentYear = new Date().getFullYear();

    const t = useTranslate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavigation = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        { href: "/search-cars", label: "Search New Cars", hoverItem: "search-cars" },
        { href: "/compare-cars", label: "Compare New Cars"},
        // { href: "/compare-cars", label: "Compare New Cars", hoverItem: "compare-cars" },
        { href: "#", onClick: (e) => e.preventDefault(), label: "Services", hoverItem: "services" },
        { href: "#", onClick: (e) => e.preventDefault(), label: "News, Reviews & Videos", hoverItem: "blog" },
        { href: "#", onClick: (e) => e.preventDefault(), label: "More", hoverItem: "more" },
    ];
    // const links = [
    //   { href: "/search-cars", label: "Search New Cars" },
    //   { href: "/compare-cars", label: "Compare New Cars" },
    //   // { href: "/insurance-calculator", label: "Insurance Calculator" },
    //   { href: "/loan-calculator", label: "Car Loan Calculator" },
    //   { href: "/news", label: "News" },
    //   { href: "/reviews", label: "Reviews" },
    // ];

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
                `${process.env.NEXT_PUBLIC_API_URL
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

    const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
    const [brands, setBrands] = useState([])
    const [bodyTypes, setBodyTypes] = useState([])

    useEffect(() => {
        let isMounted = true;  // To prevent setting state on unmounted component

        const fetchData = async () => {

            try {
                const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`)
                const homeData = data.data?.data;
                setBrands(homeData?.brand ? homeData.brand : [])
                setBodyTypes(homeData?.bodyTypes ? homeData.bodyTypes : [])
            } catch (error) {
                console.error("Server-side Data Fetching Error:", error.message);
            }
        };

        fetchData();

        // Cleanup function to prevent memory leaks if the component unmounts
        return () => {
            isMounted = false;
        };
    }, []);
    const HoveredMenuItemDropdown = () => {
        if (hoveredMenuItem === 'search-cars') {
            return <HoveredSearchNewCar brands={brands} bodyTypes={bodyTypes} />
        }
        if (hoveredMenuItem === 'compare-cars') {
            return <HoveredCompareCars />
        }
        if (hoveredMenuItem === 'services') {
            return <HoveredServices />
        }
        if (hoveredMenuItem === 'blog') {
            return <HoveredBlog />
        }
        if (hoveredMenuItem === 'more') {
            return <HoveredMore />
        }
        if (hoveredMenuItem === 'profile') {
            return <HoveredProfile setHoveredMenuItem={setHoveredMenuItem} />
        }
        return <></>
    }

    return (
        <>
            <MobileSidebar toggleNavigation={toggleNavigation} isOpen={isOpen} links={links} />
            <div className="md:flex flex-col bg-white w-full hidden border-solid border-b-[1px] border-gray-200">
                <div>
                    <div
                        className="grid grid-cols-1 md:grid-cols-[50%_50%] gap-5 px-10 py-4 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full"
                        ref={searchRef}
                    >
                        <div className="flex gap-5 text-base leading-5 text-zinc-500 w-full max-md:flex-wrap">
                            <Link href="/" className="flex items-center">
                                <Image
                                    loading="lazy"
                                    src="/assets/img/car-prices-logo.png"
                                    className="shrink-0 my-auto max-w-full aspect-[6.25] w-[179px]"
                                    alt="logo"
                                    width={179}  // Provide explicit width
                                    height={28}  // Adjust this based on your image aspect ratio
                                    layout="intrinsic"
                                />
                            </Link>
                            <div className="flex flex-col grow shrink justify-center w-full max-md:max-w-full">
                                {/* <div className="flex flex-col justify-center items-center bg-white border border-solid border-neutral-200 rounded-full w-full max-md:max-w-full">
                                    <div className="flex justify-center items-center gap-2 px-4 py-1 max-md:flex-wrap w-full">
                                        <SearchIcon />
                                        <input
                                            type="search"
                                            className="bg-transparent border-none text-gray-900 text-sm rounded-full w-full p-2.5 focus:outline-none focus:ring-0"
                                            value={query}
                                            onChange={handleInputChange}
                                            placeholder={t.searchForBrandandCars}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div> */}

                                <Search/>
                                

                                <div className="relative w-full ">
                                    {showDropdown && searchResults.length > 0 && (
                                        <div className="px-4 py-6 bg-white rounded-xl shadow-lg absolute z-50">
                                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                                <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
                                                    <div className="flex flex-col max-md:mt-10">
                                                        <div className="flex flex-col text-sm leading-6 text-slate-800 h-[325px] w-[189px] overflow-y-auto">
                                                            <div className="justify-center leading-[129%] text-neutral-400">
                                                                Search Result
                                                            </div>
                                                            {searchResults.map((item, index) => (
                                                                <div className="flex justify-between py-0 px-0" key={index}>
                                                                    <div className="flex  w-full">
                                                                        {/* <img
                                          loading="lazy"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b52b3f9b35f46f045a8a46c03f5d7e95a4c4e0f5f00d2a8939e31eb00504355?apiKey=7580612134c3412b9f32a9330debcde8&"
                                          className="shrink-0 w-6 aspect-square"
                                        /> */}
                                                                        <button
                                                                            key={index}
                                                                            type="button"
                                                                            className="w-full text-left py-1 px-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 rounded-2xl bg-white"
                                                                            onClick={() => handleItemClick(item)}
                                                                        >
                                                                            {formatLabel(item)}
                                                                        </button>
                                                                    </div>
                                                                    {/* <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/74b321bbdc5e630832324473665e26cc5cec64ae70f6bc6ac7059a2fb8b56dbe?apiKey=7580612134c3412b9f32a9330debcde8&"
                                        className="shrink-0 w-6 aspect-square"
                                      /> */}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {/* <div className="flex flex-col py-0.5 mt-4 text-xs leading-4 text-gray-600">
                                  <div className="justify-center text-sm leading-5 text-neutral-400">
                                    Popular Searches
                                  </div>
                                  <div className="flex gap-3 pr-12 mt-3 max-md:pr-5">
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Best Car
                                    </div>
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      News Cars
                                    </div>
                                    <div className="justify-center px-4 pt-2 pb-2.5 whitespace-nowrap border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Trending
                                    </div>
                                  </div>
                                  <div className="flex gap-3 mt-3 whitespace-nowrap">
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Affordable
                                    </div>
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Luxury
                                    </div>
                                  </div>
                                </div> */}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col max-md:ml-0 max-md:w-full">
                                                    <div className="flex flex-col max-md:mt-10 md:w-[600px] w-[390px]">
                                                        <div className="justify-center py-0.5 text-sm leading-5 text-neutral-400 max-md:max-w-full">
                                                            Quick access
                                                        </div>

                                                        <div
                                                            ref={scrollRef}
                                                            className="scroll-container pb-2 mt-2 max-md:max-w-full flex overflow-x-auto gap-3 no-scroll"
                                                            onMouseDown={handleMouseDown}
                                                            onMouseLeave={handleMouseLeave}
                                                            onMouseUp={handleMouseUp}
                                                            onMouseMove={handleMouseMove}
                                                        >
                                                            {carItems.map((item, index) => (
                                                                <Link
                                                                    href={item.link}
                                                                    key={index}
                                                                    className="flex flex-col rounded-2xl w-[250px] gap-3 max-md:ml-0 max-md:w-full"
                                                                >
                                                                    <div className="flex flex-col w-[250px]  grow justify-center rounded-2xl self-stretch text-white rounded-xl max-md:mt-4">
                                                                        <div className="flex overflow-hidden relative flex-col rounded-2xl justify-end px-1 pt-20 pb-1 w-full aspect-[0.84]">
                                                                            <Image
                                                                                loading="lazy"
                                                                                srcSet={`${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&`}
                                                                                className="object-cover absolute inset-0 size-full"
                                                                                alt={item.title}
                                                                            />
                                                                            <div className="flex relative flex-col justify-center items-start px-4 py-3 mt-44 rounded-xl border border-solid backdrop-blur-[32px] bg-zinc-500 bg-opacity-10 border-white border-opacity-10 max-md:pr-5 max-md:mt-10">
                                                                                <div className="text-sm leading-5">
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
                        <div className="flex relative justify-end gap-5 max-md:flex-wrap mr-4" onMouseLeave={() => { setHoveredMenuItem(null) }}>
                            <div className="flex flex-auto justify-end items-center  gap-5  my-auto text-sm font-medium leading-5 text-neutral-900 max-md:flex-wrap py-2">
                                {links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className="justify-center font-semibold"
                                        onMouseOver={() => { setHoveredMenuItem(link.hoverItem) }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {user ?
                                    <div className="shadow-md py-1 px-2 rounded-full cursor-pointer flex items-center justify-between" onMouseOver={() => { setHoveredMenuItem('profile') }}>
                                        <div className="flex items-center capitalize justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold">
                                            {user?.username.charAt(0)}
                                        </div>
                                        <KeyboardArrowDownIcon />
                                    </div>
                                    :
                                    <PrimaryButton label='Signin' additionalClass="!bg-black !border-black" onClick={() => setIsLoginModalOpen(true)} />
                                }
                            </div>
                            <HoveredMenuItemDropdown />
                        </div>
                    </div>
                    <div className="gap-5 justify-between px-5 py-4 bg-white w-full md:hidden flex">
                        <div className="flex gap-2 text-xl tracking-wider text-center whitespace-nowrap text-neutral-900">
                            <Link href="/">
                                {" "}
                                <Image
                                    loading="lazy"
                                    src="/assets/img/car-prices-logo.png"
                                    className="w-[150px] object-contain"
                                    alt={`logo`}
                                    width={150}
                                    height={50}
                                />
                            </Link>
                            <div className="my-auto"></div>
                        </div>
                        <div className="flex gap-4 justify-center my-auto">
                            <Image
                                loading="lazy"
                                src="/search.svg"
                                className="shrink-0 w-5 aspect-square"
                                onClick={toggleSearch}
                                alt={`search`}
                                width={0}
                                height={0}
                            />
                            <IconButton onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </div>

                    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                        <div
                            className="w-64 px-5 py-4"
                            role="presentation"
                            onClick={toggleDrawer}
                            onKeyDown={toggleDrawer}
                        >
                            <div className="flex justify-between items-center">
                                <Link href="/">
                                    <Image
                                        loading="lazy"
                                        src="/assets/img/car-prices-logo.png"
                                        className="w-[150px] object-contain"
                                        alt={`logo`}
                                        width={150}
                                        height={50}
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
                                <ListItem button component="a" href="/insurance-calculator">
                                    <ListItemText primary="Insurance Calculator" />
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
                            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="search"
                                    className="bg-transparent border-none text-gray-900 text-sm rounded-full w-full p-2.5 focus:outline-none focus:ring-0"
                                    value={query}
                                    onChange={handleInputChange}
                                    placeholder={t.searchForBrandandCars}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="w-full px-5 mt-4">
                                {showDropdown && searchResults.length > 0 && (
                                    <div className="w-full bg-white shadow-lg rounded-lg max-h-56 overflow-auto z-50">
                                        {searchResults.map((item, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className="w-full text-left p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 bg-white"
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
            <div className="gap-5 justify-between bg-white w-full md:hidden flex ">
                {searchClicked ? (
                    <div className="flex flex-col grow shrink justify-center w-full max-md:max-w-full">
                        <div className="flex flex-col justify-center items-center bg-white border border-solid border-neutral-200 rounded-full w-full max-md:max-w-full">
                            <div className="flex  items-center gap-2 px-4 py-1 w-full">
                                <Search/>
                            </div>
                        </div>
                        <div className="relative w-full ">
                            {showDropdown && searchResults.length > 0 && (
                                // <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-b-lg max-h-56 overflow-auto z-50">
                                //   {searchResults.map((item, index) => (
                                //     <button
                                //       key={index}
                                //       type="button"
                                //       className="w-full text-left p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 bg-white"
                                //       onClick={() => handleItemClick(item)}
                                //     >
                                //       {formatLabel(item)}
                                //     </button>
                                //   ))}
                                // </div>
                                <div className="px-4 py-6 bg-white rounded-xl shadow-lg absolute z-50">
                                    <div className="flex gap-5 flex-col">
                                        <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col max-md:mt-10">
                                                <div className="flex flex-col text-sm leading-6 text-slate-800 h-[325px] w-full overflow-y-auto">
                                                    <div className="justify-center leading-[129%] text-neutral-400">
                                                        Search Result
                                                    </div>
                                                    {searchResults.map((item, index) => (
                                                        <div className="flex justify-between py-0 px-0" key={index}>
                                                            <div className="flex  w-full">
                                                                {/* <img
                                          loading="lazy"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b52b3f9b35f46f045a8a46c03f5d7e95a4c4e0f5f00d2a8939e31eb00504355?apiKey=7580612134c3412b9f32a9330debcde8&"
                                          className="shrink-0 w-6 aspect-square"
                                        /> */}
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    className="w-full text-left py-1 px-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 rounded-2xl bg-white"
                                                                    onClick={() => handleItemClick(item)}
                                                                >
                                                                    {formatLabel(item)}
                                                                </button>
                                                            </div>
                                                            {/* <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/74b321bbdc5e630832324473665e26cc5cec64ae70f6bc6ac7059a2fb8b56dbe?apiKey=7580612134c3412b9f32a9330debcde8&"
                                        className="shrink-0 w-6 aspect-square"
                                      /> */}
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* <div className="flex flex-col py-0.5 mt-4 text-xs leading-4 text-gray-600">
                                  <div className="justify-center text-sm leading-5 text-neutral-400">
                                    Popular Searches
                                  </div>
                                  <div className="flex gap-3 pr-12 mt-3 max-md:pr-5">
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Best Car
                                    </div>
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      News Cars
                                    </div>
                                    <div className="justify-center px-4 pt-2 pb-2.5 whitespace-nowrap border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Trending
                                    </div>
                                  </div>
                                  <div className="flex gap-3 mt-3 whitespace-nowrap">
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Affordable
                                    </div>
                                    <div className="justify-center px-4 pt-2 pb-2.5 border border-solid bg-zinc-100 border-zinc-300 rounded-[100px]">
                                      Luxury
                                    </div>
                                  </div>
                                </div> */}
                                            </div>
                                        </div>
                                        <div className="flex flex-col max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col max-md:mt-10 md:w-[600px] w-[390px]">
                                                <div className="justify-center py-0.5 text-sm leading-5 text-neutral-400 max-md:max-w-full">
                                                    Quick access
                                                </div>

                                                <div
                                                    ref={scrollRef}
                                                    className="scroll-container pb-2 mt-2 max-md:max-w-full flex overflow-x-auto gap-3 no-scroll"
                                                    onMouseDown={handleMouseDown}
                                                    onMouseLeave={handleMouseLeave}
                                                    onMouseUp={handleMouseUp}
                                                    onMouseMove={handleMouseMove}
                                                >
                                                    {carItems.map((item, index) => (
                                                        <Link
                                                            href={item.link}
                                                            key={index}
                                                            className="flex flex-col rounded-2xl w-[250px] gap-3 max-md:ml-0 max-md:w-full"
                                                        >
                                                            <div className="flex flex-col w-[250px]  grow justify-center rounded-2xl self-stretch text-white rounded-xl max-md:mt-4">
                                                                <div className="flex overflow-hidden relative flex-col rounded-2xl justify-end px-1 pt-20 pb-1 w-full aspect-[0.84]">
                                                                    <img
                                                                        loading="lazy"
                                                                        srcSet={`${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, ${item.imgSrc}?apiKey=7580612134c3412b9f32a9330debcde8&`}
                                                                        className="object-cover absolute inset-0 size-full"
                                                                        alt={item.title}
                                                                    />
                                                                    <div className="flex relative flex-col justify-center items-start px-4 py-3 mt-44 rounded-xl border border-solid backdrop-blur-[32px] bg-zinc-500 bg-opacity-10 border-white border-opacity-10 max-md:pr-5 max-md:mt-10">
                                                                        <div className="text-sm leading-5">
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
                    <div className="gap-5 justify-between px-5 py-4 bg-white w-full md:hidden flex">
                        <div className="flex gap-2 text-xl tracking-wider text-center whitespace-nowrap text-neutral-900">
                            <Link href="/">
                                <Image
                                    loading="lazy"
                                    src="/assets/img/car-prices-logo.png"
                                    className="w-[150px] object-contain"
                                    alt={`logo`}
                                    width={150}
                                    height={50}
                                />
                            </Link>
                            <div className="my-auto"></div>
                        </div>
                        <div className="flex gap-4 justify-center my-auto">
                            <Image
                                loading="lazy"
                                src="/search.svg"
                                className="shrink-0 w-5 aspect-square"
                                onClick={() => setSearchClcked(true)}
                                alt={`search-icon`}
                                width={0}
                                height={0}
                            />

                            <div onClick={toggleNavigation}>
                                <Image
                                    loading="lazy"
                                    src="/menu.svg"
                                    className="shrink-0 self-start w-6 aspect-[1.27]"
                                    alt={`menu-icon`}
                                    width={0}
                                    height={0}
                                />
                            </div>
                        </div>

                        <div
                            className={`fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                                }`}
                            onClick={toggleNavigation}
                        ></div>
                    </div>
                )}
            </div>
            <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
        </>

    )
}
