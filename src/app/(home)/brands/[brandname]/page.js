// brands/[brandname]/page.js

import SingleBrand from '@/components/brand-component/SingleBrand';
import { fetchBrandDetails, fetchModels, fetchMetaData } from '@/lib/brandapis';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { brandname } = params;
    const { brand, seo } = await fetchBrandDetails(brandname);

    // Handle default values if specific SEO fields are missing
    const metaData = {
        title: seo?.metaTitle || `${brand?.name} Car Prices in UAE | Explore ${brand?.name} Models & Pricing`,
        description: seo?.metaDescription || `Find detailed information about ${brand?.name} cars in the UAE at CarPrices.ae. Get the latest updates on models, specifications, and pricing to choose your perfect ${brand?.name}.`,
        charset: "UTF-8",
        alternates: {
            canonical: seo?.canonicalURL || `https://carprices.ae/brands/${brandname}`,
        },
        keywords: seo?.keyword || `${brand?.name} car prices UAE, ${brand?.name} models UAE, ${brand?.name} reviews UAE, ${brand?.name} specs, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        structuredData: seo?.structuredData || {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: seo?.metaTitle || `${brand?.name} Car Prices in UAE`,
            description: seo?.metaDescription || `Explore the latest ${brand?.name} car models, specifications, and pricing in the UAE with CarPrices.ae.`,
            url: `https://carprices.ae/brands/${brandname}`,
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };

    return metaData;
}

export default async function Page({ params, searchParams }) {


    console.log(params, searchParams, "params, searchParams");

    const { brandname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    // Fetch data from API
    const data = await fetchModels(brandname, currentPage, pageSize, search);
    const { brand, seo } = await fetchBrandDetails(brandname);

    if (!brand || !data || !data.data) {
        notFound();
        return null;
    }

    return (
        <SingleBrand
            brandname={brandname}
            year={params.year || null}
            initialModels={data.data}
            pagination={{
                currentPage,
                pageSize,
                pageCount: data.pagination.pageCount,
                totalResults: data.pagination.total,
            }}
            brandDetails={brand}
            seo={seo}
            search={search}
        />
    );
}
