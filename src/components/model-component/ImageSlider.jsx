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
        <div className='grid grid-cols-12 gap-4'>
            <div className="order-2 md:order-1 md:col-span-2 col-span-12 md:h-[333px]">
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
                            className="object-contain w-20 h-20 rounded-[10px]"
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
                                className="object-cover w-20 h-20 rounded-[10px]"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="order-1 md:order-2 md:col-span-10 col-span-12 border-solid border-[1px] border-gray-300 rounded-[30px] car-detail-main-slider  p-0">
                <Slider {...mainSettings} className="h-full">
                    <div className="flex items-center">
                        <Image
                            src={
                                mainTrim?.featuredImage === null
                                    ? "/assets/img/car-placeholder.png"
                                    : mainTrim?.featuredImage
                            }
                            alt="product image"
                            width={800}
                            height={6000}
                            className="object-contain w-full md:h-[360px] h-[250px] rounded-[30px]"
                        />
                    </div>
                    {mainTrim?.galleryImages?.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <Image
                                src={
                                    item === null ? "/assets/img/car-placeholder.png" : item
                                }
                                alt={`product image ${index + 1}`}
                                width={800}
                                height={600}
                                className="object-contain w-full md:h-[360px] h-[250px] rounded-[30px]"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default ImageSlider