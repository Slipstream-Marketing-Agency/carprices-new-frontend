import VariantWrapper from '@/components/variant-component/VariantWrapper';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }) {
    const { year, brandname, model, trim } = params;
    let trimSlug = decodeURIComponent(trim).replace(/ /g, "+");

    // Fetch data for the trim
    let trimData;
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-trims/findonetrim/${model}/${trimSlug}/${year}`
        );
        trimData = response.data.data;
        if (!trimData) {
            return notFound()
        }
        const seoData = trimData?.seo;

        return {
            title: seoData?.metaTitle ? seoData.metaTitle : `${trimData?.brand} ${trimData?.model} ${trimData?.year} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
            description: seoData?.metaDescription ? seoData.metaDescription : `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name
                } price in UAE starts at ${trimData.price <= 0
                    ? "TBD"
                    : "AED" +
                    " " +
                    trimData.price?.toLocaleString("en-AE", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                    })
                }*.Check out ${trimData?.model
                } colours, Features, Specifications, Reviews, Interior Images, & Mileage.`,
            charset: "UTF-8",
            alternates: {
                canonical: seoData?.canonicalURL || `https://carprices.ae/brands/${brandname}/${year}/${model}/${trim}`,
            },
            openGraph: {
                title: seoData?.metaTitle ? seoData.metaTitle : `${trimData?.brand} ${trimData?.model} ${trimData?.year} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
                description: seoData?.metaDescription ? seoData.metaDescription : `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name
                    } price in UAE starts at ${trimData.price <= 0
                        ? "TBD"
                        : "AED" +
                        " " +
                        trimData.price?.toLocaleString("en-AE", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })
                    }*.Check out ${trimData?.model
                    } colours, Features, Specifications, Reviews, Interior Images, & Mileage.`,
                image: trimData?.featuredImage === null ? "https://carprices.ae/assets/img/car-placeholder.png" : trimData?.featuredImage,
                url: `https://carprices.ae/brands/${brandname}/${year}/${model}/${trim}`,
            },
            // keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
            robots: {
                index: true,
                follow: true,
            },
            structuredData: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: seoData?.metaTitle || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
                description: seoData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
                url: "https://carprices.ae",
            },
            author: "Carprices.ae Team",
            icon: "./favicon.ico",
        };
    } catch (error) {
        // Return 404 if everything else fails
        if (error.response?.status === 404) {
            return notFound(); // Call notFound() for 404 errors
        }
        console.error("Error fetching model data:", error);
        throw error; // Re-throw other errors for handling elsewhere
    }

}

export default async function TrimPage({ params }) {
    const { year, brandname, model, trim } = params;

    // Decode the URL components
    let trimSlug = decodeURIComponent(trim).replace(/ /g, "+");

    // Fetch data for the trim
    let trimData;
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-trims/findonetrim/${model}/${trimSlug}/${year}`
        );
        trimData = response.data.data;
    } catch (error) {
        console.error("Failed to fetch trim data:", error);
        return notFound(); // Handle not found case
    }

    // Pass fetched data to VariantWrapper component
    return (
        <div className='mt-6'>
            <VariantWrapper model={trimData?.model} trimData={trimData} trimSlug={trimSlug} />

        </div>
    );
}
