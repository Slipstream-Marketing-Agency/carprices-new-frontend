
"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Pagination from './Pagination';
import ExpandableText from '../common/ExpandableText';
import { fetchModels } from '@/lib/brandapis';
import Image from 'next/image';
import Link from 'next/link';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import Select from 'react-select';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import InnerNavigation from './InnerNavigation';
import { usePathname } from 'next/navigation';
import Ad300x600 from '../ads/Ad300x600';
import CarDealerCard from '../car-dealer/CarDealerCard';
export default function BrandDealerPage({ brandname, dealers, pagination, brandDetails, search, branchname }) {
    const pathname = usePathname();
    const router = useRouter();
    const [pageSize, setPageSize] = useState(pagination.pageSize);
    const [searchTerm, setSearchTerm] = useState(search);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(pagination.currentPage);
    const [pageCount, setPageCount] = useState(pagination.pageCount);
    const [totalResults, setTotalResults] = useState(pagination.totalResults);
    const [isSearching, setIsSearching] = useState(false);

    const [brands, setBrands] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(brandname);
    const [selectedBranch, setSelectedBranch] = useState(branchname);
    const [brandPage, setBrandPage] = useState(1);
    const [branchPage, setBranchPage] = useState(1);
    const [loadingBrands, setLoadingBrands] = useState(false);
    const [loadingBranches, setLoadingBranches] = useState(false);

    // Fetch brands and handle pagination when searching or loading more brands
    const fetchBrands = async (search = "", loadMore = false) => {
        setLoadingBrands(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-brands-dealers`, {
                params: {
                    page: loadMore ? brandPage : 1,
                    pageSize: 20,
                    search: typeof search === 'string' ? search : "", // Ensure search is a string
                    sort: "brandName",
                    order: "asc",
                },
            });
            const newBrands = response?.data?.map((brand) => ({
                value: brand.slug,
                label: brand.name,
            }));

            // Deduplicate based on slug
            setBrands((prevBrands) => {
                const uniqueBrands = new Map(
                    [...(loadMore ? prevBrands : []), ...newBrands].map((brand) => [brand.value, brand])
                );
                return Array.from(uniqueBrands.values());
            });

            if (loadMore) setBrandPage((prevPage) => prevPage + 1);
        } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching brands:", error); }
        } finally {
            setLoadingBrands(false);
        }
    };

    const fetchBranches = async (search = "", loadMore = false) => {
        setLoadingBranches(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}filter-dealer-branches-by-brand`, {
                params: {
                    brandSlug: brandname
                },
            });
            const newBranches = response?.data?.map((branch) => ({
                value: branch.slug,
                label: branch.name,
            }));

            // Deduplicate based on slug
            setBranches((prevBranches) => {
                const uniqueBranches = new Map(
                    [...(loadMore ? prevBranches : []), ...newBranches].map((brand) => [brand.value, brand])
                );
                return Array.from(uniqueBranches.values());
            });

            if (loadMore) setBranchPage((prevPage) => prevPage + 1);
        } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching branches:", error); }
        } finally {
            setLoadingBranches(false);
        }
    };



    useEffect(() => {
        fetchBrands();
        fetchBranches();
    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(
            pathname === '/car-dealers' ? `/car-dealers?page=${page}&pageSize=${pageSize}` :
                `/brands/${selectedBrand}/car-dealers?page=${page}&pageSize=${pageSize}${searchTerm ? `&search=${searchTerm}` : ''}`,
            undefined,
            { shallow: true }
        );
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
        router.push(
            pathname === '/car-dealers' ? `/car-dealers?page=1&pageSize=${newSize}` :
                `/brands/${selectedBrand}/car-dealers?page=1&pageSize=${newSize}${searchTerm ? `&search=${searchTerm}` : ''}`,
            undefined,
            { shallow: true }
        );
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setIsSearching(true);
        setCurrentPage(1);
    };

    const handleBrandChange = (selectedOption) => {
        const newBrand = selectedOption?.value || brandname;
        setSelectedBrand(newBrand);
        setIsSearching(true);
        setCurrentPage(1);

        const basePath = branchname
            ? `/brands/${newBrand}/car-dealers/${branchname}`
            : `/brands/${newBrand}/car-dealers`;

        router.push(pathname === '/car-dealers' ? `${basePath}` : `${basePath}?page=1&pageSize=${pageSize}`, undefined, { shallow: true });
    };

    const handleBranchChange = (selectedOption) => {
        const newBranch = selectedOption?.value || branchname;
        setSelectedBranch(newBranch);
        setIsSearching(true);
        setCurrentPage(1);
        router.push(`/brands/${brandname}/car-dealers/${newBranch}?page=1&pageSize=${pageSize}`, undefined, { shallow: true });
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        setCurrentPage(1);
        setModels(initialModels);
        router.push(`/brands/${selectedBrand}?page=1&pageSize=${pageSize}`, undefined, { shallow: true });
    };

    const handleScroll = (event) => {
        const bottomReached = event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 100;
        if (bottomReached && !loadingBrands) {
            fetchBrands("", true);
        }
    };

    return (
        <div className="container">
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-9 col-span-12">
                    {brandDetails && <>
                        <div className="grid grid-cols-12 mt-6 mb-4 shadow-md p-4 rounded-lg gap-5">
                            <div className="md:col-span-4 col-span-12 flex justify-start items-start w-full">
                                <Image
                                    src={brandDetails?.cover || "/assets/img/car-placeholder.png"}
                                    alt={`${brandDetails?.name}-cover-image`}
                                    width={400}
                                    height={250}
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    loading="lazy"
                                    className="object-cover rounded-xl"
                                />
                            </div>

                            <div className="md:col-span-8 col-span-12 flex flex-col items-start">
                                <div className='flex items-center gap-3'>
                                    <Image
                                        src={brandDetails?.logo || "/assets/img/car-placeholder.png"}
                                        alt={`${brandDetails?.name}-logo`}
                                        width={80}
                                        height={80}
                                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading="lazy"
                                        className="object-contain border rounded-xl mb-3 p-2"
                                    />
                                    <h1 className="md:text-3xl text-xl font-semibold">{brandDetails?.name} Car Dealers in {slugToCapitalCase(branchname)},UAE</h1>

                                </div>
                                <ExpandableText content={brandDetails?.description} />
                            </div>

                        </div><InnerNavigation brandname={brandname} /></>}

                    {pathname === '/car-dealers' && <div className='shadow-md p-4 mt-5 rounded-lg'> <h1 className="text-2xl font-semibold ">Find Top Car Dealers in UAE | Trusted Car Dealerships Across Abu Dhabi, Dubai, and More</h1>
                        <ExpandableText content={"Explore a comprehensive list of authorized car dealerships in the UAE. From luxury to budget-friendly options, find trusted car dealers in Abu Dhabi, Dubai, and other Emirates. Get details on location, contact information, and available brands. Start your journey to finding the perfect car with our updated directory of UAE car dealers."} /></div>}




                    <div className="my-4 flex w-full shadow-md p-4 gap-4 rounded-lg">
                        <div className='w-[50%]'>
                            <label className='text-xs font-semibold'>Choose Brand</label>
                            <Select
                                options={brands}
                                value={brands.find((brand) => brand.value === selectedBrand)}
                                onInputChange={(inputValue) => {
                                    if (typeof inputValue === 'string') fetchBrands(inputValue);
                                }}
                                onChange={handleBrandChange}
                                onMenuScrollToBottom={handleScroll}
                                isLoading={loadingBrands}
                                placeholder="Select Brand"
                                className="w-full md:text-sm text-xs"
                            />
                        </div>
                        {pathname !== '/car-dealers' && <div className='w-[50%]'>
                            <label className='text-xs font-semibold'>Choose Dealer Branch</label>
                            <Select
                                options={branches}
                                value={branches.find((branch) => branch.value === selectedBranch)}
                                onInputChange={(inputValue) => {
                                    if (typeof inputValue === 'string') fetchBranches(inputValue);
                                }}
                                onChange={handleBranchChange}
                                onMenuScrollToBottom={handleScroll}
                                isLoading={loadingBranches}
                                placeholder="Select Branches"
                                className="w-full md:text-sm text-xs"
                            /></div>}

                    </div>

                    <div className="grid grid-cols-12 gap-5">
                        {dealers?.map((item) => (
                            <CarDealerCard key={item.id} dealer={item} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        totalResults={totalResults}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                </div>
                <div className="md:col-span-3 col-span-12">
                    <div className='my-6 sticky top-0  md:block hidden'>
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="4298888026" />
                        </Suspense>
                    </div>
                </div>
                
            </div>

        </div>
    );
}
