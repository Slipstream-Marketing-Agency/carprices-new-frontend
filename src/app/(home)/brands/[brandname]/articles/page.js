import BrandArticlePage from '@/components/brand-component/BrandArticlePage';
import { fetchBrandDetails } from '@/lib/brandapis';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }) {
    const { brandname } = params;

    // Convert brandname to capital case for better readability
    const capitalBrandName = slugToCapitalCase(brandname);

    const title = `${capitalBrandName} Car Articles in UAE | Latest News, Reviews & Insights`;
    const description = `Stay updated with the latest ${capitalBrandName} car articles, news, reviews, and insights in the UAE on CarPrices.ae. Discover detailed analyses and expert opinions to help you stay informed about ${capitalBrandName} models.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/brands/${brandname}/articles`,
        },
        keywords: `${capitalBrandName} car articles UAE, ${capitalBrandName} car news UAE, ${capitalBrandName} reviews UAE, ${capitalBrandName} expert insights, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/brands/${brandname}/articles`,
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


export default async function BrandArticlesPage({ params, searchParams }) {
    const { brandname } = params;
    const currentPage = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.pageSize) || 9;
    const search = searchParams.search || '';

    const { brand } = await fetchBrandDetails(brandname);

    if (!brand) {
        notFound();
    }
    return (
        <BrandArticlePage  brandname={brandname} brandDetails={brand}/>
    )
}
