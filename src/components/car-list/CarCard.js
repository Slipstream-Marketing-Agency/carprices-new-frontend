import React from "react";
import { Card, CardContent, Typography, div } from "@mui/material";
import OptimizedImage from "../common/image/OptimisedImage";
import PrimaryButton from "../buttons/PrimaryButton";
import Link from "next/link";

const CarCard = ({ car }) => {
  const CarPriceRange = ({ car }) => {
    const formatPrice = (price) => {
      if (price === null) {
        return "TBC*";
      }
      return price?.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    let priceInfo;

    if (car?.minPrice === null && car?.maxPrice === null) {
      // If both minPrice and maxPrice are undefined, display TBD*
      priceInfo = "TBC*";
    } else if (car?.minPrice === car?.maxPrice || car?.maxPrice === undefined) {
      // If min and max prices are the same or maxPrice is undefined, display only one price
      priceInfo = `AED ${formatPrice(car?.minPrice)}*`;
    } else {
      // Display price range
      priceInfo = `AED ${formatPrice(car?.minPrice)}* - ${formatPrice(
        car?.maxPrice
      )}*`;
    }

    return <span>{priceInfo}</span>;
  };

  const CarEMIDisplay = ({ car }) => {
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

    // Extract all non-zero prices, calculate EMI for each, and find the minimum EMI
    const emis = calculateEMI(car?.minPrice);

    // const minEMI = Math.min(...emis);

    // Format the minimum EMI for display
    const emiString = emis
      ? `AED ${emis.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}*`
      : "Not Available";

    return <p className="tw-mt-1 tw-text-lg tw-font-bold">{emiString}</p>;
  };

  return (
    <>
      <article className="tw-flex tw-flex-col tw-py-5 tw-bg-white tw-rounded-2xl tw-shadow  ">
        <p className="tw-z-10 tw-text-xs tw-justify-center tw-self-start tw-py-1.5 tw-pr-2 tw-pl-3 tw-rounded-tr-full tw-rounded-br-full tw-backdrop-blur-md tw-bg-slate-100  tw-font-semibold">
          {" "}
          Model: {car?.year}
        </p>
        <Link
          href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
        >
          <header className="tw-flex tw-flex-col tw-w-full tw-text-sm tw-leading-4 tw-rounded-2xl tw-text-neutral-900 tw-px-5 ">
            <div className="tw-relative tw-self-center -tw-mt-1.5 tw-w-full tw-aspect-[1.69] tw-max-w-[278px]">
              <OptimizedImage
                src={
                  car?.featuredImage
                    ? car?.featuredImage
                    : "/assets/img/car-placeholder.png"
                }
                alt={`Image of ${car.name}`}
                layout="fill"
                objectFit="contain"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                width={278}
                height={169}
                id={car?.id}
              />
            </div>
          </header>
        </Link>
        <Link
          href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
        >
          <section className="car-filter-card tw-flex tw-flex-col tw-justify-center tw-mt-1 tw-w-full tw-px-5 ">
            <div className="tw-flex tw-flex-col">
              <div className="tw-flex tw-flex-col">
                <h3 className="tw-tracking-wider tw-text-blue-600 tw-uppercase tw-font-semibold tw-mb-1">
                  {car?.brand?.name}
                </h3>
                <h4 className="tw-text-gray-600 tw-font-semibold tw-mb-0">
                  {car?.model?.name}
                </h4>
              </div>
              <p className=" tw-text-neutral-900 tw-font-bold tw-mt-2">
                <CarPriceRange car={car} />
              </p>
            </div>
          </section>
        </Link>
        <section className="tw-px-5">
          <div className=" car-filter-card-spec tw-flex tw-gap-5 tw-justify-between tw-self-center tw-p-4 tw-w-full tw-rounded-lg tw-bg-slate-100 tw-text-neutral-900 tw-mt-2">
            <div className="tw-flex tw-flex-col">
              <p className="spec-head tw-leading-5 tw-uppercase tw-text-gray-500">
                Engine
              </p>
              <p className="spec-value tw-font-semibold tw-text-gray-500">
                {car?.engine}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-whitespace-nowrap">
              <p className="spec-head tw-leading-5 tw-uppercase tw-text-gray-500">
                Power
              </p>
              <p className="spec-value tw-font-semibold tw-text-gray-500">
              {car?.power}hp
              </p>
            </div>
            <div className="tw-flex tw-flex-col">
              <p className="spec-head tw-leading-5 tw-uppercase tw-text-gray-600">
                Torque
              </p>
              <p className="spec-value tw-font-semibold tw-text-gray-500">
                {car?.torque}Nm
              </p>
            </div>
          </div>
        </section>
        <footer className="car-filter-card-emi tw-flex tw-gap-5 tw-justify-between tw-self-center tw-items-center tw-mt-4 tw-w-full tw-px-5 ">
          <div className="tw-flex tw-flex-col tw-my-auto tw-text-neutral-900">
            <p className="emi-text">EMI Starting from</p>

            <CarEMIDisplay car={car} />
          </div>
          <PrimaryButton
            label="View Details"
            href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
          />
        </footer>
      </article>
    </>
  );
};

export default CarCard;
