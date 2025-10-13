import React from 'react';

const HeroSection = () => {
    return (
        <>
            {/* High-quality video for desktop */}
            <video
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster=""
                className="hidden lg:block w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            >
                <source
                    src="https://cdn.carprices.ae/uploads/Banner_Video_WEBM_7136c1cb6c.webm"
                    type="video/webm"
                />
                <source
                    src="https://cdn.carprices.ae/uploads/Banner_Video_MP_4_d626f34ccd.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            {/* Low-quality video for mobile */}
            <video
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster=""
                className="block lg:hidden w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            >
                <source
                    src="https://cdn.carprices.ae/uploads/Banner_Video_Mobile_WEBM_7c5b9b8fec.webm"
                    type="video/webm"
                />
                <source
                    src="https://cdn.carprices.ae/uploads/Banner_Video_Mobile_MP_4_4ea8797a7e.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </>
    );
};

export default HeroSection;
