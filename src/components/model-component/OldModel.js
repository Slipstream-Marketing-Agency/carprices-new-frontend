import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function OldModel({ model, currentYear }) {
  const currentDate = new Date();
  const currentRealYear = currentDate.getFullYear();

  // Accessing the "year" from searchParams
  // const currentYear = Number(searchParams.get('year')) || currentRealYear;

  const allYearMainTrims = model?.trims;
  const [initialActiveTab, setInitialActiveTab] = useState(
    currentYear
  );
  // const [initialActiveTab, setInitialActiveTab] = useState(
  //   currentRealYear === currentYear ? currentYear - 1 : currentYear
  // );
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [gliderPosition, setGliderPosition] = useState(0);

  const handleTabChange = (year) => {
    setActiveTab(year);
  };

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [currentYear]);

  // const sortedYears = allYearMainTrims
  //   .sort((a, b) => b?.year - a?.year)
  //   .filter((trim) =>
  //     currentYear === currentRealYear ? trim.year !== currentRealYear : trim.year
  //   );
  const sortedYears = allYearMainTrims
  .sort((a, b) => b?.year - a?.year);

  const tabButtons = sortedYears?.map((car) => (
    <input
      type="radio"
      id={`radio-${car?.year}`}
      key={car?.year}
      name="tabs"
      checked={activeTab === car?.year}
      onChange={() => handleTabChange(car?.year)}
      className="hidden"
    />
  ));

  const tabs = sortedYears?.map((car) => (
    <div
      className={`tab-pane fade ${activeTab === car?.year ? "block" : "hidden"}`}
      key={car?.year}
    >
      <Link href={`/brands/${model?.brand?.slug}/${car?.year}/${model?.slug}`}>
        <div className="flex justify-center items-center w-1/2 mx-auto">
          <Image
            width={500}
            height={500}
            src={
              car?.featuredImage === null
                ? "/assets/img/car-placeholder.png"
                : car?.featuredImage
            }
            alt={model.name}
            className="object-cover"
          />
          <button className="p-2 bg-white border rounded-full ml-2">
            <i className="bi bi-chevron-double-right" />
          </button>
        </div>
      </Link>
      <Link href={`/brands/${model?.brand?.slug}/${car?.year}/${model?.slug}`}>
        <h5 className="flex justify-center items-center w-1/2 mx-auto font-bold">
          {car?.year} {model.brand.name} {model.name}
        </h5>
      </Link>
    </div>
  ));

  useEffect(() => {
    const gliderIndex = sortedYears.findIndex((car) => car?.year === activeTab);
    setGliderPosition(gliderIndex * 100);
  }, [activeTab, sortedYears, currentYear]);

  if (sortedYears.length === 0) {
    return null; // Hide the entire section if there are no old models
  }

  return (
    <>
      <h2 className="font-semibold mb-5">
        Looking for an older {model?.brand?.name} {model?.name}?
      </h2>
      {sortedYears?.length === 0 ? null : (
        <div className="border border-gray-300 rounded-lg p-5">
          <div className="relative">
            <div className="mb-2">{tabs}</div>

            <div className="year_tab">
              <div className="container mx-auto">
                <div className="tabs !bg-white flex justify-between">
                  {tabButtons}
                  {sortedYears?.map((car) => (
                    <Link key={car?.year} className={`tab py-2 px-4 rounded-md cursor-pointer ${activeTab === car?.year
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                      }`} href={`/brands/${model?.brand?.slug}/${car?.year}/${model?.slug}`}>
                      <label
                        className={`tab py-2 px-4 rounded-md cursor-pointer ${activeTab === car?.year
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                          }`}
                        htmlFor={`radio-${car?.year}`}
                        key={car?.year}
                      >
                        {car?.year}
                      </label>
                    </Link>
                  ))}
                  <span
                    className="glider absolute bottom-0 left-0 h-1  transition-transform duration-300"
                    style={{
                      transform: `translateX(${gliderPosition}%)`,
                      width: "100px",
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
