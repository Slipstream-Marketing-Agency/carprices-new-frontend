import React from "react";
import Slider from "react-slick";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow text-black" onClick={onClick}>
    <span className="material-symbols-outlined">chevron_right</span>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow text-black" onClick={onClick}>
    <span className="material-symbols-outlined">chevron_left</span>
  </div>
);

const sliderSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  draggable: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const FeaturedCarsSlider = ({ featuredcars }) => (
  <Slider {...sliderSettings}>
    {featuredcars?.carModels.map((car, index) => (
      <div key={index} className="px-2">
        <div className="flex flex-col h-full py-5 bg-white rounded-2xl border border-solid border-zinc-100 shadow-lg">
          <div className="flex flex-col text-sm leading-4 text-neutral-900 px-5 flex-grow">
            <div className="self-start py-1 px-3 mb-2 text-xs rounded-full border border-solid bg-slate-100 border-blue-600 border-opacity-30">
              Model: {car?.highTrim?.year}
            </div>
            <img
              loading="lazy"
              src={car?.highTrim?.featuredImage}
              className="self-center w-full h-48 object-contain"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center px-5 pt-3 mt-2 w-full flex-grow">
            <h6 className="m-0 text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
              {car.brand.name}
            </h6>
            <h4 className="m-0 text-lg leading-6 text-gray-900 font-semibold">
              {car.name}
            </h4>
            <CarPriceRange minPrice={car?.minPrice} maxPrice={car?.maxPrice} />
          </div>
          <div className="flex mt-4 w-full justify-between items-center px-5">
            <div className="flex flex-col items-left">
              <span className="text-xs leading-3">EMI Starting from</span>
              <CarEMIDisplay minPrice={car?.minPrice} />
            </div>
            <button className="mt-3 px-7 py-3 text-base font-semibold tracking-tight leading-4 text-white bg-blue-600 border border-blue-600 border-solid rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              View Details
            </button>
          </div>
        </div>
      </div>
    ))}
  </Slider>
);

export default FeaturedCarsSlider;
