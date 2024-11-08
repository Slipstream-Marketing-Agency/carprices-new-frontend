'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { fetchArticles } from '@/lib/api';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import moment from "moment";

const CarouselCards = ({ tabs }) => {
    console.log(tabs)

    const [activeTab, setActiveTab] = useState('')

    const page = 1;
    const pageSize = 10;
    const [articles, setArticles] = useState([]);
    const pathname = usePathname();
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const fetchArticlesData = async () => {
            setPageLoading(true)
            try {
                const articlesRes = await fetchArticles(pathname, page, pageSize)
                setArticles((prevArticles) => {
                    const newArticles = articlesRes.data.filter(
                        (newArticle) => !prevArticles.some((prevArticle) => prevArticle.id === newArticle.id)
                    );
                    return [...prevArticles, ...newArticles];
                });
                setPageLoading(false)
            } catch (error) {
                console.log(error)
                setPageLoading(false)
            }
        }

        fetchArticlesData()
    }, [page, pathname])

    const Arrow = ({ onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            {direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: Math.min(articles.length, 4),
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(articles.length, 2),
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: Math.min(articles.length, 1),
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="container mb-10">
            <div className="flex flex-col self-start max-md:max-w-full">
                <h5 className="md:text-sm text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                    Most popular new cars in the UAE
                </h5>
                <h2 className="md:text-lg text-md font-semibold capitalize">
                    Here are some of the most popular new cars users look for in the UAE
                </h2>
            </div>

            <div className="flex md:gap-5 gap-2 md:justify-between mt-3 w-full text-base leading-4 text-center text-neutral-900 max-md:flex-wrap max-md:max-w-full">
                <div className="flex md:gap-5 gap-2 md:justify-between sm:px-5 overflow-x-scroll custom-scrollbar cursor-grab">
                    <button
                        className={`whitespace-nowrap font-semibold justify-center md:text-sm text-xs md:px-8 px-6 md:py-2 py-3 border border-solid rounded-[73px] max-md:px-5 cursor-pointer ${activeTab === '' ? 'bg-neutral-900 text-white' : 'bg-violet-100 border-violet-100'}`}
                        onClick={() => setActiveTab('')}
                    >
                        All
                    </button>
                    {tabs.map((tab) => (
                        <button
                            key={tab.slug}
                            className={`whitespace-nowrap font-semibold justify-center md:text-sm text-xs md:px-8 px-6 md:py-2 py-3 border border-solid rounded-[73px] max-md:px-5 cursor-pointer ${activeTab === tab.slug ? 'bg-neutral-900 text-white' : 'bg-violet-100 border-violet-100'}`}
                            onClick={() => setActiveTab(tab.slug)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {pageLoading ? (
                <div className="flex gap-4 mt-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-[190px] animate-pulse shadow rounded-lg p-5 flex flex-col justify-between"
                        >
                            <div className="h-6 bg-gray-300 rounded w-3/4 "></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 "></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="mt-3 flex items-center space-x-2">
                                <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Slider {...sliderSettings}>
                    {articles.map((article) => (
                        <div key={article.id} className="px-2 relative text-gray-700 hover:text-blue-500 rounded-[14px] shadow-md">
                            <Link
                                href={`/news/${article.slug}`}
                                key={article?.id}
                                className="relative text-gray-700 hover:text-blue-500 rounded-[14px] shadow-md"
                            >
                                <Image
                                    src={article.coverImage || altImage}
                                    alt={article?.title}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    layout="fixed"
                                    className="w-full md:h-[200px] h-[100px] object-cover rounded-t-[14px] "
                                />
                                <div className="p-2">
                                    <div className="sm:text-base 4xl:text-2xl text-sm truncate md:whitespace-normal font-semibold">
                                        {`${article?.title?.length > 20
                                            ? `${article?.title?.slice(0, 50)}... `
                                            : `${article?.title}`
                                            }`}
                                    </div>
                                    <div className="flex flex-col justify-between text-gray-800">
                                        <div>
                                            <div className="text-xs leading-9">
                                                <span className="hidden sm:inline">
                                                    {article?.author} &mdash;
                                                </span>{" "}
                                                {moment(article?.publishedAt).format(
                                                    "MMMM Do YYYY"
                                                )}
                                            </div>
                                        </div>{" "}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            )}

        </div>
    )
}

export default CarouselCards