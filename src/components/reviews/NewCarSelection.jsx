import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import LoadingAnimation from "../compare-cars/LoadingAnimation";

const NewCarSelection = ({ isOpen, onClose, onModelSelect, apiUrl = process.env.NEXT_PUBLIC_API_URL }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [models, setModels] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 30, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const sampleModels = [
        { id: 1, name: "Model X", image: "/assets/images/blog-alt-image.png" },
        { id: 2, name: "Model Y", image: "/assets/images/blog-alt-image.png" },
        { id: 3, name: "Model Z", image: "/assets/images/blog-alt-image.png" },
        { id: 4, name: "Model A", image: "/assets/images/blog-alt-image.png" },
        { id: 5, name: "Model B", image: "/assets/images/blog-alt-image.png" },
    ];

    useEffect(() => {
        if (isOpen) {
            fetchModels();
        }
    }, [isOpen]);

    const fetchModels = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}car-models`, {
                params: {
                    page,
                    pageSize: pagination.pageSize,
                    search,
                },
            });

            const modelData = response.data.data.models;
            const newModels = page === 1 ? modelData : [...models, ...modelData];

            setModels(newModels);
            setPagination({
                page,
                pageSize: pagination.pageSize,
                totalPages: response.data.data.pagination.pageCount,
            });
        } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching models:", error); }
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const filteredModels = sampleModels.filter((model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setPagination({ page: 1, pageSize: 30, totalPages: 1 });
        fetchModels(1, term);
    };

    const handleModelSelect = (model) => {
        onModelSelect(model); // Pass the selected model to the parent component
        onClose();
    };

    const handleLoadMore = () => {
        if (pagination.page < pagination.totalPages && !isLoadingMore) {
            setIsLoadingMore(true);
            fetchModels(pagination.page + 1, searchTerm);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center">
            <div id="slideover-container" className={`w-full h-full fixed z-[999] inset-0 ${isOpen ? "visible" : "invisible"}`}>
                <div
                    onClick={onClose}
                    id="slideover-bg"
                    className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${
                        isOpen ? "opacity-50" : "opacity-0"
                    }`}
                />
                <div
                    id="slideover"
                    className={`w-full md:w-[60%] rounded-tl-2xl rounded-bl-2xl bg-white h-full absolute right-0 duration-300 ease-out transition-all ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="bg-blue-500 w-full p-8 flex justify-between text-3xl text-white bg-stripes">
                        <div>Select Model</div>
                    </div>
                    <div className="p-6">
                        <div className="relative rounded-md shadow-sm my-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-blue-500 focus:border-blue-500 block p-2 border rounded-full w-full mb-4 sm:text-sm border-gray-300 px-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                // value={searchTerm}
                                // onChange={handleSearchChange}
                                placeholder="Search Model"
                            />
                        </div>
                        {/* {loading ? (
                            <LoadingAnimation />
                        ) : (
                            <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                                {models.map((model) => (
                                    <button
                                        key={model.slug}
                                        className="cursor-pointer flex flex-col justify-center items-center hover:bg-gray-200 rounded-lg border p-4"
                                        onClick={() => handleModelSelect(model)}
                                    >
                                        {model.image ? (
                                            <Image
                                                src={model.image}
                                                alt={`${model.name} image`}
                                                width={80}
                                                height={80}
                                                className="py-2"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200">No Image</div>
                                        )}
                                        <div className="capitalize font-semibold text-center mt-2 text-sm">{model.name}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                        {isLoadingMore && <LoadingAnimation />}
                        {!loading && pagination.page < pagination.totalPages && (
                            <button onClick={handleLoadMore} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg">
                                Load More
                            </button>
                        )} */}
                        <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                            {filteredModels.map((model) => (
                                <button
                                    key={model.id}
                                    className="cursor-pointer flex flex-col justify-center items-center hover:bg-gray-200 rounded-lg border"
                                    onClick={() => {
                                        onVariantSelect(model);
                                        onClose();
                                    }}
                                >
                                    <Image
                                        src={model.image}
                                        alt={`${model.name} image`}
                                        width={100}
                                        height={100}
                                        className="rounded-lg"
                                    />
                                    <div className="capitalize font-semibold text-center my-1 text-sm">
                                        {model.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCarSelection;
