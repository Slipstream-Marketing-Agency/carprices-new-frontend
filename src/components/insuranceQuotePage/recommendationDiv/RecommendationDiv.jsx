"use client"
import Slider from "react-slick";
import styles from "./recommendationDiv.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { carLoanPage } from "../../../mocks/labels";
import { carData } from "../../../mocks/mock";

export default function RecommendationDiv() {
  function ArrowStyle(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#d4d4d4",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowStyle />,
    prevArrow: <ArrowStyle />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          arrows: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          arrows: true,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className=" my-6">
      <div className=" heading-blue">
        {carLoanPage.featuredCarSection.headingSmall}
      </div>
      <div className="heading">{carLoanPage.featuredCarSection.heading}</div>
      <div className={`${styles.sliderWrapper3} my-4 px-6 w-screen md:w-auto`}>
        <Slider {...settings}>
          {carData.chooseCar.map((item) => (
            <div
              key={item.brand}
              className="md:col-span-4 border rounded-xl px-2 py-4"
            >
              <div className="">
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

                {/* details div */}
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

                {/* EMI div */}
                <div className="grid gap-1 grid-cols-12 rounded-md">
                  <div className="col-span-6 p-2 text-xs float-left">
                    <div className="text-xs opacity-70">EMI Starting from</div>
                    <div className="text-sm font-bold">{item.emi}*</div>
                  </div>
                  <div className="col-span-6 text-xs ">
                    <button className="bg-button-bg text-xs xl:text-sm font-thin text-white rounded-full justify-center text-center my-2 px-4 p-3 sm:p-2 float-right">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
