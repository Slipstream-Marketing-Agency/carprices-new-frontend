import Image from "next/image";
import Link from "next/link";
import React from "react";

const searchBestCar = [
  {
    imageUrl: "/assets/img/home-search-for-best/new-cars.webp",
    label: "New Car",
    linkUrl: "/search-cars",
    bgColor: "bg-[#E8F8FF]",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-comparison.webp",
    label: "Car Comparison",
    linkUrl: "/compare-cars",
    bgColor: "bg-[#E8FEFF]",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/news-and-reviews-icon.webp",
    label: "News & Reviews",
    linkUrl: "/news",
    bgColor: "bg-[#F3FFE8]",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-dealers.webp",
    label: "Car Dealers",
    linkUrl: "#",
    bgColor: "bg-[#FFF8E8]",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-videos.webp",
    label: "Car Videos",
    linkUrl: "#",
    bgColor: "bg-[#FFE8E8]",
  },
  {
    imageUrl: "/assets/img/home-search-for-best/car-promo.webp",
    label: "Car Promos",
    linkUrl: "#",
    bgColor: "bg-[#FFE8F3]",
  },
];

const SearchForTheBest = () => {
  return (
    <div className="container flex flex-col px-3 md:mt-12 mt-4 md:mb-6 mb-1">
      {/* <div className="self-start mb-2">
        <h1 className="text-xl font-semibold capitalize">Explore the Best Car Prices in the UAE</h1>
      </div> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {searchBestCar.map((car, index) => (
          <div
            key={index}
            className={`md:p-4 p-2 rounded-lg ${car.bgColor}`}
          >
            <Link href={car.linkUrl}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={car.imageUrl}
                  alt={car.label}
                  width={160}
                  height={100}
                  // Set priority for the first two images and lazy load others
                  priority={true}
                  sizes="(max-width: 640px) 14rem, (min-width: 641px) 24rem"
                  className="w-40 md:h-24 h-14 object-contain rounded-md p-2"
                />
                <div className="hidden md:flex items-center justify-between w-full">
                  <p className="mt-2 text-center text-sm md:text-base font-semibold">
                    {car.label}
                  </p>
                  <span className="mt-2 text-blue-700 font-bold">→</span>
                </div>
                <p className="md:hidden text-center text-xs font-semibold">
                  {car.label}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForTheBest;
