import BrandDealerPage from '@/components/brand-component/BrandDealerPage';
import { fetchBrandDealers, fetchBrandDetails } from '@/lib/brandapis';
import { fetchMetaData } from '@/lib/fetchMetaData';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata() {
    const slug = "car-dealers";
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
        description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        alternates: {
            ...(metaData?.canonicalURL && { canonical: metaData.canonicalURL }),
        },
        keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
            description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
            url: "https://carprices.ae",
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default async function page({ params, searchParams }) {
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
