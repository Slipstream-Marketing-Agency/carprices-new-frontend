"use client";
import React, { Suspense, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Ad728x90 from "@/components/ads/Ad728x90";
import SeoLinksFilter from "@/components/common/SeoLinksFilter";
import Ad300X250 from "@/components/ads/Ad300x250";
import Ad300x600 from "@/components/ads/Ad300x600";
import EastIcon from "@mui/icons-material/East";
import Pagination from "@/components/advanced-filter/Pagination";
import dynamic from "next/dynamic";
import { fetchArticles } from "@/lib/api";
import CarouselCards from "./CarouselCards";
const TrendingVideos = dynamic(() => import('@/components/home/TrendingVideos'), { ssr: false });
const SkeletonArticle = () => (
    <div className="skeleton-article">
        <div className="skeleton-image"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-author"></div>
    </div>
);


export default function ArticleWrapper() {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [articlesThisWeek, setArticlesThisWeek] = useState([]);
    const [popularArticles, setPopularArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(5);

    const router = useRouter();
    const searchParams = useSearchParams();
    // const page = searchParams.get("page") || 1;
    const [page, setPage] = useState(1)
    const pageSize = 24;

    // const [tags, setTags] = (['uae', 'reviews', 'NIO', 'bmw', 'tesla', 'mini'])
    const tags = ['uae', 'reviews', 'NIO', 'bmw', 'tesla', 'mini']

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const [articlesThisWeekRes, popularArticlesRes] =
                    await Promise.all([
                        axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL}articles/listlasttwoweeks?slug=${pathname === "/news" ? "news" : "review"}`
                        ),
                        axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL}articles/listArticlesByEngagement?pageSize=11`
                        ),
                    ]);

                // setArticles(articlesRes.data.data);
                // setTotalPage(articlesRes.data.pagination.pageCount);
                setArticlesThisWeek(articlesThisWeekRes.data.data);
                setPopularArticles(popularArticlesRes.data.data);
                setLoading(false);
                
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                
            }
        };

        fetchData();
    }, [pathname]);

    useEffect(() => {
        const fetchArticlesData = async() => {
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

    const tabsCarousel = [
        {
            name: "News",
            slug: "news",
        },
        {
            name: "Articles",
            slug: "articles",
        },
        {
            name: "Featured",
            slug: "featured",
        },
    ]

    return (
        <div className="mt-4"
        >
            <section>
                <div className="container grid sm:gap-10 grid-cols-12">
                    <div className="sm:col-span-9 col-span-12 space-y-6">
                        <CarouselCards tabs={tabsCarousel} />
                        <div className="">
                            {pathname === "/news" ? <><h1 className="sm:text-3xl capitalize font-semibold mb-3">
                                Latest Car News in UAE
                            </h1>
                                <p className="mb-8">
                                    Stay up-to-date with the latest news and updates on the UAE car
                                    industry, including new car launches, launch dates, car images,
                                    expos and events, price updates, latest discounts, facelifts,
                                    recalls, and more. Get all the insights you need to know about
                                    the happenings in the UAE automotive industry.
                                </p></> : <><h1 className="sm:text-3xl capitalize font-semibold mb-3">
                                    Latest Car Reviews in UAE{" "}
                                </h1>
                                <p className="mb-8">
                                    Stay up-to-date with the latest review and updates on the UAE
                                    car industry, including new car launches, launch dates, car
                                    images, expos and events, price updates, latest discounts,
                                    facelifts, recalls, and more. Get all the insights you need to
                                    know about the happenings in the UAE automotive industry.
                                </p></>}

                            {/* {articles.slice(0, 1).map((article, index) => (
                                <div key={`article-${article?.id}-${index}`}>
                                    {" "}
                                    <Link
                                        href={`/news/${article?.slug}`}
                                        className="flex relative flex-col justify-end p-8 pt-20 pb-9 text-slate-100 bg-cover rounded-2xl md:min-h-[500px] min-h-[200px]"
                                        style={{
                                            backgroundImage: `url('${article?.coverImage}')`,
                                        }}
                                    >
                                        <div className="hidden relative md:flex flex-col justify-center md:p-4 border-l-4 border-l-blue-400 border-solid border-t-0 border-r-0 border-b-0 bg-opacity-50 bg-black rounded-2xl">
                                            <div className="md:px-6 px-2">
                                                <h2 className="text-4xl line-clamp-2 text-white">
                                                    {article?.title}
                                                </h2>
                                                <p className="my-1 opacity-70 text-base line-clamp-2 text-white">
                                                    {article?.summary}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href={`/news/${article?.slug}`}>
                                        <div className="md:hidden relative mt-3">
                                            <div className="md:px-6 px-2">
                                                <h2 className="text-base sm:text-4xl line-clamp-2 md:leading-none leading-6">
                                                    {article?.title}
                                                </h2>
                                                <p className="my-1 text-sm sm:text-base opacity-70 line-clamp-2">
                                                    {article?.summary}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))} */}

                            <div className="grid gap-4 grid-cols-12 mt-6">
                                {/* {articles.slice(1, 10).map((article, index) => ( */}
                                {articles.map((article, index) => (
                                    <Link
                                        href={`/news/${article.slug}`}
                                        key={article?.id}
                                        className="relative text-gray-700 hover:text-blue-500 col-span-6 md:col-span-4 rounded-[14px] shadow-lg"
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
                                                <Link
                                                    legacyBehavior
                                                    href={`/news/${article?.slug}`}
                                                    key={article?.id}
                                                >
                                                    <button className="bg-transparent text-[#0d6efd] text-sm 4xl:text-sm my-4 hidden sm:flex items-center">
                                                        Know More
                                                        <EastIcon className="text-lg ml-2" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {/* {!loading && !pageLoading && (
                                <div className="mt-4">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPage}
                                        onPageChange={setPageLoading}
                                    />
                                </div>
                            )} */}
                            {!loading && <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => setPage((prevPage) => prevPage + 1)}
                                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                                    disabled={pageLoading}
                                >
                                    {pageLoading ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="animate-spin h-5 w-5 mr-2 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                ></path>
                                            </svg>
                                            Loading...
                                        </span>
                                    ) : (
                                        'Load More'
                                    )}
                                </button>
                            </div>}

                        </div>

                        {/* <Categories /> */}
                    </div>
                    <div className="md:col-span-3 col-span-12 space-y-6">
                        <div className="my-6 border border-gray-300 p-4 rounded-md ">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                Search
                                <span className="ml-2 bg-blue-500 h-8 w-8 text-white rounded-full flex items-center justify-center">
                                    <SearchIcon />
                                </span>
                            </h2>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-md focus-within:border-blue-500">
                                <input
                                    type="text"
                                    placeholder="Search for articles..."
                                    className="w-full px-4 py-2 text-gray-700 outline-none bg-gray-50 rounded-l-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 rounded-r-md">
                                    <SearchIcon fontSize="medium" />
                                </button>
                            </div>
                        </div>
                        <Suspense fallback={<div>Loading filters...</div>}>
                            <Ad300X250 dataAdSlot="2567975821" />
                        </Suspense>
                        <div className="my-6 border border-gray-300 p-4 rounded-md ">
                            <h4 className="font-bold capitalize mb-2">Popular Tags</h4>
                            <hr className="my-2" />
                            <div className="flex flex-wrap gap-2">
                                {tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {articlesThisWeek?.length > 0 && (
                            <div>
                                <h4 className="font-bold capitalize">From This week</h4>
                                <hr className="my-2" />
                                {articlesThisWeek?.map((blog) => (
                                    <Link
                                        href={`/news/${blog?.slug}`}
                                        key={blog?.id}
                                        className="block transition-colors duration-200 rounded-lg hover:text-blue-600"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={blog?.coverImage}
                                                alt={blog?.title}
                                                width={90}
                                                height={90}
                                                className="object-cover rounded-md w-20 h-14"
                                            />
                                            <div className="flex flex-col">
                                                <h3 className="text-md font-semibold line-clamp-2">
                                                    {blog?.title}
                                                </h3>
                                                <span className="text-xs text-gray-500 mt-1">
                                                    Published on: {new Date(blog?.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <hr className="my-3 border-gray-300" />
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div className="sticky-sidebar">
                            <div className="ad-container">
                                <Suspense fallback={<div>Loading filters...</div>}>
                                    <Ad300x600 dataAdSlot="4810995789" />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="my-1">
                <Suspense fallback={<div>Loading filters...</div>}>
                    <Ad728x90 dataAdSlot="7916642838" />
                </Suspense>
            </div>

            <div className="container">
                <h2 className="font-semibold capitalize">Popular News</h2>
                <div className="grid gap-4 grid-cols-12 mt-6">
                    {loading ? (
                        <>
                            <SkeletonArticle />
                            <SkeletonArticle />
                        </>
                    ) : (
                        popularArticles.map((article, index) => (
                            <Link
                                legacyBehavior
                                href={`/news/${article.slug}`}
                                key={article?.id}
                                className="cursor-pointer"
                            >
                                <div
                                    key={index}
                                    className="relative col-span-6 md:col-span-4 rounded-[14px] shadow-lg"
                                >
                                    {/* <div className="bg-blue-600 text-white opacity-80 rounded-e-2xl absolute top-1 sm:top-3 4xl:top-5 4xl:px-10 4xl:py-2 4xl:text-lg left-0 px-1 sm:px-6 py-1 font-thin text-xs sm:text-base">
                    Trending
                  </div> */}
                                    <Image
                                        src={article.coverImage || altImage}
                                        alt={article?.title}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full md:h-[200px] h-[100px] object-cover rounded-t-[14px] "
                                    />
                                    <div className="p-2">
                                        <div className="sm:text-base 4xl:text-2xl text-sm truncate md:whitespace-normal font-semibold">
                                            {`${article?.title?.length > 20
                                                ? `${article?.title?.slice(0, 50)}... `
                                                : `${article?.title}`
                                                }`}
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <div className="text-xs leading-9 text-gray-700">
                                                    <span className="hidden sm:inline">
                                                        {article?.author?.name} &mdash;
                                                    </span>{" "}
                                                    {moment(article?.publishedAt).format("MMMM Do YYYY")}
                                                </div>
                                                {/* <div className="line-clamp-2 text-xs text-gray-500 ">
                          {article?.summary}
                        </div> */}
                                            </div>{" "}
                                            <Link
                                                legacyBehavior
                                                href={`/news/${article?.slug}`}
                                                key={article?.id}
                                            >
                                                <button className="bg-transparent text-[#0d6efd] text-sm 4xl:text-sm my-4 hidden sm:flex items-center">
                                                    Know More
                                                    <EastIcon className="text-lg ml-2" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <div className="container mx-auto">
                {" "}
                <SeoLinksFilter />
            </div>
        </div>
    );
}
