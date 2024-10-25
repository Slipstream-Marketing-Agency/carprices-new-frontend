import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function TrendingVideos() {
    const videosArray = [
        {
            imgSrc:
                "https://cdn.carprices.ae/assets/LC_2024_280082ac3e.jpg",
            name: "The 2024 Toyota Land Cruiser Prado Arrives In UAE 🤩 | Prices and Variants Discussed!",
            url: "https://www.youtube.com/watch?v=_xLXi8Si2f8",
        },
        {
            imgSrc:
                "https://cdn.carprices.ae/assets/Lexus_GX_vs_Patrol_a903e1ef66.jpg",
            name: "2024 Lexus GX 🤜VS🤛 2024 Nissan Patrol! Ultimate Battle Of Luxury and Off-Road Dynamics 💪",
            url: "https://www.youtube.com/watch?v=4MbZpuqDXrM&t=190s",
        },
        {
            imgSrc:
                "https://cdn.carprices.ae/assets/BYD_Shark_vs_Hilux_fe36d1aad2.jpg",
            name: "BYD Shark PHEV VS Toyota Hilux 🤜🤛: Which Will Dominate the Trails, China or Japan?",
            url: "https://www.youtube.com/watch?v=R5cXg7E416U",
        },
    ];
    return (
        <div className="flex flex-col container md:mt-10 my-6 px-5">
            <div className="flex flex-wrap justify-between w-full gap-5">
                <div className="flex flex-col max-w-full">
                    <h5 className="md:text-sm  text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Trending videos
                    </h5>
                    <h2 className="md:text-xl text-md font-semibold capitalize">
                        Here are some of the trending videos from our YouTube channel
                    </h2>
                </div>
                {/* <div className="self-start px-6 py-3 mt-2.5 text-base tracking-tight leading-4 text-center rounded-[119px] text-neutral-900">
        View More
      </div> */}
            </div>
            <div className="grid gap-5 md:mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {videosArray.map((item, index) => (
                    <Link
                        href={item.url}
                        target="_blank"
                        key={index}
                        className="flex flex-col bg-white rounded-2xl shadow-sm pb-7 max-md:mt-5"
                    >
                        <div className="relative flex flex-col overflow-hidden justify-center w-full rounded-2xl md:min-h-[177px] min-h-[188px] xl:min-h-[240px]">
                            <Image
                                loading="lazy" // Lazy load the image for better performance
                                width={200} // Set a specific width
                                height={200} // Set a specific height
                                layout="responsive" // Use responsive layout for better scaling
                                alt={item.name} // Descriptive alt text for accessibility
                                src={item?.imgSrc} // Ensure the image source is valid
                                className="object-contain" // Keep the existing styling
                            />
                        </div>
                        <div className="relative flex flex-col pl-7 mt-7 text-neutral-900 max-md:pl-5">
                            <Image
                                loading="lazy"
                                alt="playbutton-icon"
                                width={0}
                                height={0}
                                src="/playbutton.svg"
                                className=" absolute right-5 top-[-53px] w-[47px]"
                            />
                            <div className="flex flex-wrap justify-between gap-5 ">
                                <h5 className=" text-black  font-semibold line-clamp-2">
                                    {item.name}
                                </h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
