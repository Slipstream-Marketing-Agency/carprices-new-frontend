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
import StarIcon from '@mui/icons-material/Star';
import MainPriceComponent from "./PriceComponent/PriceComponent";
import axios from "axios";
import Ad300X250 from "../ads/Ad300x250";
import RelatedArticles from "../articles-component/RelatedArticles";

export default function ModelWrapper({ oldModel, currentmodel, seoData, parentPage = 'basic', activeTab = '' }) {
    const [currentURL, setCurrentURL] = useState("");
    console.log(currentmodel,'currentmodel')

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

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-reviews?carModelSlug=${currentmodel.slug}`);
                const data = response.data;

                setReviews(data);

                // Calculate the average rating
                const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
                setAverageRating(totalRating / data.length || 0);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [currentmodel]);

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
    const [activeLink, setActiveLink] = useState(activeTab);

    const handleLinkClick = (href) => {
        setActiveLink(href);
    };


    return (
        <div>
            <div className="grid grid-cols-12 gap-4 mx-auto container">
                <div className="col-span-12 lg:col-span-5">
                    <ImageSlider mainTrim={mainTrim} />
                </div>

                <div className="col-span-12 lg:col-span-7 md:pl-10">
                    <div className="relative flex flex-col md:flex-row items-center gap-2 flex-wrap">
                        <h1 className="g font-semibold md:text-2xl">
                            {mainTrim?.year} {brand?.name} {model?.name}{" "}
                            <span className="text-[18px] font-light">
                                {/* Variants ({allTrims?.length}) */}
                            </span>
                        </h1>
                        <Link href={`/brands/${brand?.slug}/${year}/${model?.slug}/user-reviews#user-reviews`} className="flex items-center gap-2 rounded-full border border-gray-300 p-1 shadow-sm">
                            <span className="text-sm">
                                <StarIcon sx={{ color: '#f79712' }} className='h-4 w-4' />
                                {averageRating ? averageRating.toFixed(1) : '0.0'}/5 |
                            </span>

                            <p className="text-blue-500 text-sm uppercase mr-1">{reviews.length} Reviews</p>
                        </Link>
                    </div>
                    <div className="md:my-3 my-3">
                        <h2 className="md:text-lg font-semibold">
                            <CarPriceRange />
                        </h2>
                        <p className="font-medium text-gray-500 mt-3">
                            <CarEMIDisplay />
                            /Monthly EMI*{" "}
                        </p>
                        {/* <div className='absolute right-4  md:block hidden'>
                            <Ad300X250 dataAdSlot="5772723668" />
                        </div> */}
                    </div>
                    <div className="my-4">
                        <div className="grid grid-cols-3 gap-4 md:w-[70%]">
                            {[
                                {
                                    label: mainTrimFuelType === "Electric" ? "Motor Type" : t.NoOfCylinders,
                                    value: mainTrimFuelType === "Electric" ? motorTypes : cylinderList,
                                },
                                {
                                    label: t.transmission,
                                    value: transmissionList,
                                },
                                {
                                    label: `${t.power} (hp)`,
                                    value: minPower === maxPower ? Number(minPower).toLocaleString("en-US", {maximumFractionDigits:0}) : `${Number(minPower).toLocaleString("en-US", {maximumFractionDigits:0})} to ${Number(maxPower).toLocaleString("en-US", {maximumFractionDigits:0})}`,
                                },
                                {
                                    label: `${t.torque} (Nm)`,
                                    value: minTorque === maxTorque ? Number(minTorque).toLocaleString("en-US", {maximumFractionDigits:0}) : `${Number(minTorque).toLocaleString("en-US", {maximumFractionDigits:0})} to ${Number(maxTorque).toLocaleString("en-US", {maximumFractionDigits:0})}`,
                                },
                                {
                                    label: t.seats,
                                    value: seatList,
                                },
                                {
                                    label: t.fuelType,
                                    value: mainTrimFuelType,
                                },
                            ].map((item, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                                    <h6 className="font-medium text-[10px] md:text-sm text-gray-600 mb-1">{item.label}</h6>
                                    <h5 className="text-gray-800 text-sm md:text-base font-semibold">{item.value}</h5>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PrimaryButton label={`View All ${allTrims?.length} Variants`} href={"#variants&prices"} />
                </div>
            </div>
            <div className="sticky top-0 z-20">
                <nav className="text-sm md:text-base leading-none text-black bg-zinc-50 shadow my-6 overflow-x-scroll custom-scrollbar">
                    <div className="mx-auto container flex gap-7 items-center">
                        <Link
                            href={`/brands/${brand?.slug}/${year}/${model?.slug}`}
                            className={`gap-2.5 py-5 self-stretch p-2.5 h-full whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#modelname"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            {brand.name} {model.name}
                        </Link>
                        <Link
                            // href="#specs"
                            // onClick={() => handleLinkClick("#specs")}
                            href={`/brands/${brand?.slug}/${year}/${model?.slug}/specs#specs`}
                            onClick={() => handleLinkClick("#specs")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 h-full whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#specs"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Specs
                        </Link>
                        <Link
                            // href="#variants&prices"
                            // onClick={() => handleLinkClick("#variants&prices")}
                            href={`/brands/${brand?.slug}/${year}/${model?.slug}/variants#variants&prices`}
                            onClick={() => handleLinkClick("#variants&prices")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#variants&prices"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Variants & prices
                        </Link>
                        <Link
                            // href="#price"
                            // onClick={() => handleLinkClick("#price")}
                            href={`/brands/${brand?.slug}/${year}/${model?.slug}/price#price`}
                            onClick={() => handleLinkClick("#price")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#price"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Price
                        </Link>
                        <Link
                            href={`/brands/${brand?.slug}/${year}/${model?.slug}/user-reviews#user-reviews`}
                            onClick={() => handleLinkClick("#user-reviews")}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#user-reviews"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            User Reviews
                        </Link>
                        {/* <Link
                            href={`/brands/${brand.slug}/${mainTrim.year}/${model.slug}/video`}
                            className={`gap-2.5 py-5 self-stretch p-2.5 my-auto whitespace-nowrap border-0 border-b-2 border-solid ${activeLink === "#video"
                                ? "border-b-blue-600 text-black"
                                : "border-transparent text-gray-500"
                                }`}
                        >
                            Videos
                        </Link> */}
                        <Link
                            // href="#faq"
                            // onClick={() => handleLinkClick("#faq")}
                            href={`/brands/${brand?.slug}/${year}/${model?.slug}/faq#faq`}
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
            {/* {
                (parentPage === 'basic' || parentPage === 'specs') && <div
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
                            <Ad728x90 dataAdSlot={"2246434169"} />
                        </Suspense>
                    </div>
                    <div className="md:col-span-3 col-span-12">
                        <Suspense fallback={<div>Loading ad...</div>}>
                            <Ad300x600 dataAdSlot={"5778656502"} />
                        </Suspense>
                    </div>
                </div>
            } */}

            <div className="container mx-auto mt-10">
                <div>
                    <div className="container mx-auto grid grid-cols-12">
                        <div className="md:col-span-9 col-span-12">
                            {
                                (parentPage === 'basic' || parentPage === 'specs') &&
                                <div id="specs">
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
                                </div>
                            }
                            {
                                (parentPage === 'basic' || parentPage === 'variants&prices') &&
                                <div id="variants&prices">
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
                                    <OldModel model={oldModel} currentYear={year} />
                                    <div className="mt-14">
                                        <Ad728x90 dataAdSlot={"9526329827"} />
                                    </div>
                                </div>
                            }
                            {
                                (parentPage === 'basic' || parentPage === 'price') &&
                                <div id="price" className="mt-14">
                                    <MainPriceComponent currentmodel={currentmodel} year={year} />
                                </div>
                            }
                            {
                                (parentPage === 'basic' || parentPage === 'related-articles') &&
                                <div>
                                    <RelatedArticles type='article' slug={brand?.slug} />
                                </div>
                            }
                            {
                                (parentPage === 'basic' || parentPage === 'user-reviews') &&
                                <div id="reviews" className="mt-14">
                                    <CarDetailReview
                                        averageRating={averageRating}
                                        reviews={reviews}
                                        name={`${brand?.name} ${model?.name}`}
                                        year={year}
                                        model={model?.slug}
                                        brand={brand?.slug}
                                        link={`/brands/${brand?.slug}/${year}/${model?.slug}/user-reviews#reviews`}
                                        fromReviewPage={parentPage === 'user-reviews'}
                                    />
                                </div>
                            }
                            {
                                (parentPage === 'faq' || parentPage === 'basic') &&
                                <div id="faqs" className="mt-14">
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
                            }
                        </div>
                        <div className="md:col-span-3 col-span-9">
                            {/* <Ad300x250 dataAdSlot="5772723668" />{" "} */}
                            <div className='my-6 pt-20 sticky top-0'>
                                <Ad300x600 dataAdSlot="2960921471" />
                            </div>
                        </div>
                    </div>
                    {/* <div className="container mx-auto grid grid-cols-12 mt-10">
                            <div className="md:col-span-9 col-span-12">
                                <OldModel model={oldModel} />
                                <div className="mt-14">
                                    <Ad728x90 dataAdSlot={"9526329827"} />
                                </div>
                            </div>
                            <div className="md:col-span-3 col-span-12">
                                <Suspense fallback={<div>Loading ad...</div>}>
                                    <Ad300x600 dataAdSlot={"2960921471"} />
                                </Suspense>
                            </div>
                        </div> */}
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
                                <Ad300x600 dataAdSlot={"2178049771"} />
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
