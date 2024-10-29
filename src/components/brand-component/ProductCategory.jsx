import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useRef } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
function ProductCategory({ brands }) {
  const ref = useRef();
  const slideSetting = useMemo(() => {
    return {
      speed: 1500,
      spaceBetween: 24,
      navigation: {
        nextEl: ref.current === "next-100",
        prevEl: ref.current,
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        420: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  });
  return (
    <div className="mb-5 mt-4 container">
      <div className="">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold my-4">Top Car Brands in UAE</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {brands?.map((item) => (
            <Link href={`/brands/${item?.attributes?.slug}`} key={item?.attributes?.slug} className="flex justify-center items-center bg-gray-100 p-5 rounded-xl">


              <div className="text-center cursor-pointer">
                <div className="mb-2 flex justify-center items-center">
                  <Image
                    loading="lazy"
                    alt={`brand-${item?.attributes?.name}`}
                    src={
                      item?.attributes?.brandLogo
                    }
                    width={90} // Optimized width for md screens
                    height={90} // Optimized height for md screens
                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                    layout="intrinsic" // Optimized for fixed-size images
                    className="object-contain w-20 h-20"
                  />
                </div>
                <h5 className="text-lg font-semibold">{item?.attributes?.name}</h5>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

  );
}

export default ProductCategory;
