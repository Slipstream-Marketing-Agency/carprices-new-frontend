import Footer1 from "../components/Footer/Footer1";
import Header from "../components/Home1/Header";
import Topbar from "../components/Home1/Topbar";
import BrandCategory from "../components/Home1/BrandCategory";
import CompareCar from "../components/Home1/CompareCar/index";
import Modals from "../components/Home1/Modals";
import Blog from "../components/Home1/Blog/index";
import Ad728x90 from "../components/ads/Ad728x90";
import GoToTopButton from "../components/goToTop";
import axios from "axios";
import ProductCard from "../components/Home1/ProductCard";
import { createApolloClient } from "../lib/apolloClient";
import { useRouter } from "next/router";
import useTranslate from "../utils/useTranslate";
import Ad300x600 from "../components/ads/Ad300x600";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BodyTypes from "../components/Home1/BodyTypes";

const BannerLazy = dynamic(() => import("../components/Home1/Banner/index"), {
  loading: () => <p>Loading banner...</p>, // Optional loading placeholder
  ssr: true, // Keep it true if the component is important for SEO
});

const ProductCard1Lazy = dynamic(
  () => import("../components/Home1/ProductCard"),
  {
    loading: () => <p>Loading products...</p>, // Optional loading placeholder
    ssr: true,
  }
);
const ProductCard2Lazy = dynamic(
  () => import("../components/Home1/ProductCard"),
  {
    loading: () => <p>Loading products...</p>, // Optional loading placeholder
    ssr: true,
  }
);
const ProductCard3Lazy = dynamic(
  () => import("../components/Home1/ProductCard"),
  {
    loading: () => <p>Loading products...</p>, // Optional loading placeholder
    ssr: true,
  }
);

const CompareCarLazy = dynamic(
  () => import("../components/Home1/CompareCar/index"),
  {
    loading: () => <p>Loading comparison...</p>, // Optional loading placeholder
    ssr: true, // Set to false if this component is not critical for SEO
  }
);

