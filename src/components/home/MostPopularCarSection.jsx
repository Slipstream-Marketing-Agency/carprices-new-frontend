import React, { useEffect, useState } from 'react'
import CarCard from './CarCard'
import Slider from "react-slick";
import { getCarSection } from '@/src/lib/api';

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

const categorysliderSettings = {
    dots: false,
    infinite: true,
    // speed: 2000,
    slidesToShow: 4,
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
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
    ],
};

const MostPopularCarSection = ({ carType }) => {

    const [filteredCars, setFilteredCars] = useState(null)

    useEffect(() => {

        let isMounted = true;

        const fetchData = async () => {
            try {
                const fetchedFilteredCars = await getCarSection(carType);
                if (isMounted) {
                    setFilteredCars(
                        fetchedFilteredCars ? (fetchedFilteredCars.length > 0 ? fetchedFilteredCars[0] : null) : null
                    );
                }
            } catch (err) {
                if (isMounted) {
                    console.log('Failed to fetch filteredCars', err);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [carType]);

    return (
        <>
            <div className="tw-px-4 tw-hidden sm:tw-block">
                <Slider {...categorysliderSettings}>
                    {filteredCars && filteredCars.carModels.map((car, index) => (
                        <div className="tw-px-2" key={car.id}>
                            <CarCard car={car} loading={false} />
                        </div>
                    ))}
                </Slider>
                {/* )} */}
            </div>
            {/* Horizontal scrolling for screens 720px and smaller */}
            <div className="sm:tw-hidden tw-block tw-overflow-x-auto tw-m-2 custom-scrollbar">
                <div className="tw-flex tw-nowrap tw-pr-1">
                    {filteredCars && filteredCars.carModels.map((car) => (
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
        </>
    )
}

export default MostPopularCarSection