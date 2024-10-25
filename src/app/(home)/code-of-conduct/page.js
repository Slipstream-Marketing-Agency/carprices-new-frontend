import CodeOfConduct from '@/components/code-of-conduct/CodeOfConduct';
import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react'

export async function generateMetadata({ params }) {
    const slug = "code-of-conduct"

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    // Return the dynamic metadata
    return {
        title: metaData?.title ? metaData.title : "Code of Conduct - Carprices.ae",
        description: metaData?.description
            ? metaData.description
            : "We adhere to a strict code of conduct to ensure a positive and respectful experience for all users. Read our code of conduct to understand the guidelines and expectations we have in place.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/code-of-conduct`,
        },
        keywords: metaData?.keywords || "code of conduct CarPrices.ae, user conduct UAE, respectful user behavior, guidelines CarPrices.ae, user expectations UAE, positive user experience, CarPrices.ae regulations, automotive community conduct, user policies UAE, code of ethics CarPrices.ae, car prices conduct policy, CarPrices.ae guidelines",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title ? metaData.title : "Code of Conduct - Carprices.ae",
            description:
                metaData?.description
                    ? metaData.description
                    : "We adhere to a strict code of conduct to ensure a positive and respectful experience for all users. Read our code of conduct to understand the guidelines and expectations we have in place.",
            url: "https://carprices.ae/code-of-conduct",  // Using the same canonical URL here
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default function page() {
    return (
        <CodeOfConduct/>
    )
}
