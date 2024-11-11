import BrandArticlePage from '@/components/brand-component/BrandArticlePage';
import { fetchBrandDetails, fetchBrandVideos } from '@/lib/brandapis';
import React from 'react'

export default async function page({ params, searchParams }) {
    console.log(params, searchParams, "params, searchParams");

    const { brandname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch data from API
    const data = await fetchBrandVideos(brandname, currentPage, pageSize);

    const { brand, seo } = await fetchBrandDetails(brandname);

    if (!brand) {
        notFound();
        return null;
    }
    return (
        <BrandArticlePage  brandname={brandname} brandDetails={brand}/>
    )
}
