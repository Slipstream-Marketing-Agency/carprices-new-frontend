
"use client"
import { getAllWebStories } from "@/lib/api";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5, // Set to 4.5 for the default display
    slidesToScroll: 1,
    arrows: false,
    centerMode: false, // Disable centering
    initialSlide: 0,
};

const StorySlider = () => {

    const [stories, setStories] = useState([])

    useEffect(() => {
        let isMounted = true;  // To prevent setting state on unmounted component

        const fetchData = async () => {
            try {
                const fetchedStories = await getAllWebStories();
                if (isMounted) {
                    setStories(fetchedStories || []);
                }
            } catch (err) {
                if (isMounted) {
                    console.log('Failed to fetch stories', err);
                }
            } finally {
            }
        };

        fetchData();

        // Cleanup function to prevent memory leaks if the component unmounts
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="relative flex justify-between">
            <div className="overflow-x-auto space-x-4 my-4 custom-scrollbar flex lg:hidden">
                {stories.map((story, index) => {
                    return (
                        <Link
                            href={`/web-stories/${story.slug}`}
                            key={index}
                            className="flex-shrink-0 relative w-64 h-96 rounded-2xl"
                            target="_blank"
                        >
                            <Image
                                width="0"
                                height="0"
                                sizes="100vw"
                                src={story.coverImage.url}
                                alt={story.title}
                                className="object-cover w-full h-96 rounded-2xl"
                            />
                            <div className="m-2 absolute bottom-4 left-0 right-0 py-3 pl-4 bg-opacity-50 bg-black rounded-2xl text-white">
                                <h6 className="text-white font-bold mb-0">
                                    {" "}
                                    {story.title}
                                </h6>
                                <p className="text-xs font-light mt-1">
                                    {moment(story.publishedAt).format("MMMM Do YYYY")}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="container p-0 hidden lg:block">
                <Slider {...settings}>
                    {stories.map((story, index) => (
                        <Link
                            href={`/web-stories/${story.slug}`}
                            key={index}
                            className="px-2"
                            target="_blank"
                        >
                            <div className="flex-shrink-0 relative w-full h-[30rem] rounded-2xl">
                                <Image
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    src={story.coverImage.url}
                                    alt={story.title}
                                    className="object-cover w-full h-[30rem] rounded-2xl"
                                />
                                <div className="m-2 absolute bottom-4 left-0 right-0 py-3 pl-4 bg-opacity-50 bg-black rounded-2xl text-white">
                                    <h6 className="md:text-sm text-xs text-white font-semibold mb-0">
                                        {" "}
                                        {story.title}
                                    </h6>
                                    <p className="text-xs font-light mt-1">
                                        {moment(story.publishedAt).format("MMMM Do YYYY")}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default StorySlider;
