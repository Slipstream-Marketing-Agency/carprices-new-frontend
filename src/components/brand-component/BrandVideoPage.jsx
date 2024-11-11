
"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Pagination from './Pagination';
import ExpandableText from '../common/ExpandableText';
import { fetchModels } from '@/lib/brandapis';
import Image from 'next/image';
import Link from 'next/link';
import Select from 'react-select';
import InnerNavigation from './InnerNavigation';
import Ad300x600 from '../ads/Ad300x600';

export default function BrandVideoPage({ brandname, videos, pagination, brandDetails, search }) {
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
    const [selectedBrand, setSelectedBrand] = useState(brandname);
    const [brandPage, setBrandPage] = useState(1);
    const [loadingBrands, setLoadingBrands] = useState(false);

    // Fetch brands and handle pagination when searching or loading more brands
    const fetchBrands = async (search = "", loadMore = false) => {
        setLoadingBrands(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}find-brands-with-videos`);

            console.log(response, "response");


            const newBrands = response?.data?.data?.map((brand) => ({
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
        } catch (error) {
            console.error("Error fetching brands:", error);
        } finally {
            setLoadingBrands(false);
        }
    };


    useEffect(() => {
        fetchBrands();
    }, []);

    // Trigger model fetching only when isSearching is true
    useEffect(() => {
        if (!isSearching) return;

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            const data = await fetchModels(selectedBrand, currentPage, pageSize, searchTerm);
            setPageCount(data.pagination.pageCount);
            setTotalResults(data.pagination.total);
            setLoading(false);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, currentPage, pageSize, selectedBrand, isSearching]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(
            pathname === '/car-videos' ? `/car-videos?page=${page}&pageSize=${pageSize}` : `/brands/${selectedBrand}/car-videos?page=${page}&pageSize=${pageSize}${searchTerm ? `&search=${searchTerm}` : ''}`,
            undefined,
            { shallow: true }
        );
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
        router.push(pathname === '/car-videos' ? `/car-videos?page=1&pageSize=${newSize}` :
            `/brands/${selectedBrand}/car-videos?page=1&pageSize=${newSize}${searchTerm ? `&search=${searchTerm}` : ''}`,
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
        router.push(`/brands/${newBrand}/car-videos?page=1&pageSize=${pageSize}`, undefined, { shallow: true });
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
                            <div className="col-span-4 flex justify-start items-start w-full">
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

                            <div className="col-span-8 flex flex-col items-start">
                                <Image
                                    src={brandDetails?.logo || "/assets/img/car-placeholder.png"}
                                    alt={`${brandDetails?.name}-logo`}
                                    width={80}
                                    height={80}
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    loading="lazy"
                                    className="object-contain border rounded-xl mb-3 p-2"
                                />
                                <h1 className="text-3xl font-semibold">{brandDetails?.name} Cars Videos in UAE</h1>
                                <ExpandableText content={brandDetails?.description} />
                            </div>
                        </div>
                        <InnerNavigation brandname={brandname} />
                    </>}
                    {pathname === '/car-videos' &&
                        <div className='shadow-md p-4 mt-5 rounded-lg'>
                            <h1 className="md:text-3xl text-xl font-semibold">Explore the Latest Car Videos</h1>
                            <h4 className="md:text-lg text-md font-medium text-blue-600">
                                Discover Trending Automotive Insights and In-Depth Car Reviews
                            </h4>
                            <ExpandableText content={`<p>
            At CarPrices.ae, we go beyond just showing you cars. Our videos offer in-depth views of each model, including interior details, exterior design highlights, and full performance breakdowns. From compact cars to luxurious sedans, we cover a broad range to suit diverse preferences. Plus, with insights on advanced safety features, efficient engines, and the latest tech, our content helps you make confident decisions.
        </p>
        <br />
        <p>
            Our goal is to bring you closer to the unique driving experience each car offers. So, whether you’re a dedicated car enthusiast or an eager shopper, explore CarPrices.ae's extensive video collection and discover the car that fits you best.
        </p>`} />
                        </div>
                    }
                    <div className="my-4 flex flex-col w-full shadow-md p-4 rounded-lg">
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
                            className="w-[50%] text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        {videos?.map((item) => (
                            <div className="md:col-span-4 col-span-12 relative" key={item.id} >
                                <div className="flex flex-col justify-start bg-white rounded-lg shadow-md overflow-hidden h-full">
                                    <Link href={`/car-videos/${item.slug}`} className="relative">
                                        <Image
                                            src={item.thumbnail || '/assets/placeholder/dealer-placeholder.webp'}
                                            alt={item?.title}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            layout="fixed"
                                            className="w-full md:h-[180px] h-[180px] object-cover rounded-t-[14px]"
                                        />
                                    </Link>
                                    <div className="p-2 flex flex-col justify-between h-full">
                                        <Link href={`/car-videos/${item.slug}`} className='flex flex-col space-y-2 mb-3'>
                                            <h3 className="text-lg font-medium">{item.title}</h3>
                                        </Link>


                                        {/* <div className="mt-2">
                                        <div className="flex flex-col justify-between text-gray-800 mt-2">
                                            <div className='flex justify-between'>
                                                <div className='flex items-center gap-2'>
                                                    <p className="text-xs font-semibold sm:inline">
                                                        {item.author?.name || 'Unknown Author'}
                                                    </p>{" "}
                                                </div>
                                                <p>
                                                    <span className='text-xs font-semibold sm:inline'>Published: </span>
                                                    <span className='text-xs ml-1'>{new Date(item.publishedAt).toLocaleDateString()}</span>
                                                </p>
                                            </div>{" "}
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
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
                <div className="md:col-span-3">
                    <div className='my-6 sticky top-0 md:block hidden'>
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="3792539533" />
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
    );
}
