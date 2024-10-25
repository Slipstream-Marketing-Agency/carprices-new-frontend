import ArticleWrapper from '@/components/articles-component/ArticleWrapper'
import { fetchMetaData } from '@/lib/fetchMetaData';
import React, { Suspense } from 'react'
export async function generateMetadata() {
    const slug = "home";
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "Latest Car review UAE: New Models, Launches, and Industry Insights - Carprices.ae",
        description: metaData?.description || "Stay informed with the latest car review in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/reviews`,
        },
        keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title || "Latest Car review UAE: New Models, Launches, and Industry Insights - Carprices.ae",
            description: metaData?.description || "Stay informed with the latest car review in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
            url: "https://carprices.ae/reviews",
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}
export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}><ArticleWrapper /></Suspense>
    )
}
