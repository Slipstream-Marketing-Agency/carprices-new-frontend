import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

const CarList = ({ cars, totalCars }) => {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const router = useRouter();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Define keys to exclude
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

    // Extract filters from query and set initial state
    const { query } = router;
    const initialFilters = [];

    Object.keys(query).forEach((key) => {
      if (!excludeKeys.includes(key)) {
        const values = query[key].split(",");
        values.forEach((value) => {
          initialFilters.push({ type: key, label: value, value });
        });
      }
    });

    setFilters(initialFilters);
  }, [router.query]);

  const removeFilter = (type, value) => {
    const updatedFilters = filters.filter(
      (filter) => !(filter.type === type && filter.value === value)
    );
    setFilters(updatedFilters);

    const updatedQuery = { ...router.query };
    const values = updatedQuery[type].split(",").filter((v) => v !== value);
    if (values.length > 0) {
      updatedQuery[type] = values.join(",");
    } else {
      delete updatedQuery[type];
    }
    router.push({ pathname: router.pathname, query: updatedQuery });
  };

  const clearFilters = () => {
    setFilters([]);
    router.push({ pathname: router.pathname, query: {} });
  };

  return (
    <>
      <div className="tw-mt-3">
        {filters.map((filter, index) => (
          <Chip
            key={index}
            label={filter.label}
            variant="outlined"
            size="small"
            className="tw-mr-3 tw-my-1"
            deleteIcon={<CloseIcon />}
            onDelete={() => removeFilter(filter.type, filter.value)}
          />
        ))}

        {filters.length > 0 && (
          <span
            className="primary-delete tw-text-xs tw-underline tw-underline-offset-2 tw-ml-3 cursor-pointer"
            onClick={clearFilters}
          >
            Clear All Filters
          </span>
        )}
      </div>
      <div className="tw-flex tw-gap-5 tw-justify-between tw-rounded-2xl tw-text-neutral-900 max-md:tw-flex-wrap tw-my-5">
        <p className="tw-capitalize tw-font-semibold">Search New Cars</p>
        <div className="tw-my-auto tw-text-sm tw-font-medium tw-tracking-normal tw-flex tw-items-center">
          <p className="tw-text-neutral-900 tw-mr-2 tw-font-semibold">
            {totalCars}
          </p>
          <p className="tw-text-neutral-900">results found</p>
        </div>
      </div>
      <div className="tw-grid tw-gap-4 tw-mt-4 tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 2xl:tw-grid-cols-3">
        {cars?.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </>
  );
};

export default CarList;
