'use client'
import React, { useEffect, useState } from 'react';
import { fetchDealerBranches, fetchDealers, fetchCarBrandsWithDealers, fetchFilteredBranches, fetchFilteredBrands } from '@/lib/api';
import CallIcon from '@mui/icons-material/Call';
import { Skeleton } from '@mui/material';
import Select from 'react-select';
import PrimaryButton from '../buttons/PrimaryButton';
import Link from 'next/link';
import Image from 'next/image';

const INITIAL_LIMIT = 12; // Number of dealers to load initially
const LOAD_MORE_COUNT = 12; // Number of dealers to load each time "Load More" is clicked

const CarDealersListingPage = () => {
    const [dealers, setDealers] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allBranches, setAllBranches] = useState([]);
    const [brands, setBrands] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(INITIAL_LIMIT); // Limit for the number of dealers to load

    useEffect(() => {
        const loadFiltersAndDealers = async () => {
            try {
                setLoading(true);
                // Fetch all branches and brands once when the component mounts
                const branchData = await fetchDealerBranches();
                const brandData = await fetchCarBrandsWithDealers();

                setAllBranches(branchData.branches || []);
                setAllBrands(brandData || []);
                setBranches(branchData.branches || []);
                setBrands(brandData || []);

                // Load initial dealers without any filter selection
                await fetchAndSetDealers(INITIAL_LIMIT);
            } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Failed to load data:', error); }
            } finally {
                setLoading(false);
            }
        };

        loadFiltersAndDealers();
    }, []);


    const fetchAndSetDealers = async (limitCount) => {
        setLoading(true);
        try {
            const brandSlug = selectedBrand?.value || '';
            const branchSlug = selectedBranch?.value || '';
            const data = await fetchDealers(brandSlug, 1, limitCount, branchSlug);
            setDealers(data.dealers);
        } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching filtered dealers:', error); }
        } finally {
            setLoading(false);
        }
    };


    const handleBrandChange = async (selectedOption) => {
        setSelectedBrand(selectedOption);
        setLimit(INITIAL_LIMIT);

        if (selectedOption) {
            const branchData = await fetchFilteredBranches(selectedOption.value);
            setBranches(branchData || []);
        } else {
            setBranches(allBranches);
        }
    };

    const handleBranchChange = async (selectedOption) => {
        setSelectedBranch(selectedOption);
        setLimit(INITIAL_LIMIT);

        if (selectedOption) {
            const brandData = await fetchFilteredBrands(selectedOption.value);
            setBrands(brandData || []);
        } else {
            setBrands(allBrands);
        }
    };


    const loadMoreDealers = async () => {
        const newLimit = limit + LOAD_MORE_COUNT;
        setLimit(newLimit);
        await fetchAndSetDealers(newLimit); // Load additional dealers
    };

    useEffect(() => {
        fetchAndSetDealers(limit);
    }, [selectedBrand, selectedBranch]);

    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        control: (provided) => ({
            ...provided,
            minWidth: '300px',
            maxWidth: '300px',
        }),
    };

    return (
        <div className="container mx-auto p-5">
            <div className="w-full ">
                {loading ? (
                    <div className="">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={`_-${index}`}
                                variant="rectangular"
                                width="100%"
                                height={200}
                                className="rounded-lg"
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className='mb-6'>
                            <h1 className='md:text-3xl text-xl font-semibold'>Find Car Dealers Near You</h1>
                            <h4 className='md:text-lg text-md font-medium'>Browse through a comprehensive list of car dealers by brand and location. Use the filters to easily find the right dealer for your needs.</h4>
                        </div>
                        <div className="w-full p-3 border-r shadow rounded-xl mb-4 ">
                            <div className='flex items-center gap-4'>
                                <div >
                                    <h4 className="font-semibold mb-2">Brands</h4>
                                    {loading ? (
                                        <Skeleton variant="rectangular" width={150} height={20} />
                                    ) : (
                                        <Select
                                            options={(Array.isArray(brands) ? brands : []).map((brand) => ({ label: brand.name, value: brand.slug }))}
                                            value={selectedBrand}
                                            onChange={handleBrandChange}
                                            isClearable
                                            placeholder="Select a brand"
                                            styles={customStyles}
                                        />
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Dealer Branches</h4>
                                    {loading ? (
                                        <Skeleton variant="rectangular" width={150} height={20} />
                                    ) : (
                                        <Select
                                            options={(Array.isArray(branches) ? branches : []).map((branch) => ({ label: branch.name, value: branch.slug }))}
                                            value={selectedBranch}
                                            onChange={handleBranchChange}
                                            isClearable
                                            placeholder="Select a branch"
                                            styles={customStyles}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dealers.map((dealer) => (

                                <Link href={`tel:${dealer.phone_number}`} key={dealer.id} className="bg-white rounded-lg shadow-md p-5">
                                    <div className='grid grid-cols-12 gap-3 h-full'>
                                        <div className="col-span-4 flex items-start ">
                                            <Image
                                                src={
                                                    dealer.logo === null ? "/assets/placeholder/car-dealer-logo-placeholder.webp" : dealer.logo.url
                                                }
                                                alt={`${dealer.dealer_branch.name}-${dealer.name}-`}
                                                width={800}
                                                height={100}
                                                className="object-cover w-full border rounded-[30px]"
                                            />
                                        </div>
                                        <div className='col-span-8 '>
                                            <div className="flex flex-col justify-between h-full">

                                                <div>
                                                    <div className='flex items-center gap-3 bg-blue-100 p-2 rounded-xl mb-3'>
                                                        <Image
                                                            src={
                                                                dealer.select_related_brand === null ? "/assets/placeholder/car-dealer-logo-placeholder.webp" : dealer.select_related_brand?.brandLogo?.formats?.thumbnail?.url
                                                            }
                                                            alt={`${dealer.dealer_branch.name}-${dealer.name}-`}
                                                            width={50}
                                                            height={50}
                                                            className="object-cover w-[35px] h-[35px] rounded-[30px]"
                                                        />
                                                        <p>{dealer.select_related_brand?.name}</p>
                                                    </div>
                                                    <div className='p-1'>
                                                        <h3 className="text-lg font-semibold">{dealer.name}</h3>
                                                        <p className="text-sm text-gray-600 mb-2 font-semibold">{dealer.dealer_branch.name}</p>
                                                        <p className="text-sm text-gray-600">{dealer.address}</p>
                                                    </div>

                                                </div>

                                                <div className="contact-info flex items-center mt-3 space-x-2 bg-blue-100 p-2 rounded-xl ">
                                                    <span
                                                        role="img"
                                                        aria-label="phone"
                                                        className="bg-blue-500 p-1 rounded-full w-[25px] h-[25px] flex justify-center items-center"
                                                    >
                                                        <CallIcon className="text-white text-sm" />
                                                    </span>
                                                    <Link href={`tel:${dealer.phone_number}`} className="text-blue-600 hover:underline text-md">
                                                        {dealer.phone_number}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </Link>
                            ))}
                        </div>
                        {dealers.length >= limit && (
                            <div className='flex justify-center'>
                                <PrimaryButton label={"Load More"} additionalClass="font-bold h-12 mt-5" onClick={loadMoreDealers} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CarDealersListingPage;
