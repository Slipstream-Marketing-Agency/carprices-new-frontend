import Image from 'next/image'
import React from 'react'

export default function Banner({ setShowModal }) {
    return (
        <>
            <h1 className="text-3xl mb-4 sm:text-3xl font-semibold">
                Car Loan Calculator UAE
            </h1>
            <div className="bg-gradient-to-tl to-[#275BA7] via-[#275BA7] from-[#77cdf2]  rounded-2xl md:p-10 p-8 text-white flex relative overflow-hidden custom-gradient">
                <div>
                    <div className="text-4xl md:w-[90%] capitalize">
                        Choose the car to calculate loan EMI
                    </div>
                    <div className=" mb-6 md:w-[90%] opacity-80 mt-3">
                        Get a quick breakdown of your monthly payments and make an informed
                        decision on your next ride.
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="border-solid border bg-transparent text-white rounded-3xl p-2 px-6 my-4"
                    >
                        Choose Car Now
                    </button>
                </div>
                <Image
                    className="object-contain min-h-0 absolute bottom-0 right-0 hidden md:block"
                    src={"/carLoanPage/carImage.png"}
                    alt="car-image"
                    height={380}
                    width={380}
                />
            </div>
        </>
    )
}
