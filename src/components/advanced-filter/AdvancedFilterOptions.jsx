"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Slider,
} from "@mui/material";
import axios from "axios";
import Price from '@/utils/Price';
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from '../buttons/PrimaryButton';

export default function AdvancedFilterOptions({ brandoptions,
    bodyoptions,
    fueloptions,
    totalpricerange,
    totaldisplacementrange,
    totalpowerrange,
    cylinderoptions,
    transmissionsoptions,
    driveoptions,
    displaynone,
    toggleModal,
    setIsLoading,
    additionalQueryParams }) {




    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedBrandIds, setSelectedBrandIds] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

    useEffect(() => {
        const fetchPriceRange = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}car-trims/priceRange`
                );

                setPriceRange(response?.data?.price);
            } catch (error) {
                console.error("Failed to fetch filtered trims:", error);
            }
        };
        fetchPriceRange();
    }, [router]);

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

    useEffect(() => {
        if (!isInitialRender) return; // Prevent re-running on subsequent renders

        const query = new URLSearchParams(window.location.search);
        const brands = query.get("brand") ? query.get("brand").split(",") : [];
        const bodies = query.get("bodytype") ? query.get("bodytype").split(",") : [];
        const prices = query.get("price") ? query.get("price").split(",") : [];
        const powers = query.get("power") ? query.get("power").split(",") : [];
        const displacements = query.get("displacement") ? query.get("displacement").split(",") : [];
        const fuelTypes = query.get("fuelType") ? query.get("fuelType").split(",") : [];
        const cylinders = query.get("cylinders") ? query.get("cylinders").split(",") : [];
        const drive = query.get("drive") ? query.get("drive").split(",") : [];
        const transmission = query.get("transmission") ? query.get("transmission").split(",") : [];

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

        setIsInitialRender(false); // Mark initial render as completed
    }, [isInitialRender]);


    useEffect(() => {
        if (isInitialRender) return; // Skip if it's the initial render

        const currentParams = new URLSearchParams(searchParams.toString());

        const updateParamsForFilter = (key, value) => {
            if (value.length > 0) {
                currentParams.set(key, value.join(","));
            } else {
                currentParams.delete(key);
            }
        };

        // Update URL parameters based on the current filter states
        updateParamsForFilter("brand", selectedBrands);
        updateParamsForFilter("bodytype", selectedBody);
        updateParamsForFilter("price", selectedPrice);
        updateParamsForFilter("power", selectedPower);
        updateParamsForFilter("displacement", selectedDisplacement);
        updateParamsForFilter("fuelType", selectedFuelType);
        updateParamsForFilter("cylinders", selectedCylinders);
        updateParamsForFilter("drive", selectedDrive);
        updateParamsForFilter("transmission", selectedTransmission);

        // Include any additional query parameters
        Object.entries(additionalQueryParams).forEach(([key, value]) => {
            if (value) {
                currentParams.set(key, value);
            } else {
                currentParams.delete(key);
            }
        });

        if (currentPage > 1) {
            currentParams.set("page", currentPage.toString());
        } else {
            currentParams.delete("page");
        }

        const queryString = currentParams.toString();
        const baseUrl = pathname.replace(/\[.*?\]/g, (matched) => searchParams[matched.substring(1, matched.length - 1)] || "");

        router.replace(`${baseUrl}${queryString.length > 0 ? "?" : ""}${queryString}`, undefined, { shallow: true });

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
        // additionalQueryParams,
        pathname,
        // searchParams,
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
    const inputRef = useRef(null);
    const mobileInputRef = useRef(null);
    const [searchBodyText, setSearchBodyText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // to ensure focus remains on input after rerender
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchText]);
    // to ensure focus remains on input after rerender
    useEffect(() => {
        if (mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    }, [searchText]);

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
            option?.label?.toLowerCase()?.includes(searchText.toLowerCase())
        );

        // Then, sort the filtered options
        return sortOptions(filtered, selectedBrands);
    }, [brandoptions, searchText, selectedBrands]);

    console.log(filteredAndSortedBrandOptions, "filteredAndSortedBrandOptions");


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

        setCurrentPage(1); // Reset page number
        updateSelectedFilters("tranmission", tranmissionValue);
    };

    const [showPrice, setShowPrice] = useState(false);
    const [tempSelectedPrice, setTempSelectedPrice] = useState([]);

    // This effect syncs the selectedPrice with tempSelectedPrice each time the modal is opened
    useEffect(() => {
        if (showPrice) {
            setTempSelectedPrice(selectedPrice);
        }
    }, [showPrice, selectedPrice]);

    // Step 2: Update this function to modify tempSelectedPrice instead
    const handleModalPriceChange = (priceValue) => {
        setTempSelectedPrice((prevSelectedPrice) => {
            if (prevSelectedPrice.includes(priceValue)) {
                return prevSelectedPrice.filter((value) => value !== priceValue);
            } else {
                return [...prevSelectedPrice, priceValue];
            }
        });
    };

    console.log(tempSelectedPrice, "tempSelectedPrice");
    // Step 3: Apply changes when "Apply Filter" is clicked
    const applyPriceFilter = () => {
        setSelectedPrice(tempSelectedPrice);
        setCurrentPage(1); // Reset page number if necessary
        setShowPrice(false); // Close the modal
    };
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [tempSelectedBrands, setTempSelectedBrands] = useState([]);

    useEffect(() => {
        if (showBrandModal) {
            // Assuming you have a state `showBrandModal` to control the modal visibility
            setTempSelectedBrands(selectedBrands);
        }
    }, [showBrandModal, selectedBrands]);

    const handleModalBrandChange = (brandSlug) => {
        setTempSelectedBrands((prevSelectedBrands) => {
            if (prevSelectedBrands.includes(brandSlug)) {
                return prevSelectedBrands.filter((slug) => slug !== brandSlug);
            } else {
                return [...prevSelectedBrands, brandSlug];
            }
        });
    };

    const applyBrandFilter = () => {
        setSelectedBrands(tempSelectedBrands);
        setCurrentPage(1); // Reset page number if necessary
        setShowBrandModal(false); // Assuming you manage modal visibility with this state
    };

    const [tempSelectedBodyTypes, setTempSelectedBodyTypes] = useState([]);
    const [showBodyTypeModal, setShowBodyTypeModal] = useState(false);

    useEffect(() => {
        if (showBodyTypeModal) {
            setTempSelectedBodyTypes(selectedBody);
        }
    }, [showBodyTypeModal, selectedBody]);

    const handleModalBodyTypeChange = (bodyTypeSlug) => {
        setTempSelectedBodyTypes((prevSelectedBodyTypes) => {
            if (prevSelectedBodyTypes.includes(bodyTypeSlug)) {
                return prevSelectedBodyTypes.filter((slug) => slug !== bodyTypeSlug);
            } else {
                return [...prevSelectedBodyTypes, bodyTypeSlug];
            }
        });
    };

    const applyBodyTypeFilter = () => {
        setSelectedBody(tempSelectedBodyTypes);
        setCurrentPage(1); // Reset the page number if necessary
        setShowBodyTypeModal(false); // Close the modal
    };

    const [tempSelectedPower, setTempSelectedPower] = useState([]);
    const [showPowerModal, setShowPowerModal] = useState(false);

    // Synchronize tempSelectedPower with selectedPower when the modal opens
    useEffect(() => {
        if (showPowerModal) {
            setTempSelectedPower(selectedPower);
        }
    }, [showPowerModal, selectedPower]);

    // Handle changes in the power modal
    const handleModalPowerChange = (powerValue) => {
        setTempSelectedPower((prevSelectedPower) => {
            if (prevSelectedPower.includes(powerValue)) {
                return prevSelectedPower.filter((value) => value !== powerValue);
            } else {
                return [...prevSelectedPower, powerValue];
            }
        });
    };

    // Apply the changes from the power modal
    const applyPowerFilter = () => {
        setSelectedPower(tempSelectedPower);
        setCurrentPage(1); // Reset page number if necessary
        setShowPowerModal(false); // Close the modal
    };

    const [tempSelectedDisplacement, setTempSelectedDisplacement] = useState([]);
    const [showDisplacementModal, setShowDisplacementModal] = useState(false);

    // Synchronize tempSelectedDisplacement with selectedDisplacement when the modal opens
    useEffect(() => {
        if (showDisplacementModal) {
            setTempSelectedDisplacement(selectedDisplacement);
        }
    }, [showDisplacementModal, selectedDisplacement]);

    // Handle changes in the displacement modal
    const handleModalDisplacementChange = (displacementValue) => {
        setTempSelectedDisplacement((prevSelectedDisplacement) => {
            if (prevSelectedDisplacement.includes(displacementValue)) {
                return prevSelectedDisplacement.filter(
                    (value) => value !== displacementValue
                );
            } else {
                return [...prevSelectedDisplacement, displacementValue];
            }
        });
    };

    // Apply the changes from the displacement modal
    const applyDisplacementFilter = () => {
        setSelectedDisplacement(tempSelectedDisplacement);
        setCurrentPage(1); // Reset page number if necessary
        setShowDisplacementModal(false); // Close the modal
    };

    const [tempSelectedFuelType, setTempSelectedFuelType] = useState([]);
    const [showFuelTypeModal, setShowFuelTypeModal] = useState(false);

    // Synchronize tempSelectedFuelType with selectedFuelType when the modal opens
    useEffect(() => {
        if (showFuelTypeModal) {
            setTempSelectedFuelType(selectedFuelType);
        }
    }, [showFuelTypeModal, selectedFuelType]);

    // Handle changes in the fuel type modal
    const handleModalFuelTypeChange = (fuelTypeValue) => {
        setTempSelectedFuelType((prevSelectedFuelType) => {
            if (prevSelectedFuelType.includes(fuelTypeValue)) {
                return prevSelectedFuelType.filter((value) => value !== fuelTypeValue);
            } else {
                return [...prevSelectedFuelType, fuelTypeValue];
            }
        });
    };

    // Apply the changes from the fuel type modal
    const applyFuelTypeFilter = () => {
        setSelectedFuelType(tempSelectedFuelType);
        setCurrentPage(1); // Reset page number if necessary
        setShowFuelTypeModal(false); // Close the modal
    };

    const [tempSelectedCylinders, setTempSelectedCylinders] = useState([]);
    const [showCylinderModal, setShowCylinderModal] = useState(false);

    // Synchronize tempSelectedCylinders with selectedCylinders when the modal opens
    useEffect(() => {
        if (showCylinderModal) {
            setTempSelectedCylinders(selectedCylinders);
        }
    }, [showCylinderModal, selectedCylinders]);

    // Handle changes in the cylinder modal
    const handleModalCylinderChange = (cylinderValue) => {
        setTempSelectedCylinders((prevSelectedCylinders) => {
            if (prevSelectedCylinders.includes(cylinderValue)) {
                return prevSelectedCylinders.filter((value) => value !== cylinderValue);
            } else {
                return [...prevSelectedCylinders, cylinderValue];
            }
        });
    };

    // Apply the changes from the cylinder modal
    const applyCylinderFilter = () => {
        setSelectedCylinders(tempSelectedCylinders);
        setCurrentPage(1); // Reset page number if necessary
        setShowCylinderModal(false); // Close the modal
    };

    const [tempSelectedTransmissions, setTempSelectedTransmissions] = useState(
        []
    );
    const [showTransmissionModal, setShowTransmissionModal] = useState(false);

    // Synchronize tempSelectedTransmissions with selectedTransmission when the modal opens
    useEffect(() => {
        if (showTransmissionModal) {
            setTempSelectedTransmissions(selectedTransmission);
        }
    }, [showTransmissionModal, selectedTransmission]);

    // Handle changes in the transmission modal
    const handleModalTransmissionChange = (transmissionValue) => {
        setTempSelectedTransmissions((prevSelectedTransmissions) => {
            if (prevSelectedTransmissions.includes(transmissionValue)) {
                return prevSelectedTransmissions.filter(
                    (value) => value !== transmissionValue
                );
            } else {
                return [...prevSelectedTransmissions, transmissionValue];
            }
        });
    };

    // Apply the changes from the transmission modal
    const applyTransmissionFilter = () => {
        setSelectedTransmission(tempSelectedTransmissions);
        setCurrentPage(1); // Reset page number if necessary
        setShowTransmissionModal(false); // Close the modal
    };

    const [tempSelectedDrive, setTempSelectedDrive] = useState([]);
    const [showDriveModal, setShowDriveModal] = useState(false);

    // Synchronize tempSelectedDrive with selectedDrive when the modal opens
    useEffect(() => {
        if (showDriveModal) {
            setTempSelectedDrive(selectedDrive);
        }
    }, [showDriveModal, selectedDrive]);

    console.log(tempSelectedDrive, "tempSelectedDrive");

    // Handle changes in the drive modal
    const handleModalDriveChange = (driveValue) => {
        setTempSelectedDrive((prevSelectedDrive) => {
            if (prevSelectedDrive.includes(driveValue)) {
                return prevSelectedDrive.filter((value) => value !== driveValue);
            } else {
                return [...prevSelectedDrive, driveValue];
            }
        });
    };

    // Apply the changes from the drive modal
    const applyDriveFilter = () => {
        setSelectedDrive(tempSelectedDrive);
        setCurrentPage(1); // Reset page number if necessary
        setShowDriveModal(false); // Close the modal
    };

    const [filters, setFilters] = useState([
        {
            id: "fullfilter",
            label: "All Filters",
            showModal: false,
        },
        {
            id: "price",
            label: "Price",
            showModal: false,
        },
        {
            id: "brand",
            label: "Brands",
            showModal: false,
        },
        {
            id: "bodyType",
            label: "Body Types",
            showModal: false,
        },

        {
            id: "power",
            label: "Power",
            showModal: false,
        },
        {
            id: "displacement",
            label: "Displacement",
            showModal: false,
        },
        {
            id: "fuelType",
            label: "Fuel Types",
            showModal: false,
        },
        {
            id: "cylinder",
            label: "Cylinders",
            showModal: false,
        },
        {
            id: "transmission",
            label: "Transmissions",
            showModal: false,
        },
        {
            id: "drive",
            label: "Drive",
            showModal: false,
        },
        // Add other filters as needed
    ]);

    const filterFunctions = {
        price: applyPriceFilter,
        brand: applyBrandFilter,
        bodyType: applyBodyTypeFilter,
        displacement: applyPowerFilter,
        displacement: applyDisplacementFilter,
        fuelType: applyFuelTypeFilter,
        cylinder: applyCylinderFilter,
        transmission: applyTransmissionFilter,
        drive: applyDriveFilter,
    };

    const handleToggleModal = (filterId) => {
        setFilters(
            filters.map((filter) => {
                if (filter.id === filterId) {
                    return { ...filter, showModal: !filter.showModal };
                }
                return filter;
            })
        );
    };

    useEffect(() => {
        handleToggleModal(toggleModal);
    }, [toggleModal]);

    const renderFilterContent = (filter) => {
        switch (filter.id) {
            case "price":
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div
                                    className={`checkbox-container ${showPriceDropdown ? "show" : "hide"
                                        }`}
                                >
                                    <ul className="py-4 px-2">
                                        {filteredPriceOptions.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss ">
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedPrice.includes(option.value)}
                                                        onChange={() =>
                                                            handleModalPriceChange(option.value)
                                                        }
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text ">{option.priceLabel}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "brand":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget mb-1">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <div className="border-bottom me-2 sticky p-1 ">
                                        <input
                                            type="text"
                                            placeholder="Search Brand"
                                            value={searchText}
                                            className="fs-7"
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <ul className="py-4 px-2">
                                        {filteredAndSortedBrandOptions.map((item, idx) => (
                                            <li key={idx}>
                                                <label className="containerss">
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedBrands.includes(item.value)}
                                                        onChange={() => handleModalBrandChange(item.value)}
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">{item.label}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "bodyType":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className="show">
                                    <div className="row g-xl-2 gy-2 ">
                                        {bodyoptions.map((item, idx) => (
                                            <div className="col-xl-4 col-4" key={idx}>
                                                <button
                                                    key={idx}
                                                    className={`category-box-button setCategoryButtonHeight d-flex flex-column justify-content-center align-items-center p-2 shadow-sm rounded ${tempSelectedBodyTypes.includes(item.value)
                                                        ? "text-secondary fw-bold bg-white border border-2"
                                                        : "bg-white border border-2 border-white fw-bold"
                                                        }`}
                                                    onClick={() => handleModalBodyTypeChange(item.value)}
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
                    </div>
                );

            case "power":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <ul className="pt-2 pb-4 ">
                                        {filterPower.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedPower.includes(option.value)}
                                                        onChange={() =>
                                                            handleModalPowerChange(option.value)
                                                        }
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">{option.powerLabel}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "displacement":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <ul className="pt-2 pb-4 ">
                                        {filtereDisplacement.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedDisplacement.includes(
                                                            option.value
                                                        )}
                                                        onChange={() =>
                                                            handleModalDisplacementChange(option.value)
                                                        }
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">
                                                        {option.displacementLabel}
                                                    </span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "fuelType":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <ul className="pt-2 pb-4 ">
                                        {fueloptions.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedFuelType.includes(option)}
                                                        onChange={() => handleModalFuelTypeChange(option)}
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">{option}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "cylinder":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <ul className="pt-2 pb-4 ">
                                        {cylinderoptions.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedCylinders.includes(option)}
                                                        onChange={() => handleModalCylinderChange(option)}
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">{option} Cylinder</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "transmission":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <ul className="pt-2 pb-4 ">
                                        {transmissionsoptions.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedTransmissions.includes(option)}
                                                        onChange={() =>
                                                            handleModalTransmissionChange(option)
                                                        }
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">{option}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "drive":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={`car-details-menu product-sidebar border-0`}>
                        <div className="product-widget ">
                            <div className="check-box-item">
                                <div className={`checkbox-container show`}>
                                    <ul className="pt-2 pb-4 ">
                                        {driveoptions.map((option, idx) => (
                                            <li key={idx}>
                                                <label className="containerss" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedDrive.includes(option)}
                                                        onChange={() => handleModalDriveChange(option)}
                                                    />
                                                    <span className="checkmark checkmarkRight0" />
                                                    <span className="text">{option}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "fullfilter":
                // Assuming you have a Slider component (from a UI library or a custom one)
                return (
                    <div className={` order-xl-1 order-2 shadow-xl p-6 rounded-xl overflow-y-auto`}>


                        {/* Price filter UI */}

                        {pathname !== "/find-your-car" && (
                            <Accordion title="Price" defaultOpen={true}>
                                <CheckboxFilter
                                    options={filteredPriceOptions}
                                    selectedOptions={tempSelectedPrice}
                                    handleChange={handleModalPriceChange}
                                    labelKey="priceLabel"
                                    valueKey="value"
                                />
                            </Accordion>
                        )}

                        <div>
                            <div className="px-4 mt-6 mb-3">
                                <Slider
                                    value={[minPrice, maxPrice]}
                                    onChange={handleSliderChange}
                                    onChangeCommitted={handleSliderChangeCommitted}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={formatPrice}
                                    min={initialValues[0]}
                                    max={initialValues[1]}
                                    step={1000} // Adjust step as necessary
                                    // marks={marks}
                                    sx={{
                                        "& .MuiSlider-track": {
                                            height: 20,
                                            backgroundColor: "var(--primary)",
                                        },
                                        "& .MuiSlider-rail": {
                                            height: 20,
                                        },
                                        "& .MuiSlider-thumb": {
                                            height: 25,
                                            width: 25,
                                            "&:hover, &.Mui-focusVisible, &.Mui-active": {
                                                boxShadow: "none",
                                            },
                                        },

                                        height: 4, // Adjust the height here
                                        "& .MuiSlider-track": {
                                            height: 5, // Ensure the track matches the slider height
                                        },
                                        "& .MuiSlider-rail": {
                                            height: 5, // Ensure the rail matches the slider height
                                        },
                                        "& .MuiSlider-thumb": {
                                            width: 16, // Adjust thumb size if needed
                                            height: 16,
                                        },
                                    }}
                                />
                            </div>
                            <div className="flex justify-between flex-wrap flex-col mb-4">
                                <p className="border rounded-lg px-2 py-3 border-solid my-1 border-gray-300 whitespace-nowrap">
                                    <strong>Min:</strong>{" "}
                                    <span>
                                        <Price data={minPrice} />
                                    </span>
                                </p>
                                <p className="border rounded-lg px-2 py-3 border-solid my-1 border-gray-300 whitespace-nowrap">
                                    <strong>Max:</strong>{" "}
                                    <span>
                                        <Price data={maxPrice} />
                                    </span>
                                </p>
                            </div>


                            {pathname !== "/brands/[brandname]" && (
                                <Accordion title="Brand" defaultOpen={true}>
                                    <div className="form-inner mb-4">
                                        <input
                                            type="text"
                                            ref={mobileInputRef}
                                            placeholder="Search Brand"
                                            className="w-full test px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={searchText}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <CheckboxFilter
                                        options={filteredAndSortedBrandOptions}
                                        selectedOptions={tempSelectedBrands}
                                        handleChange={handleModalBrandChange}
                                    />
                                </Accordion>
                            )}


                            <Accordion title="Body Type" defaultOpen={true}>
                                {/* <CheckboxFilter
                                    options={bodyoptions}
                                    selectedOptions={selectedBody}
                                    handleChange={handleBodyChange}
                                    labelKey="bodyTypeLabel"
                                    valueKey="value"
                                /> */}
                                <div className='grid grid-cols-3 gap-2 '>
                                    {bodyoptions.map((item, idx) => (
                                        <div className="h-[70px]" key={idx}>
                                            <button
                                                key={idx}
                                                className={`shadow rounded-xl p-2 ${tempSelectedBodyTypes.includes(item.value)
                                                    ? "bg-blue-200 font-semibold"
                                                    : "bg-white "
                                                    }`}
                                                onClick={() => handleModalBodyTypeChange(item.value)}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.label}
                                                    className="w-20 h-8 object-contain mb-2"
                                                />
                                                <p className='text-[10px]'>{item.label}</p>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                            </Accordion>
                            {pathname !== "/body-types/[categoryname]" && (
                                <Accordion title="Power" defaultOpen={true}>
                                    <CheckboxFilter
                                        options={filterPower}
                                        selectedOptions={tempSelectedPower}
                                        handleChange={handleModalPowerChange}
                                        labelKey="powerLabel"
                                        valueKey="value"
                                    />
                                </Accordion>
                            )}




                            <Accordion title="Displacement" defaultOpen={true}>
                                <CheckboxFilter
                                    options={filtereDisplacement}
                                    selectedOptions={tempSelectedDisplacement}
                                    handleChange={handleModalDisplacementChange}
                                    labelKey="displacementLabel"
                                    valueKey="value"
                                />
                            </Accordion>


                            <Accordion title="Fuel Type" defaultOpen={true}><CheckboxFilter
                                options={fueloptions}
                                selectedOptions={tempSelectedFuelType}
                                handleChange={handleModalFuelTypeChange}
                            />
                            </Accordion>


                            <Accordion title="Cylinders" defaultOpen={true}>
                                <CheckboxFilter
                                    options={cylinderoptions}
                                    selectedOptions={tempSelectedCylinders}
                                    handleChange={handleModalCylinderChange}
                                />
                            </Accordion>
                            <Accordion title="Transmissions" defaultOpen={true}>
                                <CheckboxFilter
                                    options={transmissionsoptions}
                                    selectedOptions={tempSelectedTransmissions}
                                    handleChange={handleModalTransmissionChange}
                                /></Accordion>


                            <Accordion title="Drive" defaultOpen={true}>    <CheckboxFilter
                                options={driveoptions}
                                selectedOptions={tempSelectedDrive}
                                handleChange={handleModalDriveChange}
                            />
                            </Accordion>


                        </div>
                    </div >
                );
            // Add cases for other types as needed
            default:
                return <div>Unsupported filter type</div>;
        }
    };

    const { price, ...restQuery } = searchParams;
    const { initialprice } = searchParams;
    const [minPrice, setMinPrice] = useState(43758);
    const [maxPrice, setMaxPrice] = useState(33660000);
    const [initialValues, setInitialValues] = useState([]); // Default values for initial slider range

    console.log(initialValues, "initialprice");

    console.log(bodyoptions, "bodyoptionsbodyoptions");

    useEffect(() => {
        if (price) {
            // Split by commas to handle multiple ranges
            const ranges = price.split(",").map(range => range.split("-").map(Number));

            // Flatten the array to get all the individual values
            const allPrices = ranges.flat();

            // Get the minimum and maximum prices from all the ranges
            const min = Math.min(...allPrices);
            const max = Math.max(...allPrices);

            console.log(price, 'inside useEffect price');

            setMinPrice(min);
            setMaxPrice(max);
        }
    }, [price]);

    useEffect(() => {
        if (initialprice !== undefined) {
            const [min, max] = initialprice.split("-").map(Number);
            setInitialValues([min, max]);
        } else {
            setInitialValues([priceRange.min, priceRange.max]);
        }
    }, [initialprice, priceRange]);

    const handleSliderChange = (event, newValue) => {
        const minPrice = isNaN(newValue[0]) ? priceRange.min : newValue[0];
        const maxPrice = isNaN(newValue[1]) ? priceRange.max : newValue[1];

        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    const handleSliderChangeCommitted = (event, newValue) => {
        const minPrice = isNaN(newValue[0]) ? priceRange.min : newValue[0];
        const maxPrice = isNaN(newValue[1]) ? priceRange.max : newValue[1];

        const queryString = `price=${minPrice}-${maxPrice}`;
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('price', `${minPrice}-${maxPrice}`);

        const newUrl = `${pathname}?${currentParams.toString()}`;

        // Update the URL using the router
        if (!isInitialRender) {
            router.replace(newUrl, undefined, { shallow: true });
        }
    };



    const formatPrice = (price) => {
        return price <= 0
            ? "TBD"
            : "AED" +
            " " +
            price?.toLocaleString("en-AE", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }) +
            "*";
    };


    const Accordion = ({ title, children, defaultOpen = true }) => {
        const [isOpen, setIsOpen] = useState(defaultOpen); // Set defaultOpen to true to keep it open on load

        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="mb-4 border-b border-gray-200">
                <div
                    onClick={toggleAccordion}
                    className="flex justify-between items-center cursor-pointer py-3 px-4 rounded-md shadow-sm hover:bg-gray-200 transition-colors"
                >
                    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                    <span>
                        {isOpen ? (
                            <ExpandLessIcon className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ExpandMoreIcon className="w-5 h-5 text-gray-600" />
                        )}
                    </span>
                </div>
                <div
                    className={`transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
                >
                    <div className="p-4 bg-white">
                        {children}
                    </div>
                </div>
            </div>
        );
    };



    const CheckboxFilter = ({ options, selectedOptions, handleChange, labelKey = 'label', valueKey = 'value' }) => {
        return (
            <ul>
                {options.map((option, idx) => (
                    <li key={idx}>
                        <div className="flex justify-between items-center">
                            <span className="text-sm ">{option[labelKey]}</span>
                            <Checkbox
                                checked={selectedOptions.includes(option[valueKey])}
                                onChange={() => handleChange(option[valueKey])}
                                color="primary"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28, // Controls the overall size of the checkbox icon
                                    },
                                    '& .MuiCheckbox-root': {

                                        borderWidth: '3px', // Adjust the border width here
                                        borderColor: 'rgba(0, 0, 0, 0.54)', // Border color
                                        borderStyle: 'solid', // Ensure the border is solid
                                    },
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        );
    };



    return (
        <>

            <div className="">
                <div className=" m-0 py-1 d-flex">

                    {filters.map((filter) => (
                        <div key={filter.id}>
                            <Modal
                                open={filter.showModal}
                                onClose={() => handleToggleModal(filter.id)}
                                aria-labelledby={`${filter.id}ModalLabel`}
                                aria-hidden={!filter.showModal}
                                closeAfterTransition
                                style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                }}
                            >
                                <div className="modal-content w-full bg-white rounded-t-2xl">
                                    <div className="modal-header py-3 bg-blue-600 rounded-t-2xl flex justify-between items-center px-4">
                                        <h2 className="modal-title font-bold text-white p-2">
                                            {filter.label}
                                        </h2>
                                        <Button
                                            onClick={() => handleToggleModal(filter.id)}
                                            className=""
                                        >
                                            <CloseIcon sx={{ color: "white" }} className="p-0 m-0" />
                                        </Button>
                                    </div>
                                    <div className="modal-body overflow-y-auto h-[500px]">
                                        {renderFilterContent(filter)}
                                    </div>
                                    <div className="modal-footer p-2">
                                        {filter.id !== "fullfilter" ? (
                                            // <Button
                                            //   variant="contained"
                                            //   fullWidth
                                            //   onClick={() => {
                                            //     console.log("llllllllllllll");
                                            //     const applyFilterFunction =
                                            //       filterFunctions[filter.id];
                                            //     if (applyFilterFunction) {
                                            //       applyFilterFunction(); // Call the function dynamically
                                            //     }
                                            //     handleToggleModal(filter.id); // Close the modal
                                            //   }}
                                            // >
                                            //   Apply Filter
                                            // </Button>
                                            <PrimaryButton
                                                label="Apply Filter"
                                                onClick={() => {
                                                    console.log("llllllllllllll");
                                                    const applyFilterFunction =
                                                        filterFunctions[filter.id];
                                                    if (applyFilterFunction) {
                                                        applyFilterFunction(); // Call the function dynamically
                                                    }
                                                    handleToggleModal(filter.id); // Close the modal
                                                }}
                                            />
                                        ) : (
                                            <PrimaryButton
                                                label="Apply Filter"
                                                onClick={() => {
                                                    applyPriceFilter();
                                                    applyBrandFilter();
                                                    applyBodyTypeFilter();
                                                    applyPowerFilter();
                                                    applyDisplacementFilter();
                                                    applyFuelTypeFilter();
                                                    applyCylinderFilter();
                                                    applyTransmissionFilter();
                                                    applyDriveFilter();
                                                    handleToggleModal(filter.id); // Close the modal
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`md:block hidden order-xl-1 order-2 shadow-xl p-6 rounded-xl`}>


                <div
                    className={`${isSticky ? "sticky product-sidebar" : "product-sidebar"
                        }`}
                >
                    {/* Price filter UI */}

                    {pathname !== "/find-your-car" && (
                        <Accordion title="Price" defaultOpen={true}>
                            <CheckboxFilter
                                options={filteredPriceOptions}
                                selectedOptions={selectedPrice}
                                handleChange={handlePriceChange}
                                labelKey="priceLabel"
                                valueKey="value"
                            />
                        </Accordion>
                    )}

                    <div>
                        <div className="px-4 mt-6 mb-3">
                            <Slider
                                value={[minPrice, maxPrice]}
                                onChange={handleSliderChange}
                                onChangeCommitted={handleSliderChangeCommitted}
                                valueLabelDisplay="auto"
                                valueLabelFormat={formatPrice}
                                min={initialValues[0]}
                                max={initialValues[1]}
                                step={1000} // Adjust step as necessary
                                // marks={marks}
                                sx={{
                                    "& .MuiSlider-track": {
                                        height: 20,
                                        backgroundColor: "var(--primary)",
                                    },
                                    "& .MuiSlider-rail": {
                                        height: 20,
                                    },
                                    "& .MuiSlider-thumb": {
                                        height: 25,
                                        width: 25,
                                        "&:hover, &.Mui-focusVisible, &.Mui-active": {
                                            boxShadow: "none",
                                        },
                                    },

                                    height: 4, // Adjust the height here
                                    "& .MuiSlider-track": {
                                        height: 5, // Ensure the track matches the slider height
                                    },
                                    "& .MuiSlider-rail": {
                                        height: 5, // Ensure the rail matches the slider height
                                    },
                                    "& .MuiSlider-thumb": {
                                        width: 16, // Adjust thumb size if needed
                                        height: 16,
                                    },
                                }}
                            />
                        </div>
                        <div className="flex justify-between flex-wrap flex-col mb-4">
                            <p className="border rounded-lg px-2 py-3 border-solid my-1 border-gray-300 whitespace-nowrap">
                                <strong>Min:</strong>{" "}
                                <span>
                                    <Price data={minPrice} />
                                </span>
                            </p>
                            <p className="border rounded-lg px-2 py-3 border-solid my-1 border-gray-300 whitespace-nowrap">
                                <strong>Max:</strong>{" "}
                                <span>
                                    <Price data={maxPrice} />
                                </span>
                            </p>
                        </div>


                        {pathname !== "/brands/[brandname]" && (
                            <Accordion title="Brand" defaultOpen={true}>
                                <div className="form-inner mb-4">
                                    <input
                                        type="text"
                                        ref={inputRef}
                                        placeholder="Search Brand"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchText}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <CheckboxFilter
                                    options={filteredAndSortedBrandOptions}
                                    selectedOptions={selectedBrands}
                                    handleChange={handleBrandChange}
                                />
                            </Accordion>
                        )}


                        <Accordion title="Body Type" defaultOpen={true}>
                            {/* <CheckboxFilter
                                options={bodyoptions}
                                selectedOptions={selectedBody}
                                handleChange={handleBodyChange}
                                labelKey="bodyTypeLabel"
                                valueKey="value"
                            /> */}
                            <div className='grid grid-cols-3 gap-2 '>
                                {bodyoptions.map((item, idx) => (
                                    <div className="h-[70px]" key={idx}>
                                        <button
                                            key={idx}
                                            className={`shadow rounded-xl p-2 ${selectedBody.includes(item.value)
                                                ? "bg-blue-200 font-semibold"
                                                : "bg-white "
                                                }`}
                                            onClick={() => handleBodyChange(item.value)}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                className="w-20 h-8 object-contain mb-2"
                                            />
                                            <p className='text-[10px]'>{item.label}</p>
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </Accordion>
                        {pathname !== "/body-types/[categoryname]" && (
                            <Accordion title="Power" defaultOpen={true}>
                                <CheckboxFilter
                                    options={filterPower}
                                    selectedOptions={selectedPower}
                                    handleChange={handlePowerChange}
                                    labelKey="powerLabel"
                                    valueKey="value"
                                />
                            </Accordion>
                        )}




                        <Accordion title="Displacement" defaultOpen={true}>
                            <CheckboxFilter
                                options={filtereDisplacement}
                                selectedOptions={selectedDisplacement}
                                handleChange={handleDisplacementChange}
                                labelKey="displacementLabel"
                                valueKey="value"
                            />
                        </Accordion>


                        <Accordion title="Fuel Type" defaultOpen={true}><CheckboxFilter
                            options={fueloptions}
                            selectedOptions={selectedFuelType}
                            handleChange={handleFuelTypeChange}
                        />
                        </Accordion>


                        <Accordion title="Cylinders" defaultOpen={true}>
                            <CheckboxFilter
                                options={cylinderoptions}
                                selectedOptions={selectedCylinders}
                                handleChange={handleCylindersChange}
                            />
                        </Accordion>
                        <Accordion title="Transmissions" defaultOpen={true}>
                            <CheckboxFilter
                                options={transmissionsoptions}
                                selectedOptions={selectedTransmission}
                                handleChange={handletranmissionChange}
                            /></Accordion>


                        <Accordion title="Drive" defaultOpen={true}>    <CheckboxFilter
                            options={driveoptions}
                            selectedOptions={selectedDrive}
                            handleChange={handleDriveChange}
                        />
                        </Accordion>


                    </div>
                </div>
            </div >

        </>


    )
}
