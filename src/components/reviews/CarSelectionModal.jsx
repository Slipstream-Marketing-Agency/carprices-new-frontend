import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import LoadingAnimation from "../compare-cars/LoadingAnimation";

const CarSelectionModal = ({
    isOpen,
    onClose,
    onVariantSelect,
    apiUrl = process.env.NEXT_PUBLIC_API_URL,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [loading, setLoading] = useState(false);

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 30, totalPages: 1 });
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            fetchBrands();
        }
    }, [isOpen]);

    const fetchBrands = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}latest-model-years`, {
                params: {
                    page,
                    pageSize: pagination.pageSize,
                    search,
                    sort: "brandName",
                    order: "asc",
                },
            });

            const brandData = response.data.data.brands;
            const newBrands = page === 1 ? brandData : [...brands, ...brandData];

            setBrands(newBrands);
            setPagination({
                page,
                pageSize: pagination.pageSize,
                totalPages: response.data.data.pagination.pageCount,
            });
        } catch (error) {
            console.error("Error fetching brands:", error);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const fetchModels = async (brand, model = "", year = "", page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}car-models/brand/${brand}`, {
                params: {
                    model,
                    year,
                    page,
                    pageSize: pagination.pageSize,
                    search,
                },
            });
            const newModels = page === 1 ? response.data.data.models : [...models, ...response.data.data.models];
            setModels(newModels);
            setPagination({
                page,
                pageSize: pagination.pageSize,
                totalPages: response.data.data.pagination.pageCount,
            });
        } catch (error) {
            console.error("Error fetching models:", error);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setSelectedModel("");
        setSelectedYear("");
        setSearchTerm("");
        setModels([]);
        setPagination({ page: 1, pageSize: 20, totalPages: 1 });
        fetchModels(brand); // Start fetching models for the selected brand
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model.name); // Set the model name for display
        setSearchTerm("");
        onVariantSelect({
            brand: selectedBrand,
            model: model.name,
            year: model.latestYear,
        });
        onClose();
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        fetchModels(selectedBrand, selectedModel, year); // Fetch models based on the selected year
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setPagination({ page: 1, pageSize: 20, totalPages: 1 });
        if (selectedBrand) {
            fetchModels(selectedBrand, selectedModel, selectedYear, 1, term); // Fetch models with search term
        } else {
            fetchBrands(1, term); // Fetch brands with search term
        }
    };

    const handleLoadMore = () => {
        if (pagination.page < pagination.totalPages && !isLoadingMore) {
            setIsLoadingMore(true);
            const nextPage = pagination.page + 1;
            if (selectedBrand) {
                fetchModels(selectedBrand, selectedModel, selectedYear, nextPage, searchTerm); // Load more models
            } else {
                fetchBrands(nextPage, searchTerm); // Load more brands
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center">
            <div id="slideover-container" className={`w-full h-full fixed z-[999] inset-0 ${isOpen ? "visible" : "invisible"}`}>
                <div onClick={onClose} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isOpen ? "opacity-50" : "opacity-0"}`} />
                <div id="slideover" className={`w-full md:w-[60%] rounded-tl-2xl rounded-bl-2xl bg-white h-full absolute right-0 duration-300 ease-out transition-all ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="col-span-12 sm:rounded-tl-2xl bg-blue-500 w-full p-8 flex justify-between text-3xl text-white bg-stripes">
                        <div>Select Brand and Model</div>
                    </div>
                    <div className="p-6 ">
                        <h2 className="my-2 capitalize font-semibold">Choose {selectedBrand ? "Model" : "Brand"}</h2>
                        <div className="flex gap-3">
                            {selectedBrand && (
                                <DataBadge
                                    label={selectedBrand}
                                    onClick={() => {
                                        setSelectedBrand("");
                                        setSearchTerm("");
                                    }}
                                />
                            )}
                            {selectedModel && (
                                <DataBadge
                                    label={selectedModel}
                                    onClick={() => {
                                        setSelectedModel("");
                                        setSearchTerm("");
                                    }}
                                />
                            )}
                            {selectedYear && (
                                <DataBadge
                                    label={selectedYear}
                                    onClick={() => {
                                        setSelectedYear("");
                                        setSearchTerm("");
                                    }}
                                />
                            )}
                        </div>
                        <div className="relative rounded-md shadow-sm my-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                            <input type="text" className="focus:ring-blue-500 focus:border-blue-500 block p-2 border rounded-full w-full mb-4 sm:text-sm border-gray-300 px-10" value={searchTerm} onChange={handleSearchChange} placeholder={`Search ${selectedBrand ? "Model" : "Brand"}`} />
                        </div>
                        <div>
                            {!selectedBrand && brands.length > 0 && (
                                <div className="pb-10">
                                    <div className="grid gap-4 md:grid-cols-6 grid-cols-3">
                                        {brands.map((brand) => (
                                            <button key={brand.slug} className="cursor-pointer flex flex-col justify-center items-center hover:bg-gray-200 rounded-lg border" onClick={() => handleBrandSelect(brand.slug)}>
                                                {brand.logo ? (
                                                    <Image
                                                        src={brand.logo}
                                                        alt={`${brand.name} logo`}
                                                        width={60}
                                                        height={60}
                                                        className="py-2"
                                                    />
                                                ) : (
                                                    <div className="w-15 h-15 bg-gray-200">No Image</div>
                                                )}
                                                <div className="capitalize font-semibold text-center my-1 text-xs">
                                                    {brand.name || "Unknown"}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {isLoadingMore && <LoadingAnimation />}
                                    {pagination.page < pagination.totalPages && (
                                        <button onClick={handleLoadMore} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg">
                                            Load More
                                        </button>
                                    )}
                                </div>
                            )}
                            {selectedBrand && (
                                <div className="overflow-y-scroll h-[600px] pb-10">
                                    <div className="flex flex-col">
                                        {models.map((model) => (
                                            <button key={model.slug} className="py-4 border-b hover:bg-gray-200 text-left px-2" onClick={() => handleModelSelect(model)}>{model.name}</button>
                                        ))}
                                        {isLoadingMore && <LoadingAnimation />}
                                        {pagination.page < pagination.totalPages && (
                                            <button onClick={handleLoadMore} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg">Load More</button>
                                        )}
                                    </div>
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
