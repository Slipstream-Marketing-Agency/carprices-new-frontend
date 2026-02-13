"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function UpcomingCars() {
    const cars = [
        {
            imgSrc:
                "https://cdn.carprices.ae/assets/Nissan_Patrol_2025_0f06f3dee1.jpg",
            title: "2025 Nissan Patrol",
            price: "Visit Site",
        },
        {
            imgSrc:
                "https://cdn.carprices.ae/assets/Mercedes_Benz_AMG_CLE_e7e6c9c59b.jpg",
            title: "2024 Mercedes Benz AMG CLE",
            price: "Visit Site",
        },
        {
            imgSrc: "https://cdn.carprices.ae/assets/BMW_M5_e2c0b94f35.jpg",
            title: "2024 BMW M5",
            price: "Visit Site",
        },
        {
            imgSrc: "https://cdn.carprices.ae/assets/Nissan_GTR_ba369e591d.jpg",
            title: "2024 Nissan GTR",
            price: "Visit Site",
        },
        {
            imgSrc: "https://cdn.carprices.ae/assets/Wagoneer_23cdadfe7b.jpg",
            title: "2024 Jeep Wagoneer",
            price: "Visit Site",
        },
    ];
    const sliderRef = useRef(null);
    const settingsupcoming = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
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
    };
    return (
        <div className="container sm:mt-12  mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 w-full">

                <div className="pt-3 lg:col-span-2">
                    <div className="flex flex-col h-full sm:py-5">
                        <div className="flex md:flex-col justify-between h-full md:p-4 px-5">
                            <div className="md:text-3xl text-xl font-bold">
                                Notable
                                <br /> Upcoming Cars
                            </div>
                            <div className="flex justify-center items-center gap-4 py-2">
                                <button
                                    className="bg-white text-black px-3 py-3 rounded-full shadow-md flex items-center"
                                    onClick={() => sliderRef.current.slickPrev()}
                                >
                                    <ChevronLeftIcon />
                                </button>
                                <button
                                    className="bg-white text-black px-3 py-3 rounded-full shadow-md flex items-center"
                                    onClick={() => sliderRef.current.slickNext()}
                                >
                                    <ChevronRightIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-10">
                    <Slider ref={sliderRef} {...settingsupcoming}>
                        {cars.map((item, index) => (
                            <div
                                key={`item-${item?.title || index}`}
                                className="flex flex-col justify-center items-center text-white bg-black"
                            >
                                <div className="relative flex flex-col justify-end pt-20 min-h-[290px]">
                                    <Image
                                        loading="lazy"
                                        fill
                                        src={item.imgSrc}
                                        alt={item.title}
                                    />
                                    <div className="relative flex flex-col justify-center px-4 py-5 max-md:mt-10">
                                        <h4 className="text-white font-bold">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
