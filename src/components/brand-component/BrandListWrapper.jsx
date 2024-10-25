"use client"
import React from 'react'
import ProductCategory from "@/components/brand-component/ProductCategory";
import Pagination from "@/components/advanced-filter/Pagination";
import Ad728x90 from '../ads/Ad728x90';


export default function BrandListWrapper({ brandsData }) {
    return (
        <> <div >
            <Ad728x90 dataAdSlot="5962627056" />
            <ProductCategory brands={brandsData.data} />
            <div className='container mb-10'>
                <Pagination currentPage={brandsData.meta.pagination.page} totalPages={brandsData.meta.pagination.pageCount} />

            </div>
            <Ad728x90 dataAdSlot={"tahoe"} />
        </div></>
    )
}
