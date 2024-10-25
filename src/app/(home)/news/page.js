
import ArticleWrapper from "@/components/articles-component/ArticleWrapper";
import { fetchMetaData } from "@/lib/fetchMetaData";
import React, { Suspense } from "react";

// Metadata generation
export async function generateMetadata() {
    const slug = "home";
    const metaData = await fetchMetaData(slug);
    
    return {
      title: metaData?.title || "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
      description: metaData?.description || "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
      charset: "UTF-8",
      alternates: {
        canonical: `https://carprices.ae/news`,
      },
      keywords: metaData?.keywords || "",
      robots: {
        index: true,
        follow: true,
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: metaData?.title || "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
        description: metaData?.description || "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
        url: "https://carprices.ae/news",
      },
      author: "Carprices.ae Team",
      icon: "./favicon.ico",
    };
  }
  
export default function BlogPage({ params }) {
    return (
        <Suspense fallback={<div>Loading filters...</div>}> <ArticleWrapper /></Suspense>
    );
}
