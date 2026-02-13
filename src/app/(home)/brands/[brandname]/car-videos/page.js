import BrandVideoPage from '@/components/brand-component/BrandVideoPage';
import { fetchBrandDetails, fetchBrandVideos } from '@/lib/brandapis';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import React from 'react'

export async function generateMetadata({ params }) {
    const { brandname } = params;


    // Convert brandname to capital case for better readability
    const capitalBrandName = slugToCapitalCase(brandname);

    // Create metadata for the video page
    const metaData = {
        title: `${capitalBrandName} Car Videos in UAE | Watch ${capitalBrandName} Models & Reviews`,
        description: `Explore the latest ${capitalBrandName} car videos, reviews, and model highlights in the UAE on CarPrices.ae. Watch video reviews, specifications, and detailed insights to help you choose the right ${capitalBrandName} model.`,
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/brands/${brandname}/car-videos`,
        },
        keywords: `${capitalBrandName} car videos UAE, ${capitalBrandName} reviews UAE, ${capitalBrandName} model videos, ${capitalBrandName} car specs UAE, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${capitalBrandName} Car Videos in UAE`,
            description: `Watch authorized ${capitalBrandName} car videos, model reviews, and specifications in the UAE on CarPrices.ae.`,
            url: `https://carprices.ae/brands/${brandname}/car-videos`,
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };

    return metaData;
}

export default async function pages({ params, searchParams }) {
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
        <BrandVideoPage
            brandname={brandname}
            videos={data?.videos}
            pagination={{
                currentPage,
                pageSize,
                pageCount: data?.pagination?.totalPages || 1,
                totalResults: data?.pagination?.totalItems || 1,
            }}
            brandDetails={brand}
            seo={seo}
            search={search} />
    )
}
