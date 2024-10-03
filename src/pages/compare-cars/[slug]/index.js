import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Autoplay, Navigation]);
import MainLayout from "@/src/layout/MainLayout";
import CompareCarCard from "@/src/components-old/compare-cars/CompareCarCard";
import MultiStepCarSelection from "@/src/components-old/compare-cars/MultiStepCarSelection";
import CarComparisonTable from "@/src/components-old/compare-cars/CarComparisonTable";
import axios from "axios";

function ComparePage({ carData }) {

  console.log(carData,"vvvvvvvs");
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cars = carData.filter((car) => car !== null);
  const canAddMoreCars = cars.length < (isMobile ? 2 : 4);
  const toBeAddedLength = Array.from(
    { length: isMobile ? 2 - cars.length : 4 - cars.length },
    (_, index) => index + 1
  );

  const tableData = carData.filter((car) => car !== null);

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
      <div className="tw-container">
        <div className="tw-grid tw-grid-cols-12 tw-gap-3">
          {/* Render the car comparison cards */}
          {cars.map((carData, index) => (
            <CompareCarCard key={index} carData={carData} />
          ))}

          {/* Option to add more cars */}
          {canAddMoreCars &&
            toBeAddedLength.map((item, index) => (
              <div key={index} className="md:tw-col-span-3 tw-col-span-6">
                <div className="tw-flex tw-justify-center tw-items-center tw-border-solid tw-border tw-border-gray-200 tw-rounded-lg tw-h-[340px]">
                  <MultiStepCarSelection mode="add" />
                </div>
              </div>
            ))}
        </div>

        {/* Render the comparison table if there is data */}
        {tableData.length > 0 && <CarComparisonTable tableData={tableData} />}
      </div>
    </MainLayout>
  );
}

export default ComparePage;

// Server-side function to fetch car data
export async function getServerSideProps(context) {
  const slug = context.query.slug;

  console.log(slug,"ldjsdfsd");
  

  // Fetch car comparison data for the entire slug
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-trims/compare/${slug}`
    );

    return {
      props: {
        carData: response.data?.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    return {
      props: {
        carData: [],
      },
    };
  }
}
