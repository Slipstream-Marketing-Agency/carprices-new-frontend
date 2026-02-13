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
        // {
        //     name: 'popularCar',
        //     label: 'Popular New Cars',
        // },
    ]

    const [hoveredSection, setHoveredSection] = useState(subItems[0].name);

    return (
        <div className="rounded-xl shadow-xl absolute top-6 z-[60] bg-white border border-gray-200">
            <div className="flex max-md:flex-col">
                {/* Sidebar with Search options */}
                <div className="flex rounded-tl-lg rounded-bl-lg bg-slate-100 flex-col max-md:ml-0 max-md:w-full pl-6 py-4">
                    <div className="flex flex-col max-md:mt-10">
                        <div className="flex flex-col gap-0 text-sm leading-6 text-slate-800 w-[250px] overflow-y-auto">
                            {subItems.map((item, i) => (
                                <div className="flex justify-between py-1 px-0" key={i}>
                                    <div className="flex w-full">
                                        <span
                                            className={`w-full text-left font-semibold text-base py-2 px-2 rounded-tl-lg rounded-bl-lg cursor-pointer transition-colors duration-300 ${hoveredSection === item.name ? 'bg-white text-blue-500' : 'bg-slate-100 text-gray-700'}`}
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

                <div className="flex flex-col bg-white max-md:ml-0 max-md:w-full rounded-tr-lg rounded-br-lg border-l border-gray-200">
                    <div className="flex flex-col max-md:mt-10 w-[590px] p-6 overflow-y-auto">
                        {/* Conditionally render the lists */}
                        {hoveredSection === 'brands' && (
                            <div className="bg-white rounded-lg">
                                <h5 className="text-sm font-semibold text-gray-400">Cars by Brand</h5>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {brands?.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="text-center bg-gray-50 p-2 rounded-lg hover:shadow-custom-shadow transition-shadow duration-300 cursor-pointer"
                                            onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                            onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                        >
                                            <Link href={`/brands/${item?.slug}`}>
                                                <div className="flex items-center flex-col">
                                                    <div className="icon">
                                                        <Image
                                                            alt={`brand-${item?.name}`}
                                                            src={item?.logo}
                                                            width={45}
                                                            height={45}
                                                            sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                            layout="intrinsic"
                                                            className="object-contain aspect-square md:w-[45px] w-[40px]"
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <span className="text-xs font-medium text-gray-800">{item?.name}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/brands" className="text-blue-600 font-bold px-2 hover:text-blue-700">
                                    View All <span className="font-extrabold">→</span>
                                </Link>
                            </div>
                        )}

                        {hoveredSection === 'bodyTypes' && (
                            <div className="bg-white rounded-lg">
                                <h5 className="text-sm font-semibold text-gray-400">Body Types</h5>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {bodyTypes.map((bodyType, index) => (
                                        <Link href={`/body-types/${bodyType?.slug}`} key={bodyType?.slug || bodyType.slug || index}>
                                            <div
                                                className="text-center bg-gray-50 p-2 rounded-lg shadow-sm hover:shadow-custom-shadow transition-shadow duration-300 cursor-pointer"
                                                onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                                onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                                onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                            >
                                                <div className="flex items-center flex-col">
                                                    <div className="icon">
                                                        <Image
                                                            alt={`category-${bodyType?.name}`}
                                                            src={bodyType?.image}
                                                            width={45}
                                                            height={45}
                                                            sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                            layout="intrinsic"
                                                            className="object-contain aspect-square md:w-[45px] w-[40px]"
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <span className="text-xs font-medium text-gray-800">{bodyType?.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/body-types" className="text-blue-600 font-bold px-2 hover:text-blue-700">
                                    View All <span className="font-extrabold">→</span>
                                </Link>
                            </div>
                        )}

                        {hoveredSection === 'browseNewCarGuide' && (
                            <div className="bg-white rounded-lg">
                                <div className="grid md:grid-cols-2 gap-8 mb-4">
                                    {/* Body Types Section */}
                                    <div>
                                        <h6 className="text-sm font-semibold text-gray-400">Browse Cars by Body Style</h6>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            {bodyTypes.map((bodyType, index) => (
                                                <Link href={`/body-types/${bodyType?.slug}`} key={bodyType?.slug || bodyType.slug || index}>
                                                    <div
                                                        className="text-center bg-gray-50 p-0 rounded-lg shadow-sm hover:shadow-custom-shadow transition-shadow duration-300 cursor-pointer"
                                                        onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                                        onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                                        onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                                    >
                                                        <div className="flex items-center flex-col">
                                                            <div className="icon">
                                                                <Image
                                                                    alt={`category-${bodyType?.name}`}
                                                                    src={bodyType?.image}
                                                                    width={35}
                                                                    height={35}
                                                                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                                    layout="intrinsic"
                                                                    className="object-contain aspect-square md:w-[35px] w-[30px]"
                                                                />
                                                            </div>
                                                            <div className="content">
                                                                <span className="text-xs font-medium text-gray-800">{bodyType?.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/body-types" className="text-blue-600 font-bold px-2 hover:text-blue-700">
                                            See all Body Styles <span className="font-extrabold">→</span>
                                        </Link>
                                    </div>

                                    {/* Brands Section */}
                                    <div>
                                        <h6 className="text-sm font-semibold text-gray-400">Browse Cars by Brand</h6>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            {brands.map((brand, index) => (
                                                <Link href={`/brands/${brand?.slug}`} key={brand?.slug || brand.slug || index}>
                                                    <div
                                                        className="text-center bg-gray-50 p-0 rounded-lg shadow-sm hover:shadow-custom-shadow transition-shadow duration-300 cursor-pointer"
                                                        onMouseDown={(e) => e.currentTarget.classList.add('scale-95')}
                                                        onMouseUp={(e) => e.currentTarget.classList.remove('scale-95')}
                                                        onMouseLeave={(e) => e.currentTarget.classList.remove('scale-95')}
                                                    >
                                                        <div className="flex items-center flex-col">
                                                            <div className="icon">
                                                                <Image
                                                                    alt={`brand-${brand?.name}`}
                                                                    src={brand?.logo}
                                                                    width={35}
                                                                    height={35}
                                                                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 90px, 100vw"
                                                                    layout="intrinsic"
                                                                    className="object-contain aspect-square md:w-[35px] w-[30px]"
                                                                />
                                                            </div>
                                                            <div className="content">
                                                                <span className="text-xs font-medium text-gray-800">{brand?.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/brands" className="text-blue-600 font-bold px-2 hover:text-blue-700">
                                            See all Brands <span className="font-extrabold">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        {hoveredSection === 'popularCar' && (
                            <div className="bg-white rounded-lg">
                                {/* Body Types Section */}
                                <div>
                                    <h6 className="text-sm font-semibold text-gray-400">Browse Popular Cars</h6>
                                    <div className="grid grid-cols-3 gap-2 my-2">
                                        {bodyTypes.slice(1).map((bodyType, index) => (
                                            <div key={`bodyType-${index}`} className="flex shadow-sm hover:shadow-custom-shadow flex-col py-2 rounded-lg items-center mb-4 md:mb-0">
                                                <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                                    <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                                        height="0"
                                                        sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                                                </div>
                                                <div className="flex flex-col px-2 mt-3 w-full xl:flex-grow">
                                                    <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                                        Volvo XC40
                                                    </h6>
                                                    <div className="flex justify-between items-center">
                                                        <span className="m-0 text-neutral-900 font-bold text-[10px] ">AED 423,543</span>
                                                        <Link href="/compare-cars">
                                                            <button className="flex justify-center p-1 items-cent max-w-full text-xs leading-0 text-center text-white bg-blue-600 border border-blue-600 active:bg-blue-700 border-solid rounded-full w-full">
                                                                View Details
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/search-cars" className="text-blue-600 font-bold px-2 hover:text-blue-700">
                                        See all Cars <span className="font-extrabold">→</span>
                                    </Link>
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
