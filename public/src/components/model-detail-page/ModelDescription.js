import React, { useContext, useEffect, useState } from "react";
import ReadMore from "../common/ReadMore";
import Price from "../common/Price";
import Link from "next/link";

export default function ModelDescription({ model }) {


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const availableTrim = model?.trims;

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
        if (price < newMinPrice && price !== null) {
          newMinPrice = price;
        }
        if (price > newMaxPrice && price !== null) {
          newMaxPrice = price;
        }
        // if (price === null) {
        //   newMinPrice = price;
        // }
      }
    }

    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  }, [availableTrim]);



  const engineText = model?.trims
    .map(item => ((item.displacement / 1000).toFixed(1)) + "L " + item.engine)
    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicate items
    .reduce((accumulator, currentValue, index, array) => {
      if (array.length === 1) {
        return currentValue; // Return the single item as is
      } else if (index === array.length - 1) {
        return accumulator + " or " + currentValue; // Append "or" for the last item
      } else if (index === array.length - 2) {
        return accumulator + currentValue; // Skip comma for the second to last item
      } else {
        return accumulator ? accumulator + ", " + currentValue : currentValue; // Append comma for other items, considering if accumulator is empty
      }
    }, "");
  const engineTypes = engineText?.split(", ");
  const engineTypesOr = engineText?.split("or");





  function TransmissionList(props) {
    const transmissions = Array.from(
      new Set(props.map((transmission) => transmission?.gearBox))
    )
      .filter((transmission) => transmission !== undefined)
      .map((transmission) => {
        let type;
        let speed;

        if (transmission?.includes("A")) {
          type = "automatic";
          speed = `${transmission?.slice(0, -1)}-speed ${type}`;
        } else if (transmission?.includes("M")) {
          type = "manual";
          speed = `${transmission?.slice(0, -1)}-speed ${type}`;
        } else {
          type = "CVT";
          speed = transmission;
        }

        return `${speed}`;
      });

    if (transmissions.length === 1) {
      return <>{transmissions[0]}</>;
    } else if (transmissions.length === 2) {
      if (transmissions[0] === transmissions[1]) {
        return <>{transmissions[0]}</>;
      } else {
        return (
          <>
            {transmissions[0]} or {transmissions[1]}
          </>
        );
      }
    } else {
      const last = transmissions.pop();
      const joined = transmissions.join(", ");
      const hasDuplicates = transmissions.includes(last);

      if (hasDuplicates) {
        return <p>{joined}</p>;
      } else {
        return (
          <p>
            {joined} or {last}
          </p>
        );
      }
    }
  }

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

  const motorTypeCount = motorTypes?.split(",").length;
  const motorTypeCountOr = motorTypes?.split("or").length;


  const range = availableTrim
    ?.map((item) => item.range)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range[0];
  const maxRange = range[range.length - 1];

  const batteryCapacity = availableTrim
    ?.map((item) => item.batteryCapacity)
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
    model.mainTrim.haveAppleCarPlay && "Apple CarPlay",
    model.mainTrim.haveAndroidAuto && "Android Auto",
    model.mainTrim.haveCruiseControl && "cruise control",
    model.mainTrim.haveClimateControl && "climate control",
  ].filter(Boolean);

  const safetyFeatures = [
    model.mainTrim.haveABS && "ABS",
    model.mainTrim.haveFrontParkAssist && "front park assist",
  ].filter(Boolean);

  const numAirbags = [
    model?.mainTrim?.haveFrontAirbags && 1,
    model?.mainTrim?.haveRearAirbags && 1,
    model?.mainTrim?.haveSideAirbags && 2,
  ]
    .filter(Boolean)
    .reduce((acc, val) => acc + val, 0);



  const airbags = model.mainTrim.airbags;
  const hasABS = model.mainTrim.haveABS;
  const hasFrontParkAssist = model.mainTrim.haveFrontParkAssist;

  let safetyFeature = "";

  if (airbags === 1) {
    safetyFeature += "1 airbag";
  } else if (airbags > 1) {
    safetyFeature += `${airbags} airbags`;
  }

  if (hasABS && hasFrontParkAssist && airbags !== "") {
    safetyFeature += ", ABS, and front park assist";
  } else if (hasABS && hasFrontParkAssist && airbags === "") {
    safetyFeature += "ABS, and front park assist";
  } else if (hasABS && !hasFrontParkAssist && airbags === "") {
    safetyFeature += " ABS";
  } else if (hasABS && !hasFrontParkAssist && airbags !== "") {
    safetyFeature += " and ABS";
  } else if (!hasABS && hasFrontParkAssist) {
    safetyFeature += " and front park assist";
  }
  else if (!hasABS && !hasFrontParkAssist) {
    safetyFeature += " ";
  }

  const outputString = `${safetyFeature}`;

  const variableText = availableTrim
    .map(trim => (
      <Link href={`/brands/${model?.brand?.slug}/${trim?.year}/${model?.slug}/${trim?.slug}`} key={trim.id}>
        <b>{trim.name}</b>
      </Link>
    ))
    .filter((value, index, self) => self.findIndex(item => item.key === value.key) === index) // Remove duplicate items
    .reduce((accumulator, currentValue, index, array) => {
      if (array.length === 1) {
        return currentValue; // Return the single item as is
      } else if (index === array.length - 1) {
        return (
          <>
            {accumulator} and {currentValue}
          </>
        ); // Append "and" for the last item
      } else if (index === 0) {
        return currentValue; // Return the first item as is
      } else if (index === array.length - 2) {
        return (
          <>
            {accumulator}, {currentValue}
          </>
        ); // Append comma for the second-to-last item
      } else {
        return (
          <>
            {accumulator}, {currentValue}
          </>
        ); // Append comma for other items
      }
    }, null);


  return (
    <div id="description" className="mb-3">
      <div className="white_bg_wrapper mb-3">
        <h4 className="fw-bold">
          {model?.mainTrim?.year} {model?.brand?.name} {model?.name}
        </h4>
        <div className="car_description mt-3">
          {minPrice !== maxPrice ? (
            <p>
              <b>Price: </b> The {model?.brand?.name} {model?.name} is priced
              between{" "}
              <b>
                {" "}
                {model?.minPrice === model?.maxPrice && model?.minPrice !== null && model?.minPrice !== null ? <>AED <Price data={model?.minPrice} /></> : ""}
                {model?.minPrice !== model?.maxPrice && model?.minPrice !== null && model?.minPrice !== null ? <>AED <Price data={model?.minPrice} /> - AED <Price data={model?.maxPrice} /></> : ""}
                {model?.minPrice === null && model?.maxPrice === null ? <><Price data={model?.minPrice} /></> : ""}          </b>{" "}
              based on the variant.
            </p>
          ) : (
            <p>
              <b>Price: </b> The {model?.brand?.name} {model?.name} is priced
              at{" "}
              <b>
                {minPrice === null ? (
                  <>
                    <Price data={minPrice} />
                  </>
                ) : (
                  <>
                    AED <Price data={minPrice} />
                  </>
                )}
              </b>
              .
            </p>
          )}

          {availableTrim?.length === 1 ? (
            <p>
              <b>Variants: </b>It is only available in one variant :{" "}
              <b>{availableTrim.map((trim) => trim.name)}</b>.
            </p>
          ) : (
            <p>
              <b>Variants: </b>It is available in{" "}
              <b>{availableTrim?.length}</b> variants:{" "}
              {variableText}.
            </p>
          )}

          {/* Engine and Motor */}

          {model?.mainTrim?.fuelType === "Electric" ? (
            motorTypeCount?.length <= 1 || motorTypeCountOr?.length <= 1 ? (
              <p>
                <b>Motor:</b> It comes with a <b>{motorTypes}</b>.
              </p>
            ) : (
              <p>
                <b>Motor:</b> It can be equipped with a <b>{motorTypes}</b>{" "}
                based on the variant.
              </p>
            )
          ) : model?.mainTrim?.fuelType === "Hybrid" ? (
            <>
              {engineTypes?.length > 1 || engineTypesOr?.length > 1 ? (
                <p>
                  <b>Engine:</b> It can be equipped with a <b>{engineText}</b>{" "}
                  engine based on the variant.
                </p>
              ) : (
                <p>
                  <b>Engine:</b> It is equipped with a <b>{engineText}</b>{" "}
                  engine.
                </p>
              )}

              {motorTypeCount?.length <= 1 || motorTypeCountOr?.length <= 1 ? (
                <p>
                  <b>Motor:</b> It comes with a <b>{motorTypes}</b>
                </p>
              ) : (
                <p>
                  <b>Motor:</b> It can be equipped with a <b>{motorTypes}</b>{" "}
                  based on the variant.
                </p>
              )}
            </>
          ) : engineTypes?.length > 1 || engineTypesOr?.length > 1 ? (
            <p>
              <b>Engine:</b> It can be equipped with a <b>{engineText}</b>{" "}
              engine based on the variant.
            </p>
          ) : (
            <p>
              <b>Engine:</b> It is equipped with a <b>{engineText}</b> engine.
            </p>
          )}

          {/* Transmission */}

          {model?.mainTrim?.fuelType === "Electric" ||
            TransmissionList(model?.trims).props.children === "" ? (
            ""
          ) : (
            <p>
              <b>Transmission: </b>
              It comes with a <b>{TransmissionList(model?.trims)}</b> gearbox.
            </p>
          )}

          {model?.mainTrim?.fuelType === "Electric" ? (
            ""
          ) : model?.minfuelConsumption !== model?.maxfuelConsumption && model?.minfuelConsumption !== "" ? (
            <p>
              <b>Fuel Efficiency: </b>It has a claimed fuel economy of{" "}
              <b>
                {model?.minfuelConsumption}kmpl - {model?.maxfuelConsumption}kmpl
              </b>{" "}
              depending on the variant.
            </p>
          ) : (
            <p>
              <b>Fuel Efficiency: </b>It has a claimed fuel economy of{" "}
              <b>{model?.minfuelConsumption !== "" ? model?.minfuelConsumption : model?.maxfuelConsumption}kmpl</b>.
            </p>
          )}

          {/* Range */}

          {model?.mainTrim?.fuelType === "Electric" ||
            model?.mainTrim?.fuelType === "Hybrid" &&
            minRange !== "" && minRange !== null ? (
            minRange === maxRange ? (
              <p>
                <b>Range: </b>The claimed range is <b>{minRange}km</b> on a single charge.
              </p>
            ) : (
              <p>
                <b>Range: </b>The claimed range is <b>{minRange}km - {maxRange}km</b> on a single charge based on the variant.
              </p>
            )
          ) : null}


          {model?.mainTrim?.fuelType === "Electric" ||
            model?.mainTrim?.fuelType === "Hybrid" &&
            batteryCapacity !== "" && batteryCapacity !== null ? (
            availableTrim.length <= 1 ? (
              <p>
                <b>Battery Capacity: </b>It comes with a{" "}
                <b>{batteryCapacity}</b> battery.
              </p>
            ) : (
              <p>
                <b>Battery Capacity: </b>It comes with a{" "}
                <b>{batteryCapacity}</b> battery based on the variant.
              </p>
            )
          ) : (
            ""
          )}

          {features.length > 0 && (
            <p>
              <b>Features:</b> Key features include{" "}
              {features.map((feature, index) => (
                <b key={feature}>
                  {index > 0 && index < features.length - 1 ? ", " : ""}
                  {index > 0 && index === features.length - 1 ? " and " : ""}
                  {feature}
                </b>
              ))}
              .
            </p>
          )}

          <p>
            <b>Safety:</b> Safety components consist of <b>{outputString}</b>{" "}
            ensuring a secure driving experience.
          </p>


          {/* {model?.mainTrim?.cargoSpace === "" ? null : (
            <p>
              <b>Boot Space: </b>
              The {model?.brand?.name} {model?.name} offers{" "}
              <b>{model?.mainTrim?.cargoSpace} L</b> of cargo space.
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
