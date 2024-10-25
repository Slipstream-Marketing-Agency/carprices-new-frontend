import VariantWrapper from '@/components/variant-component/VariantWrapper';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react';

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

    console.log(trimData, "trimData");

    // Pass fetched data to VariantWrapper component
    return (
        <div className='mt-6'>
            <VariantWrapper model={trimData?.model} trimData={trimData} trimSlug={trimSlug} />

        </div>
    );
}
