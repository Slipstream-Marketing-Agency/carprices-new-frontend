import React, { useEffect, useMemo, useRef, useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Autoplay, Navigation]);
import Link from "next/link";

import MainLayout from "@/src/layout/MainLayout";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import Image from "next/image";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import axios from "axios";
import Price from "@/src/utils/Price";
import CompareCarCard from "@/src/components-old/compare-cars/CompareCarCard";
import MultiStepCarSelection from "@/src/components-old/compare-cars/MultiStepCarSelection";
import CarComparisonTable from "@/src/components-old/compare-cars/CarComparisonTable";
import dynamic from "next/dynamic";

const CompareCarLazy = dynamic(
  () => import("../../../components-old/Home1/CompareCar/index"),
  {
    loading: () => <p>Loading comparison...</p>, // Optional loading placeholder
    ssr: true, // Set to false if this component is not critical for SEO
  }
);
function ComparePage({ car1Data, car2Data, car3Data, car4Data, compare }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const router = useRouter();
  const { slug } = router.query;
  const cars = slug?.split("-vs-");
  const canAddMoreCars = cars && cars.length < (isMobile ? 2 : 4);
  const toBeAddedLength = Array.from(
    { length: isMobile ? 2 - cars.length : 4 - cars.length },
    (_, index) => index + 1
  );

  const compateCareSettingsSlide = useMemo(() => {
    return {
      slidesPerView: 3,
      speed: 1500,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-3",
        prevEl: ".prev-3",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  });
  const carColorSlide = useMemo(() => {
    return {
      speed: 1500,
      spaceBetween: 40,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-2",
        prevEl: ".prev-2",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        420: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600 && window.scrollY <= 3400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tableData = [car1Data, car2Data, car3Data, car4Data].filter(
    (car) => car !== null
  );

  return (
    <MainLayout
      pageMeta={{
        title:
          "Compare Cars: Side-by-Side Comparison of Features, Specs, and Prices - Carprices.ae",
        description:
          "Find your perfect car match. Compare side by side, explore detailed specs, features, and pricing options. Make informed decisions with our easy car comparison tool.",
        type: "Car Review Website",
      }}
    >
      <div className="">
        <div className="tw-container">
        <div className="tw-grid tw-grid-cols-12 tw-gap-3">
          {/* {(car1Data && car2Data  ) &&(!car3Data && !car4Data) && !isMobile &&       <div className="col-6 col-lg-3"></div>} */}
          
          <CompareCarCard carData={car1Data} />
          <CompareCarCard carData={car2Data} />
          <CompareCarCard carData={car3Data} />
          <CompareCarCard carData={car4Data} />
          {canAddMoreCars &&
            toBeAddedLength.map((item, index) => (
              <div
                className={` ${
                  !isMobile && isSticky
                    ? "md:tw-col-span-3 tw-col-span-6"
                    : "md:tw-col-span-3 tw-col-span-6"
                }`}
                style={{
                  position: !isMobile && isSticky && "fixed",
                  bottom: !isMobile && "20px",
                  right: !isMobile && "0px",
                }}
              >
                <div className="tw-flex tw-justify-center tw-items-center tw-border-solid tw-border tw-border-gray-200 tw-rounded-lg tw-h-[340px]">
                  <MultiStepCarSelection mode="add" />
                </div>
              </div>
            ))}
        </div>
        </div>
        
        {/* <div className="row mb-50">
            <div className="col-lg-12 position-relative">
              <div className={`car-details-menu ${isSticky ? "sticky" : ""}`}>
                <nav id="navbar-example2" className="navbar">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link" href="#car-info">
                        Car Info
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#engine">
                        Engine
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#performance">
                        Performance
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#comfort">
                        Comfort
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#safety">
                        Safety
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#car-color">
                        Color
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#faqs">
                        FAQ’s
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#qus-ans">
                        Question &amp; Answer
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div> */}

        {<CarComparisonTable tableData={tableData} />}
      </div>
    </MainLayout>
  );
}

export default ComparePage;

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const [mainSlug1, mainSlug2, mainSlug3, mainSlug4] = slug.split("-vs-");

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
  const compareResponse = await client.query({
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
                      filters: { year: { eq: 2023 }, highTrim: { eq: true } }
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
  });

  const CAR_TRIMS_QUERY = gql`
    query carTrims($mainSlug: String!) {
      carTrims(filters: { mainSlug: { eq: $mainSlug } }) {
        data {
          id
          attributes {
            name
            metaTitle
            mainSlug
            description
            car_brands {
              data {
                id
                attributes {
                  name
                  brandLogo {
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
            car_models {
              data {
                id
                attributes {
                  name
                }
              }
            }
            year
            price
            featuredImage {
              data {
                attributes {
                  url
                }
              }
            }
            gallery_images {
              data {
                attributes {
                  url
                }
              }
            }
            engine
            displacement
            power
            torque
            transmission
            gearBox
            drive
            fuelType
            motor
            motorType
            batteryCapacity
            chargingTime
            batteryWarranty
            range
            zeroToHundred
            topSpeed
            fuelConsumption
            cylinders
            haveABS
            haveFrontAirbags
            haveSideAirbags
            haveRearAirbags
            haveFrontParkAssist
            haveRearParkAssist
            haveRearParkingCamera
            have360ParkingCamera
            haveCruiseControl
            haveAdaptiveCruiseControl
            haveLaneChangeAssist
            car_body_types {
              data {
                id
                attributes {
                  name
                }
              }
            }
            airbags
            doors
            frontBrakes
            rearBrakes
            length
            width
            height
            wheelbase
            weight
            wheels
            tyresFront
            tyresRear
            seatingCapacity
            haveLeatherInterior
            haveFabricInterior
            haveAppleCarPlay
            haveAndroidAuto
            haveRearSeatEntertainment
            haveCooledSeats
            haveClimateControl
            isLuxury
            isPremiumLuxury
            isSafety
            isFuelEfficient
            isOffRoad
            haveMusic
            haveTechnology
            havePerformance
            isSpacious
            isElectric
            isDiscontinued
            slug
            fuelTankSize
            cargoSpace
            highTrim
          }
        }
      }
    }
  `;

  try {
    const responses = await Promise.allSettled([
      client.query({
        query: CAR_TRIMS_QUERY,
        variables: { mainSlug: mainSlug1 },
      }),
      client.query({
        query: CAR_TRIMS_QUERY,
        variables: { mainSlug: mainSlug2 },
      }),
      client.query({
        query: CAR_TRIMS_QUERY,
        variables: { mainSlug: mainSlug3 },
      }),
      client.query({
        query: CAR_TRIMS_QUERY,
        variables: { mainSlug: mainSlug4 },
      }),
    ]);

    return {
      props: {
        compare: compareResponse?.data?.compareCars?.data,
        car1Data:
          responses[0].status === "fulfilled"
            ? responses[0].value.data.carTrims.data[0]?.attributes
            : null,
        car2Data:
          responses[1].status === "fulfilled"
            ? responses[1].value.data.carTrims.data[0]?.attributes
            : null,
        car3Data:
          responses[2].status === "fulfilled"
            ? responses[2].value.data.carTrims.data[0]?.attributes
            : null,
        car4Data:
          responses[3].status === "fulfilled"
            ? responses[3].value.data.carTrims.data[0]?.attributes
            : null,
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
