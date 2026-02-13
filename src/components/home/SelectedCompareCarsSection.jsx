"use client"
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PrimaryButton from '../buttons/PrimaryButton';

// Helper: resolve relative upload URLs to absolute Strapi URLs
function resolveImageUrl(url) {
    if (!url) return "/assets/img/car-placeholder.png";
    if (url.startsWith("http")) return url;
    // Relative URL like /uploads/... — prepend Strapi origin
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
    const origin = apiBase.replace(/\/api\/?$/, "");
    return `${origin}${url}`;
}

export default function SelectedCompareCarsSection({ comparisons = [] }) {
    const Arrow = ({ className, onClick, direction }) => (
        <div className={`custom-arrow custom-${direction}-arrow text-black`} onClick={onClick}>
            <span>{direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</span>
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        draggable: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (!comparisons || comparisons.length === 0) return null;

    return (
        <div className="w-full md:px-0 px-5 md:mt-12 mt-6">
            <div className="relative flex justify-between container">
                <div className="flex flex-col justify-center mb-6">
                    <h5 className="md:text-sm text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Discover the Ultimate Rivalry
                    </h5>
                    <h2 className="md:text-lg text-md font-semibold capitalize">
                        Top Car Comparisons to Help You Decide
                    </h2>
                </div>
            </div>
            <div className="container">
                <Slider {...sliderSettings}>
                    {comparisons.map((comparison) => {
                        if (!comparison.carModels || comparison.carModels.length < 2) return null;
                        if (!comparison.carModels[0]?.highTrim || !comparison.carModels[1]?.highTrim) return null;

                        const firstCarSlug = comparison.carModels[0].highTrim.mainSlug;
                        const secondCarSlug = comparison.carModels[1].highTrim.mainSlug;
                        const comparisonUrl = `/compare-cars/${firstCarSlug}-vs-${secondCarSlug}`;

                        return (
                            <div key={comparison.id} className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg mx-2">
                                <div className="flex flex-col md:flex-row justify-center items-center relative w-full">
                                    <div className="hidden absolute md:block inset-x-0 top-1/4 bottom-1/4 mx-auto w-px bg-gray-300 opacity-50"></div>
                                    
                                    {comparison.carModels[0] && (
                                        <div className="flex flex-col items-center mb-4 md:mb-0 w-full">
                                            <div className="text-sm leading-4 text-neutral-900 xl:px-3 w-full">
                                                <Image
                                                    src={resolveImageUrl(comparison.carModels[0].highTrim.featuredImage)}
                                                    alt={comparison.carModels[0].name}
                                                    width={245}
                                                    height={140}
                                                    sizes="(max-width: 768px) 100vw, 245px"
                                                    className="w-full h-40 object-contain rounded-lg"
                                                />
                                            </div>
                                            <div className="px-2 mt-3 w-full xl:px-3">
                                                <h6 className="text-xs tracking-wider leading-4 text-blue-600 uppercase font-bold">
                                                    {comparison.carModels[0].brand?.name}
                                                </h6>
                                                <h4 className="text-base text-gray-900 font-semibold xl:text-lg">
                                                    {comparison.carModels[0].name}
                                                </h4>
                                                <span className="text-neutral-900 font-bold md:text-[21px]">
                                                    AED {comparison.carModels[0].minPrice?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mx-4 text-center flex flex-col justify-center">
                                        <div className="bg-blue-600 rounded-full px-3 z-10 p-2">
                                            <div className="text-base font-bold text-white">Vs</div>
                                        </div>
                                    </div>

                                    {comparison.carModels[1] && (
                                        <div className="flex flex-col items-center w-full">
                                            <div className="text-sm leading-4 text-neutral-900 xl:px-3 w-full">
                                                <Image
                                                    src={resolveImageUrl(comparison.carModels[1].highTrim.featuredImage)}
                                                    alt={comparison.carModels[1].name}
                                                    width={245}
                                                    height={140}
                                                    sizes="(max-width: 768px) 100vw, 245px"
                                                    className="w-full h-40 object-contain rounded-lg"
                                                />
                                            </div>
                                            <div className="px-2 mt-3 w-full xl:px-3">
                                                <h6 className="text-xs tracking-wider leading-4 text-blue-600 uppercase font-bold">
                                                    {comparison.carModels[1].brand?.name}
                                                </h6>
                                                <h4 className="text-base text-gray-900 font-semibold xl:text-lg">
                                                    {comparison.carModels[1].name}
                                                </h4>
                                                <span className="text-neutral-900 font-bold md:text-[21px]">
                                                    AED {comparison.carModels[1].minPrice?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <PrimaryButton label={`Compare Now`} href={comparisonUrl} additionalClass="w-full mt-4" />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className="flex justify-center w-full mt-6">
                <PrimaryButton label="Compare More Cars" href="/compare-cars" />
            </div>
        </div>
    );
}
