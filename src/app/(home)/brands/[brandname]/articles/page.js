import BrandArticlePage from '@/components/brand-component/BrandArticlePage';
import { fetchBrandDetails, fetchBrandVideos } from '@/lib/brandapis';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import React from 'react'


export async function generateMetadata({ params }) {
    const { brandname } = params;

    // Convert brandname to capital case for better readability
    const capitalBrandName = slugToCapitalCase(brandname);

    // Create metadata for the articles page
    const metaData = {
        title: `${capitalBrandName} Car Articles in UAE | Latest News, Reviews & Insights`,
        description: `Stay updated with the latest ${capitalBrandName} car articles, news, reviews, and insights in the UAE on CarPrices.ae. Discover detailed analyses and expert opinions to help you stay informed about ${capitalBrandName} models.`,
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/brands/${brandname}/car-articles`,
        },
        keywords: `${capitalBrandName} car articles UAE, ${capitalBrandName} car news UAE, ${capitalBrandName} reviews UAE, ${capitalBrandName} expert insights, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${capitalBrandName} Car Articles in UAE`,
            description: `Read authoritative ${capitalBrandName} car articles, news, reviews, and insights in the UAE on CarPrices.ae.`,
            url: `https://carprices.ae/brands/${brandname}/car-articles`,
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };

    return metaData;
}


export default async function page({ params, searchParams }) {
    console.log(params, searchParams, "params, searchParams");

    const { brandname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch data from API
    const data = await fetchBrandVideos(brandname, currentPage, pageSize);

    const { brand, seo } = await fetchBrandDetails(brandname);

    if (!brand) {
        notFound();
        return null;
    }
    return (
        <BrandArticlePage  brandname={brandname} brandDetails={brand}/>
    )
}
