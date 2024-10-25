import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { fetchMetaData } from '@/lib/fetchMetaData';
import React, { Suspense } from 'react'
// Metadata generation
export async function generateMetadata() {
    const slug = "find-your-car";
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "Search New Cars | Car Listings",
        description: metaData?.description || "Find the best new cars based on your preferences and budget. Filter by price, brand, body type, and more.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/find-your-car`,
        },
        keywords: metaData?.keywords || "new cars, car listings, car prices, car filters",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title || "Find the best new cars based on your preferences and budget. Filter by price, brand, body type, and more.",
            description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
            url: "https://carprices.ae/find-your-car",
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
