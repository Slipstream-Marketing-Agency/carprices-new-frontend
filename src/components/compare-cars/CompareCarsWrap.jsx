"use client"

import React, { useEffect, useState } from 'react';
import MultiStepCarSelection from '@/components/compare-cars/MultiStepCarSelection';
import CompareCarCard from '@/components/compare-cars/CompareCarCard';
import CarComparisonTable from '@/components/compare-cars/CarComparisonTable';
import { fetchCarComparisonData } from '@/lib/fetchCarComparisonData';

export default function CompareCarsWrap({ params, slugOverride = null }) {
    const slug = slugOverride || params.slug || "default-slug";
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [loadingIndices, setLoadingIndices] = useState([]); // State to handle individual card loading

    useEffect(() => {
        // Fetch car comparison data
        setLoading(true);
        fetchCarComparisonData(slug).then((fetchedCars) => {
            setCars(fetchedCars);
            setLoading(false);
        });
    }, [slug]);

    const handleAddCar = (index) => {
        setLoadingIndices((prev) => [...prev, index]);
    };

    const handleAddCarComplete = (index) => {
        setLoadingIndices((prev) => prev.filter((i) => i !== index));
    };

    const canAddMoreCars = cars.length < 4;
    const toBeAddedLength = Array.from(
        { length: 4 - cars.length },
        (_, index) => index + 1
    );

    const tableData = cars;

    return (
        <div className="container">
            <div className='my-6'>
                <h1 className='text-2xl font-semibold mb-3'>Compare Cars in UAE</h1>
                <p>
                    Simplifying Your Decision-Making Process. Compare Your Ideal Cars
                    with Our Comprehensive Tool – Price, Features, Specifications, Fuel
                    Efficiency, Performance, Dimensions, Safety, and More for an
                    Informed Purchase!
                </p>
            </div>

            <div className="grid grid-cols-12 gap-3">
                {cars.map((carData, index) => (
                    <div key={index} className="md:col-span-3 col-span-6">
                        {loadingIndices.includes(index) ? (
                            <div className="flex justify-center items-center border-solid border border-gray-200 rounded-lg h-[340px]">
                                <div className="loader">Loading...</div>
                            </div>
                        ) : (
                            <CompareCarCard key={index} carData={carData} />
                        )}
                    </div>
                ))}

                {canAddMoreCars &&
                    toBeAddedLength.map((item, index) => (
                        <div key={index} className="md:col-span-3 col-span-6">
                            <div className="flex justify-center items-center border-solid border border-gray-200 rounded-lg h-[340px]">
                                <MultiStepCarSelection
                                    mode="add"
                                    onAddCar={() => handleAddCar(index)}
                                    onAddCarComplete={() => handleAddCarComplete(index)}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            {tableData.length > 0 && <CarComparisonTable tableData={tableData} />}
        </div>
    );
}
