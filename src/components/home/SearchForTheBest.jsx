import React from "react";
import SearchForBestCard from "./SearchForBestCard";

const searchBestCar = [
  {
    imageUrl: "/assets/img/home-search-for-best/new-cars.png",
    label: "New Car",
    linkUrl: "/search-cars",
    bgColor: "#E8F8FF",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-comparison.png",
    label: "Car Comparison",
    linkUrl: "/compare-cars",
    bgColor: "#E8FEFF",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/news-and-reviews.png",
    label: "News & Reviews",
    linkUrl: "/news",
    bgColor: "#F3FFE8",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-dealers.png",
    label: "Car Dealers",
    linkUrl: "/search-cars",
    bgColor: "#FFF8E8",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-videos.png",
    label: "Car Videos",
    linkUrl: "/search-cars",
    bgColor: "#FFE8E8",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-promo.png",
    label: "Car Promos",
    linkUrl: "/search-cars",
    bgColor: "#FFE8F3",
  },
];

const SearchForTheBest = () => {
  return (
    <div className="tw-flex tw-flex-col tw-px-3 md:tw-container md:tw-mt-12 tw-mt-6 md:tw-mb-6 tw-mb-1">
      <div className="tw-flex tw-flex-col tw-self-start sm:tw-px-5 max-md:tw-max-w-full">
        <h2 className=" tw-font-semibold tw-capitalize">Search For The Best</h2>
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
  );
};

export default SearchForTheBest;
