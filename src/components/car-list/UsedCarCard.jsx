import React, { useState } from "react";
import Link from "next/link";
import PrimaryButton from "../buttons/PrimaryButton";
import OptimizedImage from "../common/image/OptimisedImage";

const UsedCarCard = ({ car }) => {
  const [hovered, setHovered] = useState(false);

  const CarPriceRange = ({ car }) => {
    const formatPrice = (price) => {
      if (price === null) {
        return "TBC*";
      }
      return price.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    let priceInfo;

    if (car.minPrice === null && car.maxPrice === null) {
      priceInfo = "TBC*";
    } else if (car.minPrice === car.maxPrice || car.maxPrice === undefined) {
      priceInfo = `AED ${formatPrice(car.minPrice)}*`;
    } else {
      priceInfo = `AED ${formatPrice(car.minPrice)}* - ${formatPrice(car.maxPrice)}*`;
    }

    return <span>{priceInfo}</span>;
  };

  return (
    <>
      <article className="tw-relative tw-flex tw-flex-col tw-py-6 tw-bg-white tw-rounded-3xl tw-shadow-lg tw-overflow-hidden tw-transition-transform tw-transform tw-hover:scale-105">
        {/* Accent shape */}
        <div className="tw-absolute tw-top-0 tw-left-0 tw-h-20 tw-w-20 tw-bg-gradient-to-br tw-from-blue-500 tw-to-purple-500 tw-rounded-br-full tw-opacity-75 tw-transform tw-rotate-45 tw-translate-x-[-20%] tw-translate-y-[-20%]"></div>

        {/* Car Model Year Badge */}
        <p className="tw-z-10 tw-text-xs tw-justify-center tw-self-start tw-py-1.5 tw-pr-3 tw-pl-4 tw-rounded-tr-full tw-rounded-br-full tw-backdrop-blur-lg tw-bg-white/80 tw-font-semibold tw-text-gray-600 tw-shadow-md">
          Model: {car?.year}
        </p>

        <Link href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}>
          <header
            className="tw-relative tw-w-full tw-aspect-[1.69] tw-overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Default Image */}
            <OptimizedImage
              src={car?.featuredImage ? car?.featuredImage : "/assets/img/car-placeholder.png"}
              alt={`Image of ${car.name}`}
              layout="fill"
              objectFit="contain"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`tw-absolute tw-transition-opacity tw-duration-500 ${hovered ? "tw-opacity-0" : "tw-opacity-100"}`}
            />

            {/* Hover Image */}
            <OptimizedImage
              src="https://cdn.carprices.ae/assets/api_uploads_img_trim_1686224996921_3077ecb05e.png"
              alt="Hover Image"
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`tw-absolute tw-transition-opacity tw-duration-500 ${hovered ? "tw-opacity-100" : "tw-opacity-0"}`}
            />
          </header>
        </Link>

        <Link href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}>
          <section className="tw-flex tw-flex-col tw-justify-center tw-mt-3 tw-w-full tw-px-5 tw-text-center">
            <h3 className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-uppercase tw-font-extrabold tw-text-lg tw-tracking-wide tw-mb-1">
              {car?.brand?.name}
            </h3>
            <h4 className="tw-text-gray-700 tw-font-medium tw-text-sm tw-mb-2">
              {car?.model?.name}
            </h4>
            <p className="tw-text-gray-900 tw-font-semibold tw-text-xl">
              <CarPriceRange car={car} />
            </p>
          </section>
        </Link>

        {/* Specifications Section */}
        <section className="tw-flex tw-gap-5 tw-justify-between tw-px-5 tw-py-4 tw-bg-slate-100 tw-rounded-lg tw-mt-4 tw-shadow-sm">
          <div className="tw-flex tw-flex-col tw-items-center">
            <p className="tw-text-xs tw-uppercase tw-text-gray-500">Engine</p>
            <p className="tw-text-base tw-font-semibold tw-text-gray-700">{car?.engine}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-items-center">
            <p className="tw-text-xs tw-uppercase tw-text-gray-500">Power</p>
            <p className="tw-text-base tw-font-semibold tw-text-gray-700">{car?.power} hp</p>
          </div>
          <div className="tw-flex tw-flex-col tw-items-center">
            <p className="tw-text-xs tw-uppercase tw-text-gray-500">Torque</p>
            <p className="tw-text-base tw-font-semibold tw-text-gray-700">{car?.torque} Nm</p>
          </div>
        </section>

        {/* Footer with CTA Button */}
        <footer className="tw-flex tw-justify-center tw-items-center tw-w-full tw-px-5 tw-mt-4 tw-border-t tw-pt-4 tw-border-gray-200">
          <PrimaryButton
            label="View Details"
            href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
            className="tw-bg-blue-600 tw-text-white tw-rounded-full tw-py-2 tw-px-6 tw-shadow-md tw-transition-transform tw-transform tw-hover:scale-105"
          />
        </footer>
      </article>
    </>
  );
};

export default UsedCarCard;
