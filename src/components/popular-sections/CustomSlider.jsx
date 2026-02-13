// app/components/CustomSlider.js
'use client';

import { useRef, useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import Link from 'next/link';
import { slugToCapitalCase } from '@/utils/slugToCapitalCase';

const CustomSlider = ({ items, title, basePath }) => {
  const sliderRef = useRef(null);
  const [data, setData] = useState(null); // Holds actual data from props or API
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate API call or data fetch with a delay
    setTimeout(() => {
      setData(items);
      setLoading(false);
    }, 1500); // Adjust the delay to simulate loading time
  }, [items]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      top: 0,
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: 'smooth',
    });
  };

  // Inline Skeleton Loader for consistent layout during loading
  const renderSkeletonLoader = () => {
    return (
      <div className="flex space-x-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`_-${index}`}
            className="flex flex-col items-center space-y-2 min-w-[120px] max-w-[120px] h-[120px]"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mb-8 mt-6">
      <div className='flex justify-between'>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <Link href={`/${basePath}`} className='text-xs text-blue-600 font-semibold '> View All {slugToCapitalCase(basePath)}  <ChevronRightIcon fontSize="small" className="text-blue-600" /></Link>
      </div>

      <div className="relative flex items-center">
        {/* Styled Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
          style={{ transform: 'translateX(-50%)' }}
        >
          <ChevronLeftIcon fontSize="small" className="text-gray-700" />
        </button>

        {/* Slider Content or Skeleton Loader */}
        <div
          ref={sliderRef}
          className="flex items-center overflow-x-auto scrollbar-hide space-x-4 pl-8 pr-8"
          style={{ height: "120px" }} // Fixed height to avoid layout shift
        >
          {loading ? (
            renderSkeletonLoader() // Show skeleton while loading
          ) : (
            data.map((item) => (
              <Link
                href={`/${basePath}/${item.slug}`}
                key={item.slug}
                className="flex flex-col justify-center items-center space-y-2 min-w-[90px] max-w-[120px] h-[120px]"
              >
                <div className="rounded-lg border p-2 w-16 h-16 flex items-center justify-center">
                  <Image src={item.logo || item.image} alt={item.name} width={40} height={40} className="w-full h-full object-contain" />
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">{item.name}</p>
              </Link>
            ))
          )}
        </div>

        {/* Styled Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
          style={{ transform: 'translateX(50%)' }}
        >
          <ChevronRightIcon fontSize="small" className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;
