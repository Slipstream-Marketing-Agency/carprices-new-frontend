import React, { useMemo } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import Price from "@/src/utils/Price";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
function index({ heading, carDetails, compare }) {
  const router = useRouter();

  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const slideSettings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      loop: false,
      // autoplay: {
      // 	delay: 2500, // Autoplay duration in milliseconds
      // },
      navigation: {
        nextEl: ".next-3",
        prevEl: ".prev-3",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  });

  
  return (
    <div className="compare-car-section mt-3 mb-3 ">
      <div className="container pb-4 container-fluid white_bg_wrapper ">
        <div className="row mb-15 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12">
            <div className="section-title1">
              {/* <span>Best Car Collection</span> */}
              <h2 className={`${isRtl && "text-end"} w-100 fw-bold`}>
                {t.comaprecars}
              </h2>
              <hr className="my-0 mt-2 heading-bottom " />
            </div>
          </div>
        </div>

        <div className="row  wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12 col-md-12 col-md-12 col-12">
            <Swiper {...slideSettings} className="swiper compare-car-slider">
              <div className="swiper-wrapper">
                {compare?.map((comparison, idx) => (
                  <SwiperSlide className="swiper-slide">
                    <div className="single-compare-card">
                      <div className="compare-top">
                        {comparison.carModels.map((car, carIdx) => (
                          <>
                            <div>
                              <div className="single-car">
                                <div className="car-img">
                                  <img
                                    src={car.highTrim.featuredImage}
                                    // alt={car.attributes.name}
                                    className="compare-img"
                                  />
                                </div>
                                <div className="content text-center">
                                  <span>({car.brand?.name})</span>
                                  <h6 className="title">
                                    <a href="#">{car.name}</a>
                                  </h6>
                                  <h6 className="price">
                                     <Price data={car.minPrice}/>{" "}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            {carIdx === 0 && (
                              <div className="vs">
                                <span>VS</span>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                      <div className="compare-btm">
                        <Link
                          legacyBehavior
                          href={`/compare-cars/${comparison?.carModels[0]?.highTrim?.mainSlug}-vs-${comparison?.carModels[1]?.highTrim?.mainSlug}`}
                        >
                          <button
                            type="button"
                            className="primary-btn2"
                            // data-bs-toggle="modal"
                            // data-bs-target="#compareModal01"
                          >
                            {t.compare} {comparison?.carModels[0]?.brand?.name}{" "}
                            &amp; {comparison?.carModels[1]?.brand?.name}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
        {/* <div className="row ">
          <div className="col-lg-12 divider">
            <div className="slider-btn-group style-2 justify-content-md-between justify-content-center">
              <div className="slider-btn prev-3 d-md-flex d-none pb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                  <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
                </svg>
              </div>
              <div className="view-btn-area">
                <Link legacyBehavior href="/compare-cars">
                  <button className="btn mb-2 mb-md-0 btn-round btn-outline btn-block">
                    {t.comparebutton}
                  </button>
                </Link>
              </div>
              <div className="slider-btn next-3 d-md-flex d-none pb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20">
                  <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                </svg>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default index;
