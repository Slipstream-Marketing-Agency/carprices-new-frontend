"use client"

import React, { Suspense } from 'react'
import Ad300x600 from "@/components/ads/Ad300x600";
import ShareButton from "@/components/common/ShareButton";
import SeoLinksFilter from "@/components/common/SeoLinksFilter";
import BlogRecent from "@/components/articles-component/BlogRecent";
import EmailIcon from '@mui/icons-material/Email';
import InstagramIconMui from '@mui/icons-material/Instagram';
import TwitterIconMui from '@mui/icons-material/Twitter';
import LinkedInIconMui from '@mui/icons-material/LinkedIn';

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function ArticleDetailWrapper({ data }) {

    if (!data) {
        // Handle 404 or error state
        return <div>404 - Article Not Found</div>;
    }

    const {
        detailData,
        recentBlog,
        articlesThisWeek,
        article = detailData, // Defaulting article to detailData
    } = data;

    const [activeTab, setActiveTab] = useState("tab1");
    const currentURL = typeof window !== "undefined" ? window.location.href : "";
    const [isMobile, setIsMobile] = useState(false);
    const [metaDescription, setMetaDescription] = useState("");
    const paragraphContent = article?.content;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const styleTag = document.createElement("style");
        styleTag.innerHTML =
            "@media (min-width: 768px) { p img { height: 421px !important; } }";
        document.head.appendChild(styleTag);
    }, []);

    useEffect(() => {
        if (paragraphContent) {
            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(paragraphContent, "text/html");
            const text = parsedHtml.documentElement.textContent;
            setMetaDescription(text.substring(0, 160));
        }
    }, [paragraphContent]);

    const truncatedMetaDescription =
        metaDescription.length > 160
            ? metaDescription.substring(0, 160) + "..."
            : metaDescription;

    const renderContent = () => {
        let content = article?.content;
        if (!content) return null;

        content = content.replace(/<p>(&nbsp;|\s*)<\/p>/g, "<br />");

        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        const paragraphs = content.split("<br>");

        const renderedContent = [];

        paragraphs.forEach((paragraph, index) => {
            if (youtubeRegex.test(paragraph)) {
                const videoId = extractYouTubeVideoId(paragraph);
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                renderedContent.push(
                    <div key={index}>
                        <iframe
                            width="100%"
                            height="315"
                            src={embedUrl}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            } else {
                renderedContent.push(
                    <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} className='articleContent'></div>
                );
            }

            // Display ad after every few paragraphs
            if ([1, 4, 7, 10, 13, 15, 18].includes(index)) {
                renderedContent.push(<AdBlog dataAdSlot="4742766924" key={`ad-${index}`} />);
            }
        });

        return renderedContent;
    };

    function extractYouTubeVideoId(url) {
        const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(.+)$/;
        const match = url.match(youtubeRegex);

        if (match) {
            const videoId = match[4];
            return videoId;
        }
        return null;
    }

    const settings = useMemo(() => ({
        speed: 1500,
        spaceBetween: 24,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".next-51",
            prevEl: ".prev-51",
        },
    }), []);
    return (
        <div>
            <section className="container">
                <div className="sm:grid gap-10 grid-cols-12 my-6">
                    <div className="sm:col-span-9 space-y-6">
                        <div className="mb-20">
                            <div className="capitalize font-bold text-2xl sm:text-5xl">
                                {article?.title}
                            </div>
                            <div className="flex justify-between items-center my-2 sm:my-4 text-xs sm:text-sm">
                                <span className="text-gray-400 space-x-3">
                                    <span>{article?.author}</span>
                                    <span>|</span>
                                    <span>{moment(article?.publishedAt).format("MMMM Do YYYY")}</span>
                                    <span>|</span>
                                    <span>Read Time: {Math.ceil(article?.content?.length / 200)} mins</span>
                                </span>
                                <div className="sm:mr-6">
                                    <ShareButton url={currentURL} title={`Check out this article on CarPrices.ae`} />
                                </div>
                            </div>
                            <div className="my-4 sm:my-4">
                                {article?.summary && (
                                    <p className="font-semibold my-4">{article?.summary}</p>
                                )}
                                <div className="flex gap-4">
                                    <Image
                                        src={
                                            article?.coverImage?.data?.attributes?.url ||
                                            "/assets/img/car-placeholder.png"
                                        }
                                        alt="Cover Image"
                                        width={300}
                                        height={205}
                                        className="object-contain w-full"
                                        layout="responsive"
                                        quality={100}
                                        loading="lazy"
                                    />
                                </div>
                                <p className="mt-4 article-content">{renderContent()}</p>
                            </div>
                        </div>

                        <div className="my-6">
                            <h6 className="text-blue-600 font-semibold text-xs uppercase leading-5 tracking-wider">
                                Trending automotive news
                            </h6>
                            <div className="flex items-center justify-between font-semibold mt-1">
                                <h2 className="capitalize text-lg sm:text-xl">
                                    Latest Automotive News
                                </h2>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                            {recentBlog.map((blog, index) => (
                                <Link key={blog.id} href={`/news/${blog?.attributes?.slug}`}>
                                    <div
                                        key={index}
                                        className="relative col-span-12 sm:col-span-6 lg:col-span-4 rounded-[14px] shadow-lg"
                                    >
                                        <Image
                                            src={
                                                blog?.attributes?.coverImage?.data?.attributes?.url ||
                                                "/assets/img/placeholder.jpg"
                                            }
                                            alt="Blog image"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            layout="fixed"
                                            className="w-full h-[150px] lg:h-[200px] object-cover rounded-t-[14px]"
                                        />
                                        <div className="p-2">
                                            <div className="sm:text-base text-sm truncate font-semibold">
                                                {blog?.attributes?.title}
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <div className="text-xs text-gray-700">
                                                        {moment(blog?.attributes?.createdAt).format("MMMM Do YYYY")}
                                                    </div>
                                                    <div className="line-clamp-2 text-xs text-gray-500">
                                                        {blog?.attributes?.summary}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>

                    <div className="sm:col-span-3 space-y-6">
                        <div className="my-6 border border-gray-300 p-4 rounded-[15px]">
                            <div className="flex place-items-center space-x-3 mb-4">
                                <Image
                                    src={"https://cdn.carprices.ae/assets/Martin_Alva_7e01cef081.jpg"}
                                    width={80}
                                    height={80}
                                    alt="author-martin"
                                    className="object-cover rounded-full"
                                />
                                <div>
                                    <h6 className="text-blue-600 font-semibold text-xs uppercase">
                                        Author
                                    </h6>
                                    <h1 className="text-lg sm:text-xl font-bold">
                                        Martin V Alva
                                    </h1>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="text-sm">
                                    I began my writing career in 2007 with Overdrive, India’s largest automotive magazine, where I worked as a photojournalist covering motorsports events and conducting car and motorcycle reviews. My expertise in content creation later led me to corporate roles as a marketing specialist for renowned brands such as Royal Enfield, General Motors, Toyota, Mercedes-Benz, Lexus, and Jeep. Driven by my passion for both writing and the automotive industry, I have also contributed to prominent local and regional publications, including Silodrome, Top Gear, Drive Arabia, Auto Middle East, Motorcycle UAE, Bike Nation, Gulf News, and more.
                                </div>

                                {/* Social Links */}
                                <div className="flex space-x-2">
                                    <a
                                        href="mailto:martin@slipstream.agency"
                                        className="flex items-center text-blue-600 font-semibold border border-blue-600 rounded-full py-1 px-2 text-sm transition-all hover:bg-blue-600 hover:text-white"
                                    >
                                        <EmailIcon className=" h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://instagram.com/motorbikeman"
                                        target="_blank"
                                        className="flex items-center text-pink-500 font-semibold border border-pink-500 rounded-full py-1 px-2 text-sm transition-all hover:bg-pink-500 hover:text-white"
                                    >
                                        <InstagramIconMui className=" h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://twitter.com/motorbikeman"
                                        target="_blank"
                                        className="flex items-center text-blue-400 font-semibold border border-blue-400 rounded-full py-1 px-2 text-sm transition-all hover:bg-blue-400 hover:text-white"
                                    >
                                        <TwitterIconMui className=" h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/martin-victor-alva"
                                        target="_blank"
                                        className="flex items-center text-blue-400 font-semibold border border-blue-400 rounded-full py-1 px-2 text-sm transition-all hover:bg-blue-400 hover:text-white"
                                    >
                                        <LinkedInIconMui className=" h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {articlesThisWeek?.length > 0 && (
                            <div>
                                <h4 className="font-bold">From This Week</h4>
                                <hr className="my-2" />
                                {articlesThisWeek.map((blog, index) => (
                                    <Link key={blog.slug} href={`/news/${blog.slug}`}>
                                        <div className="flex my-2">
                                            <Image
                                                src={blog?.coverImage}
                                                alt=""
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                            <p className="text-sm mx-2 text-gray-600 line-clamp-2">
                                                {blog?.title}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="3792539533" />
                        </Suspense>
                        <div>
                            <h4 className="font-bold">Latest News</h4>
                            <hr className="my-2" />
                            <BlogRecent blogs={recentBlog} disableHeading={true} />
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <SeoLinksFilter />
                </div>
            </section>
        </div>
    )
}
