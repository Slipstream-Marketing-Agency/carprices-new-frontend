import ChooseBodyType from '@/components/home/ChooseBodyType'
import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react'


export async function generateMetadata() {
  const slug = "category";
  const metaData = await fetchMetaData(slug);

  return {
    title: metaData?.title || "Explore Car Body Types: Sedans, SUVs, Coupes, and More",
    description: metaData?.description || "Discover the different car body types, including sedans, SUVs, hatchbacks, and coupes. Learn about their features, advantages, and what makes each style unique. Find the perfect car that suits your lifestyle and needs!",
    charset: "UTF-8",
    alternates: {
      canonical: `https://carprices.ae/category`,
    },
    keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
    robots: {
      index: true,
      follow: true,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: metaData?.title || "Explore Car Body Types: Sedans, SUVs, Coupes, and More",
      description: metaData?.description || "Discover the different car body types, including sedans, SUVs, hatchbacks, and coupes. Learn about their features, advantages, and what makes each style unique. Find the perfect car that suits your lifestyle and needs!",
      url: "https://carprices.ae/category",
    },
    author: "Carprices.ae Team",
    icon: "./favicon.ico",
  };
}

async function fetchHomeData() {
  try {
    const [homeDataRes] = await Promise.all([

      fetch(`${process.env.NEXT_PUBLIC_API_URL}home/find`, { cache: 'force-cache' }).then(res => res.json()),
    ]);

    return {
      homeData: homeDataRes?.data,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      featuredCars: null,
      homeData: null,
      articles: null,
    };
  }
}

export default async function pages() {
  const { homeData } = await fetchHomeData();

  const bodyTypes = homeData?.bodyTypes || [];
  return (
    <ChooseBodyType bodyTypes={bodyTypes} />
  )
}
