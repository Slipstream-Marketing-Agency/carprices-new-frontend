// brands/[brandname]/page.js

import SingleBrand from '@/components/brand-component/SingleBrand';
import { fetchBrandDetails, fetchModels, fetchMetaData } from '@/lib/brandapis';
import { notFound } from 'next/navigation';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}car-brands/names?page=1&pageSize=100`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return [];
    const { brands } = await response.json();
    return (brands || []).map((brand) => ({
      brandname: brand.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
    const { brandname } = params;
    const { brand, seo } = await fetchBrandDetails(brandname);

    // Handle default values if specific SEO fields are missing
    const metaData = {
        title: seo?.metaTitle || `${brand?.name} Car Prices in UAE | Explore ${brand?.name} Models & Pricing`,
        description: seo?.metaDescription || `Find detailed information about ${brand?.name} cars in the UAE at CarPrices.ae. Get the latest updates on models, specifications, and pricing to choose your perfect ${brand?.name}.`,
        alternates: {
            canonical: seo?.canonicalURL || `/brands/${brandname}`,
        },
        keywords: seo?.keyword || `${brand?.name} car prices UAE, ${brand?.name} models UAE, ${brand?.name} reviews UAE, ${brand?.name} specs, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        twitter: {
            card: "summary_large_image",
            title: seo?.metaTitle || `${brand?.name} Car Prices in UAE | Explore ${brand?.name} Models & Pricing`,
            description: seo?.metaDescription || `Find detailed information about ${brand?.name} cars in the UAE at CarPrices.ae. Get the latest updates on models, specifications, and pricing to choose your perfect ${brand?.name}.`,
        },
    };

    return metaData;
}

export default async function Page({ params, searchParams }) {
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
