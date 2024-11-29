"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import { fetchBodyTypeList, fetchBrandList, fetchCylinderList, fetchDisplacementRange, fetchDriveList, fetchFilteredTrims, fetchFuelTypeList, fetchPowerRange, fetchPriceRange, fetchTransmissionList } from "@/lib/fetchAdvancedFilterData";
import CarList from "./CarList";
import AdvancedFilterOptions from "./AdvancedFilterOptions";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
    Dialog,
    DialogContent,
    MenuItem
} from "@mui/material";
import LoaderOverlay from "../common/LoaderOverlay ";
import Pagination from "./Pagination";
import ExpandableText from "../common/ExpandableText";
import Select from "react-select";
import PopularCategories from "../popular-sections/PopularCategories";
import WebStories from "../home/WebStories";
import TrendingVideos from "../home/TrendingVideos";
import ServicesAdComponent from "../home/ServicesAdComponent";
import CarDealersHome from "../home/CarDealersHome";
import SeoLinksFilter from "../common/SeoLinksFilter";
import PrimaryButton from "../buttons/PrimaryButton";
import FilterLayout from "../multi-step-filter/FilterLayout";

export default function AdvancedFilterWrapper({
    currentPage,
    totalPages,
    brandList,
    bodyTypeList,
    totalpricerange,
    totaldisplacementrange,
    totalpowerrange,
    filteredTrims,
    totalFilteredCars,
    fuelTypeList,
    cylinderList,
    transmissionList,
    driveList,
    bodyTypes,
    brand,
    filterType
}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();


    const [hasMounted, setHasMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState();
    const [current, setCurrent] = useState();

    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
    const pageSize = 12;
    const sorting = searchParams.get("sort") ? searchParams.get("sort") : "";

    // Memoize these values to prevent recalculation on every render
    const brandSlugs = useMemo(() => {
        const brandFromParams = params.brandname;
        const brandFromSearch = searchParams.get("brand");

        // If `brandname` exists in `params`, use it.
        if (brandFromParams) {
            return brandFromParams;
        }

        // If `brand` exists in searchParams, split it by commas, otherwise return an empty array.
        return brandFromSearch ? brandFromSearch.split(",") : [];
    }, [params.brandname, searchParams]);

    const bodyTypeSlugs = useMemo(() => {
        const bodyTypeFromParams = params.categoryname;
        const bodyTypeFromSearch = searchParams.get("bodytype");

        // If `categoryname` exists in `params`, use it.
        if (bodyTypeFromParams) {
            return bodyTypeFromParams;
        }

        // If `bodytype` exists in searchParams, split it by commas, otherwise return an empty array.
        return bodyTypeFromSearch ? bodyTypeFromSearch.split(",") : [];
    }, [params.categoryname, searchParams]);

    const fuelTypeSlugs = useMemo(() => (searchParams.get("fuelType") ? searchParams.get("fuelType").split(",") : []), [searchParams]);
    const cylinderSlugs = useMemo(() => (searchParams.get("cylinders") ? searchParams.get("cylinders").split(",") : []), [searchParams]);
    const driveSlugs = useMemo(() => (searchParams.get("drive") ? searchParams.get("drive").split(",") : []), [searchParams]);
    const transmissionSlugs = useMemo(() => (searchParams.get("transmission") ? searchParams.get("transmission").split(",") : []), [searchParams]);


    const additionalQueryParams = useMemo(() => ({
        haveMusic: searchParams.get("haveMusic"),
        isLuxury: searchParams.get("isLuxury"),
        isPremiumLuxury: searchParams.get("isPremiumLuxury"),
        haveTechnology: searchParams.get("haveTechnology"),
        havePerformance: searchParams.get("havePerformance"),
        isSpacious: searchParams.get("isSpacious"),
        isElectric: searchParams.get("isElectric"),
        isFuelEfficient: searchParams.get("isFuelEfficient"),
        isOffRoad: searchParams.get("isOffRoad"),
        isOneSeat: searchParams.get("isOneSeat"),
        isTwoSeat: searchParams.get("isTwoSeat"),
        isTwoPlusTwo: searchParams.get("isTwoPlusTwo"),
        isThreeSeat: searchParams.get("isThreeSeat"),
        isFourSeat: searchParams.get("isFourSeat"),
        isFiveSeat: searchParams.get("isFiveSeat"),
        isSixSeat: searchParams.get("isSixSeat"),
        isSevenSeat: searchParams.get("isSevenSeat"),
        isEightSeat: searchParams.get("isEightSeat"),
        isNineSeat: searchParams.get("isNineSeat"),
        isNinePlusSeat: searchParams.get("isNinePlusSeat"),
        isManualTransmission: searchParams.get("isManualTransmission"),
        isDuneBashing: searchParams.get("isDuneBashing"),
        isSafety: searchParams.get("isSafety"),
        isAffordableLuxury: searchParams.get("isAffordableLuxury"),
    }), [searchParams]);

    const queryParams = useMemo(() => {
        const params = {};

        if (brandSlugs.length > 0) params.brands = JSON.stringify(brandSlugs);
        if (bodyTypeSlugs.length > 0) params.bodyTypeIds = [JSON.stringify(bodyTypeSlugs)];
        if (fuelTypeSlugs.length > 0) params.fuelTypes = JSON.stringify(fuelTypeSlugs);
        if (cylinderSlugs.length > 0) params.cylinders = JSON.stringify(cylinderSlugs);
        if (driveSlugs.length > 0) params.drive = JSON.stringify(driveSlugs);
        if (transmissionSlugs.length > 0) params.transmission = JSON.stringify(transmissionSlugs);

        return params;
    }, [brandSlugs, bodyTypeSlugs, fuelTypeSlugs, cylinderSlugs, driveSlugs, transmissionSlugs]);

    const parseRanges = (rangeStr) => {
        return rangeStr.split(",").map((range) => {
            const [min, max] = range.split("-");
            return { min: parseInt(min), max: parseInt(max) || null };
        });
    };

    const priceRange = useMemo(() => (searchParams.get("price") ? parseRanges(searchParams.get("price")) : []), [searchParams]);
    const powerRange = useMemo(() => (searchParams.get("power") ? parseRanges(searchParams.get("power")) : []), [searchParams]);
    const displacementRange = useMemo(() => (searchParams.get("displacement") ? parseRanges(searchParams.get("displacement")) : []), [searchParams]);

    if (priceRange.length > 0) queryParams.priceRange = priceRange;
    if (powerRange.length > 0) queryParams.powerRange = powerRange;
    if (displacementRange.length > 0) queryParams.displacementRange = displacementRange;

    const [allTrims, setAllTrims] = useState(filteredTrims);
    const [totalCars, setTotalCars] = useState(totalFilteredCars);

    const [fuelTypeListRes, setFuelTypeListRes] = useState([]);
    const [cylinderListRes, setCylinderListRes] = useState([]);
    const [transmissionListRes, setTransmissionListRes] = useState([]);
    const [driveListRes, setDriveListRes] = useState([]);
    const [totalPriceRangesRes, setTotalPriceRangesRes] = useState([]);
    const [totalDisplacementRangeRes, setTotalDisplacementRangeRes] = useState([]);
    const [totalPowerRangeRes, setTotalPowerRangeRes] = useState([]);
    const [brandListRes, setBrandListRes] = useState([]);
    const [bodyTypeListRes, setBodyTypeListRes] = useState([]);



    const brandoptions = brandListRes?.map((brand) => ({
        label: brand.name,
        value: brand.slug,
        id: brand.id,
    }));

    const bodyoptions = bodyTypeListRes?.map((body) => ({
        label: body.name,
        value: body.slug,
        image: body.image.url,
    }));

    const fueloptions = fuelTypeListRes?.map((body) => ({
        label: body,
        value: body
    }));

    const cylinderoptions = cylinderListRes?.map((body) => ({
        label: body + "Cylinder",
        value: body
    }));

    const transmissionsoptions = transmissionListRes?.map((body) => ({
        label: body,
        value: body
    }));

    const driveoptions = driveListRes?.map((body) => ({
        label: body,
        value: body
    }));


    const [selectedOption, setSelectedOption] = useState(() => searchParams.get("sort") || "");

    console.log(selectedOption, "selectedOption");

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setOpen(false); // Close the popup after selecting an option
    };

    useEffect(() => {
        const updateQuery = () => {
            const currentParams = new URLSearchParams(searchParams); // Use `searchParams` to get current query params
            currentParams.set("sort", selectedOption);

            router.replace(`${pathname}?${currentParams.toString()}`);
        };

        if (selectedOption !== "") {
            updateQuery();
        }
    }, [selectedOption, router, searchParams]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [
                    trims,
                    fuelTypes,
                    cylinders,
                    transmissions,
                    drives,
                    prices,
                    displacements,
                    powers,
                    brands,
                    bodyTypes,
                ] = await Promise.all([
                    fetchFilteredTrims({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        page,
                        sorting,
                        ...additionalQueryParams,
                    }),
                    fetchFuelTypeList({
                        brandSlugs,
                        bodyTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchCylinderList({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchTransmissionList({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchDriveList({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchPriceRange({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchDisplacementRange({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchPowerRange({
                        brandSlugs,
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        ...additionalQueryParams,
                    }),
                    fetchBrandList({
                        bodyTypeSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                    fetchBodyTypeList({
                        brandSlugs,
                        fuelTypeSlugs,
                        cylinderSlugs,
                        driveSlugs,
                        transmissionSlugs,
                        priceRange,
                        displacementRange,
                        powerRange,
                        ...additionalQueryParams,
                    }),
                ]);

                // Log the API responses to see if they are returning the expected data
                console.log('Trims response:', trims);
                console.log('Fuel Types response:', fuelTypes);
                console.log('Cylinders response:', cylinders);
                console.log('Transmissions response:', transmissions);
                console.log('Drives response:', drives);
                console.log('Prices response:', prices);
                console.log('Displacements response:', displacements);
                console.log('Powers response:', powers);
                console.log('Brands response:', brands);
                console.log('Body Types response:', bodyTypes);

                // Set state with the responses

                console.log(total, "sssss");

                setAllTrims(trims?.data?.list || []);
                setTotal(trims?.data?.pagination?.pageCount);
                setCurrent(page);
                setTotalCars(trims?.data?.totalFilteredCars || 0);
                setFuelTypeListRes(fuelTypes?.fuelTypes || []);
                setCylinderListRes(cylinders?.cylinders || []);
                setTransmissionListRes(transmissions?.transmission || []);
                setDriveListRes(drives?.drive || []);
                setTotalPriceRangesRes(prices?.price || []);
                setTotalDisplacementRangeRes(displacements?.displacement || []);
                setTotalPowerRangeRes(powers?.power || []);
                setBrandListRes(brands?.brands || []);
                setBodyTypeListRes(bodyTypes?.bodyTypes || []);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [
        brandSlugs,
        bodyTypeSlugs,
        fuelTypeSlugs,
        cylinderSlugs,
        driveSlugs,
        transmissionSlugs,
        priceRange,
        displacementRange,
        powerRange,
        page,
        sorting,
    ]);


    const [isVisible, setIsVisible] = useState(false);

    const toggleSlideover = () => {
        setIsVisible(!isVisible);
    };


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const PopupComponent = ({ open, onClose, onSelect }) => (
        <Dialog open={open} onClose={onClose}>
            <DialogContent className="p-0">
                <MenuItem onClick={() => onSelect("price-desc")} className="px-20">
                    <i className="bi bi-sort-down " />
                    Price High to Low
                </MenuItem>
                <MenuItem onClick={() => onSelect("price-asc")} className="px-20">
                    <i className="bi bi-sort-up" />
                    Price Low to High
                </MenuItem>
            </DialogContent>
        </Dialog>
    );
    const currentYear = new Date().getFullYear();
    const isBrandPage = pathname.startsWith('/brands/') && pathname.split('/').length === 3;
    const isCategoryPage = pathname.startsWith('/body-types/') && pathname.split('/').length === 3;

    const [expanded, setExpanded] = useState(false);

    const sortingOptions = [
        { value: "price-desc", label: "Price High to Low" },
        { value: "price-asc", label: "Price Low to High" },
    ];

    const [toggleModalFunction, setToggleModalFunction] = useState(null);

    const toggleModalFromParent = (filterId) => {

        console.log(filterId, "filterId");

        if (toggleModalFunction === null) {
            setToggleModalFunction(filterId);
        } else {
            setToggleModalFunction(null);
        }
    };


    return <div>
        {/* <head>
            {isBrandPage ? ( // Only render these tags on the brand page
                <>
                    <title>
                        {branddetails?.seo?.metaTitle
                            ? branddetails.seo.metaTitle
                            : `${branddetails?.attributes?.name} ${currentYear} Car Prices in UAE, Latest Models, Reviews & Specifications in UAE - Carprices.ae`}
                    </title>
                    <meta
                        name="description"
                        content={
                            branddetails?.seo?.metaDescription
                                ? branddetails.seo.metaDescription
                                : `Explore a wide selection of ${branddetails?.attributes?.name} ${currentYear} cars at competitive prices in the UAE. Discover expert reviews, specifications, and find authorized dealers near you for a seamless car buying experience.`
                        }
                    />
                    <link
                        rel="canonical"
                        href={`https://carprice.ae${pathname}`} // Use the pathname to construct the canonical URL
                    />
                </>
            ) : isCategoryPage ? (<>
                <title>
                    "Explore Car Body Types: Sedans, SUVs, Coupes, and More"
                </title>
                <meta
                    name="description"
                    content="Discover the different car body types, including sedans, SUVs, hatchbacks, and coupes. Learn about their features, advantages, and what makes each style unique. Find the perfect car that suits your lifestyle and needs!"
                />
                <link
                    rel="canonical"
                    href={`https://carprice.ae${pathname}`} // Use the pathname to construct the canonical URL
                />
            </>) : <></>}
        </head> */}



        <div className="flex items-center justify-center ">
            <div
                id="slideover-container"
                className={`w-full h-full fixed z-[999] inset-0 ${isVisible ? "visible" : "invisible"
                    }`}
            >
                <div
                    onClick={toggleSlideover}
                    id="slideover-bg"
                    className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isVisible ? "opacity-50" : "opacity-0"
                        }`}
                />
                <div
                    id="slideover"
                    className={`w-full md:w-96  rounded-tl-2xl  rounded-bl-2xl bg-white h-full absolute right-0 duration-300 ease-out transition-all ${isVisible ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div
                        onClick={toggleSlideover}
                        className="z-[999] absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-1 mr-1"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div className="mt-0">
                        <FilterLayout />
                    </div>
                </div>
            </div>
        </div>

        <PopupComponent
            open={open}
            onClose={handleClose}
            onSelect={handleOptionChange}
        />

        <div className="block md:hidden fixed z-[999] bottom-0 w-full shadow-xl">
            <div className="flex justify-between bg-white relative h-[70px] shadow-xl border-t-[1px] border-solid border-gray-200 px-10">
                <div
                    className="flex items-center"
                    onClick={() => toggleModalFromParent("fullfilter")}
                >
                    <TuneIcon className="me-2" />
                    <span className="font-semibold text-[22px]">Filter</span>
                </div>
                <div
                    className="absolute left-1/2 -top-2/4 transform -translate-x-1/2 flex flex-col items-center justify-center"
                    onClick={toggleSlideover}
                >
                    <div className="bg-blue-600 w-[60px] h-[60px] rounded-full flex justify-center items-center">
                        <AutoAwesomeIcon className="text-white text-[30px]" />
                    </div>
                    <p className="text-[13px] text-center">
                        Advanced <br />
                        Search
                    </p>
                </div>
                <div className="flex items-center" onClick={handleClickOpen}>
                    <SortIcon className="me-2" />
                    <span className="font-semibold text-[22px]">Sort</span>
                </div>
            </div>
        </div>
        <LoaderOverlay isVisible={isLoading} />

        <div className="container mx-auto px-4">
            {/* Sidebar and Car Listing */}
            <div className="grid grid-cols-12 gap-5">
                <aside className="col-span-3 md:block hidden">
                    <AdvancedFilterOptions
                        brandoptions={brandoptions}
                        bodyoptions={bodyoptions}
                        fueloptions={fueloptions}
                        totalpricerange={totalPriceRangesRes}
                        totaldisplacementrange={totalDisplacementRangeRes}
                        totalpowerrange={totalPowerRangeRes}
                        cylinderoptions={cylinderoptions}
                        transmissionsoptions={transmissionsoptions}
                        driveoptions={driveoptions}
                        driveList={driveListRes}
                        additionalQueryParams={additionalQueryParams}
                        toggleModal={toggleModalFunction}
                        setIsLoading={setIsLoading}
                    />
                </aside>
                <main className="md:col-span-9 col-span-12">
                    {(pathname === '/search-cars' || pathname.includes('/body-types')) &&
                        <div className='shadow-md p-4 mt-5 rounded-lg'>
                            {pathname === '/search-cars' && (
                                <>
                                    <h1 className="md:text-3xl text-xl font-semibold">Find Your Perfect New Car</h1>
                                    <h4 className="md:text-lg text-md font-medium text-blue-600">
                                        Browse the Latest Models Across All Brands and Price Ranges
                                    </h4>
                                    <ExpandableText content={`<p>Explore our extensive collection of new cars available in the UAE. Compare prices, specifications, and features to find the vehicle that best fits your lifestyle and budget. With options across a wide range of brands and models, from budget-friendly choices to premium options, you’re sure to find the perfect car for you. Start your journey to a new car with CarPrices.ae today!</p>`} />
                                </>
                            )}
                            {pathname.includes('/body-types') && (
                                <>
                                    <h1 className="md:text-3xl text-xl font-semibold">Discover Cars by Body Type</h1>
                                    <h4 className="md:text-lg text-md font-medium text-blue-600">
                                        Find the Ideal Car Body Type to Suit Your Needs and Style
                                    </h4>
                                    <ExpandableText content={`<p>Explore our wide selection of car body types, from sedans to SUVs and more. Compare features and specifications to find the body style that best matches your lifestyle. CarPrices.ae makes it easy to browse and choose the car that’s right for you based on the body type. Begin your search for the perfect fit today!</p>`} />
                                </>
                            )}
                        </div>
                    }
                    <div className="hidden md:flex gap-4 justify-between px-5 py-4 text-base tracking-normal rounded-2xl bg-blue-100 max-md:flex-wrap my-4">
                        <div className="my-auto text-black leading-[150%] max-md:max-w-full">
                            Need help finding the right vehicle?{" "}
                            <span className="">Start Your Super Search Now!</span>
                            <span className="tracking-normal"> ✨</span>
                        </div>
                        <PrimaryButton label="Search Now" onClick={toggleSlideover} />
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-between ">
                            <div className="flex gap-5 justify-between rounded-2xl text-neutral-900 max-md:flex-wrap ">
                                <p className="capitalize font-semibold text-2xl">{pathname.includes('/body-types') ? 'Search New Cars By Body Type' : 'Search New Cars'}</p>
                                <div className="my-auto text-sm font-medium tracking-normal flex items-center">
                                    <p className="text-neutral-900 mr-2 font-semibold">{totalCars}</p>
                                    <p className="text-neutral-900">results found</p>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <Select
                                    options={sortingOptions}
                                    value={sortingOptions.find(option => option.value === selectedOption)}
                                    onChange={(option) => handleOptionChange(option.value)}
                                    placeholder="Sort by"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            width: 200,
                                            borderRadius: 30,
                                        }),
                                    }}
                                />
                            </div>
                        </div>


                        <CarList cars={allTrims || []} totalCars={totalCars} setIsLoading={setIsLoading} isLoading={isLoading} />
                        <Pagination currentPage={current} totalPages={total} />
                    </div>
                    <PopularCategories />

                    <WebStories />

                    <TrendingVideos />
                    <div className="mt-6">
                        <ServicesAdComponent />
                    </div>
                    <div className="mt-10">
                        <CarDealersHome />
                    </div>
                    <SeoLinksFilter />


                </main>

            </div>
        </div></div>;
}
