import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HoveredSearchNewCar = ({ brands, bodyTypes }) => {
    const subItems = [
        {
            name: 'browseNewCarGuide',
            label: 'Browse New Car Guide',
        },
        {
            name: 'brands',
            label: 'Search By Brands',
        },
        {
            name: 'bodyTypes',
            label: 'Search By Body Type',
        },
        {
            name: 'popularCar',
            label: 'Popular New Cars',
        },
    ]

    const [hoveredSection, setHoveredSection] = useState(subItems[0].name);

    return (
        <div className="tw-rounded-xl tw-shadow-xl tw-absolute tw-top-10 tw-z-50 tw-bg-white tw-border tw-border-gray-200">
            <div className="tw-flex tw-max-md:tw-flex-col">
                {/* Sidebar with Search options */}
                <div className="tw-flex tw-rounded-tl-lg tw-rounded-bl-lg tw-bg-slate-100 tw-flex-col tw-max-md:tw-ml-0 tw-max-md:tw-w-full tw-pl-6 tw-py-4">
                    <div className="tw-flex tw-flex-col tw-max-md:tw-mt-10">
                        <div className="tw-flex tw-flex-col tw-gap-0 tw-text-sm tw-leading-6 tw-text-slate-800 tw-w-[250px] tw-overflow-y-auto">
                            {subItems.map((item, i) => (
                                <div className="tw-flex tw-justify-between tw-py-1 tw-px-0">
                                    <div className="tw-flex tw-w-full">
                                        <span
                                            className={`tw-w-full tw-text-left tw-font-semibold tw-text-base tw-py-2 tw-px-2 tw-rounded-tl-lg tw-rounded-bl-lg tw-cursor-pointer tw-transition-colors tw-duration-300 ${hoveredSection === item.name ? 'tw-bg-white tw-text-blue-500' : 'tw-bg-slate-100 tw-text-gray-700'}`}
                                            onMouseEnter={() => setHoveredSection(item.name)}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-bg-white tw-max-md:tw-ml-0 tw-max-md:tw-w-full tw-rounded-tr-lg tw-rounded-br-lg tw-border-l tw-border-gray-200">
                    <div className="tw-flex tw-flex-col tw-max-md:tw-mt-10 tw-w-[590px] tw-p-6 tw-overflow-y-auto">
                        {/* Conditionally render the lists */}
                        {hoveredSection === 'brands' && (
                            <div className="tw-bg-white tw-rounded-lg">
                                <h5 className="tw-text-sm tw-font-semibold tw-text-gray-400">Cars by Brand</h5>
                                <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-mb-4">
                                    {brands?.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="tw-text-center tw-bg-gray-50 tw-p-2 tw-rounded-lg tw-shadow-sm hover:tw-shadow-lg tw-transition-shadow tw-duration-300 tw-cursor-pointer"
                                            onMouseDown={(e) => e.currentTarget.classList.add('tw-scale-95')}
                                            onMouseUp={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                        >
                                            <Link href={`/brands/${item?.slug}`}>
                                                <div className="tw-flex tw-items-center tw-flex-col">
                                                    <div className="icon">
                                                        <Image
                                                            alt={`brand-${item?.name}`}
                                                            src={item?.logo}
                                                            width={45}
                                                            height={45}
                                                            sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                            layout="intrinsic"
                                                            className="tw-object-contain tw-aspect-square md:tw-w-[45px] tw-w-[40px]"
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h5 className="tw-text-sm tw-font-medium tw-text-gray-800">{item?.name}</h5>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/search-cars" className="tw-text-blue-600 tw-font-bold tw-px-2 hover:tw-text-blue-700">
                                    View All <span className="tw-font-extrabold">→</span>
                                </Link>
                            </div>
                        )}

                        {hoveredSection === 'bodyTypes' && (
                            <div className="tw-bg-white tw-rounded-lg">
                                <h5 className="tw-text-sm tw-font-semibold tw-text-gray-400">Body Types</h5>
                                <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-mb-4">
                                    {bodyTypes.map((bodyType, index) => (
                                        <Link href={`/category/${bodyType?.slug}`} key={index}>
                                            <div
                                                className="tw-text-center tw-bg-gray-50 tw-p-2 tw-rounded-lg tw-shadow-sm hover:tw-shadow-lg tw-transition-shadow tw-duration-300 tw-cursor-pointer"
                                                onMouseDown={(e) => e.currentTarget.classList.add('tw-scale-95')}
                                                onMouseUp={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                            >
                                                <div className="tw-flex tw-items-center tw-flex-col">
                                                    <div className="icon">
                                                        <Image
                                                            alt={`category-${bodyType?.name}`}
                                                            src={bodyType?.image}
                                                            width={45}
                                                            height={45}
                                                            sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                            layout="intrinsic"
                                                            className="tw-object-contain tw-aspect-square md:tw-w-[45px] tw-w-[40px]"
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h5 className="tw-text-sm tw-font-medium tw-text-gray-800">{bodyType?.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/search-cars" className="tw-text-blue-600 tw-font-bold tw-px-2 hover:tw-text-blue-700">
                                    View All <span className="tw-font-extrabold">→</span>
                                </Link>
                            </div>
                        )}

                        {hoveredSection === 'browseNewCarGuide' && (
                            <div className="tw-bg-white tw-rounded-lg">
                                <div className="tw-grid md:tw-grid-cols-2 tw-gap-8 tw-mb-4">
                                    {/* Body Types Section */}
                                    <div>
                                        <h6 className="tw-text-sm tw-font-semibold tw-text-gray-400">Browse Cars by Body Style</h6>
                                        <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-2">
                                            {bodyTypes.map((bodyType, index) => (
                                                <Link href={`/category/${bodyType?.slug}`} key={index}>
                                                    <div
                                                        className="tw-text-center tw-bg-gray-50 tw-p-0 tw-rounded-lg tw-shadow-sm hover:tw-shadow-lg tw-transition-shadow tw-duration-300 tw-cursor-pointer"
                                                        onMouseDown={(e) => e.currentTarget.classList.add('tw-scale-95')}
                                                        onMouseUp={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                        onMouseLeave={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                    >
                                                        <div className="tw-flex tw-items-center tw-flex-col">
                                                            <div className="icon">
                                                                <Image
                                                                    alt={`category-${bodyType?.name}`}
                                                                    src={bodyType?.image}
                                                                    width={35}
                                                                    height={35}
                                                                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                                    layout="intrinsic"
                                                                    className="tw-object-contain tw-aspect-square md:tw-w-[35px] tw-w-[30px]"
                                                                />
                                                            </div>
                                                            <div className="content">
                                                                <h5 className="tw-text-sm tw-font-medium tw-text-gray-800">{bodyType?.name}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/search-cars" className="tw-text-blue-600 tw-font-bold tw-px-2 hover:tw-text-blue-700">
                                            See all Body Styles <span className="tw-font-extrabold">→</span>
                                        </Link>
                                    </div>

                                    {/* Brands Section */}
                                    <div>
                                        <h6 className="tw-text-sm tw-font-semibold tw-text-gray-400">Browse Cars by Brand</h6>
                                        <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-2">
                                            {brands.map((brand, index) => (
                                                <Link href={`/brands/${brand?.slug}`} key={index}>
                                                    <div
                                                        className="tw-text-center tw-bg-gray-50 tw-p-0 tw-rounded-lg tw-shadow-sm hover:tw-shadow-lg tw-transition-shadow tw-duration-300 tw-cursor-pointer"
                                                        onMouseDown={(e) => e.currentTarget.classList.add('tw-scale-95')}
                                                        onMouseUp={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                        onMouseLeave={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                    >
                                                        <div className="tw-flex tw-items-center tw-flex-col">
                                                            <div className="icon">
                                                                <Image
                                                                    alt={`brand-${brand?.name}`}
                                                                    src={brand?.logo}
                                                                    width={35}
                                                                    height={35}
                                                                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                                    layout="intrinsic"
                                                                    className="tw-object-contain tw-aspect-square md:tw-w-[35px] tw-w-[30px]"
                                                                />
                                                            </div>
                                                            <div className="content">
                                                                <h5 className="tw-text-sm tw-font-medium tw-text-gray-800">{brand?.name}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/search-cars" className="tw-text-blue-600 tw-font-bold tw-px-2 hover:tw-text-blue-700">
                                            See all Brands <span className="tw-font-extrabold">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        {hoveredSection === 'popularCar' && (
                            <div className="tw-bg-white tw-rounded-lg">
                                <div className="tw-grid md:tw-grid-cols-2 tw-gap-8 tw-mb-4">
                                    {/* Body Types Section */}
                                    <div>
                                        <h6 className="tw-text-sm tw-font-semibold tw-text-gray-400">Browse Popular Cars</h6>
                                        <div className="tw-grid tw-grid-cols-1 tw-gap-1 tw-my-2">
                                            {bodyTypes.map((bodyType, index) => (
                                                <Link href={`/category/${bodyType?.slug}`} key={index}>
                                                    <div
                                                        className="tw-flex tw-items-center tw-bg-gray-100 tw-border tw-border-gray-600 tw-px-3 tw-py-2 tw-rounded-full tw-shadow-sm hover:tw-shadow-lg tw-transition-shadow tw-duration-300 tw-cursor-pointer"
                                                        onMouseDown={(e) => e.currentTarget.classList.add('tw-scale-95')}
                                                        onMouseUp={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                        onMouseLeave={(e) => e.currentTarget.classList.remove('tw-scale-95')}
                                                    >
                                                        <div className="tw-flex tw-items-center tw-flex-grow">
                                                            {/* Body Type Name */}
                                                            <span className="tw-text-sm tw-font-medium tw-text-gray-800">{bodyType?.name}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/search-cars" className="tw-text-blue-600 tw-font-bold tw-px-2 hover:tw-text-blue-700">
                                            See all Cars <span className="tw-font-extrabold">→</span>
                                        </Link>
                                    </div>

                                    {/* Brands Section (if you want to add similar styling for brands) */}
                                    <div>
                                        {/* Add content for the Brands Section here if needed */}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );

};

export default HoveredSearchNewCar;
