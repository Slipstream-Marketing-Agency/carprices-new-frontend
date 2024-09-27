import axios from "axios";

export const fetchMetaData = async (slug) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}pages?filters[slug][$eq]=${slug}&populate=*`);
        const metaData = response.data?.data[0]?.attributes?.seo
        return {
            title: metaData?.metaTitle || "",
            description: metaData?.metaDescription || "",
            robots: metaData?.metaRobots || "",
            canonical: metaData?.canonicalURL || ""
        }
    } catch (error) {
        console.error("Error fetching meta data", error);
        return null;
    }
};