import BrandVideoPage from '@/components/brand-component/BrandVideoPage';
import { fetchBrandDetails, fetchBrandVideos } from '@/lib/brandapis';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function pages({ params, searchParams }) {
    console.log(params, searchParams, "params, searchParams");

    const { brandname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch data from API
    const data = await fetchBrandVideos(brandname, currentPage, pageSize);

    const { brand, seo } = await fetchBrandDetails(brandname);

    // if (!brand) {
    //     notFound();
    //     return null;
    // }
    return (
        <BrandVideoPage
            brandname={brandname}
            videos={data?.videos}
            pagination={{
                currentPage,
                pageSize,
                pageCount: data?.pagination?.totalPages || 1,
                totalResults: data?.pagination?.totalItems || 1,
            }}
            brandDetails={brand}
            seo={seo}
            search={search} />
    )
}
