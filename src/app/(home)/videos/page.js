'use client';

import FilterSidebar from '@/components/car-videos/FilterSidebare';
import Pagination from '@/components/car-videos/Pagination';
import VideoList from '@/components/car-videos/VideoList';
import React, { useState, useEffect } from 'react';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async (brands = [], currentPage = 1) => {
    setLoading(true);
    const brandQuery = brands.length ? `&brands=${brands.join(',')}` : '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/by-brands?page=${currentPage}&pageSize=12${brandQuery}`);
    const data = await response.json();
    setVideos(data.videos || []);
    setTotalPages(data.pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(selectedBrands, page);
  }, [selectedBrands, page]);

  const handleBrandChange = (brandId) => {
    setSelectedBrands(prev =>
      prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]
    );
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className=" container grid grid-cols-12 gap-5 mt-8">
      <div className='col-span-3'>
        <FilterSidebar selectedBrands={selectedBrands} onBrandChange={handleBrandChange} />

      </div>
      <div className="col-span-9">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className='mb-6'>
              <h1 className='md:text-3xl text-xl font-semibold'>Explore the Latest Car Videos and Reviews</h1>
              <h4 className='md:text-lg text-md font-medium'>Discover Trending Automotive Insights and In-Depth Car Reviews</h4>
            </div>
            <VideoList videos={videos} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default VideosPage;
