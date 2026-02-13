'use client';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import FilterSidebar from '@/components/car-videos/FilterSidebar';
import VideoList from '@/components/car-videos/VideoList';
import React, { useState, useEffect } from 'react';

const VideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalVideos, setTotalVideos] = useState();
    const [isExpanded, setIsExpanded] = useState(false);

    // Fetch function, called on page load or by search button click
    const fetchVideos = async (brand, model, currentPage = 1) => {
        setLoading(true);
        const brandQuery = brand ? `&brands=${brand}` : '';
        const modelQuery = model ? `&models=${model}` : '';
        const offset = (currentPage - 1) * 12;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}car-videos/by-brands-and-models?offset=${offset}&limit=12${brandQuery}${modelQuery}`
            );
            const data = await response.json();
            setVideos(prevVideos => currentPage === 1 ? data.videos : [...prevVideos, ...data.videos]);
            setTotalPages(data.pagination.totalPages);
            setTotalVideos(data.pagination.totalItems);
        } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching videos:", error); }
        } finally {
            setLoading(false);
        }
    };

    // Handle filter change to fetch videos based on selected brand and model
    const handleFilterChange = (brand, model) => {
        setSelectedBrand(brand);
        setSelectedModel(model);
        fetchVideos(brand, model, 1);
        setPage(1); // Reset to the first page
    };

    // Initial load of unfiltered videos
    useEffect(() => {
        fetchVideos(null, null, 1);
    }, []);

    // Load more videos when "Load More" button is clicked
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchVideos(selectedBrand, selectedModel, nextPage);
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="container gap-5 mt-8">
            <div>

                <div className="mb-2">
                    <h1 className="md:text-3xl text-xl font-semibold">Explore the Latest Car Videos</h1>
                    <h4 className="md:text-lg text-md font-medium text-blue-600">
                        Discover Trending Automotive Insights and In-Depth Car Reviews
                    </h4>
                    <div className="my-3">
                        <div className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                            <p>
                                At CarPrices.ae, we go beyond just showing you cars. Our videos offer in-depth views of each model, including interior details, exterior design highlights, and full performance breakdowns. From compact cars to luxurious sedans, we cover a broad range to suit diverse preferences. Plus, with insights on advanced safety features, efficient engines, and the latest tech, our content helps you make confident decisions.
                            </p>
                            <br />
                            <p>
                                Our goal is to bring you closer to the unique driving experience each car offers. So, whether you’re a dedicated car enthusiast or an eager shopper, explore CarPrices.ae's extensive video collection and discover the car that fits you best.
                            </p>
                        </div>
                        <button
                            onClick={toggleReadMore}
                            className="text-sm font-semibold text-blue-500 mt-0 hover:underline focus:outline-none"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    </div>

                    <h3 className="font-semibold">Browse through our {totalVideos} car videos and start exploring today!</h3>
                </div>
                <FilterSidebar
                    selectedBrand={selectedBrand}
                    onBrandChange={setSelectedBrand}
                    selectedModel={selectedModel}
                    onModelChange={setSelectedModel}
                    onFilterChange={handleFilterChange} // Pass the filter handler
                />
                {loading && <div>Loading...</div>}
                <VideoList videos={videos} />
                {page < totalPages && (
                    <div className="flex justify-center">
                        <PrimaryButton label="Load More" additionalClass="font-bold h-12 mt-5" onClick={handleLoadMore} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideosPage;
