import { Skeleton } from '@mui/material';
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

const categorysliderSettings = {
    dots: false,
    infinite: true,
    // speed: 2000,
    slidesToShow: 4,
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
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
    ],
}

const MostPopularSectionPlaceholder = () => {
    return (
        <>
            <div className="tw-px-4 tw-hidden sm:tw-block">
                <Slider {...categorysliderSettings}>
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
                {/* )} */}
            </div>
            {/* Horizontal scrolling for screens 720px and smaller */}
            <div className="sm:tw-hidden tw-block tw-overflow-x-auto tw-m-2 custom-scrollbar">
                <div className="tw-flex tw-nowrap tw-pr-1">
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
            </div>
        </>
    )
}

export default MostPopularSectionPlaceholder