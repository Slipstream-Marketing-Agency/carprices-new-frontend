import InsuranceCalculatorWrapper from "@/components/insurance-calculator/InsuranceCalculatorWrapper";
import { fetchMetaData } from "@/lib/fetchMetaData";

export async function generateMetadata() {
    const slug = "insurance-calculator";
    const metaData = await fetchMetaData(slug);

    return {
        title: metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
        description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        alternates: {
            canonical: metaData?.canonicalURL || `/insurance-calculator`,
        },
        keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        twitter: {
            card: "summary_large_image",
            title: metaData?.title || "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
            description: metaData?.description || "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        },
    };
}

const CarInsuranceCalculator = () => {
    return <InsuranceCalculatorWrapper />
};

export default CarInsuranceCalculator;
