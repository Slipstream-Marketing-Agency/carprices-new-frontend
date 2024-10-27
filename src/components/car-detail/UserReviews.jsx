import React from 'react'
import { Rating, Link } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const UserReviews = ({ name }) => {
    const categories = [
        { label: 'Safety', value: 4 },
        { label: 'Performance', value: 4.5 },
        { label: 'Maintenance', value: 4.2 },
        { label: 'Comfort and Convenience', value: 4.5 },
        { label: 'Build and Quality', value: 4.7 },
    ];

    const reviews = [
        {
            name: 'Ahmed Al Mansoori',
            date: '11/06/2024',
            rating: 4.5,
            review:
                'The '+name+' is an outstanding compact SUV that combines Scandinavian design with excellent performance. The interior is stylish and comfortable, featuring high-quality materials and innovative storage solutions. The turbocharged engine provides ample power.',
        },
        {
            name: 'Omar Al Habtoor',
            date: '11/06/2024',
            rating: 4.5,
            review:
                'I’m extremely pleased with my '+name+'. The minimalist design and attention to detail in the cabin are impressive. It drives smoothly, and the fuel efficiency is quite good for an SUV. The safety features, such as adaptive cruise control and lane-keeping assist, work seamlessly.',
        },
        {
            name: 'Aisha Al Nuaimi',
            date: '11/06/2024',
            rating: 4.5,
            review:
                'The '+name+' is an excellent vehicle that exceeds my expectations in many ways. The exterior design is modern and sleek, while the interior is comfortable and filled with high-tech features.',
        },
        {
            name: 'Ahmed Al Mansoori',
            date: '11/06/2024',
            rating: 4.5,
            review:
                'The '+name+' is an outstanding compact SUV that combines Scandinavian design with excellent performance. The interior is stylish and comfortable, featuring high-quality materials and innovative storage solutions. The turbocharged engine provides ample power.',
        },
        {
            name: 'Omar Al Habtoor',
            date: '11/06/2024',
            rating: 4.5,
            review:
                'I’m extremely pleased with my '+name+'. The minimalist design and attention to detail in the cabin are impressive. It drives smoothly, and the fuel efficiency is quite good for an SUV. The safety features, such as adaptive cruise control and lane-keeping assist, work seamlessly.',
        },
        {
            name: 'Aisha Al Nuaimi',
            date: '11/06/2024',
            rating: 4.5,
            review:
                'The '+name+' is an excellent vehicle that exceeds my expectations in many ways. The exterior design is modern and sleek, while the interior is comfortable and filled with high-tech features.',
        },
    ];

    return (
        <div>
            <h2 className="tw-font-semibold tw-mb-5 tw-mt-14">{name} User Reviews</h2>

            <div className="tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-p-8">
                <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-8">
                    {/* Overall Rating Section (1/3 width) */}
                    <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-basis-1/3'>
                        <p className="tw-text-gray-500">Overall Rating & Reviews</p>
                        <p className="tw-text-6xl tw-font-bold">4.5</p>
                        <Rating name="read-only" value={4.5} precision={0.5} readOnly sx={{ color: '#ff5722' }} />
                        <p className="tw-text-gray-500 tw-text-sm">
                            Based on 128 reviews{' '}
                            <Link href="#" sx={{ color: '#3f51b5', textDecoration: 'none' }}>
                                Rate now
                            </Link>
                        </p>
                    </div>

                    {/* Category Ratings (2/3 width) */}
                    <div className="tw-basis-2/3">
                        {categories.map((category, index) => (
                            <div key={index} className="tw-flex tw-flex-col md:tw-flex-row tw-mb-4">
                                <p className="tw-w-52">{category.label}</p>
                                <div className='tw-flex tw-items-center tw-w-full'>
                                    <Rating name="read-only" value={category.value} className="tw-w-44 md:tw-w-52" precision={0.5} readOnly sx={{ color: '#3f51b5' }} />
                                    <div className="tw-w-full tw-h-2 tw-ml-4 tw-rounded-full tw-bg-gray-200 tw-relative">
                                        <div
                                            className="tw-h-2 tw-rounded-full tw-bg-blue-500"
                                            style={{ width: `${(category.value / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="tw-ml-4 tw-w-4">{Math.round((category.value / 5) * 53)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="tw-w-full tw-mx-auto tw-px-2 tw-py-4 tw-bg-white tw-rounded-lg">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="tw-flex tw-flex-col tw-gap-4 tw-border tw-border-gray-200 tw-rounded-lg tw-p-4"
                        >
                            <div className="tw-flex tw-items-center tw-justify-between">
                                {/* User Info */}
                                <div className="tw-flex tw-items-center tw-gap-3">
                                    <div className="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-blue-200 tw-text-blue-600 tw-font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="tw-font-semibold">{review.name}</p>
                                        <p className="tw-text-gray-500 tw-text-sm tw-mt-1">{review.date}</p>
                                    </div>
                                </div>
                                {/* Rating and Review */}
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <p className="tw-text-blue-600 tw-font-bold">{review.rating}</p>
                                    <StarBorderIcon className='tw-text-blue-600' />
                                </div>
                            </div>
                            <p className="tw-text-gray-700 tw-text-sm">{review.review}</p>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-mt-6">
                    <p className="tw-text-gray-500 tw-text-sm">Page 1 of 3</p>
                    <div className="tw-flex tw-gap-2">
                        <button
                            className="tw-px-6 md:tw-py-2.5 tw-py-1.5 tw-bg-gray-200 tw-text-gray-600 tw-text-base tw-font-bold tw-rounded-full hover:tw-bg-gray-300"
                        >
                            Previous
                        </button>
                        <button
                            className="tw-px-6 md:tw-py-2.5 tw-py-1.5 tw-bg-blue-600 tw-text-white tw-text-base tw-font-bold tw-rounded-full hover:tw-bg-blue-700"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserReviews;
