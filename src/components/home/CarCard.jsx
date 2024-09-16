import React from 'react'
import Skeleton from "@mui/material/Skeleton";


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
        <div className="tw-px-2">
            <div className="tw-flex tw-flex-col tw-h-full tw-py-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-lg">
                <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-px-5 tw-flex-grow">
                    <div className="tw-self-start tw-py-1 tw-px-3 tw-mb-2 tw-text-xs tw-rounded-full tw-border tw-border-solid tw-bg-slate-100 tw-border-blue-600 tw-border-opacity-30">
                        Model: {car?.highTrim?.year}
                    </div>
                    {loading ? (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={192}
                        />
                    ) : (
                        <img
                            loading="lazy"
                            src={car?.highTrim?.featuredImage}
                            className="tw-self-center tw-w-full tw-h-48 tw-object-contain"
                            alt=""
                        />
                    )}
                </div>
                <div className="tw-flex tw-flex-col tw-justify-center tw-px-5 tw-pt-3 tw-mt-2 tw-w-full tw-flex-grow tw-m-0">
                    <h6 className="tw-text-xs tw-tracking-wider tw-leading-5 tw-text-blue-600 tw-uppercase tw-font-bold tw-m-0">
                        {car.brand.name}
                    </h6>
                    <h4 className="tw-text-lg tw-text-gray-900 tw-font-semibold tw-m-0">
                        {car.name}
                    </h4>
                    <CarPriceRange
                        minPrice={car?.minPrice}
                        maxPrice={car?.maxPrice}
                    />
                </div>

                {/* <div className="tw-px-5">
          <div className="tw-flex tw-justify-between tw-p-4 tw-mt-3 tw-w-full tw-rounded-lg tw-bg-slate-100 tw-text-neutral-900 ">
            <div className="tw-flex tw-flex-col tw-text-center">
              <span className="tw-text-xs tw-leading-5 tw-uppercase">
                Mileage
              </span>
              <span className="tw-text-base tw-font-semibold">
                {car.mileage}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-text-center">
              <span className="tw-text-xs tw-leading-5 tw-uppercase">
                Transmission
              </span>
              <span className="tw-text-base tw-font-semibold">
                {car.transmission}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-text-center">
              <span className="tw-text-xs tw-leading-5 tw-uppercase">
                Seats
              </span>
              <span className="tw-text-base tw-font-semibold">
                {car.seats}
              </span>
            </div>
          </div>
        </div> */}

                <div className="tw-flex tw-mt-4 tw-w-full tw-justify-between tw-items-center tw-px-5">
                    <div className="tw-flex tw-flex-col tw-items-left">
                        <span className="tw-text-xs tw-leading-3">
                            EMI Starting from
                        </span>
                        <CarEMIDisplay minPrice={car?.minPrice} />
                    </div>

                    <button className="tw-mt-3 tw-px-7 tw-py-3 tw-text-base tw-font-semibold tw-tracking-tight tw-leading-4 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-border-solid tw-rounded-full tw-hover:tw-bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CarCard