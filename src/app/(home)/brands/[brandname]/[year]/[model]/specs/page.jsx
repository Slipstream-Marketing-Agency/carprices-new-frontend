import ModelWrapper from "@/components/model-component/ModelWrapper";
import axios from "axios";

export default async function SpecsPage({ params }) {
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
            `${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${model}/${yearInt}`
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
                parentPage="specs"
                activeTab="#specs"
            />
        </div>
    );
}
