import Image from "next/image";
import { carData } from "../../../../mocks/mock";
import { carLoanPage } from "../../../../mocks/labels";
import React, { useState, useEffect, useRef } from "react";

function ActiveSlider3() {
    const containerRef = useRef(null);

    const containerWidth = containerRef.current.offsetWidth;

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    if (containerWidth < 551) {
        console.log("hi")
        slider.scrollLeft = slider.scrollLeft - 0;
    } else{
        slider.scrollLeft = slider.scrollLeft - 500;

    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 800; // Adjusted for better mobile experience
  };

  return (
    <div className="my-6">
      <div className="text-blue-600 font-bold text-sm uppercase">
        {carLoanPage.chooseCarSection.headingSmall}
      </div>
      <div className="font-semibold text-2xl leading-9 mb-6">
        {carLoanPage.chooseCarSection.heading}
      </div>
      <div className="relative flex justify-between ">
        <button
          onClick={slideLeft}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2  text-black  text-xl bg-white  p-2 rounded-full hover:bg-gray-500 transition-colors z-20"
        >
          &lt;
        </button>
        <div
          id="slider"
        //   className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide scrollbar flex gap-4"
                  className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide scrollbar flex w-64 lg:w-auto gap-4"
        >
          {carData.chooseCar.map((item) => (
            <div
              key={item.brand}
              className=" border-2 flex-none max-w-fit sm:w-1/2  lg:w-1/3  sm:my-6 p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-lg"
            >
              <Image
                src={item.image}
                width={250}
                height={250}
                className="mx-auto mb-2"
                alt={`${item.brand} ${item.model}`}
              />
              <div className="text-blue-500 text-xs font-semibold">{item.brand}</div>
              <div className="text-sm font-semibold my-1 text-gray-600">{item.model}</div>
              <div className="font-semibold text-base">{item.price}</div>

              <div className="flex justify-between p-2 bg-slate-100 rounded-md my-2 text-gray-500 text-xs">
                <div>
                  <div>MILEAGE</div>
                  <div className="font-bold">{item.mileage} Litre</div>
                </div>
                <div>
                  <div>TRANSMISSION</div>
                  <div className="font-bold">{item.transmission}</div>
                </div>
                <div>
                  <div>SEATS</div>
                  <div className="font-bold">{item.seats}</div>
                </div>
              </div>

              <div className="grid gap-1 grid-cols-12 rounded-md">
                <div className="col-span-6 p-2 text-xs">
                  <div className="text-xs opacity-70">EMI Starting from</div>
                  <div className="text-sm font-bold">{item.emi}*</div>
                </div>
                <div className="col-span-6 text-xs flex items-center justify-end">
                  <button className="bg-blue-500 text-xs xl:text-sm font-thin text-white rounded-2xl px-4 py-2">
                    Calculate EMI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={slideRight}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-black  text-xl bg-white  p-2 rounded-full hover:bg-gray-500 transition-colors z-20"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ActiveSlider3;
