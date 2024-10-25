import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";

const CarSelectionModal = ({
    isOpen,
    onClose,
    onVariantSelect,
    apiUrl = process.env.NEXT_PUBLIC_API_URL,
}) => {
    const [currentStep, setCurrentStep] = useState("year");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("");
    const [loading, setLoading] = useState(false);

    const [years, setYears] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);

    console.log('Years:', years);
    console.log('Brands:', brands);
    console.log('Models:', models);
    console.log('Variants:', variants);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            fetchYears();
        }
    }, [isOpen]);

    const fetchYears = () => {
        axios
            .get(`${apiUrl}car-trims/years`)
            .then((response) => {
                setYears(response.data);
                setCurrentStep("year");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching years:", error);
                setLoading(false);
            });
    };

    const fetchBrands = (year) => {
        setLoading(true);
        axios
            .get(`${apiUrl}car-trims/${year}/brands`)
            .then((response) => {
                setBrands(response.data.brands);
                setCurrentStep("brand");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching brands:", error);
                setLoading(false);
            });
    };

    const fetchModels = (brand) => {
        setLoading(true);
        axios
            .get(`${apiUrl}car-trims/${selectedYear}/brands/${brand}/models`)
            .then((response) => {
                setModels(response.data.models);
                setCurrentStep("model");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching models:", error);
                setLoading(false);
            });
    };

    const fetchVariants = (model) => {
        setLoading(true);
        axios
            .get(
                `${apiUrl}car-trims/${selectedYear}/brands/${selectedBrand}/models/${model}/trims`
            )
            .then((response) => {
                setVariants(response.data.trims);
                setCurrentStep("variant");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching trims:", error);
                setLoading(false);
            });
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setSearchTerm("");
        fetchBrands(year);
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setSearchTerm("");
        fetchModels(brand);
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setSearchTerm("");
        fetchVariants(model);
    };

    const handleVariantSelect = (variant) => {

        console.log(variant, "variant");

        // Attach year, brand, and model information to the variant object
        const variantData = {
            ...variant,
            year: selectedYear,
            brand: selectedBrand,
            model: selectedModel,
        };

        // Pass the complete variant data back to the parent
        onVariantSelect(variantData);
        onClose();
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

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center ">
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
                    <div className="col-span-12 sm:rounded-tl-2xl bg-blue-500 w-full p-8 flex justify-between text-3xl text-white bg-stripes">
                        <div>Select Year, Brand, Model and Variant</div>
                    </div>
                    <div className="p-6">
                        <h2 className="my-2 capitalize font-semibold">
                            Choose {currentStep}
                        </h2>
                        <div className="flex gap-3">
                            <div
                                className={` ${currentStep === "year" && selectedYear === "" ? "hidden " : "block"
                                    }`}
                                onClick={() => {
                                    setCurrentStep("year");
                                    setSearchTerm("");
                                }}
                            >
                                <DataBadge
                                    iconSrc={null}
                                    label={selectedYear}
                                    onClick={() => {
                                        setCurrentStep("year");
                                        setSearchTerm("");
                                    }}
                                />
                            </div>

                            <div
                                className={` ${currentStep === "brand" && selectedBrand === ""
                                    ? "hidden "
                                    : "block"
                                    }`}
                                onClick={() => {
                                    setCurrentStep("brand");
                                    setSearchTerm("");
                                }}
                            >
                                <DataBadge
                                    iconSrc={null}
                                    label={selectedBrand}
                                    onClick={() => {
                                        setCurrentStep("brand");
                                        setSearchTerm("");
                                    }}
                                />
                            </div>

                            <div className={` ${selectedModel === "" ? "hidden " : "block"}`}>
                                <DataBadge
                                    iconSrc={null}
                                    label={selectedModel}
                                    onClick={() => {
                                        setCurrentStep("model");
                                        setSearchTerm("");
                                    }}
                                />
                            </div>

                            <div className={` ${selectedVariant === "" ? "hidden " : "block"}`}>
                                <DataBadge
                                    iconSrc={null}
                                    label={selectedVariant}
                                    onClick={() => {
                                        setCurrentStep("variant");
                                        setSearchTerm("");
                                    }}
                                />
                            </div>
                        </div>

                        <div className="relative rounded-md shadow-sm my-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-blue-500 focus:border-blue-500 block p-2 border rounded-full w-full mb-4 sm:text-sm border-gray-300 px-10"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder={`Search ${currentStep}`}
                            />
                        </div>

                        <div>
                            {currentStep === "year" && (
                                <div className="overflow-auto h-[650px]">
                                    <div className="grid gap-6 grid-cols-12 ">
                                        {filterOptions(years).map((year) => (
                                            <button
                                                key={year}
                                                className="bg-white sm:col-span-2 col-span-3"
                                                onClick={() => handleYearSelect(year)}
                                            >
                                                <div className="capitalize text-center font-semibold my-1 text-xs shadow-sm py-4 rounded-lg border hover:bg-gray-200">
                                                    {year}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {filterOptions(years).length === 0 && <LoadingAnimation />}
                                </div>
                            )}

                            {currentStep === "brand" && selectedYear && (
                                <div className="overflow-auto h-[650px]">
                                    <div className=" grid gap-6 md:grid-cols-6 grid-cols-3 ">
                                        {filterOptions(brands).map((brand) => (
                                            <button
                                                key={brand.slug}
                                                className="cursor-pointer flex flex-col items-center hover:bg-gray-200 rounded-lg border"
                                                onClick={() => handleBrandSelect(brand.slug)}
                                            >
                                                <Image
                                                    src={brand.brandLogo}
                                                    alt="icon-brand"
                                                    width={60}
                                                    height={60}
                                                    className="py-2"
                                                />
                                                <div className="capitalize font-semibold text-center my-1 text-xs">
                                                    {brand.name}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {filterOptions(brands).length === 0 && <LoadingAnimation />}
                                </div>
                            )}

                            {currentStep === "model" && selectedBrand && (
                                <div className="flex flex-col">
                                    {filterOptions(models).map((model) => (
                                        <button
                                            key={model.slug}
                                            className="py-4 border-b hover:bg-gray-200 text-left px-2"
                                            onClick={() => handleModelSelect(model.slug)}
                                        >
                                            {model.name}
                                        </button>
                                    ))}
                                    {filterOptions(models).length === 0 && <LoadingAnimation />}
                                </div>
                            )}

                            {currentStep === "variant" && selectedModel && (
                                <div className="flex flex-col">
                                    {filterOptions(variants).map((variant) => (
                                        <button
                                            key={variant.mainSlug}
                                            className="py-4 border-b hover:bg-gray-200 text-left px-2"
                                            onClick={() => handleVariantSelect(variant)}
                                        >
                                            {variant.name}
                                        </button>
                                    ))}
                                    {filterOptions(variants).length === 0 && <LoadingAnimation />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DataBadge = ({ label, onClick }) => (
    <div className="flex bg-blue-100 rounded-full py-1 px-3 items-center gap-1">
        <div className="capitalize text-black text-xs">{label}</div>
        <Image
            src="/carLoanPage/edit-icon.svg"
            width={25}
            height={20}
            className="cursor-pointer"
            alt="edit-icon"
            onClick={onClick}
        />
    </div>
);

export default CarSelectionModal;
