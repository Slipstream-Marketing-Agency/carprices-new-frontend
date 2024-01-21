import Price from "@/src/utils/Price";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

export default function ModelDescription({ model,hightTrim }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const availableTrim = model;

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // Calculate min and max prices whenever prices state changes
  useEffect(() => {
    let newMinPrice = null;
    let newMaxPrice = null;
  
    // Extracting and filtering prices (excluding zeros and negative values) from available trims
    const filteredPrices = availableTrim
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
  
  }, [availableTrim]);

  const engineText = availableTrim
    .map((item) => (item?.attributes?.displacement / 1000).toFixed(1) + "L " + item?.attributes?.engine)
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
      new Set(props.map((transmission) => transmission?.attributes?.gearBox))
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
    ?.map((item) => item?.attributes?.motor)
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
    ?.map((item) => item?.attributes?.range)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range[0];
  const maxRange = range[range.length - 1];

  const batteryCapacity = availableTrim
    ?.map((item) => item?.attributes?.batteryCapacity)
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
    hightTrim?.haveAppleCarPlay && "Apple CarPlay",
    hightTrim?.haveAndroidAuto && "Android Auto",
    hightTrim?.haveCruiseControl && "cruise control",
    hightTrim?.haveClimateControl && "climate control",
  ].filter(Boolean);

  const safetyFeatures = [
    hightTrim?.haveABS && "ABS",
    hightTrim?.haveFrontParkAssist && "front park assist",
  ].filter(Boolean);

  const numAirbags = [
    model?.mainTrim?.haveFrontAirbags && 1,
    model?.mainTrim?.haveRearAirbags && 1,
    model?.mainTrim?.haveSideAirbags && 2,
  ]
    .filter(Boolean)
    .reduce((acc, val) => acc + val, 0);

  const airbags = hightTrim?.airbags;
  const hasABS = hightTrim?.haveABS;
  const hasFrontParkAssist = hightTrim?.haveFrontParkAssist;

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
  } else if (!hasABS && !hasFrontParkAssist) {
    safetyFeature += " ";
  }

  const outputString = `${safetyFeature}`;

  const variableText = availableTrim
    .map((trim) => (
      <Link
        href={`/brands/${model?.brand?.slug}/${trim?.year}/${model?.slug}/${trim?.slug}`}
        key={trim.id}
      >
        <b>{trim.name}</b>
      </Link>
    ))
    .filter(
      (value, index, self) =>
        self.findIndex((item) => item?.attributes?.key === value.key) === index
    ) // Remove duplicate items
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

  const fuelConsumption = availableTrim.map(car => car.attributes.fuelConsumption);
  const minfuelConsumption = Math.min(...fuelConsumption);
  const maxfuelConsumption = Math.max(...fuelConsumption);

  return (
    <div id="description" className={`mb-3 ${isRtl && "text-end"}`}>
      <div className="white_bg_wrapper mb-3">
        <h4 className="fw-bold">
          {hightTrim?.year} {hightTrim?.car_brands?.data[0]?.attributes?.name} {hightTrim?.car_models?.data[0]?.attributes?.name}
        </h4>
        <div className="car_description mt-3">
          {minPrice !== maxPrice ? (
            <p>
              {!isRtl ? (
                <>
                  <b>{t.price}: </b> The {hightTrim?.car_brands?.data[0]?.attributes?.name} {hightTrim?.car_models?.data[0]?.attributes?.name} is
                  priced between{" "}
                  <b>
                    {" "}
                    {minPrice === maxPrice &&
                    minPrice !== null &&
                    minPrice !== null ? (
                      <>
                         <Price data={minPrice} />
                      </>
                    ) : (
                      ""
                    )}
                    {minPrice !== maxPrice &&
                    minPrice !== null &&
                    minPrice !== null ? (
                      <>
                         <Price data={minPrice} /> - {" "}
                        <Price data={maxPrice} />
                      </>
                    ) : (
                      ""
                    )}
                    {minPrice === null && maxPrice === null ? (
                      <>
                        <Price data={minPrice} />
                      </>
                    ) : (
                      ""
                    )}{" "}
                  </b>{" "}
                  based on the variant.
                </>
              ) : (
                <>
                  سعر {hightTrim?.car_brands?.data[0]?.attributes?.name} {hightTrim?.car_models?.data[0]?.attributes?.name} <b>{t.price}:</b>{" "}
                  يتراوح بين{" "}
                  <b>
                    {hightTrim?.minPrice === hightTrim?.maxPrice &&
                    hightTrim?.minPrice !== null &&
                    hightTrim?.minPrice !== null ? (
                      <>
                        د.إ <Price data={hightTrim?.minPrice} />
                      </>
                    ) : (
                      ""
                    )}
                    {hightTrim?.minPrice !== hightTrim?.maxPrice &&
                    hightTrim?.minPrice !== null &&
                    hightTrim?.minPrice !== null ? (
                      <>
                        د.إ <Price data={hightTrim?.minPrice} /> - د.إ{" "}
                        <Price data={hightTrim?.maxPrice} />
                      </>
                    ) : (
                      ""
                    )}
                    {hightTrim?.minPrice === null && hightTrim?.maxPrice === null ? (
                      <>
                        <Price data={hightTrim?.minPrice} />
                      </>
                    ) : (
                      ""
                    )}{" "}
                  </b>{" "}
                  اعتمادًا على الطراز
                </>
              )}
            </p>
          ) : (
            <p>
              {isRtl ? (
                <>
                  <b>{t.price}: </b> سعر {hightTrim?.car_brands?.data[0]?.attributes?.name} {hightTrim?.car_models?.data[0]?.attributes?.name} هو{" "}
                  <b>
                    {minPrice === null ? (
                      <>
                        <Price data={minPrice} />
                      </>
                    ) : (
                      <>
                        {t.aed} <Price data={minPrice} />
                      </>
                    )}
                  </b>
                  .
                </>
              ) : (
                <>
                  <b>{t.price}: </b> The {hightTrim?.car_brands?.data[0]?.attributes?.name} {hightTrim?.car_models?.data[0]?.attributes?.name} is
                  priced at{" "}
                  <b>
                    {minPrice === null ? (
                      <>
                        <Price data={minPrice} />
                      </>
                    ) : (
                      <>
                        {t.aed} <Price data={minPrice} />
                      </>
                    )}
                  </b>
                  .
                </>
              )}
            </p>
          )}

          {isRtl ? (
            availableTrim?.length === 1 ? (
              <p>
                <b>{t.variants}: </b>هو متوفر في طراز واحد فقط:{" "}
                <b>{availableTrim.map((trim) => trim.name)}</b>.
              </p>
            ) : (
              <p>
                <b>{t.variants}: </b>متوفر بـ<b>{availableTrim?.length}</b>{" "}
                طرازات: {variableText}.
              </p>
            )
          ) : availableTrim?.length === 1 ? (
            <p>
              <b>{t.variants}: </b>It is only available in one variant :{" "}
              <b>{availableTrim.map((trim) => trim.name)}</b>.
            </p>
          ) : (
            <p>
              <b>{t.variants}: </b>It is available in{" "}
              <b>{availableTrim?.length}</b> variants: {variableText}.
            </p>
          )}

          {/* Engine and Motor */}

          {hightTrim?.mainTrim?.fuelType === "Electric" ? (
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
          ) : hightTrim?.mainTrim?.fuelType === "Hybrid" ? (
            <>
              {engineTypes?.length > 1 || engineTypesOr?.length > 1 ? (
                <p>
                  <b>{t.engine}:</b> It can be equipped with a{" "}
                  <b>{engineText}</b> engine based on the variant.
                </p>
              ) : (
                <p>
                  <b>{t.engine}:</b> It is equipped with a <b>{engineText}</b>{" "}
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
              <b>{t.engine}:</b> It can be equipped with a <b>{engineText}</b>{" "}
              engine based on the variant.
            </p>
          ) : (
            <p>
              <b>{t.engine}:</b> It is equipped with a <b>{engineText}</b>{" "}
              engine.
            </p>
          )}

          {/* Transmission */}

          {hightTrim?.mainTrim?.fuelType === "Electric" ||
          TransmissionList(availableTrim).props.children === "" ? (
            ""
          ) : (
            <p>
              <b>{t.transmission}: </b>
              It comes with a <b>{TransmissionList(availableTrim)}</b> gearbox.
            </p>
          )}

          {hightTrim?.mainTrim?.fuelType === "Electric" ? (
            ""
          ) : hightTrim?.minfuelConsumption !== hightTrim?.maxfuelConsumption &&
            hightTrim?.minfuelConsumption !== "" ? (
            <p>
              <b>{t.fuelefficiency}: </b>It has a claimed fuel economy of{" "}
              <b>
                {hightTrim?.minfuelConsumption}kmpl - {hightTrim?.maxfuelConsumption}
                kmpl
              </b>{" "}
              depending on the variant.
            </p>
          ) : (
            <p>
              <b>{t.fuelefficiency}: </b>It has a claimed fuel economy of{" "}
              <b>
                {hightTrim?.minfuelConsumption !== ""
                  ? hightTrim?.minfuelConsumption
                  : hightTrim?.maxfuelConsumption}
                kmpl
              </b>
              .
            </p>
          )}

          {/* Range */}

          {hightTrim?.mainTrim?.fuelType === "Electric" ||
          (hightTrim?.mainTrim?.fuelType === "Hybrid" &&
            minRange !== "" &&
            minRange !== null) ? (
            minRange === maxRange ? (
              <p>
                <b>{t.range}: </b>The claimed range is <b>{minRange}km</b> on a
                single charge.
              </p>
            ) : (
              <p>
                <b>{t.range}: </b>The claimed range is{" "}
                <b>
                  {minRange}km - {maxRange}km
                </b>{" "}
                on a single charge based on the variant.
              </p>
            )
          ) : null}

          {hightTrim?.mainTrim?.fuelType === "Electric" ||
          (hightTrim?.mainTrim?.fuelType === "Hybrid" &&
            batteryCapacity !== "" &&
            batteryCapacity !== null) ? (
            availableTrim.length <= 1 ? (
              <p>
                <b>{t.batteryCapacity}: </b>It comes with a{" "}
                <b>{t.batteryCapacity}</b> battery.
              </p>
            ) : (
              <p>
                <b>{t.batteryCapacity}: </b>It comes with a{" "}
                <b>{t.batteryCapacity}</b> battery based on the variant.
              </p>
            )
          ) : (
            ""
          )}

          {features.length > 0 && (
            <p>
              <b>{t.features}:</b> Key features include{" "}
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
            <b>{t.safety}:</b> Safety components consist of{" "}
            <b>{outputString}</b> ensuring a secure driving experience.
          </p>
          {/* {hightTrim?.cargoSpace === "" ? null : (
            <p>
              <b>Boot Space: </b>
              The {hightTrim?.car_brands?.data[0]?.attributes?.name} {hightTrim?.car_models?.data[0]?.attributes?.name} offers{" "}
              <b>{hightTrim?.cargoSpace} L</b> of cargo space.
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
