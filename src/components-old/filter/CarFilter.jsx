import React, { useEffect, useState } from "react";
import Link from "next/link";
import CarLeftSidebar from "@/src/utils/CarLeftSidebar";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import ProductSideFilterList from "@/src/components-old/filter/ProductSideFilterList";
import Pagination from "@/src/utils/Pagination";
import axios from "axios";
import { useRouter } from "next/router";
import BodyTypes from "@/src/components-old/Home1/BodyTypes";
import BrandCategory from "@/src/components-old/Home1/BrandCategory";
import Image from "next/image";
import LoaderOverlay from "@/src/utils/LoaderOverlay ";
import Breadcrumb from "@/src/utils/Breadcrumb";
import moment from "moment";
import Price from "@/src/utils/Price";
import PriceListTable from "../common/PriceListTable";

export default function CarFilter({
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
  branddetails,
  bodyTypeElements,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("grid-group-wrapper"); // Initial class is "grid-group-wrapper"
  const [expanded, setExpanded] = useState(false);
  const [total, setTotal] = useState(totalPages);
  const [current, setCurrent] = useState(currentPage);

  const { query } = router;
  const page = parseInt(query.page) || 1;
  const pageSize = 12;
  const brandSlugs =
    router.pathname === "/search-cars" ||
    router.pathname === "/category/[categoryname]"
      ? query.brand
        ? query.brand.split(",")
        : []
      : router.pathname === "/brands/[brandname]"
      ? query.brandname
        ? [query.brandname]
        : []
      : [];
  const bodyTypeSlugs =
    router.pathname === "/search-cars" ||
    router.pathname === "/brands/[brandname]"
      ? query.bodytype
        ? query.bodytype.split(",")
        : []
      : router.pathname === "/category/[categoryname]"
      ? query.categoryname
        ? [query.categoryname]
        : []
      : [];

  const fuelTypeSlugs = query.fuelType ? query.fuelType.split(",") : [];
  const cylinderSlugs = query.cylinders ? query.cylinders.split(",") : [];
  const driveSlugs = query.drive ? query.drive.split(",") : [];
  const transmissionSlugs = query.transmission
    ? query.transmission.split(",")
    : [];
  

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
          }car-trims/filter?brands=${JSON.stringify(
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
          )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
            )}&page=${page}&pageSize=${pageSize}`
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
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchArticles(); // Initial fetch
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    query.isTwoSeat,
    query.isTwoPlusTwo,
    query.isFourToFive,
    query.isFiveToSeven,
    query.isSevenToNine,
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

  return (
    <>
      <LoaderOverlay isVisible={isLoading} />

      {/* <div className="floating-btn d-md-none" onClick={toggleFilter}>
        {!showFilter ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </div> */}
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

            <div className="col-xl-9 order-xl-2 order-1 mt-md-4 mt-0">
              {/* <div className="row">
        <div className="col-lg-12">
          <div className="show-item-and-filte">
            <p>
              Showing <strong>2,928</strong> car available in stock
            </p>
            <div className="filter-view">
              <div className="filter-atra">
                <h6>Filter By:</h6>
                <form>
                  <div className="form-inner">
                    <SelectComponent
                      placeholder=" select conditions"
                      options={conditions}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
              <div className="list-grid-main">
                <Breadcrumb />
                <div className={`list-grid-product-wrap ${activeClass}`}>
                  <div className="row md:g-4 g-2 mb-40">
                    {router.pathname === "/brands/[brandname]" && (
                      <>
                        <div className="white_bg_wrapper">
                          <h1 class="fw-bold">
                            {branddetails?.attributes?.name} UAE Cars
                          </h1>
                          <hr className="my-0 mt-2 heading-bottom " />
                          <div className="read-more-less" id="dynamic-content">
                            <div
                              className={`info ${
                                expanded ? "" : "height-hidden"
                              } dynamic-content content-hidden`}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: branddetails?.attributes?.description,
                                }}
                              ></div>
                              <h2 className="fw-bold mt-4">
                                {branddetails?.attributes?.name} Cars{" "}
                                {moment().format("MMMM YYYY")} Price List in UAE
                              </h2>
                              <hr className="mb-3 mt-2 heading-bottom " />

                              {/* <p>
                                You can choose from{" "}
                                <b>
                                  {
                                    branddetails?.attributes
                                      ?.modelsWithPriceRange?.length
                                  }
                                </b>{" "}
                                available{" "}
                                <Link
                                  href={`/brands/${branddetails?.attributes?.slug}`}
                                  className="fw-bold text-primary"
                                >
                                  {branddetails?.attributes?.name}
                                </Link>{" "}
                                models in the UAE. The{" "}
                                <Link
                                  href={`/brands/${branddetails?.attributes?.slug}`}
                                  className="fw-bold text-primary"
                                >
                                  {branddetails?.attributes?.name}
                                </Link>{" "}
                                UAE line-up consists of{" "}
                                <b>{bodyTypeElements}</b>.{" "}
                                <Link
                                  href={`/brands/${branddetails?.attributes?.slug}/${branddetails?.attributes?.mostAffordableModel?.year}/${branddetails?.attributes?.mostAffordableModel?.modelSlug}/${branddetails?.attributes?.mostAffordableModel?.trimSlug}`}
                                  className="fw-bold text-primary"
                                >
                                  {branddetails?.attributes?.name}{" "}
                                  {
                                    branddetails?.attributes
                                      ?.mostAffordableModel?.modelName
                                  }{" "}
                                  {
                                    branddetails?.attributes
                                      ?.mostAffordableModel?.trimName
                                  }
                                </Link>
                                , starting at{" "}
                                <b>
                                  {" "}
                                  <Price
                                    data={
                                      branddetails?.attributes
                                        ?.mostAffordableModel?.price
                                    }
                                  />
                                </b>
                                , is the most affordable model while the{" "}
                                <Link
                                  href={`/brands/${branddetails?.attributes?.slug}/${branddetails?.attributes?.mostExpensiveModel?.year}/${branddetails?.attributes?.mostExpensiveModel?.modelSlug}/${branddetails?.attributes?.mostExpensiveModel?.trimSlug}`}
                                  className="fw-bold text-primary"
                                >
                                  {branddetails?.attributes?.name}{" "}
                                  {
                                    branddetails?.attributes?.mostExpensiveModel
                                      ?.modelName
                                  }{" "}
                                  {
                                    branddetails?.attributes?.mostExpensiveModel
                                      ?.trimName
                                  }
                                </Link>{" "}
                                at{" "}
                                <b>
                                  {" "}
                                  <Price
                                    data={
                                      branddetails?.attributes
                                        ?.mostExpensiveModel?.price
                                    }
                                  />
                                </b>{" "}
                                is the brand’s most expensive model.{" "}
                                <Link
                                  href={`/brands/${branddetails?.attributes?.slug}/${branddetails?.attributes?.mostPowerfulModel?.year}/${branddetails?.attributes?.mostPowerfulModel?.modelSlug}/${branddetails?.attributes?.mostPowerfulModel?.trimSlug}`}
                                  className="fw-bold text-primary"
                                >
                                  {branddetails?.attributes?.name}{" "}
                                  {
                                    branddetails?.attributes?.mostPowerfulModel
                                      ?.modelName
                                  }{" "}
                                  {
                                    branddetails?.attributes?.mostPowerfulModel
                                      ?.trimName
                                  }
                                </Link>{" "}
                                is the most powerful model in the brand's
                                line-up.
                              </p> */}
                              <br />

                              <PriceListTable
                                data={
                                  branddetails?.attributes?.modelsWithPriceRange
                                }
                                brand={branddetails?.attributes?.name}
                              />
                            </div>
                            <span
                              className={`read-more ${
                                expanded ? "hide" : ""
                              } text-primary fw-bold tw-mb-[-3px]`}
                              onClick={() => setExpanded(true)}
                            >
                              Read More
                            </span>
                            <span
                              className={`read-less scroll-to-parent-pos content-read-less ${
                                expanded ? "" : "hide"
                              } text-primary fw-bold`}
                              onClick={() => setExpanded(false)}
                            >
                              Read Less
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    <ProductSideFilterList filteredTrims={allTrims} />
                  </div>
                  <Pagination currentPage={current} totalPages={total} />
                </div>
              </div>

              {/* {router.pathname === "/brands/[brandname]" && (
                <>
                  {" "}
                  <div className="white_bg_wrapper mt-5">
                    <h2 className="fw-bold mb-3">
                      {branddetails?.attributes?.name} Cars Key Highlights
                    </h2>
                    <table className="table table-bordered table-rounded">
                      <tbody>
                        <tr>
                          <th className="col-2" scope="row" colspan="6">
                            Most Affordable
                          </th>
                          <td className="col-6" scope="row" colspan="6">
                            {branddetails?.attributes?.name}{" "}
                            {
                              branddetails?.attributes?.mostAffordableModel
                                ?.modelName
                            }{" "}
                            {
                              branddetails?.attributes?.mostAffordableModel
                                ?.trimName
                            }
                          </td>
                        </tr>
                        <tr>
                          <th className="col-2" scope="row" colspan="6">
                            Most Expensive
                          </th>
                          <td className="col-6" scope="row" colspan="6">
                            {branddetails?.attributes?.name}{" "}
                            {
                              branddetails?.attributes?.mostExpensiveModel
                                ?.modelName
                            }{" "}
                            {
                              branddetails?.attributes?.mostExpensiveModel
                                ?.trimName
                            }
                          </td>
                        </tr>
                        <tr>
                          <th className="col-2" scope="row" colspan="6">
                            Most Powerful
                          </th>
                          <td className="col-6" scope="row" colspan="6">
                            {branddetails?.attributes?.name}{" "}
                            {
                              branddetails?.attributes?.mostPowerfulModel
                                ?.modelName
                            }{" "}
                            {
                              branddetails?.attributes?.mostPowerfulModel
                                ?.trimName
                            }
                          </td>
                        </tr>
                        <tr>
                          <th className="col-2" scope="row" colspan="6">
                            Available Body Types
                          </th>
                          <td className="col-6" scope="row" colspan="6">
                            {bodyTypeElements}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )} */}
              <div className="row">
                <div className="col-xl-12 col-lg-8 col-md-12 col-sm-12">
                  {router.pathname !== "/brands/[brandname]" && (
                    <>
                      {" "}
                      <BrandCategory brandDetails={brand} />
                      <Ad728x90 dataAdSlot="5962627056" />
                    </>
                  )}
                  {router.pathname !== "/category/[categoryname]" && (
                    <>
                      <BodyTypes bodyTypeList={bodyTypes} />
                      <Ad728x90 dataAdSlot="3488506956" />
                    </>
                  )}

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
                                  href={`/news/${newsItem?.slug}`}
                                >
                                  <a>
                                    <div className="position-relative imageContainer">
                                      <Image
                                        src={
                                          newsItem?.coverImage &&
                                          newsItem?.coverImage
                                          // for alt image need to add else
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
                                  {newsItem?.title}
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
    </>
  );
}
