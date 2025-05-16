"use client"
import React, { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import { getCarSection } from '@/lib/api';
import Ad300x600 from '../ads/Ad300x600';
import Ad728x90 from '../ads/Ad728x90';
import Ad300X250 from '../ads/Ad300x250';
import Slider from 'react-slick';
import CarCard from '../car-components/CarCard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function TrendingCars({ featuredCars }) {

    const Arrow = ({ className, onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            <span>{direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</span>
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const renderSkeletons = (count) =>
        Array.from({ length: count }, (_, key) => (
            <div
                className="flex flex-col py-4 bg-white rounded-2xl border border-solid border-zinc-100 shadow-md transition-all hover:shadow-lg xl:py-5 xl:px-5 xl:h-full"
                key={key}
            >
                <Skeleton variant="text" width="60px" className="self-start py-1 px-2 mb-2 text-xs rounded-full" />
                <Skeleton variant="rectangular" width="100%" height={200} className="rounded-lg h-52" />
                <Skeleton variant="text" width="100%" height="2rem" className="mt-2 mb-2" />
                <Skeleton variant="rectangular" width="100%" height="40px" className="mt-3" />
            </div>
        ));

    return (
        <div className="container mx-auto md:py-8 pt-4 relative">
            <h5 className="md:text-sm  text-xs tracking-wider  text-blue-600 uppercase font-bold">
                What’s trending in the new car market?
            </h5>
            <h2 className="md:text-lg text-md font-semibold capitalize">
                Here are some of the featured new cars in the UAE
            </h2>

            <div className="absolute top-10 right-0 xl:block hidden">
                
            </div>



            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
                <div className="xl:col-span-3 relative half-card-slider hidden sm:block">
                    <Slider {...sliderSettings}>
                        {featuredCars?.carModels?.map((car) => (
                            <div className="px-2" key={car.id}>
                                <CarCard car={car} />
                            </div>
                        ))}
                    </Slider>
                    <div className="md:block hidden mt-4">
                       
                    </div>
                </div>
                <div className="sm:hidden block overflow-x-auto m-2 custom-scrollbar">
                    <div className="flex nowrap pr-1">
                        {featuredCars?.carModels?.map((car) => (
                            <div className="inline-block pr-2" style={{ minWidth: '75%' }} key={car.id}>
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:hidden block sm:mb-4 w-full">
                    <Suspense fallback={<div>Loading ad...</div>}><Ad300X250 dataAdSlot="4521415159" /></Suspense>
                </div>
            </div>
        </div>
    );
}
