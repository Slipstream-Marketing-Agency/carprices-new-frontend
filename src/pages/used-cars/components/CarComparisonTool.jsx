import Image from "next/image";
import React, { useState } from "react";

const CarComparisonTool = () => {
    const [selectedCars, setSelectedCars] = useState([]);

    // Car data
    const cars = [
        {
            id: 1,
            brand: "Toyota",
            model: "Camry",
            price: "$24,000",
            engine: "2.5L 4-cylinder",
            mileage: "25,000 miles",
            year: 2020,
            image: "https://example.com/camry.jpg",
        },
        {
            id: 2,
            brand: "Honda",
            model: "Civic",
            price: "$21,000",
            engine: "2.0L 4-cylinder",
            mileage: "18,000 miles",
            year: 2021,
            image: "https://example.com/civic.jpg",
        },
        {
            id: 3,
            brand: "Ford",
            model: "Mustang",
            price: "$32,000",
            engine: "5.0L V8",
            mileage: "12,000 miles",
            year: 2019,
            image: "https://example.com/mustang.jpg",
        },
        // Add more cars as needed...
    ];

    // Handle car selection logic
    const handleCarSelection = (car) => {
        if (selectedCars.find((c) => c.id === car.id)) {
            setSelectedCars(selectedCars.filter((c) => c.id !== car.id));
        } else if (selectedCars.length < 3) {
            setSelectedCars([...selectedCars, car]);
        }
    };

    // Car Comparison Table
    const CarComparison = () => {
        if (selectedCars.length < 2) return null;

        return (
            <div className="tw-w-full tw-mt-8 tw-overflow-auto">
                <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-4">
                    Comparison Table
                </h2>
                <table className="tw-w-full tw-border-collapse tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
                    <thead className="tw-bg-gray-100">
                        <tr>
                            <th className="tw-px-4 tw-py-3 tw-text-left tw-text-gray-600 tw-text-sm tw-font-bold">
                                Feature
                            </th>
                            {selectedCars.map((car) => (
                                <th key={car.id} className="tw-px-4 tw-py-3 tw-text-left tw-text-gray-600 tw-text-sm tw-font-bold">
                                    {car.brand} {car.model}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: "Price", key: "price" },
                            { label: "Engine", key: "engine" },
                            { label: "Mileage", key: "mileage" },
                            { label: "Year", key: "year" },
                        ].map(({ label, key }) => (
                            <tr key={key} className="tw-bg-gray-50 hover:tw-bg-gray-100">
                                <td className="tw-px-4 tw-py-2 tw-border tw-font-bold">{label}</td>
                                {selectedCars.map((car) => (
                                    <td key={car.id} className="tw-px-4 tw-py-2 tw-border tw-text-gray-700">
                                        {car[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="tw-container tw-mx-auto tw-px-4">
            <h1 className="tw-text-3xl tw-font-extrabold tw-text-center tw-mt-6 tw-text-gray-800">
                Car Comparison Tool
            </h1>

            {/* Car Selection */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8 tw-mt-8">
                {cars.map((car) => (
                    <div
                        key={car.id}
                        className={`tw-relative tw-border tw-p-4 tw-rounded-xl tw-shadow-lg tw-transform tw-transition-all tw-duration-300 hover:tw-scale-105 ${selectedCars.find((c) => c.id === car.id)
                            ? "tw-border-blue-500 tw-bg-blue-50"
                            : "tw-border-gray-200 tw-bg-white"
                            }`}
                        onClick={() => handleCarSelection(car)}
                    >
                        <Image
                            fill={true}
                            src={car.image}
                            alt={car.model}
                            className="tw-h-40 tw-w-full tw-object-cover tw-rounded-lg tw-mb-4"
                        />
                        <h2 className="tw-text-xl tw-font-bold tw-mb-2 tw-text-gray-900">
                            {car.brand} {car.model}
                        </h2>
                        <p className="tw-text-gray-700 tw-mb-1">Price: {car.price}</p>
                        <p className="tw-text-gray-700 tw-mb-1">Engine: {car.engine}</p>
                        <p className="tw-text-gray-700 tw-mb-1">Mileage: {car.mileage}</p>
                        <p className="tw-text-gray-700">Year: {car.year}</p>
                        <div className={`tw-absolute tw-top-4 tw-right-4 tw-h-6 tw-w-6 tw-rounded-full tw-border ${selectedCars.find((c) => c.id === car.id) ? "tw-bg-blue-500" : "tw-bg-gray-300"} tw-flex tw-items-center tw-justify-center`}>
                            {selectedCars.find((c) => c.id === car.id) ? "✓" : ""}
                        </div>
                    </div>
                ))}
            </div>

            {/* Car Comparison Section */}
            <CarComparison />
        </div>
    );
};

export default CarComparisonTool;
