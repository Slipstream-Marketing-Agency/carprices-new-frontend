import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ShareIcon from '@mui/icons-material/Share';

const UserReviewsNew = ({ name, brand, model, year, fromReviewPage = false, link = '#' }) => {
    return (
        <div className="tw-w-full tw-bg-white tw-shadow-lg tw-rounded-lg tw-mb-8">
            {/* Header Section */}
            <div className='tw-p-6'>
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                    <h2 className="tw-text-sm md:tw-text-xl tw-font-semibold tw-text-gray-800">User Reviews of {name}</h2>
                    <Link href={`/write-review?brand=${brand}&model=${model}&year=${year}`} className="md:tw-border-solid tw-text-sm md:tw-text-base md:tw-border-blue-600 tw-text-blue-600 tw-bg-white md:tw-px-4 md:tw-py-1 md:tw-rounded-md md:hover:tw-bg-blue-600 md:hover:tw-text-white">
                        Write a Review
                    </Link>
                </div>

                {/* Overall Rating */}
                <div className="tw-flex tw-items-center tw-space-x-4 tw-mb-6">
                    <div className="tw-flex tw-items-center tw-text-gray-800 tw-text-4xl tw-font-bold">
                        <StarIcon sx={{ color: '#f79712' }} className='tw-h-10 tw-w-10' />4.1/5
                    </div>
                    <div>
                        <p className="tw-text-gray-700 tw-font-semibold">Very Good</p>
                        <p className="tw-text-gray-500 tw-text-sm">based on 10 reviews</p>
                    </div>
                </div>
            </div>

            <div className='tw-h-[2px] tw-bg-gray-200' />

            <div className="tw-p-6">
                {/* Filter Tabs */}
                {/* <div className="tw-flex tw-flex-row tw-space-x-3 tw-mb-6 tw-w-full tw-overflow-auto">
                    <button className="tw-px-2 md:tw-px-4 md:tw-py-2 tw-bg-black tw-text-white tw-rounded-md">All (10)</button>
                    <button className="tw-px-2 md:tw-px-4 md:tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md">Features (2)</button>
                    <button className="tw-px-2 md:tw-px-4 md:tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md">Dimension (2)</button>
                    <button className="tw-px-2 md:tw-px-4 md:tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md">Seats (1)</button>
                    <button className="tw-px-2 md:tw-px-4 md:tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md">Mileage (2)</button>
                    <button className="tw-px-2 md:tw-px-4 md:tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md">Engine (2)</button>
                </div> */}

                {/* Review Cards */}
                <div className={`tw-grid tw-grid-cols-1 ${fromReviewPage ? '' : 'md:tw-grid-cols-3'} tw-gap-4`}>
                    {/* Single Review Card */}
                    {[...Array(3)].map((_, i) => (
                        <>
                            <div className={`tw-border tw-rounded-lg tw-p-4 ${fromReviewPage ? '' : 'tw-shadow-md'}`}>
                                <h3 className="tw-font-semibold tw-text-gray-900 tw-mb-2">Underrated but competent</h3>
                                <div className="tw-flex tw-items-center tw-mb-2 tw-mt-6">
                                    <div className="tw-flex tw-text-yellow-500">
                                        {[...Array(4)].map((_, i) => (
                                            <StarIcon sx={{ color: '#f79712' }} className='tw-h-5 tw-w-5' />
                                        ))}
                                    </div>
                                </div>
                                <p className="tw-text-gray-700 tw-text-sm tw-mb-4">
                                    I have never really been a big fan of Mitsubishi as a brand, but at times there are some of their worthy products. One ... <a href="#" className="tw-text-blue-500">Read More</a>
                                </p>
                                <div className="tw-flex tw-items-center">
                                    <div className="tw-bg-gray-300 tw-text-gray-800 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-font-bold">N</div>
                                    <div className="tw-ml-3">
                                        <p className="tw-font-semibold tw-text-gray-900">Nazimuddin</p>
                                        <p className="tw-text-gray-500 tw-text-sm">Aug 10, 2024 for {name}</p>
                                    </div>
                                </div>
                            </div>
                            {fromReviewPage &&
                                <>
                                    <div className='tw-flex tw-items-center tw-justify-between tw-text-blue-500'>
                                        <div className='tw-px-4 tw-flex tw-items-center tw-gap-4 tw-font-bold'>
                                            <div>
                                                <ThumbUpAltOutlinedIcon className='tw-h-5 tw-w-5 tw-mr-2 tw-cursor-pointer' />
                                                <span>0</span>
                                            </div>
                                            <div>
                                                <ThumbDownAltOutlinedIcon className='tw-h-5 tw-w-5 tw-mr-2 tw-cursor-pointer' />
                                                <span>0</span>
                                            </div>
                                        </div>
                                        <ShareIcon className='tw-h-5 tw-w-5 tw-mr-2 tw-cursor-pointer' />
                                    </div>
                                    <div className='tw-h-[2px] tw-bg-gray-200' />
                                </>
                            }
                        </>
                    ))}
                </div>

                {/* Read All Link */}
                {!fromReviewPage && <div className="tw-mt-6">
                    <Link href={link} className="tw-text-blue-500 tw-font-semibold hover:tw-underline">
                        READ ALL {name} REVIEWS &rarr;
                    </Link>
                </div>}
            </div>
        </div>
    );
};

export default UserReviewsNew;
