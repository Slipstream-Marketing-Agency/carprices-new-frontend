import WebstoriesWrapper from '@/components/webstories/WebstoriesWrapper';
import { fetchMetaData } from '@/lib/fetchMetaData';
import { getAllWebStories, getCategories } from '@/lib/api';
import React from 'react';

// Fetch metadata dynamically
export async function generateMetadata() {
    const slug = "web-stories";

    // Fetch dynamic metadata
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "Web Stories - Carprices.ae",
        description: metaData?.description || "Explore all web stories about car prices, buying tips, and more.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/web-stories`,
        },
        keywords: metaData?.keywords || "contact CarPrices.ae, car inquiries UAE, car suggestions UAE, car feedback UAE, automotive assistance UAE, trusted automotive companion, car journey UAE, car prices UAE, contact us CarPrices.ae, automotive world UAE, connect with CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title || "Web Stories - Carprices.ae",
            description: metaData?.description || "Explore all web stories about car prices, buying tips, and more.",
            url: "https://carprices.ae/web-stories",
        },
        author: "Carprices.ae Team",
        icon: "/favicon.ico",
    };
}

// Fetch data inside the page component using async
export default async function WebStoriesPage() {
    try {
        // Fetch stories and categories
        const stories = await getAllWebStories();
        const categories = await getCategories();

        return (
            <div>
                <WebstoriesWrapper stories={stories} categories={categories} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching web stories or categories:', error);
        return (
            <div>
                <p>Error loading web stories. Please try again later.</p>
            </div>
        );
    }
}
