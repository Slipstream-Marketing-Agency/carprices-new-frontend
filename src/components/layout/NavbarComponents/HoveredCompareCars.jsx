import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const HoveredCompareCars = () => {

    const compareCarInfo = [
        {
            car1: {

            }
        }
    ]

    return (
        <div className="rounded-xl shadow-xl absolute top-10 w-[840px] z-50 bg-white border border-gray-200">
            <h4 className="text-sm font-semibold text-blue-700 p-4">Compare Cars</h4>
            <div className="grid md:grid-cols-2 gap-4 p-4">
                <div className="flex flex-col items-center bg-white p-4 hover:shadow-custom-shadow rounded-lg">
                    <div className="flex flex-col md:flex-row justify-center items-center relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="hidden absolute md:block inset-x-0 top-1/4 bottom-1/4 mx-auto w-px bg-gray-300 opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="flex flex-col items-center mb-4 md:mb-0">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="mx-4 text-center flex flex-col justify-center">
                            <div className="bg-blue-600 rounded-full z-10 h-6 w-6 flex items-center justify-center">
                                <div className="text-[0.7rem] font-bold text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="w-full">
                        <button className="flex justify-center items-center px-2 py-2 mt-1 max-w-full text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 active:bg-blue-700 border-solid rounded-[73px] w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center bg-white p-4 hover:shadow-custom-shadow rounded-lg">
                    <div className="flex flex-col md:flex-row justify-center items-center relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="hidden absolute md:block inset-x-0 top-1/4 bottom-1/4 mx-auto w-px bg-gray-300 opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="flex flex-col items-center mb-4 md:mb-0">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="mx-4 text-center flex flex-col justify-center">
                            <div className="bg-blue-600 rounded-full z-10 h-6 w-6 flex items-center justify-center">
                                <div className="text-[0.7rem] font-bold text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="w-full">
                        <button className="flex justify-center items-center px-2 py-2 mt-1 max-w-full text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 active:bg-blue-700 border-solid rounded-[73px] w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center bg-white p-4 hover:shadow-custom-shadow rounded-lg">
                    <div className="flex flex-col md:flex-row justify-center items-center relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="hidden absolute md:block inset-x-0 top-1/4 bottom-1/4 mx-auto w-px bg-gray-300 opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="flex flex-col items-center mb-4 md:mb-0">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="mx-4 text-center flex flex-col justify-center">
                            <div className="bg-blue-600 rounded-full z-10 h-6 w-6 flex items-center justify-center">
                                <div className="text-[0.7rem] font-bold text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="w-full">
                        <button className="flex justify-center items-center px-2 py-2 mt-1 max-w-full text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 active:bg-blue-700 border-solid rounded-[73px] w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center bg-white p-4 hover:shadow-custom-shadow rounded-lg">
                    <div className="flex flex-col md:flex-row justify-center items-center relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="hidden absolute md:block inset-x-0 top-1/4 bottom-1/4 mx-auto w-px bg-gray-300 opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="flex flex-col items-center mb-4 md:mb-0">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="mx-4 text-center flex flex-col justify-center">
                            <div className="bg-blue-600 rounded-full z-10 h-6 w-6 flex items-center justify-center">
                                <div className="text-[0.7rem] font-bold text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col text-sm leading-4 text-neutral-900 flex-grow xl:px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="w-full h-14 object-contain rounded-lg" />
                            </div>
                            <div className="flex flex-col px-2 mt-3 w-full xl:px-5 xl:flex-grow">
                                <h6 className="text-xs text-blue-600 font-semibold m-0 xl:text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="m-0 text-neutral-900 font-bold md:text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="w-full">
                        <button className="flex justify-center items-center px-2 py-2 mt-1 max-w-full text-base leading-4 text-center text-white bg-blue-600 border border-blue-600 active:bg-blue-700 border-solid rounded-[73px] w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HoveredCompareCars