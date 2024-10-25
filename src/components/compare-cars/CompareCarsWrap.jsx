import MultiStepCarSelection from '@/components/compare-cars/MultiStepCarSelection';
import React from 'react';
import CompareCarCard from '@/components/compare-cars/CompareCarCard';
import CarComparisonTable from '@/components/compare-cars/CarComparisonTable';
import { fetchCarComparisonData } from '@/lib/fetchCarComparisonData';

export default async function CompareCarsWrap({ params, slugOverride = null }) {
    const slug = slugOverride || params.slug || "default-slug";

    console.log(params, "slugslug");


    // Fetch car comparison data
    const cars = await fetchCarComparisonData(slug);

    console.log(cars, "ddddd");

    const canAddMoreCars = cars.length < 4;
    const toBeAddedLength = Array.from(
        { length: 4 - cars.length },
        (_, index) => index + 1
    );

    const tableData = cars;
    return (
        <div className="container ">
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
                {/* Render the car comparison cards */}
                {cars.map((carData, index) => (
                    <CompareCarCard key={index} carData={carData} />
                ))}

                {/* Option to add more cars */}
                {canAddMoreCars &&
                    toBeAddedLength.map((item, index) => (
                        <div key={index} className="md:col-span-3 col-span-6">
                            <div className="flex justify-center items-center border-solid border border-gray-200 rounded-lg h-[340px]">
                                <MultiStepCarSelection mode="add" />
                            </div>
                        </div>
                    ))}
            </div>

            {/* Render the comparison table if there is data */}
            {tableData.length > 0 && <CarComparisonTable tableData={tableData} />}
        </div>
    )
}
