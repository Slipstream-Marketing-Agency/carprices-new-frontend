"use client";
import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CarCard from "../car-components/CarCard";
import CarCardSkeleton from "../car-components/CarCardSkeleton";

const CarList = ({ 
  cars, 
  totalCars, 
  setIsLoading, 
  isLoading,
}) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get the search parameters (query)
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Define keys to exclude by default
    const excludeKeys = [
      "sort",
      "page",
      "haveMusic",
      "isLuxury",
      "isPremiumLuxury",
      "haveTechnology",
      "havePerformance",
      "isSpacious",
      "isElectric",
      "isFuelEfficient",
      "isOffRoad",
      "isOneSeat",
      "isTwoSeat",
      "isTwoPlusTwo",
      "isThreeSeat",
      "isFourSeat",
      "isFiveSeat",
      "isSixSeat",
      "isSevenSeat",
      "isEightSeat",
      "isNineSeat",
      "isNinePlusSeat",
      "isManualTransmission",
      "isDuneBashing",
      "isAffordableLuxury",
      "type",
      "pageZero",
      "initialprice",
    ];

    // Check if the user is on the "/brands" or "/body-types" page
    const isBrandPage = pathname.startsWith("/brands/");
    const isCategoryPage = pathname.startsWith("/body-types/");

    // Exclude 'brandname' when on the brands page
    if (isCategoryPage) {
      excludeKeys.push("categoryname");
    }

    if (isBrandPage) {
      excludeKeys.push("brandname");
    }

    // Extract filters from searchParams and set initial state
    const initialFilters = [];

    searchParams.forEach((value, key) => {
      if (!excludeKeys.includes(key)) {
        const values = value.split(",");
        values.forEach((val) => {
          initialFilters.push({ type: key, label: val, value: val });
        });
      }
    });

    setFilters(initialFilters);
  }, [searchParams, pathname]);

  const removeFilter = (type, value) => {
    setIsLoading(true);
    const updatedFilters = filters.filter(
      (filter) => !(filter.type === type && filter.value === value)
    );
    setFilters(updatedFilters);

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    const values = updatedSearchParams.get(type)?.split(",").filter((v) => v !== value);

    if (values && values.length > 0) {
      updatedSearchParams.set(type, values.join(","));
    } else {
      updatedSearchParams.delete(type);
    }

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  const clearFilters = () => {
    setIsLoading(true);
    const updatedSearchParams = new URLSearchParams();

    // Retain brandname or categoryname in query if on brand or category page
    if (pathname.startsWith("/brands/")) {
      const brandname = searchParams.get("brandname"); // Retain brandname
      router.push(`/brands/${brandname}`);
    } else if (pathname.startsWith("/body-types/")) {
      const categoryname = searchParams.get("categoryname"); // Retain categoryname
      router.push(`/body-types/${categoryname}`);
    } else {
      // If not on brand or category page, clear all filters
      router.push(pathname);
    }
  };

  return (
    <>
      <div className="mt-3 flex items-center flex-wrap gap-2">
        {/* {filters.map((filter, index) => (
          <Chip
            key={index}
            label={
              filter.type === "price"
                ? `AED ${filter.label
                  .split("-")
                  .map((price) => new Intl.NumberFormat().format(price))
                  .join(" - ")}`
                : filter.label
            }
            variant="outlined"
            size="small"
            className="mr-3 my-1 px-1 py-1 border-2 capitalize text-sm font-medium rounded-md transition-all bg-blue-100 hover:bg-blue-200 hover:text-blue-700 border-none shadow-sm"
            deleteIcon={
              <CloseIcon className="rounded-full p-[1px] font-bold bg-white h-4 w-4" />
            }
            onDelete={() => removeFilter(filter.type, filter.value)}
          />
        ))} */}
        {filters.map((filter, index) => (
          <span
            key={index}
            className="primary-delete text-sm font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-105 hover:text-blue-700 hover:bg-blue-200 cursor-pointer px-3 py-1 rounded-md bg-blue-50 active:bg-blue-200"
          >
            <span className="mr-2">
              {
                filter.type === "price"
                  ? `AED ${filter.label
                    .split("-")
                    .map((price) => new Intl.NumberFormat().format(price))
                    .join(" - ")}`
                  : filter.label
              }
            </span>
            <CloseIcon onClick={() => removeFilter(filter.type, filter.value)} className="rounded-full p-[1px] font-bold bg-white h-4 w-4" />
          </span>
        ))}

        {filters.length > 0 && (
          <span
            className="primary-delete text-sm font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-105 hover:text-blue-700 hover:bg-blue-200 cursor-pointer px-3 py-1 rounded-md bg-blue-50 active:bg-blue-200"
            onClick={clearFilters}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear All Filters
          </span>
        )}
      </div>

      <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        {isLoading ? (
          // Show skeletons while loading
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index}>
              <CarCardSkeleton />
            </div>
          ))
        ) : (
          // Show actual car cards after loading
          cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))
        )}
      </div>
    </>
  );
};

export default CarList;
