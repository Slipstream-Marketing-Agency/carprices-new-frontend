import Ad728x90 from "@/components/ads/Ad728x90";
import Breadcrumb from "@/components/common/BreadCrumb";
import OverlayLoader from "@/components/common/Loader/OverlayLoader";
import Layout from "@/components/layout/Layout";
import FilteredCarCard from "@/components/search-car-page/FilteredCarCard";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";

export default function SearchPage({
  initialTrims,
  brandOptions,
  bodyTypeOptions,
  fuelTypeOptions,
  transmissionOptions,
  cylinderOptions,
  driveTypeOption,
  selectedBrands,
  selectedBodyType,
  inBetweenPriceSelect,
  inBetweenPowerSelect,
  inBetweenDisplacementSelect,
  selectedPrice,
  selectedPower,
  selectedFuelType,
  selectedDisplacement,
  filteredTransmission,
  filteredCylinder,
  filteredDriveType,
  totalPages,
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [filteredTrims, setFilteredTrims] = useState(initialTrims);
  const [brand, setBrand] = useState(selectedBrands || []);
  const [bodyType, setBodyType] = useState(selectedBodyType || []);
  const [brandOption, setBrandOption] = useState(brandOptions);
  const [bodyOptions, setBodyOptions] = useState(bodyTypeOptions);

  const [price, setPrice] = useState(selectedPrice || []);
  const [filteredPriceSelect, setFilteredPriceSelect] =
    useState(inBetweenPriceSelect);

  const [power, setPower] = useState(selectedPower || []);
  const [filteredPowerSelect, setFilteredPowerSelect] = useState(
    inBetweenPowerSelect || []
  );

  const [fuelType, setFuelType] = useState(selectedFuelType || []);
  const [fuelOptions, setFuelOptions] = useState(fuelTypeOptions);

  const [transmission, setTransmission] = useState(filteredTransmission || []);
  const [transmissionOption, setTransmissionOption] = useState(
    transmissionOptions || []
  );

  const [cylinder, setCylinder] = useState(filteredCylinder || []);
  const [cylinderOption, setCylinderOption] = useState(cylinderOptions);

  const [drive, setDrive] = useState(filteredDriveType || []);
  const [driveOption, setDriveOption] = useState(driveTypeOption || []);

  const [displacement, setDisplacement] = useState(selectedDisplacement || []);
  const [filteredDisplacementSelect, setFilteredDisplacementSelect] = useState(
    inBetweenDisplacementSelect
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handleBrandChange = (e) => {
    const selectedBrandSlugs = e.value.map((brandObj) => brandObj.slug);
    setBrand(e.value);
    // Combine selectedBrandSlugs and selectedBodyType into a single array
    const selectedSlugs = [
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedBrandSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handleBodyTypeChange = (e) => {
    const selectedBodyTypeSlugs = e.value.map((bodyTypeObj) => bodyTypeObj);
    setBodyType(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedBodyTypeSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handlePriceChange = (e) => {
    console.log(e.value, "ffff");
    const selectedPriceSlugs = e.value.map((item) => item);
    setPrice(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...power.map((obj) => obj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedPriceSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handlePowerChange = (e) => {
    console.log(e.value, "ffff");
    const selectedPowerSlugs = e.value.map((item) => item);
    setPower(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...price.map((brandObj) => brandObj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedPowerSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handleFuelTypeChange = (e) => {
    const selectedFuelSlugs = e.value.map((obj) => obj);
    setFuelType(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedFuelSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handleTransmissionChange = (e) => {
    const selectedTransmissionSlugs = e.value.map((obj) => obj);
    setTransmission(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...fuelType.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedTransmissionSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handleCylinderChange = (e) => {
    const selectedCylinderSlugs = e.value.map((obj) => obj);
    setCylinder(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedCylinderSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  const handleDriveTypeChange = (e) => {
    const selectedDriveTypeSlugs = e.value.map((obj) => obj);
    setDrive(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...displacement.map((obj) => obj),
      ...selectedDriveTypeSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };
  const handleDisplacementChange = (e) => {
    const selectedDisplacementTypeSlugs = e.value.map((obj) => obj);
    setDisplacement(e.value);
    // Combine selectedBrandSlugs and selectedBodyTypeSlugs into a single array
    const selectedSlugs = [
      ...brand.map((brandObj) => brandObj.slug),
      ...price.map((brandObj) => brandObj),
      ...power.map((obj) => obj),
      ...bodyType.map((bodyTypeObj) => bodyTypeObj),
      ...fuelType.map((obj) => obj),
      ...transmission.map((obj) => obj),
      ...cylinder.map((obj) => obj),
      ...drive.map((obj) => obj),
      ...selectedDisplacementTypeSlugs,
    ];
    // Construct the URL with both brand and body type values separated by '+'
    const newPath = `/search-cars/${selectedSlugs.join("+")}`;
    // Update the URL
    router.push(newPath, undefined, { shallow: true });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      // Construct the URL with the selected brand and body type slugs
      const selectedBodyTypeSlugs = bodyType.map((bodyTypeObj) => bodyTypeObj);
      const selectedPriceSlugs = price.map((obj) => obj);
      const selectedPowerSlugs = power.map((obj) => obj);
      const selectedFuelSlugs = fuelType.map((obj) => obj);
      const selectedBrandSlugs = brand.map((brandObj) => brandObj.slug);
      const selectedTransmissionSlugs = transmission.map((obj) => obj);
      const selectedCylinderSlugs = cylinder.map((obj) => obj);
      const selectedDriveTypeSlugs = drive.map((obj) => obj);
      const selectedDisplacementSlugs = displacement.map((obj) => obj);

      console.log(
        selectedBodyTypeSlugs,
        selectedPriceSlugs,
        selectedPowerSlugs,
        selectedFuelSlugs,
        selectedBrandSlugs,
        "SSSSSSSS"
      );

      const selectedSlugs = [
        ...selectedBrandSlugs,
        ...selectedBodyTypeSlugs,
        ...selectedPriceSlugs,
        ...selectedPowerSlugs,
        ...selectedFuelSlugs,
        ...selectedTransmissionSlugs,
        ...selectedCylinderSlugs,
        ...selectedDriveTypeSlugs,
        ...selectedDisplacementSlugs,
      ];

      const newPath = `/search-cars/${selectedSlugs.join("+")}`;

      const allBodyTypeResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/body-type/list`
      );

      const allFuelTypeResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/fuel-type/list`
      );

      const allTransmissionResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/transmissions/list`
      );

      const allCylinderResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/cylinder-no/list`
      );

      const allDriveTypeResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/drive-type/list`
      );

      console.log(allFuelTypeResponse, "fuelTypeReponse");

      const filteredPriceRange = filteredPriceSelect
        .filter((item) => selectedPriceSlugs.includes(item.value)) // Filter based on 'selected' array
        .map((item) => item.range);

      const filteredBodyTypes = allBodyTypeResponse.data.bodyType.filter(
        (bodyTypeObj) => selectedBodyTypeSlugs.includes(bodyTypeObj)
      );
      const filteredFuelTypes = allFuelTypeResponse.data.fuelType.filter(
        (obj) => selectedFuelSlugs.includes(obj)
      );
      const filteredPowerRange = filteredPowerSelect
        .filter((item) => selectedPowerSlugs.includes(item.value)) // Filter based on 'selected' array
        .map((item) => item.range);

      const filteredTransmission =
        allTransmissionResponse.data.transmission.filter((obj) =>
          selectedTransmissionSlugs.includes(obj)
        );

      const filteredCylinder = allCylinderResponse.data.cylinders.filter(
        (obj) => selectedCylinderSlugs.includes(obj)
      );

      const filteredDriveType = allDriveTypeResponse.data.driveTypes.filter(
        (obj) => selectedDriveTypeSlugs.includes(obj)
      );

      const filteredDisplacementRange = filteredDisplacementSelect
        .filter((item) => selectedDisplacementSlugs.includes(item.value)) // Filter based on 'selected' array
        .map((item) => item.range);

      const brandsResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `brands`,
        {
          bodyType: filteredBodyTypes,
          price: filteredPriceRange,
          power: filteredPowerRange,
          transmission: selectedTransmissionSlugs,
          fuelType: selectedFuelSlugs,
          cylinders: selectedCylinderSlugs,
        }
      );

      const selectedBrandIds = brandsResponse.data.carBrands
        .filter((brand) => selectedBrandSlugs.includes(brand.slug))
        .map((brand) => brand.id);

      console.log(filteredFuelTypes, "filteredFuelTypes");

      const bodyTypesResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/body-type/list`,
        {
          brand: selectedBrandIds,
          price: filteredPriceRange,
          power: filteredPowerRange,
          transmission: selectedTransmissionSlugs,
          fuelType: selectedFuelSlugs,
          cylinders: selectedCylinderSlugs,
          displacement: filteredDisplacementRange,
        }
      );

      const fuelTypeResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/fuel-type/list`,
        {
          brand: selectedBrandIds,
          bodyType: filteredBodyTypes,
          price: filteredPriceRange,
          power: filteredPowerRange,
          transmission: selectedTransmissionSlugs,
          cylinders: selectedCylinderSlugs,
          displacement: filteredDisplacementRange,
        }
      );

      const transmissionResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/transmissions/list`,
        {
          brand: selectedBrandIds,
          bodyType: filteredBodyTypes,
          price: filteredPriceRange,
          power: filteredPowerRange,
          fuelType: selectedFuelSlugs,
          cylinders: selectedCylinderSlugs,
          displacement: filteredDisplacementRange,
        }
      );

      const cylinderResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/cylinder-no/list`,
        {
          brand: selectedBrandIds,
          bodyType: filteredBodyTypes,
          price: filteredPriceRange,
          power: filteredPowerRange,
          fuelType: selectedFuelSlugs,
          transmission: selectedTransmissionSlugs,
          displacement: filteredDisplacementRange,
        }
      );

      const driveTypeResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `trim/drive-type/list`,
        {
          brand: selectedBrandIds,
          bodyType: filteredBodyTypes,
          price: filteredPriceRange,
          power: filteredPowerRange,
          fuelType: selectedFuelSlugs,
          transmission: selectedTransmissionSlugs,
          cylinders: selectedCylinderSlugs,
          driveTypes: selectedDriveTypeSlugs,
          displacement: filteredDisplacementRange,
        }
      );

      console.log(transmissionResponse, "transmissionResponse");

      const brandOptions = brandsResponse.data.carBrands.map((item) => ({
        brand: item.name,
        slug: item.slug,
      }));

      const bodyTypeOptions = bodyTypesResponse.data.bodyType.map((item) => ({
        bodyType: item,
        value: item,
      }));

      const fuelTypeOptions = fuelTypeResponse.data.fuelType.map((item) => ({
        fuelType: item,
        value: item,
      }));

      const transmissionOptions = transmissionResponse.data.transmission.map(
        (item) => ({
          transmission: item,
          value: item,
        })
      );

      const cylinderOptions = cylinderResponse.data.cylinders.map((item) => ({
        cylinders: item + " Cylinders",
        value: item,
      }));

      const driveTypeOptions = driveTypeResponse.data.driveTypes.map(
        (item) => ({
          driveType: item,
          value: item,
        })
      );

      console.log(transmissionOptions, "transmissionOptions");

      setBodyOptions(bodyTypeOptions);

      setBrandOption(brandOptions);
      // if (fuelTypeOptions?.length == 0) {
      setFuelOptions(fuelTypeOptions);
      // }
      // if (transmissionOptions?.length == 0) {
      setTransmissionOption(transmissionOptions);
      // }

      setCylinderOption(cylinderOptions);

      setDriveOption(driveTypeOptions);

      if (filteredPriceRange?.length == 0) {
        const priceResponse = await axios.post(
          process?.env?.NEXT_PUBLIC_API_URL + `filter/get-min-max`,
          {
            brand: selectedBrandIds,
            bodyType: filteredBodyTypes,
            power: filteredPowerRange,
            fuelType: selectedFuelSlugs,
            transmission: selectedTransmissionSlugs,
            cylinders: selectedCylinderSlugs,
            driveTypes: selectedDriveTypeSlugs,
            displacement: filteredDisplacementRange,
          }
        );
        // Dynamic Price Start
        let res = priceResponse?.data;

        const filteredSelect = inBetweenPriceSelect.filter(
          ({ range: { min, max } }) => {
            return (
              (min >= res?.min && max <= res?.max) ||
              (min <= res?.min && max >= res?.min) ||
              (min <= res?.max && max >= res?.max)
            );
          }
        );

        console.log(res, "res");

        if (res?.max > 1000000) {
          filteredSelect.push({
            range: { min: 1000000, max: res?.max },
            priceLabel: "Above 1M",
            value: "above-1m",
          });
        }
        setFilteredPriceSelect(filteredSelect);
      }

      if (filteredPowerRange?.length == 0) {
        const powerResponse = await axios.post(
          process?.env?.NEXT_PUBLIC_API_URL + `filter/power/get-min-max`,
          {
            brand: selectedBrandIds,
            bodyType: filteredBodyTypes,
            price: filteredPriceRange,
            power: filteredPowerRange,
            fuelType: selectedFuelSlugs,
            transmission: selectedTransmissionSlugs,
            cylinders: selectedCylinderSlugs,
            driveTypes: selectedDriveTypeSlugs,
            displacement: filteredDisplacementRange,
          }
        );
        // Dynamic Price Start
        let res = powerResponse?.data;

        const filteredSelect = inBetweenPowerSelect.filter(
          ({ range: { min, max } }) => {
            return (
              (min >= res?.min && max <= res?.max) ||
              (min <= res?.min && max >= res?.min) ||
              (min <= res?.max && max >= res?.max)
            );
          }
        );

        if (res?.max > 2000) {
          filteredSelect.push({
            range: { min: 2000, max: res?.max },
            powerLabel: "Above 2000hp",
            value: "above-2000hp",
          });
        }
        setFilteredPowerSelect(filteredSelect);
      }

      if (filteredDisplacementRange?.length == 0) {
        const displacementResponse = await axios.post(
          process?.env?.NEXT_PUBLIC_API_URL + `filter/displacement/get-min-max`,
          {
            brand: selectedBrandIds,
            bodyType: filteredBodyTypes,
            price: filteredPriceRange,
            power: filteredPowerRange,
            fuelType: selectedFuelSlugs,
            transmission: selectedTransmissionSlugs,
            cylinders: selectedCylinderSlugs,
            driveTypes: selectedDriveTypeSlugs,
          }
        );
        // Dynamic Price Start
        let res = displacementResponse?.data;

        const filteredSelect = inBetweenDisplacementSelect.filter(
          ({ range: { min, max } }) => {
            return (
              (min >= res?.min && max <= res?.max) ||
              (min <= res?.min && max >= res?.min) ||
              (min <= res?.max && max >= res?.max)
            );
          }
        );
        setFilteredDisplacementSelect(filteredSelect);
      }

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          `trim/filter/advanced?pageSize=16&currentPage=${currentPage}&orderBy=price`,
        {
          brand: selectedBrandSlugs,
          bodyType: selectedBodyTypeSlugs,
          price: filteredPriceRange,
          power: filteredPowerRange,
          fuelType: selectedFuelSlugs,
          transmission: selectedTransmissionSlugs,
          cylinders: selectedCylinderSlugs,
          driveTypes: selectedDriveTypeSlugs,
          displacement: filteredDisplacementRange,
        }
      );
      setFilteredTrims(response.data.trims);

      // Update the URL without a full page refresh
      router.push(newPath, undefined, { shallow: true });

      setIsLoading(false);
    };

    fetchData();
  }, [
    brand,
    bodyType,
    price,
    power,
    fuelType,
    transmission,
    cylinder,
    drive,
    displacement,
  ]);

  console.log(transmissionOption, "saaaaaaaaaaa");

  const handleLoadMore = async () => {
    setIsLoading(true)
    const nextPage = currentPage + 1;

    // Fetch more data for the next page
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL +
        `trim/filter/advanced?pageSize=16&currentPage=${nextPage}&orderBy=price`,
      {
        brand: brand.map((brandObj) => brandObj.slug),
        bodyType: bodyType.map((bodyTypeObj) => bodyTypeObj),
        price: price.map((brandObj) => brandObj),
        fuelType: fuelType.map((obj) => obj),
        transmission: transmission.map((obj) => obj),
        cylinder: cylinder.map((obj) => obj),
        drive: drive.map((obj) => obj),
        displacement: displacement.map((obj) => obj),
      }
    );

    // Update the filteredTrims state with the new data
    setFilteredTrims((prevTrims) => [...prevTrims, ...response.data.trims]);

    // Update the current page
    setCurrentPage(nextPage);
    setIsLoading(false)
  };

  return (
    <Layout
      pageMeta={{
        title:
          "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
        description:
          "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
        type: "Car Review Website",
      }}
    >

      <OverlayLoader isLoading={isLoading}/>
      <div className="container my-3 ">
        <div className="my-2">
          <Ad728x90 dataAdSlot="1650426075" />
        </div>
        <Breadcrumb />
        <div className="row mt-1 mb-4 ">
          <h1 className="fw-bold ">
            Explore the Price and Specifications of Brand New Cars in the UAE
          </h1>
          <p className="text-grey mt-2">
            Be the first one to know about the new car launches in the UAE.
            Included on our website are latest car launches, price, technical
            specification, and variant details. Check out new launches in the
            UAE and get detailed road test and user review on all recent
            launches.
          </p>
          <div className="sticky_filter_scroll mb-4">
            <div className="white_bg_wrapper pt-4">
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={brand}
                      onChange={handleBrandChange}
                      options={brandOption}
                      optionLabel="brand"
                      filter
                      maxSelectedLabels={3}
                      className="w-100 "
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities fw-bold">
                      <small className="fw-bold">Brands</small>
                    </label>
                  </span>
                </div>
                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={bodyType}
                      onChange={handleBodyTypeChange}
                      options={_.sortBy(bodyOptions)}
                      optionLabel="bodyType"
                      filter
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Body Type</small>
                    </label>
                  </span>
                </div>
                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={price}
                      onChange={handlePriceChange}
                      options={filteredPriceSelect}
                      optionLabel="priceLabel"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Price</small>
                    </label>
                  </span>
                </div>

                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={power}
                      onChange={handlePowerChange}
                      options={filteredPowerSelect}
                      optionLabel="powerLabel"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Power</small>
                    </label>
                  </span>
                </div>

                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={fuelType}
                      onChange={handleFuelTypeChange}
                      options={_.sortBy(fuelOptions)}
                      optionLabel="fuelType"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Fuel Type</small>
                    </label>
                  </span>
                </div>

                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={transmission}
                      onChange={handleTransmissionChange}
                      options={_.sortBy(transmissionOption)}
                      optionLabel="transmission"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Transmission</small>
                    </label>
                  </span>
                </div>
                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={cylinder}
                      onChange={handleCylinderChange}
                      options={_.sortBy(cylinderOption, (option) =>
                        Number(option.value)
                      )}
                      optionLabel="cylinders"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">No. of Cylinders</small>
                    </label>
                  </span>
                </div>
                <div className="w-12 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={drive}
                      onChange={handleDriveTypeChange}
                      options={_.sortBy(driveOption)}
                      optionLabel="driveType"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Drive Types</small>
                    </label>
                  </span>
                </div>

                <div className="w-12">
                  <span className="p-float-label">
                    <MultiSelect
                      value={displacement}
                      onChange={handleDisplacementChange}
                      options={filteredDisplacementSelect}
                      optionLabel="displacementLabel"
                      maxSelectedLabels={3}
                      className="w-100"
                      appendTo="self"
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Displacement</small>
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className=" px-2">
              <div className="d-flex justify-content-end mb-3">
                <div className="price_filter_badge">
                  <span>Sorted By Price : Low to High</span>
                </div>
              </div>
              <div className="row">
                {filteredTrims.length <= 0 ? (
                  <div className="d-flex justify-content-center align-items-center search_not_found">
                    <img src="/assets/images/not-found/search-not-found.png" />
                  </div>
                ) : (
                  filteredTrims?.map((item, index) => (
                    <FilteredCarCard
                      filteredData={item}
                      uniqueIndex={item.id}
                    />
                  ))
                )}
                {currentPage < totalPages && ( // Show the "Load More" button if there are more pages
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const allSlugs = context.query.slug ? context.query.slug.split("+") : [];

  const inBetweenPriceSelect = [
    {
      range: { min: 0, max: 50000 },
      priceLabel: "Below 50K",
      value: "below-50k",
    },
    {
      range: { min: 50000, max: 100000 },
      priceLabel: "50K - 100K",
      value: "50k-to-100k",
    },
    {
      range: { min: 100000, max: 200000 },
      priceLabel: "100K - 200K",
      value: "100k-to-200k",
    },
    {
      range: { min: 200000, max: 300000 },
      priceLabel: "200K - 300K",
      value: "200k-to-300k",
    },
    {
      range: { min: 300000, max: 500000 },
      priceLabel: "300K - 500K",
      value: "300k-to-500k",
    },
    {
      range: { min: 500000, max: 700000 },
      priceLabel: "500K - 700K",
      value: "500k-to-700k",
    },
    {
      range: { min: 700000, max: 1000000 },
      priceLabel: "700K - 1M",
      value: "700k-to-1m",
    },
  ];
  const inBetweenPowerSelect = [
    {
      range: { min: 0, max: 200 },
      powerLabel: "Below 200hp",
      value: "below-200hp",
    },
    {
      range: { min: 201, max: 400 },
      powerLabel: "200hp - 400hp",
      value: "200hp-to-400hp",
    },
    {
      range: { min: 401, max: 600 },
      powerLabel: "400hp - 600hp",
      value: "400hp-to-600hp",
    },
    {
      range: { min: 601, max: 1000 },
      powerLabel: "600hp - 1000hp",
      value: "600hp-to-1000hp",
    },
    {
      range: { min: 1001, max: 1400 },
      powerLabel: "1000hp - 1400hp",
      value: "1000hp-to-1400hp",
    },
    {
      range: { min: 1401, max: 2000 },
      powerLabel: "1400hp - 2000hp",
      value: "1400hp-to-2000hp",
    },
  ];

  const inBetweenDisplacementSelect = [
    {
      range: { min: 0, max: 1000 },
      displacementLabel: "Below 1000cc",
      value: "below-1000cc",
    },
    {
      range: { min: 1000, max: 2000 },
      displacementLabel: "1000cc - 2000cc",
      value: "1000cc-to-2000cc",
    },
    {
      range: { min: 2000, max: 4000 },
      displacementLabel: "2000cc - 4000cc",
      value: "2000cc-to-4000cc",
    },
    {
      range: { min: 4000, max: 8000 },
      displacementLabel: "4000cc - 8000cc",
      value: "4000cc-to-8000cc",
    },
  ];

  const page = parseInt(context.query.page) || 1;

  const brandsResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `brands`
  );

  const allBodyTypeResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/body-type/list`
  );

  const allFuelTypeResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/fuel-type/list`
  );

  const allTransmissionResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/transmissions/list`
  );
  const allCylinderResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/cylinder-no/list`
  );

  const allDriveTypeResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/drive-type/list`
  );

  const selectedBrandIds = brandsResponse.data.carBrands
    .filter((brand) => allSlugs.includes(brand.slug))
    .map((brand) => brand.id);

  const selectedPriceSlugs = inBetweenPriceSelect.filter((price) =>
    allSlugs.includes(price.value)
  );
  const filteredPriceRange = inBetweenPriceSelect
    .filter((item) => selectedPriceSlugs.includes(item.value)) // Filter based on 'selected' array
    .map((item) => item.range);

  const filteredPriceSlugs = inBetweenPriceSelect
    .filter((item) => allSlugs.includes(item.value))
    .map((item) => item.value);

  const selectedPowerSlugs = inBetweenPowerSelect.filter((power) =>
    allSlugs.includes(power.value)
  );
  const filteredPowerRange = inBetweenPowerSelect
    .filter((item) => selectedPowerSlugs.includes(item.value)) // Filter based on 'selected' array
    .map((item) => item.range);

  const filteredPowerSlugs = inBetweenPowerSelect
    .filter((item) => allSlugs.includes(item.value))
    .map((item) => item.value);

  const filteredBodyTypes = allBodyTypeResponse.data.bodyType.filter(
    (bodyTypeObj) => allSlugs.includes(bodyTypeObj)
  );

  const filteredFuelTypes = allFuelTypeResponse.data.fuelType.filter((obj) =>
    allSlugs.includes(obj)
  );

  const filteredTransmission = allTransmissionResponse.data.transmission.filter(
    (obj) => allSlugs.includes(obj)
  );

  const filteredCylinder = allCylinderResponse.data.cylinders.filter((obj) =>
    allSlugs.includes(obj)
  );

  const filteredDriveType = allDriveTypeResponse.data.driveTypes.filter((obj) =>
    allSlugs.includes(obj)
  );

  const selectedDisplacementSlugs = inBetweenDisplacementSelect.filter(
    (power) => allSlugs.includes(power.value)
  );
  const filteredDisplacementRange = inBetweenDisplacementSelect
    .filter((item) => selectedDisplacementSlugs.includes(item.value)) // Filter based on 'selected' array
    .map((item) => item.range);

  const filteredDisplacementSlugs = inBetweenDisplacementSelect
    .filter((item) => allSlugs.includes(item.value))
    .map((item) => item.value);

  console.log(filteredFuelTypes, "filteredFuelTypes");

  const bodyTypesResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/body-type/list`,
    {
      brand: selectedBrandIds,
      price: filteredPriceRange,
      power: filteredPowerRange,
      transmission: filteredTransmission,
      fuelType: filteredFuelTypes,
      cylinders: filteredCylinder,
      driveTypes: filteredDriveType,
      displacement: filteredDisplacementRange,
    }
  );

  const fuelTypeResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/fuel-type/list`,
    {
      brand: selectedBrandIds,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      power: filteredPowerRange,
      transmission: filteredTransmission,
      cylinders: filteredCylinder,
      driveTypes: filteredDriveType,
      displacement: filteredDisplacementRange,
    }
  );

  const transmissionResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/transmissions/list`,
    {
      brand: selectedBrandIds,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      power: filteredPowerRange,
      fuelType: filteredFuelTypes,
      cylinders: filteredCylinder,
      driveTypes: filteredDriveType,
      displacement: filteredDisplacementRange,
    }
  );

  const cylinderResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/cylinder-no/list`,
    {
      brand: selectedBrandIds,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      power: filteredPowerRange,
      transmission: filteredTransmission,
      fuelType: filteredFuelTypes,
      driveTypes: filteredDriveType,
      displacement: filteredDisplacementRange,
    }
  );

  const driveTypeResponse = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `trim/drive-type/list`,
    {
      brand: selectedBrandIds,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      power: filteredPowerRange,
      transmission: filteredTransmission,
      fuelType: filteredFuelTypes,
      cylinders: filteredCylinder,
      displacement: filteredDisplacementRange,
    }
  );

  const brandOptions = brandsResponse.data.carBrands.map((item) => ({
    brand: item.name,
    slug: item.slug,
  }));

  const bodyTypeOptions = bodyTypesResponse.data.bodyType.map((item) => ({
    bodyType: item,
    value: item,
  }));

  const fuelTypeOptions = fuelTypeResponse.data.fuelType.map((item) => ({
    fuelType: item,
    value: item,
  }));

  const transmissionOptions = transmissionResponse.data.transmission.map(
    (item) => ({
      transmission: item,
      value: item,
    })
  );

  const cylinderOptions = cylinderResponse.data.cylinders.map((item) => ({
    cylinders: item + " Cylinders",
    value: item,
  }));

  const driveTypeOption = driveTypeResponse.data.driveTypes.map((item) => ({
    driveType: item,
    value: item,
  }));

  // Construct the selectedBrands array
  const selectedBrands = brandOptions.filter((brandOption) =>
    allSlugs.includes(brandOption.slug)
  );

  const selectedBodyType = bodyTypeOptions.filter((brandOption) =>
    allSlugs.includes(brandOption.slug)
  );

  const price = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `filter/get-min-max`,
    {
      brand: selectedBrandIds,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      fuelType: filteredFuelTypes,
    }
  );

  const power = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `filter/get-min-max`,
    {
      brand: selectedBrandIds,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      power: filteredPowerRange,
      fuelType: filteredFuelTypes,
    }
  );

  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL +
      `trim/filter/advanced?pageSize=16&currentPage=${page}&orderBy=price`,
    {
      brand: allSlugs,
      bodyType: filteredBodyTypes,
      price: filteredPriceRange,
      power: filteredPowerRange,
      transmission: filteredTransmission,
      fuelType: filteredFuelTypes,
      cylinders: filteredCylinder,
      driveTypes: filteredDriveType,
      displacement: filteredDisplacementRange,
    }
  );

  const totalPages = response.data.totalPage;
  const pageSize = 16;

  return {
    props: {
      initialTrims: response.data.trims,
      brandOptions,
      bodyTypeOptions,
      fuelTypeOptions,
      transmissionOptions,
      cylinderOptions,
      driveTypeOption,
      selectedBrands,
      selectedBodyType: filteredBodyTypes,
      selectedPrice: filteredPriceSlugs,
      selectedPower: filteredPowerSlugs,
      selectedFuelType: filteredFuelTypes,
      selectedDisplacement: filteredDisplacementSlugs,
      inBetweenPriceSelect,
      inBetweenPowerSelect,
      inBetweenDisplacementSelect,
      filteredTransmission,
      filteredCylinder,
      filteredDriveType,
      currentPage: page, // Pass the current page as a prop
      totalPages: totalPages,
    },
  };
}
