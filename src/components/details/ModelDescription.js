import Price from "@/src/utils/Price";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

export default function ModelDescription({
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
}) {
  console.log(minFuelConsumption, maxFuelConsumption, "mainTrimfsdfsdf");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const motorTypeCount = motorTypes?.split(",").length;
  const motorTypeCountOr = motorTypes?.split("or").length;

  const range = allTrims
    ?.map((item) => item?.attributes?.range)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range[0];
  const maxRange = range[range.length - 1];

  const batteryCapacity = allTrims
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
    mainTrim?.haveAppleCarPlay && "Apple CarPlay",
    mainTrim?.haveAndroidAuto && "Android Auto",
    mainTrim?.haveCruiseControl && "cruise control",
    mainTrim?.haveClimateControl && "climate control",
  ].filter(Boolean);

  const safetyFeatures = [
    mainTrim?.haveABS && "ABS",
    mainTrim?.haveFrontParkAssist && "front park assist",
  ].filter(Boolean);

  const numAirbags = [
    model?.mainTrim?.haveFrontAirbags && 1,
    model?.mainTrim?.haveRearAirbags && 1,
    model?.mainTrim?.haveSideAirbags && 2,
  ]
    .filter(Boolean)
    .reduce((acc, val) => acc + val, 0);

  const airbags = mainTrim?.airbags;
  const hasABS = mainTrim?.haveABS;
  const hasFrontParkAssist = mainTrim?.haveFrontParkAssist;

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

  console.log(allTrims, "allTrims");

  const variableText = allTrims
    .map((trim, index) => (
      <Link
        href={`/brands/${brand?.slug}/${trim.year}/${model?.slug}/${trim.slug}`}
        key={trim.id}
      >
        <b>{trim.name}</b>
      </Link>
    ))
    .reduce((acc, curr, index, array) => {
      if (index === 0) {
        // If it's the first item, just return it
        return curr;
      } else if (index === array.length - 1) {
        // If it's the last item, prepend with 'and ' if there are more than one items
        return (
          <>
            {acc} and {curr}
          </>
        );
      } else {
        // For all other items, append with ', '
        return (
          <>
            {acc}, {curr}
          </>
        );
      }
    });

  

  return (
    <div id="description" className={`mb-3 ${isRtl && "text-end"}`}>
      <div className="white_bg_wrapper mb-3">
        <h4 className="fw-bold">
          {year} {brand?.name} {model?.name}
        </h4>
        <div className="car_description mt-3">
          <p>
            {isRtl ? (
              <>
                <b>{t.price}: </b>
                {brand?.name} {model?.name}{" "}
                {minPrice === null ? "" : `${t.aed} `}
                <b>
                  {minPrice !== null ? (
                    <>
                      <Price data={minPrice} />
                      {minPrice !== maxPrice && maxPrice !== null ? (
                        <>
                          {" "}
                          - د.إ <Price data={maxPrice} />
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    " TBD*" // Assuming you want to display a message when the price is not available
                  )}
                </b>
                {minPrice !== maxPrice && minPrice !== null && maxPrice !== null
                  ? " اعتمادًا على الطراز"
                  : "."}
              </>
            ) : (
              <>
                <b>{t.price}: </b>The{" "}
                <b>
                  {brand?.name} {model?.name}
                </b>{" "}
                is priced
                {minPrice === null ? "" : ` at `}
                <b>
                  {minPrice !== null ? (
                    <>
                      <Price data={minPrice} />
                      {minPrice !== maxPrice && maxPrice !== null ? (
                        <>
                          {" "}
                          - <Price data={maxPrice} />
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    " TBD*" // Assuming you want to display a message when the price is not available
                  )}
                </b>
                {minPrice !== maxPrice && minPrice !== null && maxPrice !== null
                  ? " based on the variant."
                  : "."}
              </>
            )}
          </p>

          {isRtl ? (
            allTrims?.length === 1 ? (
              <p>
                <b>{t.variants}: </b>هو متوفر في طراز واحد فقط:{" "}
                <b>{allTrims.map((trim) => trim.name)}</b>.
              </p>
            ) : (
              <p>
                <b>{t.variants}: </b>متوفر بـ<b>{allTrims?.length}</b> طرازات:{" "}
                {variableText}.
              </p>
            )
          ) : allTrims?.length === 1 ? (
            <p>
              <b>{t.variants}: </b>It is only available in one variant :{" "}
              <b>{allTrims.map((trim) => trim.name)}</b>.
            </p>
          ) : (
            <p>
              <b>{t.variants}: </b>It is available in <b>{allTrims?.length}</b>{" "}
              variants: {variableText}.
            </p>
          )}

          {/* Engine and Motor */}

          {mainTrimFuelType === "Electric" ? (
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
          ) : mainTrimFuelType === "Hybrid" ? (
            <>
              {engineTypes?.length > 1 ? (
                <p>
                  <b>{t.engine}:</b> It can be equipped with a{" "}
                  <b>{engineTypes}</b> engine based on the variant.
                </p>
              ) : (
                <p>
                  <b>{t.engine}:</b> It is equipped with a <b>{engineTypes}</b>{" "}
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
          ) : engineTypes?.length > 1 ? (
            <p>
              <b>{t.engine}:</b> It can be equipped with a <b>{engineTypes}</b>{" "}
              engine based on the variant.
            </p>
          ) : (
            <p>
              <b>{t.engine}:</b> It is equipped with a <b>{engineTypes}</b>{" "}
              engine.
            </p>
          )}

          {/* Transmission */}

          {mainTrimFuelType === "Electric" || transmissionList === null ? (
            ""
          ) : (
            <p>
              <b>{t.transmission}: </b>
              It comes with {getTransmissionType()} gearbox.
            </p>
          )}

          {mainTrimFuelType === "Electric" ||
          (minFuelConsumption === 0 && maxFuelConsumption === 0) ? (
            ""
          ) : minFuelConsumption !== maxFuelConsumption &&
            minFuelConsumption !== "" ? (
            <p>
              <b>{t.fuelefficiency}: </b>It has a claimed fuel economy of{" "}
              <b>
                {minFuelConsumption}kmpl - {maxFuelConsumption}
                kmpl
              </b>{" "}
              depending on the variant.
            </p>
          ) : (
            <p>
              <b>{t.fuelefficiency}: </b>It has a claimed fuel economy of{" "}
              <b>
                {minFuelConsumption !== ""
                  ? minFuelConsumption
                  : maxFuelConsumption}
                kmpl
              </b>
              .
            </p>
          )}

          {/* Range */}

          {mainTrimFuelType === "Electric" ||
          (mainTrimFuelType === "Hybrid" &&
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

          {mainTrimFuelType === "Electric" ||
          (mainTrimFuelType === "Hybrid" && batteryCapacity !== "") ? (
            allTrims.length <= 1 ? (
              <p>
                <b>{t.batteryCapacity}: </b>It comes with a{" "}
                <b>{mainTrim.batteryCapacity}</b> battery.
              </p>
            ) : (
              <p>
                <b>{t.batteryCapacity}: </b>It comes with a{" "}
                <b>{mainTrim.batteryCapacity}</b> battery based on the variant.
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
          {/* {mainTrim?.cargoSpace === "" ? null : (
            <p>
              <b>Boot Space: </b>
              The {brand?.name} {model?.name} offers{" "}
              <b>{mainTrim?.cargoSpace} L</b> of cargo space.
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
