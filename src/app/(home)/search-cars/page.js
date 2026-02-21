import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { fetchMetaData } from '@/lib/fetchMetaData';
import React, { Suspense } from 'react'

export const revalidate = 60;

export async function generateMetadata() {
    const slug = "search-cars";
    const metaData = await fetchMetaData(slug);

    const title = metaData?.title || "Find Your Perfect Car: Search by Price, Body Type and More at Carprices";
    const description = metaData?.description || "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.";

    return {
        title,
        description,
        alternates: {
            canonical: `/search-cars`,
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
            url: `/search-cars`,
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


export default function page() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <AdvancedFilterWrapper />
        </Suspense>
    )
}

