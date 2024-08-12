// "use client"
// import { Swiper, SwiperSlide } from "swiper/react";
// import Image from "next/image";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/free-mode";

// import { FreeMode, Pagination } from "swiper/modules";

// // import { RxArrowTopRight } from "react-icons/rx";
// // import { ServiceData } from "../constants";
// import { carData } from "../../../mocks/mock";

// export default function ActiveSlider() {
//   return (
//     <div className="flex items-center justify-center flex-col  bg-blue-200">
//       <Swiper
//         breakpoints={{
//           340: {
//             slidesPerView: 2,
//             spaceBetween: 15,
//           },
//           700: {
//             slidesPerView: 3,
//             spaceBetween: 15,
//           },
//         }}
//         freeMode={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[FreeMode, Pagination]}
//         className="max-w-[90%] lg:max-w-[80%]"
//       >
//         {carData?.sliderData?.map((item) => (
//           <SwiperSlide key={item.title}>
//             <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
//               {/* <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${item.backgroundImage})` }}
//               /> */}
//               <Image src={item.backgroundImage}/>
//               <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
//               <div className="relative flex flex-col gap-3">
//                 {/* <div className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" >ewq</div> */}
//                 <h1 className="text-xl lg:text-2xl">{item.title} </h1>
//                 <p className="lg:text-[18px]">{item.content} </p>
//               </div>
//               {/* <div className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" >das</div> */}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   )
// }

import React, { useState, useEffect, useRef } from "react";
// import './index.css'; // Make sure Tailwind CSS is imported

const Carousel = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(4);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const slides = Array.from({ length: 10 }, (_, i) => i + 1); // Create 10 slides

  const updateSlidesPerPage = () => {
    const containerWidth = containerRef.current.offsetWidth;

    if (containerWidth < 551) {
      setSlidesPerPage(1);
    } else if (containerWidth < 901) {
      setSlidesPerPage(2);
    } else if (containerWidth < 1101) {
      setSlidesPerPage(3);
    } else {
      setSlidesPerPage(4);
    }
  };

  const slideRight = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - slidesPerPage);
    }
  };

  const slideLeft = () => {
    if (currentPosition < slides.length - slidesPerPage) {
      setCurrentPosition(currentPosition + slidesPerPage);
    }
  };

  useEffect(() => {
    updateSlidesPerPage();
    window.addEventListener("resize", updateSlidesPerPage);
    return () => window.removeEventListener("resize", updateSlidesPerPage);
  }, []);

  const containerWidth = containerRef.current
    ? containerRef.current.offsetWidth
    : 0;
    const marginLeft = -currentPosition * (29/ slidesPerPage);
  return (
    <div
      className=" grid place-items-center bg-red-100 overflow-hidden p-4 "
      ref={containerRef}
    >
      <div className="relative  overflow-hidden p-4 bg-gray-500 w-[100%]">
        <button
          onClick={slideRight}
          className={`absolute top-[calc(50%-0px)] left-1 h-4 w-4 border-l-2 border-b-2 border-red-600 cursor-pointer transform rotate-45 hover:scale-110 ${
            currentPosition === 0 ? "border-gray-800" : ""
          }`}
        />
        <div
          ref={sliderRef}
          className="flex transition-all duration-500 "
          style={{ marginLeft: `${marginLeft}%` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-[90%] mx-2 bg-black rounded shadow-md flex items-center justify-center"
            >
              <span className="text-white text-6xl">{`${slide}x${slide}`}</span>
            </div>
          ))}
        </div>
        <button
          onClick={slideLeft}
          className={`absolute top-[calc(50%-0px)] right-1 h-4 w-4 border-r-2 border-t-2 border-red-600 cursor-pointer transform rotate-45 hover:scale-110 ${
            currentPosition >= slides.length - slidesPerPage
              ? "border-gray-800"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Carousel;
