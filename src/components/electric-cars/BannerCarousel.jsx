'use client';

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

const BannerCarousel = () => {

    const [activeIndex, setActiveIndex] = useState(0); // State for the active slide
    const slidesRef = useRef([]);
    
    // Array for images (can be fetched from backend)
    const images = [
        {
            src: 'https://via.placeholder.com/800x400?text=First+Electric+Car',
            alt: 'Electric Vehicle 1',
        },
        {
            src: 'https://via.placeholder.com/800x400/FF5733/ffffff?text=Luxury+Electric+Car',
            alt: 'Electric Vehicle 2',
        },
        {
            src: 'https://via.placeholder.com/800x400/33CFFF/ffffff?text=Eco-Friendly+Car',
            alt: 'Electric Vehicle 3',
        },
    ];

    const changeSlide = (index) => {
        setActiveIndex(index); // Update the active index
        slidesRef.current.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.position = i === index ? 'relative' : 'absolute';
        });
    };

    useEffect(() => {
        changeSlide(0)
    }, [])
    

    return (
        <div className="relative w-full md:w-1/2 mt-6 md:mt-0">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
                {/* Image Carousel */}
                <div className="w-full relative">
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            ref={(el) => (slidesRef.current[index] = el)}
                            src={image.src}
                            alt={image.alt}
                            width="800"
                            height="800"
                            className={`w-full object-cover transition-opacity duration-500 ${index === 0 ? 'opacity-1 relative' : 'opacity-0 absolute top-0 left-0'
                                }`}
                        />
                    ))}
                </div>
            </div>
            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-red-500' : 'bg-gray-300'
                            }`}
                        onClick={() => changeSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default BannerCarousel