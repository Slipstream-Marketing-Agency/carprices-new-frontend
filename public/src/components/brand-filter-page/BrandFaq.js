import React, { useEffect, useState } from "react";
import AccordionFaq from "../common/AccordionFaq";
import Price from "../common/Price";

export default function BrandFaq({ props }) {


  const [electricOrHybrid, setElectricOrHybrid] = useState()

  useEffect(() => {
    const data = props?.electricOrHybrid?.map(item => item?.model?.name)
    setElectricOrHybrid(data)
  }, [props])

  console.log(electricOrHybrid,"electricOrHybrid");


  console.log(electricOrHybrid, "electricOrHybrid");

  const formattedElectricOrHybridList = electricOrHybrid?.map((item, index) => {
    if (index === electricOrHybrid.length - 1) {
      return item;
    } else if (index === electricOrHybrid.length - 2) {
      return item + " and ";
    } else {
      return item + ", ";
    }
  });

  const ListElectricOrHybrid = formattedElectricOrHybridList?.join('');

  const faq = [
    // {
    //   question: `What are the most popular [Car Brands] cars?`,
    //   answer: <>The most popular {props?.brand} cars include [Model 1], [Model 2], and [Model 3]</>,
    //   id: 1,
    //   condition: true,
    // },
    {
      question: <>Which is the most budget-friendly model in the {props?.brand} lineup?</>,
      answer: <>The most budget-friendly {props?.brand} model is the {props?.minPriceTrim?.model?.name} {props?.minPriceTrim?.name}, which starts at AED <Price data={props?.minPriceTrim?.price} /></>,
      id: 1,
      condition: true,
    },
    {
      question: <>Which is the flagship model in the {props?.brand} range?</>,
      answer: <> The flagship {props?.brand} model is the {props?.maxPriceTrim?.model?.name} {props?.maxPriceTrim?.name}, which starts at <Price data={props?.maxPriceTrim?.price} />.</>,
      id: 2,
      condition: true,
    },
    {
      question: <>What types of vehicles does {props?.brand} offer?</>,
      answer: <>The {props?.brand} offers {props.bodyTypeInfo}.</>,
      id: 3,
      condition: true,
    },
    // {
    //   question: `Where can I find authorized dealerships or service centers for {props?.brand} in my area?`,
    //   answer: <>You can find a list of all the {props?.brand} dealers here "CP dealers link"</>,
    //   id: 1,
    //   condition: true,
    // },
    {
      question: <>Which is the most fuel efficient car {props?.brand} offers?</>,
      answer: <>The most fuel-efficient {props?.brand} car is the {props?.mostFuelEfficientTrim?.model?.name} {props?.mostFuelEfficientTrim?.name} with a claimed mileage of {props?.mostFuelEfficientTrim?.fuelConsumption}kmpl</>,
      id: 4,
      condition: true,
    },
    {
      question: <>Which is the fastest car {props?.brand} offers?</>,
      answer: <>The fastest car in {props?.brand}'s lineup is the {props?.fastestTrim?.model?.name} {props?.fastestTrim?.name}. Equipt with a {props?.fastestTrim?.engine} it can reach a top speed of {props?.fastestTrim?.topSpeed}kmph,  and can accelerate from 0 to 100 km/h in just {props?.fastestTrim?.zeroToHundred}seconds.</>,
      id: 5,
      condition: true,
    },
    // {
    //   question: `What is the country of origin of {props?.brand}?`,
    //   answer: <>{props?.brand} is a company originating in [Country]</>,
    //   id: 1,
    //   condition: true,
    // },
    {
      question: <>What are the available electric/hybrid models in {props?.brand}'s lineup?</>,
      answer: <>Yes, {props?.brand} offers hybrid and electric vehicles like {ListElectricOrHybrid}</>,
      id: 6,
      condition: electricOrHybrid && electricOrHybrid.length !== 0 ? true : false,
    }

  ];
  return (
    <div id="faq" className="my-3">
      <div className="white_bg_wrapper mt-3">
        <h2 className="fw-bold">
          {props.brand} FAQs
        </h2>
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
