import InsuranceCalculatorWrapper from "@/components/insurance-calculator/InsuranceCalculatorWrapper";
import { fetchMetaData } from "@/lib/fetchMetaData";

export async function generateMetadata() {
    const slug = "insurance-calculator";
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
        description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        alternates: {
            ...(metaData?.canonicalURL && { canonical: metaData.canonicalURL }),
        },
        keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
            description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
            url: "https://carprices.ae",
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

const CarInsuranceCalculator = () => {
    return <InsuranceCalculatorWrapper />
};

export default CarInsuranceCalculator;
