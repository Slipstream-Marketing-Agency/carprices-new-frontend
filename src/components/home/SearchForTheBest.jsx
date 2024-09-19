import React from 'react'
import SearchForBestCard from './SearchForBestCard'

const searchBestCar = [
    {
        imageUrl: "/assets/img/home-search-for-best/new-cars.png",
        label: "New Car",
        linkUrl: "/search-cars",
        bgColor: "tw-bg-blue-100"
    },
    {
        imageUrl: "/assets/img/home-search-for-best/new-cars.png",
        label: "Car Comparison",
        linkUrl: "/search-cars",
        bgColor: "tw-bg-blue-100"
    },
    {
        imageUrl: "/assets/img/home-search-for-best/new-cars.png",
        label: "News & Reviews",
        linkUrl: "/news",
        bgColor: "tw-bg-blue-100"
    },
    {
        imageUrl: "/assets/img/home-search-for-best/car-dealers.png",
        label: "Car Dealers",
        linkUrl: "/search-cars",
        bgColor: "tw-bg-blue-100"
    },
    {
        imageUrl: "/assets/img/home-search-for-best/car-dealers.png",
        label: "Car Videos",
        linkUrl: "/search-cars",
        bgColor: "tw-bg-blue-100"
    },
    {
        imageUrl: "/assets/img/home-search-for-best/car-dealers.png",
        label: "Car Promos",
        linkUrl: "/search-cars",
        bgColor: "tw-bg-blue-100"
    },
]


const SearchForTheBest = () => {
    return (
        <div className="tw-flex tw-flex-col tw-px-3 md:tw-container md:tw-mt-12 tw-mt-6">
            <div className="tw-flex tw-flex-col tw-self-start sm:tw-px-5 max-md:tw-max-w-full">
                <h2 className=" tw-font-semibold tw-capitalize">
                    Search For The Best
                </h2>
            </div>

            <div className="tw-grid tw-grid-cols-3 md:tw-grid-cols-6 tw-gap-4">
                {searchBestCar.map((car, index) => (
                    <SearchForBestCard
                        imageUrl={car.imageUrl}
                        label={car.label}
                        linkUrl={car.linkUrl}
                        bgColor={car.bgColor}
                    />
                ))}
            </div>
        </div>
    )
}

export default SearchForTheBest