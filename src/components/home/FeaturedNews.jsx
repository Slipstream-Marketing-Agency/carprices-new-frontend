"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function FeaturedNews() {
    const featuredSliderRef = useRef(null);

    const FeaturedData = [
        {
            model: "2025",
            brand: "Audi",
            name: "2025 All-New Audi e-tron GT! New Variants and More Power",
            description:
                "The 2025 Audi e-tron GT features a facelift, new variants, improved range, performance, and charging. The lineup includes the first fully electric RS performance model, the RS e-tron GT Performance, with striking design and advanced technology.",
            createdOn: "09th September 2024",
            url: "https://carprices.ae/news/2025-all-new-audi-e-tron-gt-new-variants-and-more-power",
            image: "https://cdn.carprices.ae/assets/Audi_RS_E_Tron_2e8984e401.jpg",
        },
        {
            model: "2024",
            brand: "Toyota",
            name: "All-New 2024 Toyota Land Cruiser Prado Returns To Rule The Off-Roads!",
            description:
                "The new Land Cruiser Prado features a body-on-frame design and is a more capable off-roader than before.",
            createdOn: "09th September 2024",
            url: "https://carprices.ae/news/2024-toyota-land-cruiser-prado",
            image: "https://cdn.carprices.ae/assets/LC_Prado_6286422331.jpg",
        },

        {
            model: "2024",
            brand: "Porsche",
            name: "Development Of The 2025 Porsche 911 Hybrid Came To An End | To Debut On May 28!",
            description:
                "Porsche has concluded the testing of the first-ever hybrid model of the iconic 992 Gen 911. The 7:16.934 lap time at Nürburgring showcases its enhanced capabilities. A milestone in Porsche's history, it sets new standards for automotive excellence.",
            createdOn: "09th September 2024",
            url: "https://carprices.ae/news/development-of-the-2025-porsche-911-hybrid-came-to-an-end-to-debut-on-may-28",
            image:
                "https://cdn.carprices.ae/assets/Porsche_Hybrid_911_dc05da8cdd.jpg",
        },

        {
            model: "2024",
            brand: "Volkswagen",
            name: "Soon To Launch G90 BMW M5 Teased! Detailed Preview And Analysis.",
            description:
                "The BMW M5, known as the 'supercar killer', has thrilled enthusiasts for 40 years. The upcoming 7th-gen G90 M5 promises fresher looks, advanced technology, hybrid powertrain, and the return of the M5 Touring.",
            createdOn: "11th April 2024",
            url: "/news/soon-to-launch-g90-bmw-m5-teased-detailed-preview-and-analysis",
            image:
                "/soon-to-launch-g90-bmw-m5-teased-detailed-preview-and-analysis.jpg",
        },
    ];

    const settings = {
        dots: false,
        autoplaySpeed: 4000,
        infinite: true,
        slidesToShow: 3.5, // Show 1 slide on smaller screens
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0",
        autoplay: true,
        focusOnSelect: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // Show 2 slides on larger screens
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.5, // Show 1.5 slides on tablet screens
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container md:py-8 mt-5 overflow-hidden">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col justify-between w-1/4 max-md:w-full sm:my-3">
                    <div className="flex flex-col">
                        <h2 className="md:text-2xl text-lg font-semibold text-neutral-900 capitalize">
                            Featured car news
                        </h2>
                        <p className="md:mt-4 mt-1 text-base text-neutral-900">
                            CarPrices.ae brings car buyers and enthusiasts automotive
                            news coverage with high-res images and video from car shows
                            and reveals around the world.
                        </p>
                        <Link href="/news">
                            <button className="md:block hidden self-start md:px-14 px-8 md:py-5 py-2 md:mt-9 mt-4 text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 rounded-full max-md:px-5 active:bg-blue-700">
                                View More
                            </button>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:justify-end justify-between cars-center gap-4 py-2">
                        <button
                            className="bg-white text-black px-3 py-3 rounded-full shadow-md flex cars-center hover:shadow-md active:shadow-md focus:shadow-md"
                            onClick={() => featuredSliderRef.current.slickPrev()}
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            className="bg-white text-black px-3 py-3 rounded-full shadow-md flex cars-center hover:shadow-md active:shadow-md focus:shadow-md"
                            onClick={() => featuredSliderRef.current.slickNext()}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col w-3/4 max-md:w-full">
                    <Slider ref={featuredSliderRef} {...settings}>
                        {FeaturedData.map((car, index) => (
                            <Link href={car.url} key={index} className="p-2">
                                <div className="relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-500 custom-scale">
                                    <Image
                                        src={car.image}
                                        alt={`${car.brand} ${car.name}`}
                                        width={600}
                                        height={384}
                                        sizes="(max-width: 600px) 100vw, 600px"
                                        className="object-cover w-full md:h-[450px] h-[350px]"
                                        loading="lazy"
                                    />
                                    <div className="m-2 absolute bottom-0 left-0 right-0 py-3 pl-4 border-l-4 border-l-blue-400 border-solid border-t-0 border-r-0 border-b-0 bg-opacity-50 bg-black rounded-2xl text-white">
                                        <h6 className="text-white mb-0 md:text-sm text-xs">{car.name}</h6>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
