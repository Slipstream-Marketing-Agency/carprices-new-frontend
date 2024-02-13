"use client";
import React, { useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import carImage from "../../../public/assets/images/EV/carNews/1.png";
import carImage2 from "../../../public/assets/images/EV/carNews/2.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import SwiperCore, { Navigation } from "swiper/core";
import nextIcon from "../../../public/assets/images/EV/icons/Arrow.png";
import Image from "next/image";
SwiperCore.use([Navigation]);

export default function carousel() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Set a flag indicating that the component is hydrated on the client side
  }, []);

  const [swiperRef, setSwiperRef] = useState(null);

  const data = [
    {
      title: "Mercedes-Benz EQE 500:Firest Drive Review",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea praesentium, repellendus cumque nihil placeat eum tempora nobis fugit ipsum in recusandae laudantium veritatis ad omnis quasi, eligendi voluptates architecto rerum?",
      image: carImage,
      date: "By Lorem Nov 17,2023",
    },
    {
      title: "Maruti Suzuki eVX Electric SUV Seen On Test Again In India",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea praesentium, repellendus cumque nihil placeat eum tempora nobis fugit ipsum in recusandae laudantium veritatis ad omnis quasi, eligendi voluptates architecto?",
      image: carImage2,
      date: "By Lorem Nov 17,2023",
    },
    {
      title: "Mercedes-Benz EQE 500:Firest Drive Review",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea praesentium, repellendus cumque nihil placeat eum tempora nobis fugit ipsum in recusandae laudantium veritatis ad omnis quasi, eligendi voluptates architecto rerum?",
      image: carImage,
      date: "By Lorem Nov 17,2023",
    },
    {
      title: "BMW Seen On Test Again In India",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea praesentium, repellendus cumque nihil placeat eum tempora nobis fugit ipsum in recusandae laudantium veritatis ad omnis quasi, eligendi voluptates architecto rerum?",
      image: carImage2,
      date: "By Lorem Nov 17,2023",
    },
  ];

  const gotoPrev = () => {
    swiperRef.slidePrev();
  };

  const gotoNext = () => {
    swiperRef.slideNext();
  };

  if (!isHydrated) {
    // Render a placeholder or loading state until hydration is complete
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-3 position-relative border p-4">
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={1}
        centeredSlides={false}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide>
            <div class="card relative">
              <div className="h-[700px] relative">
                <Image
                  src={item.image}
                  className="img-fluid object-cover h-[700px]"
                  fill
                  alt="stations"
                />
              </div>

              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <p class="card-text">{item.description}</p>
                <span className="fs-6">{item.date}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="leftBtnContainer "
        style={{ zIndex: "1", marginRight: "-25px" }}
      >
        <button
          className=" bg-transparent border-0 "
          onClick={() => gotoNext()}
        >
          <Image
            className="rightCarouselBtnImage"
            src={nextIcon}
            alt="nextIcon"
          />
        </button>
      </div>
      {swiperRef && (
        <div
          className="rightBtnContainer"
          style={{ zIndex: "1", marginLeft: "-25px" }}
        >
          <button
            className=" bg-transparent border-0"
            onClick={() => gotoPrev()}
            style={{ transform: "rotate(180deg)" }}
          >
            <Image className=" leftCarouselBtnImage" src={nextIcon} />
          </button>
        </div>
      )}
    </div>
  );
}
