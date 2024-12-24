import Image from 'next/image';
import React from 'react';
import AsyncSelect from 'react-select/async';

export default function Banner({ setShowModal, selectedModel, setSelectedModel }) {
    const sampleModels = [
        { id: 1, name: "Toyota Corolla" },
        { id: 2, name: "Honda Civic" },
        { id: 3, name: "Ford Focus" },
    ];

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

    const fetchModels = async (inputValue) => {
        return sampleModels
            .filter((model) => model.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((model) => ({
                label: model.name,
                value: model.id,
            }));
    };

    const fetchVariants = async (inputValue) => {
        if (!selectedModel) return [];
        const variants = sampleVariants[selectedModel.value] || [];
        
        if (inputValue.length < 1) return variants;
        return variants
            .filter((variant) => variant.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((variant) => ({
                label: variant.name,
                value: variant.id,
            }));
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            borderColor: '#e5e7eb',
            boxShadow: 'none',
            '&:hover': { borderColor: '#d1d5db' },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
            color: '#374151',
        }),
    };

    return (
        <>
            <h1 className="text-3xl mb-4 sm:text-3xl font-semibold">
                Car Loan Calculator UAE
            </h1>
            <div className="bg-gradient-to-tl to-[#275BA7] via-[#275BA7] from-[#77cdf2] rounded-2xl md:p-10 p-8 text-white flex relative overflow-visible custom-gradient">
                <div>
                    <div className="text-4xl md:w-[90%] capitalize">
                        Choose the car to calculate loan EMI
                    </div>
                    <div className="mb-6 md:w-[90%] opacity-80 mt-3">
                        Get a quick breakdown of your monthly payments and make an informed decision on your next ride.
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="border-solid border bg-transparent text-white rounded-3xl p-2 px-6 my-4"
                    >
                        Choose Car Now
                    </button>

                    {/* <div className="w-full md:w-[50%] z-50">
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchModels}
                            defaultOptions
                            placeholder="Select Brand/Model"
                            onChange={(selectedOption) => {
                                setSelectedModel(selectedOption);
                                setSelectedVariant(null);
                            }}
                            styles={customStyles}
                            menuPortalTarget={document.body}
                            className="mb-3"
                        />

                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchVariants}
                            defaultOptions
                            placeholder="Select Variant"
                            isDisabled={!selectedModel}
                            styles={customStyles}
                            onChange={(selectedOption) => setSelectedVariant(selectedOption)}
                            menuPortalTarget={document.body}
                        />
                    </div> */}
                </div>
                <Image
                    className="object-contain min-h-0 absolute bottom-0 right-0 hidden md:block"
                    src={"/carLoanPage/carImage.png"}
                    alt="car-image"
                    height={380}
                    width={380}
                />
            </div>
        </>
    );
}
