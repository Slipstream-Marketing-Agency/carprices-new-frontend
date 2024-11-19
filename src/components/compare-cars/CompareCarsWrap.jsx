"use client"

import React, { useEffect, useState } from 'react';
import MultiStepCarSelection from '@/components/compare-cars/MultiStepCarSelection';
import CompareCarCard from '@/components/compare-cars/CompareCarCard';
import CarComparisonTable from '@/components/compare-cars/CarComparisonTable';
import { fetchCarComparisonData } from '@/lib/fetchCarComparisonData';
import { usePathname, useRouter } from 'next/navigation';

export default function CompareCarsWrap({ params, slugOverride = null }) {
    const slug = slugOverride || params.slug || "default-slug";
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [loadingIndices, setLoadingIndices] = useState([]); // State to handle individual card loading

    const pathname = usePathname();
    const router = useRouter();

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

    const getMaxCars = () => {
        if (typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches) {
            // Small devices
            return 2;
        } else {
            // Larger devices
            return 4;
        }
    };

    const [maxCars, setMaxCars] = useState(getMaxCars());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setMaxCars(getMaxCars());
            };

            // Add event listener for window resize
            window.addEventListener('resize', handleResize);

            // Initial check on component mount
            handleResize();

            // Cleanup event listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const canAddMoreCars = cars.length < maxCars;
    const toBeAddedLength = Array.from(
        { length: maxCars - cars.length },
        (_, index) => index + 1
    );

    const handleCompareCarClick = () => {
        if (cars.length >= 2) {
            // Create a string of mainSlugs joined by '-vs-'
            const slugString = cars.map(car => car.mainSlug).join('-vs-');

            // Navigate to the compare route
            router.push(`/compare-cars/${slugString}`);
        } else {
            alert('Please select at least 2 cars to compare.');
        }
    }

    const tableData = cars;

    return (
        <div className="">
            <div className='my-6 container'>
                <h1 className='text-2xl font-semibold mb-3'>Compare Cars in UAE</h1>
                <p>
                    Simplifying Your Decision-Making Process. Compare Your Ideal Cars
                    with Our Comprehensive Tool – Price, Features, Specifications, Fuel
                    Efficiency, Performance, Dimensions, Safety, and More for an
                    Informed Purchase!
                </p>
            </div>

            <div className="grid grid-cols-12 gap-3 container">
                {cars.map((carData, index) => (
                    <div key={index} className="md:col-span-3 col-span-6">
                        {loadingIndices.includes(index) ? (
                            <div className="flex justify-center items-center border-solid border border-gray-200 rounded-lg h-[320px]">
                                <div className="loader">Loading...</div>
                            </div>
                        ) : (
                            <CompareCarCard key={index} carData={carData} cars={cars} setCars={setCars} />
                        )}
                    </div>
                ))}

                {canAddMoreCars &&
                    toBeAddedLength.map((item, index) => (
                        <div key={index} className="md:col-span-3 col-span-6">
                            <div className="flex justify-center items-center border-solid border shadow-md border-gray-200 rounded-lg h-[320px]">
                                <MultiStepCarSelection
                                    mode="add"
                                    onAddCar={() => handleAddCar(index)}
                                    onAddCarComplete={() => handleAddCarComplete(index)}
                                    cars={cars}
                                    setCars={setCars}
                                />
                            </div>
                        </div>
                    ))}

            </div>
            {pathname === '/compare-cars' &&
                <div className='w-full flex justify-center container'>
                    <button onClick={handleCompareCarClick} disabled={cars.length < 1} className={`px-5 py-2 mt-4 text-center border rounded-md md:text-[16px] text-[12px] 
                    ${cars.length < 1 ? 'bg-gray-300 text-white border-gray-300' : 'bg-blue-600 text-white border-blue-600'}`}>
                        Compare Cars
                    </button>
                </div>
            }

            {(tableData.length > 0 && pathname !== '/compare-cars') && <CarComparisonTable tableData={tableData} />}
        </div>
    );
}
