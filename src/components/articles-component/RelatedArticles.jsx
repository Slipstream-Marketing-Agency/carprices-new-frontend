"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';
import CardSliderWrapper from '../car-components/CardSliderWrapper';
import Image from 'next/image';

export default function RelatedArticles({ type, slug }) {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const fetchRelatedArticles = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/related?slug=${slug}`);
                setArticles(response.data.articles || []);
            } catch (error) {
                console.error('Error fetching related articles:', error);
            }
        };

        fetchRelatedArticles();
    }, [slug]);
    return (
        <div className="flex flex-col md:mt-4 mt-2 ">
            <div className="flex justify-between gap-5 px-1 w-full max-md:flex-wrap">
                <h2 className="md:text-2xl text-md font-semibold capitalize">
                    Related Articles
                </h2>

            </div>
            <div className="mt-1 w-full">
                {articles.length > 0 ? (
                    <CardSliderWrapper
                        responsive={{
                            mobile: 1.5, // Show 1.5 slides on small screens
                            tablet: 2.5, // Show 2.5 slides on medium screens
                            desktop: 3.5, // Show 3.5 slides on large screens
                        }}
                    >
                        {articles.map((article) => (
                            <Link key={article.id} href={`/${article?.types[0].slug}/${article.slug}`}>
                                <div className="flex flex-col justify-start bg-white rounded-lg shadow-md overflow-hidden h-full ">
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
                                                <span key={index} className="text-[10px] bg-blue-400 text-white py-[1px] px-[5px] rounded-xl">
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

                                                    <p><span className='text-xs font-semibold sm:inline'>Published:
                                                    </span><span className='text-xs ml-1'>{new Date(article.publishedAt).toLocaleDateString()}
                                                        </span>
                                                    </p>

                                                </div>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardSliderWrapper>
                ) : (
                    <div className="text-center text-gray-500">No articles available</div>
                )}
            </div>
        </div>
    );
}
