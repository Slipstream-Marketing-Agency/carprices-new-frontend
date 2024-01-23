import Price from "@/src/utils/Price";
import React, { useEffect, useState } from "react";
import AccordionFaq from "../common/AccordionFaq";

export default function VehicleFaq({ model, highTrim }) {
  const getTransmissionType = (transmissions) => {
    const hasAutomatic = model.some(
      (t) => t?.attributes?.transmission === "Automatic"
    );
    const hasManual = model.some(
      (t) => t?.attributes?.transmission === "Manual"
    );

    if (hasAutomatic && hasManual) {
      return "Automatic/Manual";
    } else if (hasAutomatic) {
      return "an Automatic";
    } else if (hasManual) {
      return "a Manual";
    } else {
      return "a CVT";
    }
  };

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // Calculate min and max prices whenever prices state changes
  useEffect(() => {
    let newMinPrice = null;
    let newMaxPrice = null;

    // Extracting and filtering prices (excluding zeros and negative values) from available trims
    const filteredPrices = model
      ?.map((trim) => trim.attributes.price)
      .filter((price) => price > 0);

    if (filteredPrices.length > 0) {
      // Finding the minimum and maximum prices from the filtered list
      newMinPrice = Math.min(...filteredPrices);
      newMaxPrice = Math.max(...filteredPrices);
    }

    // Format price for display (assuming setMinPrice and setMaxPrice accept formatted strings)
    const formatPrice = (price) => {
      return price?.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    // Update the state with formatted prices
    if (newMinPrice !== null) {
      setMinPrice(formatPrice(newMinPrice));
    }
    if (newMaxPrice !== null) {
      setMaxPrice(formatPrice(newMaxPrice));
    }
  }, [model]);

  const motorTypes = model
    ?.map((item) => item.attributes?.motor)
    .filter((value, index, self) => self.indexOf(value) === index) // add this line to filter duplicates
    .reduce((acc, cur, idx, arr) => {
      if (arr.length === 1) {
        return cur;
      } else if (idx === arr.length - 1) {
        return `${acc} or ${cur}`;
      } else {
        return `${acc && acc + ","} ${cur}`;
      }
    }, "");

  const features = [
    highTrim?.haveAppleCarPlay && "Apple CarPlay",
    highTrim?.haveAndroidAuto && "Android Auto",
    highTrim?.haveCruiseControl && "cruise control",
    highTrim?.haveClimateControl && "climate control",
  ].filter(Boolean);

  const safetyFeatures = [
    highTrim?.haveABS && "ABS",
    highTrim?.haveFrontParkAssist && "front park assist",
  ].filter(Boolean);

  const range = model
    ?.map((item) => item.attributes?.range)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range[0];
  const maxRange = range[range.length - 1];

  let connectivity = "";
  if (highTrim?.haveAppleCarPlay) {
    connectivity += "Apple CarPlay, ";
  }
  if (highTrim?.haveAndroidAuto) {
    connectivity += "Android Auto, ";
  }

  const seamlessConnectivity = `${
    connectivity ? connectivity.slice(0, -2) : ""
  } compatibility for seamless connectivity`;

  const rearSeatEntertainment = highTrim?.haveRearSeatEntertainment
    ? "and rear seat entertainment"
    : "";

  const outputString = `${seamlessConnectivity} ${rearSeatEntertainment}`;

  let cruiseControl = "";
  if (highTrim?.haveAdaptiveCuriseControl) {
    cruiseControl += "cruise control, ";
  }
  if (highTrim?.haveAdaptiveCuriseControl) {
    cruiseControl += "adaptive cruise control, ";
  }

  const laneChangeAssist = highTrim?.haveLaneChangeAssist
    ? "lane change assist"
    : "";

  const safetyFeature = `${cruiseControl ? cruiseControl.slice(0, -2) : ""}${
    cruiseControl && laneChangeAssist ? ", " : ""
  }${laneChangeAssist}`;

  const outputSafetyString = `${safetyFeature}`;

  const faq = [
    {
      question: `What is the price range of the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?`,
      answer: (
        <>
          The {highTrim?.year} {highTrim?.car_brands?.data[0]?.attributes?.name}{" "}
          {highTrim?.car_models?.data[0]?.attributes?.name}{" "}
          {model?.model?.minPrice === model?.model?.maxPrice &&
          model?.model?.minPrice !== null &&
          model?.model?.minPrice !== null ? (
            <>
              {" "}
              is priced at AED <Price data={model?.model?.minPrice} />
            </>
          ) : (
            ""
          )}
          {model?.model?.minPrice !== model?.model?.maxPrice &&
          model?.model?.minPrice !== null &&
          model?.model?.minPrice !== null ? (
            <>
              is priced within the range of AED{" "}
              <Price data={model?.model?.minPrice} /> - AED{" "}
              <Price data={model?.model?.maxPrice} />
            </>
          ) : (
            ""
          )}
          {model?.model?.minPrice === null &&
          model?.model?.maxPrice === null ? (
            <>
              {" "}
              is priced at AED <Price data={model?.model?.minPrice} />
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
      question: `How does the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} perform in terms of acceleration and top speed?`,
      answer: `The ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} reaches 0 to 100km/h in ${highTrim?.zeroToHundred}seconds and has a top speed of ${highTrim?.topSpeed}km/h.`,
      id: 2,
      condition: true,
    },
    {
      question: `What is the range of the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?`,
      answer: `The ${highTrim?.year} ${
        highTrim?.car_brands?.data[0]?.attributes?.name
      } ${
        highTrim?.car_models?.data[0]?.attributes?.name
      } has a claimed range of ${
        minRange === maxRange ? minRange : minRange + "km - " + maxRange
      }km.`,
      id: 3,
      condition:
        model?.model?.mainTrim?.fuelType === "Electric" ||
        model?.model?.mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What is the fuel efficiency of the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?`,
      answer: `The ${highTrim?.year} ${
        highTrim?.car_brands?.data[0]?.attributes?.name
      } ${
        highTrim?.car_models?.data[0]?.attributes?.name
      } has a claimed fuel efficiency of ${highTrim?.fuelConsumption} kmpl${
        highTrim?.range ? " and a range of " + highTrim?.range + " km" : ""
      }.`,
      id: 11,
      condition:
        model?.model?.mainTrim?.fuelType === "Hybrid" ||
        model?.model?.mainTrim?.fuelType === "Petrol" ||
        model?.model?.mainTrim?.fuelType === "Diesel",
    },
    {
      question: `What type of engine and transmission does the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} have?`,
      answer: `The ${highTrim?.year} ${
        highTrim?.car_brands?.data[0]?.attributes?.name
      } ${
        highTrim?.car_models?.data[0]?.attributes?.name
      } is equipped with a ${(highTrim?.displacement / 1000).toFixed(1)}L ${
        highTrim?.engine
      } engine and is paired with ${getTransmissionType()} transmission.`,
      id: 4,
      condition:
        model?.model?.mainTrim?.fuelType === "Hybrid" ||
        model?.model?.mainTrim?.fuelType === "Petrol" ||
        model?.model?.mainTrim?.fuelType === "Diesel",
    },
    {
      question: `What type of motor the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} has?`,
      answer: `The ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} is equipped with a ${motorTypes}.`,
      id: 12,
      condition:
        model?.model?.mainTrim?.fuelType === "Electric" ||
        model?.model?.mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What safety features are included in the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?`,
      answer: `Safety components of the ${highTrim?.year} ${
        highTrim?.car_brands?.data[0]?.attributes?.name
      } ${highTrim?.car_models?.data[0]?.attributes?.name} include ${
        highTrim?.airbags ? highTrim?.airbags + " airbags, " : ""
      }ABS, ${highTrim?.haveFrontParkAssist ? "front park assist, " : ""}${
        highTrim?.haveRearParkAssist ? "rear park assist, " : ""
      }${highTrim?.have360ParkingCamera ? "360° parking camera, " : ""}${
        highTrim?.haveAdaptiveCuriseControl ? "adaptive cruise control, " : ""
      }${highTrim?.haveLaneChangeAssist ? "lane change assist" : ""}.`,
      id: 5,
      condition: true,
    },
    {
      question: `How many passengers can the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} accommodate?
      `,
      answer: `The ${highTrim?.year} ${
        highTrim?.car_brands?.data[0]?.attributes?.name
      } ${
        highTrim?.car_models?.data[0]?.attributes?.name
      } has a seating capacity of ${
        highTrim?.seatingCapacity && highTrim?.seatingCapacity.split(" ")[0]
      } passengers.
      `,
      id: 6,
      condition: true,
    },
    {
      question: ` What are the exterior dimensions of the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?
      `,
      answer: `The ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} has dimensions of ${highTrim?.length}mm length, ${highTrim?.width}mm width, and ${highTrim?.height}mm height.
      `,
      id: 7,
      condition: true,
    },
    {
      question: `What is the cargo space available in the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?
      `,
      answer: `The ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} has ${highTrim?.cargoSpace}L of cargo space.`,
      id: 8,
      condition: true,
    },
    {
      question: `Does the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} come with any driver assistance features?
      `,
      answer: `Yes, the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} offers driver assistance features such as ${outputSafetyString} to enhance the driving experience.`,
      id: 9,
      condition: true,
    },
    {
      question: `What kind of connectivity and entertainment features are included in the ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name}?
      `,
      answer: ` The ${highTrim?.year} ${highTrim?.car_brands?.data[0]?.attributes?.name} ${highTrim?.car_models?.data[0]?.attributes?.name} comes with ${outputString}.`,
      id: 10,
      condition: true,
    },
  ];
  return (
    <div className="single-item mb-50" id="faqs">
      <div className="faq-area">
        <div className="title mb-25">
          <h5>
            {highTrim?.year} {" "}
            {highTrim?.car_brands?.data[0]?.attributes?.name}{" "}
            {highTrim?.car_models?.data[0]?.attributes?.name} FAQs
          </h5>
          <div className="faq-wrap">
          {faq.map((item, index) => (
            <AccordionFaq
              question={item.question}
              answer={item.answer}
              condition={item?.condition}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
