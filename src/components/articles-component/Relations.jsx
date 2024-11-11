"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardSliderWrapper from '../car-components/CardSliderWrapper';
import Link from 'next/link';
import Image from 'next/image';

export default function Relations({ slug }) {
    const [videos, setVideos] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchRelations = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}relations/${slug}`);
                console.log(response, "responsesssss");

                setVideos(response?.data?.data?.select_related_videos || []);
                setBrands(response?.data?.data?.car_brands || []);
                setModels(response?.data?.data?.car_models || []);
            } catch (error) {
                console.error('Error fetching related articles:', error);
            }
        };

        fetchRelations();
    }, [slug]);
    return (
        <div>
            {brands.length > 0 && (
                <div className='shadow-md rounded-xl p-3 mb-6'>
                    <div className="flex justify-between gap-5 px-1 w-full max-md:flex-wrap">
                        <h3 className="md:text-lg font-semibold">
                            Related Brands
                        </h3>
                    </div>
                    <div className="mt-4 w-full">
                        {brands.length > 0 ? (
                            <>
                                {brands.map((brand) => (
                                    <Link key={brand.id} href={`/brands/${brand?.slug}`}>
                                        <div className='grid grid-cols-12 gap-2'>
                                            <div className="col-span-2 relative ">
                                                <Image
                                                    src={brand.brandLogo?.formats?.thumbnail?.url || '/assets/placeholder/news-placeholder.webp'}
                                                    alt={brand?.name}
                                                    width={96}
                                                    height={96}
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-8 flex items-center">
                                                <h3 className="text-xs font-semibold">{brand.name}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                }
                            </>


                        ) : (
                            <div className="text-center text-gray-500">No brands available</div>
                        )}

                    </div>
                </div>)}
            {models.length > 0 && (
                <div className='shadow-md rounded-xl p-3 mb-6'>
                    <div className="flex justify-between gap-6 px-1 w-full max-md:flex-wrap">
                        <h3 className="md:text-lg font-semibold">
                            Related Cars
                        </h3>
                    </div>
                    <div className="mt-4 w-full">
                        {models.length > 0 ? (
                            <>
                                {models.map((model) => (
                                    <Link key={model.id} href={`/brands/${model?.brandSlug}/${model?.year}/${model?.slug}`}>
                                        <div className='grid grid-cols-12 gap-2'>
                                            <div className="col-span-2 relative ">
                                                <Image
                                                    src={model?.highTrim || '/assets/placeholder/news-placeholder.webp'}
                                                    alt={model?.name}
                                                    width={96}
                                                    height={96}
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-8 flex items-center">
                                                <h3 className="text-xs font-semibold">{model.name}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                }
                            </>


                        ) : (
                            <div className="text-center text-gray-500">No cars available</div>
                        )}

                    </div>
                </div>
            )}
            {videos.length > 0 && (
                <div className="shadow-md rounded-xl p-3 mb-6">
                    <div className="flex justify-between gap-6 px-1 w-full max-md:flex-wrap">
                        <h3 className="md:text-lg font-semibold">
                            Related Videos
                        </h3>
                    </div>
                    <div className="mt-4 w-full">
                        {videos.length > 0 ? (
                            <>
                                {videos.map((video) => (
                                    <Link key={video.id} href={``}>
                                        <div className='grid grid-cols-12'>
                                            <div className="col-span-4 relative ">
                                                <Image
                                                    src={video.thumbnail?.url || '/assets/placeholder/news-placeholder.webp'}
                                                    alt={video?.title}
                                                    width={96}
                                                    height={96}
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-8">
                                                <h3 className="text-xs font-semibold">{video.title}</h3>
                                                <p className="text-xs text-gray-700 line-clamp-2">{video.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                }
                            </>


                        ) : (
                            <div className="text-center text-gray-500">No videos available</div>
                        )}

                    </div>
                </div >
            )}
        </div>
    );
}
