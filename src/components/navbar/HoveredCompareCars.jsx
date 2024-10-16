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
        <div className="tw-rounded-xl tw-shadow-xl tw-absolute tw-top-10 tw-w-[840px] tw-z-50 tw-bg-white tw-border tw-border-gray-200">
            <h4 className="tw-text-sm tw-font-semibold tw-text-blue-700 tw-p-4">Compare Cars</h4>
            <div className="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-p-4">
                <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-p-4 hover:tw-shadow-custom-shadow tw-rounded-lg">
                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="tw-hidden tw-absolute md:tw-block tw-inset-x-0 tw-top-1/4 tw-bottom-1/4 tw-mx-auto tw-w-px tw-bg-gray-300 tw-opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="tw-flex tw-flex-col tw-items-center tw-mb-4 md:tw-mb-0">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="tw-mx-4 tw-text-center tw-flex tw-flex-col tw-justify-center">
                            <div className="tw-bg-blue-600 tw-rounded-full tw-z-10 tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center">
                                <div className="tw-text-[0.7rem] tw-font-bold tw-text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="tw-flex tw-flex-col tw-items-center">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="tw-w-full">
                        <button className="tw-flex tw-justify-center tw-items-center tw-px-2 tw-py-2 tw-mt-1 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] tw-w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
                <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-p-4 hover:tw-shadow-custom-shadow tw-rounded-lg">
                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="tw-hidden tw-absolute md:tw-block tw-inset-x-0 tw-top-1/4 tw-bottom-1/4 tw-mx-auto tw-w-px tw-bg-gray-300 tw-opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="tw-flex tw-flex-col tw-items-center tw-mb-4 md:tw-mb-0">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="tw-mx-4 tw-text-center tw-flex tw-flex-col tw-justify-center">
                            <div className="tw-bg-blue-600 tw-rounded-full tw-z-10 tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center">
                                <div className="tw-text-[0.7rem] tw-font-bold tw-text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="tw-flex tw-flex-col tw-items-center">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="tw-w-full">
                        <button className="tw-flex tw-justify-center tw-items-center tw-px-2 tw-py-2 tw-mt-1 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] tw-w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
                <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-p-4 hover:tw-shadow-custom-shadow tw-rounded-lg">
                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="tw-hidden tw-absolute md:tw-block tw-inset-x-0 tw-top-1/4 tw-bottom-1/4 tw-mx-auto tw-w-px tw-bg-gray-300 tw-opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="tw-flex tw-flex-col tw-items-center tw-mb-4 md:tw-mb-0">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="tw-mx-4 tw-text-center tw-flex tw-flex-col tw-justify-center">
                            <div className="tw-bg-blue-600 tw-rounded-full tw-z-10 tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center">
                                <div className="tw-text-[0.7rem] tw-font-bold tw-text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="tw-flex tw-flex-col tw-items-center">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="tw-w-full">
                        <button className="tw-flex tw-justify-center tw-items-center tw-px-2 tw-py-2 tw-mt-1 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] tw-w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
                <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-p-4 hover:tw-shadow-custom-shadow tw-rounded-lg">
                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-relative">
                        {/* Shorter vertical line with fading effect for desktop */}
                        <div className="tw-hidden tw-absolute md:tw-block tw-inset-x-0 tw-top-1/4 tw-bottom-1/4 tw-mx-auto tw-w-px tw-bg-gray-300 tw-opacity-50"></div>

                        {/* Car detail card for the first car */}
                        <div className="tw-flex tw-flex-col tw-items-center tw-mb-4 md:tw-mb-0">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    Volvo XC40
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 423,543</span>
                            </div>
                        </div>

                        {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                        <div className="tw-mx-4 tw-text-center tw-flex tw-flex-col tw-justify-center">
                            <div className="tw-bg-blue-600 tw-rounded-full tw-z-10 tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center">
                                <div className="tw-text-[0.7rem] tw-font-bold tw-text-white">Vs</div>
                            </div>
                        </div>

                        {/* Car detail card for the second car */}
                        <div className="tw-flex tw-flex-col tw-items-center">
                            <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                                <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                    height="0"
                                    sizes="100vw" className="tw-w-full tw-h-14 tw-object-contain tw-rounded-lg" />
                            </div>
                            <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                                <h6 className="tw-text-xs tw-text-blue-600 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                    BMW 1 Series
                                </h6>
                                <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-xs ">AED 185,000</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/compare-cars" className="tw-w-full">
                        <button className="tw-flex tw-justify-center tw-items-center tw-px-2 tw-py-2 tw-mt-1 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] tw-w-full">
                            Compare Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HoveredCompareCars