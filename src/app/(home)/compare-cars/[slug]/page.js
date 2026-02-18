import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react';
import CompareCarsWrap from '@/components/compare-cars/CompareCarsWrap';
// import CarComparisonTable from '@/components/compare-cars/CarComparisonTable';

export async function generateMetadata({ params }) {
    const slug = "home";

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    const { slug: compareSlug } = params;
    const pageTitle = metaData?.title || "Compare Cars: Side-by-Side Comparison of Features, Specs, and Prices - Carprices.ae";
    const pageDescription = metaData?.description || "Find your perfect car match. Compare side by side, explore detailed specs, features, and pricing options. Make informed decisions with our easy car comparison tool.";

    // Return the dynamic metadata
    return {
        title: pageTitle,
        description: pageDescription,
        alternates: {
            canonical: `https://carprices.ae/compare-cars/${compareSlug}`,
        },
        keywords: metaData?.keywords || "Car comparison, Compare cars, Car prices, Specs comparison, Features comparison, UAE cars",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: `https://carprices.ae/compare-cars/${compareSlug}`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
        },
    };
}

export default async function CompareCars({ params }) {



    return (
        <CompareCarsWrap params={params} />
    );
}
