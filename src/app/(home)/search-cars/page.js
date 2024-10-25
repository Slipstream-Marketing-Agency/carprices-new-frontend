import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { fetchMetaData } from '@/lib/fetchMetaData';
import React, { Suspense } from 'react'


export async function generateMetadata() {
    const slug = "search-cars";
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
        description: metaData?.description || "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/search-cars`,
        },
        keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title || "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
            description: metaData?.description || "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
            url: "https://carprices.ae",
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}


export default function page() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <AdvancedFilterWrapper />
        </Suspense>
    )
}
