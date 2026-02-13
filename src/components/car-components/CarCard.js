'use client'

import Link from "next/link";
import dynamic from 'next/dynamic';
import Image from "next/image";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { usePathname } from "next/navigation";
import StarIcon from '@mui/icons-material/Star';

// Helper: resolve relative Strapi upload URLs to absolute
function resolveImageUrl(url) {
  if (!url) return "/assets/img/car-placeholder.png";
  if (url.startsWith("http")) return url;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const origin = apiBase.replace(/\/api\/?$/, "");
  return `${origin}${url}`;
}



// Memoized CarPriceRange component
const CarPriceRange = React.memo(({ minPrice, maxPrice }) => {
  const formatPrice = (price) =>
    price?.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) || "TBC*";

  const priceInfo = minPrice === maxPrice || !maxPrice
    ? `AED ${formatPrice(minPrice)}*`
    : `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;

  return <span className="md:text-lg text-sm">{priceInfo}</span>;
});
CarPriceRange.displayName = 'CarPriceRange';

// Memoized CarEMIDisplay component
const CarEMIDisplay = React.memo(({ minPrice }) => {
  const tenureInMonths = 60;
  const calculateEMI = (principal) => {
    const monthlyInterestRate = 0.025 / 12;
    const factor = Math.pow(1 + monthlyInterestRate, tenureInMonths);
    return Math.round((principal * monthlyInterestRate * factor) / (factor - 1));
  };

  const emi = minPrice ? `AED ${calculateEMI(minPrice).toLocaleString("en-AE", { minimumFractionDigits: 0 })}*` : "Not Available";

  return <p className="mt-1 md:text-md text-sm font-semibold">{emi}</p>;
});
CarEMIDisplay.displayName = 'CarEMIDisplay';

// Main CarCard component
const CarCard = ({ car }) => {
  const { year, featuredImage, brand, model, engine, power, torque, minPrice, maxPrice, rating } = car || {};
  const pathname = usePathname();
  const isReviewPage = pathname === '/write-review';

  return (
    <article className={`flex flex-col py-5 bg-white rounded-2xl border border-solid border-zinc-100 shadow-md cursor-pointer transition-all hover:shadow-lg ${isReviewPage ? 'w-full shadow-lg' : 'xl:w-full xl:shadow-lg'}`}>

      {/* Model Year Display */}
      <p className=" text-xs justify-center self-start py-1.5 pr-2 pl-3 rounded-tr-full rounded-br-full backdrop-blur-md bg-slate-100 font-semibold">
        Model: {year}
      </p>

      {/* Image */}
      <Link href={isReviewPage ? `/write-review/rate-car?brand=${brand?.slug}&model=${model?.slug}&year=${year}` : `/brands/${brand?.slug}/${year}/${model?.slug}`}>
        <header className="flex flex-col w-full text-sm leading-4 rounded-2xl text-neutral-900 px-5">
          <div className="relative self-center -mt-1.5 w-full aspect-[1.69] max-w-[278px] flex justify-center items-center">
            <Image
              src={resolveImageUrl(featuredImage?.url)}
              alt={`Image of ${model?.name || "Car"}`}
              width={featuredImage?.width ? featuredImage?.width : 278}
              height={featuredImage?.height ? featuredImage?.height : 157}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        </header>
      </Link>

      {/* Brand, Model, Price Range or Rating */}
      <Link href={isReviewPage ? `/write-review/rate-car?brand=${brand?.slug}&model=${model?.slug}&year=${year}` : `/brands/${brand?.slug}/${year}/${model?.slug}`}>
        <section className="car-filter-card flex flex-col justify-center mt-1 w-full px-5">
          <div className="flex flex-col">
            <h6 className="text-blue-600 uppercase font-semibold mb-1 text-xs">
              {brand?.name}
            </h6>
            <h5 className="text-gray-600 font-semibold mb-0 md:text-lg text-sm">
              {model?.name}
            </h5>
            <h4 className="text-neutral-900 font-bold text-lg">
              <CarPriceRange minPrice={minPrice} maxPrice={maxPrice} />
            </h4>
            {isReviewPage &&
              <p className="text-neutral-900 flex items-center font-semibold text-sm">
                <StarIcon sx={{ color: '#f79712' }} className='h-4 w-4 mb-[3px]' />
                <span>{rating?.average ? rating.average : 0}</span>
                {' '}
                <span className="ml-4">({rating?.count ? rating.count : 0} Reviews)</span>
              </p>
            }
          </div>
        </section>
      </Link>

      {/* Specs - Displayed only on non-review page */}
      {!isReviewPage && (
        <section className="px-5 md:block hidden">
          <div className="car-filter-card-spec flex gap-5 justify-between self-center p-3 w-full rounded-lg bg-slate-100 text-neutral-900 mt-2">
            <div className="flex flex-col">
              <p className="text-xs leading-5 uppercase text-gray-500">Engine</p>
              <p className="text-sm font-semibold text-gray-500">{engine || "N/A"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs leading-5 uppercase text-gray-500">Power</p>
              <p className="text-sm font-semibold text-gray-500">{power ? `${power}hp` : "N/A"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs leading-5 uppercase text-gray-500">Torque</p>
              <p className="text-sm font-semibold text-gray-500">{torque ? `${torque}Nm` : "N/A"}</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer - Display EMI on non-review page and Review Now button on review page */}
      <footer className="grid grid-cols-2 mt-3 w-full px-5">
        <div className="flex flex-col my-auto text-neutral-900">
          <p className="text-xs text-gray-500">EMI Starting from</p>
          <CarEMIDisplay minPrice={minPrice} />
        </div>
        <div className="flex justify-end">
          {isReviewPage ? <PrimaryButton
            label="Review Now"
            href={`/write-review/rate-car?brand=${brand?.slug}&model=${model?.slug}`}
          /> : <PrimaryButton
            label="View Details"
            href={`/brands/${brand?.slug}/${year}/${model?.slug}`}
          />}

        </div>
      </footer>
    </article>
  );
};


export default React.memo(CarCard);
