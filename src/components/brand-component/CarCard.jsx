'use client'

import Link from "next/link";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { usePathname } from "next/navigation";
import StarIcon from '@mui/icons-material/Star';
import { slugToCapitalCase } from "@/utils/slugToCapitalCase";



const CarCard = ({ car, brandname }) => {


    const pathname = usePathname();
    const isReviewPage = pathname === '/write-review';

    const CarPriceRange = React.memo(({ minPrice, maxPrice }) => {
        const formatPrice = (price) =>
            price?.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) || "TBC*";

        const priceInfo = minPrice === maxPrice || !maxPrice
            ? `AED ${formatPrice(minPrice)}*`
            : `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;

        return <span className="md:text-lg text-sm">{priceInfo}</span>;
    });
    CarPriceRange.displayName = 'CarPriceRange';


    return (
        <article className={`flex flex-col py-5 bg-white rounded-2xl border border-solid border-zinc-100 shadow-md cursor-pointer transition-all hover:shadow-lg ${isReviewPage ? 'w-full shadow-lg' : 'xl:w-full xl:shadow-lg'}`}>

            {/* Model Year Display */}
            <p className="z-1 text-xs justify-center self-start py-1.5 pr-2 pl-3 rounded-tr-full rounded-br-full backdrop-blur-md bg-slate-100 font-semibold">
                Model: {car?.car_trims[0]?.year}
            </p>

            {/* Image */}
            <Link href={`/brands/${brandname}/${car?.car_trims[0]?.year}/${car?.slug}`}>
                <header className="flex flex-col w-full text-sm leading-4 rounded-2xl text-neutral-900 px-5">
                    <div className="relative self-center -mt-1.5 w-full aspect-[1.69] max-w-[278px] flex justify-center items-center">
                        <Image
                            src={car?.car_trims[0]?.featuredImage?.formats?.thumbnail?.url || "/assets/img/car-placeholder.png"}
                            alt={`Image of ${car?.name || "Car"}`}
                            width={car?.car_trims[0]?.featuredImage?.formats?.thumbnail?.width || 278}
                            height={car?.car_trims[0]?.featuredImage?.formats?.thumbnail?.height || 157}
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                        />
                    </div>
                </header>
            </Link>

            {/* Brand, Model, Price Range or Rating */}
            <Link href={`/brands/${brandname}/${car?.car_trims[0]?.year}/${car?.slug}`}>
                <section className="car-filter-card flex flex-col justify-center mt-1 w-full px-5">
                    <div className="flex flex-col">
                        <h6 className="text-blue-600 uppercase font-semibold mb-1 text-xs">
                            {slugToCapitalCase(brandname)}
                        </h6>
                        <h5 className="text-gray-600 font-semibold mb-0 md:text-lg text-sm">
                            {car?.name}
                        </h5>
                        <h4 className="text-neutral-900 font-bold text-lg">
                            <CarPriceRange minPrice={car?.priceRange?.min} maxPrice={car?.priceRange?.max} />
                        </h4>
                    </div>
                </section>
            </Link>

            {/* Specs - Displayed only on non-review page */}

            <section className="px-5 md:block hidden">
                <div className="car-filter-card-spec flex gap-5 justify-between self-center p-3 w-full rounded-lg bg-slate-100 text-neutral-900 mt-2">
                    <div className="flex flex-col">
                        <p className="text-xs leading-5 uppercase text-gray-500">Engine</p>
                        <p className="text-sm font-semibold text-gray-500">{car?.car_trims[0]?.engine || "N/A"}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs leading-5 uppercase text-gray-500">Power</p>
                        <p className="text-sm font-semibold text-gray-500">{car?.car_trims[0]?.power ? `${car?.car_trims[0]?.power}hp` : "N/A"}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs leading-5 uppercase text-gray-500">Torque</p>
                        <p className="text-sm font-semibold text-gray-500">{car?.car_trims[0]?.torque ? `${car?.car_trims[0]?.torque}Nm` : "N/A"}</p>
                    </div>
                </div>
            </section>

            {/* Footer - Display EMI on non-review page and Review Now button on review page */}
            <footer className="grid grid-cols-2 mt-3 w-full px-5">
                <div className="flex flex-col my-auto text-neutral-900">
                    <p className="text-xs text-gray-500">EMI Starting from</p>
                    {/* <CarEMIDisplay minPrice={minPrice} /> */}
                </div>
                <div className="flex justify-end">
                    <PrimaryButton
                        label="View Details"
                        href={`/brands/${brandname}/${car?.car_trims[0]?.year}/${car?.slug}`}
                    />

                </div>
            </footer>
        </article>
    );
};


export default React.memo(CarCard);
