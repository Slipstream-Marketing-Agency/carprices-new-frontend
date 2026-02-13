'use client';

import React, { useState } from 'react';

const FilterModal = () => {
    const [activeTab, setActiveTab] = useState('brand'); // Manage active tab
    const [isModalOpen, setModalOpen] = useState(false); // Manage modal state
    const [selectedFilter, setSelectedFilter] = useState('brand'); // Store the selected filter

    const brands = [
        { name: 'Hyundai', count: 2 },
        { name: 'Tesla', count: 5 },
        { name: 'Abarth', count: 1 },
        { name: 'Audi', count: 3 },
        { name: 'Chevrolet', count: 1 },
        { name: 'Genesis', count: 3 },
        { name: 'GMC', count: 1 },
        { name: 'Jaguar', count: 1 },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setModalOpen(false); // Close modal after selecting
    };

    const handleFilterButtonClick = (filter) => {
        handleTabChange(filter);
        setSelectedFilter(filter);
        // toggleModal();
    }

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex space-x-4 mt-6">
                <button
                    className={`${activeTab === 'brand' ? 'bg-blue-200 text-blue-600' : 'bg-gray-100 text-gray-600'
                        } px-4 py-2 rounded-md font-semibold`}
                    onClick={() => { handleFilterButtonClick('brand') }}
                >
                    By Brand
                </button>
                <button
                    className={`${activeTab === 'price' ? 'bg-blue-200 text-blue-600' : 'bg-gray-100 text-gray-600'
                        } px-4 py-2 rounded-md font-semibold`}
                    onClick={() => { handleFilterButtonClick('price') }}
                >
                    By Price
                </button>
                <button
                    className={`${activeTab === 'range' ? 'bg-blue-200 text-blue-600' : 'bg-gray-100 text-gray-600'
                        } px-4 py-2 rounded-md font-semibold`}
                    onClick={() => { handleFilterButtonClick('range') }}
                >
                    By Range
                </button>
            </div>

            {/* Selected Filter */}
            {selectedFilter !== null && (
                <div
                    className="border px-4 py-2 mt-3 capitalize rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200"
                    onClick={() => toggleModal()}
                >
                    Select {selectedFilter}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-96 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Select {activeTab === 'brand' ? 'Brand' : activeTab === 'price' ? 'Price' : 'Driving Range'}</h2>
                            <button onClick={toggleModal} className="text-gray-500 hover:text-gray-800">
                                ✕
                            </button>
                        </div>
                        {activeTab === 'brand' && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search Brand"
                                    className="w-full mb-4 px-4 py-2 border rounded-md"
                                />
                                <ul>
                                    {brands.map((brand, index) => (
                                        <li
                                            key={`brand-${index}`}
                                            className="cursor-pointer py-2 border-b last:border-none hover:bg-gray-100"
                                            onClick={() => handleFilterSelect(brand.name)}
                                        >
                                            {brand.name} ({brand.count})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'price' && (
                            <div>
                                <p className="text-gray-600">Price filter options...</p>
                            </div>
                        )}
                        {activeTab === 'range' && (
                            <div>
                                <p className="text-gray-600">Range filter options...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterModal;
