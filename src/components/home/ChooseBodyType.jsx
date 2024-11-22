import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ChooseBodyType({ bodyTypes }) {
    return (
        <div className="container md:my-20 my-4 px-5">
            <div className="flex justify-between items-start gap-5 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col max-md:max-w-full">
                    <h5 className="md:text-sm  text-xs  tracking-wider leading-5 text-blue-600 uppercase font-bold">
                        Choose by body type
                    </h5>
                    <h2 className="md:text-xl text-md font-semibold capitalize">
                        Explore new cars based on body type
                    </h2>
                </div>
                {/* <button className="px-6 py-3 mt-4 text-base tracking-tight leading-4 text-center rounded-[119px] text-neutral-900">
                View More
              </button> */}
            </div>

            <div className="grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-8 md:mt-10 mt-5 max-w-full">
                {bodyTypes.map((item, index) => (
                    <Link href={`/body-types/${item?.slug}`} key={index}>
                        <div className="flex flex-col justify-center items-center text-center text-black">
                            <div className="w-full md:h-32 sm:h-24 overflow-hidden">
                                <Image
                                    loading="lazy"
                                    src={item?.image}
                                    width={300}
                                    height={200}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 100vw"
                                    alt={`category-${item?.name}`}
                                    className="object-contain w-full h-full transition-all duration-300 md:py-3 md:px-3 py-1 px-1"
                                />
                            </div>
                            <div className=" font-semibold text-xs md:text-base">
                                {item.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
