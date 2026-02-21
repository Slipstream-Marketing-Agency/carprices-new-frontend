import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react';
import CompareCarsWrap from '@/components/compare-cars/CompareCarsWrap';
import SelectedCompareCarsSection from '@/components/home/SelectedCompareCarsSection';
// import CarComparisonTable from '@/components/compare-cars/CarComparisonTable';

export async function generateMetadata({ params }) {
    const slug = "compare-cars";

    // Fetch dynamic metadata for the compare cars page
    const metaData = await fetchMetaData(slug);

    const title = metaData?.title || "Compare Cars: Side-by-Side Comparison of Features, Specs, and Prices - Carprices.ae";
    const description = metaData?.description || "Find your perfect car match. Compare side by side, explore detailed specs, features, and pricing options. Make informed decisions with our easy car comparison tool.";

    // Return the dynamic metadata
    return {
        title,
        description,
        alternates: {
            canonical: `/compare-cars`,
        },
        keywords: metaData?.keywords || "Car comparison, Compare cars, Car prices, Specs comparison, Features comparison, UAE cars",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/compare-cars`,
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

export default async function CompareCars({ params }) {
    return (
        <>
            <CompareCarsWrap params={params} />
            <SelectedCompareCarsSection />
        </>
    );
}

