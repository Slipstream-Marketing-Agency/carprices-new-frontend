import ModelWrapper from "@/components/model-component/ModelWrapper";
import axios from "axios";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }) {
    const { year, brandname, model } = params;
    const yearInt = parseInt(year, 10);

    try {
        const currentmodelResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${brandname}/${model}/${yearInt}`
        );

        const currentmodel = currentmodelResponse.data.data.model;
        const seoData = currentmodelResponse.data.data.seo;

        const pageTitle = `${year} ${currentmodel.brand?.name} ${currentmodel.name} Reviews | Real Customer Feedback - Carprices.ae`;
        const pageDescription = `Read real user reviews of the ${year} ${currentmodel.brand?.name} ${currentmodel.name}. Discover customer experiences, opinions on performance, and insights to help you choose your next car on Carprices.ae.`;

        return {
            title: pageTitle,
            description: pageDescription,
            alternates: {
                ...(seoData?.canonicalURL && { canonical: seoData.canonicalURL }),
            },
            robots: {
                index: true,
                follow: true,
            },
            authors: [{ name: "Carprices.ae Team" }],
            openGraph: {
                title: pageTitle,
                description: pageDescription,
                url: `/brands/${brandname}/${year}/${model}/user-reviews`,
            },
            twitter: {
                card: "summary_large_image",
                title: pageTitle,
                description: pageDescription,
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

export default async function ReviewPage({ params }) {
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
            const redirectResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}model/old-slug/${model}`
            );
            if (redirectResponse.ok) {
                const redirectData = await redirectResponse.json();
                redirect(`/brands/${brandname}/${year}/${redirectData.model.slug}`);
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

    if (!currentmodel || currentmodel.trims.length === 0) {
        notFound();
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
