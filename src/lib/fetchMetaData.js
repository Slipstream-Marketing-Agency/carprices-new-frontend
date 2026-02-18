export const fetchMetaData = async (slug) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}pages?filters[slug][$eq]=${slug}&populate[seo][fields][0]=metaTitle&populate[seo][fields][1]=metaDescription&populate[seo][fields][2]=keyword&populate[seo][fields][3]=metaRobots&populate[seo][fields][4]=canonicalURL`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        if (!response.ok) return null;
        const data = await response.json();
        const metaData = data?.data?.[0]?.attributes?.seo;
        return {
            title: metaData?.metaTitle || "",
            description: metaData?.metaDescription || "",
            keywords: metaData?.keyword || "",
            robots: metaData?.metaRobots || "",
            canonical: metaData?.canonicalURL || "",
        };
    } catch (error) {
        if (process.env.NODE_ENV === 'development') { console.error("Error fetching meta data", error); }
        return null;
    }
};