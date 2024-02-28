import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/src/layout/MainLayout";
import CarLeftSidebar from "@/src/utils/CarLeftSidebar";
import SelectComponent from "@/src/utils/SelectComponent";
import Ad728x90 from "@/src/components/ads/Ad728x90";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ProductCardList from "@/src/components/filter/ProductCardList";
import ProductSideFilterList from "@/src/components/filter/ProductSideFilterList";
import Pagination from "@/src/utils/Pagination";
import axios from "axios";
import { useRouter } from "next/router";
import data from "@/src/data/data";
import BrandCategory from "@/src/components/Home1/BrandCategory";
import BodyTypes from "@/src/components/Home1/BodyTypes";
import Image from "next/image";
import moment from "moment";
import PriceListTable from "@/src/components/common/PriceListTable";
import Price from "@/src/utils/Price";

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
  branddetails,
}) {
  console.log(branddetails, "branddetails");
  const [activeClass, setActiveClass] = useState("grid-group-wrapper"); // Initial class is "grid-group-wrapper"
  const router = useRouter();
  console.log(brandList, "brandList");
  const toggleView = () => {
    setActiveClass(
      activeClass === "grid-group-wrapper"
        ? "list-group-wrapper"
        : "grid-group-wrapper"
    );
  };
  const conditions = ["Used Car", "New Car"];

  const brandoptions = brandList?.map((brand) => ({
    label: brand.name,
    value: brand.slug,
    id: brand.id,
  }));

  const bodyoptions = bodyTypeList?.map((body) => ({
    label: body.name,
    value: body.slug,
    image: body.image.url,
  }));

  console.log(bodyTypeList, "bodyTypeList");

  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/data");
        // process response
      } catch (error) {
        // handle error
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) =>
      url === router.asPath && setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

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

  const bodyTypeElements = branddetails?.attributes?.uniqueCarBodyTypes?.map(
    (item, index, array) => {
      const count = item.modelCount > 1 ? `${item.modelCount} ` : "1 ";
      const name = item.modelCount > 1 ? `${item.name}s` : item.name;
      const link = <a href={`/category/${item.slug}`}>{name}</a>; // Creating link for the name

      // Determine if the current item is the last in the array or if it's the second-to-last (for correct comma and 'and' placement)
      if (index === array.length - 1) {
        // Last item
        return (
          <span key={item.slug}>
            {count}
            {link}
          </span>
        );
      } else if (index === array.length - 2) {
        // Second-to-last item
        return (
          <span key={item.slug}>
            {count}
            {link} and{" "}
          </span>
        );
      } else {
        // Any other item
        return (
          <span key={item.slug}>
            {count}
            {link},{" "}
          </span>
        );
      }
    }
  );

  return (
    <MainLayout
      pageMeta={{
        title:
          "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
        description:
          "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
        type: "Car Review Website",
      }}
    >
      <div className="floating-btn d-md-none" onClick={toggleFilter}>
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
      </div>

      <div className="mt-2">
        <Ad728x90 dataAdSlot="5962627056" />
      </div>

      <div className="product-page mt-15 mb-100">
        <div className="container">
          <div className="row g-xl-4 gy-5 ">
            <CarLeftSidebar
              brandoptions={brandoptions}
              bodyoptions={bodyoptions}
              totalpricerange={totalpricerange}
              totaldisplacementrange={totaldisplacementrange}
              totalpowerrange={totalpowerrange}
              fuelTypeList={fuelTypeList}
              cylinderList={cylinderList}
              transmissionList={transmissionList}
              driveList={driveList}
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
                  totalpricerange={totalpricerange}
                  totaldisplacementrange={totaldisplacementrange}
                  totalpowerrange={totalpowerrange}
                  fuelTypeList={fuelTypeList}
                  cylinderList={cylinderList}
                  transmissionList={transmissionList}
                  driveList={driveList}
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
                  <div className="row md:g-4 g-2 mb-40">
                    <div className="white_bg_wrapper">
                      <h1 class="fw-bold">
                        New {branddetails?.attributes?.name} UAE Cars
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

                          <p>
                            You can choose from{" "}
                            <b>
                              {
                                branddetails?.attributes?.modelsWithPriceRange
                                  ?.length
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
                            UAE line-up consists of <b>{bodyTypeElements}</b>.{" "}
                            <Link
                              href={`/brands/${branddetails?.attributes?.slug}/${branddetails?.attributes?.mostAffordableModel?.year}/${branddetails?.attributes?.mostAffordableModel?.modelSlug}/${branddetails?.attributes?.mostAffordableModel?.trimSlug}`}
                              className="fw-bold text-primary"
                            >
                              {branddetails?.attributes?.name}{" "}
                              {
                                branddetails?.attributes?.mostAffordableModel
                                  ?.modelName
                              }{" "}
                              {
                                branddetails?.attributes?.mostAffordableModel
                                  ?.trimName
                              }
                            </Link>
                            , starting at{" "}
                            <b>
                              {" "}
                              <Price
                                data={
                                  branddetails?.attributes?.mostAffordableModel
                                    ?.price
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
                                  branddetails?.attributes?.mostExpensiveModel
                                    ?.price
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
                            is the most powerful model in the brand's line-up.
                          </p>
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
                          } text-primary fw-bold mb-[-3px]`}
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

                    <ProductSideFilterList filteredTrims={filteredTrims} />
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              </div>
              <div className="white_bg_wrapper mt-5">
                <h2 className="fw-bold mb-3">
                  {branddetails?.attributes?.name} Cars Key Highlights
                </h2>
                <table className="table table-bordered table-rounded">
                  <tbody>
                    <tr>
                      <th className="col-2" scope="row" colspan="6">
                        <small>Most Affordable</small>
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
                        <small>Most Expensive</small>
                      </th>
                      <td className="col-6" scope="row" colspan="6">
                        {branddetails?.attributes?.name}{" "}
                        {
                          branddetails?.attributes?.mostExpensiveModel
                            ?.modelName
                        }{" "}
                        {branddetails?.attributes?.mostExpensiveModel?.trimName}
                      </td>
                    </tr>
                    <tr>
                      <th className="col-2" scope="row" colspan="6">
                        <small>Most Powerful</small>
                      </th>
                      <td className="col-6" scope="row" colspan="6">
                        {branddetails?.attributes?.name}{" "}
                        {branddetails?.attributes?.mostPowerfulModel?.modelName}{" "}
                        {branddetails?.attributes?.mostPowerfulModel?.trimName}
                      </td>
                    </tr>
                    <tr>
                      <th className="col-2" scope="row" colspan="6">
                        <small>Available Body Types</small>
                      </th>
                      <td className="col-6" scope="row" colspan="6">
                        {bodyTypeElements}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  );
}

export default CarListingLeftSidebar;

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const pageSize = 12;
  const brandSlugs = [query.brandname ? query.brandname : []];
  const bodyTypeSlugs = query.bodytype ? query.bodytype.split(",") : [];
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

  console.log(priceRange, "priceRange");

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
    `${process.env.NEXT_PUBLIC_API_URL}car-trims/filter?brands=${JSON.stringify(
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

  console.log(fuelTypeListres, "fuelTypeListres");

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

  const branddetails = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}car-brands/${brandSlugs}`
  );

  console.log(branddetails, "branddetails");

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
        branddetails: branddetails?.data,
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
