'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ShareIcon from '@mui/icons-material/Share';

const CarDetailReview = ({ name, brand, model, year, fromReviewPage = false, link = '#' }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-reviews?carModelSlug=${model}`);
        const data = response.data;

        setReviews(data);

        // Calculate the average rating
        const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(totalRating / data.length || 0);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [model]);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // ReadMoreText component for handling "Read More" toggle
const ReadMoreText = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 100;
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <p className="text-gray-700 text-sm mb-4">
        {isExpanded || text.length <= MAX_LENGTH ? text : `${text.slice(0, MAX_LENGTH)}...`}
        {text.length > MAX_LENGTH && (
          <button onClick={toggleExpand} className="text-blue-500 ml-2">
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </p>
    );
  };

  // Limit reviews if fromReviewPage is false
  const displayedReviews = fromReviewPage ? reviews : reviews.slice(0, 3);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg mb-8" id='user-reviews'>
      {/* Header Section */}
      <div className='p-6'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-xl font-semibold text-gray-800">User Reviews of {name}</h2>
          <Link href={`/write-review/rate-car?brand=${brand}&model=${model}&year=${year}`} className="md:border text-sm md:text-base md:border-blue-600 text-blue-600 bg-white md:px-4 md:py-1 md:rounded-md md:hover:bg-blue-600 md:hover:text-white">
            Write a Review
          </Link>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center text-gray-800 text-4xl font-bold">
            <StarIcon sx={{ color: '#f79712' }} className='h-10 w-10' />{averageRating.toFixed(1)}/5
          </div>
          <div>
            <p className="text-gray-700 font-semibold">{averageRating >= 4 ? 'Very Good' : 'Good'}</p>
            <p className="text-gray-500 text-sm">based on {reviews.length} reviews</p>
          </div>
        </div>
      </div>

      <div className='h-[2px] bg-gray-200' />

      <div className="p-6">
        {/* Review Cards */}
        <div className={`grid grid-cols-1 ${fromReviewPage ? '' : 'md:grid-cols-3'} gap-4`}>
          {displayedReviews.map((review) => (
            <div key={review.id}>
              <div className={`border rounded-lg p-4 ${fromReviewPage ? '' : 'shadow-md'}`}>
                <h3 className="font-semibold text-gray-900 mb-2 capitalize">{review.title}</h3>
                <div className="flex items-center mb-2 mt-6">
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, j) => (
                      <StarIcon sx={{ color: '#f79712' }} className='h-5 w-5' key={j}/>
                    ))}
                  </div>
                </div>
                <ReadMoreText text={review.opinion} />
                <div className="flex items-center">
                  <div className="bg-gray-300 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    {review.users_permissions_user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{review.users_permissions_user.username}</p>
                    <p className="text-gray-500 text-sm">{formatDate(review.createdAt)} for {name}</p>
                  </div>
                </div>
              </div>
              {fromReviewPage &&
                <>
                  <div className='flex my-2 items-center justify-between text-blue-500'>
                    <div className='px-4 flex items-center gap-4 font-bold'>
                      <div>
                        <ThumbUpAltOutlinedIcon className='h-5 w-5 mr-2 cursor-pointer' />
                        <span>{review.helpfulYes}</span>
                      </div>
                      <div>
                        <ThumbDownAltOutlinedIcon className='h-5 w-5 mr-2 cursor-pointer' />
                        <span>{review.helpfulNo}</span>
                      </div>
                    </div>
                    <ShareIcon className='h-5 w-5 mr-2 cursor-pointer' />
                  </div>
                  <div className='h-[2px] bg-gray-200' />
                </>
              }
            </div>
          ))}
        </div>

        {/* Read All Link */}
        {!fromReviewPage && reviews.length > 3 && (
          <div className="mt-6">
            <Link href={link} className="text-blue-500 font-semibold hover:underline">
              READ ALL {name} REVIEWS &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailReview;
