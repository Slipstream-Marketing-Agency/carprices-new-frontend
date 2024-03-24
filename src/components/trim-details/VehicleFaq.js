import React from "react";
import AccordionFaq from "../common/AccordionFaq";
import { formatNumberWithCommas } from "@/src/utils/formatNumber";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";

export default function VehicleFaq({ trim }) {
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";
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
      question: `${isRtl ? `ما هو سعر ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What is the price of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
      answer: `${isRtl ? `${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} مسعر بـ ${
        trim?.price !== null
          ? "AED " +
            trim?.price?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : "TBD*"
      }*.` : `The  ${trim?.year} ${trim?.brand} ${trim?.model} ${
        trim?.name
      } is priced at ${
        trim?.price !== null
          ? "AED " +
            trim?.price?.toLocaleString("en-AE", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : "TBD*"
      }*.`}`,
      id: 1,
      condition: true,
    },
    {
      question: `${isRtl ? `كيفية أداء ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} من حيث التسارع والسرعة القصوى؟` : `How does the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} perform in terms of acceleration and top speed?`}`,
      answer: `${isRtl ? `${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} يصل من 0 إلى 100 كم/س في ${trim?.zeroToHundred} ثانية ولها سرعة قصوى تبلغ ${trim?.topSpeed} كم/س.` : `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} reaches 0 to 100km/h in ${trim?.zeroToHundred}seconds and has a top speed of ${trim?.topSpeed}km/h.`}`,
      id: 2,
      condition: true,
    },
    {
      question: `${isRtl ? `ما هو نطاق ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What is the range of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
      answer: `${isRtl ? `${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} يتمتع بنطاق مدعوم يبلغ ${trim?.range} كم.` : `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has a claimed range of ${trim?.range}km.`}`,
      id: 3,
      condition: trim?.fuelType === "Electric" || trim?.fuelType === "Hybrid",
    },
    {
      question: `${isRtl ? `ما هي كفاءة استهلاك الوقود لـ ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What is the fuel efficiency of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
      answer: `${isRtl ? `${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} يتمتع بكفاءة استهلاك وقود مدعومة تبلغ ${trim?.fuelConsumption} كم/لتر.` : `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has a claimed fuel efficiency of ${trim?.fuelConsumption}kmpl.`}`,
      id: 11,
      condition:
        trim?.fuelType === "Hybrid" ||
        trim?.fuelType === "Petrol" ||
        trim?.fuelType === "Diesel",
    },
    {
      question: `${isRtl ? `ما نوع المحرك وناقل الحركة لـ ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What type of engine and transmission does the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} have?`}`,
      answer: `${isRtl ? `${trim?.year} ${trim?.brand} ${
        trim?.name
      } مجهز بمحرك سعة ${(trim?.displacement / 1000).toFixed(1)} لتر ${
        trim?.engine
      } ومزود بناقل حركة ${trim?.transmission}.` : `The ${trim?.year} ${trim?.brand} ${
        trim?.name
      } is equipped with a ${(trim?.displacement / 1000).toFixed(1)}L ${
        trim?.engine
      } engine and is paired with a ${trim?.transmission} transmission.`}`,
      id: 4,
      condition:
        trim?.fuelType === "Hybrid" ||
        trim?.fuelType === "Petrol" ||
        trim?.fuelType === "Diesel",
    },
    
    {
      question: `${isRtl ? `ما نوع المحرك الموجود في ${trim?.year} ${trim?.brand} ${trim?.name}?` : `What type of motor does the ${trim?.year} ${trim?.brand} ${trim?.name} have?`}`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.name} is equipped with a ${trim?.motor}.`,
      id: 12,
      condition:
        trim?.fuelType === "Electric" ||
        (trim?.fuelType === "Hybrid" && trim?.motor !== ""),
    },
    {
      question: `${isRtl ? `ما المزايا الأمانية المتوفرة في ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What safety features are included in the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
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
      question: `${isRtl ? `كم عدد الركاب التي يمكن استيعابها في ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `How many passengers can the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} accommodate?`}`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${
        trim?.name
      } has a seating capacity of ${
        trim?.seatingCapacity && trim?.seatingCapacity.split(" ")[0]
      } passengers.`,
      id: 6,
      condition: true,
    },
    {
      question: `${isRtl ? `ما هي الأبعاد الخارجية لـ ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What are the exterior dimensions of the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has dimensions of ${formatNumberWithCommas(trim?.length)}mm length, ${formatNumberWithCommas(trim?.width)}mm width, and ${formatNumberWithCommas(trim?.height)}mm height.`,
      id: 7,
      condition: true,
    },
    {
      question: `${isRtl ? `ما هو مساحة الشحن المتاحة في ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What is the cargo space available in the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
      answer: `The ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} has ${trim?.cargoSpace}L of cargo space for your storage needs.`,
      id: 8,
      condition: true,
    },
    
    {
      question: `${isRtl ? `هل يأتي ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} بأي ميزات مساعدة للسائق؟` : `Does the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name} come with any driver assistance features?`}`,
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
      question: `${isRtl ? `ما هي أنواع ميزات الاتصال والترفيه المتضمنة في ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?` : `What kind of connectivity and entertainment features are included in the ${trim?.year} ${trim?.brand} ${trim?.model} ${trim?.name}?`}`,
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
  return (
    <div id="faq" className="my-3">
      <div className="white_bg_wrapper mt-3">
    
        <h2 className={`w-100 fw-bold`}>
          {trim?.year} {trim?.brand} {trim?.model} {trim?.name} FAQs
        </h2>
        <hr className="my-2 heading-bottom mb-3" />
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
