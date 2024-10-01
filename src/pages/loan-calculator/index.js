"use client";
import Ad300X250 from "@/src/components-old/ads/Ad300x250";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import MainSection from "@/src/components/carLoanCalculatorPage/mainSection/mainSection";
import Sidebar1 from "@/src/components/carLoanCalculatorPage/sidebar1/Sidebar1";
import Sidebar2 from "@/src/components/carLoanCalculatorPage/sidebar2/Sidebar2";
import MainLayout from "@/src/layout/MainLayout";
import { fetchMetaData } from "@/src/lib/fetchMetaData";
import Image from "next/image";
import { useState } from "react";

export default function CarLoanCalculatorPage({metaData}) {
  const faq = [
    {
      question: <>Can I get a car loan in the UAE if I'm not a UAE national?</>,
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
          It's challenging, but some lenders offer car loans to individuals with
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
          impact your credit score. It's essential to make payments on time.
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

  const accordionData = [
    {
      title: "Accordion Item 1",
      content:
        "This is the content for the first accordion item. It can contain text, images, or any other HTML elements.",
    },
    {
      title: "Accordion Item 2",
      content:
        "This is the content for the second accordion item. The content is dynamically shown or hidden based on the user's interaction.",
    },
    {
      title: "Accordion Item 3",
      content:
        "This is the content for the third accordion item. Tailwind CSS classes are used to style the accordion.",
    },
  ];

  return (
    <MainLayout
      pageMeta={{
        title: metaData?.title ? metaData.title :
          "Car Loan Calculator: Easily Calculate Your Car Financing Options - Carprices.ae",
        description: metaData?.description ? metaData.description :
          "Calculate car loans effortlessly. Get accurate estimates, explore repayment options, and make informed decisions. Plan confidently with CarPrices UAE.",
        type: "Car Review Website",
      }}
    >
      <div className="tw-grid sm:tw-grid-cols-12 tw-my-4 tw-gap-16 tw-px-6 sm:tw-px-24 md:tw-px-16 lg:tw-p-50">
        <div className="sm:tw-col-span-9">
          <MainSection />
          <h2 className="tw-mt-8 tw-mb-3 tw-font-semibold tw-text-2xl  tw-text-lightgray tw-capitalize">
            FAQs (Frequently Asked Questions) on car loan in UAE
          </h2>
          <div className="tw-w-full  tw-mx-auto tw-space-y-2 tw-mt-6">
            {faq.map((item, index) => (
              <div key={index} className="tw-border tw-rounded tw-bg-white">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="tw-w-full tw-px-4 tw-py-2 tw-text-left tw-flex tw-justify-between tw-items-center tw-bg-gray-100 tw-rounded-t"
                >
                  <span>{item.question}</span>
                  <svg
                    className={`tw-w-6 tw-h-6 tw-transform ${
                      activeIndex === index ? "tw-rotate-180" : ""
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
                  className={`tw-overflow-hidden tw-transition-[max-height] tw-duration-500 ${
                    activeIndex === index
                      ? "tw-max-h-96 tw-p-0"
                      : "tw-max-h-0 tw-p-0"
                  }`}
                >
                  <p className="tw-text-gray-700 tw-p-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tw-h-1/2 sm:tw-col-span-3 tw-block tw-space-y-10">
          <Ad300x600 dataAdSlot="3792539533" />
          <div className="md:tw-hidden tw-block tw-mt-10">
            <Ad300X250 dataAdSlot="9351332409" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


export async function getServerSideProps(context) {

  // Get the full path and query string from the URL (e.g., 'brands?type=1')
  const { resolvedUrl } = context;

  // Split the URL at the "?" to remove query parameters
  const pathWithQuery = resolvedUrl.split('?')[0];  // Only take the path (e.g., 'brands')

  // Extract the last part of the path
  const path = pathWithQuery.split('/').filter(Boolean).pop();
  const metaData = await fetchMetaData(path)

  return {
    props: {
      metaData,
    }
  }
}
