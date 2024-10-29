"use client";
import React from 'react';
import ProductCategory from "@/components/brand-component/ProductCategory";
import Pagination from "@/components/advanced-filter/Pagination";
import Ad728x90 from '../ads/Ad728x90';

export default function BrandListWrapper({ brandsData, pagination }) {
    return (
        <>
            <div>
                <Ad728x90 dataAdSlot="5962627056" />
                <ProductCategory brands={brandsData} />
                <div className='container flex justify-center mb-10'>
                    <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
                </div>
                <Ad728x90 dataAdSlot={"tahoe"} />
            </div>
        </>
    );
}
