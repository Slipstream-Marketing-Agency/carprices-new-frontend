import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ShareIcon from '@mui/icons-material/Share';

const CarDetailReview = ({ name, brand, model, year, fromReviewPage = false, link = '#' }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg mb-8">
            {/* Header Section */}
            <div className='p-6'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm md:text-xl font-semibold text-gray-800">User Reviews of {name}</h2>
                    <Link href={`/write-review?brand=${brand}&model=${model}&year=${year}`} className="md:border text-sm md:text-base md:border-blue-600 text-blue-600 bg-white md:px-4 md:py-1 md:rounded-md md:hover:bg-blue-600 md:hover:text-white">
                        Write a Review
                    </Link>
                </div>

                {/* Overall Rating */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center text-gray-800 text-4xl font-bold">
                        <StarIcon sx={{ color: '#f79712' }} className='h-10 w-10' />4.1/5
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Very Good</p>
                        <p className="text-gray-500 text-sm">based on 10 reviews</p>
                    </div>
                </div>
            </div>

            <div className='h-[2px] bg-gray-200' />

            <div className="p-6">
                {/* Filter Tabs */}
                {/* <div className="flex flex-row space-x-3 mb-6 w-full overflow-auto">
                    <button className="px-2 md:px-4 md:py-2 bg-black text-white rounded-md">All (10)</button>
                    <button className="px-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md">Features (2)</button>
                    <button className="px-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md">Dimension (2)</button>
                    <button className="px-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md">Seats (1)</button>
                    <button className="px-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md">Mileage (2)</button>
                    <button className="px-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md">Engine (2)</button>
                </div> */}

                {/* Review Cards */}
                <div className={`grid grid-cols-1 ${fromReviewPage ? '' : 'md:grid-cols-3'} gap-4`}>
                    {/* Single Review Card */}
                    {[...Array(3)].map((_, i) => (
                        <div key={i}>
                            <div className={`border rounded-lg p-4 ${fromReviewPage ? '' : 'shadow-md'}`}>
                                <h3 className="font-semibold text-gray-900 mb-2">Underrated but competent</h3>
                                <div className="flex items-center mb-2 mt-6">
                                    <div className="flex text-yellow-500">
                                        {[...Array(4)].map((_, j) => (
                                            <StarIcon sx={{ color: '#f79712' }} className='h-5 w-5' key={j}/>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm mb-4">
                                    I have never really been a big fan of Mitsubishi as a brand, but at times there are some of their worthy products. One ... <a href="#" className="text-blue-500">Read More</a>
                                </p>
                                <div className="flex items-center">
                                    <div className="bg-gray-300 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full font-bold">N</div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-900">Nazimuddin</p>
                                        <p className="text-gray-500 text-sm">Aug 10, 2024 for {name}</p>
                                    </div>
                                </div>
                            </div>
                            {fromReviewPage &&
                                <>
                                    <div className='flex my-2 items-center justify-between text-blue-500'>
                                        <div className='px-4 flex items-center gap-4 font-bold'>
                                            <div>
                                                <ThumbUpAltOutlinedIcon className='h-5 w-5 mr-2 cursor-pointer' />
                                                <span>0</span>
                                            </div>
                                            <div>
                                                <ThumbDownAltOutlinedIcon className='h-5 w-5 mr-2 cursor-pointer' />
                                                <span>0</span>
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
                {!fromReviewPage && <div className="mt-6">
                    <Link href={link} className="text-blue-500 font-semibold hover:underline">
                        READ ALL {name} REVIEWS &rarr;
                    </Link>
                </div>}
            </div>
        </div>
  )
}

export default CarDetailReview