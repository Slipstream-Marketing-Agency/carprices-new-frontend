import React, { useEffect, useMemo, useState } from "react";
import SelectComponent from "./SelectComponent";
import { useRouter } from "next/router";

function CarLeftSidebar({
  brandoptions,
  bodyoptions,
  totalpricerange,
  totaldisplacementrange,
  totalpowerrange,
  fuelTypeList,
  cylinderList,
  transmissionList,
  driveList,
  displaynone
}) {
  const router = useRouter();

  const [isSticky, setIsSticky] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedPower, setSelectedPower] = useState([]);
  const [selectedDisplacement, setSelectedDisplacement] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState([]);
  const [selectedCylinders, setSelectedCylinders] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);

  const [showBrandDropdown, setShowBrandDropdown] = useState(true);
  const [showBodyDropdown, setShowBodyDropdown] = useState(true);
  const [showPriceDropdown, setShowPriceDropdown] = useState(true);
  const [showPowerDropdown, setShowPowerDropdown] = useState(true);
  const [showDisplacementDropdown, setShowDisplacementDropdown] =
    useState(true);

  const toggleBrandDropdown = () => setShowBrandDropdown(!showBrandDropdown);
  const toggleBodyDropdown = () => setShowBodyDropdown(!showBodyDropdown);
  const togglePriceDropdown = () => setShowPriceDropdown(!showPriceDropdown);
  const togglePowerDropdown = () => setShowPowerDropdown(!showPowerDropdown);
  const toggleDisplacementDropdown = () =>
    setShowDisplacementDropdown(!showDisplacementDropdown);

  const [showFuelTypeDropdown, setShowFuelTypeDropdown] = useState(true);
  const [showCylindersDropdown, setShowCylindersDropdown] = useState(true);
  const [showTransmissionsDropdown, setShowTransmissionsDropdown] =
    useState(true);
  const [showDriveDropdown, setShowDriveDropdown] = useState(true);

  const toggleFuelTypeDropdown = () =>
    setShowFuelTypeDropdown(!showFuelTypeDropdown);
  const toggleCylindersDropdown = () =>
    setShowCylindersDropdown(!showCylindersDropdown);
  const toggleTransmissionsDropdown = () =>
    setShowTransmissionsDropdown(!showTransmissionsDropdown);
  const toggleDriveDropdown = () => setShowDriveDropdown(!showDriveDropdown);

  console.log(router, "rooooooooooooter");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(brandoptions, "brandoptions");

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [priceRange, setPriceRange] = useState(null);

  console.log(priceRange, "priceRange");

  const brandSlugToIdMap = React.useMemo(() => {
    return brandoptions.reduce((acc, brand) => {
      acc[brand.value] = parseInt(brand.id, 10); // 'value' is the slug, 'id' is the brand ID
      return acc;
    }, {});
  }, [brandoptions]);

  useEffect(() => {
    const ids = selectedBrands
      .map((slug) => brandSlugToIdMap[slug])
      .filter((id) => id !== undefined);
    setSelectedBrandIds(ids);
  }, [selectedBrands, brandSlugToIdMap]);

  const [selectedBody, setSelectedBody] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  console.log(selectedBrands, "kkkkkkk");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const brands = query.get("brand") ? query.get("brand").split(",") : [];
    const bodies = query.get("bodytype")
      ? query.get("bodytype").split(",")
      : [];
    const prices = query.get("price") ? query.get("price").split(",") : [];
    const powers = query.get("power") ? query.get("power").split(",") : [];
    const displacements = query.get("displacement")
      ? query.get("displacement").split(",")
      : [];
    const fuelTypes = query.get("fuelType")
      ? query.get("fuelType").split(",")
      : [];
    const cylinders = query.get("cylinders")
      ? query.get("cylinders").split(",")
      : [];
    const drive = query.get("drive") ? query.get("drive").split(",") : [];
    const transmission = query.get("transmission")
      ? query.get("transmission").split(",")
      : [];

    setSelectedBrands(brands);
    setSelectedBody(bodies);
    setSelectedPrice(prices);
    setSelectedPower(powers);
    setSelectedDisplacement(displacements);
    setSelectedFuelType(fuelTypes);
    setSelectedCylinders(cylinders);
    setSelectedDrive(drive);
    setSelectedTransmission(transmission);

    const page = query.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [router.asPath]);

  useEffect(() => {
    const brandQuery =
      selectedBrands.length > 0 ? `brand=${selectedBrands.join(",")}` : "";
    const bodyQuery =
      selectedBody.length > 0 ? `bodytype=${selectedBody.join(",")}` : "";
    const priceQuery =
      selectedPrice.length > 0 ? `price=${selectedPrice.join(",")}` : "";
    const powerQuery =
      selectedPower.length > 0 ? `power=${selectedPower.join(",")}` : "";
    const displacementQuery =
      selectedDisplacement.length > 0
        ? `displacement=${selectedDisplacement.join(",")}`
        : "";
    const fuelTypeQuery =
      selectedFuelType.length > 0
        ? `fuelType=${selectedFuelType.join(",")}`
        : "";
    const cylindersQuery =
      selectedCylinders.length > 0
        ? `cylinders=${selectedCylinders.join(",")}`
        : "";
    const driveQuery =
      selectedDrive.length > 0 ? `drive=${selectedDrive.join(",")}` : "";
    const transmissionQuery =
      selectedTransmission.length > 0
        ? `transmission=${selectedTransmission.join(",")}`
        : "";

    const queryString = [
      brandQuery,
      bodyQuery,
      priceQuery,
      powerQuery,
      displacementQuery,
      fuelTypeQuery,
      cylindersQuery,
      driveQuery,
      transmissionQuery,
      `page=${currentPage}`,
    ]
      .filter(Boolean)
      .join("&");

    if (router.pathname === "/brands/[brandname]" && !isInitialRender) {
      router.push(`/brands/${router?.query?.brandname}?${queryString}`);
    } else if (router.pathname === "/category/[categoryname]" && !isInitialRender) {
      router.push(`/category/${router?.query?.categoryname}?${queryString}`);
    } else if (router.pathname === "/search-cars" && !isInitialRender) {
      router.push(`/search-cars?${queryString}`);
    } else {
      setIsInitialRender(false);
    }
  }, [
    selectedBrands,
    selectedBody,
    selectedPrice,
    selectedPower,
    selectedDisplacement,
    selectedFuelType,
    selectedCylinders,
    selectedDrive,
    selectedTransmission,
    currentPage,
  ]);

  const handleBrandChange = (brandSlug) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brandSlug)) {
        return prevSelectedBrands.filter((slug) => slug !== brandSlug);
      } else {
        return [...prevSelectedBrands, brandSlug];
      }
    });
    setCurrentPage(1); // Resetting the page number
    updateSelectedFilters("brand", brandSlug);
  };

  const handleBodyChange = (bodySlug) => {
    setSelectedBody((prevSelectedBody) => {
      if (prevSelectedBody.includes(bodySlug)) {
        return prevSelectedBody.filter((slug) => slug !== bodySlug);
      } else {
        return [...prevSelectedBody, bodySlug];
      }
    });
    setCurrentPage(1); // Resetting the page number
    updateSelectedFilters("body", bodySlug);
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  // Function to update selected filters
  const updateSelectedFilters = (type, value) => {
    console.log(type, value, "type, value");
    setSelectedFilters((prevFilters) => {
      // Check if filter is already selected
      const isFilterSelected = prevFilters.some(
        (filter) => filter.type === type && filter.value === value
      );

      if (isFilterSelected) {
        // Remove the filter
        return prevFilters.filter(
          (filter) => !(filter.type === type && filter.value === value)
        );
      } else {
        // Add the filter
        return [...prevFilters, { type, value }];
      }
    });
  };

  const removeFilter = (type, value) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter(
        (filter) => !(filter.type === type && filter.value === value)
      )
    );

    if (type === "brand") {
      setSelectedBrands((prevBrands) =>
        prevBrands.filter((brand) => brand !== value)
      );
    } else if (type === "body") {
      setSelectedBody((prevBodies) =>
        prevBodies.filter((body) => body !== value)
      );
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchBodyText, setSearchBodyText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleBodySearchChange = (e) => {
    setSearchBodyText(e.target.value);
  };

  const areFiltersActive = () => {
    return (
      selectedBrands.length > 0 ||
      selectedBody.length > 0 ||
      selectedFilters.length > 0
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedBody([]);
    setSelectedFilters([]);
    setSearchText("");
    setCurrentPage(1);

    // Optionally, you can also redirect to the base page without filters
    router.push("/search-cars");
  };

  const sortOptions = (options, selected) => {
    return options.slice().sort((a, b) => {
      const aSelected = selected.includes(a.value);
      const bSelected = selected.includes(b.value);
      return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
    });
  };

  const filteredAndSortedBrandOptions = useMemo(() => {
    // First, filter the brand options based on the search text
    const filtered = brandoptions.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );

    // Then, sort the filtered options
    return sortOptions(filtered, selectedBrands);
  }, [brandoptions, searchText, selectedBrands]);

  const priceOptions = [
    {
      range: { min: 0, max: 50000 },
      priceLabel: "Below AED 50K",
      value: "0-50000",
    },
    {
      range: { min: 50000, max: 100000 },
      priceLabel: "AED 50K - 100K",
      value: "50000-100000",
    },
    {
      range: { min: 100000, max: 200000 },
      priceLabel: "AED 100K - 200K",
      value: "100000-200000",
    },
    {
      range: { min: 200000, max: 300000 },
      priceLabel: "AED 200K - 300K",
      value: "200000-300000",
    },
    {
      range: { min: 300000, max: 500000 },
      priceLabel: "AED 300K - 500K",
      value: "300000-500000",
    },
    {
      range: { min: 500000, max: 700000 },
      priceLabel: "AED 500K - 700K",
      value: "500000-700000",
    },
    {
      range: { min: 700000, max: 1000000 },
      priceLabel: "AED 700K - 1M",
      value: "700000-1000000",
    },
  ];

  const filteredPriceOptions = priceOptions.filter((option) => {
    const optionMin = option.range.min;
    const optionMax = option.range.max;
    const withinMin =
      optionMin >= totalpricerange.min && optionMin <= totalpricerange.max;
    const withinMax =
      optionMax >= totalpricerange.min && optionMax <= totalpricerange.max;
    const encompasses =
      optionMin <= totalpricerange.min && optionMax >= totalpricerange.max;

    return withinMin || withinMax || encompasses;
  });

  console.log(filteredPriceOptions, "filteredPriceOptions");
  const powerOptions = [
    {
      range: { min: 0, max: 200 },
      powerLabel: "Below 200hp",
      value: "0-200",
    },
    {
      range: { min: 201, max: 400 },
      powerLabel: "200hp - 400hp",
      value: "201-400",
    },
    {
      range: { min: 401, max: 600 },
      powerLabel: "400hp - 600hp",
      value: "401-600",
    },
    {
      range: { min: 601, max: 1000 },
      powerLabel: "600hp - 1000hp",
      value: "601-1000",
    },
    {
      range: { min: 1001, max: 1400 },
      powerLabel: "1000hp - 1400hp",
      value: "1001-1400",
    },
    {
      range: { min: 1401, max: 2000 },
      powerLabel: "1400hp - 2000hp",
      value: "1401-2000",
    },
  ];

  const filterPower = powerOptions.filter((option) => {
    const optionMin = option.range.min;
    const optionMax = option.range.max;
    const withinMin =
      optionMin >= totalpowerrange.min && optionMin <= totalpowerrange.max;
    const withinMax =
      optionMax >= totalpowerrange.min && optionMax <= totalpowerrange.max;
    const encompasses =
      optionMin <= totalpowerrange.min && optionMax >= totalpowerrange.max;

    return withinMin || withinMax || encompasses;
  });

  const displacementOptions = [
    {
      range: { min: 0, max: 1000 },
      displacementLabel: "Below 1000cc",
      value: "0-1000",
    },
    {
      range: { min: 1000, max: 2000 },
      displacementLabel: "1000cc - 2000cc",
      value: "1000-2000",
    },
    {
      range: { min: 2000, max: 4000 },
      displacementLabel: "2000cc - 4000cc",
      value: "2000-4000",
    },
    {
      range: { min: 4000, max: 8000 },
      displacementLabel: "4000cc - 8000cc",
      value: "4000-8000",
    },
  ];

  const filtereDisplacement = displacementOptions.filter((option) => {
    const optionMin = option.range.min;
    const optionMax = option.range.max;
    const withinMin =
      optionMin >= totaldisplacementrange.min &&
      optionMin <= totaldisplacementrange.max;
    const withinMax =
      optionMax >= totaldisplacementrange.min &&
      optionMax <= totaldisplacementrange.max;
    const encompasses =
      optionMin <= totaldisplacementrange.min &&
      optionMax >= totaldisplacementrange.max;

    return withinMin || withinMax || encompasses;
  });

  const handlePriceChange = (priceValue) => {
    setSelectedPrice((prevSelectedPrice) => {
      if (prevSelectedPrice.includes(priceValue)) {
        return prevSelectedPrice.filter((value) => value !== priceValue);
      } else {
        return [...prevSelectedPrice, priceValue];
      }
    });
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("price", priceValue);
  };

  const handlePowerChange = (powerValue) => {
    setSelectedPower((prevSelectedPower) => {
      if (prevSelectedPower.includes(powerValue)) {
        return prevSelectedPower.filter((value) => value !== powerValue);
      } else {
        return [...prevSelectedPower, powerValue];
      }
    });
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("power", powerValue);
  };

  const handleDisplacementChange = (displacementValue) => {
    setSelectedDisplacement((prevSelectedDisplacement) => {
      if (prevSelectedDisplacement.includes(displacementValue)) {
        return prevSelectedDisplacement.filter(
          (value) => value !== displacementValue
        );
      } else {
        return [...prevSelectedDisplacement, displacementValue];
      }
    });
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("displacement", displacementValue);
  };

  const handleFuelTypeChange = (fuelTypeValue) => {
    setSelectedFuelType((prevSelectedfuelType) => {
      if (prevSelectedfuelType.includes(fuelTypeValue)) {
        return prevSelectedfuelType.filter((value) => value !== fuelTypeValue);
      } else {
        return [...prevSelectedfuelType, fuelTypeValue];
      }
    });
    console.log(fuelTypeValue, "fuelTypeValue");
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("fuelType", fuelTypeValue);
  };

  const handleCylindersChange = (cylindersValue) => {
    setSelectedCylinders((prevSelectedcylinders) => {
      if (prevSelectedcylinders.includes(cylindersValue)) {
        return prevSelectedcylinders.filter(
          (value) => value !== cylindersValue
        );
      } else {
        return [...prevSelectedcylinders, cylindersValue];
      }
    });
    console.log(cylindersValue, "cylindersValue");
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("cylinders", cylindersValue);
  };

  const handleDriveChange = (driveValue) => {
    setSelectedDrive((prevSelecteddrive) => {
      if (prevSelecteddrive.includes(driveValue)) {
        return prevSelecteddrive.filter((value) => value !== driveValue);
      } else {
        return [...prevSelecteddrive, driveValue];
      }
    });
    console.log(driveValue, "driveValue");
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("drive", driveValue);
  };

  const handletranmissionChange = (tranmissionValue) => {
    setSelectedTransmission((prevSelectedtranmission) => {
      if (prevSelectedtranmission.includes(tranmissionValue)) {
        return prevSelectedtranmission.filter(
          (value) => value !== tranmissionValue
        );
      } else {
        return [...prevSelectedtranmission, tranmissionValue];
      }
    });
    console.log(tranmissionValue, "tranmissionValue");
    setCurrentPage(1); // Reset page number
    updateSelectedFilters("tranmission", tranmissionValue);
  };

  return (
    <div className={`col-xl-3 order-xl-1 order-2 ${displaynone && "d-md-block d-none"}`}>
      {/* <div className="filter-area mb-3">
        <div className="title-and-close-btn mb-20">
          {areFiltersActive() && (
            <div className="close-btn" onClick={clearAllFilters}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
              >
                <path d="M7 13.125C5.37555 13.125 3.81763 12.4797 2.66897 11.331C1.52031 10.1824 0.875 8.62445 0.875 7C0.875 5.37555 1.52031 3.81763 2.66897 2.66897C3.81763 1.52031 5.37555 0.875 7 0.875C8.62445 0.875 10.1824 1.52031 11.331 2.66897C12.4797 3.81763 13.125 5.37555 13.125 7C13.125 8.62445 12.4797 10.1824 11.331 11.331C10.1824 12.4797 8.62445 13.125 7 13.125ZM7 14C8.85652 14 10.637 13.2625 11.9497 11.9497C13.2625 10.637 14 8.85652 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0C5.14348 0 3.36301 0.737498 2.05025 2.05025C0.737498 3.36301 0 5.14348 0 7C0 8.85652 0.737498 10.637 2.05025 11.9497C3.36301 13.2625 5.14348 14 7 14Z" />
                <path d="M4.06506 4.06506C4.1057 4.02431 4.15397 3.99199 4.20713 3.96993C4.26028 3.94788 4.31726 3.93652 4.37481 3.93652C4.43235 3.93652 4.48933 3.94788 4.54248 3.96993C4.59564 3.99199 4.64392 4.02431 4.68456 4.06506L6.99981 6.38118L9.31506 4.06506C9.35573 4.02438 9.40402 3.99211 9.45717 3.9701C9.51032 3.94808 9.56728 3.93675 9.62481 3.93675C9.68233 3.93675 9.73929 3.94808 9.79244 3.9701C9.84559 3.99211 9.89388 4.02438 9.93456 4.06506C9.97523 4.10573 10.0075 4.15402 10.0295 4.20717C10.0515 4.26032 10.0629 4.31728 10.0629 4.37481C10.0629 4.43233 10.0515 4.48929 10.0295 4.54244C10.0075 4.59559 9.97523 4.64388 9.93456 4.68456L7.61843 6.99981L9.93456 9.31506C9.97523 9.35573 10.0075 9.40402 10.0295 9.45717C10.0515 9.51032 10.0629 9.56728 10.0629 9.62481C10.0629 9.68233 10.0515 9.73929 10.0295 9.79244C10.0075 9.84559 9.97523 9.89388 9.93456 9.93456C9.89388 9.97523 9.84559 10.0075 9.79244 10.0295C9.73929 10.0515 9.68233 10.0629 9.62481 10.0629C9.56728 10.0629 9.51032 10.0515 9.45717 10.0295C9.40402 10.0075 9.35573 9.97523 9.31506 9.93456L6.99981 7.61843L4.68456 9.93456C4.64388 9.97523 4.59559 10.0075 4.54244 10.0295C4.48929 10.0515 4.43233 10.0629 4.37481 10.0629C4.31728 10.0629 4.26032 10.0515 4.20717 10.0295C4.15402 10.0075 4.10573 9.97523 4.06506 9.93456C4.02438 9.89388 3.99211 9.84559 3.9701 9.79244C3.94808 9.73929 3.93675 9.68233 3.93675 9.62481C3.93675 9.56728 3.94808 9.51032 3.9701 9.45717C3.99211 9.40402 4.02438 9.35573 4.06506 9.31506L6.38118 6.99981L4.06506 4.68456C4.02431 4.64392 3.99199 4.59564 3.96993 4.54248C3.94788 4.48933 3.93652 4.43235 3.93652 4.37481C3.93652 4.31726 3.94788 4.26028 3.96993 4.20713C3.99199 4.15397 4.02431 4.1057 4.06506 4.06506Z" />
              </svg>{" "}
              Clear All
            </div>
          )}
        </div>
        <div className="tags">
          <ul>
            {selectedFilters.map((filter, index) => (
              <li className="grid active" key={`${filter.type}-${index}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={8}
                  height={8}
                  viewBox="0 0 8 8"
                  onClick={() => removeFilter(filter.type, filter.value)}
                >
                  <path d="M0.167842 0.167842C0.220911 0.114638 0.283955 0.0724268 0.353363 0.0436257C0.422771 0.0148246 0.497179 0 0.572325 0C0.647471 0 0.72188 0.0148246 0.791287 0.0436257C0.860695 0.0724268 0.923739 0.114638 0.976809 0.167842L4.00015 3.19233L7.02349 0.167842C7.07661 0.114724 7.13967 0.072589 7.20907 0.043842C7.27847 0.015095 7.35286 0.000299116 7.42797 0.000299116C7.50309 0.000299116 7.57748 0.015095 7.64688 0.043842C7.71628 0.072589 7.77934 0.114724 7.83246 0.167842C7.88558 0.220959 7.92771 0.284019 7.95646 0.35342C7.98521 0.422821 8 0.497206 8 0.572325C8 0.647445 7.98521 0.721829 7.95646 0.79123C7.92771 0.860632 7.88558 0.923691 7.83246 0.976809L4.80797 4.00015L7.83246 7.02349C7.88558 7.07661 7.92771 7.13967 7.95646 7.20907C7.98521 7.27847 8 7.35286 8 7.42797C8 7.50309 7.98521 7.57748 7.95646 7.64688C7.92771 7.71628 7.88558 7.77934 7.83246 7.83246C7.77934 7.88558 7.71628 7.92771 7.64688 7.95646C7.57748 7.98521 7.50309 8 7.42797 8C7.35286 8 7.27847 7.98521 7.20907 7.95646C7.13967 7.92771 7.07661 7.88558 7.02349 7.83246L4.00015 4.80797L0.976809 7.83246C0.923691 7.88558 0.860632 7.92771 0.79123 7.95646C0.721829 7.98521 0.647445 8 0.572325 8C0.497206 8 0.422821 7.98521 0.35342 7.95646C0.284019 7.92771 0.220959 7.88558 0.167842 7.83246C0.114724 7.77934 0.072589 7.71628 0.043842 7.64688C0.015095 7.57748 0.000299116 7.50309 0.000299116 7.42797C0.000299116 7.35286 0.015095 7.27847 0.043842 7.20907C0.072589 7.13967 0.114724 7.07661 0.167842 7.02349L3.19233 4.00015L0.167842 0.976809C0.114638 0.923739 0.0724268 0.860695 0.0436257 0.791287C0.0148246 0.72188 0 0.647471 0 0.572325C0 0.497179 0.0148246 0.422771 0.0436257 0.353363C0.0724268 0.283955 0.114638 0.220911 0.167842 0.167842Z" />
                </svg>{" "}
                {filter.value}
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      <div
        className={`car-details-menu ${
          isSticky ? "sticky product-sidebar" : "product-sidebar"
        }`}
      >
        {/* Price filter UI */}

        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={togglePriceDropdown}
            >
              Price
              <span
                className={`dropdown-icon ${showPriceDropdown ? "open" : ""}`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showPriceDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {filteredPriceOptions.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss">
                      <input
                        type="checkbox"
                        checked={selectedPrice.includes(option.value)}
                        onChange={() => handlePriceChange(option.value)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option.priceLabel}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {router.pathname !== "/brands/[brandname]" && (
          <div className="product-widget mb-1">
            <div className="check-box-item">
              <h3
                className="product-widget-title mb-20 cursor_pointer"
                onClick={toggleBrandDropdown}
              >
                Select Brand
                {/* Add an icon for dropdown indicator */}
                <span
                  className={`dropdown-icon ${showBrandDropdown ? "open" : ""}`}
                >
                  <i class="bi bi-chevron-down" />
                </span>
              </h3>
              <div
                className={`checkbox-container ${
                  showBrandDropdown ? "show" : "hide"
                }`}
              >
                <div className="form-inner">
                  <input
                    type="text"
                    placeholder="Search Brand"
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                </div>
                <ul className="overflow-list pt-2 pb-4">
                  {filteredAndSortedBrandOptions.map((item, idx) => (
                    <li key={idx}>
                      <label className="containerss">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(item.value)}
                          onChange={() => handleBrandChange(item.value)}
                        />
                        <span className="checkmark" />
                        <span className="text">{item.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {router.pathname !== "/category/[categoryname]" && (
          <div className="product-widget mb-20">
            <div className="check-box-item">
              <h3
                className="product-widget-title mb-20 cursor-pointer"
                onClick={toggleBodyDropdown}
              >
                Body Type
              </h3>
              <div className={`${showBodyDropdown ? "show" : "hide"}`}>
                <div className="row g-xl-2 gy-2 ">
                  {bodyoptions.map((item, idx) => (
                    <div className="col-xl-4 col-4">
                      <button
                        key={idx}
                        className={`category-box-button d-flex flex-column  align-items-center p-2 shadow-sm rounded ${
                          selectedBody.includes(item.value)
                            ? "text-secondary fw-bold bg-white border border-2"
                            : "bg-white border border-2 border-white"
                        }`}
                        onClick={() => handleBodyChange(item.value)}
                      >
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-6 h-6 object-contain mb-2"
                        />
                        <small>{item.label}</small>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Power filter UI */}
        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={togglePowerDropdown}
            >
              Power
              <span
                className={`dropdown-icon ${showPowerDropdown ? "open" : ""}`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showPowerDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {filterPower.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedPower.includes(option.value)}
                        onChange={() => handlePowerChange(option.value)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option.powerLabel}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Displacement filter UI */}

        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={toggleDisplacementDropdown}
            >
              Displacement
              <span
                className={`dropdown-icon ${
                  showDisplacementDropdown ? "open" : ""
                }`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showDisplacementDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {filtereDisplacement.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedDisplacement.includes(option.value)}
                        onChange={() => handleDisplacementChange(option.value)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option.displacementLabel}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={toggleFuelTypeDropdown}
            >
              Fuel Type
              <span
                className={`dropdown-icon ${
                  showFuelTypeDropdown ? "open" : ""
                }`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showFuelTypeDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {fuelTypeList.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedFuelType.includes(option)}
                        onChange={() => handleFuelTypeChange(option)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={toggleCylindersDropdown}
            >
              Cylinders
              <span
                className={`dropdown-icon ${
                  showCylindersDropdown ? "open" : ""
                }`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showCylindersDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {cylinderList.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedCylinders.includes(option)}
                        onChange={() => handleCylindersChange(option)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option} Cylinder</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={toggleTransmissionsDropdown}
            >
              Transmissions
              <span
                className={`dropdown-icon ${
                  showTransmissionsDropdown ? "open" : ""
                }`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showTransmissionsDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {transmissionList.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedTransmission.includes(option)}
                        onChange={() => handletranmissionChange(option)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="product-widget mb-20">
          <div className="check-box-item">
            <h3
              className="product-widget-title mb-20 cursor_pointer"
              onClick={toggleDriveDropdown}
            >
              Drive
              <span
                className={`dropdown-icon ${showDriveDropdown ? "open" : ""}`}
              >
                <i class="bi bi-chevron-down" />
              </span>
            </h3>
            <div
              className={`checkbox-container ${
                showDriveDropdown ? "show" : "hide"
              }`}
            >
              <ul className="pt-2 pb-4">
                {driveList.map((option, idx) => (
                  <li key={idx}>
                    <label className="containerss" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedDrive.includes(option)}
                        onChange={() => handleDriveChange(option)}
                      />
                      <span className="checkmark" />
                      <span className="text">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarLeftSidebar;
