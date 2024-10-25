import Ad300x600 from '@/components/ads/Ad300x600';
import PressReleaseList from '@/components/press-releases/PressReleaseList';
import SubscribeForm from '@/components/press-releases/SubscribeForm';
import { fetchMetaData } from '@/lib/fetchMetaData';
import React, { Suspense } from 'react'

export async function generateMetadata({ params }) {
  const slug = "press-releases"

  // Fetch dynamic metadata for the privacy policy page
  const metaData = await fetchMetaData(slug);

  // Return the dynamic metadata
  return {
    title: metaData?.title ? metaData.title : "CarPrices.ae - Latest Automotive News and Updates",
    description: metaData?.description
      ? metaData.description
      : "Stay informed with CarPrices.ae for the latest in the automotive industry. Get updates on new car launches, industry trends, and company announcements. Your one-stop source for automotive news and insights.",
    charset: "UTF-8",
    alternates: {
      canonical: `https://carprices.ae/press-releases`,
    },
    keywords: metaData?.keywords || "automotive news UAE, latest car updates, new car launches, car industry trends, car company announcements, automotive insights, CarPrices.ae press releases",
    robots: {
      index: true,
      follow: true,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: metaData?.title ? metaData.title : "CarPrices.ae - Latest Automotive News and Updates",
      description:
        metaData?.description
          ? metaData.description
          : "Stay informed with CarPrices.ae for the latest in the automotive industry. Get updates on new car launches, industry trends, and company announcements. Your one-stop source for automotive news and insights.",
      url: "https://carprices.ae/press-releases",  // Using the same canonical URL here
    },
    author: "Carprices.ae Team",
    icon: "./favicon.ico",
  };
}

export default async function PressRelease() {
  // Fetch press releases
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}press-releases?populate=*`, { cache: 'no-store' });
  const initialPressReleases = await response.json();
  return (
    <div className="container mx-auto px-4 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-8">
            <div className="">
              <h1 className="fw-bold mt-2 box_header">
                CarPrices.ae in the media
              </h1>
              <p className="my-2">
                CarPrices.ae is getting noticed for its innovative approach in
                simplifying car buying and the while purchase experience.
              </p>
            </div>
          </div>
          <PressReleaseList pressReleases={initialPressReleases.data} />
        </div>
        <div className="lg:col-span-1">
          <div className="mt-0">
            <SubscribeForm />
          </div>
          <div className="sticky-sidebar">
            <div className="ad-container">
              <Suspense fallback={<div>Loading ad...</div>}>
                <Ad300x600 dataAdSlot="3792539533" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
