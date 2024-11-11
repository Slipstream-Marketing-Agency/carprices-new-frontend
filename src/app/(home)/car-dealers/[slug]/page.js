// app/dealers/[slug]/page.js
import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Ad300x600 from '@/components/ads/Ad300x600';
import { Email as EmailIcon, Instagram as InstagramIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon } from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
async function fetchDealer(slug) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-dealers/slug/${slug}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        return null; // Handle 404
    }

    return await response.json();
}

export default async function DealerPage({ params }) {
    const dealer = await fetchDealer(params.slug);

    if (!dealer) {
        return <div>Dealer not found</div>;
    }

    return (
        <div className="container mt-8 p-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8 lg:col-span-9">
                    <div className="shadow-md p-6 rounded-lg bg-white">
                        {/* Display Dealer Shop Image or Placeholder */}
                        <Image
                            src={dealer.dealer_shop_image ? dealer.dealer_shop_image.url : '/assets/placeholder/dealer-placeholder.webp'}
                            alt={dealer.name}
                            width={1200}
                            height={500}
                            className="w-full object-cover h-[500px] rounded-lg"
                        />

                        {/* Dealer Details */}
                        <h1 className="text-3xl font-bold mt-6">{dealer.name}</h1>
                        <p className="text-gray-600 mt-2">{dealer.address}</p>

                        {/* Additional Dealer Information */}
                        <div className="flex mt-4 space-x-8">
                            <div>
                                <span className="block text-sm font-medium text-gray-500">Phone Number</span>
                                <span className="text-lg font-semibold">{dealer.phone_number || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500">Email</span>
                                <span className="text-lg font-semibold">{dealer.email || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500">Operating Hours</span>
                                <span className="text-lg font-semibold">{dealer.operating_hours || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex space-x-4 mt-4">
                            {dealer.email && (
                                <Link href={`mailto:${dealer.email}`} className="text-blue-600">
                                    <EmailIcon />
                                </Link>
                            )}
                            {dealer.instagram && (
                                <Link href={dealer.instagram} className="text-pink-500" target="_blank" rel="noreferrer">
                                    <InstagramIcon />
                                </Link>
                            )}
                            {dealer.twitter && (
                                <Link href={dealer.twitter} className="text-blue-400" target="_blank" rel="noreferrer">
                                    <TwitterIcon />
                                </Link>
                            )}
                            {dealer.linkedin && (
                                <Link href={dealer.linkedin} className="text-blue-700" target="_blank" rel="noreferrer">
                                    <LinkedInIcon />
                                </Link>
                            )}
                        </div>

                        {/* Related Brand Information */}
                        {dealer.select_related_brand && (
                            <div className="mt-6">
                                <h2 className="text-2xl font-bold">About {dealer.select_related_brand.name}</h2>
                                {dealer.select_related_brand.brandLogo && (
                                    <Image
                                        src={dealer.select_related_brand.brandLogo.url}
                                        alt={dealer.select_related_brand.name}
                                        width={100}
                                        height={100}
                                        className="mt-2"
                                    />
                                )}
                            </div>
                        )}

                        {/* Contact and View Cars Buttons */}
                        <div className="mt-6 flex space-x-4">
                            <Link href={`tel:${dealer.phone_number}`} className="border border-blue-400 p-2 rounded-lg w-full flex justify-center items-center gap-3 text-sm font-semibold hover:bg-blue-100">
                                <CallIcon className='text-blue-400' /> Contact Dealer
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Ad Section */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <div className="my-6 sticky top-0">
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="3792539533" />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
