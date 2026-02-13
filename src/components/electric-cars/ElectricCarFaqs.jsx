'use client'

import Head from 'next/head';
import { useState } from 'react';

import React from 'react'

const ElectricCarFaqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faq = [
        {
            question: "What is an Electric Vehicle (EV)?",
            answer: "An Electric Vehicle (EV) is a type of vehicle that runs on electricity stored in a battery, rather than using a traditional internal combustion engine powered by gasoline or diesel.",
            condition: true
        },
        {
            question: "How long does it take to charge an EV?",
            answer: "The charging time for an EV depends on the type of charger used: Level 1 chargers take 8-12 hours, Level 2 chargers take 4-6 hours, and DC fast chargers take 20-60 minutes for an 80% charge.",
            condition: true
        },
        {
            question: "What is the average range of an EV?",
            answer: "The average range of an EV varies by model but is typically between 150–300 miles on a full charge. Some high-end models can exceed 400 miles.",
            condition: true
        },
        {
            question: "Are EVs better for the environment?",
            answer: "Yes, EVs produce zero tailpipe emissions, reducing air pollution and greenhouse gases compared to gasoline-powered vehicles.",
            condition: true
        },
        {
            question: "Can I charge my EV at home?",
            answer: "Yes, most EV owners charge their vehicles at home using a Level 1 or Level 2 charger. Installing a Level 2 charger can significantly reduce charging time.",
            condition: true
        },
        {
            question: "Are EVs cheaper to maintain than traditional cars?",
            answer: "Yes, EVs have fewer moving parts and do not require oil changes or regular maintenance associated with internal combustion engines, making them cheaper to maintain.",
            condition: true
        },
        {
            question: "How long do EV batteries last?",
            answer: "EV batteries typically last 8–10 years or about 100,000–150,000 miles, depending on usage and care. Most manufacturers offer warranties for this period.",
            condition: true
        },
        {
            question: "What happens if an EV runs out of battery?",
            answer: "If an EV's battery is depleted, it needs to be towed to a charging station or recharged using a portable charging unit.",
            condition: true
        },
        {
            question: "Are there enough charging stations available?",
            answer: "The number of charging stations is rapidly growing, with many public and private locations offering charging options. Apps and maps can help locate the nearest station.",
            condition: true
        }
    ];

    return (
        <>
            <Head>
                <title>FAQs for Electric Cars</title>
                <meta name="description" content="Frequently Asked Questions about Electric Cars" />
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": ${JSON.stringify(
                        faq.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        }))
                    )}
            }
          `}
                </script>
            </Head>
            <div className="shadow-lg md:p-10 rounded-2xl">
                <h2 className="font-semibold mb-5 text-3xl">
                    Frequently Asked Questions (FAQs) about Electric Cars
                </h2>
                <div className="w-full mx-auto space-y-2">
                    {faq.map((item, index) => (
                        item.condition && (
                            <div key={`item-${index}`} className="border rounded bg-white">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="text-base sm:text-lg font-medium w-full px-4 py-2 text-left flex justify-between items-center bg-white rounded-t"
                                >
                                    <span
                                        className={`${activeIndex === index ? "text-blue-700" : ""}`}
                                    >
                                        {item.question}
                                    </span>
                                    <svg
                                        className={`w-6 h-6 transform ${activeIndex === index ? "rotate-180 text-blue-700" : ""}`}
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
                                    className={`overflow-hidden transition-[max-height] duration-500 ${activeIndex === index ? "max-h-96 p-0" : "max-h-0 p-0"}`}
                                >
                                    <p className="text-gray-700 text-sm sm:text-base p-4">{item.answer}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </>
    );
};

export default ElectricCarFaqs;
