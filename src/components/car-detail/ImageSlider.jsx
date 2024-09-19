import Image from 'next/image';
import React, { useState } from 'react'
import Slider from "react-slick/lib/slider";


const ImageSlider = ({ mainTrim }) => {
    const [sliderRef, setSliderRef] = useState(null);
    const mainSettings = {
        dots: false,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ref: (slider) => setSliderRef(slider),
        arrows: false,
    };

    const thumbSettings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: sliderRef,
        vertical: true, // Enable vertical scrolling
        verticalSwiping: true, // Enable vertical swiping
        focusOnSelect: true,
        swipeToSlide: true,
        infinite: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 768, // at 768px screen width
                settings: {
                    vertical: false, // Horizontal scrolling on mobile
                    verticalSwiping: false,
                },
            },
            {
                breakpoint: 1024, // at 1024px and above screen width
                settings: {
                    vertical: true, // Vertical scrolling on desktop
                    verticalSwiping: true,
                },
            },
        ],
    };
    return (
        <div className='tw-grid tw-grid-cols-12 tw-gap-4'>
            <div className="tw-order-2 md:tw-order-1 md:tw-col-span-2 tw-col-span-12 md:tw-h-[333px]">
                <Slider {...thumbSettings}>
                    <div>
                        <Image
                            src={
                                mainTrim?.featuredImage === null
                                    ? "/assets/img/car-placeholder.png"
                                    : mainTrim?.featuredImage
                            }
                            alt="thumbnail image"
                            width={80}
                            height={80}
                            className="tw-object-contain tw-w-20 tw-h-20 tw-rounded-[10px]"
                        />
                    </div>
                    {mainTrim?.galleryImages?.map((item, index) => (
                        <div key={index}>
                            <Image
                                src={
                                    item === null ? "/assets/img/car-placeholder.png" : item
                                }
                                alt={`thumbnail image ${index + 1}`}
                                width={80}
                                height={80}
                                className="tw-object-cover tw-w-20 tw-h-20 tw-rounded-[10px]"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="tw-order-1 md:tw-order-2 md:tw-col-span-10 tw-col-span-12 tw-border-solid tw-border-[1px] tw-border-gray-300 tw-rounded-[30px] car-detail-main-slider  tw-p-0">
                <Slider {...mainSettings} className="tw-h-full">
                    <div className="tw-flex tw-items-center">
                        <Image
                            src={
                                mainTrim?.featuredImage === null
                                    ? "/assets/img/car-placeholder.png"
                                    : mainTrim?.featuredImage
                            }
                            alt="product image"
                            width={800}
                            height={6000}
                            className="tw-object-contain tw-w-full md:tw-h-[360px] tw-h-[250px] tw-rounded-[30px]"
                        />
                    </div>
                    {mainTrim?.galleryImages?.map((item, index) => (
                        <div key={index} className="tw-flex tw-items-center">
                            <Image
                                src={
                                    item === null ? "/assets/img/car-placeholder.png" : item
                                }
                                alt={`product image ${index + 1}`}
                                width={800}
                                height={600}
                                className="tw-object-contain tw-w-full md:tw-h-[360px] tw-h-[250px] tw-rounded-[30px]"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default ImageSlider