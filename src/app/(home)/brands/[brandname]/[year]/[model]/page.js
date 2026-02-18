import ModelWrapper from "@/components/model-component/ModelWrapper";
import axios from "axios";
import { notFound, redirect } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

// Too many brand/year/model combinations to pre-render at build time.
// Rely on ISR: pages are generated on first request and cached.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
    const { year, brandname, model } = params;
    const yearInt = parseInt(year, 10);

    try {
        const currentmodelResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${brandname}/${model}/${yearInt}`
        );
        const currentmodel = currentmodelResponse.data.data.model;
        const seoData = currentmodelResponse.data.data.seo;
        const mainTrim = currentmodel?.highTrim[0];

        const minPrice = currentmodel?.price?.min;
        const ogImage = mainTrim?.featuredImage || "https://carprices.ae/assets/img/car-placeholder.png";

        return {
            title: seoData?.metaTitle || `${year} ${currentmodel.brand?.name} ${currentmodel.name} Price in UAE | Variants, Spec & Features - Carprices.ae`,
            description: `${year} ${currentmodel.brand?.name} ${currentmodel.name} price, images, and specifications in the UAE from verified dealers. Read in-depth reviews, compare models, and buy your new car on Carprices.ae`,
            alternates: {
                canonical: seoData?.canonicalURL || `/brands/${brandname}/${year}/${model}`,
            },
            openGraph: {
                title: seoData?.metaTitle || `${year} ${currentmodel.brand?.name} ${currentmodel.name} Price in UAE | Variants, Spec & Features - Carprices.ae`,
                description: `${year} ${currentmodel.brand?.name} ${currentmodel.name} price, images, and specifications in the UAE from verified dealers. Read in-depth reviews, compare models, and buy your new car on Carprices.ae`,
                images: [{ url: ogImage }],
                url: `/brands/${brandname}/${year}/${model}`,
            },
            robots: {
                index: true,
                follow: true,
            },
            authors: [{ name: "CarPrices.ae Team" }],
            twitter: {
                card: "summary_large_image",
                title: seoData?.metaTitle || `${year} ${currentmodel.brand?.name} ${currentmodel.name} Price in UAE | Variants, Spec & Features - Carprices.ae`,
                description: `${year} ${currentmodel.brand?.name} ${currentmodel.name} price, images, and specifications in the UAE from verified dealers. Read in-depth reviews, compare models, and buy your new car on Carprices.ae`,
                images: [ogImage],
            },
        };
    } catch (error) {
        if (error.response?.status === 404) {
            return notFound(); // Call notFound() for 404 errors
        }
if (process.env.NODE_ENV === 'development') { console.error("Error fetching model data:", error); }
        throw error; // Re-throw other errors for handling elsewhere
    }
}

export default async function ModelPage({ params }) {
    const { year, brandname, model } = params;
    const yearInt = parseInt(year, 10);

    // Fetch current and old model data
    const oldModelsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}car-models/find-model/${model}`,
        { next: { revalidate: 60 } }
    );

    const currentmodelResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${brandname}/${model}/${yearInt}`,
        { next: { revalidate: 60 } }
    );

    if (!currentmodelResponse.ok) {
        if (currentmodelResponse.status === 404) {
            // Try redirect for old slugs
            const redirectResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}model/old-slug/${model}`
            );
            if (redirectResponse.ok) {
                const redirectData = await redirectResponse.json();
                const newModelSlug = redirectData.model.slug;
                redirect(`/brands/${brandname}/${year}/${newModelSlug}`);
            }
            notFound();
        }
        throw new Error(`Failed to fetch model data: ${currentmodelResponse.status}`);
    }

    if (!oldModelsResponse.ok) {
        if (oldModelsResponse.status === 404) {
            notFound();
        }
        throw new Error(`Failed to fetch old model data: ${oldModelsResponse.status}`);
    }

    const currentmodelData = await currentmodelResponse.json();
    const oldModelsData = await oldModelsResponse.json();

    const currentmodel = currentmodelData.data.model;
    const seoData = currentmodelData.data.seo;
    const oldModel = oldModelsData.data;

    // If no trims, return 404
    if (!currentmodel || currentmodel.trims.length === 0) {
        notFound();
    }

    return (
        <div className='mt-6'>
            <ModelWrapper
                oldModel={oldModel}
                currentmodel={currentmodel}
                seoData={seoData}
            />
        </div>
    );
}
