import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react';
import CompareCarsWrap from '@/components/compare-cars/CompareCarsWrap';
// import CarComparisonTable from '@/components/compare-cars/CarComparisonTable';

export async function generateMetadata({ params }) {
    const slug = "home";

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    // Return the dynamic metadata
    return {
        title: metaData?.title ? metaData.title : "Compare Cars: Side-by-Side Comparison of Features, Specs, and Prices - Carprices.ae",
        description: metaData?.description
            ? metaData.description
            : "Find your perfect car match. Compare side by side, explore detailed specs, features, and pricing options. Make informed decisions with our easy car comparison tool.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae`,
        },
        keywords: metaData?.keywords || "Car comparison, Compare cars, Car prices, Specs comparison, Features comparison, UAE cars",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title
                ? metaData.title
                : "Compare Cars: Side-by-Side Comparison of Features, Specs, and Prices - Carprices.ae",
            description:
                metaData?.description
                    ? metaData.description
                    : "Find your perfect car match. Compare side by side, explore detailed specs, features, and pricing options. Make informed decisions with our easy car comparison tool.",
            url: "https://carprices.ae", // Using the same canonical URL here
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default async function CompareCars({ params }) {



    return (
        <CompareCarsWrap params={params} />
    );
}
