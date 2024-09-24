import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Select from "react-select";

const options = [
    { value: 'bwm', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'suzuki', label: 'Suzuki' }
]

const CompareCars = () => {
    return (
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 md:tw-gap-8 container">
            <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-p-4 tw-shadow-md tw-rounded-lg">
                <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-relative">
                    {/* Shorter vertical line with fading effect for desktop */}
                    <div className="tw-hidden tw-absolute md:tw-block tw-inset-x-0 tw-top-1/4 tw-bottom-1/4 tw-mx-auto tw-w-px tw-bg-gray-300 tw-opacity-50"></div>

                    {/* Car detail card for the first car */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-mb-4 md:tw-mb-0">
                        <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                            <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="Volvo XC40" width="0"
                                height="0"
                                sizes="100vw" className="tw-w-full tw-h-40 tw-object-contain tw-rounded-lg" />
                        </div>
                        <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                            <h6 className="tw-text-xs tw-tracking-wider tw-leading-4 tw-text-blue-600 tw-uppercase tw-font-bold tw-m-0">
                                Volvo
                            </h6>
                            <h4 className="tw-text-base tw-text-gray-900 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                Volvo XC40
                            </h4>
                            <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-[21px] ">AED 423,543</span>
                        </div>
                    </div>

                    {/* Vs indicator with circular blue background centered for both desktop and mobile */}
                    <div className="tw-mx-4 tw-text-center tw-flex tw-flex-col tw-justify-center">
                        <div className="tw-bg-blue-600 tw-rounded-full tw-px-3 tw-z-10 tw-p-2">
                            <div className="tw-text-base tw-font-bold tw-text-white">Vs</div>
                        </div>
                    </div>

                    {/* Car detail card for the second car */}
                    <div className="tw-flex tw-flex-col tw-items-center">
                        <div className="tw-flex tw-flex-col tw-text-sm tw-leading-4 tw-text-neutral-900 tw-flex-grow xl:tw-px-5">
                            <Image src="https://cdn.carprices.ae/assets/2024_Mercedes_Amg_C_63_S_E_performance_Banner_9e3a031374.png" alt="BMW 1 Series" width="0"
                                height="0"
                                sizes="100vw" className="tw-w-full tw-h-40 tw-object-contain tw-rounded-lg" />
                        </div>
                        <div className="tw-flex tw-flex-col tw-px-2 tw-mt-3 tw-w-full xl:tw-px-5 xl:tw-flex-grow">
                            <h6 className="tw-text-xs tw-tracking-wider tw-leading-4 tw-text-blue-600 tw-uppercase tw-font-bold tw-m-0">
                                BMW
                            </h6>
                            <h4 className="tw-text-base tw-text-gray-900 tw-font-semibold tw-m-0 xl:tw-text-lg">
                                1 Series
                            </h4>
                            <span className="tw-m-0 tw-text-neutral-900 tw-font-bold md:tw-text-[21px] ">AED 185,000</span>
                        </div>
                    </div>
                </div>
                <Link href="/compare-cars" className="tw-w-full">
                    <button className="tw-flex tw-justify-center tw-items-center tw-px-2 tw-py-3 tw-mt-3 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] tw-w-full">
                        Compare Now
                    </button>
                </Link>
            </div>
            <div className="tw-flex tw-flex-col tw-bg-white tw-p-4 tw-shadow-md tw-rounded-lg">
                <h2 className="tw-text-lg tw-font-semibold tw-capitalize tw-mb-4 md:tw-text-left">
                    Choose the cars you need to compare
                </h2>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-14 md:tw-gap-6 tw-relative tw-items-center">
                    {/* Vertical line in the center with fading effect */}
                    <div className="tw-absolute tw-hidden md:tw-block tw-inset-0 tw-mx-auto tw-w-px tw-bg-gray-300 tw-opacity-50 tw-z-0"></div>
                    {/* Left Column for First Set of Selects */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-px-2 md:tw-px-4 tw-relative">
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Brand"} />
                        </div>
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Model"} />
                        </div>
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Year"} />
                        </div>
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Trim"} />
                        </div>
                    </div>
                    {/* "Vs" indicator centered between columns */}
                    <div className="tw-absolute tw-left-1/2 tw-transform tw--translate-x-1/2 tw-text-center">
                        <div className="tw-bg-blue-600 tw-rounded-full tw-px-3 tw-py-2">
                            <div className="tw-text-base tw-font-bold tw-text-white">Vs</div>
                        </div>
                    </div>
                    {/* Right Column for Second Set of Selects */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-px-2 md:tw-px-4 tw-relative">
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Brand"} />
                        </div>
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Model"} />
                        </div>
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Year"} />
                        </div>
                        <div className="tw-w-full">
                            <Select options={options} placeholder={"Choose Trim"} />
                        </div>
                    </div>
                </div>
                <Link href="/compare-cars" className="tw-w-full">
                    <button className="tw-flex tw-justify-center tw-items-center tw-px-2 tw-py-3 tw-mt-4 tw-max-w-full tw-text-base tw-leading-4 tw-text-center tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 active:tw-bg-blue-700 tw-border-solid tw-rounded-[73px] tw-w-full">
                        Compare Now
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CompareCars
