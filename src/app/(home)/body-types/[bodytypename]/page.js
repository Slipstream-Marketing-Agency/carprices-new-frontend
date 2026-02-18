import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import React, { Suspense } from 'react'

export const revalidate = 60;
export const dynamicParams = true;

const BODY_TYPE_SLUGS = [
  'sedan', 'suv', 'midsize-suv', 'hatchback', 'coupe',
  'convertible', 'pick-up', 'van', 'mpv', 'sports-car', 'station-wagon',
];

export async function generateStaticParams() {
  return BODY_TYPE_SLUGS.map((slug) => ({ bodytypename: slug }));
}

export async function generateMetadata({ params }) {
    const { bodytypename } = params;
    const capitalBodyTypeName = slugToCapitalCase(bodytypename);

    const title = `${capitalBodyTypeName} Car Prices in UAE | Explore ${capitalBodyTypeName} Models & Pricing`;
    const description = `Find detailed information about ${capitalBodyTypeName} cars in the UAE at CarPrices.ae. Get the latest updates on models, specifications, and pricing to choose your perfect ${capitalBodyTypeName}.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/body-types/${bodytypename}`,
        },
        keywords: `${capitalBodyTypeName} car prices UAE, ${capitalBodyTypeName} models UAE, ${capitalBodyTypeName} reviews UAE, ${capitalBodyTypeName} specs, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/body-types/${bodytypename}`,
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

export default function page({ params }) {

    return (
        <Suspense fallback={<div className="container py-8">Loading...</div>}>
            <AdvancedFilterWrapper filterType={"category"} />
        </Suspense>
    )
}
