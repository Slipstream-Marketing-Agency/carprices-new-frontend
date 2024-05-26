import Price from "@/src/utils/Price";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  allTrims = [], // Provide a default value for allTrims
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
    .map((item) => item?.attributes?.range)
    .filter((value, index, self) => value !== undefined && self.indexOf(value) === index)
    .sort((a, b) => a - b);

  const minRange = range.length > 0 ? range[0] : 'N/A';
  const maxRange = range.length > 0 ? range[range.length - 1] : 'N/A';

  const batteryCapacity = allTrims
    .map((item) => item?.attributes?.batteryCapacity)
    .filter((value, index, self) => value !== undefined && self.indexOf(value) === index)
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

  let variableText;
  if (allTrims.length > 0) {
    variableText = allTrims
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
          return curr;
        } else if (index === array.length - 1) {
          return (
            <>
              {acc} and {curr}
            </>
          );
        } else {
          return (
            <>
              {acc}, {curr}
            </>
          );
        }
      });
  } else {
    variableText = null;
  }

  console.log(allTrims,"allTrims");
  return (
    <div id="description" className={`mb-3 ${isRtl && "text-end"}`}>
     
    </div>
  );
}
