import Price from "@/src/utils/Price";
import React, { useEffect, useState } from "react";
import AccordionFaq from "../common/AccordionFaq";
import { formatNumberWithCommas } from "@/src/utils/formatNumber";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

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

  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";  

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

  const seamlessConnectivity = `${
    connectivity ? connectivity.slice(0, -2) : ""
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

  const safetyFeature = `${cruiseControl ? cruiseControl.slice(0, -2) : ""}${
    cruiseControl && laneChangeAssist ? ", " : ""
  }${laneChangeAssist}`;

  const outputSafetyString = `${safetyFeature}`;

  const faq = [
    {
      question: `${isRtl ?  `ما هو نطاق الأسعار لـ ${year} ${brand.name} ${model.name}؟` : `What is the price range of the ${year} ${brand.name} ${model.name}?`}`,
      answer: (
        <>
          The {year} {brand.name} {model.name}{" "}
          {minPrice === maxPrice && minPrice !== null && minPrice !== null ? (
            <>
              {" "}
              is priced at <Price data={minPrice} />
            </>
          ) : (
            ""
          )}
          {minPrice !== maxPrice && minPrice !== null && minPrice !== null ? (
            <>
              is priced within the range of <Price data={minPrice} /> -{" "}
              <Price data={maxPrice} />
            </>
          ) : (
            ""
          )}
          {minPrice === null && maxPrice === null ? (
            <>
              {" "}
              is priced at <Price data={minPrice} />
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
      question: `${isRtl ? `كيف تؤدي ${year} ${brand.name} ${model.name} من حيث التسارع والسرعة القصوى؟` : `How does the ${year} ${brand.name} ${model.name} perform in terms of acceleration and top speed?`}`,
      answer: `The ${year} ${brand.name} ${model.name} reaches 0 to 100 km/h in ${mainTrim?.zeroToHundred} seconds and has a top speed of ${mainTrim?.topSpeed} km/h.`,
      id: 2,
      condition: true,
    },
    {
      question: `${isRtl ? `ما هي نطاق ${year} ${brand.name} ${model.name}?` : `What is the range of the ${year} ${brand.name} ${model.name}?`}`,
      answer: `${isRtl ? `يحتوي ${year} ${brand.name} ${model.name} على نطاق مطالب به من ${
        minRange === maxRange ? minRange : minRange + " كم - " + maxRange
      } كم.` : `The ${year} ${brand.name} ${model.name} has a claimed range of ${
        minRange === maxRange ? minRange : minRange + "km - " + maxRange
      }km.`}`,
      id: 3,
      condition: mainTrim?.fuelType === "Electric" || mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `${isRtl ? `ما هي كفاءة الوقود ل ${year} ${brand.name} ${model.name}?` : `What is the fuel efficiency of the ${year} ${brand.name} ${model.name}?`}`,
      answer: `${isRtl ? `تصل كفاءة الوقود لـ ${year} ${brand.name} ${
        model.name
      } إلى ${mainTrim?.fuelConsumption} كم لكل لتر${
        mainTrim?.range ? " ونطاق " + mainTrim?.range + " كم" : ""
      }.` : `The ${year} ${brand.name} ${
        model.name
      } has a claimed fuel efficiency of ${mainTrim?.fuelConsumption} kmpl${
        mainTrim?.range ? " and a range of " + mainTrim?.range + " km" : ""
      }.`}`,
      id: 11,
      condition:
        mainTrim?.fuelType === "Hybrid" ||
        mainTrim?.fuelType === "Petrol" ||
        mainTrim?.fuelType === "Diesel",
    },
    {
      question: `${isRtl ? `ما نوع المحرك وناقل الحركة ل ${year} ${brand.name} ${model.name}?` : `What type of engine and transmission does the ${year} ${brand.name} ${model.name} have?`}`,
      answer: (
        <>
          {isRtl ? (
            `تم تجهيز ${year} ${brand.name} ${model.name} بمحرك ${((mainTrim?.displacement || 0) / 1000).toFixed(1)} لتر ${mainTrim?.engine} ويتماشى مع ناقل الحركة ${getTransmissionType()}.`
          ) : (
            `The ${year} ${brand.name} ${model.name} is equipped with a ${((mainTrim?.displacement || 0) / 1000).toFixed(1)}L ${mainTrim?.engine} engine and is paired with ${getTransmissionType()} transmission.`
          )}
        </>
      ),
      id: 4,
      condition:
        mainTrim?.fuelType === "Hybrid" ||
        mainTrim?.fuelType === "Petrol" ||
        mainTrim?.fuelType === "Diesel",
    },
    {
      question: `${isRtl ? `ما نوع المحرك ل ${year} ${brand.name} ${model.name}?` : `What type of motor does the ${year} ${brand.name} ${model.name} have?`}`,
      answer: `${isRtl ? `تم تجهيز ${year} ${brand.name} ${model.name} بمحرك ${motorTypes}.` : `The ${year} ${brand.name} ${model.name} is equipped with a ${motorTypes}.`}`,
      id: 12,
      condition:
        mainTrim?.fuelType === "Electric" || mainTrim?.fuelType === "Hybrid",
    },
    {
      question: `${isRtl ? `ما الميزات الأمانية المتضمنة في ${year} ${brand.name} ${model.name}?` : `What safety features are included in the ${year} ${brand.name} ${model.name}?`}`,
      answer: `${isRtl ? `يتضمن مكونات السلامة لـ ${year} ${brand.name} ${
        model.name
      } ${mainTrim?.airbags ? mainTrim?.airbags + " وسائد هوائية، " : ""}ABS، ${
        mainTrim?.haveFrontParkAssist ? "مساعدة موقف أمامية، " : ""
      }${mainTrim?.haveRearParkAssist ? "مساعدة موقف خلفية، " : ""}${
        mainTrim?.have360ParkingCamera ? "كاميرا موقف 360 درجة، " : ""
      }${mainTrim?.haveAdaptiveCuriseControl ? "مراقبة سرعة تكيفية، " : ""}${
        mainTrim?.haveLaneChangeAssist ? "مساعدة تغيير المسار" : ""
      }.` : `Safety components of the ${year} ${brand.name} ${
        model.name
      } include ${
        mainTrim?.airbags ? mainTrim?.airbags + " airbags, " : ""
      }ABS, ${mainTrim?.haveFrontParkAssist ? "front park assist, " : ""}${
        mainTrim?.haveRearParkAssist ? "rear park assist, " : ""
      }${mainTrim?.have360ParkingCamera ? "360° parking camera, " : ""}${
        mainTrim?.haveAdaptiveCuriseControl ? "adaptive cruise control, " : ""
      }${mainTrim?.haveLaneChangeAssist ? "lane change assist" : ""}.`}`,
      id: 5,
      condition: true,
    },
    {
      question: `${isRtl ? `كم عدد الركاب التي يستوعبها ${year} ${brand.name} ${model.name}?` : `How many passengers can the ${year} ${brand.name} ${model.name} accommodate?`}`,
      answer: `${isRtl ? `يتسع ${year} ${brand.name} ${
        model.name
      } لـ ${
        mainTrim?.seatingCapacity && mainTrim?.seatingCapacity.split(" ")[0]
      } ركاب.` : `The ${year} ${brand.name} ${
        model.name
      } has a seating capacity of ${
        mainTrim?.seatingCapacity && mainTrim?.seatingCapacity.split(" ")[0]
      } passengers.`}`,
      id: 6,
      condition: true,
    },
    {
      question: `${isRtl ? `ما هي الأبعاد الخارجية لـ ${year} ${brand.name} ${model.name}?` : `What are the exterior dimensions of the ${year} ${brand.name} ${model.name}?`}`,
      answer: `${isRtl ? `يتميز ${year} ${brand.name} ${
        model.name
      } بأبعاد ${formatNumberWithCommas(
        mainTrim?.length
      )} مم طولًا، ${formatNumberWithCommas(
        mainTrim?.width
      )} مم عرضًا، و ${formatNumberWithCommas(mainTrim?.height)} مم ارتفاعًا.` : `The ${year} ${brand.name} ${
        model.name
      } has dimensions of ${formatNumberWithCommas(
        mainTrim?.length
      )}mm length, ${formatNumberWithCommas(
        mainTrim?.width
      )}mm width, and ${formatNumberWithCommas(mainTrim?.height)}mm height.`}`,
      id: 7,
      condition: true,
    },
    {
      question: `${isRtl ? `ما هو مساحة الشحن المتاحة في ${year} ${brand.name} ${model.name}?` : `What is the cargo space available in the ${year} ${brand.name} ${model.name}?`}`,
      answer: `The ${year} ${brand.name} ${model.name} has ${mainTrim?.cargoSpace}L of cargo space.`,
      id: 8,
      condition: true,
    },
    {
      question: `${isRtl ? `هل تأتي ${year} ${brand.name} ${model.name} بأي ميزات مساعدة للسائق؟` : `Does the ${year} ${brand.name} ${model.name} come with any driver assistance features?`}`,
      answer: `Yes, the ${year} ${brand.name} ${model.name} offers driver assistance features such as ${outputSafetyString} to enhance the driving experience.`,
      id: 9,
      condition: true,
    },
    {
      question: `${isRtl ? `ما نوع ميزات الاتصال والترفيه المدرجة في ${year} ${brand.name} ${model.name}?` : `What kind of connectivity and entertainment features are included in the ${year} ${brand.name} ${model.name}?`}`,
      answer: `The ${year} ${brand.name} ${model.name} comes with ${outputString}.`,
      id: 10,
      condition: true,
    },
  ];
  return (
    <div className="single-item white_bg_wrapper mb-50 mt-3" id="faqs">
      <div className="faq-area">
        <div className="title ">
          <h2 className={`w-100 fw-bold`}>
            {year} {brand.name} {model.name} {t.faqs}
          </h2>
          <hr className="my-2 heading-bottom " />
          <div className="mt-3">
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
