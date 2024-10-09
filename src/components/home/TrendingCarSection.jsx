import Ad300X250 from '@/src/components-old/ads/Ad300x250';
import Ad728x90 from '@/src/components-old/ads/Ad728x90';
import { getCarSection } from '@/src/lib/api';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import CarCard from './CarCard';

const TrendingCarSection = () => {

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`custom-arrow custom-next-arrow text-black`}
                onClick={onClick}
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </div>
        );
    };

    // Custom Prev Arrow
    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`custom-arrow custom-prev-arrow text-black`}
                onClick={onClick}
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </div>
        );
    };


    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    const [featuredCars, setFeaturedCars] = useState(null)

    useEffect(() => {
        let isMounted = true;  // To prevent setting state on unmounted component

        const fetchData = async () => {
            try {
                const fetchedFeaturedCars = await getCarSection('featured');
                if (isMounted) {
                    setFeaturedCars(fetchedFeaturedCars ? (fetchedFeaturedCars.length>0 ? fetchedFeaturedCars[0] : null) : null);
                }
            } catch (err) {
                if (isMounted) {
                    console.log('Failed to fetch featuredCars', err);
                }
            } finally {
            }
        };

        fetchData();

        // Cleanup function to prevent memory leaks if the component unmounts
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-4 tw-gap-5">
            <div className="xl:tw-col-span-3 tw-relative tw-half-card-slider tw-hidden sm:tw-block">
                <Slider {...sliderSettings}>
                    {featuredCars && featuredCars.carModels.map((car) => (
                        <div className="tw-px-2" key={car.id}>
                            <CarCard car={car} loading={false} />
                        </div>
                    ))}
                </Slider>
                <div className="md:tw-block tw-hidden tw-mt-4">
                    {" "}
                    <Ad728x90 dataAdSlot="4367254600" />
                </div>
            </div>
            {/* Horizontal scrolling for screens 720px and smaller */}
            <div className="sm:tw-hidden tw-block tw-overflow-x-auto tw-m-2 custom-scrollbar">
                <div className="tw-flex tw-nowrap tw-pr-1">
                    {featuredCars && featuredCars.carModels.map((car) => (
                        <div
                            className="tw-inline-block tw-pr-2"
                            style={{ minWidth: "75%" }}
                            key={car.id}
                        >
                            <CarCard car={car} loading={false} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:tw-hidden tw-block sm:tw-mb-4 tw-w-full">
                <Ad300X250 dataAdSlot="8451638145" />
            </div>
        </div>
    )
}

export default TrendingCarSection