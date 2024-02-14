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
    <div className="product-category-page mb-100 mt-15 ">
      <div className="container">
        <div className="page-title">
          <h1 className="my-4">Top Car Brands in UAE</h1>
        </div>
        <div className="row g-4 mb-40">
          <div className="col-lg-12">
            <div className="single-category-wrap">
              <div className="row g-4">
                {brands?.map((item, idx) => (
                  <div className="col-md-3 col-6">
                    <Link
                      legacyBehavior
                      href={`/brands/${item?.attributes?.slug}`}
                    >
                      <div className="category-card text-center">
                        <a className="category-img">
                          <div className="icon">
                            <img
                              src={
                                item?.attributes?.brandLogo?.data?.attributes
                                  ?.url
                              }
                              alt=""
                            />
                          </div>
                        </a>

                        <div className="content">
                          <h5>{item?.attributes?.name}</h5>
                          {/* <p>
                          <Link legacyBehavior href="/single-brand-category">
                            <a>23,323</a>
                          </Link>{" "}
                          Cars Available
                        </p> */}

                          {/* <Link legacyBehavior href={`/brands/${item?.attributes?.slug}`}>
                          <button className="btn mb-2 mb-md-0 btn-round btn-outline btn-block p-2">
                            View All Cars
                          </button>
                        </Link> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
