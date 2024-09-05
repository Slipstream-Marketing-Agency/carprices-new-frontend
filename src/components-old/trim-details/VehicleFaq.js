import React, { useState } from "react";
import AccordionFaq from "../common/AccordionFaq";
import { formatNumberWithCommas } from "@/src/utils/formatNumber";

export default function VehicleFaq({ trim }) {
  // const getTransmissionType =(transmissions) => {
  //   const hasAutomatic = trim?.trims.some((t) => t.transmission === "Automatic");
  //   const hasManual = trim?.trims.some((t) => t.transmission === "Manual");

  //   if (hasAutomatic && hasManual) {
  //     return "Automatic/Manual";
  //   } else if (hasAutomatic) {
  //     return "Automatic";
  //   } else if (hasManual) {
  //     return "Manual";
  //   } else {
  //     return "Unknown";
  //   }
  // }

  const faq = [
    {
      question: `What is the price of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`,
      answer: `The  ${trim?.year} ${trim?.brand} ${trim?.model} ${
        trim?.name
      } is priced at ${
        trim?.price !== null
          ? "AED " +
            trim?.price?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : "TBD*"
      }*.`,
      id: 1,
      condition: true,
    },
    {
      question: `How does the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} perform in terms of acceleration and top speed?`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} reaches 0 to 100km/h in ${trim?.zeroToHundred}seconds and has a top speed of ${trim?.topSpeed}km/h.`,
      id: 2,
      condition: true,
    },
    {
      question: `What is the range of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has a claimed range of ${trim?.range}km`,
      id: 3,
      condition: trim?.fuelType === "Electric" || trim?.fuelType === "Hybrid",
    },

    {
      question: `What is the fuel efficiency of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`,
      // answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has a fuel efficiency of ${trim?.fuelConsumption}kmpl and a range of ${trim?.range} km.`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has a claimed fuel efficiency of ${trim?.fuelConsumption}kmpl.`,
      id: 11,
      condition:
        trim?.fuelType === "Hybrid" ||
        trim?.fuelType === "Petrol" ||
        trim?.fuelType === "Diesel",
    },
    {
      question: `What type of engine and transmission does the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} have?`,
      answer: `The ${trim?.year} ${trim?.brand} ${
        trim?.name
      } is equipped with a ${(trim?.displacement / 1000).toFixed(1)}L ${
        trim?.engine
      } engine and is paired with a ${trim?.transmission} transmission.`,
      id: 4,
      condition:
        trim?.fuelType === "Hybrid" ||
        trim?.fuelType === "Petrol" ||
        trim?.fuelType === "Diesel",
    },
    {
      question: `What type of motor the ${trim?.year} ${trim?.brand} ${trim?.name} has?`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.name} is equipped with a ${trim?.motor}.`,
      id: 12,
      condition:
        trim?.fuelType === "Electric" ||
        (trim?.fuelType === "Hybrid" && trim?.motor !== ""),
    },
    {
      question: `What safety features are included in the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`,
      answer: `Safety components of the ${trim?.year} ${trim?.brand} ${
        trim?.name
      } consist of ${trim?.airbags} airbags, ABS, ${
        trim?.haveFrontParkAssist && "front park assist, "
      }${trim?.haveRearParkAssist && "rear park assist, "}${
        trim?.have360ParkingCamera && "360° rear parking camera, "
      }${trim?.haveAdaptiveCuriseControl && "adaptive cruise control, "}${
        trim?.haveLaneChangeAssist && "lane change assist"
      }.`,
      id: 5,
      condition: true,
    },
    {
      question: `How many passengers can the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} accommodate?
      `,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${
        trim?.name
      } has a seating capacity of ${
        trim?.seatingCapacity && trim?.seatingCapacity.split(" ")[0]
      } passengers.
      `,
      id: 6,
      condition: true,
    },
    {
      question: ` What are the exterior dimensions of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?
      `,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${
        trim?.name
      } has dimensions of ${formatNumberWithCommas(
        trim?.length
      )}mm length, ${formatNumberWithCommas(
        trim?.width
      )}mm width, and ${formatNumberWithCommas(trim?.height)}mm height.
      `,
      id: 7,
      condition: true,
    },
    {
      question: `What is the cargo space available in the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?
      `,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has ${trim?.cargoSpace}L of cargo space for your storage needs.`,
      id: 8,
      condition: true,
    },
    {
      question: `Does the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} come with any driver assistance features?
      `,
      answer: `Yes, the ${trim?.year} ${trim?.brand} ${
        trim?.name
      } offers driver assistance features such as ${
        trim?.haveAdaptiveCuriseControl && "cruise control, "
      }${trim?.haveAdaptiveCuriseControl && "adaptive cruise control, "}${
        trim?.haveLaneChangeAssist && "lane change assist"
      } to enhance the driving experience.`,
      id: 9,
      condition: true,
    },
    {
      question: `What kind of connectivity and entertainment features are included in the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?
      `,
      answer: ` The ${trim?.year} ${trim?.brand} ${trim?.name} comes with ${
        trim?.haveAppleCarPlay && "Apple CarPlay, "
      }${
        trim?.haveAndroidAuto && "Android Auto, "
      }compatibility for seamless connectivity ${
        trim?.haveRearSeatEntertainment ? "and rear seat entertainment" : ""
      }.`,
      id: 10,
      condition: true,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div id="faq" className="my-3">
      <>
        <h2 className="tw-font-semibold tw-mb-5">
          FAQs (Frequently Asked Questions) on {trim?.year} {trim?.brand}{" "}
          {trim?.model} {trim?.name}
        </h2>
        <div className="tw-shadow-lg md:tw-p-10 tw-rounded-2xl" id="faqs">
          <div className="tw-w-full  tw-mx-auto tw-space-y-2 ">
            {faq.map((item, index) => (
              <>
                {item.condition && (
                  <div key={index} className="tw-border tw-rounded tw-bg-white">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="tw-text-xl tw-font-medium tw-w-full tw-px-4 tw-py-2 tw-text-left tw-flex tw-justify-between tw-items-center tw-bg-white tw-rounded-t"
                    >
                      <span
                        className={`${
                          activeIndex === index ? "tw-text-blue-700" : ""
                        }`}
                      >
                        {item.question}
                      </span>
                      <svg
                        className={`tw-w-6 tw-h-6 tw-transform ${
                          activeIndex === index
                            ? "tw-rotate-180 tw-text-blue-700"
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
      </>
    </div>
  );
}
