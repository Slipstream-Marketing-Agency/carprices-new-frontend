import BrandDealerPage from '@/components/brand-component/BrandDealerPage';
import { fetchBrandDealers, fetchBrandDetails } from '@/lib/brandapis';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function page({ params, searchParams }) {

    console.log(params, searchParams, "params, searchParams");

    const { brandname } = params;
    const { branchname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch data from API
    const data = await fetchBrandDealers(brandname, branchname, currentPage, pageSize);

    const { brand, seo } = await fetchBrandDetails(brandname);

    // if (!brand) {
    //     notFound();
    //     return null;
    // }
    return (
        <BrandDealerPage
            brandname={brandname}
            dealers={data?.dealers}
            pagination={{
                currentPage,
                pageSize,
                pageCount: data?.pagination?.totalPages || 1,
                totalResults: data?.pagination?.totalItems || 1,
            }}
            seo={seo}
            search={search}
            branchname={branchname} />
    )
}
