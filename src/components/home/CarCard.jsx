import React from 'react'
import Skeleton from "@mui/material/Skeleton";
import Link from 'next/link';
import Image from 'next/image';


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

const CarCard = ({ car, loading }) => {
    return (
        <div className="tw-flex tw-flex-col tw-py-4 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-md tw-cursor-pointer tw-transition-all hover:tw-shadow-lg
          xl:tw-py-5 xl:tw-h-full xl:tw-px-5 xl:tw-w-full xl:tw-shadow-lg">
            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-4 tw-flex-grow xl:tw-px-5 xl:tw-h-full">
                <div className="tw-self-start tw-py-1 tw-px-2 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
                    Model: {car?.highTrim?.year}
                </div>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={192} />
                ) : (
                    <Image
                        loading="lazy" // Lazy loading for improved performance
                        src={car?.highTrim?.featuredImage} // Ensure this image is optimized
                        width={600} // Set a fixed width to maintain layout
                        height={300} // Set a height to maintain aspect ratio
                        sizes="(max-width: 600px) 100vw, (min-width: 601px) 50vw" // Responsive sizes for better loading
                        className="tw-w-full tw-h-44 tw-object-contain tw-rounded-lg xl:tw-h-48" // Retain existing styling
                        alt={car.name} // Descriptive alt text for accessibility
                    />
                )}
            </div>
            <Link href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}>
                <div className="tw-flex tw-flex-col tw-px-4 tw-pt-2 tw-mt-2 tw-w-full xl:tw-px-5 xl:tw-pt-3 xl:tw-mt-2 xl:tw-flex-grow">
                    <h6 className="tw-text-xs tw-tracking-wider tw-leading-4 tw-text-blue-600 tw-uppercase tw-font-bold tw-m-0">
                        {car.brand.name}
                    </h6>
                    <h4 className="tw-text-base tw-text-gray-900 tw-font-semibold tw-m-0 xl:tw-text-lg">
                        {car.name}
                    </h4>
                    <CarPriceRange minPrice={car?.minPrice} maxPrice={car?.maxPrice} />
                </div>
            </Link>
            <div className="tw-flex tw-items-center tw-mt-3 tw-px-4 tw-w-full tw-justify-between xl:tw-mt-4 xl:tw-px-5 xl:tw-justify-between">
                <div className="tw-flex tw-flex-col tw-items-start">
                    <span className="tw-text-xs tw-leading-3">EMI Starting from</span>
                    <CarEMIDisplay minPrice={car?.minPrice} />
                </div>
                <Link href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}>
                    <button className="tw-mt-3 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-tracking-tight tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-full tw-hover:tw-bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500 xl:tw-mt-4 xl:tw-px-7 xl:tw-py-3 xl:tw-text-base xl:tw-font-semibold xl:tw-tracking-tight xl:tw-leading-4 xl:tw-bg-blue-600 xl:tw-border xl:tw-border-blue-600 xl:tw-rounded-full xl:tw-hover:tw-bg-blue-700 xl:tw-focus:tw-ring-2 xl:tw-focus:tw-ring-blue-500 xl:tw-active:tw-bg-blue-700">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CarCard