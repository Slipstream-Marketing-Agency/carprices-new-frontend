'use client';
import React, { useEffect, useState } from 'react';
import { fetchDealerBranches, fetchDealers } from '@/lib/api';
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CallIcon from '@mui/icons-material/Call';
import Link from 'next/link';

const CarDealersHome = ({ brandName, brandSlug }) => {
    const [dealers, setDealers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [loadingBranches, setLoadingBranches] = useState(true);
    const [loadingDealers, setLoadingDealers] = useState(true);

    useEffect(() => {
        const loadBranches = async () => {
            try {
                setLoadingBranches(true);
                const branchData = await fetchDealerBranches();
                setBranches(branchData.branches);
            } catch (error) {
                console.error('Failed to load branches:', error);
            } finally {
                setLoadingBranches(false);
            }
        };

        loadBranches();
    }, []);

    useEffect(() => {
        const loadDealers = async () => {
            try {
                setLoadingDealers(true);
                const data = await fetchDealers(brandSlug, 1, 10, selectedBranch);
                setDealers(data.dealers);
            } catch (error) {
                console.error('Failed to load dealers:', error);
            } finally {
                setLoadingDealers(false);
            }
        };

        loadDealers();
    }, [brandSlug, selectedBranch]);

    const handleBranchClick = (branchSlug) => {
        setSelectedBranch(branchSlug);
    };

    const Arrow = ({ onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            {direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: Math.min(dealers.length, 4),
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
                    slidesToShow: Math.min(dealers.length, 2),
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: Math.min(dealers.length, 1),
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mb-10">
            <div className="flex flex-col self-start max-md:max-w-full mb-6">
                <h5 className="md:text-sm text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                Explore the UAE’s Most Popular Car Dealers
                </h5>
                <h2 className="md:text-lg text-md font-semibold capitalize">
                Explore branches in your city for the best car buying experience
                </h2>
            </div>

            <div className="flex md:gap-5 gap-2 md:justify-between mt-3 w-full text-base leading-4 text-center text-neutral-900 max-md:flex-wrap max-md:max-w-full">
                <div className="flex md:gap-5 gap-2 md:justify-between sm:px-5 overflow-x-scroll custom-scrollbar cursor-grab">
                    {loadingBranches ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-24 h-10 bg-gray-200 animate-pulse rounded-full mx-2"
                            ></div>
                        ))
                    ) : (
                        <>
                            <button
                                className={`whitespace-nowrap font-semibold justify-center md:text-sm text-xs md:px-8 px-6 md:py-2 py-3 border border-solid rounded-[73px] max-md:px-5 cursor-pointer ${selectedBranch === '' ? 'bg-neutral-900 text-white' : 'bg-violet-100 border-violet-100'}`}
                                onClick={() => handleBranchClick('')}
                            >
                                All
                            </button>
                            {branches.map((branch) => (
                                <button
                                    key={branch.slug}
                                    className={`whitespace-nowrap font-semibold justify-center md:text-sm text-xs md:px-8 px-6 md:py-2 py-3 border border-solid rounded-[73px] max-md:px-5 cursor-pointer ${selectedBranch === branch.slug ? 'bg-neutral-900 text-white' : 'bg-violet-100 border-violet-100'}`}
                                    onClick={() => handleBranchClick(branch.slug)}
                                >
                                    {branch.name}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {loadingDealers ? (
                <div className="flex gap-4 mt-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-[190px] animate-pulse shadow rounded-lg p-5 flex flex-col justify-between"
                        >
                            <div className="h-6 bg-gray-300 rounded w-3/4 "></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 "></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="mt-3 flex items-center space-x-2">
                                <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Slider {...sliderSettings}>
                    {dealers.map((dealer) => (
                        <div key={dealer.id} className="px-2">
                            <Link href={`tel:${dealer.phone_number}`} className="block">
                                <div className="bg-white rounded-lg shadow-md p-5 h-[190px] flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{dealer.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2 font-semibold">{dealer.dealer_branch.name}</p>
                                        <p className="text-sm text-gray-600">{dealer.address}</p>
                                    </div>
                                    <div className="contact-info flex items-center mt-3 space-x-2">
                                        <span role="img" aria-label="phone" className="bg-blue-500 p-1 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                                            <CallIcon className="text-white text-lg" />
                                        </span>
                                        <span className="text-blue-600 hover:underline">
                                            {dealer.phone_number}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            )}

        </div>
    );
};

export default CarDealersHome;
