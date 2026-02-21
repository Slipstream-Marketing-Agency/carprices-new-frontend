'use client';
import React, { useRef, useEffect } from 'react';

const HeroSection = () => {
    const desktopVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);

    useEffect(() => {
        // Force play videos on mount for better mobile compatibility
        const playVideo = (videoElement) => {
            if (videoElement) {
                videoElement.play().catch((error) => {
                    console.log('Video autoplay prevented:', error);
                    // Show fallback image if video can't autoplay
                    videoElement.style.display = 'none';
                });
            }
        };

        if (desktopVideoRef.current) {
            playVideo(desktopVideoRef.current);
        }
        if (mobileVideoRef.current) {
            playVideo(mobileVideoRef.current);
        }
    }, []);

    return (
        <>
            {/* Desktop hero - static poster image for fast LCP, video loads lazily */}
            <div className="hidden lg:block w-full h-full relative">
                <img
                    src="/assets/img/carbackgroundImage.jpg"
                    alt="CarPrices.ae - Find the best car prices in UAE"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="object-cover"
                />
                <video
                    ref={desktopVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/assets/img/carbackgroundImage.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={(e) => {
                        e.target.style.opacity = 1;
                        e.target.play();
                    }}
                    onError={(e) => {
                        console.log('Desktop video failed to load');
                        e.target.style.display = 'none';
                    }}
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
                <img
                    src="/assets/img/carbackgroundImage.jpg"
                    alt="CarPrices.ae - Find the best car prices in UAE"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="object-cover"
                />
                <video
                    ref={mobileVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/assets/img/carbackgroundImage.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={(e) => {
                        e.target.style.opacity = 1;
                        e.target.play();
                    }}
                    onError={(e) => {
                        console.log('Mobile video failed to load');
                        e.target.style.display = 'none';
                    }}
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

