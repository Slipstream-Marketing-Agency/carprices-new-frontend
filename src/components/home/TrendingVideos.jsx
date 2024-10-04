import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const TrendingVideos = () => {

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
        <div className="tw-grid tw-gap-5 md:tw-mt-7 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3">
            {videosArray.map((item, index) => (
                <Link
                    href={item.url}
                    target="_blank"
                    key={index}
                    className="tw-flex tw-flex-col tw-bg-white tw-rounded-2xl tw-shadow-sm tw-pb-7 max-md:tw-mt-5"
                >
                    <div className="tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-justify-center tw-w-full tw-rounded-2xl md:tw-min-h-[177px] tw-min-h-[188px] xl:tw-min-h-[240px]">
                        <Image
                            loading="lazy" // Lazy load the image for better performance
                            width={200} // Set a specific width
                            height={200} // Set a specific height
                            layout="responsive" // Use responsive layout for better scaling
                            alt={item.name} // Descriptive alt text for accessibility
                            src={item?.imgSrc} // Ensure the image source is valid
                            className="tw-object-contain" // Keep the existing styling
                        />
                    </div>
                    <div className="tw-relative tw-flex tw-flex-col tw-pl-7 tw-mt-7 tw-text-neutral-900 max-md:tw-pl-5">
                        <Image
                            loading="lazy"
                            alt="playbutton-icon"
                            width={0}
                            height={0}
                            src="/playbutton.svg"
                            className=" tw-absolute tw-right-5 tw-top-[-53px] tw-w-[47px]"
                        />
                        <div className="tw-flex tw-flex-wrap tw-justify-between tw-gap-5 ">
                            <h5 className=" tw-text-black  tw-font-semibold line-clamp-2">
                                {item.name}
                            </h5>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default TrendingVideos