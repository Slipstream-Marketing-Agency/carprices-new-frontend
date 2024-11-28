'use client';

import React from 'react';
import Slider from 'react-slick';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';

const EvReviews = ({ reviews }) => {
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
        const [isExpanded, setIsExpanded] = React.useState(false);
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

    const Arrow = ({ className, onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            <span>{direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</span>
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        draggable: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full bg-white shadow-md rounded-lg mb-8" id='user-reviews'>

            <div className="p-6">
                <h2 className="text-sm md:text-3xl font-semibold text-gray-800">Ev Cars Reviews</h2>
                {/* Review Carousel */}
                <Slider {...settings}>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="px-4">
                                <div className="border rounded-lg p-4 shadow-md">
                                    <h3 className="font-semibold text-gray-900 mb-2 capitalize">{review.title}</h3>
                                    <div className="flex items-center mb-2 mt-2">
                                        <div className="flex text-yellow-500">
                                            {[...Array(review.rating)].map((_, j) => (
                                                <StarIcon sx={{ color: '#f79712' }} className='h-5 w-5' key={j} />
                                            ))}
                                        </div>
                                    </div>
                                    <ReadMoreText text={review.opinion} />
                                    <div className="flex items-center">
                                        <div className="bg-gray-300 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full font-bold">
                                            {review.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-900">{review.username}</p>
                                            <p className="text-gray-500 text-sm">{formatDate(review.createdAt)} for {review.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No reviews yet. Be the first to review this EV!</p>
                    )}
                </Slider>
            </div>
        </div>
    );
}

// Dummy Data
EvReviews.defaultProps = {
    reviews: [
        {
            id: 1,
            title: 'Amazing EV!',
            rating: 5,
            opinion: 'This car is a game-changer. Smooth ride and exceptional performance. I absolutely love it!',
            username: 'john_doe',
            createdAt: '2024-11-26T12:00:00Z',
            name: 'Tesla Model 3',
        },
        {
            id: 2,
            title: 'Great Performance',
            rating: 4,
            opinion: 'The car performs well, but the range could be better. Still a great option for EV enthusiasts.',
            username: 'jane_doe',
            createdAt: '2024-11-25T11:30:00Z',
            name: 'Chevy Bolt EV',
        },
        {
            id: 3,
            title: 'Good, but needs improvement',
            rating: 3,
            opinion: 'It’s a good car, but I’ve experienced some issues with the charging station compatibility.',
            username: 'alex_smith',
            createdAt: '2024-11-24T10:45:00Z',
            name: 'Nissan Leaf',
        },
        {
            id: 4,
            title: 'Fantastic Experience',
            rating: 5,
            opinion: 'I’ve had this EV for a month, and I’m completely satisfied. It’s fast, efficient, and environmentally friendly!',
            username: 'susan_miller',
            createdAt: '2024-11-23T14:00:00Z',
            name: 'BMW i3',
        },
    ],
};

export default EvReviews;
