import axios from "axios";
import ArticleDetailWrapper from "@/components/articles-component/ArticleDetailWrapper";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VALID_TYPES = ['news', 'reviews', 'new-launches', 'comparisons', 'buying-guide', 'top-picks']; // Example, update this based on your types

export async function generateStaticParams() {
    return VALID_TYPES.map((type) => ({ type }));
}


async function fetchData(type, slug) {
    try {
        var timestamp = new Date().getTime();
        // Fetch the single article details
        const articleResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/${type}/${slug}?timeStamp=${timestamp}`, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const detailData = articleResponse.data?.data || null;


        return {
            detailData,
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { type, filterType: slug } = params; // Destructure type and use filterType as slug
    if (!VALID_TYPES.includes(type)) {
        notFound();
    }

    const data = await fetchData(type, slug);
    console.log(data?.detailData?.metaTitle, 'mydata', typeof (data), data)
    if (!VALID_TYPES.includes(type) || !data) {
        return notFound();
    }

    return {
        title: data.detailData?.metaTitle || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
        description: data.detailData?.summary || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        // alternates: {
        //     canonical: `https://carprices.ae`,
        // },
        // keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: data.detailData?.metaTitle || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
            description: data.detailData?.summary || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
            url: "https://carprices.ae",
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default async function BlogDetailsPage({ params }) {
    const { type, filterType: slug } = params; // Destructure type and use filterType as slug

    const data = await fetchData(type, slug);
    if (!VALID_TYPES.includes(type) || !data) {
        return notFound();
    }

    console.log(data.detailData, "articleData");

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.detailData?.title,
        "description": data.detailData?.summary,
        "author": {
            "@type": "Person",
            "name": "CarPrices.ae Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Car Prices",
            "logo": {
                "@type": "ImageObject",
                "url": "/assets/img/car-prices-logo.png"
            }
        },
        "datePublished": new Date(data.detailData?.publishedAt).toISOString(),
        "dateModified": new Date(data.detailData?.updatedAt).toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://carprices.ae/${type}/${slug}`
        },
        "image": {
            "@type": "ImageObject",
            "url": data.detailData?.coverImage?.url,
            "width": 1200,
            "height": 630
        }
    }

    const fetchFeaturedArticles = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/type/${type}`, {
                params: { category: 'featured', page: 1, pageSize: 5 },
            });
            return data;
        } catch (error) {
            console.error('Error fetching featured articles:', error);
            return null;
        }
    };
    const featuredArticlesData = await fetchFeaturedArticles();

    // Check if data is null to handle the 404 error
    if (!data || !data.detailData) {
        return <div>404 - Article Not Found</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <ArticleDetailWrapper data={data} type={type} slug={slug} featuredArticlesData={featuredArticlesData} />;
        </Suspense>
    )
}
