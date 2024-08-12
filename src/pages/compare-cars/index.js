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

function ComparePage({ car1Data, car2Data, car3Data, car4Data }) {
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
  const canAddMoreCars = cars && cars.length < 4;

  const carDataArray = [car1Data, car2Data, car3Data, car4Data];

  // Determine the number of cars already selected
  const numberOfSelectedCars = carDataArray.filter((car) => car).length;
  const numberOfSlotsToFill = isMobile ? 2 : 4 - numberOfSelectedCars;

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
      if (window.scrollY >= 600) {
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
      <div>
        <div className="tw-container tw-mx-auto">
          <h1>Compare Cars</h1>
          <p>
            Simplifying Your Decision-Making Process. Compare Your Ideal Cars
            with Our Comprehensive Tool – Price, Features, Specifications, Fuel
            Efficiency, Performance, Dimensions, Safety, and More for an
            Informed Purchase!
          </p>
          <div className="row g-4 mb-50">
            <div className="col-lg-12">
              <div className="uploded-product-group">
                <div className="tw-grid tw-grid-cols-12 tw-gap-3 ">
                  {/* {carDataArray.map(
                    (car, index) =>
                      car && <CompareCarCard key={index} carData={car} />
                  )} */}
                  {Array.from({ length: numberOfSlotsToFill }, (_, index) => (
                    <div
                      key={index}
                      className={`md:tw-col-span-3 tw-col-span-6 tw-flex tw-justify-center tw-items-center tw-border-solid tw-border tw-border-gray-200 tw-rounded-lg tw-h-[340px] `}
                    >
                      <MultiStepCarSelection mode="add" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ComparePage;

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  let car1Data, car2Data, car3Data, car4Data;

  if (slug) {
    const [mainSlug1, mainSlug2, mainSlug3, mainSlug4] = slug.split("-vs-");

    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      cache: new InMemoryCache(),
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

      car1Data =
        responses[0].status === "fulfilled"
          ? responses[0].value.data.carTrims.data[0]?.attributes
          : null;
      car2Data =
        responses[1].status === "fulfilled"
          ? responses[1].value.data.carTrims.data[0]?.attributes
          : null;
      car3Data =
        responses[2].status === "fulfilled"
          ? responses[2].value.data.carTrims.data[0]?.attributes
          : null;
      car4Data =
        responses[3].status === "fulfilled"
          ? responses[3].value.data.carTrims.data[0]?.attributes
          : null;
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

  return {
    props: {
      car1Data: car1Data || null,
      car2Data: car2Data || null,
      car3Data: car3Data || null,
      car4Data: car4Data || null,
    },
  };
}
