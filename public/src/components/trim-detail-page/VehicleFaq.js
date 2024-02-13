import React from "react";
import AccordionFaq from "../common/AccordionFaq";

export default function VehicleFaq(trim) {
  
  // const getTransmissionType =(transmissions) => {
  //   const hasAutomatic = data?.trims.some((t) => t.transmission === "Automatic");
  //   const hasManual = data?.trims.some((t) => t.transmission === "Manual");

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
  const data = trim?.trim?.trim;
  const faq = [
    {
      question: `What is the price of the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?`,
      answer: `The  ${data?.year} ${data?.brand.name} ${data?.model?.name} ${
        data?.name
      } is priced at ${
        data?.price !== null
          ? "AED " +
            data?.price?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : "TBD*"
      }*.`,
      id: 1,
      condition: true,
    },
    {
      question: `How does the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} perform in terms of acceleration and top speed?`,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} reaches 0 to 100km/h in ${data?.zeroToHundred}seconds and has a top speed of ${data?.topSpeed}km/h.`,
      id: 2,
      condition: true,
    },
    {
      question: `What is the range of the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?`,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} has a claimed range of ${data?.range}km`,
      id: 3,
      condition: data?.fuelType === "Electric" || data?.fuelType === "Hybrid",
    },

    {
      question: `What is the fuel efficiency of the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?`,
      // answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} has a fuel efficiency of ${data?.fuelConsumption}kmpl and a range of ${data?.range} km.`,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} has a claimed fuel efficiency of ${data?.fuelConsumption}kmpl.`,
      id: 11,
      condition:
        data?.fuelType === "Hybrid" ||
        data?.fuelType === "Petrol" ||
        data?.fuelType === "Diesel",
    },
    {
      question: `What type of engine and transmission does the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} have?`,
      answer: `The ${data?.year} ${data?.brand.name} ${
        data?.name
      } is equipped with a ${(data?.displacement/1000).toFixed(1)}L ${data?.engine} engine and is paired with a ${data?.transmission} transmission.`,
      id: 4,
      condition:
        data?.fuelType === "Hybrid" ||
        data?.fuelType === "Petrol" ||
        data?.fuelType === "Diesel",
    },
    {
      question: `What type of motor the ${data?.year} ${data?.brand.name} ${data?.name} has?`,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.name} is equipped with a ${data?.motor}.`,
      id: 12,
      condition: data?.fuelType === "Electric" || data?.fuelType === "Hybrid",
    },
    {
      question: `What safety features are included in the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?`,
      answer: `Safety components of the ${data?.year} ${data?.brand.name} ${
        data?.name
      } consist of ${data?.airbags} airbags, ABS, ${
        data?.haveFrontParkAssist && "front park assist, "
      }${data?.haveRearParkAssist && "rear park assist, "}${
        data?.have360ParkingCamera && "360° rear parking camera, "
      }${data?.haveAdaptiveCuriseControl && "adaptive cruise control, "}${
        data?.haveLaneChangeAssist && "lane change assist"
      }.`,
      id: 5,
      condition: true,
    },
    {
      question: `How many passengers can the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} accommodate?
      `,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${
        data?.name
      } has a seating capacity of ${
        data?.seatingCapacity && data?.seatingCapacity.split(" ")[0]
      } passengers.
      `,
      id: 6,
      condition: true,
    },
    {
      question: ` What are the exterior dimensions of the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?
      `,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} has dimensions of ${data?.length}mm length, ${data?.width}mm width, and ${data?.height}mm height.
      `,
      id: 7,
      condition: true,
    },
    {
      question: `What is the cargo space available in the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?
      `,
      answer: `The ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} has ${data?.cargoSpace}L of cargo space for your storage needs.`,
      id: 8,
      condition: true,
    },
    {
      question: `Does the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name} come with any driver assistance features?
      `,
      answer: `Yes, the ${data?.year} ${data?.brand.name} ${
        data?.name
      } offers driver assistance features such as ${
        data?.haveAdaptiveCuriseControl && "cruise control, "
      }${data?.haveAdaptiveCuriseControl && "adaptive cruise control, "}${
        data?.haveLaneChangeAssist && "lane change assist"
      } to enhance the driving experience.`,
      id: 9,
      condition: true,
    },
    {
      question: `What kind of connectivity and entertainment features are included in the ${data?.year} ${data?.brand.name} ${data?.model?.name} ${data?.name}?
      `,
      answer: ` The ${data?.year} ${data?.brand.name} ${
        data?.name
      } comes with ${data?.haveAppleCarPlay && "Apple CarPlay, "}${
        data?.haveAndroidAuto && "Android Auto, "
      }compatibility for seamless connectivity ${
        data?.haveRearSeatEntertainment ? "and rear seat entertainment" : ""
      }.`,
      id: 10,
      condition: true,
    },
  ];
  return (
    <div id="faq" className="my-3">
      <div className="white_bg_wrapper mt-3">
        <h4 className="fw-bold">
          {data?.year} {data?.brand.name} {data?.model?.name} {data?.name} FAQs
        </h4>
        {faq.map((item, index) => (
          <div key={index}>
            <AccordionFaq
              question={item.question}
              answer={item.answer}
              condition={item?.condition}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
