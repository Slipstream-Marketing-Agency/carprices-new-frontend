"use client";

import React, { useEffect, useState } from 'react'
import CarCardSkeleton from '../car-components/CarCardSkeleton';
import CarCard from '../car-components/CarCard';
import CardSliderWrapper from '../car-components/CardSliderWrapper';
import { getCarSection } from '@/lib/api';

const CustomCarSlider = ({ selectedTab, heading }) => {
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
        <div className="flex flex-col md:mt-4 mt-2 shadow-md rounded-xl p-3">
            <div className="flex justify-between gap-5 px-1 w-full max-md:flex-wrap">
                <h2 className="md:text-2xl text-md font-semibold capitalize">
                    {heading}
                </h2>
            </div>
            {loading
                ?
                <div className="mt-1 w-full">
                    <CardSliderWrapper
                        responsive={{
                            mobile: 1.5,
                            tablet: 2.5,
                            desktop: 4.5,
                        }}
                    >
                        {/* // Show actual car cards after loading */}
                        {[1, 2, 3, 4, 5].map((_, index) => (
                                <CarCardSkeleton key={`_-${index}`} />
                        ))}
                    </CardSliderWrapper>
                </div>
                :
                <div className="mt-1 w-full">
                    {filteredCars?.carModels?.length > 0 ? (
                        <CardSliderWrapper
                            responsive={{
                                mobile: 1.5,
                                tablet: 2.5,
                                desktop: 4.5,
                            }}
                        >
                            {/* // Show actual car cards after loading */}
                            {filteredCars?.carModels?.map((car, i) => (
                                <CarCard car={car} key={i} />
                            ))}
                        </CardSliderWrapper>
                    ) : (
                        <div className="text-center text-gray-500">No articles available</div>
                    )}
                </div>
            }
        </div>
    )
}

export default CustomCarSlider