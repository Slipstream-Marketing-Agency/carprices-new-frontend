// /pages/cars/index.js

import React, { useEffect, useState } from "react";
import Head from "next/head";
import CarList from "@/src/components/car-list/CarList";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";

import CarLeftSidebar from "@/src/utils/CarLeftSidebar";
import MainLayout from "@/src/layout/MainLayout";
import Price from "@/src/utils/Price";
import Pagination from "@/src/utils/Pagination";
import FilterLayout from "@/src/components-old/find-car-multi-step-filter/FilterLayout";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import axios from "axios";
import { useRouter } from "next/router";
import BrandCategory from "@/src/components-old/Home1/BrandCategory";
import BodyTypes from "@/src/components-old/Home1/BodyTypes";
import Link from "next/link";
import Image from "next/image";
import LoaderOverlay from "@/src/utils/LoaderOverlay ";
import TabSwitch from "@/src/components/tab/TabSwitch";
import SeoLinksFilter from "@/src/components/common/SeoLinksFilter";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { fetchMetaData } from "@/src/lib/fetchMetaData";

const CarsPage = ({
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
  metaData,
}) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("grid-group-wrapper"); // Initial class is "grid-group-wrapper"
  const [total, setTotal] = useState(totalPages);
  const [current, setCurrent] = useState(currentPage);
  const { query } = router;
  const page = parseInt(query.page) || 1;
  const type = parseInt(query.type) || 0;
  const pageSize = 12;
  const pageZero = parseInt(query.pageZero) || 1;
  const pageSizeZero = 12;
  const sorting = query.sort ? query.sort : "";
  const brandSlugs = query.brand ? query.brand.split(",") : [];
  const bodyTypeSlugs = query.bodytype ? query.bodytype.split(",") : [];
  const fuelTypeSlugs = query.fuelType ? query.fuelType.split(",") : [];
  const cylinderSlugs = query.cylinders ? query.cylinders.split(",") : [];
  const driveSlugs = query.drive ? query.drive.split(",") : [];
  const transmissionSlugs = query.transmission
    ? query.transmission.split(",")
    : [];

  const additionalQueryParams = {
    haveMusic: query.haveMusic,
    isLuxury: query.isLuxury,
    isPremiumLuxury: query.isPremiumLuxury,
    haveTechnology: query.haveTechnology,
    havePerformance: query.havePerformance,
    isSpacious: query.isSpacious,
    isElectric: query.isElectric,
    isFuelEfficient: query.isFuelEfficient,
    isOffRoad: query.isOffRoad,
    // isTwoSeat: query.isTwoSeat,
    // isTwoPlusTwo: query.isTwoPlusTwo,
    // isFourToFive: query.isFourToFive,
    // isFiveToSeven: query.isFiveToSeven,
    // isSevenToNine: query.isSevenToNine,
    isOneSeat: query.isOneSeat,
    isTwoSeat: query.isTwoSeat,
    isTwoPlusTwo: query.isTwoPlusTwo,
    isThreeSeat: query.isThreeSeat,
    isFourSeat: query.isFourSeat,
    isFiveSeat: query.isFiveSeat,
    isSixSeat: query.isSixSeat,
    isSevenSeat: query.isSevenSeat,
    isEightSeat: query.isEightSeat,
    isNineSeat: query.isNineSeat,
    isNinePlusSeat: query.isNinePlusSeat,

    isManualTransmission: query.isManualTransmission,
    isDuneBashing: query.isDuneBashing,
    isSafety: query.isSafety,
    isAffordableLuxury: query.isAffordableLuxury,
  };

  const additionalQueryString = Object.keys(additionalQueryParams)
    .filter((key) => additionalQueryParams[key] !== undefined)
    .map((key) => `${key}=${additionalQueryParams[key]}`)
    .join("&");

  const queryParams = {};

  if (brandSlugs.length > 0) {
    queryParams.brands = JSON.stringify(brandSlugs);
  }

  if (bodyTypeSlugs.length > 0) {
    queryParams.bodyTypeIds = [JSON.stringify(bodyTypeSlugs)];
  }

  if (fuelTypeSlugs.length > 0) {
    queryParams.fuelTypes = JSON.stringify(fuelTypeSlugs);
  }

  if (cylinderSlugs.length > 0) {
    queryParams.cylinders = JSON.stringify(cylinderSlugs);
  }

  if (driveSlugs.length > 0) {
    queryParams.drive = JSON.stringify(driveSlugs);
  }

  if (transmissionSlugs.length > 0) {
    queryParams.transmission = JSON.stringify(transmissionSlugs);
  }

  // Parse ranges
  const parseRanges = (rangeStr) => {
    return rangeStr.split(",").map((range) => {
      const [min, max] = range.split("-");
      return { min: parseInt(min), max: parseInt(max) || null };
    });
  };

  const priceRange = query.price ? parseRanges(query.price) : [];
  const powerRange = query.power ? parseRanges(query.power) : [];
  const displacementRange = query.displacement
    ? parseRanges(query.displacement)
    : [];

  if (priceRange) {
    queryParams.priceRange = priceRange;
  }
  if (powerRange) {
    queryParams.powerRange = powerRange;
  }
  if (displacementRange) {
    queryParams.displacementRange = displacementRange;
  }

  const [allTrims, setAllTrims] = useState(filteredTrims);
  const [totalCars, setTotalCars] = useState(totalFilteredCars);
  const [allFilter, setAllFilter] = useState();
  const [fuelTypeListRes, setFuelTypeListRes] = useState(fuelTypeList);
  const [cylinderListres, setCylinderListres] = useState(cylinderList);
  const [transmissionListres, setTransmissionListres] =
    useState(transmissionList);
  const [driveListres, setDriveListres] = useState(driveList);
  const [totalpricerangesres, setTotalPricerangesres] =
    useState(totalpricerange);
  const [totaldisplacementrangeres, setTotaldisplacementrangeres] = useState(
    totaldisplacementrange
  );
  const [totalpowerrangeres, setTotalpowerrangeres] = useState(totalpowerrange);
  const [brandListres, setBrandListres] = useState(brandList);
  console.log(brandListres, "brandListres");

  const [bodyTypeListres, setBodyTypeListres] = useState(bodyTypeList);
  console.log(bodyTypeListres, "bodyTypeListres");

  const [listType, setListType] = useState(type);

  useEffect(() => {
    setSelectedTab(type);
  }, []);

  useEffect(() => {
    // Function to fetch filtered trims
    if (hasMounted) {
      const fetchFilteredTrims = async () => {
        setIsLoading(true); // Set loading to true while we fetch data

        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/homefilter?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(
              sorting
            )}`
          );
          setTotal(response?.data?.data?.pagination?.pageCount);
          setCurrent(page);
          setAllTrims(response?.data?.data?.list); // Set the data to state
          setTotalCars(response?.data?.data?.totalFilteredCars);
        } catch (error) {
          console.error("Failed to fetch filtered trims:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchAllFilter = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/price-range-by-brands?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );

          setAllFilter(response?.data);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchFuelTypeList = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/fuelList?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setFuelTypeListRes(response?.data?.fuelTypes);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchCylinderList = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/cylinderList?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setCylinderListres(response?.data?.cylinders);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchTransmissionList = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/transmissionList?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(driveSlugs)}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setTransmissionListres(response?.data?.transmission);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchDriveList = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/driveList?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setDriveListres(response?.data?.drive);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchPriceRange = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/priceRange?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setTotalPricerangesres(response?.data?.price);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchDisplacementRange = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/displacementRange?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setTotaldisplacementrangeres(response?.data?.displacement);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchPowerRange = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/powerRange?brands=${JSON.stringify(
              brandSlugs
            )}&bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setTotalpowerrangeres(response?.data?.power);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchBrandList = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/brandList?bodyTypes=${JSON.stringify(
              bodyTypeSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );
          setBrandListres(response?.data?.brands);
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      const fetchBodyTypeList = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }car-trims/bodyList?brands=${JSON.stringify(
              brandSlugs
            )}&fuelType=${JSON.stringify(
              fuelTypeSlugs
            )}&cylinders=${JSON.stringify(
              cylinderSlugs
            )}&drive=${JSON.stringify(
              driveSlugs
            )}&transmission=${JSON.stringify(
              transmissionSlugs
            )}&priceRanges=${JSON.stringify(
              priceRange
            )}&displacementRanges=${JSON.stringify(
              displacementRange
            )}&powerRanges=${JSON.stringify(
              powerRange
            )}&page=${page}&pageSize=${pageSize}`
          );

          setBodyTypeListres(response?.data?.bodyTypes);
          console.log(response?.data?.bodyTypes, "response?.data?.bodyTypes)");
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      };

      fetchFilteredTrims();
      fetchFuelTypeList();
      fetchAllFilter();
      fetchCylinderList();
      fetchTransmissionList();
      fetchDriveList();
      fetchPriceRange();
      fetchDisplacementRange();
      fetchPowerRange();
      fetchBrandList();
      fetchBodyTypeList();
    } else {
      // On initial render, set the flag to true
      setHasMounted(true);
    }
  }, [
    query.haveMusic,
    query.isLuxury,
    query.isPremiumLuxury,
    query.haveTechnology,
    query.havePerformance,
    query.isSpacious,
    query.isElectric,
    query.isFuelEfficient,
    query.isOffRoad,
    // query.isTwoSeat,
    // query.isTwoPlusTwo,
    // query.isFourToFive,
    // query.isFiveToSeven,
    // query.isSevenToNine,
    query.isOneSeat,
    query.isTwoSeat,
    query.isTwoPlusTwo,
    query.isThreeSeat,
    query.isFourSeat,
    query.isFiveSeat,
    query.isSixSeat,
    query.isSevenSeat,
    query.isEightSeat,
    query.isNineSeat,
    query.isNinePlusSeat,

    query.isManualTransmission,
    query.isDuneBashing,
    query.isAffordableLuxury,
    query.isSafety,
    query.brand,
    query.bodytype,
    query.fuelType,
    query.cylinders,
    query.drive,
    query.transmission,
    query.price,
    query.power,
    query.displacement,
    query.page,
    query.pageZero,
    query.sort,
  ]);

  const brandoptions = brandListres?.map((brand) => ({
    label: brand.name,
    value: brand.slug,
    id: brand.id,
  }));

  const bodyoptions = bodyTypeListres?.map((body) => ({
    label: body.name,
    value: body.slug,
    image: body.image.url,
  }));
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility

  const toggleFilter = () => setShowFilter(!showFilter);

  const [articleslist, setArticlesList] = useState([]);
  const [articlecurrentPage, setArticleCurrentPage] = useState(1);
  const [articlehasMore, setarticeHasMore] = useState(true);

  const fetchArticles = async () => {
    const pageSize = 18; // Set your page size
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}articles/list?slug=news&page=${articlecurrentPage}&pageSize=12`
      );
      const fetchedArticles = response.data.data;
      const newArticles = [...articleslist, ...fetchedArticles];
      setArticlesList(newArticles);
      setArticleCurrentPage(articlecurrentPage + 1);
      setarticeHasMore(response.data.pagination.pageCount > articlecurrentPage);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setarticeHasMore(false); // Assuming no more articles to fetch if there's an error
    }
  };

  useEffect(() => {
    fetchArticles(); // Initial fetch
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowModal(false);
  }, [
    query.haveMusic,
    query.isLuxury,
    query.isPremiumLuxury,
    query.haveTechnology,
    query.havePerformance,
    query.isSpacious,
    query.isElectric,
    query.isFuelEfficient,
    query.isOffRoad,
    query.isOneSeat,
    query.isTwoSeat,
    query.isTwoPlusTwo,
    query.isThreeSeat,
    query.isFourSeat,
    query.isFiveSeat,
    query.isSixSeat,
    query.isSevenSeat,
    query.isEightSeat,
    query.isNineSeat,
    query.isNinePlusSeat,
    query.isManualTransmission,
    query.isDuneBashing,
    query.isAffordableLuxury,
    query.isSafety,
    query.brand,
    query.bodytype,
    query.fuelType,
    query.cylinders,
    query.drive,
    query.transmission,
    query.price,
    query.power,
    query.displacement,
  ]);

  const prices = query?.price?.split("-");
  const minPrice = prices && prices[0] ? parseInt(prices[0]) : null; // Convert to integer
  const maxPrice = prices && prices[1] ? parseInt(prices[1]) : null;

  const [selectedOption, setSelectedOption] = useState(query.sort);

  console.log(selectedOption, "selectedOption");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setOpen(false); // Close the popup after selecting an option
  };

  useEffect(() => {
    const updateQuery = () => {
      const currentParams = { ...router.query };
      currentParams.sort = selectedOption;
      const queryString = new URLSearchParams(currentParams).toString();
      router.replace(`${router.pathname}?${queryString}`, undefined, {
        shallow: true,
      });
    };

    if (selectedOption !== "") {
      updateQuery();
    }
  }, [selectedOption]);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleSlideover = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    setIsVisible(false);
  }, [router.query]);

  const categories = ["Priced", "TBC"];

  const [selectedTab, setSelectedTab] = useState(0);

  const [toggleModalFunction, setToggleModalFunction] = useState(null);

  const toggleModalFromParent = (filterId) => {
    if (toggleModalFunction === null) {
      setToggleModalFunction(filterId);
    } else {
      setToggleModalFunction(null);
    }
  };

  console.log(toggleModalFunction, "toggleModalFunction");

  const PopupComponent = ({ open, onClose, onSelect }) => (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="tw-p-0">
        <MenuItem onClick={() => onSelect("price-desc")} className="tw-px-20">
          <i className="bi bi-sort-down " />
          Price High to Low
        </MenuItem>
        <MenuItem onClick={() => onSelect("price-asc")} className="tw-px-20">
          <i className="bi bi-sort-up" />
          Price Low to High
        </MenuItem>
      </DialogContent>
    </Dialog>
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Carprices",
              url: "https://carprices.ae/",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://carprices.ae/search-cars?brand={brand}&price={price}&bodytype={bodytype}&power={power}&displacement={displacement}&fuelType={fuelType}&drive={drive}&transmission={transmission}&cylinders={cylinders}",
                },
                "query-input": [
                  "optional name=brand",
                  "optional name=price",
                  "optional name=bodytype",
                  "optional name=power",
                  "optional name=displacement",
                  "optional name=fuelType",
                  "optional name=drive",
                  "optional name=transmission",
                  "optional name=cylinders",
                ],
              },
            }),
          }}
        />
      </Head>
      <PopupComponent
        open={open}
        onClose={handleClose}
        onSelect={handleOptionChange}
      />

      <div className="tw-block md:tw-hidden tw-fixed tw-z-[999] tw-bottom-0 tw-w-full tw-shadow-xl">
        <div className="tw-flex tw-justify-between tw-bg-white tw-relative tw-h-[70px] tw-shadow-xl tw-border-t-[1px] tw-border-solid tw-border-gray-200 tw-px-10">
          <div
            className="tw-flex tw-items-center"
            onClick={() => toggleModalFromParent("fullfilter")}
          >
            <TuneIcon className="me-2" />
            <span className="tw-font-semibold tw-text-[22px]">Filter</span>
          </div>
          <div
            className="tw-absolute tw-left-1/2 tw--top-2/4 tw-transform tw--translate-x-1/2 tw-flex tw-flex-col tw-items-center tw-justify-center"
            onClick={toggleSlideover}
          >
            <div className="tw-bg-blue-600 tw-w-[60px] tw-h-[60px] tw-rounded-full tw-flex tw-justify-center tw-items-center">
              <AutoAwesomeIcon className="tw-text-white tw-text-[30px]" />
            </div>
            <p className="tw-text-[13px] tw-text-center">
              Advanced <br />
              Search
            </p>
          </div>
          <div className="tw-flex tw-items-center" onClick={handleClickOpen}>
            <SortIcon className="me-2" />
            <span className="tw-font-semibold tw-text-[22px]">Sort</span>
          </div>
        </div>
      </div>
      {/* <Head>
        <title>Search New Cars | Car Listings</title>
        <meta
          name="description"
          content="Find the best new cars based on your preferences and budget. Filter by price, brand, body type, and more."
        />
        <meta
          name="keywords"
          content="new cars, car listings, car prices, car filters"
        />
        <meta name="robots" content="index, follow" />
      </Head> */}
      <LoaderOverlay isVisible={isLoading} />
      <MainLayout
        pageMeta={{
          title: metaData?.title
            ? metaData.title
            : "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
          description: metaData?.description
            ? metaData.description
            : "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
          type: "Car Review Website",
        }}
      >
        <div className="tw-container tw-mx-auto tw-px-4">
          {/* <div className="tw-flex tw-overflow-hidden tw-relative tw-flex-col tw-px-8 tw-py-5 tw-rounded-2xl tw-shadow-2xl max-md:tw-px-5">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4d089437f9eedaf2a7115137b173b5ef4db108309a3cc7fe3839f7e263df4026?apiKey=7580612134c3412b9f32a9330debcde8&"
            className="tw-object-cover tw-absolute tw-inset-0 tw-size-full"
          />
          <div className="tw-flex tw-relative tw-gap-5 tw-justify-between tw-w-full max-md:tw-flex-wrap max-md:tw-max-w-full">
            <div className="tw-flex tw-flex-col tw-justify-center tw-text-base tw-leading-6 tw-text-white max-md:tw-max-w-full">
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-px-5 tw-py-3 tw-border tw-border-white tw-border-solid tw-shadow tw-rounded-[100px] max-md:tw-pr-5 max-md:tw-max-w-full">
                <div className="tw-flex tw-gap-3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/af77a26bbf0110f9e8ba378eec3fcdc7a022e66096a7128825395f1701181e14?apiKey=7580612134c3412b9f32a9330debcde8&"
                    className="tw-shrink-0 tw-my-auto tw-w-5 tw-aspect-square"
                  />
                  <div>Describe what car you want</div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-gap-5 tw-justify-center">
              <div className="tw-my-auto tw-text-sm tw-tracking-normal tw-leading-5 tw-text-white">
                Sort by:
              </div>
              <div className="tw-flex tw-gap-5 tw-justify-center tw-px-4 tw-py-4 tw-text-base tw-leading-6 tw-whitespace-nowrap tw-bg-white tw-border tw-border-gray-200 tw-border-solid tw-rounded-[100px] tw-text-neutral-900">
                <div>Trending</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/69e21fbe185ff1a01181d8fa6a9951ebcf0b99efa3bc39fa3f6017b0ba7164ff?apiKey=7580612134c3412b9f32a9330debcde8&"
                  className="tw-shrink-0 tw-w-4 tw-aspect-square"
                />
              </div>
            </div>
          </div>
          <div className="tw-flex tw-relative tw-flex-col tw-items-start tw-pt-6 tw-text-sm tw-tracking-normal tw-leading-5 tw-text-white max-md:tw-pr-5 max-md:tw-max-w-full">
            <div className="tw-flex tw-gap-3">
              <div>Suggestion:</div>
              <div>New Cars</div>
              <div>Mileage</div>
              <div>Luxury</div>
              <div>Affordable</div>
              <div>SUV</div>
            </div>
          </div>
        </div> */}

          <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-2">
            <aside className="tw-w-full lg:tw-w-1/4 tw-bg-white">
              <CarLeftSidebar
                brandoptions={brandoptions}
                bodyoptions={bodyoptions}
                totalpricerange={totalpricerangesres}
                totaldisplacementrange={totaldisplacementrangeres}
                totalpowerrange={totalpowerrangeres}
                fuelTypeList={fuelTypeListRes}
                cylinderList={cylinderListres}
                transmissionList={transmissionListres}
                driveList={driveListres}
                displaynone={true}
                toggleModal={toggleModalFunction}
              />
            </aside>
            <main className="tw-w-full lg:tw-w-3/4">
              <div>
                {/* <h1 className="fw-bold">New Car Buyer's Guide</h1>
                <p>
                  Here is a list of shortlisted cars priced between{" "}
                  <span className="tw-font-bold">
                    <Price data={Number(minPrice)} />
                  </span>{" "}
                  and{" "}
                  <span className="tw-font-bold">
                    <Price data={Number(maxPrice)} />
                  </span>{" "}
                  and based on your selection. If you want to see more options,
                  please expand your search by using the “Restart Search”
                  button. Happy car shopping!
                </p> */}
                <div className="tw-hidden md:tw-flex tw-gap-4 tw-justify-between tw-px-5 tw-py-4 tw-text-base tw-tracking-normal tw-rounded-2xl tw-bg-blue-100 max-md:tw-flex-wrap tw-my-4">
                  <div className="tw-my-auto tw-text-black tw-leading-[150%] max-md:tw-max-w-full">
                    Need help finding the right vehicle?{" "}
                    <span className="">Start Your Super Search Now!</span>
                    <span className="tw-tracking-normal"> ✨</span>
                  </div>
                  <PrimaryButton label="Search Now" onClick={toggleSlideover} />
                </div>
                <div className="tw-flex tw-items-center tw-justify-center ">
                  <div
                    id="slideover-container"
                    className={`tw-w-full tw-h-full tw-fixed tw-z-[999] tw-inset-0 ${
                      isVisible ? "tw-visible" : "tw-invisible"
                    }`}
                  >
                    <div
                      onClick={toggleSlideover}
                      id="slideover-bg"
                      className={`tw-w-full tw-h-full tw-duration-500 tw-ease-out tw-transition-all tw-inset-0 tw-absolute tw-bg-gray-900 ${
                        isVisible ? "tw-opacity-50" : "tw-opacity-0"
                      }`}
                    />
                    <div
                      id="slideover"
                      className={`tw-w-full md:tw-w-96  tw-rounded-tl-2xl  tw-rounded-bl-2xl tw-bg-white tw-h-full tw-absolute tw-right-0 tw-duration-300 tw-ease-out tw-transition-all ${
                        isVisible ? "tw-translate-x-0" : "tw-translate-x-full"
                      }`}
                    >
                      <div
                        onClick={toggleSlideover}
                        className="tw-z-[999] tw-absolute tw-cursor-pointer tw-text-gray-600 tw-top-0 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-right-0 tw-mt-1 tw-mr-1"
                      >
                        <svg
                          className="tw-w-6 tw-h-6"
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
                      <div className="tw-mt-0">
                        <FilterLayout />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-justify-end tw-my-3">
                  <FormControl className="tw-hidden md:tw-block">
                    <InputLabel id="sorting-select-label">Sort by</InputLabel>
                    <Select
                      labelId="sorting-select-label"
                      value={selectedOption}
                      onChange={(event) =>
                        handleOptionChange(event.target.value)
                      }
                      label="Sort by"
                      sx={{
                        width: "200px",
                        borderRadius: "30px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: "30px",
                        },
                        // "& .MuiSelect-select": {
                        //   paddingTop: "10px", // reduce padding above
                        //   paddingBottom: "10px", // reduce padding below
                        //   paddingLeft: "12px", // adjust padding left if needed
                        //   paddingRight: "12px", // adjust padding right if needed
                        // },
                      }}
                    >
                      <MenuItem value="price-desc">
                        <i className="bi bi-sort-down" />
                        Price High to Low
                      </MenuItem>
                      <MenuItem value="price-asc">
                        <i className="bi bi-sort-up" />
                        Price Low to High
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>{" "}
                <CarList cars={allTrims} totalCars={totalCars} />
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-8 col-md-12 col-sm-12">
                  <BrandCategory brandDetails={brand} />
                  <Ad728x90 dataAdSlot={"corvette"} />
                  <BodyTypes bodyTypeList={bodyTypes} />
                  <Ad728x90 dataAdSlot={"tahoe"} />
                  {/* <div className="row ">
                    <h2 className="mt-4">Automotive News</h2>
                    {articleslist?.map((newsItem, index) => {
                      const adjustedIndex = index + 1;

                      return (
                        <React.Fragment key={`news-${adjustedIndex}`}>
                          <div
                            className="col-xl-4 col-lg-6 col-md-6 col-6 wow fadeInUp  mb-2"
                            data-wow-delay="200ms"
                          >
                            <div className="news-card">
                              <div className="news-img list-article">
                                <Link
                                  legacyBehavior
                                  href={`/news/${newsItem.slug}`}
                                >
                                  <a>
                                    <div className="position-relative imageContainer">
                                      <Image
                                        src={
                                          newsItem.coverImage
                                            ? newsItem.coverImage
                                            : "/assets/img/car-placeholder.png"
                                        }
                                        alt="Article Image"
                                        layout="responsive"
                                        width={300}
                                        height={205}
                                        objectFit="cover"
                                      />
                                    </div>
                                  </a>
                                </Link>
                              </div>
                              <div className="content">
                                <h5 className="mt-3 BlogCardHeadingTxt head_truncate">
                                  {newsItem.title}
                                </h5>
                              </div>
                            </div>
                          </div>
                          {adjustedIndex % 6 === 0 && (
                            <div
                              className="col-lg-12  mt-0"
                              key={`ad-${adjustedIndex}`}
                            >
                              <Ad728x90 dataAdSlot="5962627056" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {articlehasMore && (
                      <div className="view-btn-area">
                        <button
                          className="btn mb-2 mb-md-0 btn-round btn-outline btn-block"
                          onClick={fetchArticles}
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div> */}
                </div>
                <SeoLinksFilter />
              </div>
            </main>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CarsPage;

export async function getServerSideProps(context) {
  const { query } = context;
  const type = parseInt(query.type) || 0;
  const page = parseInt(query.page) || 1;
  const pageZero = parseInt(query.pageZero) || 1;
  const pageSize = 12;
  const pageSizeZero = 12;
  const sorting = query.sort ? query.sort : "";
  const brandSlugs = query.brand ? query.brand.split(",") : [];
  const bodyTypeSlugs = query.bodytype ? query.bodytype.split(",") : [];
  const fuelTypeSlugs = query.fuelType ? query.fuelType.split(",") : [];
  const cylinderSlugs = query.cylinders ? query.cylinders.split(",") : [];
  const driveSlugs = query.drive ? query.drive.split(",") : [];
  const transmissionSlugs = query.transmission
    ? query.transmission.split(",")
    : [];

  const additionalQueryParams = {
    haveMusic: query.haveMusic,
    isLuxury: query.isLuxury,
    isPremiumLuxury: query.isPremiumLuxury,
    haveTechnology: query.haveTechnology,
    havePerformance: query.havePerformance,
    isSpacious: query.isSpacious,
    isElectric: query.isElectric,
    isFuelEfficient: query.isFuelEfficient,
    isOffRoad: query.isOffRoad,
    isOneSeat: query.isOneSeat,
    isTwoSeat: query.isTwoSeat,
    isTwoPlusTwo: query.isTwoPlusTwo,
    isThreeSeat: query.isThreeSeat,
    isFourSeat: query.isFourSeat,
    isFiveSeat: query.isFiveSeat,
    isSixSeat: query.isSixSeat,
    isSevenSeat: query.isSevenSeat,
    isEightSeat: query.isEightSeat,
    isNineSeat: query.isNineSeat,
    isNinePlusSeat: query.isNinePlusSeat,
    isManualTransmission: query.isManualTransmission,
    isDuneBashing: query.isDuneBashing,
    isSafety: query.isSafety,
    isAffordableLuxury: query.isAffordableLuxury,
  };

  const additionalQueryString = Object.keys(additionalQueryParams)
    .filter((key) => additionalQueryParams[key] !== undefined)
    .map((key) => `${key}=${additionalQueryParams[key]}`)
    .join("&");

  const queryParams = {};

  if (brandSlugs.length > 0) {
    queryParams.brands = JSON.stringify(brandSlugs);
  }

  if (bodyTypeSlugs.length > 0) {
    queryParams.bodyTypeIds = [JSON.stringify(bodyTypeSlugs)];
  }

  if (fuelTypeSlugs.length > 0) {
    queryParams.fuelTypes = JSON.stringify(fuelTypeSlugs);
  }

  if (cylinderSlugs.length > 0) {
    queryParams.cylinders = JSON.stringify(cylinderSlugs);
  }

  if (driveSlugs.length > 0) {
    queryParams.drive = JSON.stringify(driveSlugs);
  }

  if (transmissionSlugs.length > 0) {
    queryParams.transmission = JSON.stringify(transmissionSlugs);
  }
  // Parse ranges
  const parseRanges = (rangeStr) => {
    return rangeStr.split(",").map((range) => {
      const [min, max] = range.split("-");
      return { min: parseInt(min), max: parseInt(max) || null };
    });
  };

  const priceRange = query.price ? parseRanges(query.price) : [];
  const powerRange = query.power ? parseRanges(query.power) : [];
  const displacementRange = query.displacement
    ? parseRanges(query.displacement)
    : [];

  if (priceRange) {
    queryParams.priceRange = priceRange;
  }
  if (powerRange) {
    queryParams.powerRange = powerRange;
  }
  if (displacementRange) {
    queryParams.displacementRange = displacementRange;
  }

  const filteredTrims = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }car-trims/homefilter?brands=${JSON.stringify(
      brandSlugs
    )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
      fuelTypeSlugs
    )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
      driveSlugs
    )}&transmission=${JSON.stringify(
      transmissionSlugs
    )}&priceRanges=${JSON.stringify(
      priceRange
    )}&displacementRanges=${JSON.stringify(
      displacementRange
    )}&powerRanges=${JSON.stringify(
      powerRange
    )}&page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(sorting)}`
  );

  const fullFilter = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }car-trims/price-range-by-brands?brands=${JSON.stringify(
      brandSlugs
    )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
      fuelTypeSlugs
    )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
      driveSlugs
    )}&transmission=${JSON.stringify(
      transmissionSlugs
    )}&priceRanges=${JSON.stringify(
      priceRange
    )}&displacementRanges=${JSON.stringify(
      displacementRange
    )}&powerRanges=${JSON.stringify(
      powerRange
    )}&page=${page}&pageSize=${pageSize}`
  );

  let fuelTypeListres,
    cylinderListres,
    transmissionListres,
    driveListres,
    pricerangesres,
    totaldisplacementrangeres,
    totalpowerrangeres,
    brandListres,
    bodyTypeListres;

  if (fuelTypeSlugs.length > 0) {
    const fuelTypeList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/fuelList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    fuelTypeListres = fuelTypeList;
  }

  if (cylinderSlugs.length > 0) {
    const cylinderList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/cylinderList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    cylinderListres = cylinderList;
  }

  if (transmissionSlugs.length > 0) {
    const transmissionSlugs = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/transmissionList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    transmissionListres = transmissionSlugs;
  }

  if (driveSlugs.length > 0) {
    const driveSlugs = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/driveList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    driveListres = driveSlugs;
  }

  if (priceRange.length > 0) {
    const priceranges = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/priceRange?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    pricerangesres = priceranges;
  }

  if (displacementRange.length > 0) {
    const totaldisplacementrange = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/displacementRange?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(priceRange)}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    totaldisplacementrangeres = totaldisplacementrange;
  }

  if (powerRange.length > 0) {
    const totalpowerrange = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/powerRange?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    totalpowerrangeres = totalpowerrange;
  }

  if (brandSlugs.length > 0) {
    const brandList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/brandList?bodyTypes=${JSON.stringify(
        bodyTypeSlugs
      )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    brandListres = brandList;
  }

  if (bodyTypeSlugs.length > 0) {
    const bodyTypeList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/bodyList?brands=${JSON.stringify(
        brandSlugs
      )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    bodyTypeListres = bodyTypeList;
  }

  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`);

  // Get the full path and query string from the URL (e.g., 'brands?type=1')
  const { resolvedUrl } = context;

  // Split the URL at the "?" to remove query parameters
  const pathWithQuery = resolvedUrl.split("?")[0]; // Only take the path (e.g., 'brands')

  // Extract the last part of the path
  const path = pathWithQuery.split("/").filter(Boolean).pop();
  const metaData = await fetchMetaData(path);

  try {
    return {
      props: {
        // brands: brandsData?.data?.carModels?.data,
        totalBrands: filteredTrims?.data?.data?.pagination?.total,
        totalPages: filteredTrims?.data?.data?.pagination?.pageCount,
        currentPage: page,
        brandList:
          brandSlugs.length > 0
            ? brandListres?.data.brands
            : fullFilter?.data.brands,
        bodyTypeList:
          bodyTypeSlugs.length > 0
            ? bodyTypeListres?.data.bodyTypes
            : fullFilter?.data.bodyTypes,
        totalpricerange:
          priceRange.length > 0
            ? pricerangesres?.data.price
            : fullFilter?.data.price,
        totaldisplacementrange:
          displacementRange.length > 0
            ? totaldisplacementrangeres?.data.displacement
            : fullFilter?.data.displacement,
        totalpowerrange:
          powerRange.length > 0
            ? totalpowerrangeres?.data.power
            : fullFilter?.data.power,
        filteredTrims: filteredTrims?.data?.data?.list,
        fuelTypeList:
          fuelTypeSlugs.length > 0
            ? fuelTypeListres?.data.fuelTypes
            : fullFilter?.data.fuelTypes,
        cylinderList:
          cylinderSlugs.length > 0
            ? cylinderListres?.data.cylinders
            : fullFilter?.data.cylinders,
        transmissionList:
          transmissionSlugs.length > 0
            ? transmissionListres?.data.transmission
            : fullFilter?.data.transmission,
        driveList:
          driveSlugs.length > 0
            ? driveListres?.data.drive
            : fullFilter?.data.drive,
        bodyTypes: home?.data?.data?.bodyTypes,
        brand: home?.data?.data?.brand,
        totalFilteredCars: filteredTrims?.data?.data?.totalFilteredCars,
        type: type,
        metaData,
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
