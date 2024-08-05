import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function OldModel({ model }) {
  const router = useRouter();

  const allYearMainTrims = model?.trims;
  // const currentYear = 2023
  const currentDate = new Date();
  const currentRealYear = currentDate?.getFullYear();

  const currentYear = Number(router?.query?.year);
  const [initialActiveTab, setInitialActiveTab] = useState(
    currentRealYear === currentYear ? currentYear - 1 : currentYear
  );
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [gliderPosition, setGliderPosition] = useState(0);

  const handleTabChange = (year) => {
    setActiveTab(year);
  };

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [Number(router.query.year)]);

  const sortedYears = allYearMainTrims
    .sort((a, b) => b?.year - a?.year)
    .filter((trim) =>
      Number(router.query.year) === currentRealYear
        ? trim.year !== currentRealYear
        : trim.year
    );

  const tabButtons = sortedYears?.map((car) => (
    <input
      type="radio"
      id={`radio-${car?.year}`}
      key={car?.year}
      name="tabs"
      checked={activeTab === car?.year}
      onChange={() => handleTabChange(car?.year)}
    />
  ));

  // const sortedYears = allYearMainTrims.filter(
  //   (car) => car?.year === currentYear
  // );

  const tabs = sortedYears?.map((car) => (
    <div
      className={`old-model-tab tab-pane fade ${
        activeTab === car?.year ? "show active" : ""
      }`}
      key={car?.year}
    >
      <Link href={`/brands/${model?.brand?.slug}/${car?.year}/${model?.slug}`}>
        <div className="old_model_container d-flex justify-content-center align-items-center w-50 mx-auto">
          <Image
            width={500}
            height={500}
            src={
              car?.featuredImage === null
                ? "/assets/img/car-placeholder.png"
                : car?.featuredImage
            }
            alt=""
          />

          <button className="p-2 white_bg_wrapper">
          <i class="bi bi-chevron-double-right"/>
          </button>
        </div>
      </Link>
      <Link href={`/brands/${model?.brand?.slug}/${car?.year}/${model?.slug}`}>
        <h5 className="d-flex justify-content-center align-items-center w-50 mx-auto fw-bold">
          {car?.year} {model.brand.name} {model.name}
        </h5>
      </Link>
    </div>
  ));

  useEffect(() => {
    const gliderIndex = sortedYears.findIndex((car) => car?.year === activeTab);
    setGliderPosition(gliderIndex * 100);
  }, [activeTab, sortedYears, router.query.year]);

  if (sortedYears.length === 0) {
    return null; // Hide the entire section if there are no old models
  }

  return (
    <>
      {sortedYears?.length === 0 ? null : (
        <div className="my-3">
          <div className="white_bg_wrapper position-relative">
     
            <h2 className={`w-100 fw-bold`}>
              Looking for an older {model?.brand?.name} {model?.name}?
            </h2>
            <hr className="my-2 heading-bottom " />

            <div className="tab-content mb-2">{tabs}</div>

            <div className="year_tab">
              <div className="container">
                <div className="tabs">
                  {tabButtons}
                  {sortedYears?.map((car) => (
                    <label
                      className={`tab ${
                        activeTab === car?.year ? "active" : ""
                      }`}
                      htmlFor={`radio-${car?.year}`}
                      key={car?.year}
                    >
                      {car?.year}
                    </label>
                  ))}
                  <span
                    className="glider"
                    style={{
                      transform: `translateX(${gliderPosition}%)`,
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
