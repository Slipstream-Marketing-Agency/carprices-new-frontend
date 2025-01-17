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
import BreadCrumbs from "../common/BreadCrumbs";


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
        { href: "/compare-cars", label: "Compare New Cars" },
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

    useEffect(() => {
        setHoveredMenuItem(null)
    }, [pathname])

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
        return <></>
    }

    const [scrolledDown, setScrolledDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Scroll event handler
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            setScrolledDown(true);
        } else {
            // Scrolling up
            setScrolledDown(false);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <>
            <MobileSidebar toggleNavigation={toggleNavigation} setIsOpen={setIsOpen} setIsLoginModalOpen={setIsLoginModalOpen} isOpen={isOpen} links={links} />
            <div className="bg-white hidden md:block w-full border-solid border-b-[1px] border-gray-200 md:mb-28">
                <div className="w-full">
                    {/* Top Section */}
                    <div
                        className={`bg-white ${scrolledDown ? 'translate-y-[-100%]' : 'translate-y-0'} md:fixed z-20 w-full border-solid border-b-[1px] border-gray-200 transition-transform duration-300`}
                    >
                        <div className="flex justify-between items-center px-10 py-4">
                            {/* Logo Section */}
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center">
                                    <Image
                                        loading="lazy"
                                        src="/assets/img/car-prices-logo.png"
                                        className="shrink-0 my-auto max-w-full aspect-[6.25] w-[179px] h-auto"
                                        alt="logo"
                                        width={179}
                                        height={28}
                                        layout="intrinsic"
                                    />
                                </Link>
                            </div>

                            {/* Center Search Bar */}
                            <div className="flex-grow flex justify-center">
                                <div className="w-[60%] max-w-full">
                                    <Search />
                                </div>
                            </div>

                            {/* Sign-in Section */}
                            <div className="flex items-center gap-5" onMouseLeave={() => { setHoveredMenuItem(null) }}>
                                {user ? (
                                    <div
                                        className="shadow-md relative py-1 px-2 rounded-full cursor-pointer flex items-center justify-between"
                                        onMouseOver={() => setHoveredMenuItem('profile')}
                                    >
                                        <div className="flex items-center capitalize justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold">
                                            {user?.username.charAt(0)}
                                        </div>
                                        <KeyboardArrowDownIcon />
                                        {hoveredMenuItem === 'profile' && <HoveredProfile setHoveredMenuItem={setHoveredMenuItem} />}
                                    </div>
                                ) : (
                                    <PrimaryButton label="Sign In" additionalClass="!bg-black !border-black" onClick={() => setIsLoginModalOpen(true)} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Centered Links Section */}
                    <div className={`fixed flex justify-between min-h-14 shadow-md items-center left-0 w-full bg-white border-solid border-[1px] border-gray-200 z-10 transition-all duration-200 ${scrolledDown ? 'top-0' : 'top-16'}`}>
                        {/* Logo Section */}
                        <div className="flex items-center">
                            {scrolledDown && (
                                <Link href="/" className="flex items-center ml-4 animate-logo-in">
                                    <Image
                                        loading="lazy"
                                        src="/assets/img/car-prices-logo.png"
                                        className="shrink-0 my-auto max-w-full aspect-[6.25] w-[179px] h-auto"
                                        alt="logo"
                                        width={179}
                                        height={28}
                                        layout="intrinsic"
                                    />
                                </Link>
                            )}
                        </div>
                        <div className={`flex gap-5 ${scrolledDown ? '' : 'mt-2'}`}>
                            {links.map((link, i) => (
                                <div
                                    key={i}
                                    className="relative group"
                                    onMouseOver={() => setHoveredMenuItem(link.hoverItem)}
                                    onMouseLeave={() => setHoveredMenuItem(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center p-1 justify-center font-normal text-sm ${pathname === link.href ? 'text-blue-600' : ''} ${hoveredMenuItem === link.hoverItem ? 'border-t-2 border-blue-600 text-blue-600' : 'border-t-2 border-transparent'}`}
                                    >
                                        {link.label}
                                        {link.href !== '/compare-cars' &&
                                            <span className="">
                                                <svg
                                                    className="w-4 h-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        }
                                    </Link>

                                    {/* Show the dropdown menu when hovered */}
                                    {hoveredMenuItem === link.hoverItem && (
                                        <HoveredMenuItemDropdown />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className=""></div>
                    </div>
                </div>
            </div>

            <div className="gap-5 justify-between bg-white w-full md:hidden flex ">
                {searchClicked ? (
                    <div className="flex flex-col grow shrink justify-center w-full max-md:max-w-full">
                        <div className="flex flex-col justify-center items-center bg-white border border-solid border-neutral-200 rounded-full w-full max-md:max-w-full">
                            <div className="flex  items-center gap-2 px-4 py-1 w-full">
                                <Search />
                            </div>
                        </div>
                        <div className="relative w-full ">
                            {showDropdown && searchResults.length > 0 && (
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
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    className="w-full text-left py-1 px-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 rounded-2xl bg-white"
                                                                    onClick={() => handleItemClick(item)}
                                                                >
                                                                    {formatLabel(item)}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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
            <div className="container">
                <BreadCrumbs />
            </div>
        </>

    )
}
