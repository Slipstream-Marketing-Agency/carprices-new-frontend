import Ad300x600 from '@/components/ads/Ad300x600';
import ChooseBodyType from '@/components/home/ChooseBodyType'
import { fetchMetaData } from '@/lib/fetchMetaData';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'


export async function generateMetadata() {
  const slug = "category";
  const metaData = await fetchMetaData(slug);

  return {
    title: metaData?.title || "Explore Car Body Types: Sedans, SUVs, Coupes, and More",
    description: metaData?.description || "Discover the different car body types, including sedans, SUVs, hatchbacks, and coupes. Learn about their features, advantages, and what makes each style unique. Find the perfect car that suits your lifestyle and needs!",
    charset: "UTF-8",
    alternates: {
      canonical: `https://carprices.ae/body-types`,
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
      url: "https://carprices.ae/body-types",
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
  } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Failed to fetch data:', error); }
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
    <div className="container grid grid-cols-12 md:mt-10 my-4 px-5">
      <div className='md:col-span-9 col-span-12 '>
        <div className="flex justify-between items-start gap-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <h5 className="md:text-sm  text-xs  tracking-wider leading-5 text-blue-600 uppercase font-bold">
              Choose by body type
            </h5>
            <h2 className="md:text-xl text-md font-semibold capitalize">
              Explore new cars based on body type
            </h2>
          </div>
          {/* <button className="px-6 py-3 mt-4 text-base tracking-tight leading-4 text-center rounded-[119px] text-neutral-900">
                View More
              </button> */}
        </div>
        <div className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-8 md:mt-10 mt-5 max-w-full">
          {bodyTypes.map((item, index) => (
            <Link href={`/body-types/${item?.slug}`} key={item?.slug || item.slug || index}>
              <div className="flex flex-col justify-center items-center text-center text-black">
                <div className="w-full md:h-32 sm:h-24 overflow-hidden">
                  <Image
                    loading="lazy"
                    src={item?.image}
                    width={300}
                    height={200}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 100vw"
                    alt={`category-${item?.name}`}
                    className="object-contain w-full h-full transition-all duration-300 md:py-3 md:px-3 py-1 px-1"
                  />
                </div>
                <div className=" font-semibold text-xs md:text-base">
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='md:col-span-3 col-span-12'>
        <div className='my-6 sticky top-0  md:block hidden'>
          <Suspense fallback={<div>Loading ad...</div>}>
            <Ad300x600 dataAdSlot="3792539533" />
          </Suspense>
        </div>
      </div>

    </div>
  )
}
