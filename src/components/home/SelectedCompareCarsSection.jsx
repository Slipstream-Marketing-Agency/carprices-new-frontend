"use client"
import { useEffect, useState } from 'react';
import { Select } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PrimaryButton from '../buttons/PrimaryButton';


export default function SelectedCompareCarsSection() {
    const [carComparisons, setCarComparisons] = useState([]);

    useEffect(() => {
        // Fetch the car comparison data from the API
        async function fetchCarComparisons() {
            try {
                const response = await fetch('http://localhost:1337/api/compare-car/home');
                const data = await response.json();
                setCarComparisons(data);
            } catch (error) {
                console.error('Error fetching car comparison data:', error);
            }
        }

        fetchCarComparisons();
    }, []);

    const Arrow = ({ className, onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            <span>{direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</span>
        </div>
    );


    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
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

    return (
        <div className="w-full md:px-0 px-5 md:mt-12 mt-6">
            <div className="relative flex justify-between container">
                <div className="flex flex-col justify-center">
                    <h5 className="md:text-sm  text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold ">
                        Discover the Ultimate Rivalry
                    </h5>
                    <h2 className="md:text-lg text-md font-semibold capitalize">
                        Top Car Comparisons to Help You Decide
                    </h2>

                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 container">
                <div className="xl:col-span-3 relative half-card-slider ">
                    <Slider {...sliderSettings}>
                        {carComparisons.map((comparison) => {
                            // Check if there are at least two car models for the comparison
                            if (comparison.carModels.length < 2) return null;

                            // Generate the comparison URL
                            const firstCarSlug = comparison.carModels[0].highTrim.mainSlug;
                            const secondCarSlug = comparison.carModels[1].highTrim.mainSlug;
                            const comparisonUrl = `/compare-cars/${firstCarSlug}-vs-${secondCarSlug}`;

                            return (
                                <div key={comparison.id} className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg">
                                    <div className="flex flex-col md:flex-row justify-center items-center relative">
                                        {/* Vertical line with fading effect for desktop */}
                                        <div className="hidden absolute md:block inset-x-0 top-1/4 bottom-1/4 mx-auto w-px bg-gray-300 opacity-50"></div>

                                        {/* Render the first car */}
                                        {comparison.carModels[0] && (
                                            <div className="flex flex-col items-center mb-4 md:mb-0">
                                                <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                                    <Image
                                                        src={comparison.carModels[0].highTrim.featuredImage}
                                                        alt={comparison.carModels[0].name}
                                                        width={0}
                                                        height={0}
                                                        sizes="100vw"
                                                        className="w-full h-40 object-contain rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                                    <h6 className="text-xs tracking-wider leading-4 text-blue-600 uppercase font-bold m-0">
                                                        {comparison.carModels[0].brand.name}
                                                    </h6>
                                                    <h4 className="text-base text-gray-900 font-semibold m-0 xl:text-lg">
                                                        {comparison.carModels[0].name}
                                                    </h4>
                                                    <span className="m-0 text-neutral-900 font-bold md:text-[21px] ">
                                                        AED {comparison.carModels[0].minPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Vs indicator */}
                                        <div className="mx-4 text-center flex flex-col justify-center">
                                            <div className="bg-blue-600 rounded-full px-3 z-10 p-2">
                                                <div className="text-base font-bold text-white">Vs</div>
                                            </div>
                                        </div>

                                        {/* Render the second car */}
                                        {comparison.carModels[1] && (
                                            <div className="flex flex-col items-center">
                                                <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                                    <Image
                                                        src={comparison.carModels[1].highTrim.featuredImage}
                                                        alt={comparison.carModels[1].name}
                                                        width={0}
                                                        height={0}
                                                        sizes="100vw"
                                                        className="w-full h-40 object-contain rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                                    <h6 className="text-xs tracking-wider leading-4 text-blue-600 uppercase font-bold m-0">
                                                        {comparison.carModels[1].brand.name}
                                                    </h6>
                                                    <h4 className="text-base text-gray-900 font-semibold m-0 xl:text-lg">
                                                        {comparison.carModels[1].name}
                                                    </h4>
                                                    <span className="m-0 text-neutral-900 font-bold md:text-[21px] ">
                                                        AED {comparison.carModels[1].minPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <PrimaryButton label={`Compare Now`} href={comparisonUrl} additionalClass='w-full mt-4' />

                                </div>
                            );
                        })}
                    </Slider>
                </div>
            

            </div>
            <div className='flex justify-center w-full'>
                    <PrimaryButton label={`Compare More Cars`} href={"/compare-cars"} />

                </div>
        </div>
    );
}
