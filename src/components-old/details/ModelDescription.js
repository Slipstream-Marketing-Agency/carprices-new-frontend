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
  getTransmissionType,
}) {
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

  const minRange = range.length > 0 ? range[0] : "N/A";
  const maxRange = range.length > 0 ? range[range.length - 1] : "N/A";

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
  const variableText =
    allTrims.length > 0
      ? allTrims
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
          }, null) // Provide an initial value
      : null;

  return (
    <>
      <div className="tw-mb-10">
        <h2 className="tw-font-semibold tw-mb-5">Overview</h2>
        <table className="tw-min-w-full tw-rounded-full tw-bg-white tw-border tw-border-solid  tw-border-gray-200">
          <tbody className="tw-text-gray-800 tw-text-sm ">
            <tr className="tw-border-b tw-border-gray-200">
              <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                {t.price}
              </td>
              <td className="tw-py-4 tw-px-6">
                {isRtl ? (
                  <>
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
                    {minPrice !== maxPrice &&
                    minPrice !== null &&
                    maxPrice !== null
                      ? " اعتمادًا على الطراز"
                      : "."}
                  </>
                ) : (
                  <>
                    The{" "}
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
                    {minPrice !== maxPrice &&
                    minPrice !== null &&
                    maxPrice !== null
                      ? " based on the variant."
                      : "."}
                  </>
                )}
              </td>
            </tr>
            <tr className="tw-border-b tw-border-gray-200">
              <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                {t.variants}
              </td>
              <td className="tw-py-4 tw-px-6">
                {isRtl ? (
                  allTrims?.length === 1 ? (
                    <>
                      <b>{allTrims.map((trim) => trim.name)}</b>.
                    </>
                  ) : (
                    <>
                      <b>{allTrims?.length}</b>
                      {variableText}.
                    </>
                  )
                ) : allTrims?.length === 1 ? (
                  <>
                    It is only available in one variant:{" "}
                    <b>{allTrims.map((trim) => trim.name)}</b>.
                  </>
                ) : (
                  <>
                    It is available in <b>{allTrims?.length}</b> variants:{" "}
                    <span className="tw-capitalize">{variableText}</span>.
                  </>
                )}
              </td>
            </tr>
            <tr className="tw-border-b tw-border-gray-200">
              <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                {mainTrimFuelType === "Electric" ? (
                  motorTypeCount?.length <= 1 ||
                  motorTypeCountOr?.length <= 1 ? (
                    "Motor:"
                  ) : (
                    "Motor:"
                  )
                ) : mainTrimFuelType === "Hybrid" ? (
                  <>
                    {engineTypes?.length > 1 ? (
                      <>{t.engine}</>
                    ) : (
                      <>{t.engine}</>
                    )}

                    {motorTypeCount?.length <= 1 ||
                    motorTypeCountOr?.length <= 1 ? (
                      <>Motor:</>
                    ) : (
                      <>Motor:</>
                    )}
                  </>
                ) : engineTypes?.length > 1 ? (
                  <>{t.engine}</>
                ) : (
                  <>{t.engine}</>
                )}
              </td>
              <td className="tw-py-4 tw-px-6">
                {mainTrimFuelType === "Electric" ? (
                  motorTypeCount?.length <= 1 ||
                  motorTypeCountOr?.length <= 1 ? (
                    <>
                      It comes with a <b>{motorTypes}</b>.
                    </>
                  ) : (
                    <>
                      It is equipped with a <b>{motorTypes}</b> based on the
                      variant.
                    </>
                  )
                ) : mainTrimFuelType === "Hybrid" ? (
                  <>
                    {engineTypes?.length > 1 ? (
                      <>
                        It is equipped with a <b>{engineTypes}</b> engine based
                        on the variant.
                      </>
                    ) : (
                      <>
                        It is equipped with a <b>{engineTypes}</b> engine.
                      </>
                    )}

                    {motorTypeCount?.length <= 1 ||
                    motorTypeCountOr?.length <= 1 ? (
                      <>
                        It comes with a <b>{motorTypes}</b>
                      </>
                    ) : (
                      <>
                        It is equipped with a <b>{motorTypes}</b> based on the
                        variant.
                      </>
                    )}
                  </>
                ) : engineTypes?.length > 1 ? (
                  <>
                    It is equipped with a <b>{engineTypes}</b> engine based on
                    the variant.
                  </>
                ) : (
                  <>
                    It is equipped with a <b>{engineTypes}</b> engine.
                  </>
                )}
              </td>
            </tr>
            {mainTrimFuelType === "Electric" || transmissionList === null ? (
              ""
            ) : (
              <tr className="tw-border-b tw-border-gray-200">
                <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                  {t.transmission}
                </td>
                <td className="tw-py-4 tw-px-6">
                  It comes with {getTransmissionType()} gearbox.
                </td>
              </tr>
            )}

            {mainTrimFuelType === "Electric" ||
            (minFuelConsumption === 0 && maxFuelConsumption === 0) ? (
              ""
            ) : minFuelConsumption !== maxFuelConsumption &&
              minFuelConsumption !== "" ? (
              <tr className="tw-border-b tw-border-gray-200">
                <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                  {t.fuelefficiency}
                </td>
                <td className="tw-py-4 tw-px-6">
                  It has a claimed fuel economy of{" "}
                  <b>
                    {minFuelConsumption}kmpl - {maxFuelConsumption}
                    kmpl
                  </b>{" "}
                  depending on the variant.
                </td>
              </tr>
            ) : (
              <tr className="tw-border-b tw-border-gray-200">
                <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                  {t.fuelefficiency}
                </td>
                <td className="tw-py-4 tw-px-6">
                  It has a claimed fuel economy of{" "}
                  <b>
                    {minFuelConsumption !== ""
                      ? minFuelConsumption
                      : maxFuelConsumption}
                    &nbsp;kmpl
                  </b>
                  .
                </td>
              </tr>
            )}

            {mainTrimFuelType === "Hybrid" && mainTrimFuelType === "Electric"  ||
            (
              minRange !== "" &&
              minRange !== undefined) ? (
              minRange === maxRange ? (
                <tr className="tw-border-b tw-border-gray-200">
                  <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                    {t.range}
                  </td>
                  <td className="tw-py-4 tw-px-6">
                    The claimed range is <b>{minRange}km</b> on a single charge.
                  </td>
                </tr>
              ) : (
                <tr className="tw-border-b tw-border-gray-200">
                  <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                    {t.range}
                  </td>
                  <td className="tw-py-4 tw-px-6">
                    The claimed range is{" "}
                    <b>
                      {minRange}km - {maxRange}km
                    </b>{" "}
                    on a single charge based on the variant.
                  </td>
                </tr>
              )
            ) : null}

            {mainTrimFuelType === "Electric" ||
            (mainTrimFuelType === "Hybrid" && batteryCapacity !== "") ? (
              allTrims.length <= 1 ? (
                <tr className="tw-border-b tw-border-gray-200">
                  <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                    {t.batteryCapacity}
                  </td>
                  <td className="tw-py-4 tw-px-6">
                    It comes with a <b>{mainTrim.batteryCapacity}</b> battery.
                  </td>
                </tr>
              ) : (
                <tr className="tw-border-b tw-border-gray-200">
                  <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                    {t.batteryCapacity}
                  </td>
                  <td className="tw-py-4 tw-px-6">
                    It comes with a <b>{mainTrim.batteryCapacity}</b> battery
                    based on the variant.
                  </td>
                </tr>
              )
            ) : (
              ""
            )}

            {features.length > 0 && (
              <tr className="tw-border-b tw-border-gray-200">
                <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                  {t.features}
                </td>
                <td className="tw-py-4 tw-px-6">
                  Key features include{" "}
                  {features.map((feature, index) => (
                    <b key={feature} className="tw-capitalize">
                      {index > 0 && index < features.length - 1 ? ", " : ""}
                      {index > 0 && index === features.length - 1
                        ? " and "
                        : ""}
                      {feature}
                    </b>
                  ))}
                  .
                </td>
              </tr>
            )}

            <tr className="tw-border-b tw-border-gray-200">
              <td className="tw-py-4 tw-px-6 tw-font-semibold tw-border-r tw-border-gray-200">
                {t.safety}
              </td>
              <td className="tw-py-4 tw-px-6">
                Safety components consist of <b>{outputString}</b> ensuring a
                secure driving experience.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
