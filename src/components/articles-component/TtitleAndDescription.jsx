"use client"
import React, { useState } from 'react'

export default function TtitleAndDescription({ type }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            {type === "news" ? (
                <>
                    <h1 className="sm:text-2xl capitalize font-semibold mb-2">
                        Latest Car News in the UAE - New Launches, Updates, and Insights
                    </h1>
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        Stay informed with the most recent car news and updates in the UAE’s automotive market. Discover everything from the latest car launches, model release dates, and exclusive car images to automotive expos, industry events, and price fluctuations. Stay ahead with news on discounts, facelift updates, recalls, and significant changes in the UAE car industry. Get all the insights you need to keep up with the UAE's automotive trends and be the first to know about what's happening in the local market.
                        <br />
                        <br />
                        Whether you're a car enthusiast, prospective buyer, or industry professional, our comprehensive coverage on the UAE car industry will provide valuable knowledge on new models, innovative technologies, and consumer-friendly deals. Explore the latest in the automotive world, including electric vehicles, SUVs, sedans, and luxury brands catering to UAE car lovers.
                        <br />
                        <br />
                        <strong>Keywords: </strong>latest car news UAE, UAE automotive industry, new car launches UAE, car price updates UAE, car events UAE, automotive news UAE
                    </p>
                </>
            ) : type === "review" ? (
                <>
                    <h1 className="sm:text-2xl capitalize font-semibold">
                        UAE Car Reviews - In-Depth Analysis, Ratings & Real User Opinions
                    </h1>
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        Explore detailed car reviews that cover every aspect of popular models available in the UAE. From performance and fuel efficiency to safety features and comfort, get insights and expert opinions on the latest vehicles. We also incorporate real user feedback, ratings, and comparisons, helping you make informed decisions before buying your next car.
                        <br />
                        <br />
                        <strong>Keywords: </strong>UAE car reviews, car ratings UAE, new car reviews, expert car analysis UAE, user opinions on cars UAE
                    </p>
                </>
            ) : type === "new-launches" ? (
                <>
                    <h1 className="sm:text-2xl capitalize font-semibold">
                        Latest Car Launches in UAE - New Models, Specs & Release Dates
                    </h1>
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        Stay in the know with the latest car launches in the UAE automotive market. Get exclusive updates on new models, upcoming releases, and specifications of the most anticipated cars. From electric vehicles to luxury brands, learn about the newest entries in the UAE market.
                        <br />
                        <br />
                        <strong>Keywords: </strong>latest car launches UAE, new car releases UAE, upcoming cars UAE, car launch dates UAE, UAE automotive news
                    </p>
                </>
            ) : type === "buying-guide" ? (
                <>
                    <h1 className="sm:text-2xl capitalize font-semibold">
                        Car Buying Guide for UAE - Tips, Budget Planning & Model Selection
                    </h1>
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        Looking to buy a car in the UAE? Our comprehensive car buying guides provide you with expert advice on choosing the right model, budgeting, financing options, and navigating the UAE market. Discover step-by-step guides on selecting cars based on fuel efficiency, family needs, and budget.
                        <br />
                        <br />
                        <strong>Keywords: </strong>car buying guide UAE, how to buy a car UAE, best cars to buy UAE, car shopping tips UAE, UAE car market
                    </p>
                </>
            ) : type === "comparison" ? (
                <>
                    <h1 className="sm:text-2xl capitalize font-semibold">
                        Car Comparisons in UAE - Side-by-Side Analysis of Top Models
                    </h1>
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        Make informed choices with our detailed car comparisons, specially crafted for UAE buyers. Compare top models, brands, and car types side by side, including performance, pricing, fuel economy, features, and more.
                        <br />
                        <br />
                        <strong>Keywords: </strong>car comparisons UAE, best car comparison UAE, SUV comparison UAE, electric vehicle comparison UAE, car features comparison UAE
                    </p>
                </>
            ) : type === "how-to" ? (
                <>
                    <h1 className="sm:text-2xl capitalize font-semibold">
                        How-To Guides for Car Owners in UAE - Tips, Maintenance & Upgrades
                    </h1>
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        Discover practical how-to guides that help you maintain, upgrade, and enjoy your car to the fullest in the UAE. From routine maintenance tips and DIY fixes to advice on car care in hot climates, our guides cover essential skills every car owner should know.
                        <br />
                        <br />
                        <strong>Keywords: </strong>car maintenance tips UAE, how to maintain a car UAE, DIY car care UAE, car upgrade guide UAE, car resale tips UAE
                    </p>
                </>
            ) : null}
            <div className=' flex justify-start'>
                <button
                    onClick={toggleReadMore}
                    className="text-xs font-semibold text-blue-500 mt-0 hover:underline focus:outline-none rounded-xl"
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </div>

        </div>
    )
}
