"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import Ad300x600 from "@/components/ads/Ad300x600";
import ShareButton from "@/components/common/ShareButton";
import SeoLinksFilter from "@/components/common/SeoLinksFilter";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Email as EmailIcon, Instagram as InstagramIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon } from "@mui/icons-material";
import RelatedArticles from "./RelatedArticles";
import LastTwoWeeksArticles from "./LastTwoWeeksArticles";
import PopularCategories from "../popular-sections/PopularCategories";
import FeaturedSlider from "./FeaturedSlider";
import Relations from "./Relations";
import ArticleComment from "./ArticleComment";
import InArticleAd from "../ads/inArticleAd";

export default function ArticleDetailWrapper({ data, type, slug, featuredArticlesData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    const { detailData, relatedArticles } = data;
    const { title, author, content, publishedAt, summary, coverImage, articleTags, articleCategories, articleTypes } = detailData;
    const currentURL = typeof window !== "undefined" ? window.location.href : "";

    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile view for responsive handling
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to extract YouTube video ID
    const extractYouTubeVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
        return match ? match[1] : null;
    };

    // Extract and memoize meta description
    // const metaDescription = useMemo(() => {
    //     if (!content) return "";
    //     const parser = new DOMParser();
    //     const parsedHtml = parser.parseFromString(content, "text/html");
    //     const text = parsedHtml.documentElement.textContent || "";
    //     return text.length > 160 ? `${text.substring(0, 160)}...` : text;
    // }, [content]);

    // Render article content with YouTube embed handling
    const renderContent = useMemo(() => {
        if (!content) return null;
    
        // Replace empty <p> tags with <br> and split the content into paragraphs
        const paragraphs = content.replace(/<p>(&nbsp;|\s*)<\/p>/g, "<br />").split("<br>");
    
        return paragraphs.flatMap((paragraph, index) => {
            const videoId = extractYouTubeVideoId(paragraph);
    
            // Ad configuration: Show ads after every 3 paragraphs
            const adIndex = 3;
            const isAdSlot = (index + 1) % adIndex === 0;
    
            // Render content with an ad slot conditionally
            return [
                videoId ? (
                    <iframe
                        key={`video-${index}`}
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div
                        key={`content-${index}`}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                ),
                isAdSlot && (
                    <div key={`ad-${index}`} className="ad-container my-4">
                        <InArticleAd dataAdSlot={'6707256067'} />
                    </div>
                ),
            ].filter(Boolean); // Remove `false` values from the array
        });
    }, [content]);
    

    return (
        <div>
            <section className="container">
                <div className="sm:grid gap-10 grid-cols-12 my-6">
                    <div className="sm:col-span-9 space-y-6">
                        <div className="shadow-md rounded-xl p-3">
                            <ArticleHeader
                                title={title}
                                author={author}
                                publishedAt={publishedAt}
                                summary={summary}
                                content={content}
                                currentURL={currentURL}
                                articleTypes={articleTypes}
                            />
                            <Image
                                src={coverImage?.url || "/assets/img/car-placeholder.png"}
                                alt="Cover Image"
                                width={1000}
                                height={563}
                                className="object-contain w-full"
                                quality={100}
                                loading="lazy"
                            />
                            <div className="mt-4 article-content">{renderContent}</div>

                        </div>

                        <div className="mt-6 shadow-md p-4 rounded-lg">
                            <div className="flex items-center space-x-3 mb-4">
                                <Image
                                    src={author.avatar.url}
                                    width={80}
                                    height={80}
                                    alt="author-martin"
                                    className="object-cover rounded-full"
                                />
                                <div>
                                    <h6 className="text-blue-600 font-semibold text-xs uppercase">Published by</h6>
                                    <h5 className="text-lg sm:text-xl font-bold">{author?.name || "Unknown Author"}</h5>
                                </div>
                            </div>
                            <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`} dangerouslySetInnerHTML={{ __html: author?.author_description }}></p>
                            <div className=' flex justify-start'>
                                <button
                                    onClick={toggleReadMore}
                                    className="text-xs font-semibold text-blue-500 mt-0 hover:underline focus:outline-none rounded-xl"
                                >
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <Link href={`mailto:${author?.email}`} className="text-blue-600"><EmailIcon /></Link>
                                <Link href={`${author?.Instagram}`} className="text-pink-500" target="_blank" rel="noreferrer"><InstagramIcon /></Link>
                                <Link href={`${author?.twitter}`} className="text-blue-400" target="_blank" rel="noreferrer"><TwitterIcon /></Link>
                                <Link href={`${author?.linkedin}`} className="text-blue-700" target="_blank" rel="noreferrer"><LinkedInIcon /></Link>
                            </div>
                        </div>
                        <ArticleComment slug={slug} />

                        <div>
                            <RelatedArticles type='article' slug={slug} />
                        </div>
                        <PopularCategories />

                    </div>
                    <div className="sm:col-span-3 space-y-6">
                        <FeaturedSlider featuredArticles={featuredArticlesData} type={type} />
                        <TagsList tags={articleTags} />
                        <CategoryList categories={articleCategories} />
                        <Relations slug={slug} />

                        <LastTwoWeeksArticles />
                        <div className='my-6 sticky top-0  md:block hidden'>
                            <Suspense fallback={<div>Loading ad...</div>}>
                                <Ad300x600 dataAdSlot="3687406715" />
                            </Suspense>
                        </div>

                    </div>
                </div>
                <SeoLinksFilter />
            </section>
        </div>
    );
}

// Reusable components for better readability and modularity
const ArticleHeader = ({ title, author, publishedAt, summary, content, currentURL, articleTypes }) => (
    <div className="mb-6">
        {articleTypes.map((type, index) =>
            <span key={index} className="bg-blue-600 text-white px-4 py-1 mb-4 rounded-full text-sm mr-2">{type.type}</span>
        )}

        <h1 className="capitalize font-bold text-2xl sm:text-3xl mt-3">{title}</h1>
        <div className="flex justify-between items-center my-1 sm:my-2 text-xs sm:text-sm">
            <span className="text-gray-400 space-x-3">
                <span>{author?.name || "Unknown Author"}</span>
                <span>|</span>
                <span>{moment(publishedAt).format("MMMM Do YYYY")}</span>
                <span>|</span>
                <span>Read Time: {Math.ceil((content?.split(/\s+/).filter(word => word).length || 0) / 200)} mins</span>
            </span>
            <ShareButton url={currentURL} title="Check out this article on CarPrices.ae" />
        </div>
        {summary && <p className="font-semibold my-1">{summary}</p>}
    </div>
);

const TagsList = ({ tags }) => (
    tags[0] !== null && (
        <div className="mt-6 shadow-md p-4 rounded-lg">
            <h3 className="md:text-lg font-semibold">Related Tags</h3>
            <div className="flex flex-wrap gap-2 mt-4">
                {tags?.map(tag => (
                    <Link key={tag?.id} href={`/news/tag/${tag?.slug}`}>
                        <div className="bg-blue-100 text-blue-600 px-1 py-1 rounded-full text-[10px] font-medium hover:bg-blue-200 hover:text-blue-700 transition-colors">
                            #{tag?.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
);

const CategoryList = ({ categories }) => (
    categories[0] !== null && (
        <div className="mt-6 shadow-md p-4 rounded-lg">
            <h3 className="md:text-lg font-semibold">Related Categories</h3>
            <div className="flex flex-wrap gap-2 mt-4">
                {categories.map(category => (
                    <Link key={category.id} href={`/news/body-types/${category.slug}`}>
                        <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-medium hover:bg-blue-200 hover:text-blue-700 transition-colors">
                            {category.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
);


