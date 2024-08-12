import React from "react";
import Image from "next/image";
// import { data } from './mockData';
import { carData } from "../../../../mocks/mock";
import { carLoanPage } from "../../../../mocks/labels";

// import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function ActiveSlider2() {
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
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  if (containerWidth < 551) {
    setSlidesPerPage(1);
  } else if (containerWidth < 901) {
    setSlidesPerPage(2);
  } else if (containerWidth < 1101) {
    setSlidesPerPage(3);
  } else {
    setSlidesPerPage(4);
  }
  return (
    <div className=" my-6">
      <div className=" text-blue-600 font-bold text-sm uppercase">
        {carLoanPage.chooseCarSection.headingSmall}
      </div>
      <div className="font-semibold font-medium text-2xl leading-9 mb-6">
        {carLoanPage.chooseCarSection.heading}
      </div>
      <div className="relative flex items-center">
        {/* <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} /> */}
        <button onClick={slideLeft}>left icon</button>
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide grid-cols-12 bg-red-500"
        >
          {carData.chooseCar.map((item) => (
            <div
              key={item.brand}
              //   className="md:col-span-4 border rounded-xl px-2 py-4"
              className="col-span-6  inline-block p-2 m-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-blue-200"
            >
              <Image
                src={item.image}
                width={250}
                height={250}
                className="mx-auto mb-2"
              />
              <div className="text-blue-500 text-xs font-semibold">
                {item.brand}
              </div>
              <div className="text-md font-semibold text-gray-600">
                {item.model}
              </div>
              <div className="font-bold xl:text-lg">{item.price}</div>

              <div className="flex justify-between p-2 bg-slate-100 rounded-md my-2 text-gray-500 text-xs">
                <div className="">
                  <div>MILEAGE</div>
                  <div className="font-bold">{item.mileage}Litre</div>
                </div>
                <div className=" ">
                  <div>TRANSMISION</div>
                  <div className="font-bold">{item.transmission}</div>
                </div>
                <div className="col-span-4">
                  <div>SEATS</div>
                  <div className="font-bold">{item.seats}</div>
                </div>
              </div>

              <div className="grid gap-1 grid-cols-12 rounded-md">
                <div className="col-span-6 p-2 text-xs float-left">
                  <div className="text-xs opacity-70">EMI Starting from</div>
                  <div className="text-sm font-bold">{item.emi}*</div>
                </div>
                <div className="col-span-6 text-xs ">
                  <button className="bg-button-bg text-xs xl:text-sm font-thin text-white rounded-2xl justify-center text-center my-2 px-4 p-3 float-right">
                    Calculate EMI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={slideRight}>right icon</button>

        {/* <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} /> */}
      </div>
    </div>
  );
}

export default ActiveSlider2;