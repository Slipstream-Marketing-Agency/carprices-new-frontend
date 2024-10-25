"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CarCard from "../car-components/CarCard";
import { getCarSection } from "@/lib/api";
import CarCardSkeleton from "../car-components/CarCardSkeleton"; // Import Skeleton
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function MostPopularCarSection() {
    const categories = [
        {
            id: 1,
            name: "Most Popular",
            slug: "popular",
        },
        {
            id: 2,
            name: "Electric Cars",
            slug: "electric",
        },
        {
            id: 3,
            name: "SUVs",
            slug: "suvs",
        },
        {
            id: 4,
            name: "Performance Cars",
            slug: "performance",
        },
    ];

    const [selectedTab, setSelectedTab] = useState("popular");
    const [filteredCars, setFilteredCars] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const Arrow = ({ className, onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            <span>{direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</span>
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
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

    useEffect(() => {
        let isMounted = true;
        setLoading(true); // Set loading to true when tab changes

        const fetchData = async () => {
            try {
                const fetchedFilteredCars = await getCarSection(selectedTab);
                if (isMounted) {
                    setFilteredCars(fetchedFilteredCars ? (fetchedFilteredCars.length > 0 ? fetchedFilteredCars[0] : null) : null);
                    setLoading(false); // Set loading to false once data is fetched
                }
            } catch (err) {
                if (isMounted) {
                    console.log("Failed to fetch filteredCars", err);
                    setLoading(false); // Set loading to false on error
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [selectedTab]);

    return (
        <div className="md:min-h-[650px] min-h-[500px] container">
            <div className="flex flex-col  md:mt-12 mt-2">
                <div className="flex flex-col self-start sm:px-5 max-md:max-w-full">
                    <h5 className="md:text-sm  text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold ">
                        Most popular new cars in the UAE
                    </h5>
                    <h2 className="md:text-lg text-md font-semibold capitalize">
                        Here are some of the most popular new cars users look for in the UAE
                    </h2>
                </div>

                <div className="flex md:gap-5 gap-2 md:justify-between mt-3 w-full text-base leading-4 text-center text-neutral-900 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex md:gap-5 gap-2 md:justify-between sm:px-5 overflow-x-scroll custom-scrollbar">
                        {categories.map((category, index) => (
                            <div key={index} className="flex flex-col justify-center">
                                <div
                                    className={` whitespace-nowrap font-semibold justify-center md:text-sm text-xs  md:px-8 px-6 md:py-2 py-3 border border-solid rounded-[73px] max-md:px-5 cursor-pointer ${selectedTab === category.slug ? "bg-neutral-900 text-white" : "bg-violet-100 border-violet-100"
                                        }`}
                                    onClick={() => setSelectedTab(category.slug)}
                                >
                                    {category.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                    <div className="xl:col-span-3 relative hidden sm:block">
                        <Slider {...sliderSettings}>
                            {loading ? (
                                // Show skeletons while loading
                                [1, 2, 3, 4].map((_, index) => (
                                    <div className="px-2" key={index}>
                                        <CarCardSkeleton />
                                    </div>
                                ))
                            ) : (
                                // Show actual car cards after loading
                                filteredCars?.carModels?.map((car) => (
                                    <div className="px-2" key={car.id}>
                                        <CarCard car={car} />
                                    </div>
                                ))
                            )}
                        </Slider>
                    </div>
                    <div className="sm:hidden block overflow-x-auto m-2 custom-scrollbar">
                        <div className="flex nowrap pr-1">
                            {loading ? (
                                // Show skeletons for small screen while loading
                                [1, 2].map((_, index) => (
                                    <div className="inline-block pr-2" style={{ minWidth: '75%' }} key={index}>
                                        <CarCardSkeleton />
                                    </div>
                                ))
                            ) : (
                                filteredCars?.carModels?.map((car) => (
                                    <div className="inline-block pr-2" style={{ minWidth: '75%' }} key={car.id}>
                                        <CarCard car={car} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
