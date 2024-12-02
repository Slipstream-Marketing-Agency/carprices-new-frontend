import RelatedArticles from '@/components/articles-component/RelatedArticles';
import BannerCarousel from '@/components/electric-cars/BannerCarousel';
import BrandSection from '@/components/electric-cars/BrandSection';
import CustomCarSlider from '@/components/electric-cars/CustomCarSlider';
import ElectricCarFaqs from '@/components/electric-cars/ElectricCarFaqs';
import EvReviews from '@/components/electric-cars/EvReviews';
import FilterModal from '@/components/electric-cars/FilterModal';
import PopularSection from '@/components/electric-cars/PopularSection';
import SelectedCompareCarsSection from '@/components/home/SelectedCompareCarsSection';
import { fetchMetaData } from '@/lib/fetchMetaData';
import Image from 'next/image';
import React from 'react';

export async function generateMetadata() {
    const slug = "electric-cars";
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

const ElectricCar = () => {

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-10">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    {/* Left Section */}
                    <div className="max-w-lg">
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500 text-lg font-semibold">🚗 Sustainable Mobility</span>
                        </div>
                        <h1 className="text-4xl font-bold text-blue-900 mt-4">
                            Discover the Future of Electric Vehicles in the UAE
                        </h1>
                        <p className="text-gray-700 mt-4">
                            Explore how electric vehicles are reshaping the transportation landscape in the UAE, offering advanced
                            technology, luxury, and eco-friendly solutions.
                        </p>
                        {/* Filter Buttons */}
                        <FilterModal />
                        {/* Link */}
                        <a
                            href="#"
                            className="text-blue-500 mt-4 inline-block font-semibold hover:underline"
                        >
                            Explore Electric Vehicles &gt;
                        </a>
                    </div>

                    {/* Right Section */}
                    <BannerCarousel />
                </div>
            </div>
            <div className='mt-4 container'>
                {/* <PopularSection /> */}
                <CustomCarSlider selectedTab={'electric'} heading="Popular Electric Cars" />
                <CustomCarSlider selectedTab={'electric'} heading="Upcoming Electric Cars" />
                <BrandSection />
                <CustomCarSlider selectedTab={'electric'} heading="Hybrid Cars" />
                <CustomCarSlider selectedTab={'electric'} heading="Plug-In Hybrid Cars" />
                <SelectedCompareCarsSection />
                <div className="mt-4">
                    <EvReviews />
                </div>
                <div>
                    <RelatedArticles type='article' slug={'dubai-fastest-public-ev-charger'} />
                </div>
                <div className="mt-4">
                    <ElectricCarFaqs />
                </div>
            </div>
        </div>
    );
};

export default ElectricCar;
