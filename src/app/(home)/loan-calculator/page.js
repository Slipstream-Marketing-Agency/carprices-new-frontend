import LoanCalculatorWrapper from '@/components/loan-calculator/LoanCalculatorWrapper';
import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react'

export async function generateMetadata() {
    const slug = "loan-calculator"

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    // Return the dynamic metadata
    return {
        title: metaData?.title ? metaData.title : "Car Loan Calculator: Easily Calculate Your Car Financing Options - Carprices.ae",
        description: metaData?.description
            ? metaData.description
            : "Calculate car loans effortlessly. Get accurate estimates, explore repayment options, and make informed decisions. Plan confidently with CarPrices UAE.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/loan-calculator`,
        },
        keywords: metaData?.keywords || "contact CarPrices.ae, car inquiries UAE, car suggestions UAE, car feedback UAE, automotive assistance UAE, trusted automotive companion, car journey UAE, car prices UAE, contact us CarPrices.ae, automotive world UAE, connect with CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title ? metaData.title : "Car Loan Calculator: Easily Calculate Your Car Financing Options - Carprices.ae",
            description:
                metaData?.description
                    ? metaData.description
                    : "Calculate car loans effortlessly. Get accurate estimates, explore repayment options, and make informed decisions. Plan confidently with CarPrices UAE.",
            url: "https://carprices.ae/contact-us",  // Using the same canonical URL here
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default function LoanCalculator() {
    return (
        <LoanCalculatorWrapper/>
    )
}
