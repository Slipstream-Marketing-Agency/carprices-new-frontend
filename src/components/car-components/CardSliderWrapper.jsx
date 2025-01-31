// src/components/CustomSlider.js

import { useRef, useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CardSliderWrapper({ children, responsive }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(responsive.desktop); // Default to desktop
  const totalSlides = children.length;

  // Function to update slidesToShow based on window width
  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width < 640) { // Small screens (mobile)
      setSlidesToShow(responsive.mobile || 1.5);
    } else if (width < 1024) { // Medium screens (tablet)
      setSlidesToShow(responsive.tablet || 2.5);
    } else { // Large screens (desktop)
      setSlidesToShow(responsive.desktop || 3.5);
    }
  };

  useEffect(() => {
    updateSlidesToShow(); // Set initial slidesToShow based on screen size
    window.addEventListener('resize', updateSlidesToShow); // Update on resize
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, [responsive]);

  const slideWidth = 100 / slidesToShow;

  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * (index / slidesToShow);
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) {
      scrollToSlide(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < totalSlides - slidesToShow) {
      scrollToSlide(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full">

      {/* Slider Content */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll scrollbar-hide snap-x scroll-smooth space-x-4  py-6"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${slideWidth}%` }} // Dynamic width based on slidesToShow
          >
            {child}
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute -left-9 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none flex items-center justify-center"
        disabled={currentIndex === 0}
      >
        <ChevronLeftIcon />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute -right-9 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none"
        disabled={currentIndex >= totalSlides - slidesToShow}
      >
        <ChevronRightIcon />
      </button>

      {/* Slide Indicators */}
      {/* <div className="flex justify-center mt-0 space-x-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-3 h-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
          ></button>
        ))}
      </div> */}
    </div>
  );
}
