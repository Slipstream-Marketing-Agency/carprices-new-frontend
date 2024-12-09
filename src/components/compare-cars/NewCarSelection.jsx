"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import CarSelectionModal from './CarSelectionModal'; // Import your modal component
import AddIcon from '@mui/icons-material/Add';
import AsyncSelect from "react-select/async"; // Install react-select using `npm install react-select`

const NewCarSelection = ({ carData, mode, cars, setCars }) => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const router = useRouter();
    const pathname = usePathname();

    const [selectedSlug, setSelectedSlug] = useState([])
    console.log(selectedSlug, cars, 'selectedSlug')

    // Handle variant selection from CarSelectionModal
    const handleVariantSelect = (variantData) => {
        const newVariantMainSlug = variantData.mainSlug; // Assuming mainSlug is the identifier

        if (pathname === '/compare-cars') {
            setSelectedSlug((prevSlugs) => {
                // Create a copy of the current slugs
                const slugArray = [...prevSlugs];

                if (mode === "update") {
                    // Find the index of the slug that matches `carData`
                    const index = slugArray.findIndex((slug) => slug === carData);
                    if (index !== -1) {
                        // Update the existing entry
                        slugArray[index] = newVariantMainSlug;
                    }
                } else if (mode === "add") {
                    // Add the new slug to the array
                    slugArray.push(newVariantMainSlug);
                }

                return slugArray; // Return the updated array
            });
            // Update cars state
            setCars((prevCars) => {
                const carsArray = [...prevCars];

                if (mode === "update") {
                    const index = carsArray.findIndex((car) => car.mainSlug === carData);
                    if (index !== -1) {
                        // Replace the existing entry with the new variant data
                        carsArray[index] = variantData;
                    }
                } else if (mode === "add") {
                    // Add the new variant data to the array
                    carsArray.push(variantData);
                }

                return carsArray; // Return the updated array
            });
        } else {

            const currentPath = pathname;

            let basePath, comparisonSlugs;

            if (currentPath.includes("/compare-cars/") && currentPath.split("/compare-cars/")[1]) {
                [basePath, comparisonSlugs] = currentPath.split("/compare-cars/");
                basePath += "/compare-cars";
            } else {
                basePath = "/compare-cars";
                comparisonSlugs = "";
            }

            let slugArray = comparisonSlugs.split("-vs-").filter(Boolean);

            if (slugArray.includes(newVariantMainSlug)) {
                alert("This car variant is already in the comparison list.");
                return;
            }

            if (mode === "update") {
                const index = slugArray.findIndex((slug) => slug === carData);
                if (index !== -1) {
                    slugArray[index] = newVariantMainSlug;
                }
            } else if (mode === "add") {
                slugArray.push(newVariantMainSlug);
            }

            const updatedPath = `${basePath}/${slugArray.join("-vs-")}`;
            router.push(updatedPath);
        }

        setSelectedYear(variantData.year);
        // setSelectedBrand(variantData.brand);
        setSelectedModel(variantData.model);
        setSelectedVariant(variantData.name); // Use variant's name
        setShowModal(false); // Close modal after selection
    };

    // const [showModal, setShowModal] = useState(false);
    // const [selectedModel, setSelectedModel] = useState("");
    // const [selectedVariant, setSelectedVariant] = useState("");

    // Function to fetch models from the backend
    // const fetchModels = async (inputValue) => {
    //     const response = await fetch(`/api/models?search=${inputValue}`);
    //     const data = await response.json();
    //     return data.map((model) => ({
    //         label: model.name, // Adjust based on API response
    //         value: model.id,
    //     }));
    // };

    // // Function to fetch variants based on the selected model
    // const fetchVariants = async (inputValue) => {
    //     if (!selectedModel) return [];
    //     const response = await fetch(`/api/variants?model_id=${selectedModel.value}&search=${inputValue}`);
    //     const data = await response.json();
    //     return data.map((variant) => ({
    //         label: variant.name, // Adjust based on API response
    //         value: variant.id,
    //     }));
    // };

    // Sample data for models
    const sampleModels = [
        { id: 1, name: "Toyota Corolla" },
        { id: 2, name: "Honda Civic" },
        { id: 3, name: "Ford Focus" },
    ];

    // Sample data for variants
    const sampleVariants = {
        1: [
            { id: 101, name: "Corolla LE" },
            { id: 102, name: "Corolla SE" },
        ],
        2: [
            { id: 201, name: "Civic EX" },
            { id: 202, name: "Civic LX" },
        ],
        3: [
            { id: 301, name: "Focus S" },
            { id: 302, name: "Focus SE" },
        ],
    };

    // Simulate fetching models
    const fetchModels = async (inputValue) => {
        return sampleModels
            .filter((model) => model.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((model) => ({
                label: model.name,
                value: model.id,
            }));
    };

    // Simulate fetching variants
    const fetchVariants = async (inputValue) => {
        if (!selectedModel) return [];
        const variants = sampleVariants[selectedModel.value] || [];
        
        if (inputValue.length<1) return variants;
        return variants
            .filter((variant) => variant.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((variant) => ({
                label: variant.name,
                value: variant.id,
            }));
    };


    return (
        <>
            {mode === "add" ? (
                <>
                    <div className="flex items-center justify-center flex-col bg-white p-4">
                        <div className="flex items-center justify-center cursor-pointer border-dashed h-28 w-28 border-2 border-blue-600 rounded-lg mb-3">
                            <AddIcon className="text-blue-600 !text-4xl" />
                        </div>
                        <h5 className="text-gray-500 mb-3">Add car</h5>
                        <div className="w-full">
                            {/* Searchable Select for Brand/Model */}
                            <AsyncSelect
                                cacheOptions
                                loadOptions={fetchModels}
                                defaultOptions
                                placeholder="Select Brand/Model"
                                onChange={(selectedOption) => {
                                    setSelectedModel(selectedOption);
                                    setSelectedVariant(null); // Reset variant when model changes
                                }}
                                className="mb-3"
                            />

                            {/* Searchable Select for Variant */}
                            <AsyncSelect
                                cacheOptions
                                loadOptions={fetchVariants}
                                defaultOptions
                                placeholder="Select Variant"
                                isDisabled={!selectedModel} // Disable if no model is selected
                                onChange={(selectedOption) => setSelectedVariant(selectedOption)}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="absolute top-3 left-3">
                    <button
                        className="bg-white font-semibold flex items-center"
                        onClick={() => setShowModal(true)}
                    >
                        <EditIcon className="text-sm mr-2" /> Change Car
                    </button>
                </div>
            )}
        </>
    );
};

export default NewCarSelection;
