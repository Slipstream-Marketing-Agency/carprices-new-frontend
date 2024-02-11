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
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
function index({ heading, carDetails, compare }) {
  const router = useRouter();

  const t = useTranslate();
  let isRtl = router.locale === 'ar';
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
          slidesPerView: 2,
          spaceBetween: 1,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  });

  console.log(compare, "eeeeeeee");
  return (
    <div className="compare-car-section mt-5 mb-20">
      <div className="container pb-4 container-fluid ">
        <div className="row mb-20 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12">
            <div className="section-title1">
              {/* <span>Best Car Collection</span> */}
              <h1 className={`${isRtl && 'text-end'} me-5`}>{t.comaprecars}</h1>
            </div>
          </div>
        </div>

        <div className="row mb-40 wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12 col-md-12 col-md-12 col-12 zindexMinusOne">
            <Swiper {...slideSettings} className="swiper compare-car-slider">
              <div className="swiper-wrapper">
                {compare?.map((comparison, idx) => (
                  <SwiperSlide className="swiper-slide">
                    <div className="single-compare-card">
                      <div className="compare-top">
                        {comparison.attributes.car_models.data.map(
                          (car, carIdx) => (
                            <>
                              <div className="single-car">
                                <div className="car-img">
                                  <img
                                    src={
                                      car.attributes.car_trims.data[0]
                                        .attributes.featuredImage.data
                                        .attributes.url
                                    }
                                    alt={car.attributes.name}
                                    className="compare-img"
                                  />
                                </div>
                                <div className="content text-center">
                                  <span>
                                    (
                                    {
                                      car.attributes?.car_brands?.data[0]
                                        ?.attributes?.name
                                    }
                                    )
                                  </span>
                                  <h6 className="title">
                                    <a href="#">{car.attributes.name}</a>
                                  </h6>
                                  <h6 className="price">{t.aed} 68, 219.000</h6>
                                </div>
                              </div>
                              {carIdx === 0 && (
                                <div className="vs">
                                  <span>VS</span>
                                </div>
                              )}
                            </>
                          )
                        )}
                      </div>
                      <div className="compare-btm">
                        <Link legacyBehavior href={`/compare-cars/${ comparison?.attributes?.car_models?.data[0]
                                ?.attributes?.car_trims?.data[0]?.attributes
                                ?.mainSlug}-vs-${comparison?.attributes?.car_models?.data[1]
                                  ?.attributes?.car_trims?.data[0]?.attributes
                                  ?.mainSlug}`}>
                          <button
                            type="button"
                            className="primary-btn2"
                            // data-bs-toggle="modal"
                            // data-bs-target="#compareModal01"
                          >
                            {t.compare}{" "}
                            {
                              comparison?.attributes?.car_models?.data[0]
                                ?.attributes?.car_brands?.data[0]?.attributes
                                ?.name
                            }{" "}
                            &amp;{" "}
                            {
                              comparison?.attributes?.car_models?.data[1]
                                ?.attributes?.car_brands?.data[0]?.attributes
                                ?.name
                            }
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
        <div className="row ">
          <div className="col-lg-12 divider">
            <div className="slider-btn-group style-2 justify-content-md-between justify-content-center">
              <div className="slider-btn prev-3 d-md-flex d-none pb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                  <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
                </svg>
              </div>
              <div className="view-btn-area">
                {/* <p>There will be 100+ Upcoming Car</p> */}
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
        </div>
      </div>
    </div>
  );
}

export default index;
