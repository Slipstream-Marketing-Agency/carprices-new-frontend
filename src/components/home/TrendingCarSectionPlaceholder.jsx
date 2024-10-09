import Ad300X250 from '@/src/components-old/ads/Ad300x250'
import Ad728x90 from '@/src/components-old/ads/Ad728x90'
import { Skeleton } from '@mui/material'
import React from 'react'
import Slider from "react-slick";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`custom-arrow custom-next-arrow text-black`}
            onClick={onClick}
        >
            <span className="material-symbols-outlined">chevron_right</span>
        </div>
    );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`custom-arrow custom-prev-arrow text-black`}
            onClick={onClick}
        >
            <span className="material-symbols-outlined">chevron_left</span>
        </div>
    );
};

const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
    ],
};

const TrendingCarSectionPlaceholder = ({slidesToShow}) => {
    return (
        <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-4 tw-gap-5">
            <div className="xl:tw-col-span-3 tw-relative tw-half-card-slider tw-hidden sm:tw-block">
                <Slider {...sliderSettings}>
                    {[1, 2, 3, 4, 5].map((key, index) => (
                        <div className="tw-flex tw-flex-col tw-py-4 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-md tw-cursor-pointer tw-transition-all hover:tw-shadow-lg
          xl:tw-py-5 xl:tw-h-full xl:tw-px-5 xl:tw-w-full xl:tw-shadow-lg">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-4 tw-flex-grow xl:tw-px-5 xl:tw-h-full">
                                <div className="tw-self-start tw-py-1 tw-px-2 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
                                    <Skeleton variant="text" width="60px" />
                                </div>
                                <Skeleton variant="rectangular" width="100%" height={200} className="tw-rounded-lg tw-h-52" />
                            </div>
                            <Skeleton variant="text" width="100%" height="2rem" className="tw-mb-2" />
                            <Skeleton variant="rectangular" width="100%" height="40px" className="tw-mt-3" />
                        </div>
                    ))}
                </Slider>
                <div className="md:tw-block tw-hidden tw-mt-4">
                    {" "}
                    <Ad728x90 dataAdSlot="4367254600" />
                </div>
            </div>
            <div className="tw-relative tw-half-card-slider sm:tw-hidden">
                <div className="tw-flex tw-flex-col tw-py-4 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-md tw-cursor-pointer tw-transition-all hover:tw-shadow-lg
          xl:tw-py-5 xl:tw-h-full xl:tw-px-5 xl:tw-w-full xl:tw-shadow-lg">
                    <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-4 tw-flex-grow xl:tw-px-5 xl:tw-h-full">
                        <div className="tw-self-start tw-py-1 tw-px-2 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
                            <Skeleton variant="text" width="60px" />
                        </div>
                        <Skeleton variant="rectangular" width="100%" height={200} className="tw-rounded-lg tw-h-52" />
                    </div>
                    <Skeleton variant="text" width="100%" height="2rem" className="tw-mb-2" />
                    <Skeleton variant="rectangular" width="100%" height="40px" className="tw-mt-3" />
                </div>
            </div>
            <div className="md:tw-hidden tw-block sm:tw-mb-4 tw-w-full">
                <Ad300X250 dataAdSlot="8451638145" />
            </div>
        </div>
    )
}

export default TrendingCarSectionPlaceholder