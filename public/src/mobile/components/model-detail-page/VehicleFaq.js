import React, { useEffect, useState } from "react";
import AccordionFaq from "../common/AccordionFaq";
import Price from "../common/Price";

export default function VehicleFaq(model) {
  
  const getTransmissionType = (transmissions) => {
    const hasAutomatic = model.model.trims.some(
      (t) => t.transmission === "Automatic"
    );
    const hasManual = model.model.trims.some(
      (t) => t.transmission === "Manual"
    );

    if (hasAutomatic && hasManual) {
      return "Automatic/Manual";
    } else if (hasAutomatic) {
      return "Automatic";
    } else if (hasManual) {
      return "Manual";
    } else {
      return "CVT";
    }
  };

  
  const availableTrim = model?.model?.trims;
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  

  // Calculate min and max prices whenever prices state changes
  useEffect(() => {
    let newMinPrice = null;
    let newMaxPrice = null;

    if (availableTrim.length > 0) {
      newMinPrice = availableTrim[0].price;
      newMaxPrice = availableTrim[0].price;

      for (let i = 1; i < availableTrim.length; i++) {
        const price = availableTrim[i].price;
        if (price < newMinPrice) {
          newMinPrice = price;
        }
        if (price > newMaxPrice) {
          newMaxPrice = price;
        }
      }
    }

    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  }, [availableTrim]);

  const motorTypes = availableTrim
    ?.map((item) => item.motor)
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
    model?.model?.mainTrim.haveAppleCarPlay && "Apple CarPlay",
    model?.model?.mainTrim.haveAndroidAuto && "Android Auto",
    model?.model?.mainTrim.haveCruiseControl && "cruise control",
    model?.model?.mainTrim.haveClimateControl && "climate control",
  ].filter(Boolean);

  const safetyFeatures = [
    model?.model?.mainTrim.haveABS && "ABS",
    model?.model?.mainTrim.haveFrontParkAssist && "front park assist",
  ].filter(Boolean);

  const range = availableTrim
    ?.map((item) => item.range)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range[0];
  const maxRange = range[range.length - 1];

  let connectivity = "";
  if (model.model.mainTrim.haveAppleCarPlay) {
    connectivity += "Apple CarPlay, ";
  }
  if (model.model.mainTrim.haveAndroidAuto) {
    connectivity += "Android Auto, ";
  }

  const seamlessConnectivity = `${
    connectivity ? connectivity.slice(0, -2) : ""
  } compatibility for seamless connectivity`;

  const rearSeatEntertainment = model.model.mainTrim.haveRearSeatEntertainment
    ? "and rear seat entertainment"
    : "";

  const outputString = `${seamlessConnectivity} ${rearSeatEntertainment}`;

  let cruiseControl = "";
  if (model.model.mainTrim.haveAdaptiveCuriseControl) {
    cruiseControl += "cruise control, ";
  }
  if (model.model.mainTrim.haveAdaptiveCuriseControl) {
    cruiseControl += "adaptive cruise control, ";
  }

  const laneChangeAssist = model.model.mainTrim.haveLaneChangeAssist
    ? "lane change assist"
    : "";

  const safetyFeature = `${cruiseControl ? cruiseControl.slice(0, -2) : ""}${
    cruiseControl && laneChangeAssist ? ", " : ""
  }${laneChangeAssist}`;

  const outputSafetyString = `${safetyFeature}`;

  const faq = [
    {
      question: `What is the price range of the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?`,
      answer: `The ${model.model.brand.name} ${model.model.name} ${
        minPrice !== maxPrice
          ? "is priced within the range of AED" +
            minPrice?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }) +
            " - " +
            maxPrice?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : " is priced at " +
            (minPrice === null
              ? "TBD*"
              : minPrice?.toLocaleString("en-AE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }))
      }`,
      id: 1,
      condition: true,
    },
    {
      question: `How does the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} perform in terms of acceleration and top speed?`,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} reaches 0 to 100 km/h in ${model.model.mainTrim.zeroToHundred} seconds and has a top speed of ${model.model.mainTrim.topSpeed} km/h.`,
      id: 2,
      condition: true,
    },
    {
      question: `What is the range of the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?`,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${
        model.model.name
      } has a range of ${
        minRange === maxRange ? minRange : minRange + " - " + maxRange
      }.`,
      id: 3,
      condition:
        model?.model?.mainTrim?.fuelType === "Electric" ||
        model?.model?.mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What is the fuel efficiency of the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?`,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} has a fuel efficiency of ${model.model.mainTrim.fuelConsumption} kmpl and a range of ${model.model.mainTrim.range} km.`,
      id: 11,
      condition:
        model?.model?.mainTrim?.fuelType === "Hybrid" ||
        model?.model?.mainTrim?.fuelType === "Petrol" ||
        model?.model?.mainTrim?.fuelType === "Diesel",
    },
    {
      question: `What type of engine and transmission does the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} have?`,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${
        model.model.name
      } is equipped with a ${model.model.mainTrim.engine.split(" ")[1]} ${
        model.model.mainTrim.engine.split(" ")[0]
      } engine and is paired with a ${getTransmissionType()} transmission.`,
      id: 4,
      condition:
        model?.model?.mainTrim?.fuelType === "Hybrid" ||
        model?.model?.mainTrim?.fuelType === "Petrol" ||
        model?.model?.mainTrim?.fuelType === "Diesel",
    },
    {
      question: `What type of motor the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} has?`,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} is equipped with a ${motorTypes}.`,
      id: 12,
      condition:
        model?.model?.mainTrim?.fuelType === "Electric" ||
        model?.model?.mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `What safety features are included in the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?`,
      answer: `Safety components of the ${model?.model?.mainTrim?.year} ${
        model.model.brand.name
      } ${model.model.name} include ${
        model.model.mainTrim.airbags
      } airbags, ABS, ${
        model.model.mainTrim.haveFrontParkAssist && "front park assist, "
      }${model.model.mainTrim.haveRearParkAssist && "rear park assist, "}${
        model.model.mainTrim.have360ParkingCamera && "rear park assist, "
      }${
        model.model.mainTrim.haveAdaptiveCuriseControl &&
        "adaptive cruise control, "
      }${model.model.mainTrim.haveLaneChangeAssist && "lane change assist"}.`,
      id: 5,
      condition: true,
    },
    {
      question: `How many passengers can the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} accommodate?
      `,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${
        model.model.name
      } has a seating capacity of ${
        model.model.mainTrim.seatingCapacity && model.model.mainTrim.seatingCapacity.split(" ")[0]
      } passengers.
      `,
      id: 6,
      condition: true,
    },
    {
      question: ` What are the exterior dimensions of the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?
      `,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} has dimensions of ${model.model.mainTrim.length} m length, ${model.model.mainTrim.width} m width, and ${model.model.mainTrim.height} m height.
      `,
      id: 7,
      condition: true,
    },
    {
      question: `What is the cargo space available in the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?
      `,
      answer: `The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} has ${model.model.mainTrim.cargoSpace}L of cargo space.`,
      id: 8,
      condition: true,
    },
    {
      question: `Does the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} come with any driver assistance features?
      `,
      answer: `Yes, the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} offers driver assistance features such as ${outputSafetyString} to enhance the driving experience.`,
      id: 9,
      condition: true,
    },
    {
      question: `What kind of connectivity and entertainment features are included in the ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name}?
      `,
      answer: ` The ${model?.model?.mainTrim?.year} ${model.model.brand.name} ${model.model.name} comes with ${outputString}.`,
      id: 10,
      condition: true,
    },
  ];
  return (
    <div id="faq" className="my-3">
      <div className="white_bg_wrapper mt-3">
        <h4 className="fw-bold">
          {model?.model?.mainTrim?.year} {model.model.brand.name} {model.model.name} FAQs
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
