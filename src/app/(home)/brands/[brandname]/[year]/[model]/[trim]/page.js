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
        const ogImage = trimData?.featuredImage || "https://carprices.ae/assets/img/car-placeholder.png";

        return {
            title: seoData?.metaTitle || `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
            description: seoData?.metaDescription || `Explore the ${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name} with the latest specs, pricing, and features in the UAE. Find your next car with CarPrices.ae.`,
            alternates: {
                canonical: seoData?.canonicalURL || `/brands/${brandname}/${year}/${model}/${trim}`,
            },
            openGraph: {
                title: seoData?.metaTitle || `${trimData?.brand} ${trimData?.model} ${trimData?.year} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
                description: seoData?.metaDescription || `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name
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
                images: [{ url: ogImage }],
                url: `/brands/${brandname}/${year}/${model}/${trim}`,
            },
            robots: {
                index: true,
                follow: true,
            },
            authors: [{ name: "CarPrices.ae Team" }],
            twitter: {
                card: "summary_large_image",
                title: seoData?.metaTitle || `${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name} Car Prices in UAE | Photos, Spec - Carprices.ae`,
                description: seoData?.metaDescription || `Explore the ${trimData?.year} ${trimData?.brand} ${trimData?.model} ${trimData?.name} with the latest specs, pricing, and features in the UAE. Find your next car with CarPrices.ae.`,
                images: [ogImage],
            },
        };
    } catch (error) {
        // Return 404 if everything else fails
        if (error.response?.status === 404) {
            return notFound(); // Call notFound() for 404 errors
        }
if (process.env.NODE_ENV === 'development') { console.error("Error fetching model data:", error); }
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
if (process.env.NODE_ENV === 'development') { console.error("Failed to fetch trim data:", error); }
        return notFound(); // Handle not found case
    }

    // Pass fetched data to VariantWrapper component
    return (
        <div className='mt-6'>
            <VariantWrapper model={trimData?.model} trimData={trimData} trimSlug={trimSlug} />

        </div>
    );
}
