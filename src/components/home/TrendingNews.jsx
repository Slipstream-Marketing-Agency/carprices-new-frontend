"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function TrendingNews({ articles }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    const Arrow = ({ onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            {direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const altImage = '/path-to-default-image.jpg'; // Provide a default image path

    return (
        <div className="flex flex-col container md:mt-8 mt-0">
            <div className="flex justify-between gap-5 px-1 w-full max-md:flex-wrap">
                <div>
                    <h5 className="md:text-sm text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Trending Automotive News
                    </h5>
                    <h2 className="md:text-xl text-md font-semibold capitalize">
                        Latest Automotive News
                    </h2>
                </div>
            </div>
            <div className="mt-1 w-full">
                {loading ? (
                    <div className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={`_-${index}`} className="skeleton-loader w-full h-[200px] rounded-2xl bg-gray-300 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <Slider {...sliderSettings}>
                        {articles?.news?.length > 0 ? (
                            articles.news.map((item, index) => (
                                <div key={item?.slug || item.slug || index} className="custom-slide px-2">
                                    <Link href={`/news/${item.slug}`}>
                                        <div
                                            className="flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden h-full border border-gray-200"
                                        >
                                            <div
                                                className="relative bg-cover bg-center h-48"
                                                style={{
                                                    backgroundImage: `url('${item.coverImage || altImage}')`,
                                                }}
                                            ></div>
                                            <div className="p-4">
                                                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                                                    {item.title || 'Default Title'}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                    {item.summary || 'Short description goes here...'}
                                                </p>
                                            </div>
                                            <div className="p-4 border-t border-gray-200">
                                                <div className="text-xs text-gray-500">
                                                    {item.author || 'Unknown Author'}, {new Date(item.publishedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No articles available</div>
                        )}
                    </Slider>
                )}
            </div>
        </div>
    )
}
