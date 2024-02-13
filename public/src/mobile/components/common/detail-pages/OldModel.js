import React, { useState } from "react";
import FeaturedImage from "../FeaturedImage";
import Link from "next/link";

export default function OldModel({ model }) {
  const allYearMainTrims = model.allYearMainTrims;
  const [activeTab, setActiveTab] = useState(allYearMainTrims[0].year);

  const handleTabChange = (year) => {
    setActiveTab(year);
  };

  const sortedYears = allYearMainTrims.sort((a, b) => b - a);

  const tabButtons = sortedYears.map((car) => (
    <input
      type="radio"
      id={`radio-${car.year}`}
      key={car.year}
      name="tabs"
      checked={activeTab === car.year}
      onChange={() => handleTabChange(car.year)}
    />
  ));

  const tabs = allYearMainTrims.map((car) => (
    <div
      className={`tab-pane fade ${activeTab === car.year ? "show active" : ""}`}
      key={car.year}
    >
      <Link href={`/brands/${model?.brand?.slug}/${car?.year}/${model?.slug}`}>
        <div className="d-flex justify-content-center align-items-center w-50  mx-auto">
          <FeaturedImage width={100} height={100} src={car.featuredImage} alt="" />
        </div>
      </Link>
      <Link href={`/brands/${model?.brand?.slug}/${car?.year}/${car?.slug}`}>
        <h5 className="d-flex justify-content-center align-items-center w-50 mx-auto fw-bold">
          {car.year} {model.brand.name} {model.name}
        </h5>
      </Link>
    </div>
  ));
  return (
    <section className="my-2">
      <div className="card_wrapper position-relative">
        <h4 className="fw-bold">
          Looking for an older {model?.brand?.name} {model?.name}?
        </h4>

        <div className="tab-content mb-2">{tabs}</div>

        <div className="year_tab">
          <div className="container">
            <div className="tabs">
              {tabButtons}
              {allYearMainTrims.map((car) => (
                <label
                  className="tab"
                  htmlFor={`radio-${car.year}`}
                  key={car.year}
                >
                  {car.year}
                </label>
              ))}
              <span
                className="glider"
                style={{
                  transform: `translateX(${
                    allYearMainTrims.findIndex(
                      (car) => car.year === activeTab
                    ) * 100
                  }%)`,
                }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
