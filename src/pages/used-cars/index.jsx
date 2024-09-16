import UsedCarCard from '@/src/components/car-list/UsedCarCard'
import MainLayout from '@/src/layout/MainLayout'
import { Skeleton } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import Slider from "react-slick";
import TestimonialsSection from './components/TestimonialSection'
import CarComparisonTool from './components/CarComparisonTool'


const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-'); // Replace multiple - with single -
};


const CarPriceRange = ({ minPrice, maxPrice }) => {
    const formatPrice = (price) => {
        return price.toLocaleString("en-AE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    };

    let priceInfo;
    if (minPrice === null || maxPrice === null) {
        // If either min or max price is null, display TBD
        priceInfo = "TBD*";
    } else if (minPrice === maxPrice) {
        // If min and max prices are the same, display only one price
        priceInfo = `AED ${formatPrice(minPrice)}*`;
    } else {
        // Display price range
        priceInfo = `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;
    }

    return (
        <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-[21px] ">
            {priceInfo}
        </span>
    );
};

const CarEMIDisplay = ({ minPrice }) => {
    const tenureInMonths = 60; // Loan tenure in months

    const calculateEMI = (principal) => {
        const annualInterestRate = 0.025; // Annual interest rate (2.5%)
        const monthlyInterestRate = annualInterestRate / 12; // Monthly interest rate
        const compoundInterestFactor = Math.pow(
            1 + monthlyInterestRate,
            tenureInMonths
        );
        const emi =
            (principal * monthlyInterestRate * compoundInterestFactor) /
            (compoundInterestFactor - 1);
        return Math.round(emi);
    };

    // Calculate EMI using the minimum price
    const minEMI = calculateEMI(minPrice);

    // Format the minimum EMI for display
    const emiString = minEMI
        ? `AED ${minEMI.toLocaleString("en-AE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })}*`
        : "Not Available";

    return (
        <span className="tw-mt-1 tw-text-base tw-font-semibold">{emiString}</span>
    );
};


const index = () => {

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

    const brandsliderSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
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

    const [selectedTab, setSelectedTab] = useState(0); // Example state for selected tab
    const [allTrims, setAllTrims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastTab, setLastTab] = useState(null); // To track last selected tab

    // List of brands
    const brands = ["Toyota", "Honda", "BMW", "Audi", "Ford"];

    const fetchFilteredTrims = useCallback(async () => {
        if (selectedTab === lastTab) return; // Prevent fetching if the tab hasn't changed

        setIsLoading(true); // Set loading to true while we fetch data

        try {
            const brandSlug = slugify(brands[selectedTab]); // Convert brand name to slug format
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}car-trims/homefilter?brands=${JSON.stringify([brandSlug])}`
            );
            setAllTrims(response?.data?.data?.list);
        } catch (error) {
            console.error("Failed to fetch filtered trims:", error);
        } finally {
            setIsLoading(false); // Ensure loading is false after fetching
        }
    }, [selectedTab, brands, lastTab]);

    useEffect(() => {
        fetchFilteredTrims();
        setLastTab(selectedTab); // Update lastTab after fetching
    }, [fetchFilteredTrims, selectedTab]); // Dependency on fetchFilteredTrims and selectedTab

    return (
        <>
            <MainLayout
                pageMeta={{
                    title: "Buy and Sell Used Cars in UAE - Carprices Classifieds",
                    description:
                        "Browse thousands of used cars for sale in the UAE. Compare prices, models, and deals from trusted sellers. Buy or sell your vehicle with ease on Carprices Classifieds.",
                    type: "Used Car Classifieds",
                }}
            >
                {/* Hero Section */}
                <section className="tw-relative tw-h-[50vh] md:tw-h-[80vh] tw-flex tw-items-center tw-justify-center tw-px-4 tw-overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/used-car/banner.jpg"
                        alt="Car Banner"
                        fill={true}
                        className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-opacity-90 tw-z-0"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Content */}
                    <div className="tw-absolute tw-left-0 tw-top-1/3 tw-transform tw--translate-y-1/2 tw-max-w-2xl tw-p-6 tw-bg-transparent tw-rounded-lg tw-z-10">
                        <div className="tw-text-left tw-flex tw-flex-col tw-items-start tw-justify-center tw-w-full">
                            <h1 className="tw-text-4xl sm:tw-text-5xl md:tw-text-8xl tw-font-bold tw-text-white tw-mb-6 tw-animate-slideInLeft">
                                Buy & Sell Used Cars in UAE
                            </h1>
                            <p className="tw-text-base sm:tw-text-lg md:tw-text-3xl tw-text-white tw-mb-6 tw-animate-slideInLeft tw-delay-1">
                                Find your next vehicle or post yours for sale in just a few clicks.
                            </p>
                            <div className="tw-flex tw-flex-col tw-mt-4 md:tw-flex-row tw-items-start tw-justify-start tw-gap-4">
                                <Link href="/sell-your-car">
                                    <button className="tw-bg-blue-600 tw-text-white tw-px-8 tw-py-3 tw-rounded-full tw-font-semibold tw-shadow-md tw-transition-transform tw-transform tw-duration-300 tw-hover:tw-scale-105 tw-animate-speedCar">
                                        Sell Your Car
                                    </button>
                                </Link>
                                <Link href="/used-cars/search">
                                    <button className="tw-bg-gray-700 tw-text-white tw-px-8 tw-py-3 tw-rounded-full tw-font-semibold tw-shadow-md tw-transition-transform tw-transform tw-duration-300 tw-hover:tw-scale-105 tw-animate-zoomIn">
                                        Browse Cars
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="tw-flex tw-flex-col tw-container md:tw-mt-14 tw-mt-8">
                    <div className="tw-flex tw-flex-col tw-self-start tw-px-5 max-md:tw-max-w-full">
                        <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                            Discover Your Ideal Car
                        </h5>
                        <h2 className="tw-text-4xl sm:tw-text-5xl md:tw-text-6xl tw-font-bold tw-mb-6 tw-text-center">
                            Explore Top Used Cars by Brands in the UAE
                        </h2>
                    </div>

                    <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-mt-3 tw-w-full tw-text-base tw-leading-4 tw-text-center tw-text-neutral-900 max-md:tw-flex-wrap max-md:tw-max-w-full">
                        <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-px-5 max-md:tw-flex-wrap max-md:tw-max-w-full">
                            {brands.map((brand, index) => (
                                <div
                                    key={index}
                                    className="tw-flex tw-flex-col tw-justify-center"
                                >
                                    <div
                                        className={`tw-justify-center md:tw-px-14 tw-px-10 md:tw-py-5 tw-py-3 tw-border tw-border-solid tw-rounded-[73px] max-md:tw-px-5 tw-cursor-pointer ${selectedTab === index
                                            ? "tw-bg-neutral-900 tw-text-white"
                                            : "tw-bg-violet-100 tw-border-violet-100"
                                            }`}
                                        onClick={() => setSelectedTab(index)}
                                    >
                                        {brand}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tw-px-4">
                        <Slider key={selectedTab} {...brandsliderSettings}>
                            {allTrims.map((car, index) => (
                                <div className="tw-px-2" key={index}>
                                    <UsedCarCard car={car} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-container tw-mt-10">
                    <div className="tw-flex tw-flex-col tw-self-start tw-px-5">
                        <h5 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold">
                            Hear from Our Customers
                        </h5>
                        <h2 className="tw-text-4xl sm:tw-text-5xl md:tw-text-6xl tw-font-bold tw-mb-6 tw-text-center">
                            What Our Happy Buyers Say
                        </h2>
                    </div>
                    <TestimonialsSection />
                </div>
                <CarComparisonTool />
            </MainLayout>
        </>
    )
}

export default index