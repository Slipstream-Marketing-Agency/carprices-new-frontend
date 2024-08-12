import Price from "@/src/utils/Price";
import React, { useEffect, useState } from "react";
import AccordionFaq from "../common/AccordionFaq";
import { formatNumberWithCommas } from "@/src/utils/formatNumber";

export default function VehicleFaq({
  year,
  brand,
  model,
  minPrice,
  maxPrice,
  minFuelConsumption,
  maxFuelConsumption,
  mainTrimFuelType,
  engineTypes,
  transmissionList,
  motorTypes,
  allTrims,
  mainTrim,
  getTransmissionType,
}) {
  const features = [
    mainTrim?.haveAppleCarPlay && "Apple CarPlay",
    mainTrim?.haveAndroidAuto && "Android Auto",
    mainTrim?.haveCruiseControl && "cruise control",
    mainTrim?.haveClimateControl && "climate control",
  ].filter(Boolean);

  const safetyFeatures = [
    mainTrim?.haveABS && "ABS",
    mainTrim?.haveFrontParkAssist && "front park assist",
  ].filter(Boolean);

  const range = allTrims
    ?.map((item) => item.range)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range[0];
  const maxRange = range[range.length - 1];

  let connectivity = "";
  if (mainTrim?.haveAppleCarPlay) {
    connectivity += "Apple CarPlay, ";
  }
  if (mainTrim?.haveAndroidAuto) {
    connectivity += "Android Auto, ";
  }

  const seamlessConnectivity = `${
    connectivity ? connectivity.slice(0, -2) : ""
  } compatibility for seamless connectivity`;

  const rearSeatEntertainment = mainTrim?.haveRearSeatEntertainment
    ? "and rear seat entertainment"
    : "";

  const outputString = `${seamlessConnectivity} ${rearSeatEntertainment}`;

  let cruiseControl = "";
  if (mainTrim?.haveAdaptiveCuriseControl) {
    cruiseControl += "cruise control, ";
  }
  if (mainTrim?.haveAdaptiveCuriseControl) {
    cruiseControl += "adaptive cruise control, ";
  }

  const laneChangeAssist = mainTrim?.haveLaneChangeAssist
    ? "lane change assist"
    : "";

  const safetyFeature = `${cruiseControl ? cruiseControl.slice(0, -2) : ""}${
    cruiseControl && laneChangeAssist ? ", " : ""
  }${laneChangeAssist}`;

  const outputSafetyString = `${safetyFeature}`;

  const faq = [
    {
      question: `What is the price range of the ${year} ${brand.name} ${model.name}?`,
      answer: (
        <>
          The {year} {brand.name} {model.name}{" "}
          {minPrice === maxPrice && minPrice !== null && minPrice !== null ? (
            <>
              {" "}
              is priced at <Price data={minPrice} />
            </>
          ) : (
            ""
          )}
          {minPrice !== maxPrice && minPrice !== null && minPrice !== null ? (
            <>
              is priced within the range of <Price data={minPrice} /> -{" "}
              <Price data={maxPrice} />
            </>
          ) : (
            ""
          )}
          {minPrice === null && maxPrice === null ? (
            <>
              {" "}
              is priced at <Price data={minPrice} />
            </>
          ) : (
            ""
          )}
        </>
      ),
      id: 1,
      condition: true,
    },
    {
      question: `How does the ${year} ${brand.name} ${model.name} perform in terms of acceleration and top speed?`,
      answer: `The ${year} ${brand.name} ${model.name} reaches 0 to 100km/h in ${mainTrim?.zeroToHundred}seconds and has a top speed of ${mainTrim?.topSpeed}km/h.`,
      id: 2,
      condition: true,
    },
    {
      question: `What is the range of the ${year} ${brand.name} ${model.name}?`,
      answer: `The ${year} ${brand.name} ${model.name} has a claimed range of ${
        minRange === maxRange ? minRange : minRange + "km - " + maxRange
      }km.`,
      id: 3,
      condition:
        mainTrim?.fuelType === "Electric" || mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What is the fuel efficiency of the ${year} ${brand.name} ${model.name}?`,
      answer: `The ${year} ${brand.name} ${
        model.name
      } has a claimed fuel efficiency of ${mainTrim?.fuelConsumption} kmpl${
        mainTrim?.range ? " and a range of " + mainTrim?.range + " km" : ""
      }.`,
      id: 11,
      condition:
        mainTrim?.fuelType === "Hybrid" ||
        mainTrim?.fuelType === "Petrol" ||
        mainTrim?.fuelType === "Diesel",
    },
    {
      question: `What type of engine and transmission does the ${year} ${brand.name} ${model.name} have?`,
      answer: (
        <>
          The {year} {brand.name} {model.name} is equipped with a{" "}
          {((mainTrim?.displacement || 0) / 1000).toFixed(1)}L{" "}
          {mainTrim?.engine} engine and is paired with {getTransmissionType()}{" "}
          transmission.
        </>
      ),
      id: 4,
      condition:
        mainTrim?.fuelType === "Hybrid" ||
        mainTrim?.fuelType === "Petrol" ||
        mainTrim?.fuelType === "Diesel",
    },
    {
      question: `What type of motor the ${year} ${brand.name} ${model.name} has?`,
      answer: `The ${year} ${brand.name} ${model.name} is equipped with a ${motorTypes}.`,
      id: 12,
      condition:
        mainTrim?.fuelType === "Electric" || mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What safety features are included in the ${year} ${brand.name} ${model.name}?`,
      answer: `Safety components of the ${year} ${brand.name} ${
        model.name
      } include ${
        mainTrim?.airbags ? mainTrim?.airbags + " airbags, " : ""
      }ABS, ${mainTrim?.haveFrontParkAssist ? "front park assist, " : ""}${
        mainTrim?.haveRearParkAssist ? "rear park assist, " : ""
      }${mainTrim?.have360ParkingCamera ? "360° parking camera, " : ""}${
        mainTrim?.haveAdaptiveCuriseControl ? "adaptive cruise control, " : ""
      }${mainTrim?.haveLaneChangeAssist ? "lane change assist" : ""}.`,
      id: 5,
      condition: true,
    },
    {
      question: `How many passengers can the ${year} ${brand.name} ${model.name} accommodate?
      `,
      answer: `The ${year} ${brand.name} ${
        model.name
      } has a seating capacity of ${
        mainTrim?.seatingCapacity && mainTrim?.seatingCapacity.split(" ")[0]
      } passengers.
      `,
      id: 6,
      condition: true,
    },
    {
      question: ` What are the exterior dimensions of the ${year} ${brand.name} ${model.name}?
      `,
      answer: `The ${year} ${brand.name} ${
        model.name
      } has dimensions of ${formatNumberWithCommas(
        mainTrim?.length
      )}mm length, ${formatNumberWithCommas(
        mainTrim?.width
      )}mm width, and ${formatNumberWithCommas(mainTrim?.height)}mm height.
      `,
      id: 7,
      condition: true,
    },
    {
      question: `What is the cargo space available in the ${year} ${brand.name} ${model.name}?
      `,
      answer: `The ${year} ${brand.name} ${model.name} has ${mainTrim?.cargoSpace}L of cargo space.`,
      id: 8,
      condition: true,
    },
    {
      question: `Does the ${year} ${brand.name} ${model.name} come with any driver assistance features?
      `,
      answer: `Yes, the ${year} ${brand.name} ${model.name} offers driver assistance features such as ${outputSafetyString} to enhance the driving experience.`,
      id: 9,
      condition: true,
    },
    {
      question: `What kind of connectivity and entertainment features are included in the ${year} ${brand.name} ${model.name}?
      `,
      answer: ` The ${year} ${brand.name} ${model.name} comes with ${outputString}.`,
      id: 10,
      condition: true,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="single-item white_bg_wrapper mb-50 mt-3" id="faqs">
      <div className="faq-area">
        <div className="title ">
          <h2 className={`w-100 fw-bold`}>
            {year} {brand.name} {model.name} FAQs
          </h2>
          <hr className="my-2 heading-bottom " />
          <div className="mt-3">
            {faq.map((item, index) => (
              <AccordionFaq
                question={item.question}
                answer={item.answer}
                condition={item?.condition}
              />
            ))}
          </div>
          <h2 className="tw-mt-8 tw-mb-3 tw-font-medium tw-text-2xl  tw-text-lightgray">
            FAQs (Frequently Asked Questions) on {year} {brand.name}{" "}
            {model.name}
          </h2>
          <div className="tw-w-full  tw-mx-auto tw-space-y-2 tw-mt-6">
            {faq.map((item, index) => (
              <>
                {item.condition && (
                  <div key={index} className="tw-border tw-rounded tw-bg-white">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="tw-w-full tw-px-4 tw-py-2 tw-text-left tw-flex tw-justify-between tw-items-center tw-bg-gray-100 tw-rounded-t"
                    >
                      <span>{item.question}</span>
                      <svg
                        className={`tw-w-6 tw-h-6 tw-transform ${
                          activeIndex === index ? "tw-rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`tw-overflow-hidden tw-transition-[max-height] tw-duration-500 ${
                        activeIndex === index
                          ? "tw-max-h-96 tw-p-0"
                          : "tw-max-h-0 tw-p-0"
                      }`}
                    >
                      <p className="tw-text-gray-700 tw-p-4">{item.answer}</p>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
