import React from "react";
import BrandListWrapper from "@/components/brand-component/BrandListWrapper";
import { fetchMetaData } from "@/lib/fetchMetaData";

export async function generateMetadata() {
  const slug = "search-cars";
  const metaData = await fetchMetaData(slug);

  return {
    title: metaData?.title || "Explore the Top Car Brands in the UAE - Carprices",
    description: metaData?.description || "Stay informed on the best car brands available in the UAE market with comprehensive reviews and insights from Carprices. Find the top brands and make an informed decision.",
    charset: "UTF-8",
    alternates: {
      canonical: `https://carprices.ae/brands`,
    },
    keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
    robots: {
      index: true,
      follow: true,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: metaData?.title || "Explore the Top Car Brands in the UAE - Carprices",
      description: metaData?.description || "Stay informed on the best car brands available in the UAE market with comprehensive reviews and insights from Carprices. Find the top brands and make an informed decision.",
      url: "https://carprices.ae/brands",
    },
    author: "Carprices.ae Team",
    icon: "./favicon.ico",
  };
}

async function fetchBrands(page, pageSize) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}car-brands/names?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error("Failed to fetch brand data");

    const { brands, pagination } = await response.json();
    return { brands, pagination };
  } catch (error) {
    console.error("Data Fetching Error:", error.message);
    throw error;
  }
}

export default async function BrandCategoryPage({ searchParams }) {
  const page = parseInt(searchParams.page, 10) || 1; // Get the current page from the query, defaulting to 1
  const pageSize = 24; // Set the number of items per page

  const { brands, pagination } = await fetchBrands(page, pageSize);

  return (
    <BrandListWrapper brandsData={brands} pagination={pagination} />
  );
}
