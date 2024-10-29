'use client'; // Make this part a client component if needed

import React, { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrimaryButton from "../buttons/PrimaryButton";
import SeoLinksFilter from "../common/SeoLinksFilter";
import ImageSlider from "./ImageSlider";
import ModelDescription from "./ModelDescription";
import Ad728x90 from "../ads/Ad728x90";
import Ad300x600 from "../ads/Ad300x600";
import VariantsListing from "./VariantsListing";
import OldModel from "./OldModel";
import Image from "next/image";
import KeyFeatures from "./KeyFeatures";
import VehicleFaq from "./VehicleFaq";
import useTranslate from "@/utils/UseTranslate";
import CarDetailReview from "../reviews/CarDetailReview";

export default function ModelWrapper({ oldModel, currentmodel, seoData }) {
    const [currentURL, setCurrentURL] = useState("");

    // If using browser-specific features, use `useEffect` on the client-side
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentURL(window.location.href);
        }
    }, []);

    const mainTrim = currentmodel?.highTrim[0];
    const allTrims = currentmodel?.trims;
    const minPower = currentmodel?.power?.min;
    const maxPower = currentmodel?.power?.max;
    const minPrice = currentmodel?.price?.min;
    const maxPrice = currentmodel?.price?.max;
    const minTorque = currentmodel?.torque?.min;
    const maxTorque = currentmodel?.torque?.max;
    const minFuelConsumption = currentmodel?.fuelConsumption?.min;
    const maxFuelConsumption = currentmodel?.fuelConsumption?.max;

    const engines = currentmodel?.engines;
    const brand = currentmodel?.brand;
    const model = { name: currentmodel?.name, slug: currentmodel?.slug };
    const year = currentmodel?.highTrim[0]?.year;
    const mainTrimFuelType = mainTrim?.fuelType;
    const motorTypes = currentmodel?.motors
        ?.join(", ")
        .replace(/,([^,]*)$/, " or$1");
    const engineTypes = engines?.join(", ").replace(/,([^,]*)$/, " or$1");
    const cylinderList = currentmodel?.cylinders.join(", ");
    const transmissionList = currentmodel?.transmissionList
        .join(", ")
        .replace(/,([^,]*)$/, " or$1");
    const seatList = currentmodel?.seats.join(", ");

    const gallery = mainTrim?.galleryImages > 0;

    const getTransmissionType = () => {
        const hasAutomatic = allTrims.some((t) => t?.transmission === "Automatic");
        const hasManual = allTrims.some((t) => t?.transmission === "Manual");

        if (hasAutomatic && hasManual) {
            return <b>Automatic/Manual</b>;
        } else if (hasAutomatic) {
            return (
                <>
                    an <b>Automatic</b>
                </>
            );
        } else if (hasManual) {
            return (
                <>
                    a <b>Manual</b>
                </>
            );
        } else {
            return (
                <>
                    a <b>CVT</b>
                </>
            );
        }
    };

    const [isSticky, setIsSticky] = useState(false);
    const router = useRouter();
    const t = useTranslate();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentURL);
        alert("Link copied to clipboard!");
    };

    // const currentURL = typeof window !== "undefined" ? window.location.href : "";
    const CarPriceRange = () => {
        // Format price for display
        const formatPrice = (price) => {
            return price?.toLocaleString("en-AE", {
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

        return priceInfo;
    };

    const CarEMIDisplay = () => {
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

        return <span>{emiString}</span>;
    };
    const [activeLink, setActiveLink] = useState("#specs");

    const handleLinkClick = (href) => {
        setActiveLink(href);
    };


    return (
        <div>
            <div className="grid grid-cols-12 gap-4 mx-auto container">
                <div className="col-span-12 lg:col-span-5">
                    <ImageSlider mainTrim={mainTrim} />
                </div>

                <div className="col-span-12 lg:col-span-6 md:pl-10">
                    <div className="relative">
                        <h1 className="g font-semibold mb-1">
                            {mainTrim?.year} {brand?.name} {model?.name}{" "}
                            <span className="text-[18px] font-light">
                                Variants ({allTrims?.length})
                            </span>
                        </h1>
                    </div>
                    {/* <span class="inline-flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-green-600/20">
            4.2 <StarIcon className="text-[14px] ml-1" />
          </span>
          <span className="text-[14px] mx-2">182 Ratings & Reviews</span>
          <span className="text-[14px] font-semibold underline">
            Rate Now
          </span> */}
                    <div className="md:my-3 my-3">
                        <h2>
                            <CarPriceRange />
                        </h2>
                        <p className="font-medium text-gray-500 mt-3">
                            <CarEMIDisplay />
                            /Monthly EMI*{" "}
                            {/* <span className="underline ">
                <Link href="">Details</Link>
              </span> */}
                        </p>
                    </div>

                    <div className="md:my-10 my-7">
                        <div className="grid grid-cols-3 gap-4 md:w-[70%]">
                            <div className="flex items-center">
                                <div>
                                    <h6 className="font-medium mb-0 text-gray-500">
                                        {mainTrimFuelType === "Electric"
                                            ? "Motor Type"
                                            : t.NoOfCylinders}
                                    </h6>
                                    <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                                        {mainTrimFuelType === "Electric"
                                            ? motorTypes
                                            : cylinderList}
                                    </h5>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <h6 className="font-medium mb-0 text-gray-500">
                                        {t.transmission}
                                    </h6>
                                    <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                                        {transmissionList}
                                    </h5>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <h6 className="font-medium mb-0 text-gray-500">
                                        {t.power} (hp)
                                    </h6>
                                    <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                                        {minPower === maxPower
                                            ? minPower
                                            : `${minPower} to ${maxPower}`}
                                    </h5>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <h6 className="font-medium mb-0 text-gray-500">
                                        {t.torque} (Nm)
                                    </h6>
                                    <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                                        {minTorque === maxTorque
                                            ? minTorque
                                            : `${minTorque} to ${maxTorque}`}
                                    </h5>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <h6 className="font-medium mb-0 text-gray-500">
                                        {t.seats}
                                    </h6>
                                    <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                                        {seatList}
                                    </h5>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <h6 className="font-medium mb-0 text-gray-500">
                                        {t.fuelType}
                                    </h6>
                                    <h5 className="text-gray-500 font-semibold mt-1 mb-0">
                                        {mainTrimFuelType}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PrimaryButton label="View All Variants" href={"#variants&prices"} />
                </div>
            </div>
            <div className="sticky top-0 z-20">
                <nav className="text-base sm:text-lg leading-none text-black bg-zinc-50 shadow mt-10  mb-10 overflow-x-scroll custom-scrollbar">
                    <div className="mx-auto container flex gap-7 items-center">
                        <Link
                            href="#specs"
                            onClick={() => handleLinkClick("#specs")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 h-full whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#specs"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Specs
                        </Link>
                        <Link
                            href="#variants&prices"
                            onClick={() => handleLinkClick("#variants&prices")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#variants&prices"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Variants & prices
                        </Link>
                        <Link
                            href={`/brands/${brand.slug}/${mainTrim.year}/${model.slug}/video`}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#faq"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Videos
                        </Link>
                        <Link
                            href="#faq"
                            onClick={() => handleLinkClick("#faq")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#faq"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            FAQ
                        </Link>


                    </div>
                </nav>
            </div>

            <div
                className="container mx-auto grid grid-cols-12"
                id="specs"
            >
                <div className="md:col-span-9 col-span-12">
                    <ModelDescription
                        year={year}
                        brand={brand}
                        model={model}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        minFuelConsumption={minFuelConsumption}
                        maxFuelConsumption={maxFuelConsumption}
                        engineTypes={engineTypes}
                        transmissionList={transmissionList}
                        motorTypes={motorTypes}
                        mainTrimFuelType={mainTrimFuelType}
                        allTrims={allTrims}
                        mainTrim={mainTrim}
                        getTransmissionType={getTransmissionType}
                    />
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad728x90 dataAdSlot={"1087083283"} />
                    </Suspense>
                </div>
                <div className="md:col-span-3 col-span-12">
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300x600 dataAdSlot={"1763487396"} />
                    </Suspense>
                </div>
            </div>
            <div className="container mx-auto mt-10" id="variants&prices">
                <VariantsListing
                    year={year}
                    brand={brand}
                    model={model}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minFuelConsumption={minFuelConsumption}
                    maxFuelConsumption={maxFuelConsumption}
                    engineTypes={engineTypes}
                    transmissionList={transmissionList}
                    motorTypes={motorTypes}
                    mainTrimFuelType={mainTrimFuelType}
                    allTrims={allTrims}
                    mainTrim={mainTrim}
                />
                <div className="container mx-auto grid grid-cols-12 mt-10">
                    <div className="md:col-span-9 col-span-12">
                        <OldModel model={oldModel} />
                        <div className="mt-14">
                            <Ad728x90 dataAdSlot={"1087083283"} />
                        </div>
                    </div>
                    <div className="md:col-span-3 col-span-12">
                        {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot={"1763487396"} />
                        </Suspense>
                    </div>
                </div>

                {currentmodel?.highlightsList?.length > 0 && (
                    <section className="grid grid-cols-12  mt-12  rounded-xl ">
                        <div className="md:col-span-9 col-span-12 flex md:flex-row flex-col rounded-xl  border border-solid border-gray-300">
                            <div
                                className="flex flex-col md:w-7/12 text-white  md:h-full  md:py-20 py-10 md:px-10 px-4"
                                style={{
                                    background:
                                        "linear-gradient(to right, #143529 0.8%, #000000 90%)",
                                }}
                            >
                                <ul className=" p-0 space-y-8 text-2xl list-none font-thin">
                                    <p className=" text-[36px] text-white font-light">
                                        Things We Like in {mainTrim?.year} {brand?.name}{" "}
                                        {model?.name}{" "}
                                    </p>
                                    {currentmodel?.highlightsList?.map((item, index) => (
                                        <li key={index}>
                                            {item.list}
                                            <div className="h-[2px] bg-gradient-to-r from-teal-600 to-black-100 mt-2 "></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full md:h-full md:w-5/12  mt-0">
                                <div className="flex flex-col w-full h-full">
                                    <Image
                                        src={
                                            currentmodel?.highlightsExteriorImage === null
                                                ? "/assets/img/car-placeholder.png"
                                                : currentmodel?.highlightsExteriorImage
                                        }
                                        alt={`exterior-image`}
                                        width={0}
                                        height={0}
                                        className="w-full h-full object-cover"
                                    />
                                    <Image
                                        src={
                                            currentmodel?.highlightsImage === null
                                                ? "/assets/img/car-placeholder.png"
                                                : currentmodel?.highlightsInteriorImage
                                        }
                                        alt={`interior-image`}
                                        width={0}
                                        height={0}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-12">
                            <Suspense fallback={<div>Loading ad...</div>}>
                                <Ad300x600 dataAdSlot={"8615289670"} />
                            </Suspense>
                        </div>
                    </section>
                )}

                {currentmodel?.key_features?.length > 0 && (
                    <div id="key-features">
                        <KeyFeatures data={currentmodel.key_features} />
                    </div>
                )}

                {/* {gallery && (
                <>
                  <Ad728x90 dataAdSlot="7369694604" />

                  <ModelVehicleGallery
                    year={year}
                    brand={brand}
                    model={model}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minFuelConsumption={minFuelConsumption}
                    maxFuelConsumption={maxFuelConsumption}
                    engineTypes={engineTypes}
                    transmissionList={transmissionList}
                    motorTypes={motorTypes}
                    mainTrimFuelType={mainTrimFuelType}
                    allTrims={allTrims}
                    mainTrim={mainTrim}
                  />
                </>
              )} */}

                {/* <Ad728x90 dataAdSlot="7369694604" /> */}
                <div
                    className="container mx-auto grid grid-cols-12 mt-14"
                    id="reviews"
                >
                    <div className="md:col-span-9 col-span-12">
                        <CarDetailReview
                            name={`${year} ${brand?.name} ${model?.name}`}
                            year={year}
                            model={model?.slug}
                            brand={brand?.slug}
                            link={`/brands/${brand?.slug}/${year}/${model?.slug}/user-reviews#reviews`}
                        />
                    </div>
                    <div className="md:col-span-3 col-span-9">
                        {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
                        <Ad300x600 dataAdSlot="3792539533" />
                    </div>
                </div>
                <div
                    className="container mx-auto grid grid-cols-12 mt-14"
                    id="faq"
                >
                    <div className="md:col-span-9 col-span-12">
                        <VehicleFaq
                            year={year}
                            brand={brand}
                            model={model}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            minFuelConsumption={minFuelConsumption}
                            maxFuelConsumption={maxFuelConsumption}
                            engineTypes={engineTypes}
                            transmissionList={transmissionList}
                            motorTypes={motorTypes}
                            mainTrimFuelType={mainTrimFuelType}
                            allTrims={allTrims}
                            mainTrim={mainTrim}
                            CarPriceRange={CarPriceRange}
                            getTransmissionType={getTransmissionType}
                        />
                    </div>
                    <div className="md:col-span-3 col-span-9">
                        {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot="3792539533" />
                        </Suspense>
                    </div>
                </div>
                {/* <Ad300x250 dataAdSlot="5772723668" />{" "}
            <div className="car-details-sidebar positionStickyAd mt-4">
              <Ad300x600 dataAdSlot="3792539533" />
            </div> */}
            </div>
            <div className="container mx-auto">
                {" "}
                <SeoLinksFilter />
            </div>
        </div>
    );
}
