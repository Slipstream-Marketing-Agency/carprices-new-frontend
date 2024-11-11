
"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CarCard from './CarCard';
import Pagination from './Pagination';
import ExpandableText from '../common/ExpandableText';
import { fetchModels } from '@/lib/brandapis';
import { Formik, Field, Form } from 'formik';
import Select from 'react-select';
import CarCardSkeleton from '../car-components/CarCardSkeleton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Image from 'next/image';
import RelatedArticles from '../articles-component/RelatedArticles';
import RelatedVideos from '../car-videos/RelatedVideos';
import InnerNavigation from './InnerNavigation';
import Ad300x600 from '../ads/Ad300x600';
import PriceListTable from './PriceListTable';

export default function SingleBrand({ brandname, year, initialModels, pagination, brandDetails, search }) {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(pagination.pageSize);
    const [searchTerm, setSearchTerm] = useState(search);
    const [models, setModels] = useState(initialModels);
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
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}latest-model-years`, {
                params: {
                    page: loadMore ? brandPage : 1,
                    pageSize: 20,
                    search: typeof search === 'string' ? search : "", // Ensure search is a string
                    sort: "brandName",
                    order: "asc",
                },
            });

            const newBrands = response.data.data.brands.map((brand) => ({
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
            setModels(data.data);
            setPageCount(data.pagination.pageCount);
            setTotalResults(data.pagination.total);
            setLoading(false);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, currentPage, pageSize, selectedBrand, isSearching]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(
            `/brands/${selectedBrand}?page=${page}&pageSize=${pageSize}${searchTerm ? `&search=${searchTerm}` : ''}`,
            undefined,
            { shallow: true }
        );
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
        router.push(
            `/brands/${selectedBrand}?page=1&pageSize=${newSize}${searchTerm ? `&search=${searchTerm}` : ''}`,
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
        router.push(`/brands/${newBrand}?page=1&pageSize=${pageSize}`, undefined, { shallow: true });
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

    const [branddetails, setBrandDetails] = useState(null); // State for brand details
    console.log(branddetails, "branddetails");

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}car-brands/${brandname}` // Use params to get brandname
                );
                setBrandDetails(response.data); // Set the fetched brand details
            } catch (error) {
                console.error("Error fetching brand details:", error);
            }
        };

        fetchBrandDetails(); // Call the fetch function if the condition is met

    }, []);

    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });


    return (
        <div className="container">
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-9">

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
                            {branddetails && <>
                                <div>
                                    <h1 className="text-3xl font-semibold">{brandDetails?.name} Cars in UAE</h1>

                                    <hr className="my-0 mt-2 heading-bottom " />
                                    <div className="read-more-less" id="dynamic-content">
                                        <div
                                            className={`info ${expanded ? "" : "height-hidden"
                                                } dynamic-content content-hidden`}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: branddetails?.attributes?.description,
                                                }}
                                            ></div>
                                            <h2 className="text-2xl font-semibold mt-5">
                                                {branddetails?.attributes?.name} Cars{" "}
                                                {formattedDate} Price List in UAE
                                            </h2>
                                            <hr className="mb-3 mt-2 heading-bottom " />


                                            <br />

                                            <PriceListTable
                                                data={
                                                    branddetails?.attributes?.modelsWithPriceRange || []
                                                }
                                                brand={branddetails?.attributes?.name}
                                            />
                                        </div>
                                        <span
                                            className={`read-more ${expanded ? "hide" : ""
                                                } mb-[-3px] text-blue-500 font-semibold text-xs`}
                                            onClick={() => setExpanded(true)}
                                        >
                                            Read More
                                        </span>
                                        <span
                                            className={`read-less scroll-to-parent-pos content-read-less ${expanded ? "" : "hide"
                                                } text-blue-500 font-semibold text-xs`}
                                            onClick={() => setExpanded(false)}
                                        >
                                            Read Less
                                        </span>
                                    </div>
                                </div>
                            </>}

                        </div>
                    </div>

                    <InnerNavigation brandname={brandname} />

                    <div className="mb-4 flex space-x-4 shadow-md p-4 rounded-lg">
                        <Formik initialValues={{ search: searchTerm }}>
                            <Form className="relative flex-grow">
                                <Field
                                    type="text"
                                    name="search"
                                    placeholder="Search Models..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="p-2 border border-gray-300 rounded w-full text-sm"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        Clear
                                    </button>
                                )}
                            </Form>
                        </Formik>
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
                            className="w-[30%] text-sm"
                        />
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-12 gap-5">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div className="md:col-span-4 relative" key={index}>
                                    <CarCardSkeleton />
                                </div>
                            ))}
                        </div>
                    ) : (
                        (models?.length > 0 ? <div className="grid grid-cols-12 gap-5">
                            {(!isSearching ? initialModels : models).map((car) => (
                                <div className="md:col-span-4 relative" key={car.id}>
                                    <CarCard car={car} brandname={selectedBrand} />
                                </div>
                            ))}
                        </div> : <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
                            <InfoOutlinedIcon fontSize="large" className="mb-2" />
                            <p className="text-lg">No models match your search criteria.</p>
                            <p className="text-sm">Try adjusting your search or browse other options.</p>
                        </div>)
                    )}
                    <Pagination
                        currentPage={!isSearching ? pagination.currentPage : currentPage}
                        pageCount={!isSearching ? pagination.pageCount : pageCount}
                        type={`${selectedBrand}/${year || ''}`}
                        totalResults={!isSearching ? pagination.totalResults : totalResults}
                        pageSize={!isSearching ? pagination.pageSize : pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                    <RelatedArticles type='brand' slug={brandname} />
                    <RelatedVideos type='brand' slug={brandname} />
                </div>
                <div className="md:col-span-3">
                    <div className='my-6 sticky top-0'>
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="3792539533" />
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
    );
}
