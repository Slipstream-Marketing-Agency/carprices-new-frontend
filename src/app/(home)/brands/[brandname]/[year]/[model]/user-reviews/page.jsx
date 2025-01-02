import ModelWrapper from "@/components/model-component/ModelWrapper";
import axios from "axios";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { year, brandname, model } = params;
    const yearInt = parseInt(year, 10);

    try {
        const currentmodelResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${brandname}/${model}/${yearInt}`
        );

        const currentmodel = currentmodelResponse.data.data.model;
        const seoData = currentmodelResponse.data.data.seo;

        const minPrice = currentmodel?.price?.min;

        return {
            title: false ? seoData.metaTitle : `${year} ${currentmodel.brand?.name} ${currentmodel.name} Price in UAE | Variants, Spec & Features - Carprices.ae`,
            description: `${year} ${currentmodel.brand?.name} ${currentmodel.name} price, images, and specifications in the UAE from verified dealers. Read in-depth reviews, compare models, and buy your new car on Carprices.ae`,
            // description: seoData?.metaDescription ? seoData.metaDescription : `Explore the ${year} ${currentmodel.brand?.name} ${currentmodel.name
            //     } starting at ${minPrice <= 0
            //         ? "TBD"
            //         : "AED" +
            //         " " +
            //         minPrice?.toLocaleString("en-AE", {
            //             minimumFractionDigits: 0,
            //             maximumFractionDigits: 2,
            //         })
            //     }* in UAE. Check out Variants, Mileage, Colors, Interiors, specifications, Features and performance details.`,
            charset: "UTF-8",
            alternates: {
                ...(seoData?.canonicalURL && { canonical: seoData.canonicalURL }),
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
        if (error.response?.status === 404) {
            return notFound(); // Call notFound() for 404 errors
        }
        console.error("Error fetching model data:", error);
        throw error; // Re-throw other errors for handling elsewhere
    }

}

export default async function ReviewPage({ params }) {
    const { year, brandname, model } = params;
    const yearInt = parseInt(year, 10);

    let currentmodel;
    let oldModel;
    let seoData;

    try {
        // Fetch current and old model data
        const oldModelsResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/find-model/${model}`
        );

        const currentmodelResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${brandname}/${model}/${yearInt}`
        );

        currentmodel = currentmodelResponse.data.data.model;
        seoData = currentmodelResponse.data.data.seo;
        oldModel = oldModelsResponse.data.data;

        // If no trims, return 404
        if (!currentmodel || currentmodel.trims.length === 0) {
            throw new Error('No trims available');
        }
    } catch (error) {
        console.error('Error fetching model data:', error);

        // Handle redirect for old slugs
        if (error.response && error.response.status === 404) {
            const redirectResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}model/old-slug/${model}`
            );
            const newModelSlug = redirectResponse.data.model.slug;

            // Redirect to the new model page
            return {
                redirect: {
                    permanent: false,
                    destination: `/brands/${brandname}/${year}/${newModelSlug}`,
                },
            };
        }

        // Return 404 if everything else fails
        return {
            notFound: true,
        };
    }

    return (
        <div className='mt-6'>
            <ModelWrapper
                oldModel={oldModel}
                currentmodel={currentmodel}
                seoData={seoData}
                parentPage="user-reviews"
                activeTab="#user-reviews"
            />
        </div>
    );
}
