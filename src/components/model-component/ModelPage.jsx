"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ModelWrapper from "@/components/model-component/ModelWrapper";
import axios from "axios";

export default function ModelPage() {
    const { year, brandname, model } = useParams();
    const router = useRouter();

    const [currentmodel, setCurrentModel] = useState(null);
    const [seoData, setSeoData] = useState(null);
    const [oldModel, setOldModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!year || !brandname || !model) {if (process.env.NODE_ENV === 'development') { console.warn("Missing required parameters"); }
            router.push("/404");
            return;
        }

        const fetchData = async () => {
            try {
                const yearInt = parseInt(year, 10);

                // Fetch data concurrently
                const [oldModelsResponse, currentmodelResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-models/find-model/${model}`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-models/find-one-model/${brandname}/${model}/${yearInt}`)
                ]);

                // Extract data
                const fetchedCurrentModel = currentmodelResponse.data.data.model;
                const fetchedSeoData = currentmodelResponse.data.data.seo;
                const fetchedOldModel = oldModelsResponse.data.data;

                // If no trims, navigate to a 404 page
                if (!fetchedCurrentModel || fetchedCurrentModel.trims.length === 0) {
                    router.push("/404");
                    return;
                }

                setCurrentModel(fetchedCurrentModel);
                setSeoData(fetchedSeoData);
                setOldModel(fetchedOldModel);
                setLoading(false);
            } catch (err) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching model data:", err); }
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [year, brandname, model, router]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading model data. Please try again later.</div>;

    return (
        <div className="mt-6">
            <ModelWrapper
                oldModel={oldModel}
                currentmodel={currentmodel}
                seoData={seoData}
            />
        </div>
    );
}
