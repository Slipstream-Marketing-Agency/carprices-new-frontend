'use client'
import React, { useEffect, useState } from 'react';
import { fetchDealerBranches, fetchDealers, fetchCarBrandsWithDealers } from '@/lib/api'; // Import the fetchCarBrands function
import CallIcon from '@mui/icons-material/Call';
import { Skeleton } from '@mui/material';

const CarDealersListingPage = () => {
    const [dealers, setDealers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFiltersAndDealers = async () => {
            try {
                setLoading(true);
                // Fetch brands and branches for the filter
                const branchData = await fetchDealerBranches();
                setBranches(branchData.branches);

                // Fetch brands data
                const brandData = await fetchCarBrandsWithDealers();
                setBrands(brandData);

                // Fetch initial dealer data without any filters
                await fetchAndSetDealers();
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFiltersAndDealers();
    }, []);

    const fetchAndSetDealers = async () => {
        setLoading(true);
        try {
            // Use the first selected brand and branch slug for filtering
            const brandSlug = selectedBrands.length > 0 ? selectedBrands[0] : '';
            const branchSlug = selectedBranches.length > 0 ? selectedBranches[0] : '';
            const data = await fetchDealers(brandSlug, 1, 100, branchSlug);
            setDealers(data.dealers);
        } catch (error) {
            console.error('Error fetching filtered dealers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBrandChange = (brandSlug) => {
        setSelectedBrands((prevSelected) => {
            const updatedSelection = prevSelected.includes(brandSlug)
                ? prevSelected.filter((b) => b !== brandSlug)
                : [...prevSelected, brandSlug];
            console.log('Selected brands:', updatedSelection);
            return updatedSelection;
        });
    };

    const handleBranchChange = (branchSlug) => {
        setSelectedBranches((prevSelected) => {
            const updatedSelection = prevSelected.includes(branchSlug)
                ? prevSelected.filter((b) => b !== branchSlug)
                : [...prevSelected, branchSlug];
            console.log('Selected branches:', updatedSelection);
            return updatedSelection;
        });
    };

    // Fetch dealers whenever selected brands or branches change
    useEffect(() => {
        fetchAndSetDealers();
    }, [selectedBrands, selectedBranches]);

    return (
        <div className="container mx-auto p-5">
            <div className="flex flex-col md:flex-row">
                {/* Filter Section */}
                <div className="shadow rounded-xl w-full md:w-1/4 p-8 border-r border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Filter by</h3>
                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Brands</h4>
                        {loading ? (
                            <Skeleton variant="rectangular" width={150} height={20} />
                        ) : brands.map((brand) => (
                            <div key={brand.slug} className="mb-2">
                                <input
                                    type="checkbox"
                                    id={`brand-${brand.slug}`}
                                    value={brand.slug}
                                    onChange={() => handleBrandChange(brand.slug)}
                                    checked={selectedBrands.includes(brand.slug)}
                                />
                                <label htmlFor={`brand-${brand.slug}`} className="ml-2">{brand.name}</label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Dealer Branches</h4>
                        {loading ? (
                            <Skeleton variant="rectangular" width={150} height={20} />
                        ) : branches.map((branch) => (
                            <div key={branch.slug} className="mb-2">
                                <input
                                    type="checkbox"
                                    id={`branch-${branch.slug}`}
                                    value={branch.slug}
                                    onChange={() => handleBranchChange(branch.slug)}
                                    checked={selectedBranches.includes(branch.slug)}
                                />
                                <label htmlFor={`branch-${branch.slug}`} className="ml-2">{branch.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dealers List Section */}
                <div className="w-full md:w-3/4 p-4">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    width="100%"
                                    height={200}
                                    className="rounded-lg"
                                />
                            ))}
                        </div>
                    ) : (
                        <><div className='mb-6'>
                            <h1 className='md:text-3xl text-xl font-semibold'>Find Car Dealers Near You</h1>
                            <h4 className='md:text-lg text-md font-medium'>Browse through a comprehensive list of car dealers by brand and location. Use the filters to easily find the right dealer for your needs.</h4>
                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dealers.map((dealer) => (
                                    <div key={dealer.id} className="bg-white rounded-lg shadow-md p-5">
                                        <div className="flex flex-col justify-between h-full">
                                            <div>
                                                <h3 className="text-lg font-semibold">{dealer.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2 font-semibold">{dealer.dealer_branch.name}</p>
                                                <p className="text-sm text-gray-600">{dealer.address}</p>
                                            </div>
                                            <div className="contact-info flex items-center mt-3 space-x-2">
                                                <span
                                                    role="img"
                                                    aria-label="phone"
                                                    className="bg-blue-500 p-1 rounded-full w-[30px] h-[30px] flex justify-center items-center"
                                                >
                                                    <CallIcon className="text-white text-lg" />
                                                </span>
                                                <a href={`tel:${dealer.phone_number}`} className="text-blue-600 hover:underline">
                                                    {dealer.phone_number}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarDealersListingPage;
