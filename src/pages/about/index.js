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
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
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
      <div className="tw-container mx-auto">
        <div className="tw-grid tw-gap-4 tw-p-4 lg:tw-grid-rows-1 lg:tw-grid-cols-10 tw-w-full tw-container">
          <div className="tw-row-span-1 md:tw-col-span-12 tw-col-span-12 tw-flex tw-flex-col md:tw-justify-start tw-text-white tw-rounded-2xl tw-leading-[100%] tw-relative tw-overflow-hidden md:tw-h-[400px] tw-h-[200px]">
            <img
              loading="lazy"
              src="/About-Us.jpg"
              className="tw-object-cover tw-w-full tw-h-full tw-absolute tw-inset-0"
            />
            <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-30"></div>{" "}
            {/* Overlay */}
            <div className="tw-relative tw-flex tw-flex-col md:tw-px-12 tw-px-3 md:tw-pt-12 tw-pt-3 md:tw-pb-20 tw-w-full tw-h-full">
              <h1 className="tw-text-white md:tw-leading-10 tw-leading-6 tw-font-bold banner-header">
                About CarPrices.ae
              </h1>
            </div>
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-p-6 tw-pt-0 sm:tw-pt-6">
          <div className="tw-flex tw-flex-col tw-justify-center tw-space-y-4">
            <p className=" tw-text-gray-600">
              Established in 2017 in Dubai, UAE, CarPrices.ae is a fast-growing
              online portal for new car buyers’ research in the United Arab
              Emirates. Our platform is dedicated to new and used car buyers and
              enthusiasts who are looking for a platform that helps them pick
              the right new car.
            </p>
            <p className=" tw-text-gray-600">
              Our mission is to empower new car buyers’ to make informed car
              buying decisions by providing comprehensive and up-to-date
              information on all new cars in the UAE and allowing them to find a
              right car that suits their needs.
            </p>
            <div className="tw-space-y-5">
              <h4 className=" tw-font-semibold tw-text-gray-800">
                What We Offer
              </h4>
              <ul className="tw-bg-white tw-p-6 tw-pt-0 tw-rounded-lg tw-shadow-md tw-space-y-4 tw-list-disc tw-pl-5">
                {[
                  "A ‘World’s First’ truly interactive new car research platform which recommends cars based on buyers’ preferences and requirements.",
                  "Extensive new car database maintained by our automotive experts.",
                  "New car buyers can compare a wide range of vehicles side-by-side for a comprehensive pricing and feature overview.",
                  "Equipping users with tools and insights to find the perfect car aligned with their needs, preferences, and budget.",
                ].map((point, index) => (
                  <li key={index} className=" tw-text-gray-700 tw-ml-4">
                    {index === 0 ? (
                      <>
                        A <span className="tw-font-bold">‘World’s First’</span>{" "}
                        truly interactive new car research platform which
                        recommends cars based on buyers’ preferences and
                        requirements.
                      </>
                    ) : (
                      point
                    )}
                  </li>
                ))}
              </ul>
              <h4 className=" tw-font-semibold tw-text-gray-800">
                Our Commitment
              </h4>
              <ul className="tw-bg-white tw-p-6 tw-pt-0 tw-rounded-lg tw-shadow-md tw-space-y-4 tw-list-disc tw-pl-5">
                {[
                  "Ensuring accuracy, reliability, and authenticity in the information provided, fostering trust among our platform users.",
                  "Maintaining transparency in our operations, processes, and data sources, enabling users to make well-informed decisions confidently.",
                  "Commitment to continual enhancement of our platform, incorporating user feedback and technological advancements for an optimized user experience.",
                  "Fostering a supportive and interactive community environment where users can share, learn, and engage with fellow car enthusiasts and experts.",
                ].map((point, index) => (
                  <li key={index} className=" tw-text-gray-700 tw-ml-4">
                    {point}
                  </li>
                ))}
              </ul>
              <h4 className=" tw-font-semibold tw-text-gray-800">
                Continuous Updates
              </h4>
              <ul className="tw-bg-white tw-p-6 tw-pt-0 tw-rounded-lg tw-shadow-md tw-space-y-4 tw-list-disc tw-pl-5">
                {[
                  "Regularly updated platform keeping pace with the dynamic automotive industry.",
                  "Timely incorporation of the latest car models, ensuring users have access to current information.",
                  "Industry news and trends regularly added to keep users informed about the evolving automotive landscape.",
                  "Ensuring that users have access to the freshest details to aid their decision-making process when buying a car.",
                ].map((point, index) => (
                  <li key={index} className=" tw-text-gray-700 tw-ml-4">
                    {point}
                  </li>
                ))}
              </ul>{" "}
              <h4 className=" tw-font-semibold tw-text-gray-800">
                Additional Resources
              </h4>
              <ul className="tw-bg-white tw-p-6 tw-pt-0 tw-rounded-lg tw-shadow-md tw-space-y-4 tw-list-disc tw-pl-5">
                {[
                  "A user-friendly tool aiding in financial planning for car purchases by calculating potential loan amounts, interest rates, and repayment periods.",
                  "An organized and easily navigable sitemap ensuring effortless access to our diverse range of resources, including car specifications, reviews, and comparison tools.",
                  "Detailed guides and tips on vehicle maintenance, ownership, insurance, and more, providing valuable insights for both new and experienced car owners.",
                  "In-depth articles and analyses on industry trends, market forecasts, and emerging technologies, fostering a deeper understanding of the automotive world.",
                ].map((point, index) => (
                  <li key={index} className=" tw-text-gray-700 tw-ml-4">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <p>
              For inquiries, suggestions, or feedback, reach out through our
              <Link href="/contact-us" className="tw-font-semibold">
                {" "}
                Contact Us
              </Link>{" "}
              section.
            </p>
          </div>
          <div className="tw-space-y-10 ">
            <img
              loading="lazy"
              src="/assets/about-us/06_Social.jpg"
              className="tw-object-contain tw-w-full tw-h-auto tw-rounded-2xl"
            />
            <img
              loading="lazy"
              src="/assets/about-us/05_social.jpg"
              className="tw-object-contain tw-w-full tw-h-auto tw-rounded-2xl md:tw-block tw-hidden"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default About;
