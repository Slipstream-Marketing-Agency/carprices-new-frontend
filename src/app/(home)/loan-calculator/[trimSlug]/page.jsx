import LoanCalculatorWrapper from '@/components/loan-calculator/LoanCalculatorWrapper';
import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react'

export async function generateMetadata() {
    const slug = "loan-calculator"

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    const pageTitle = metaData?.title || "Car Loan Calculator: Easily Calculate Your Car Financing Options - Carprices.ae";
    const pageDescription = metaData?.description || "Calculate car loans effortlessly. Get accurate estimates, explore repayment options, and make informed decisions. Plan confidently with CarPrices UAE.";

    // Return the dynamic metadata
    return {
        title: pageTitle,
        description: pageDescription,
        alternates: {
            canonical: `https://carprices.ae/loan-calculator`,
        },
        keywords: metaData?.keywords || "contact CarPrices.ae, car inquiries UAE, car suggestions UAE, car feedback UAE, automotive assistance UAE, trusted automotive companion, car journey UAE, car prices UAE, contact us CarPrices.ae, automotive world UAE, connect with CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: "https://carprices.ae/loan-calculator",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
        },
    };
}

const page = () => {
  return (
    <LoanCalculatorWrapper/>
  )
}

export default page