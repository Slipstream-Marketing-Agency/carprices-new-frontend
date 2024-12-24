import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import React from 'react'

export async function generateMetadata({ params }) {
    const { bodytypename } = params;
    const capitalBodyTypeName = slugToCapitalCase(bodytypename)
    // const { brand, seo } = await fetchBrandDetails(brandname);
    const { brand, seo } = {'brand': null, 'seo': null};

    // Handle default values if specific SEO fields are missing
    const metaData = {
        title: seo?.metaTitle || `${capitalBodyTypeName} Car Prices in UAE | Explore ${capitalBodyTypeName} Models & Pricing`,
        description: seo?.metaDescription || `Find detailed information about ${capitalBodyTypeName} cars in the UAE at CarPrices.ae. Get the latest updates on models, specifications, and pricing to choose your perfect ${capitalBodyTypeName}.`,
        charset: "UTF-8",
        alternates: {
            canonical: seo?.canonicalURL || `https://carprices.ae/body-types/${capitalBodyTypeName}`,
        },
        keywords: seo?.keyword || `${capitalBodyTypeName} car prices UAE, ${capitalBodyTypeName} models UAE, ${capitalBodyTypeName} reviews UAE, ${capitalBodyTypeName} specs, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        structuredData: seo?.structuredData || {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: seo?.metaTitle || `${capitalBodyTypeName} Car Prices in UAE`,
            description: seo?.metaDescription || `Explore the latest ${capitalBodyTypeName} car models, specifications, and pricing in the UAE with CarPrices.ae.`,
            url: `https://carprices.ae/brands/${capitalBodyTypeName}`,
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };

    return metaData;
}

export default function page({ params }) {

    return (
        <AdvancedFilterWrapper  filterType ={"category"}/>
    )
}
