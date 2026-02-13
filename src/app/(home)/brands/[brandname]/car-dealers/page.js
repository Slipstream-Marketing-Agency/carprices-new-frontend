import BrandDealerPage from '@/components/brand-component/BrandDealerPage';
import { fetchBrandDealers, fetchBrandDetails } from '@/lib/brandapis';
import React from 'react'

export async function generateMetadata({ params }) {
    const { brandname } = params;
    const { brand, seo } = await fetchBrandDetails(brandname);

    // Handle default values if specific SEO fields are missing
    const metaData = {
        title: `${brand?.name} Car Dealers in UAE | Find ${brand?.name} Dealerships & Showrooms`,
        description: `Locate authorized ${brand?.name} car dealers in the UAE at CarPrices.ae. Discover the nearest ${brand?.name} showrooms, dealerships, and service centers to explore the latest models and services.`,
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/brands/${brandname}/car-dealers`,
        },
        keywords: `${brand?.name} dealers UAE, ${brand?.name} showrooms UAE, ${brand?.name} dealerships, ${brand?.name} car dealers UAE, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${brand?.name} Car Dealers in UAE`,
            description: `Find authorized ${brand?.name} car dealers and showrooms in the UAE with CarPrices.ae.`,
            url: `https://carprices.ae/brands/${brandname}/car-dealers`,
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };

    return metaData;
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

    if (!brand) {
        notFound();
        return null;
    }
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
            brandDetails={brand}
            seo={seo}
            search={search}
            branchname={branchname} />
    )
}
