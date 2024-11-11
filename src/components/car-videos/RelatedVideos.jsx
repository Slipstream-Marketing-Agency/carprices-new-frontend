// src/components/Relatedvideos.jsx
"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import CardSliderWrapper from '../car-components/CardSliderWrapper';
import Image from 'next/image';

export default function RelatedVideos({ type, slug }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchRelatedVideos= async () => {
            try {
                // Determine the query parameter based on type
                const paramType = type === 'brand' ? 'brands' :
                    type === 'model' ? 'models' : '';

                // Make the API request with the correct parameter
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-videos/by-brands-and-models?${paramType}=${slug}`);
                setVideos(response.data.videos || []);
            } catch (error) {
                console.error('Error fetching related videos:', error);
            }
        };

        fetchRelatedVideos();
    }, [slug, type]); // Refetch when slug or type changes

    return (
        <div className="flex flex-col md:mt-4 mt-2 shadow-md rounded-xl p-3">
            <div className="flex justify-between gap-5 px-1 w-full max-md:flex-wrap">
                <h2 className="md:text-2xl text-md font-semibold capitalize">
                    Related videos
                </h2>
            </div>
            <div className="mt-1 w-full">
                {videos.length > 0 ? (
                    <CardSliderWrapper
                        responsive={{
                            mobile: 1.5,
                            tablet: 2.5,
                            desktop: 3.5,
                        }}
                    >
                        {videos.map((article) => (
                            <Link key={article.id} href={`/video/${article?.slug}`}>
                                <div className="flex flex-col justify-start bg-white rounded-lg shadow-md overflow-hidden h-full">
                                    <div className="relative">
                                        <Image
                                            src={article.thumbnail || '/assets/placeholder/news-placeholder.webp'}
                                            alt={article?.title}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            layout="fixed"
                                            className="w-full md:h-[180px] h-[180px] object-cover rounded-t-[14px]"
                                        />
                                    </div>
                                    <div className="p-2 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="text-md font-semibold mb-2">{article.title}</h3>
                                            <p className="text-[12px] text-gray-700 line-clamp-3">{article.description}</p>
                                        </div>

                                        {/* <div className="mt-2">
                                            <div className="flex flex-col justify-between text-gray-800 mt-2">
                                                <div className='flex justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <p className="text-xs font-semibold sm:inline">
                                                            {article.author?.name || 'Unknown Author'}
                                                        </p>{" "}
                                                    </div>
                                                    <p>
                                                        <span className='text-xs font-semibold sm:inline'>Published: </span>
                                                        <span className='text-xs ml-1'>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                    </p>
                                                </div>{" "}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardSliderWrapper>
                ) : (
                    <div className="text-center text-gray-500">No videos available</div>
                )}
            </div>
        </div>
    );
}
