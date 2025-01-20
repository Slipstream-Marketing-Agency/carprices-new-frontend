import Price from "@/utils/Price";
import React, { useEffect, useState } from "react";
import AccordionFaq from "../common/AccordionFaq";
import Head from "next/head";
import { formatNumberWithCommas } from "@/utils/formatNumber";

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

  const seamlessConnectivity = `${connectivity ? connectivity.slice(0, -2) : ""
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

  const safetyFeature = `${cruiseControl ? cruiseControl.slice(0, -2) : ""}${cruiseControl && laneChangeAssist ? ", " : ""
    }${laneChangeAssist}`;

  const outputSafetyString = `${safetyFeature}`;

  const faq = [
    {
      question: `What is the price range of the ${year} ${brand.name} ${model.name} in UAE?`,
      answer: (
        <>
          The {year} {brand.name} {model.name}{" "}
          {minPrice === maxPrice && minPrice !== null ? (
            <> is priced at <Price data={minPrice} /></>
          ) : minPrice !== maxPrice && minPrice !== null ? (
            <>is priced within the range of <Price data={minPrice} /> - <Price data={maxPrice} /></>
          ) : minPrice === null && maxPrice === null ? (
            <> is priced at <Price data={minPrice} /></>
          ) : ""}
        </>
      ),
      plainAnswer: minPrice === maxPrice && minPrice !== null
        ? `The ${year} ${brand.name} ${model.name} is priced at AED ${minPrice.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}.`
        : minPrice !== maxPrice && minPrice !== null
          ? `The ${year} ${brand.name} ${model.name} is priced within the range of AED ${minPrice.toLocaleString("en-AE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })} - AED ${maxPrice.toLocaleString("en-AE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}.`
          : minPrice === null && maxPrice === null
            ? `The ${year} ${brand.name} ${model.name} is priced at TBD.`
            : "",
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
      question: `What is the range of the ${year} ${brand.name} ${model.name} in UAE?`,
      answer: `The ${year} ${brand.name} ${model.name} has a claimed range of ${minRange === maxRange ? minRange : minRange + "km - " + maxRange
        }km.`,
      id: 3,
      condition:
        mainTrim?.fuelType === "Electric" || mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What is the fuel efficiency of the ${year} ${brand.name} ${model.name}?`,
      answer: `The ${year} ${brand.name} ${model.name
        } has a claimed fuel efficiency of ${mainTrim?.fuelConsumption} kmpl${mainTrim?.range ? " and a range of " + mainTrim?.range + " km" : ""
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
      question: `What type of motor the ${year} ${brand.name} ${model.name} in UAE has?`,
      answer: `The ${year} ${brand.name} ${model.name} is equipped with a ${motorTypes}.`,
      id: 12,
      condition:
        mainTrim?.fuelType === "Electric" || mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What safety features are included in the ${year} ${brand.name} ${model.name} in UAE?`,
      answer: `Safety components of the ${year} ${brand.name} ${model.name
        } include ${mainTrim?.airbags ? mainTrim?.airbags + " airbags, " : ""
        }ABS, ${mainTrim?.haveFrontParkAssist ? "front park assist, " : ""}${mainTrim?.haveRearParkAssist ? "rear park assist, " : ""
        }${mainTrim?.have360ParkingCamera ? "360° parking camera, " : ""}${mainTrim?.haveAdaptiveCuriseControl ? "adaptive cruise control, " : ""
        }${mainTrim?.haveLaneChangeAssist ? "lane change assist" : ""}.`,
      id: 5,
      condition: true,
    },
    {
      question: `How many passengers can the ${year} ${brand.name} ${model.name} in UAE accommodate?
      `,
      answer: `The ${year} ${brand.name} ${model.name
        } has a seating capacity of ${mainTrim?.seatingCapacity && mainTrim?.seatingCapacity.split(" ")[0]
        } passengers.
      `,
      id: 6,
      condition: true,
    },
    {
      question: ` What are the exterior dimensions of the ${year} ${brand.name} ${model.name}?
      `,
      answer: `The ${year} ${brand.name} ${model.name
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

  // Function to generate the schema.org FAQ JSON-LD
  const generateFAQSchema = (faqData) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          // The answer should be plain text here
          "text": item.plainAnswer ? item.plainAnswer : (typeof item.answer === "string" ? item.answer : item.answer.toString().replace(/(<([^>]+)>)/gi, ""))
        }
      }))
    };
  };

  const faqSchema = generateFAQSchema(faq);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      {/* Add structured data for FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 className="font-semibold mb-5">
        FAQs (Frequently Asked Questions) on {year} {brand.name} {model.name}
      </h2>
      <div className="shadow-lg md:p-10 rounded-2xl" id="faqs">
        <div className="w-full  mx-auto space-y-2 ">
          {faq.map((item, index) => (
            <>
              {item.condition && (
                <div key={index} className="border rounded bg-white">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="text-base sm:text-lg font-medium w-full px-4 py-2 text-left flex justify-between items-center bg-white rounded-t"
                  >
                    <span
                      className={`${activeIndex === index ? "text-blue-700" : ""
                        }`}
                    >
                      {item.question}
                    </span>
                    <svg
                      className={`w-6 h-6 transform ${activeIndex === index
                        ? "rotate-180 text-blue-700"
                        : ""
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
                    className={`overflow-hidden transition-[max-height] duration-500 ${activeIndex === index
                      ? "max-h-96 p-0"
                      : "max-h-0 p-0"
                      }`}
                  >
                    <p className="text-gray-700 text-sm sm:text-base p-4">{item.answer}</p>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
