import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { fetchMetaData } from '@/lib/fetchMetaData';
import React, { Suspense } from 'react'
// Metadata generation
export async function generateMetadata() {
    const slug = "find-your-car";
    const metaData = await fetchMetaData(slug);

    const title = metaData?.title || "Search New Cars | Car Listings";
    const description = metaData?.description || "Find the best new cars based on your preferences and budget. Filter by price, brand, body type, and more.";

    return {
        title,
        description,
        alternates: {
            canonical: `/find-your-car`,
        },
        keywords: metaData?.keywords || "new cars, car listings, car prices, car filters",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/find-your-car`,
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
