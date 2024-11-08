// src/components/FeaturedSlider.js
"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';

export default function FeaturedSlider({ featuredArticles, type }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null); // Reference to store the auto-slide interval
  const isDragging = useRef(false); // Track if user is dragging
  const startX = useRef(0); // Store the start X position of the drag
  const translateX = useRef(0); // Track translate value during drag

  // Auto-slide setup with cleanup
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide(); // Ensure only one interval
    slideInterval.current = setInterval(nextSlide, 5000); // Change slide every 3 seconds
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredArticles.data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredArticles.data.length - 1 : prevIndex - 1
    );
  };

  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX; // Handle mouse or touch event
    stopAutoSlide(); // Stop auto-slide during drag
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || e.touches[0].clientX;
    translateX.current = currentX - startX.current; // Calculate drag distance
  };

  const handleDragEnd = () => {
    if (isDragging.current) {
      if (translateX.current > 50) {
        prevSlide(); // Move to previous slide
      } else if (translateX.current < -50) {
        nextSlide(); // Move to next slide
      }
    }
    isDragging.current = false;
    translateX.current = 0;
    startAutoSlide(); // Restart auto-slide
  };

  return (
    <>
      {featuredArticles?.data?.length > 0 &&
        <div className='shadow-md p-4 rounded-lg' >
          <h3 className="md:text-lg font-semibold uppercase" >Featured {slugToCapitalCase(type)}</h3>
          <div className="relative w-full overflow-hidden mt-3" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseMove={handleDragMove}
              onTouchMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchEnd={handleDragEnd}
              onMouseLeave={() => isDragging.current && handleDragEnd()}
            >
              {featuredArticles.data.map((article, index) => (
                <Link href={`/news/${article.slug}`} className="min-w-full" key={index}>
                  <div className="relative">
                    <Image
                      src={article.coverImage || "/assets/placeholder/news-placeholder.webp"}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-[170px]"
                    />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Featured</div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold">{article.title}</h3>
                    <p className="mt-2 text-xs text-gray-700 line-clamp-2">{article.summary}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-[30%] shadow left-0 transform -translate-y-1/2 bg-white text-white p-1 rounded-full "
            >
              <ChevronLeftIcon className='text-black' />

            </button>
            <button
              onClick={nextSlide}
              className="absolute top-[30%] shadow right-0 transform -translate-y-1/2 bg-white text-white p-1 rounded-full"
            >
              <ChevronRightIcon className='text-black' />
            </button>
          </div>
        </div>
      }
    </>

  );
}
