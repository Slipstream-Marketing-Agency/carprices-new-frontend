
import Link from 'next/link'
import React from 'react'

export default function ChooseBrand({ brand }) {
    return (
        <div className="w-full md:px-0 px-5 md:mt-12 mt-6">
            <div className="relative flex flex-col justify-center container">
                <div className="flex flex-col justify-center">
                    <h5 className="md:text-sm  text-xs tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Choose your Brand
                    </h5>
                    <h2 className="md:text-xl text-md font-semibold capitalize">
                        Shop by car brands available in the UAE
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-md:gap-0">
                <div className="flex flex-col max-md:w-full">
                    <div className="relative  md:min-h-[519px] ">
                        <img
                            loading="lazy"
                            alt="car-side"
                            src="/assets/brand/car-side.webp"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            className="absolute -ml-8 w-full h-full md:block hidden"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center col-span-3 max-md:w-full ">
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-5">
                        {brand.map((item, index) => (
                            <Link
                                href={`/brands/${item?.slug}`}
                                key={item?.slug || item.slug || index}
                                className="flex flex-col justify-center items-center text-center text-black p-4"
                            >
                                <img
                                    loading="lazy"
                                    alt={`brand-${item?.name}`}
                                    src={`${item?.logo}`}
                                    width={90}
                                    height={90}
                                    style={{ objectFit: 'contain' }}
                                    className="aspect-square md:w-[90px] w-[80px] md:grayscale hover:filter-none"
                                />
                                <div className="md:mt-6 mt-2 font-semibold whitespace-nowrap text-xs md:text-base">
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link href="/brands">
                        <button className="flex justify-center items-center px-16 md:py-5 py-3 mt-14 max-w-full text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 active:bg-blue-700 border-solid rounded-[73px] md:w-[300px] w-full max-md:px-5 max-md:mt-10">
                            View All
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

