"use client";
import React, { Suspense } from 'react';
import ProductCategory from "@/components/brand-component/ProductCategory";
import Pagination from "@/components/advanced-filter/Pagination";
import Ad728x90 from '../ads/Ad728x90';
import Ad300x600 from '../ads/Ad300x600';
import ExpandableText from '../common/ExpandableText';

export default function BrandListWrapper({ brandsData, pagination }) {
    const currentYear = new Date().getFullYear();
    return (
        <div className='container grid grid-cols-12'>
            <div className='md:col-span-9 col-span-12'>
                <div className='shadow-md p-4 mt-5 rounded-lg'>
                    <h1 className="md:text-3xl text-xl font-semibold">Top Car Brands in UAE - Leading Automotive Brands in {currentYear}</h1>
                    <h4 className="md:text-lg text-md font-medium text-blue-600">
                        Discover the Most Popular Car Brands in the UAE
                    </h4>
                    <ExpandableText content={`<p>Explore a curated list of top car brands available in the UAE, featuring luxury, performance, and budget-friendly options from leading global manufacturers. From renowned luxury brands like Aston Martin, Bentley, and Bugatti to popular choices like BMW, Audi, and Chevrolet, this guide provides detailed insights into each brand's offerings in the UAE market. Perfect for car enthusiasts, buyers, and industry experts looking to stay informed about the latest automotive trends in the UAE.</p>`} />
                </div>
                <ProductCategory brands={brandsData} />
                <div className='container flex justify-center mb-10'>
                    <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
                </div>
            </div>
            <div className='md:col-span-3 col-span-12'>
                <div className='my-6 sticky top-0  md:block hidden'>
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300x600 dataAdSlot="3389131033" />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
