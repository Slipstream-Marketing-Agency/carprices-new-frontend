import { fetchMetaData } from '@/lib/fetchMetaData';
import Link from 'next/link'
import React from 'react'

export async function generateMetadata({ params }) {
    const slug = "about"

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    // Return the dynamic metadata
    return {
        title: metaData?.title ? metaData.title : "About Us - Carprices.ae",
        description: metaData?.description
            ? metaData.description
            : "Discover the automotive world with CarPrices.ae - your trusted portal for comprehensive car research in the UAE. Compare vehicles, stay updated with the latest models and industry trends. Join our car-loving community today!",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/about`,
        },
        keywords: metaData?.keywords || "CarPrices.ae, About CarPrices, Car research UAE, Compare cars UAE, Latest car models UAE, Automotive industry UAE, Car reviews, Car comparisons, Vehicle trends UAE",
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaData?.title ? metaData.title : "About Us - Carprices.ae",
            description:
                metaData?.description
                    ? metaData.description
                    : "Discover the automotive world with CarPrices.ae - your trusted portal for comprehensive car research in the UAE. Compare vehicles, stay updated with the latest models and industry trends. Join our car-loving community today!",
            url: "https://carprices.ae/about",  // Using the same canonical URL here
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

export default function About() {
    return (
        <div className="container mx-auto">
            <div className="grid gap-4 p-4 lg:grid-rows-1 lg:grid-cols-10 w-full container">
                <div className="row-span-1 md:col-span-12 col-span-12 flex flex-col md:justify-start text-white rounded-2xl leading-[100%] relative overflow-hidden md:h-[400px] h-[200px]">
                    <img
                        loading="lazy"
                        src="/About-Us.jpg"
                        className="object-cover w-full h-full absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
                    {/* Overlay */}
                    <div className="relative flex flex-col md:px-12 px-3 md:pt-12 pt-3 md:pb-20 w-full h-full">
                        <h1 className="md:text-2xl text-xl text-white md:leading-10 leading-6 font-bold ">
                            About CarPrices.ae
                        </h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-0 sm:pt-6">
                <div className="flex flex-col justify-center space-y-4">
                    <p className=" text-gray-600">
                        Established in 2017 in Dubai, UAE, CarPrices.ae is a fast-growing
                        online portal for new car buyers’ research in the United Arab
                        Emirates. Our platform is dedicated to new and used car buyers and
                        enthusiasts who are looking for a platform that helps them pick
                        the right new car.
                    </p>
                    <p className=" text-gray-600">
                        Our mission is to empower new car buyers’ to make informed car
                        buying decisions by providing comprehensive and up-to-date
                        information on all new cars in the UAE and allowing them to find a
                        right car that suits their needs.
                    </p>
                    <div className="space-y-5">
                        <h4 className=" font-semibold text-gray-800">
                            What We Offer
                        </h4>
                        <ul className="bg-white p-6 pt-0 rounded-lg shadow-md space-y-4 list-disc pl-5">
                            {[
                                "A ‘World’s First’ truly interactive new car research platform which recommends cars based on buyers’ preferences and requirements.",
                                "Extensive new car database maintained by our automotive experts.",
                                "New car buyers can compare a wide range of vehicles side-by-side for a comprehensive pricing and feature overview.",
                                "Equipping users with tools and insights to find the perfect car aligned with their needs, preferences, and budget.",
                            ].map((point, index) => (
                                <li key={index} className=" text-gray-700 ml-4">
                                    {index === 0 ? (
                                        <>
                                            A <span className="font-bold">‘World’s First’</span>{" "}
                                            truly interactive new car research platform which
                                            recommends cars based on buyers’ preferences and
                                            requirements.
                                        </>
                                    ) : (
                                        point
                                    )}
                                </li>
                            ))}
                        </ul>
                        <h4 className=" font-semibold text-gray-800">
                            Our Commitment
                        </h4>
                        <ul className="bg-white p-6 pt-0 rounded-lg shadow-md space-y-4 list-disc pl-5">
                            {[
                                "Ensuring accuracy, reliability, and authenticity in the information provided, fostering trust among our platform users.",
                                "Maintaining transparency in our operations, processes, and data sources, enabling users to make well-informed decisions confidently.",
                                "Commitment to continual enhancement of our platform, incorporating user feedback and technological advancements for an optimized user experience.",
                                "Fostering a supportive and interactive community environment where users can share, learn, and engage with fellow car enthusiasts and experts.",
                            ].map((point, index) => (
                                <li key={index} className=" text-gray-700 ml-4">
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <h4 className=" font-semibold text-gray-800">
                            Continuous Updates
                        </h4>
                        <ul className="bg-white p-6 pt-0 rounded-lg shadow-md space-y-4 list-disc pl-5">
                            {[
                                "Regularly updated platform keeping pace with the dynamic automotive industry.",
                                "Timely incorporation of the latest car models, ensuring users have access to current information.",
                                "Industry news and trends regularly added to keep users informed about the evolving automotive landscape.",
                                "Ensuring that users have access to the freshest details to aid their decision-making process when buying a car.",
                            ].map((point, index) => (
                                <li key={index} className=" text-gray-700 ml-4">
                                    {point}
                                </li>
                            ))}
                        </ul>{" "}
                        <h4 className=" font-semibold text-gray-800">
                            Additional Resources
                        </h4>
                        <ul className="bg-white p-6 pt-0 rounded-lg shadow-md space-y-4 list-disc pl-5">
                            {[
                                "A user-friendly tool aiding in financial planning for car purchases by calculating potential loan amounts, interest rates, and repayment periods.",
                                "An organized and easily navigable sitemap ensuring effortless access to our diverse range of resources, including car specifications, reviews, and comparison tools.",
                                "Detailed guides and tips on vehicle maintenance, ownership, insurance, and more, providing valuable insights for both new and experienced car owners.",
                                "In-depth articles and analyses on industry trends, market forecasts, and emerging technologies, fostering a deeper understanding of the automotive world.",
                            ].map((point, index) => (
                                <li key={index} className=" text-gray-700 ml-4">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p>
                        For inquiries, suggestions, or feedback, reach out through our
                        <Link href="/contact-us" className="font-semibold">
                            {" "}
                            Contact Us
                        </Link>{" "}
                        section.
                    </p>
                </div>
                <div className="space-y-10 ">
                    <img
                        loading="lazy"
                        src="/assets/about-us/06_Social.jpg"
                        className="object-contain w-full h-auto rounded-2xl"
                    />
                    <img
                        loading="lazy"
                        src="/assets/about-us/05_social.jpg"
                        className="object-contain w-full h-auto rounded-2xl md:block hidden"
                    />
                </div>
            </div>
        </div>
    )
}
