import BrandDealerPage from '@/components/brand-component/BrandDealerPage';
import { fetchBrandDealers, fetchBrandDetails } from '@/lib/brandapis';
import { fetchMetaData } from '@/lib/fetchMetaData';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata() {
    const slug = "car-dealers";
    const metaData = await fetchMetaData(slug);

    const title = metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae";
    const description = metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.";

    return {
        title,
        description,
        alternates: {
            ...(metaData?.canonicalURL ? { canonical: metaData.canonicalURL } : { canonical: `/car-dealers` }),
        },
        keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/car-dealers`,
            siteName: "CarPrices.ae",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function CarDealersPage({ searchParams }) {
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch all dealers (not brand-specific at this route)
    const data = await fetchBrandDealers(undefined, undefined, currentPage, pageSize);

    return (
        <BrandDealerPage
            brandname={null}
            dealers={data?.dealers}
            pagination={{
                currentPage,
                pageSize,
                pageCount: data?.pagination?.totalPages || 1,
                totalResults: data?.pagination?.totalItems || 1,
            }}
            seo={null}
            search={search}
            branchname={null} />
    )
}
