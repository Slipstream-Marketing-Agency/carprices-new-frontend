import AdvancedFilterWrapper from '@/components/advanced-filter/AdvancedFilterWrapper'
import { slugToCapitalCase } from '@/utils/slugToCapitalCase'
import React from 'react'

export async function generateMetadata({ params }) {
  const { brandname, year } = params;
  const capitalBrandName = slugToCapitalCase(brandname);

  const title = `${capitalBrandName} ${year} Models & Prices in UAE - CarPrices.ae`;
  const description = `Explore ${capitalBrandName} ${year} car models, prices, specifications, and reviews in the UAE. Find the best deals on ${capitalBrandName} ${year} vehicles at CarPrices.ae.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/brands/${brandname}/${year}`,
    },
    keywords: `${capitalBrandName} ${year} cars UAE, ${capitalBrandName} ${year} prices, ${capitalBrandName} ${year} models, CarPrices.ae`,
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "CarPrices.ae Team" }],
    openGraph: {
      title,
      description,
      url: `/brands/${brandname}/${year}`,
      siteName: "CarPrices.ae",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function page({params}) {
  return (
    <AdvancedFilterWrapper />
  )
}
