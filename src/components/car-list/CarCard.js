import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import Link from 'next/link';
import Image from 'next/image';
import OptimizedImage from '../common/image/OptimisedImage';
import PrimaryButton from '../buttons/PrimaryButton';

const CarPriceRange = React.memo(({ minPrice, maxPrice }) => {
    const formatPrice = (price) =>
        price?.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) || "TBC*";

    const priceInfo = minPrice === maxPrice || !maxPrice
        ? `AED ${formatPrice(minPrice)}*`
        : `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;

    return <span className="">{priceInfo}</span>;
});

// Memoized CarEMIDisplay component
const CarEMIDisplay = React.memo(({ minPrice }) => {
    const tenureInMonths = 60;
    const calculateEMI = (principal) => {
        const monthlyInterestRate = 0.025 / 12;
        const factor = Math.pow(1 + monthlyInterestRate, tenureInMonths);
        return Math.round((principal * monthlyInterestRate * factor) / (factor - 1));
    };

    const emi = minPrice ? `AED ${calculateEMI(minPrice).toLocaleString("en-AE", { minimumFractionDigits: 0 })}*` : "Not Available";

    return <p className="tw-mt-1 md:text-md tw-text-sm tw-font-semibold">{emi}</p>;
});

const CarCard = ({ car, loading }) => {
    const { year, featuredImage, brand, model, engine, power, torque, minPrice, maxPrice } = car || {};
    return (
        <article className="tw-flex tw-flex-col tw-py-5 tw-bg-white tw-rounded-2xl tw-border tw-border-solid tw-border-zinc-100 tw-shadow-md tw-cursor-pointer tw-transition-all tw-hover:shadow-lg tw-xl:w-full tw-xl:shadow-lg">
            <p className="tw-z-10 tw-text-xs tw-justify-center tw-self-start tw-py-1.5 tw-pr-2 tw-pl-3 tw-rounded-tr-full tw-rounded-br-full tw-backdrop-blur-md tw-bg-slate-100 tw-font-semibold">
                Model: {year}
            </p>

            <Link href={`/brands/${brand?.slug}/${year}/${model?.slug}`}>
                <header className="tw-flex tw-flex-col tw-w-full tw-text-sm tw-leading-4 tw-rounded-2xl tw-text-neutral-900 tw-px-5">
                    <div className="tw-relative tw-self-center tw--mt-1.5 tw-w-full tw-aspect-[1.69] tw-max-w-[278px] tw-flex tw-justify-center tw-items-center">
                        <Image
                            src={featuredImage?.url || "/assets/img/car-placeholder.png"}
                            alt={`Image of ${model?.name || "Car"}`}
                            width={featuredImage?.width}
                            height={featuredImage?.height}
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                        />
                    </div>
                </header>
            </Link>

            <Link href={`/brands/${brand?.slug}/${year}/${model?.slug}`}>
                <section className="tw-car-filter-card tw-flex tw-flex-col tw-justify-center tw-mt-1 tw-w-full tw-px-5">
                    <div className="tw-flex tw-flex-col">
                        <h6 className="tw-text-blue-600 tw-uppercase tw-font-semibold tw-mb-1 tw-text-xs">
                            {brand?.name}
                        </h6>
                        <h4 className="tw-text-gray-600 tw-font-semibold tw-mb-0 md:text-lg tw-text-sm">
                            {model?.name}
                        </h4>
                        <h4 className="tw-text-neutral-900 tw-font-bold tw-mt-2">
                            <CarPriceRange minPrice={minPrice} maxPrice={maxPrice} />
                        </h4>
                    </div>
                </section>
            </Link>

            <section className="tw-px-5 md:tw-block tw-hidden">
                <div className="tw-car-filter-card-spec tw-flex tw-gap-5 tw-justify-between tw-self-center tw-p-3 tw-w-full tw-rounded-lg tw-bg-slate-100 tw-text-neutral-900 tw-mt-2">
                    <div className="tw-flex tw-flex-col">
                        <p className="tw-text-xs tw-leading-5 tw-uppercase tw-text-gray-500">Engine</p>
                        <p className="tw-text-sm tw-font-semibold tw-text-gray-500">{engine || "N/A"}</p>
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <p className="tw-text-xs tw-leading-5 tw-uppercase tw-text-gray-500">Power</p>
                        <p className="tw-text-sm tw-font-semibold tw-text-gray-500">{power ? `${power}hp` : "N/A"}</p>
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <p className="tw-text-xs tw-leading-5 tw-uppercase tw-text-gray-500">Torque</p>
                        <p className="tw-text-sm tw-font-semibold tw-text-gray-500">{torque ? `${torque}Nm` : "N/A"}</p>
                    </div>
                </div>
            </section>

            <footer className="tw-grid tw-grid-cols-2 tw-mt-3 tw-w-full tw-px-5">
                <div className="tw-flex tw-flex-col tw-my-auto tw-text-neutral-900">
                    <p className="tw-text-xs tw-text-gray-500">EMI Starting from</p>
                    <CarEMIDisplay minPrice={minPrice} />
                </div>
                <div className="tw-flex tw-justify-end">
                    <PrimaryButton
                        label="View Details"
                        href={`/brands/${brand?.slug}/${year}/${model?.slug}`}
                    />
                </div>
            </footer>
        </article>
    );
};

export default CarCard;
