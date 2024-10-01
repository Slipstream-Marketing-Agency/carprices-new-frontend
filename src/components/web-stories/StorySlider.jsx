import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4.5, // Set to 4.5 for the default display
  slidesToScroll: 1,
  arrows: false,
  centerMode: false, // Disable centering
  initialSlide: 0,
};

const StorySlider = ({ stories }) => {
    console.log(stories,"fgfg");
    
  return (
    <div className="tw-relative tw-flex tw-justify-between">
      <div className="tw-overflow-x-auto tw-space-x-4 tw-my-4 custom-scrollbar tw-flex lg:tw-hidden">
        {stories.map((story, index) => {
          return (
            <Link
              href={`/web-stories/${story.slug}`}
              key={index}
              className="tw-flex-shrink-0 tw-relative tw-w-64 tw-h-96 tw-rounded-2xl"
            >
              <Image
                width="0"
                height="0"
                sizes="100vw"
                src={story.coverImage.url}
                alt={story.title}
                className="tw-object-cover tw-w-full tw-h-96 tw-rounded-2xl"
              />
              <div className="tw-m-2 tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl tw-text-white">
                <h6 className="tw-text-white tw-font-bold tw-mb-0">
                  {" "}
                  {story.title}
                </h6>
                <p className="tw-text-xs tw-font-light tw-mt-1">
                  {moment(story.publishedAt).format("MMMM Do YYYY")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="tw-container tw-p-0 tw-hidden lg:tw-block">
        <Slider {...settings}>
          {stories.map((story, index) => (
            <div key={index} className="tw-px-2">
              <div className="tw-flex-shrink-0 tw-relative tw-w-full tw-h-[30rem] tw-rounded-2xl">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src={story.coverImage.url}
                  alt={story.title}
                  className="tw-object-cover tw-w-full tw-h-[30rem] tw-rounded-2xl"
                />
                <div className="tw-m-2 tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl tw-text-white">
                  <h6 className="tw-text-white tw-font-bold tw-mb-0">
                    {" "}
                    {story.title}
                  </h6>
                  <p className="tw-text-xs tw-font-light tw-mt-1">
                    {moment(story.publishedAt).format("MMMM Do YYYY")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default StorySlider;
