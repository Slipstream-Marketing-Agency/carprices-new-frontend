// src/components/RelatedArticles.jsx
"use client";

import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import CardSliderWrapper from '../car-components/CardSliderWrapper';
import Image from 'next/image';
import Pagination from './Pagination';
import InnerNavigation from './InnerNavigation';
import ExpandableText from '../common/ExpandableText';
import Ad300x600 from '../ads/Ad300x600';

export default function BrandArticlePage({ type, slug, brandDetails, brandname }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchRelatedArticles = async () => {
            try {
                // Make the API request with the correct parameter
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/related?brand=${brandname}`);
                setArticles(response.data.articles || []);
            } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching related articles:', error); }
            }
        };

        fetchRelatedArticles();
    }, [slug, type]); // Refetch when slug or type changes

    return (

        <div className="container">
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-9">
                    <div className="grid grid-cols-12 mt-6 mb-4 shadow-md p-4 rounded-lg gap-5">
                        <div className="col-span-4 flex justify-start items-start w-full">
                            <Image
                                src={brandDetails?.cover || "/assets/img/car-placeholder.png"}
                                alt={`${brandDetails?.name}-cover-image`}
                                width={400}
                                height={250}
                                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading="lazy"
                                className="object-cover rounded-xl"
                            />
                        </div>

                        <div className="col-span-8 flex flex-col items-start">
                            <Image
                                src={brandDetails?.logo || "/assets/img/car-placeholder.png"}
                                alt={`${brandDetails?.name}-logo`}
                                width={80}
                                height={80}
                                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading="lazy"
                                className="object-contain border rounded-xl mb-3 p-2"
                            />
                            <h1 className="text-3xl font-semibold">{brandDetails?.name} Articles</h1>
                            <ExpandableText content={brandDetails?.description} />
                        </div>
                    </div>
                    <InnerNavigation brandname={brandname} />


                    {/* <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        totalResults={totalResults}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    /> */}
                    <div className="grid grid-cols-12 gap-5">
                        {articles.map((article) => (
                            <Link key={article.id} className="md:col-span-4 relative" href={`/${article?.types[0].slug}/${article.slug}`}>
                                <div className="flex flex-col justify-start bg-white rounded-lg shadow-md overflow-hidden h-full">
                                    <div className="relative">
                                        <Image
                                            src={article.coverImage || '/assets/placeholder/news-placeholder.webp'}
                                            alt={article?.title}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            layout="fixed"
                                            className="w-full md:h-[180px] h-[180px] object-cover rounded-t-[14px]"
                                        />
                                        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                                            {article?.types?.map((type, index) => (
                                                <span key={type?.slug || type.slug || index} className="text-[10px] bg-blue-400 text-white py-[1px] px-[5px] rounded-xl">
                                                    {slugToCapitalCase(type.slug)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-2 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="text-md font-semibold mb-2">{article.title}</h3>
                                            <p className="text-[12px] text-gray-700 line-clamp-3">{article.summary}</p>
                                        </div>

                                        <div className="mt-2">
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
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className='my-6 sticky top-0'>
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="1884477677" />
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
    );
}