export default function Home({
  homeData,
  error,
  errorMessage,
  popularcars,
  featuredcars,
  electriccars,
  popularBrands,
  compare,
  news,
  reviews,
  bodyTypeList,
}) {
  const router = useRouter();

  console.log(bodyTypeList, "bodyTypeList");

  const t = useTranslate();
  let isRtl = router.locale === "ar";

  console.log(compare, "datadatadatadata");
  if (error) {
    return <div>Error: {errorMessage}</div>;
  }

  const [loadCompareCar, setLoadCompareCar] = useState(false);
  const compareCarRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadCompareCar(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the placeholder is visible
    );

    if (compareCarRef.current) {
      observer.observe(compareCarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Modals />
      <Topbar />
      <Header />
      <Ad728x90 dataAdSlot="5962627056" />
      <BannerLazy homeData={homeData} />
      {/* <QuickLinkArea /> */}
      <Ad728x90 dataAdSlot="6306241985" />
      {/* <ProductCard
        subTitle={"Most Popular"}
        heading={"Most Popular New Cars"}
        carDetails={popularcars}
      /> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
            <ProductCard1Lazy
              subTitle={"Most Popular"}
              heading={t.PopularNewCars}
              carDetails={popularcars}
            />
            <Ad728x90 dataAdSlot="4367254600" />
            <ProductCard2Lazy
              subTitle={"Most Popular"}
              heading={t.featuredcar}
              carDetails={featuredcars}
            />
            <Ad728x90 dataAdSlot="3054172934" />
            <ProductCard3Lazy
              subTitle={"Most Popular"}
              heading={t.carElectric}
              carDetails={electriccars}
            />
            <Ad728x90 dataAdSlot="7427751965" />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 my-3 hideOnSmallScreen">
            <div className="sticky_scroll">
              <Ad300x600 dataAdSlot="3792539533" />
            </div>
          </div>
        </div>
      </div>

      {/* <FeaturedNewCars
        subTitle={"Newly Featured"}
        heading={"Featured New Cars"}
        carDetails={carDetails}
      /> */}
      {/* <NewPopularBrands brandsData={brands}  /> */}
      {/* <UpcomingCars  subTitle={"Most Popular"}
        heading={"Most Popular New Cars"}
        carDetails={popularcars}/> */}
      {/* <RecomandationCar /> */}
      {/* <TopRateUsedCars /> */}

      <CompareCarLazy compare={compare} />

      <Ad728x90 dataAdSlot="5962627056" />

      {/* <WhyChoose /> */}
      {/* <ShopCard /> */}
      {/* <Testimonial /> */}
      <BrandCategory brandDetails={popularBrands} />
      <Ad728x90 dataAdSlot="5962627056" />
      <BodyTypes bodyTypeList={bodyTypeList} />
      <Ad728x90 dataAdSlot="3488506956" />
      <Blog
        heading={t.Carnews}
        btnTitle={t.viewnews}
        blogApiData={news}
        isNews={true}
      />
      <Ad728x90 dataAdSlot="8972714021" />
      <Blog
        heading={t.reviews}
        btnTitle={t.viewreview}
        blogApiData={reviews}
        isNews={false}
      />

      <Footer1 />
      <GoToTopButton />
    </>
  );
}

export async function getServerSideProps() {
  const client = createApolloClient();

  const getBlogQuery = (category) => {
    const newsQuery = gql`
    query{
     articles(filters:{article_type:{type:{eq:"${category}"}}},pagination:{limit:6},sort:"createdAt:desc"){
       data{
         attributes{
           title
           slug
           content
           createdAt
           author{
             data{
               attributes{
                 name
                 publishedAt
               }
             }
           }
           coverImage{
             data{
               attributes{
                 url
                 width
                 height
               }
             }
           }
         
         }
       }
     }
   }
  `;
    return newsQuery;
  };

  try {
    // Parallel API calls for different car sections
    const [
      newsData,
      reviewsData,
      popularCarsResponse,
      featuredCarsResponse,
      electricCarsResponse,
      popularBrandsResponse,
      compareResponse,
    ] = await Promise.all([
      client.query({ query: getBlogQuery("News") }),
      client.query({ query: getBlogQuery("Review") }),
      client.query({
        query: gql`
          query CarSections {
            carSections(filters: { name: { eq: "Popular Cars" } }) {
              data {
                id
                attributes {
                  name
                  car_models(filters: { year: { eq: 2023 } }) {
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
                            }
                          }
                        }
                        year
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
                  }
                }
              }
            }
          }
        `,
      }), // popular cars query
      client.query({
        query: gql`
          query CarSections {
            carSections(filters: { name: { eq: "Featured Cars" } }) {
              data {
                id
                attributes {
                  name
                  car_models(filters: { year: { eq: 2023 } }) {
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
                            }
                          }
                        }
                        year
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
                  }
                }
              }
            }
          }
        `,
      }), // featured cars query
      client.query({
        query: gql`
          query CarSections {
            carSections(filters: { name: { eq: "Popular Electric Cars" } }) {
              data {
                id
                attributes {
                  name
                  car_models(filters: { year: { eq: 2023 } }) {
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
                            }
                          }
                        }
                        year
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
                  }
                }
              }
            }
          }
        `,
      }), // electric cars query
      client.query({
        query: gql`
          query brandSections {
            brandSections(filters: { name: { eq: "Popular Brands" } }) {
              data {
                id
                attributes {
                  name
                  car_brands(pagination: { limit: 12 }) {
                    data {
                      id
                      attributes {
                        name
                        brandLogo {
                          data {
                            id
                            attributes {
                              name
                              url
                            }
                          }
                        }
                        slug
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }), // popular brands query
      client.query({
        query: gql`
          query CompareCars {
            compareCars {
              data {
                id
                attributes {
                  comparison
                  car_models {
                    data {
                      id
                      attributes {
                        name
                        car_brands {
                          data {
                            id
                            attributes {
                              name
                              slug
                            }
                          }
                        }
                        car_trims(
                          filters: {
                            year: { eq: 2023 }
                            highTrim: { eq: true }
                          }
                        ) {
                          data {
                            id
                            attributes {
                              name
                              slug
                              mainSlug
                              featuredImage {
                                data {
                                  id
                                  attributes {
                                    url
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    ]);

    

    const axiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}pages/1?populate[0]=Sections,Sections.image`
    );

    const bodyTypeList = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-trims/bodyList`
    );

    return {
      props: {
        homeData: axiosResponse?.data?.data?.attributes?.Sections[0],
        popularcars:
          popularCarsResponse?.data?.carSections?.data[0]?.attributes
            ?.car_models?.data,
        featuredcars:
          featuredCarsResponse?.data?.carSections?.data[0]?.attributes
            ?.car_models?.data,
        electriccars:
          electricCarsResponse?.data?.carSections?.data[0]?.attributes
            ?.car_models?.data,
        popularBrands:
          popularBrandsResponse?.data?.brandSections?.data[0]?.attributes
            ?.car_brands?.data,
        compare: compareResponse?.data?.compareCars?.data,
        news: newsData?.data?.articles?.data || {},
        reviews: reviewsData?.data?.articles?.data || {},
        bodyTypeList: bodyTypeList?.data?.bodyTypes,
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
