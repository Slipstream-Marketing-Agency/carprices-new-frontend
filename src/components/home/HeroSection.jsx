'use client';
import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <>
            {/* Desktop hero - static poster image for fast LCP, video loads lazily */}
            <div className="hidden lg:block w-full h-full relative">
                <Image
                    src="/assets/img/carbackgroundImage.jpg"
                    alt="CarPrices.ae - Find the best car prices in UAE"
                    fill
                    priority
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-cover"
                />
                <video
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={(e) => e.target.style.opacity = 1}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                >
                    <source
                        src="https://carprices.ae/uploads/Banner_Video_WEBM_7136c1cb6c.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://carprices.ae/uploads/Banner_Video_MP_4_d626f34ccd.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>

            {/* Mobile hero - static poster image for fast LCP */}
            <div className="block lg:hidden w-full h-full relative">
                <Image
                    src="/assets/img/carbackgroundImage.jpg"
                    alt="CarPrices.ae - Find the best car prices in UAE"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <video
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={(e) => e.target.style.opacity = 1}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                >
                    <source
                        src="https://carprices.ae/uploads/Banner_Video_Mobile_WEBM_7c5b9b8fec.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://carprices.ae/uploads/Banner_Video_Mobile_MP_4_4ea8797a7e.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </>
    );
};

export default HeroSection;
