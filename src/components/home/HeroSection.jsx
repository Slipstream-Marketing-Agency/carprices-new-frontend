import FilterLayout from '@/src/components-old/find-car-multi-step-filter/FilterLayout'
import React from 'react'

const HeroSection = () => {
    return (
        <div className="tw-row-span-1 lg:tw-col-span-7 tw-col-span-12 tw-flex tw-flex-col tw-justify-start tw-text-white tw-rounded-2xl tw-relative tw-overflow-hidden lg:tw-h-full tw-h-[230px] lg:tw-order-1 tw-order-2">
            <div className="video-container tw-relative tw-w-full tw-h-full">
                <video
                    muted
                    autoPlay
                    preload="metadata"
                    loop
                    playsInline
                    poster="/path/to/poster.jpg"
                    className="banner-video tw-w-full tw-h-full object-cover"
                >
                    <source
                        src="https://cdn.carprices.ae/assets/Carprices_promo_48b0bdc8d6.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

            </div>
        </div>
    )
}

export default HeroSection