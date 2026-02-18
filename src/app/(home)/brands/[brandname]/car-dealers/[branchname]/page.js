import BrandDealerPage from '@/components/brand-component/BrandDealerPage';
import { fetchBrandDealers, fetchBrandDetails } from '@/lib/brandapis';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ params }) {
    const { brandname, branchname } = params;

    // Convert brandname and branchname to capital case
    const capitalBrandName = slugToCapitalCase(brandname);
    const capitalBranchName = branchname ? slugToCapitalCase(branchname) : '';

    const title = `${capitalBrandName} ${capitalBranchName ? capitalBranchName + ' ' : ''}Car Dealers in UAE | Find ${capitalBrandName} Dealerships & Showrooms`;
    const description = `Locate authorized ${capitalBrandName} car dealers ${capitalBranchName ? 'for ' + capitalBranchName : ''} in the UAE at CarPrices.ae. Discover the nearest ${capitalBrandName} ${capitalBranchName ? capitalBranchName + ' ' : ''}showrooms, dealerships, and service centers to explore the latest models and services.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/brands/${brandname}/car-dealers/${branchname}`,
        },
        keywords: `${capitalBrandName} ${capitalBranchName ? capitalBranchName + ' ' : ''}dealers UAE, ${capitalBrandName} ${capitalBranchName ? capitalBranchName + ' ' : ''}showrooms UAE, ${capitalBrandName} dealerships, ${capitalBrandName} car dealers UAE, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/brands/${brandname}/car-dealers/${branchname}`,
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


export default async function page({ params, searchParams }) {
    const { brandname } = params;
    const { branchname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch data from API
    const data = await fetchBrandDealers(brandname, branchname, currentPage, pageSize);

    const { brand, seo } = await fetchBrandDetails(brandname);

    if (!brand) {
        notFound();
        return null;
    }
    return (
        <BrandDealerPage
            brandname={brandname}
            dealers={data?.dealers}
            pagination={{
                currentPage,
                pageSize,
                pageCount: data?.pagination?.totalPages || 1,
                totalResults: data?.pagination?.totalItems || 1,
            }}
            brandDetails={brand}
            seo={seo}
            search={search}
            branchname={branchname} />
    )
}
