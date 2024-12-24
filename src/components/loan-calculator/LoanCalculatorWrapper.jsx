"use client"
import React, { Suspense, useState } from 'react'
import Ad300x600 from '../ads/Ad300x600';
import Ad300X250 from '../ads/Ad300x250';
import CalculatorContent from './CalculatorContent';

export default function LoanCalculatorWrapper() {
    const faq = [
        {
            question: <>Can I get a car loan in the UAE if I&apos;m not a UAE national?</>,
            answer: (
                <>
                    Yes, many banks offer car loans to expatriates, but eligibility
                    criteria may differ based on your visa type.
                </>
            ),
            id: 1,
            condition: true,
        },
        {
            question: (
                <>What interest rates can I expect for a car loan in the UAE?</>
            ),
            answer: (
                <>
                    Interest rates vary between banks and can depend on factors like loan
                    amount, tenure, and your creditworthiness.
                </>
            ),
            id: 2,
            condition: true,
        },
        {
            question: (
                <> Is it possible to finance a used luxury car with a car loan?</>
            ),
            answer: (
                <>
                    Yes, some banks in the UAE offer financing options for used luxury
                    cars.
                </>
            ),
            id: 3,
            condition: true,
        },
        {
            question: <>Can I apply for a car loan without a UAE residence visa?</>,
            answer: (
                <>
                    It&apos;s challenging, but some lenders offer car loans to individuals with
                    certain visa types, such as employment or investor visas.
                </>
            ),
            id: 4,
            condition: true,
        },
        {
            question: <>What happens if I miss an EMI payment?</>,
            answer: (
                <>
                    Missing an EMI payment can result in late payment fees and negatively
                    impact your credit score. It&apos;s essential to make payments on time.
                </>
            ),
            id: 5,
            condition: true,
        },
        {
            question: (
                <>What banks can be loan providers for a Car loan in the UAE?</>
            ),
            answer: (
                <>
                    Emirates NBD, Dubai Islamic Bank, First Abu Dhabi Bank etc. offer a
                    wide range of car loan options, including competitive interest rates
                    and flexible repayment terms. Their customer-centric approach makes
                    them a top choice for many residents.
                </>
            ),
            id: 6,
            condition: true,
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="grid sm:grid-cols-12 my-4 gap-16 px-6 sm:px-24 md:px-16 lg:p-50">
            <div className="sm:col-span-9">
                <CalculatorContent />
                <h2 className="mt-8 mb-3 font-semibold text-2xl  text-lightgray capitalize">
                    FAQs (Frequently Asked Questions) on car loan in UAE
                </h2>
                <div className="w-full  mx-auto space-y-2 mt-6">
                    {faq.map((item, index) => (
                        <div key={index} className="border rounded bg-white">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full px-4 py-2 text-left flex justify-between items-center bg-gray-100 rounded-t"
                            >
                                <span>{item.question}</span>
                                <svg
                                    className={`w-6 h-6 transform ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-[max-height] duration-500 ${activeIndex === index
                                    ? "max-h-96 p-0"
                                    : "max-h-0 p-0"
                                    }`}
                            >
                                <p className="text-gray-700 p-4">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-1/2 sm:col-span-3 block space-y-10">
                <div className='my-6 pt-20 sticky top-0'>
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300x600 dataAdSlot="4063084302" />
                    </Suspense>
                </div>
                <div className="md:hidden block mt-10">
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300X250 dataAdSlot="2565896738" />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
