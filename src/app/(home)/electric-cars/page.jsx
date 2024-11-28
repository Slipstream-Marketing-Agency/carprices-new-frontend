import RelatedArticles from '@/components/articles-component/RelatedArticles';
import BannerCarousel from '@/components/electric-cars/BannerCarousel';
import BrandSection from '@/components/electric-cars/BrandSection';
import ElectricCarFaqs from '@/components/electric-cars/ElectricCarFaqs';
import EvReviews from '@/components/electric-cars/EvReviews';
import FilterModal from '@/components/electric-cars/FilterModal';
import PopularSection from '@/components/electric-cars/PopularSection';
import SelectedCompareCarsSection from '@/components/home/SelectedCompareCarsSection';
import Image from 'next/image';
import React from 'react';

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
            <div className='mt-4'>
                <PopularSection />
            </div>
            <div className='container'>
                <BrandSection />
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
