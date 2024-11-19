import axios from "axios";
import ArticleDetailWrapper from "@/components/articles-component/ArticleDetailWrapper";

async function fetchData(type, slug) {
    try {
        // Fetch the single article details
        const articleResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/${type}/${slug}`);
        const detailData = articleResponse.data?.data || null;


        return {
            detailData,
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { type, filterType: slug } = params; // Destructure type and use filterType as slug

    const data = await fetchData(type, slug);
    console.log(data.detailData.metaTitle, 'mydata')

    return {
        title: data.detailData?.metaTitle || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
        description: data.detailData?.summary || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        // alternates: {
        //     canonical: `https://carprices.ae`,
        // },
        // keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: data.detailData?.metaTitle || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
            description: data.detailData?.summary || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
            url: "https://carprices.ae",
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default async function BlogDetailsPage({ params }) {
    const { type, filterType: slug } = params; // Destructure type and use filterType as slug

    const data = await fetchData(type, slug);

    const fetchFeaturedArticles = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/type/${type}`, {
                params: { category: 'featured', page: 1, pageSize: 5 },
            });
            return data;
        } catch (error) {
            console.error('Error fetching featured articles:', error);
            return null;
        }
    };
    const featuredArticlesData = await fetchFeaturedArticles();

    // Check if data is null to handle the 404 error
    if (!data || !data.detailData) {
        return <div>404 - Article Not Found</div>;
    }

    return <ArticleDetailWrapper data={data} type={type} slug={slug} featuredArticlesData={featuredArticlesData} />;
}
