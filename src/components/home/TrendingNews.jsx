
import Link from 'next/link'
import React from 'react'

export default function TrendingNews({articles}) {
    return (
        <div className="flex flex-col container md:mt-8 mt-0">
            <div className="flex justify-between gap-5 px-px w-full max-md:flex-wrap">
                <div className="">
                    <h5 className="md:text-sm  text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Trending automotive news
                    </h5>
                    <h2 className="md:text-xl text-md font-semibold capitalize">
                        Latest Automotive News
                    </h2>
                </div>
            </div>
            <div className="mt-7 w-full">
                <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                    {articles?.news?.length > 0 ? (
                        <>
                            <Link
                                href={`/news/${articles.news[0]?.slug}`}
                                className="md:flex hidden col-span-2 relative flex-col justify-end p-8 pt-20 pb-9 text-slate-100 bg-cover rounded-2xl min-h-[838px]"
                                style={{
                                    backgroundImage: `url('${articles.news[0]?.coverImage || altImage}')`,
                                }}
                            >
                                <div className="relative flex flex-col justify-center p-4 border-l-4 border-l-blue-400 border-solid border-t-0 border-r-0 border-b-0 bg-opacity-50 bg-black rounded-2xl">
                                    <div className="px-6">
                                        <div className="text-2xl line-clamp-2 text-white">
                                            {articles.news[0]?.title || 'Default Title'}
                                        </div>
                                        <div className="mt-1 opacity-70 text-base line-clamp-2 text-white">
                                            {articles.news[0]?.summary || 'Default Summary'}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={`/news/${articles.news[0]?.slug}`}
                                key={0}
                                className="md:hidden flex relative flex-col justify-end p-4 text-slate-100 bg-cover rounded-2xl min-h-[269px]"
                                style={{
                                    backgroundImage: `url('${articles.news[0]?.coverImage || altImage}')`,
                                }}
                            >
                                <div className="relative flex flex-col justify-center p-4 border-l-4 border-l-blue-400 border-solid border-t-0 border-r-0 border-b-0 bg-opacity-50  bg-black rounded-2xl">
                                    <div className="text-sm sm:text-lg text-white">
                                        {articles.news[0]?.title || 'Default Title'}
                                    </div>
                                </div>
                            </Link>

                            <div className="grid grid-rows-3 gap-4">
                                {articles.news.slice(1, 4).map((item, index) => (
                                    <Link href={`/news/${item?.slug}`} key={index}>
                                        <div
                                            className="relative flex flex-col justify-end p-4 text-slate-100 bg-cover rounded-2xl min-h-[269px]"
                                            style={{
                                                backgroundImage: `url('${item?.coverImage || altImage}')`,
                                            }}
                                        >
                                            <div className="relative flex flex-col justify-center p-4 border-l-4 border-l-blue-400 border-solid border-t-0 border-r-0 border-b-0 bg-opacity-50 bg-black rounded-2xl">
                                                <div className="text-sm sm:text-lg text-white">
                                                    {item?.title || 'Default Title'}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>No articles available</div>
                    )}
                </div>
            </div>

        </div>
    )
}
