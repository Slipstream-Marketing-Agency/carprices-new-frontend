import React, { useMemo, useState } from "react";
import Marquee from "react-fast-marquee";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "node_modules/react-modal-video/css/modal-video.css";
import ModalVideo from "react-modal-video";
import MainLayout from "@/src/layout/MainLayout";
import Ad728x90 from "@/src/components/ads/Ad728x90";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function About() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const [isOpen, setOpen] = useState(false);
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });
  const images = [
    {
      id: 1,
      imageBig: "assets/img/inner-page/gallery-01.png",
    },
    {
      id: 2,
      imageBig: "assets/img/inner-page/gallery-02.png",
    },
    {
      id: 3,
      imageBig: "assets/img/inner-page/gallery-03.png",
    },
    {
      id: 4,
      imageBig: "assets/img/inner-page/gallery-04.png",
    },
    {
      id: 5,
      imageBig: "assets/img/inner-page/gallery-05.png",
    },
    {
      id: 6,
      imageBig: "assets/img/inner-page/gallery-06.png",
    },
  ];
  const slideSettings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
      },
      navigation: {
        nextEl: ".next-4",
        prevEl: ".prev-4",
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
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    };
  });
  return (
    <MainLayout
      pageMeta={{
        title: "About Us - Carprices.ae",
        description:
          "Discover the automotive world with CarPrices.ae - your trusted portal for comprehensive car research in the UAE. Compare vehicles, stay updated with the latest models and industry trends. Join our car-loving community today!",
        type: "Car Review Website",
      }}
    >
      <div className="welcome-banner-section pb-2 pt-5">
        <div className="container">
          <h1 className={`fw-bolder mb-4 ${isRtl && "text-end"}`}>
            {t.AboutUs}
          </h1>
          <div className="row">
            <div className="col-lg-12">
              <div className=" ">
                <div
                  className=" wow fadeInUp font-bold"
                  data-wow-delay="200ms"
                ></div>
                <div
                  className="welcome-content wow fadeInUp mb-5"
                  data-wow-delay="300ms"
                >
                  <p className={`paragraph ${isRtl && "text-end"}`}>
                    {t.aboutEstablishedPara}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div
                className="section-title1 wow fadeInUp mb-4"
                data-wow-delay="200ms"
              >
                <h3 className={`${isRtl && "text-end"}`}>
                  {t.aboutWhatOfferTxt}
                </h3>
                <div
                  className={`w-100 d-flex ${isRtl && "justify-content-end"} `}
                >
                  <div className={`underLine `}></div>
                </div>
              </div>
              <div className="wow fadeInUp " data-wow-delay="300ms">
                <ul className={`${isRtl && "text-end list-unstyled"} `}>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutWhatOfferPoint1}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutWhatOfferPoint2}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutWhatOfferPoint3}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div
                className="section-title1 wow fadeInUp mb-4"
                data-wow-delay="200ms"
              >
                <h3 className={`${isRtl && "text-end"}`}>
                  {t.aboutOurCommitment}
                </h3>
                <div
                  className={`w-100 d-flex ${isRtl && "justify-content-end"} `}
                >
                  <div className={`underLine `}></div>
                </div>
              </div>
              <div className="wow fadeInUp" data-wow-delay="300ms">
                <ul className={`${isRtl && "text-end list-unstyled"} `}>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutOurCommitmentPoint1}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutOurCommitmentPoint2}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutOurCommitmentPoint3}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutOurCommitmentPoint4}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div
                className="section-title1 wow fadeInUp mb-4"
                data-wow-delay="200ms"
              >
                <h3 className={`${isRtl && "text-end"}`}>
                  {t.aboutContinuousUpdates}
                </h3>
                <div
                  className={`w-100 d-flex ${isRtl && "justify-content-end"} `}
                >
                  <div className={`underLine `}></div>
                </div>
              </div>
              <div className="wow fadeInUp" data-wow-delay="300ms">
                <ul className={`${isRtl && "text-end list-unstyled"} `}>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutContinuousUpdatesPoint1}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutContinuousUpdatesPoint2}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutContinuousUpdatesPoint3}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutContinuousUpdatesPoint4}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div
                className="section-title1 wow fadeInUp mb-4"
                data-wow-delay="200ms"
              >
                <h3 className={`${isRtl && "text-end"}`}>
                  {t.aboutAdditionalResources}
                </h3>
                <div
                  className={`w-100 d-flex ${isRtl && "justify-content-end"} `}
                >
                  <div className={`underLine `}></div>
                </div>
              </div>
              <div className="wow fadeInUp" data-wow-delay="300ms">
                <ul className={`${isRtl && "text-end list-unstyled"} `}>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutAdditionalResourcesPoint1}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutAdditionalResourcesPoint2}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutAdditionalResourcesPoint3}
                  </li>
                  <li className={`${isRtl && "text-left"} `}>
                    {t.aboutAdditionalResourcesPoint4}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container"><GalleryCards /></div> */}

      <Lightbox
        className="img-fluid"
        open={isOpenimg.openingState}
        plugins={[Fullscreen]}
        index={isOpenimg.openingIndex}
        close={() => setOpenimg(false)}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
        slides={images.map(function (elem) {
          return { src: elem.imageBig };
        })}
      />

      <div className="container mb-5">
        <p className={`paragraph ${isRtl ? "text-end" : ""}`}>
          {isRtl && <a href="/contact-us">{t.contactUs}</a>}{" "}
          {t.aboutForInquiries}
          {!isRtl && <a href="/contact-us">{t.contactUs} section.</a>}
        </p>
      </div>
    </MainLayout>
  );
}

export default About;
