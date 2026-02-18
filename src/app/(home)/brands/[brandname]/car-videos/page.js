import BrandVideoPage from '@/components/brand-component/BrandVideoPage';
import { fetchBrandDetails, fetchBrandVideos } from '@/lib/brandapis';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { brandname } = params;


    // Convert brandname to capital case for better readability
    const capitalBrandName = slugToCapitalCase(brandname);

    const title = `${capitalBrandName} Car Videos in UAE | Watch ${capitalBrandName} Models & Reviews`;
    const description = `Explore the latest ${capitalBrandName} car videos, reviews, and model highlights in the UAE on CarPrices.ae. Watch video reviews, specifications, and detailed insights to help you choose the right ${capitalBrandName} model.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/brands/${brandname}/car-videos`,
        },
        keywords: `${capitalBrandName} car videos UAE, ${capitalBrandName} reviews UAE, ${capitalBrandName} model videos, ${capitalBrandName} car specs UAE, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/brands/${brandname}/car-videos`,
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
