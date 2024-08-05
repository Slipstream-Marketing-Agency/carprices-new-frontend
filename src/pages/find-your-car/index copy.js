import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/src/layout/MainLayout";
import CarLeftSidebar from "@/src/utils/CarLeftSidebar";
import SelectComponent from "@/src/utils/SelectComponent";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ProductCardList from "@/src/components-old/filter/ProductCardList";
import ProductSideFilterList from "@/src/components-old/filter/ProductSideFilterList";
import Pagination from "@/src/utils/Pagination";
import axios from "axios";
import { useRouter } from "next/router";
import data from "@/src/data/data";
import BrandCategory from "@/src/components-old/Home1/BrandCategory";
import BodyTypes from "@/src/components-old/Home1/BodyTypes";
import Image from "next/image";
import LoaderOverlay from "@/src/utils/LoaderOverlay ";
import Breadcrumb from "@/src/utils/Breadcrumb";
import Price from "@/src/utils/Price";
import FilterLayout from "@/src/components-old/find-car-multi-step-filter/FilterLayout";


function CarListingLeftSidebar({
  currentPage,
  totalPages,
  brandList,
  bodyTypeList,
  totalpricerange,
  totaldisplacementrange,
  totalpowerrange,
  filteredTrims,
  fuelTypeList,
  cylinderList,
  transmissionList,
  driveList,
  bodyTypes,
  brand,
}) {
  const router = useRouter();
  const [data, setData] = useState(filteredTrims); // Use state to manage the dynamic data
  const [isLoading, setIsLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("grid-group-wrapper"); // Initial class is "grid-group-wrapper"
  const [total, setTotal] = useState(totalPages);
  const [current, setCurrent] = useState(currentPage);
  const { query } = router;
  const page = parseInt(query.page) || 1;
  const pageSize = 12;
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
  const [bodyTypeListres, setBodyTypeListres] = useState(bodyTypeList);

  useEffect(() => {
    // Function to fetch filtered trims
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
          )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(
            sorting
          )}`
        );
        setTotal(response?.data?.data?.pagination?.pageCount);
        setCurrent(page);
        setAllTrims(response?.data?.data?.list); // Set the data to state
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
          )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
        );

        setAllFilter(response?.data);
      } catch (error) {
        console.error("Failed to fetch fuel type list:", error);
      } finally {
        setIsLoading(false); // Ensure loading is false after fetching
      }
    };

    const fetchFuelTypeList = async () => {
      if (fuelTypeSlugs.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (fuelTypeSlugs.length > 0) {
            setFuelTypeListRes(response?.data?.fuelTypes);
          } else {
            setFuelTypeListRes(allFilter.fuelTypes);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchCylinderList = async () => {
      if (cylinderSlugs.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (cylinderSlugs.length > 0) {
            setCylinderListres(response?.data?.cylinders);
          } else {
            setCylinderListres(allFilter?.cylinders);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchTransmissionList = async () => {
      if (transmissionSlugs.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (transmissionSlugs.length > 0) {
            setTransmissionListres(response?.data?.transmission);
          } else {
            setTransmissionListres(allFilter.transmission);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchDriveList = async () => {
      if (driveSlugs.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (driveSlugs.length > 0) {
            setDriveListres(response?.data?.drive);
          } else {
            setDriveListres(allFilter.drive);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchPriceRange = async () => {
      if (priceRange.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (priceRange.length > 0) {
            setTotalPricerangesres(response?.data?.price);
          } else {
            setTotalPricerangesres(allFilter.fuelTypes?.price);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchDisplacementRange = async () => {
      if (displacementRange.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (displacementRange.length > 0) {
            setTotaldisplacementrangeres(response?.data?.displacement);
          } else {
            setTotaldisplacementrangeres(allFilter.displacement);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchPowerRange = async () => {
      if (powerRange.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (powerRange.length > 0) {
            setTotalpowerrangeres(response?.data?.power);
          } else {
            setTotalpowerrangeres(allFilter.power);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchBrandList = async () => {
      if (brandSlugs.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (brandSlugs.length > 0) {
            setBrandListres(response?.data?.brands);
          } else {
            setBrandListres(allFilter.brands);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    const fetchBodyTypeList = async () => {
      if (bodyTypeSlugs.length > 0 && process.env.NEXT_PUBLIC_API_URL) {
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
            )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
          );
          if (bodyTypeSlugs.length > 0) {
            setBodyTypeListres(response?.data?.bodyTypes);
          } else {
            setBodyTypeListres(allFilter.bodyTypes);
          }
        } catch (error) {
          console.error("Failed to fetch fuel type list:", error);
        } finally {
          setIsLoading(false); // Ensure loading is false after fetching
        }
      }
    };

    fetchFilteredTrims(); // Call the fetch function
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

  const prices = query.price.split("-");

  const minPrice = parseInt(prices[0]); // Convert to integer
  const maxPrice = parseInt(prices[1]);

  const [selectedOption, setSelectedOption] = useState(query.sort);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
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

  return (
    <>
      <LoaderOverlay isVisible={isLoading} />

      <div
        className={`modal compareModalMainContainer  ${
          showModal ? "show modal-overlay " : ""
        }`}
        style={{ display: showModal ? "block " : "none " }}
        tabIndex="-1"
      >
        <div
          className={`modal-dialog d-flex justify-content-center modal-dialog-centered modal-lg compareModalWidth  ${
            showModal ? "showCompareModal" : "hideCompareModal"
          }`}
        >
          <div className="filter-modal-content compareModelContainer">
            <div className="modal-body mt-3 mx-md-4 mx-0 mb-4">
              <div className="d-flex justify-content-end mb-2">
                <i
                  class="bi bi-x-square text-white fs-3"
                  onClick={handleCloseModal}
                ></i>
              </div>
              <div className="car-filter-area">
                <FilterLayout />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainLayout>
        <div className="mt-2">
          <Ad728x90 dataAdSlot="5962627056" />
        </div>

        <div className="product-page mt-15 mb-100">
          <div className="container">
            <div className="row g-xl-4 gy-5 ">
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
              />
              <div
                className={` filter-modal ${!showFilter ? "hidden" : ""}`}
                onClick={toggleFilter}
              >
                <div
                  className="filter-content"
                  onClick={(e) => e.stopPropagation()}
                >
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
                  />
                </div>
              </div>

              <div className="col-xl-9 order-xl-2 order-1">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="show-item-and-filte">
                      {/* <p>
                      Showing <strong>2,928</strong> car available in stock
                    </p> */}
                      <div className="filter-view">
                        {/* <div className="filter-atra">
                        <h6>Filter By:</h6>
                        <form>
                          <div className="form-inner">
                            <SelectComponent
                              placeholder=" select conditions"
                              options={conditions}
                            />
                          </div>
                        </form>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-grid-main">
                  <div className={`list-grid-product-wrap ${activeClass}`}>
                    {/* <Breadcrumb /> */}
                    <h1 className="fw-bold">New Car Buyer's Guide</h1>
                    <p>
                     Here is a list of shortlisted cars priced
                      between{" "}
                      <span className="tw-font-bold">
                        <Price data={Number(minPrice)} />
                      </span>{" "}
                      and{" "}
                      <span className="tw-font-bold">
                        <Price data={Number(maxPrice)} />
                      </span>{" "}
                      and based on your selection. If you want to see more
                      options, please expand your search by using the “Restart
                      Search” button. Happy car shopping!
                    </p>
                    <div className="d-md-flex d-none align-items-center justify-content-between mt-3">
                      <button
                        type="button"
                        className="tw-text-white tw-bg-[#3b5998] hover:tw-bg-[#3b5998]/90 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-[#3b5998]/50 tw-font-medium tw-rounded-lg tw-px-5 tw-py-2 tw-text-center tw-inline-flex tw-items-center dark:focus:tw-ring-[#3b5998]/55 "
                        onClick={() => setShowModal(true)}
                      >
                        <img src="/assets/icons/filter-white.svg" />
                        Restart Search
                      </button>
                      <fieldset className="filter-sorting-sec d-flex gap-4  p-sm-b clearfix dev-filter-sorting m-lg-t m-lg-b ">
                        <label
                          className={`radio-check-text m-lg-r sorting-list-data ${
                            selectedOption === "price-desc" ? "active" : ""
                          }`}
                          onClick={() => handleOptionChange("price-desc")}
                        >
                          <span className="sort-name">
                            <i class="bi bi-sort-down " />
                            Price High to Low
                          </span>
                          <i className="icon-back inline-block m-xs-l dev-icon rotate-minus-90"></i>
                        </label>
                        <label
                          className={`radio-check-text m-lg-r sorting-list-data ${
                            selectedOption === "price-asc" ? "active" : ""
                          }`}
                          onClick={() => handleOptionChange("price-asc")}
                        >
                          <span className="sort-name">
                            <i class="bi bi-sort-up"></i>Price Low to High
                          </span>
                          <i className="icon-back inline-block m-xs-l dev-icon rotate-90"></i>
                        </label>
                      </fieldset>

                      {/* <button className="btn mb-2 mb-md-0 btn-round btn-outline btn-block">
                        <i class="bi bi-funnel-fill mt-1 ms-1 text-primary" />
                        Back to Main Filter
                      </button> */}
                    </div>

                    <hr className="mb-3 mt-3" />
                    <div className="row md:g-4 g-2 mb-md-40 mb-10">
                      <ProductSideFilterList filteredTrims={allTrims} />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />

                    {/* <div className="view-btn-area mt-15">
                      <button
                        className="btn mb-2 mb-md-0 btn-round btn-outline btn-block"
                        onClick={() => setShowModal(true)}
                      >
                        <i class="bi bi-funnel-fill mt-1 ms-1 text-primary" />
                        Back to Main Filter
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-8 col-md-12 col-sm-12">
                    <BrandCategory brandDetails={brand} />
                    <Ad728x90 dataAdSlot="5962627056" />
                    <BodyTypes bodyTypeList={bodyTypes} />
                    <Ad728x90 dataAdSlot="3488506956" />
                    <div className="row ">
                      <h2 className="mt-4">Automotive News</h2>
                      {articleslist?.map((newsItem, index) => {
                        // Adjust index to account for the first item displayed separately
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
                                  {/* Similar details for rest of the articles */}
                                </div>
                              </div>
                            </div>
                            {/* Display advertisement after the sixth article in the grid (seventh overall) */}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default CarListingLeftSidebar;

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const pageSize = 12;
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
    )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(
      sorting
    )}`
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
    )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
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
      )}&${additionalQueryString}&page=${page}&pageSize=${pageSize}`
    );
    bodyTypeListres = bodyTypeList;
  }

  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`);

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
