'use client';
import React, { useRef, useEffect, useState } from 'react';

const HeroSection = () => {
    const desktopVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Force play videos on mount
        const playVideo = (videoElement) => {
            if (videoElement) {
                videoElement.play().catch((error) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('Video autoplay prevented:', error);
                    }
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

    if (!isClient) {
        // Server-side render: show skeleton
        return (
            <>
                <div className="hidden lg:block w-full h-full relative">
                    <div className="absolute inset-0 w-full h-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                        <div className="w-full h-full bg-gray-300"></div>
                    </div>
                </div>
                <div className="block lg:hidden w-full h-full relative">
                    <div className="absolute inset-0 w-full h-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                        <div className="w-full h-full bg-gray-300"></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Desktop hero */}
            <div className="hidden lg:block w-full h-full relative" suppressHydrationWarning>
                {/* Skeleton loader */}
                <div className="absolute inset-0 w-full h-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                    <div className="w-full h-full bg-gray-300"></div>
                </div>
                
                <video
                    ref={desktopVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={(e) => {
                        e.target.style.opacity = 1;
                        e.target.play();
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

            {/* Mobile hero */}
            <div className="block lg:hidden w-full h-full relative" suppressHydrationWarning>
                {/* Skeleton loader */}
                <div className="absolute inset-0 w-full h-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                    <div className="w-full h-full bg-gray-300"></div>
                </div>
                
                <video
                    ref={mobileVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={(e) => {
                        e.target.style.opacity = 1;
                        e.target.play();
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

