import React from 'react'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesAdComponent() {
    return (
        <div><div className=" container sm:grid grid-cols-2 w-full gap-4 space-y-4 sm:space-y-0">
            <div className="bg-gradient-to-tl from-blue-800 via-blue-600 to-blue-700  rounded-2xl p-4 sm:p-6 text-white flex relative overflow-hidden custom-gradient">
                <div>
                    <div className="font-semibold sm:text-2xl  capitalize">
                        calculate your car loan EMI
                    </div>
                    <div className="  text-xs sm:text-sm mb-6 w-[60%] sm:w-2/3 opacity-80 mt-1">
                        Input your loan amount, interest rate, and loan term to get
                        instant results.
                    </div>
                    <Link href="/loan-calculator">
                        <button className=" text-sm capitalize  bg-transparent text-white mt-16">
                            Calculate Now
                        </button>
                    </Link>
                    <ArrowForwardIcon fontSize="small" className="mx-2" />
                </div>
                <Image
                    className="object-contain min-h-0 absolute sm:bottom-6 sm:left-56 bottom-10 left-40 w-[60%] h-[60%] xl:w-[75%] xl:h-[75%]"
                    src="https://cdn.carprices.ae/assets/car_Loan_EMI_icon_97f07e7ea8.png"
                    alt="car_Loan_EMI-icon"
                    width={200}  // Adjust to match your image's original width
                    height={200} // Adjust to match your image's original height
                    loading="lazy"        // Lazy loads the image for performance optimization
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw"
                />
            </div>
            <div className="bg-gradient-to-tl from-gray-700 via-gray-800 to-black  rounded-2xl p-4 sm:p-6 text-white flex relative overflow-hidden custom-gradient">
                <div>
                    <div className=" font-semibold sm:text-2xl  capitalize ">
                        Know your car's worth
                    </div>
                    <div className="  text-xs sm:text-sm mb-6 w-[60%] sm:w-2/3 opacity-80 mt-1">
                        Input your car's details to receive an instant valuation based
                        on real-time market data.
                    </div>
                    <Link href="/insurance-calculator">
                        <button className=" text-sm capitalize  bg-transparent text-white mt-16">
                            Value My Car
                        </button>
                    </Link>
                    <ArrowForwardIcon fontSize="small" className="mx-2" />
                </div>
                <Image
                    src={
                        "https://cdn.carprices.ae/assets/car_Worth_icon_9226a22e4a.png"
                    }
                    alt="car_worth-icon"
                    className="object-contain min-h-0 absolute sm:bottom-6 sm:left-56 bottom-10 left-40 w-[60%] h-[60%] xl:w-[75%] xl:h-[75%]"
                    width={200}  // Adjust to match your image's original width
                    height={200} // Adjust to match your image's original height
                    loading="lazy"        // Lazy loads the image for performance optimization
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw"
                />
            </div>
        </div></div>
    )
}
