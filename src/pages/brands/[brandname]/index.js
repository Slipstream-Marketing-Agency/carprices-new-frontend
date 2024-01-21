import React, { useState } from "react";
import Link from "next/link";
import MainLayout from "@/src/layout/MainLayout";
import ProductSearch from "@/src/components/common/ProductSearch";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ProductCard from "@/src/components/Home1/ProductCard";
import ProductCardList from "@/src/components/filter/ProductCardList";
import Pagination from "@/src/utils/Pagination";
import { MultiSelect } from "react-multi-select-component";
import CarLeftSidebar from "@/src/utils/CarLeftSidebar";
import ProductSideFilterList from "@/src/components/filter/ProductSideFilterList";

export default function index({
  brands,
  currentPage,
  totalPages,
  bodyTypeList,
}) {
  console.log(bodyTypeList, "bodyTypeList");
  const [activeClass, setActiveClass] = useState("grid-group-wrapper"); // Initial class is "grid-group-wrapper"

  console.log(brands, "lllllllll");
  const toggleView = () => {
    setActiveClass(
      activeClass === "grid-group-wrapper"
        ? "list-group-wrapper"
        : "grid-group-wrapper"
    );
  };
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBody, setSelectedBody] = useState([]);
  // const brandoptions = brandList.map((brand) => ({
  //   label: brand.attributes.name,
  //   value: brand.attributes.slug,
  // }));

  // const bodyoptions = bodyTypeList.map((body) => ({
  //   label: body.attributes.name,
  //   value: body.attributes.slug,
  // }));
  const bodyoptions = bodyTypeList?.map((body) => ({
    label: body.attributes.name,
    value: body.attributes.slug,
  }));
  return (
    <MainLayout>
      <div className="inner-page-banner">
        <div className="banner-wrapper">
          <div className="container-fluid">
            <div className="banner-main-content-wrap">
              <div className="row">
                <div className="col-xl-6 col-lg-7 d-flex align-items-center">
                  <div className="banner-content">
                    <div className="text-center mb-3">
                      <img
                        src={
                          brands[0]?.attributes?.car_brands?.data[0]?.attributes
                            ?.brandLogo?.data?.attributes?.url
                        }
                        width={70}
                        height={70}
                        alt="brand icon"
                      />
                    </div>
                    <h2>
                      {
                        "Abarth Car Prices, Latest Models, Reviews & Comparison In UAE"
                      }
                    </h2>
                    <hr style={{ color: "#275ba7" }} />
                    <p>Here are the prices for all New Abarth Cars in UAE</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-5 d-lg-flex d-none align-items-center justify-content-end">
                  <div className="banner-img">
                    <img
                      src={
                        brands[0]?.attributes?.car_brands?.data[0]?.attributes
                          ?.coverImage?.data?.attributes?.url
                      }
                      alt="brand car"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-page mt-15 mb-100">
        <div className="container">
          <div className="row g-xl-4 gy-5">
            <CarLeftSidebar
              bodyoptions={bodyoptions}
            />
            <div className="col-xl-9 order-xl-2 order-1">
              <div className="row mb-40">
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
                      <div className="view">
                        <ul className="btn-group list-grid-btn-group">
                          <li
                            className={`${
                              activeClass === "grid-group-wrapper"
                                ? "active"
                                : ""
                            } grid`}
                            onClick={toggleView}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={14}
                              viewBox="0 0 14 14"
                            >
                              <mask
                                id="mask0_1631_19"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={14}
                                height={14}
                              >
                                <rect width={14} height={14} fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_1631_19)">
                                <path d="M5.47853 6.08726H0.608726C0.272536 6.08726 0 5.81472 0 5.47853V0.608726C0 0.272536 0.272536 0 0.608726 0H5.47853C5.81472 0 6.08726 0.272536 6.08726 0.608726V5.47853C6.08726 5.81472 5.81472 6.08726 5.47853 6.08726Z" />
                                <path d="M13.3911 6.08726H8.52132C8.18513 6.08726 7.9126 5.81472 7.9126 5.47853V0.608726C7.9126 0.272536 8.18513 0 8.52132 0H13.3911C13.7273 0 13.9999 0.272536 13.9999 0.608726V5.47853C13.9999 5.81472 13.7273 6.08726 13.3911 6.08726Z" />
                                <path d="M5.47853 14.0013H0.608726C0.272536 14.0013 0 13.7288 0 13.3926V8.52279C0 8.1866 0.272536 7.91406 0.608726 7.91406H5.47853C5.81472 7.91406 6.08726 8.1866 6.08726 8.52279V13.3926C6.08726 13.7288 5.81472 14.0013 5.47853 14.0013Z" />
                                <path d="M13.3916 14.0013H8.52181C8.18562 14.0013 7.91309 13.7288 7.91309 13.3926V8.52279C7.91309 8.1866 8.18562 7.91406 8.52181 7.91406H13.3916C13.7278 7.91406 14.0003 8.1866 14.0003 8.52279V13.3926C14.0003 13.7288 13.7278 14.0013 13.3916 14.0013Z" />
                              </g>
                            </svg>
                          </li>
                          <li
                            className={`${
                              activeClass === "list-group-wrapper"
                                ? "active"
                                : ""
                            } lists`}
                            onClick={toggleView}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={14}
                              viewBox="0 0 14 14"
                            >
                              <mask
                                id="mask0_1631_3"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={14}
                                height={14}
                              >
                                <rect width={14} height={14} fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_1631_3)">
                                <path d="M1.21747 2C0.545203 2 0 2.55848 0 3.24765C0 3.93632 0.545203 4.49433 1.21747 4.49433C1.88974 4.49433 2.43494 3.93632 2.43494 3.24765C2.43494 2.55848 1.88974 2 1.21747 2Z" />
                                <path d="M1.21747 5.75195C0.545203 5.75195 0 6.30996 0 6.99913C0 7.68781 0.545203 8.24628 1.21747 8.24628C1.88974 8.24628 2.43494 7.68781 2.43494 6.99913C2.43494 6.30996 1.88974 5.75195 1.21747 5.75195Z" />
                                <path d="M1.21747 9.50586C0.545203 9.50586 0 10.0643 0 10.753C0 11.4417 0.545203 12.0002 1.21747 12.0002C1.88974 12.0002 2.43494 11.4417 2.43494 10.753C2.43494 10.0643 1.88974 9.50586 1.21747 9.50586Z" />
                                <path d="M13.0845 2.31055H4.42429C3.91874 2.31055 3.50879 2.7305 3.50879 3.24886C3.50879 3.76677 3.91871 4.1867 4.42429 4.1867H13.0845C13.59 4.1867 14 3.76677 14 3.24886C14 2.7305 13.59 2.31055 13.0845 2.31055Z" />
                                <path d="M13.0845 6.06055H4.42429C3.91874 6.06055 3.50879 6.48047 3.50879 6.99886C3.50879 7.51677 3.91871 7.9367 4.42429 7.9367H13.0845C13.59 7.9367 14 7.51677 14 6.99886C14 6.48047 13.59 6.06055 13.0845 6.06055Z" />
                                <path d="M13.0845 9.81348H4.42429C3.91874 9.81348 3.50879 10.2334 3.50879 10.7513C3.50879 11.2692 3.91871 11.6891 4.42429 11.6891H13.0845C13.59 11.6891 14 11.2692 14 10.7513C14 10.2334 13.59 9.81348 13.0845 9.81348Z" />
                              </g>
                            </svg>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-grid-main">
                <div className={`list-grid-product-wrap ${activeClass}`}>
                  <div className="row g-4 mb-40">
                    <ProductSideFilterList carDetails={brands} />
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const pageSize = 15;
  const brandSlugs = "abarth";
  const bodyTypeSlugs = query.bodytype ? query.bodytype.split(",") : [];

  const parsePriceRange = (rangeStr) => {
    return rangeStr.split(",").map((range) => {
      const [min, max] = range.split("-");
      return { price: { gte: parseInt(min), lte: parseInt(max) || null } }; // Assuming null for open-ended ranges
    });
  };

  const parsePowerRange = (rangeStr) => {
    return rangeStr.split(",").map((range) => {
      const [min, max] = range.split("-");
      return { power: { gte: parseInt(min), lte: parseInt(max) || null } }; // Assuming null for open-ended ranges
    });
  };
  const parseDisplacementRange = (rangeStr) => {
    return rangeStr.split(",").map((range) => {
      const [min, max] = range.split("-");
      return {
        displacement: { gte: parseInt(min), lte: parseInt(max) || null },
      }; // Assuming null for open-ended ranges
    });
  };
  const priceRanges = query.price ? parsePriceRange(query.price) : [];
  const powerRanges = query.power ? parsePowerRange(query.power) : [];
  const displacementRanges = query.displacement
    ? parseDisplacementRange(query.displacement)
    : [];

  // const powerRanges = query.power ? parseRange(query.power) : [];
  // const displacementRanges = query.displacement
  //   ? parseRange(query.displacement)
  //   : [];

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  try {
    const brandsData =
      bodyTypeSlugs.length > 0
        ? (console.log("Body type filter only"),
          await client.query({
            query: gql`
              query carModels(
                $brandSlugs: String
                $bodyTypeSlugs: [String!]
                $page: Int
                $pageSize: Int
                $priceRanges: [CarTrimFiltersInput!]
                $powerRanges: [CarTrimFiltersInput!]
                $displacementRanges: [CarTrimFiltersInput!]
              ) {
                carModels(
                  filters: {
                    car_trims: {
                      and: [
                        { or: $priceRanges }
                        { or: $powerRanges }
                        { or: $displacementRanges }
                      ]
                      car_brands: { slug: { eq: $brandSlugs } }
                      car_body_types: { slug: { in: $bodyTypeSlugs } }
                      highTrim: { eq: true }
                      year: { eq: 2023 }
                    }
                  }
                  pagination: { page: $page, pageSize: $pageSize }
                ) {
                  data {
                    id
                    attributes {
                      name
                      year
                      slug
                      car_brands {
                        data {
                          id
                          attributes {
                            name
                            slug
                            brandLogo {
                              data {
                                id
                                attributes {
                                  name
                                  url
                                }
                              }
                            }
                            coverImage {
                              data {
                                id
                                attributes {
                                  name
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                      isFeatured
                      isElectric
                      featuredImage {
                        data {
                          id
                          attributes {
                            name
                            url
                          }
                        }
                      }
                      car_trims(
                        filters: { year: { eq: 2023 } }
                        sort: "name:asc"
                      ) {
                        data {
                          id
                          attributes {
                            name
                            featuredImage {
                              data {
                                id
                                attributes {
                                  name
                                  url
                                }
                              }
                            }
                            price
                            highTrim
                            year
                          }
                        }
                      }
                    }
                  }
                  meta {
                    pagination {
                      page
                      pageSize
                      pageCount
                      total
                    }
                  }
                }
              }
            `,
            variables: {
              brandSlugs,
              bodyTypeSlugs,
              page,
              pageSize,
              priceRanges,
              powerRanges,
              displacementRanges,
            },
          }))
        : bodyTypeSlugs.length == 0
        ? (console.log(priceRanges, "No filters"),
          await client.query({
            query: gql`
              query carModels(
                $page: Int
                $pageSize: Int
                $brandSlugs: String
                $priceRanges: [CarTrimFiltersInput!]
                $powerRanges: [CarTrimFiltersInput!]
                $displacementRanges: [CarTrimFiltersInput!]
              ) {
                carModels(
                  filters: {
                    car_trims: {
                      and: [
                        { or: $priceRanges }
                        { or: $powerRanges }
                        { or: $displacementRanges }
                      ]
                      car_brands: { slug: { eq: $brandSlugs } }
                      year: { eq: 2023 }
                    }
                  }

                  pagination: { page: $page, pageSize: $pageSize }
                ) {
                  data {
                    id
                    attributes {
                      name
                      year
                      slug
                      car_brands {
                        data {
                          id
                          attributes {
                            name
                            slug
                            brandLogo {
                              data {
                                id
                                attributes {
                                  name
                                  url
                                }
                              }
                            }
                            coverImage {
                              data {
                                id
                                attributes {
                                  name
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                      isFeatured
                      isElectric
                      featuredImage {
                        data {
                          id
                          attributes {
                            name
                            url
                          }
                        }
                      }
                      car_trims(filters: { year: { eq: 2023 } }) {
                        data {
                          id
                          attributes {
                            name
                            featuredImage {
                              data {
                                id
                                attributes {
                                  name
                                  url
                                }
                              }
                            }
                            price
                            highTrim
                            year
                          }
                        }
                      }
                    }
                  }
                  meta {
                    pagination {
                      page
                      pageSize
                      pageCount
                      total
                    }
                  }
                }
              }
            `,
            variables: {
              brandSlugs,
              page,
              pageSize,
              priceRanges,
              powerRanges,
              displacementRanges,
            },
          }))
        : null;

    const bodyTypeList = await client.query({
      query: gql`
        query carBodyTypes($brandSlugs: String) {
          carBodyTypes(
            filters: {
              car_trims: { car_brands: { slug: { eq: $brandSlugs } } }
            }
            sort: "name:asc"
            pagination: { limit: -1 }
          ) {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
        }
      `,
      variables: {
        brandSlugs,
      },
    });
    console.log(bodyTypeList, "bodyTypeList");
    return {
      props: {
        brands: brandsData?.data?.carModels?.data,
        totalBrands: brandsData?.data?.carModels?.meta?.pagination?.total,
        totalPages: brandsData?.data?.carModels?.meta?.pagination?.pageCount,
        currentPage: page,
        bodyTypeList: bodyTypeList?.data?.carBodyTypes?.data,
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
