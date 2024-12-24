import React, { useState } from "react";
import LoadingAnimation from "../compare-cars/LoadingAnimation";
import Image from "next/image";

const CarSelectionModal = ({
    isOpen,
    onClose,
    onVariantSelect,
}) => {
    const [currentStep, setCurrentStep] = useState("model");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);

    const sampleModels = [
        { id: 1, name: "Toyota Corolla", image: "/assets/images/blog-alt-image.png" },
        { id: 2, name: "Honda Civic", image: "/assets/images/blog-alt-image.png" },
        { id: 3, name: "Ford Focus", image: "/assets/images/blog-alt-image.png" },
    ];

    const sampleVariants = {
        1: [
            { id: 101, name: "Corolla LE", image: "/assets/images/blog-alt-image.png" },
            { id: 102, name: "Corolla SE", image: "/assets/images/blog-alt-image.png" },
        ],
        2: [
            { id: 201, name: "Civic EX", image: "/assets/images/blog-alt-image.png" },
            { id: 202, name: "Civic LX", image: "/assets/images/blog-alt-image.png" },
        ],
        3: [
            { id: 301, name: "Focus S", image: "/assets/images/blog-alt-image.png" },
            { id: 302, name: "Focus SE", image: "/assets/images/blog-alt-image.png" },
        ],
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setCurrentStep("variant");
        setSearchTerm("");
    };

    const handleVariantSelect = (variant) => {
        onVariantSelect({ ...variant, model: selectedModel });
        onClose();
    };

    const handleBack = () => {
        setCurrentStep("model");
        setSearchTerm("");
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filterOptions = (list) => {
        if (!searchTerm) return list;
        return list.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const models = sampleModels;
    const variants = selectedModel ? sampleVariants[selectedModel.id] || [] : [];

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center">
            <div
                id="slideover-container"
                className={`w-full h-full fixed z-[999] inset-0 ${isOpen ? "visible" : "invisible"
                    }`}
            >
                <div
                    onClick={onClose}
                    id="slideover-bg"
                    className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isOpen ? "opacity-50" : "opacity-0"
                        }`}
                />
                <div
                    id="slideover"
                    className={`w-full md:w-[60%] rounded-tl-2xl rounded-bl-2xl bg-white h-full absolute right-0 duration-300 ease-out transition-all ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="bg-blue-500 w-full p-8 flex justify-between text-3xl text-white">
                        <div>
                            {currentStep === "model" ? "Select Model" : "Select Variant"}
                        </div>
                    </div>
                    <div className="p-6">
                        {currentStep === "variant" && (
                            <button
                                onClick={handleBack}
                                className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                            >
                                Back
                            </button>
                        )}
                        <div className="relative rounded-md shadow-sm my-6">
                            <input
                                type="text"
                                className="focus:ring-blue-500 focus:border-blue-500 block p-2 border rounded-full w-full mb-4 sm:text-sm border-gray-300"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder={`Search ${currentStep}`}
                            />
                        </div>
                        <div className="overflow-auto h-[60vh]">
                            {currentStep === "model" &&
                                filterOptions(models).map((model) => (
                                    <button
                                        key={model.id}
                                        className="py-4 border-b w-full hover:bg-gray-200 text-left px-2 flex items-center"
                                        onClick={() => handleModelSelect(model)}
                                    >
                                        <Image
                                            width={100}
                                            height={100}
                                            src={model.image}
                                            alt={model.name}
                                            className="w-12 h-12 mr-4 rounded"
                                        />
                                        {model.name}
                                    </button>
                                ))}
                            {currentStep === "variant" &&
                                filterOptions(variants).map((variant) => (
                                    <button
                                        key={variant.id}
                                        className="py-4 border-b w-full hover:bg-gray-200 text-left px-2 flex items-center"
                                        onClick={() => handleVariantSelect(variant)}
                                    >
                                        <Image
                                            width={100}
                                            height={100}
                                            src={variant.image}
                                            alt={variant.name}
                                            className="w-12 h-12 mr-4 rounded"
                                        />
                                        {variant.name}
                                    </button>
                                ))}
                            {filterOptions(currentStep === "model" ? models : variants)
                                .length === 0 && <LoadingAnimation />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarSelectionModal;
