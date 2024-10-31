import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export async function generateMetadata() {

    return {
        title: "Write a Car Review - Share Your Experience | CarPrices.ae",
        description: "Share your car experience with CarPrices.ae! Write reviews to help others explore car models, specs, and features in UAE. Join our community of informed drivers today.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/review/write`,
        },
        keywords: "write car review, car reviews UAE, share car experience, car model review, carprices.ae reviews",
        robots: {
            index: true,
            follow: true,
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };
}

const MostPopularCarSection = dynamic(() => import('@/components/home/MostPopularCarSection'), { ssr: false });

const page = () => {
    return (
        <div className="flex flex-col items-center justify-between w-full">
            <div className="w-full h-72 lg:h-96  bg-blue-50 flex flex-col lg:flex-row items-center justify-center p-5">
                <h2 className="lg:!text-3xl lg:leading-9 flex flex-col items-center text-left font-bold text-gray-800">
                    Write a Review
                    <Link href={'/write-review/rate-car'} className='p-2 w-28 lg:w-36 text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 rounded-md max-md:px-2 md:text-[16px] text-[12px] whitespace-nowrap flex items-center justify-center'>
                        Select Vehicle
                    </Link>
                </h2>
                <div className="flex items-center justify-center">
                    <Image
                        width={0}
                        height={0}
                        sizes="100vw" src="/assets/images/review.svg" alt="Review Illustration" className="w-52 h-5w-52 lg:h-72 lg:w-72" />
                </div>
            </div>
            <MostPopularCarSection />
        </div>
    )
}

export default page