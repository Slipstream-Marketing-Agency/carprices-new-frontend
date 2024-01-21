import React, { useMemo } from "react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
SwiperCore.use([Autoplay, EffectFade, Navigation]);
function index({ heading, brandsData }) {



    const slideSetting = useMemo(() => {
        return {
            slidesPerView: "auto",
            speed: 1500,
            spaceBetween: 25,
            loop: true,
            autoplay: {
                delay: 2500, // Autoplay duration in milliseconds
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".next-1",
                prevEl: ".prev-1",
            },

            breakpoints: {
                280: {
                    slidesPerView: 1,
                },
                386: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1400: {
                    slidesPerView: 4
                },
            }
        }
    }, [])
    return (
        <div className="most-search-area pt-4 pb-40 ">
            <div className=" pb-4 ">
                <div className="container ">
                    <div className="row mt-4 mb-30 wow fadeInUp" data-wow-delay="200ms">
                        <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
                            <div className="section-title1">
                                {/* <span>Available Brand Car</span> */}
                                <h2>Popular Brands</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row wow fadeInUp" data-wow-delay="300ms">
                        <div className="col-lg-12 position-relative">
                            <div className="slider-btn-groups">
                                <div className="slider-btn prev-1 pb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" /></svg>
                                </div>
                                <div className="slider-btn next-1 pb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg>
                                </div>
                            </div>
                            <div className="tab-content" id="myTabContent5">

                                <div className="tab-pane fade show active" id="sedan" role="tabpanel" aria-labelledby="sedan-tab">
                                    <Swiper {...slideSetting} className="swiper most-search-slider mb-4">
                                        <div className="swiper-wrapper">
                                            {brandsData?.map((brand, index) => (
                                                <SwiperSlide className="swiper-slide">
                                                    <div className="product-card">
                                                        <div className="product-img">
                                                            {/* <a href="#" className="fav">
                                                                <svg width={14} height={13} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z">
                                                                    </path>
                                                                </svg>
                                                            </a> */}
                                                            <div className="swiper product-img-slider">
                                                                <div className="swiper-wrapper">
                                                                    <div className="swiper-slide d-flex justify-content-center align-items-center">
                                                                        {/* <img src="assets/img/home1/product-img-1.png" alt="image size" /> */}
                                                                        <Image width={100} height={100} src="/assets/img/bmwbrandIcon.png" alt="car image" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="product-content text-center">
                                                            <h5><Link legacyBehavior href="/car-deatils"><a>{brand.name}</a></Link></h5>
                                                        </div>

                                                    </div>
                                                </SwiperSlide>
                                            ))

                                            }
                                        </div>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="view-btn-area ">
                    <button type="button" className="primary-btn1 text-white d-flex align-items-center gap-0 " ><span className="btn-txt">View All Brands</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default index