import Ad300x600 from "@/components/ads/Ad300x600";
import Breadcrumb from "@/components/common/BreadCrumb";
import FeaturedImage from "@/components/common/FeaturedImage";
import Price from "@/components/common/Price";
import VehicleName from "@/components/common/VehicleName";
import Layout from "@/components/layout/Layout";
import FilteredCarCard from "@/components/search-car-page/FilteredCarCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import { MultiSelect } from "primereact/multiselect";
import Slider from "rc-slider";
import _ from "lodash";
import Ad728x90 from "@/components/ads/Ad728x90";
import Ad250x250 from "@/components/ads/Ad250x250";
import slugify from 'slugify';

export default function MobileHomeCarFilteredPage(props) {
  const [filteredByFeature, setFilteredByFeature] = useState(null);
  const [minMax, setMinMax] = useState(null);
  const [error, setError] = useState(null);
  const sortingOptions = [
    { value: 'low', label: 'Price : low to high' },
    { value: 'high', label: 'Price : high to ow' },
  ];

  const router = useRouter();
  const {
    haveMusic,
    isLuxury,
    isPremiumLuxury,
    haveTechnology,
    havePerformance,
    isSpacious,
    isElectric,
    isFuelEfficient,
    isOffRoad,
    isTwoSeat,
    isTwoPlusTwo,
    isFourToFive,
    isFiveToSeven,
    isSevenToNine,
    sortType,
    min,
    max,
  } = router.query;


  const queryParams = new URLSearchParams(
    Object.entries(router.query)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => [key, encodeURIComponent(value)])
  ).toString();

  const filterQueryParams = router?.asPath?.split("?")[1]

  const handleSortingChange = (option) => {
    setIsLoading(true)
    setFilteredTrims([])
    const query = {
      ...router.query,
      sortType: option?.value
    };
    router.push({
      pathname: '/find-your-car',
      query: query,
    });
  };


  // const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({});

  const [powertrain, setPowertrain] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [brand, setBrand] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [minPrice, setMinPrice] = useState(props?.minMax?.min || "");
  const [maxPrice, setMaxPrice] = useState(1200000 || "");
  const [transmission, setTransmission] = useState([]);
  const [minPower, setMinPower] = useState(100);
  const [maxPower, setMaxPower] = useState(5000);
  const [cylinders, setCylinders] = useState([]);
  const [filteredTrims, setFilteredTrims] = useState([]);


  const [hasMore, setHasMore] = useState(true);
  const [dataLength, setDataLength] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);




  const [responsePrice, setResponsePrice] = useState();
  const [initialValues, setInitialValues] = useState([
    Number(min),
    Number(max),
  ]);
  const inBetweenPriceSelect = [
    { value: { min: 0, max: 50000 }, priceLabel: "Below 50K" },
    { value: { min: 50000, max: 100000 }, priceLabel: "50K - 100K" },
    { value: { min: 100000, max: 200000 }, priceLabel: "100K - 200K" },
    { value: { min: 200000, max: 300000 }, priceLabel: "200K - 300K" },
    { value: { min: 300000, max: 500000 }, priceLabel: "300K - 500K" },
    { value: { min: 500000, max: 700000 }, priceLabel: "500K - 700K" },
    { value: { min: 700000, max: 1000000 }, priceLabel: "700K - 1M" },

  ];
  const [filteredPriceSelect, setFilteredPriceSelect] = useState([]);
  const [price, setPrice] = useState([]);
  const [sliderPrice, setSliderPrice] = useState([]);
  const [livePrice, setLivePrice] = useState([initialValues[0], 1200000]);




  const [responsePower, setResponsePower] = useState();
  const [initialPowerValues, setInitialPowerValues] = useState([props?.minMaxPower?.min, props?.minMaxPower?.max]);
  const inBetweenPowerSelect = [
    { value: { min: 0, max: 200 }, powerLabel: "Below 200hp" },
    { value: { min: 201, max: 400 }, powerLabel: "200hp - 400hp" },
    { value: { min: 401, max: 600 }, powerLabel: "400hp - 600hp" },
    { value: { min: 601, max: 1000 }, powerLabel: "600hp - 1000hp" },
    { value: { min: 1001, max: 1400 }, powerLabel: "1000hp - 1400hp" },
    { value: { min: 1401, max: 2000 }, powerLabel: "1400hp - 2000hp" },
  ];
  const [filteredPowerSelect, setFilteredPowerSelect] = useState([]);
  const [power, setPower] = useState([]);
  const [sliderPower, setSliderPower] = useState([]);
  const [livePower, setLivePower] = useState(initialPowerValues);

  const [initialDisplacementValues, setInitialDisplacementValues] = useState([
    1000, 8000,
  ]);
  const inBetweenDisplacementSelect = [
    { value: { min: 0, max: 1000 }, displacementLabel: "Below 1000cc" },
    { value: { min: 1000, max: 2000 }, displacementLabel: "1000cc - 2000cc" },
    { value: { min: 2000, max: 4000 }, displacementLabel: "2000cc - 4000cc" },
    { value: { min: 4000, max: 8000 }, displacementLabel: "4000cc - 8000cc" },
  ];

  const [filteredDisplacementSelect, setFilteredDisplacementSelect] = useState([]);

  const [displacement, setDisplacement] = useState([]);

  const [sliderDisplacement, setSliderDisplacement] = useState([]);

  const [liveDisplacement, setLiveDisplacement] = useState([
    initialDisplacementValues[0],
    initialDisplacementValues[1],
  ]);

  const [disablePriceSlider, setDisablePriceSlider] = useState(false)


  const filteredData = useMemo(
    () => ({
      // min: minPrice,
      // max: maxPrice,
      brand: brand.map((item) => item.id),
      bodyType: bodyType,
      fuelType: fuelType,
      transmission: transmission,
      // minPower: minPower,
      // maxPower: maxPower,
      cylinders: cylinders,
      price:
        price.length === 0 && sliderPrice.length === 0
          ? [{ min: initialValues[0], max: initialValues[1] }]
          : price.length > 0
            ? price
            // : sliderPrice[0] === initialValues[0] && sliderPrice[1] === initialValues[1] ? [] : [{ min: sliderPrice[0], max: sliderPrice[1] }],
            : [{ min: sliderPrice[0], max: sliderPrice[1] }],


      displacement:
        displacement.length === 0 && sliderDisplacement.length === 0
          ? []
          : displacement.length > 0
            ? displacement
            : [{ min: sliderDisplacement[0], max: sliderDisplacement[1] }],

      power:
        power.length === 0 && sliderPower.length === 0
          ? []
          : power.length > 0
            ? power
            : sliderPower[0] === initialPowerValues[0] && sliderPower[1] === initialPowerValues[1] ? [] : [{ min: sliderPower[0], max: sliderPower[1] }],
    }),
    [
      // minPrice,
      // maxPrice,
      price,
      brand,
      bodyType,
      fuelType,
      transmission,
      // minPower,
      // maxPower,
      cylinders,
      power,
      sliderPower,
      displacement,
      sliderDisplacement,
    ]
  );


  const filteredDataForfetchingBrand = useMemo(
    () => ({
      // min: minPrice,
      // max: maxPrice,
      brand: brand.map((item) => slugify(item.brand, { lower: true })),
      bodyType: bodyType,
      fuelType: fuelType,
      transmission: transmission,
      // minPower: minPower,
      // maxPower: maxPower,
      cylinders: cylinders,
      price:
        price.length === 0 && sliderPrice.length === 0
          ? [{ min: initialValues[0], max: initialValues[1] }]
          : price.length > 0
            ? price
            // : sliderPrice[0] === initialValues[0] && sliderPrice[1] === initialValues[1] ? [] : [{ min: sliderPrice[0], max: sliderPrice[1] }],
            : [{ min: sliderPrice[0], max: sliderPrice[1] }],

      displacement:
        displacement.length === 0 && sliderDisplacement.length === 0
          ? []
          : displacement.length > 0
            ? displacement
            : [{ min: sliderDisplacement[0], max: sliderDisplacement[1] }],

      power:
        power.length === 0 && sliderPower.length === 0
          ? []
          : power.length > 0
            ? power
            : sliderPower[0] === initialPowerValues[0] && sliderPower[1] === initialPowerValues[1] ? [] : [{ min: sliderPower[0], max: sliderPower[1] }],
    }),
    [
      // minPrice,
      // maxPrice,
      price,
      brand,
      bodyType,
      fuelType,
      transmission,
      // minPower,
      // maxPower,
      cylinders,
      power,
      sliderPower,
      displacement,
      sliderDisplacement,
      router.query
    ]
  );

  

  const handleFetchData = async (page) => {

    setIsLoading(true);
    await axios
      .post(
        process?.env?.NEXT_PUBLIC_API_URL +
        `trim/filter/advanced?pageSize=16&currentPage=${page}&orderBy=price${"&" + filterQueryParams}`,
        filteredDataForfetchingBrand
      )
      .then((response) => {
        const newTrims = response.data.trims;

        if (page === 1) {
          setFilteredTrims(newTrims); // replace the initial data with filtered data when on the first page

          setIsLoading(false);
        } else {
          setFilteredTrims([...filteredTrims, ...newTrims]); // append new data to the existing data when on subsequent pages

          setIsLoading(false);
        }
        setTotalPages(response.data.totalPage);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    await axios
      .post(
        process?.env?.NEXT_PUBLIC_API_URL +
        `filter/get-min-max${"?" + filterQueryParams}`,
        filteredData
      )
      .then((response) => {
        setResponsePrice(response.data)

      })
      .catch((error) => {
        setIsLoading(false);
      });
      if (filteredData?.power?.length == 0) {
        await axios
          .post(
            process?.env?.NEXT_PUBLIC_API_URL +
            `filter/power/get-min-max${"?" + filterQueryParams}`,
            filteredData
          )
          .then((response) => {
            // Dynamic Power Start
            let res = response?.data
            const filteredSelect = inBetweenPowerSelect.filter(({ value: { min, max } }) => {
              return (
                (min >= res?.min && max <= res?.max) ||
                (min <= res?.min && max >= res?.min) ||
                (min <= res?.max && max >= res?.max)
              );
            });
            if (res?.max > 2000) {
              filteredSelect.push({ value: { min: 2000, max: res?.max }, powerLabel: "Above 2000hp" });
            }
            setFilteredPowerSelect(filteredSelect);
            setResponsePower(response.data);
            setLivePower([response.data.min, response.data.max])
  
            // Dynamic Power End
  
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }

    await axios
      .post(
        process?.env?.NEXT_PUBLIC_API_URL +
        `filter/get-min-max${"?" + filterQueryParams}`,
        filteredData
      )
      .then((response) => {
        // Dynamic Price Start
        let res = response?.data
        const filteredSelect = inBetweenPriceSelect.filter(({ value: { min, max } }) => {
          return (
            (min >= res?.min && max <= res?.max) ||
            (min <= res?.min && max >= res?.min) ||
            (min <= res?.max && max >= res?.max)
          );
        });
        if (res?.max > 1000000) {
          filteredSelect.push({
            value: { min: 1000000, max: res?.max },
            priceLabel: "Above 1M",
          },);
        }
        setFilteredPriceSelect(filteredSelect);
        setResponsePrice(response.data);
        setLivePrice([response.data.min, response.data.max])
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // Dynamic Price End

    if (filteredData?.price?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `filter/get-min-max${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {
          // Dynamic Price Start
          let res = response?.data
          const filteredSelect = inBetweenPriceSelect.filter(({ value: { min, max } }) => {
            return (
              (min >= res?.min && max <= res?.max) ||
              (min <= res?.min && max >= res?.min) ||
              (min <= res?.max && max >= res?.max)
            );
          });
          if (res?.max > 1000000) {
            filteredSelect.push({
              value: { min: 1000000, max: res?.max },
              priceLabel: "Above 1M",
            });
          }
          setFilteredPriceSelect(filteredSelect);
          setResponsePrice(response.data);
          setLivePrice([response.data.min, response.data.max])
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    // Dynamic Price End

    // Dynamic Brand Start
    if (filteredData?.brand?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `brands${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {

          setBrandOptions(response?.data?.carBrands.map((item, index) => ({
            brand: item.name,
            id: item.id,
          })))
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic Brand End


    // Dynamic Body type Start
    if (filteredData?.bodyType?.length == 0) {

      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/body-type/list${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {
          const bodyTypeOptions = _.compact(response?.data?.bodyType).map(
            (item, index) => ({
              bodyType: item,
              value: item,
            })
          );

          setBodyTypeOptions(bodyTypeOptions);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic Body Type End


    // Dynamic Fuel type Start
    if (filteredData?.fuelType?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/fuel-type/list${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {
          setFuelTypeOptions(response?.data?.fuelType.map((item, index) => ({
            fuelType: item,
            value: item,
          })))
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic Fuel type End

    // Dynamic transmissions Start
    if (filteredData?.transmission?.length == 0) {

      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/transmissions/list${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {
          setTransmissionOption(response?.data?.transmission.map((item, index) => ({
            transmission: item,
            value: item,
          })))
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic transmissions End

    // Dynamic cylinder Start
    if (filteredData?.cylinders?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/cylinder-no/list${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {
          const cylinderOptions = _.compact(response?.data?.cylinders).map(
            (item, index) => ({
              cylinder: item + " Cylinders",
              value: item,
            })
          );
          setCylinderOption(cylinderOptions);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic cylinder End

    // Dynamic Drive type Start
    if (filteredData?.drive?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/drive-type/list`,
          filteredData
        )
        .then((response) => {
          setDriveOptions(response?.data?.driveTypes
            .filter(item => item !== "") // Filter out the empty string
            .map((item) => ({
              drive: item,
              value: item,
            }))
          );
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic Drive type End
    if (filteredData?.displacement?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `filter/displacement/get-min-max${"?" + filterQueryParams}`,
          filteredData
        )
        .then((response) => {
          // Dynamic Disp Start
          let res = response?.data

          const filteredSelect = inBetweenDisplacementSelect.filter(({ value: { min, max } }) => {
            return (
              (min >= res?.min && max <= res?.max) ||
              (min <= res?.min && max >= res?.min) ||
              (min <= res?.max && max >= res?.max)
            );
          });
          if (res?.max > 8000) {
            filteredSelect.push({ value: { min: 8000, max: 50000 }, displacementLabel: "Above 8000cc+" });
          }
          setFilteredDisplacementSelect(filteredSelect)
          // setResponsePrice(response.data);
          setLiveDisplacement([response.data.min === "" ? 1000 : response.data.min, response.data.max])

          // Dynamic Disp End

        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

  };

  useEffect(() => {
    handleFetchData(1);
    setCurrentPage(1);
  }, [filteredData,filteredDataForfetchingBrand]);

    const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleFetchData(nextPage)
        .then((data) => {
          // Check if there is more data available
          const hasMoreData = data.length > 0;
          setHasMore(hasMoreData);
        })
        .catch((error) => {
          // Handle any error that occurred during data fetching
        });
    }
  };

  const handleResetFilter = () => {
    reset();
    setPowertrain([]);
    setFuelType([]);
    setBrand([]);
    setBodyType([]);
    setMinPrice(props?.minMax?.min);
    setMaxPrice(props?.minMax?.max);
    setMinPower(2);
    setMaxPower(1500);
    setTransmission([]);
    setInitialValues([minPrice, maxPrice]);
    setInitialPowerValues([0, 1500]);
    setInitialDisplacementValues([1000, 8000]);
    setMinPower(100);
    setMaxPower(1500);
    setCylinders([]);
    setPrice([]);
    setPower([]);
    setDisplacement([]);
  };

  const [brandOptions, setBrandOptions] = useState();

  const [bodyTypeOptions, setBodyTypeOptions] = useState();

  const [fuelTypeOptions, setFuelTypeOptions] = useState();

  const [transmissionOption, setTransmissionOption] = useState();

  const [cylinderOption, setCylinderOption] = useState();

  return (
    <Layout>
      <div className="container my-3">
        <div className="my-2">
          <Ad728x90 dataAdSlot="5305765900" />
        </div>
        <Breadcrumb />
        <div className="row mt-1 mb-4 ">
          <h1 className="fw-bold">Find your Perfect Car</h1>
          <h4 >Discover our exceptional range of vehicles, priced between <Price data={Number(min)} /> and AED <Price data={Number(max)} />. Unleash your automotive aspirations with our captivating selection.</h4>
          <div className="sticky_filter_scroll mb-4">
            <div className="white_bg_wrapper pt-4">
              <div className="d-flex justify-content-center align-items-center search_overflow">
                <div className="w-116 me-1" style={{ marginLeft: "480px" }}>
                  <span className="p-float-label">
                    <MultiSelect
                      value={brand}
                      onChange={(e) => setBrand(e.value)}
                      options={brandOptions}
                      optionLabel="brand"

                      // placeholder="Select Brands"
                      filter
                      maxSelectedLabels={3}
                      className="w-100 "

                    />
                    <label htmlFor="ms-cities fw-bold">
                      <small className="fw-bold">Brands</small>
                    </label>
                  </span>
                </div>
                <div className="w-116 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={bodyType}
                      onChange={(e) => setBodyType(e.value)}
                      options={_.sortBy(bodyTypeOptions, 'bodyType')}
                      optionLabel="bodyType"

                      // placeholder="Select Body Type"
                      filter
                      maxSelectedLabels={3}
                      className="w-100"

                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Body Type</small>
                    </label>
                  </span>
                </div>
                <div className="w-116 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={price}
                      onChange={(e) => {
                        setPrice(e.value);
                        setSliderPrice([initialValues[0], initialValues[1]]);
                        setLivePrice([initialValues[0], initialValues[1]]);
                        setDisablePriceSlider(true)
                      }}
                      options={filteredPriceSelect}
                      optionLabel="priceLabel"

                      maxSelectedLabels={3}
                      className="w-100"

                      panelHeaderTemplate={
                        <div className="bg-primary rounded-top">
                          <div className="mx-4 py-3">
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                value={livePrice[0]}
                                disabled
                                onChange={(e) =>
                                  setLivePrice([e.target.value, livePrice[1]])
                                }
                                className="form-control fw-bold text-center"
                              />
                              <input
                                type="text"
                                value={livePrice[1]}
                                disabled
                                onChange={(e) =>
                                  setLivePrice([livePrice[0], e.target.value])
                                }
                                className="form-control fw-bold text-center"
                              />
                            </div>

                            {/* <Slider
                            range
                            min={initialValues[0]}
                            max={initialValues[1]}
                            step={5000}
                            onChange={(e) => setLivePrice([e[0], e[1]])}
                            onAfterChange={(e) => {
                              setSliderPrice([e[0], e[1]]);
                              setPrice([]);
                            }}
                            value={livePrice}
                            allowCross={false}
                            disabled={disablePriceSlider}
                          /> */}
                          </div>
                        </div>
                      }
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Price</small>
                    </label>
                  </span>
                </div>
                <div className="w-116 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={power}
                      onChange={(e) => {
                        setPower(e.value);
                        setSliderPower([
                          initialPowerValues[0],
                          initialPowerValues[1],
                        ]);
                        setLivePower([
                          initialPowerValues[0],
                          initialPowerValues[1],
                        ]);
                      }}
                      options={filteredPowerSelect}
                      optionLabel="powerLabel"

                      maxSelectedLabels={3}
                      className="w-100"

                      panelHeaderTemplate={
                        <div className="bg-primary rounded-top">
                          <div className="mx-4 py-3">
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                value={livePower[0]}
                                disabled
                                onChange={(e) =>
                                  setLivePower([e.target.value, livePower[1]])
                                }
                                className="form-control fw-bold text-center"
                              />
                              <input
                                type="text"
                                value={livePower[1]}
                                disabled
                                onChange={(e) =>
                                  setLivePower([livePower[0], e.target.value])
                                }
                                className="form-control fw-bold text-center"
                              />
                            </div>

                            {/* <Slider
                            range
                            min={initialPowerValues[0]}
                            max={initialPowerValues[1]}
                            step={20}
                            onChange={(e) => setLivePower([e[0], e[1]])}
                            onAfterChange={(e) => {
                              setSliderPower([e[0], e[1]]);
                              setPower([]);
                            }}
                            value={livePower}
                            allowCross={false}
                          /> */}
                          </div>
                        </div>
                      }
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Horse Power</small>
                    </label>
                  </span>
                </div>
                <div className="w-116 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={fuelType}
                      onChange={(e) => setFuelType(e.value)}
                      options={_.sortBy(fuelTypeOptions, 'fuelType')} optionLabel="fuelType"

                      maxSelectedLabels={3}
                      className="w-100"

                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Fuel Type</small>
                    </label>
                  </span>
                </div>
                <div className="w-116 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={transmission}
                      onChange={(e) => setTransmission(e.value)}
                      options={_.sortBy(transmissionOption, 'transmission')}
                      optionLabel="transmission"

                      maxSelectedLabels={3}
                      className="w-100"

                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Transmissions</small>
                    </label>
                  </span>
                </div>
                <div className="w-116 me-1">
                  <span className="p-float-label">
                    <MultiSelect
                      value={cylinders}
                      onChange={(e) => setCylinders(e.value)}
                      options={_.sortBy(cylinderOption, option => Number(option.value))}
                      optionLabel="cylinder"

                      maxSelectedLabels={3}
                      className="w-100"

                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">No. of Cylinder</small>
                    </label>
                  </span>
                </div>

                <div className="w-116">
                  <span className="p-float-label">
                    <MultiSelect
                      value={displacement}
                      onChange={(e) => {
                        setDisplacement(e.value);
                        setSliderDisplacement([]);
                        setLiveDisplacement([
                          initialDisplacementValues[0],
                          initialDisplacementValues[1],
                        ]);
                      }}
                      options={filteredDisplacementSelect}
                      optionLabel="displacementLabel"

                      maxSelectedLabels={3}
                      className="w-100"

                      panelHeaderTemplate={
                        <div className="bg-primary rounded-top">
                          <div className="mx-4 py-3">
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                value={liveDisplacement[0]}
                                disabled
                                onChange={(e) =>
                                  setLiveDisplacement([
                                    e.target.value,
                                    liveDisplacement[1],
                                  ])
                                }
                                className="form-control fw-bold text-center"
                              />
                              <input
                                type="text"
                                value={liveDisplacement[1]}
                                disabled
                                onChange={(e) =>
                                  setLiveDisplacement([
                                    liveDisplacement[0],
                                    e.target.value,
                                  ])
                                }
                                className="form-control fw-bold text-center"
                              />
                            </div>

                            {/* <Slider
                            range
                            min={initialDisplacementValues[0]}
                            max={initialDisplacementValues[1]}
                            step={500}
                            onChange={(e) =>
                              setLiveDisplacement([e[0], e[1]])
                            }
                            onAfterChange={(e) => {
                              setSliderDisplacement([e[0], e[1]]);
                              setDisplacement([]);
                            }}
                            value={liveDisplacement}
                            allowCross={false}
                          /> */}
                          </div>
                        </div>
                      }
                    />
                    <label htmlFor="ms-cities">
                      <small className="fw-bold">Displacement</small>
                    </label>
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-wrap pt-1 bg-white mx-4">
                {brand.map((item) => (
                  <small
                    onClick={() =>
                      // {setBrandOptions(brand.filter((m) => m.id !== Number(item.id)))
                      setBrand(brand.filter((m) => m.id !== Number(item.id)))
                    }
                    className="filter_badges"
                  >
                    {item.brand}
                    <i class="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {bodyType.map((item) => (
                  <small
                    onClick={() =>
                      setBodyType(
                        bodyType.filter((m) => m.value !== item.value)
                      )
                    }
                    className="filter_badges"
                  >
                    {item}

                    <i class="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}



                {price.map((item) => (
                  <small
                    onClick={() => {
                      setPrice(price.filter((m) => m !== item));
                      setInitialValues([minPrice, maxPrice]);
                    }}
                    className="filter_badges"
                  >
                    Price AED {item.min}* - {item.max}*
                    <i className="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {power.map((item) => (
                  <small
                    onClick={() => {
                      setPower(power.filter((m) => m !== item));
                      setInitialPowerValues([
                        props?.minMaxPower?.min,
                        props?.minMaxPower?.max,
                      ]);
                    }}
                    className="filter_badges"
                  >
                    {item.min}hp - {item.max}hp
                    <i className="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {fuelType.map((item) => (
                  <small
                    onClick={() => {
                      setFuelType(fuelType.filter((m) => m !== item));
                    }}
                    className="filter_badges"
                  >
                    {item}
                    <i className="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {transmission.map((item) => (
                  <small
                    onClick={() => {
                      setTransmission(transmission.filter((m) => m !== item));
                    }}
                    className="filter_badges"
                  >
                    {item}
                    <i className="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {cylinders.map((item) => (
                  <small
                    onClick={() => {
                      setCylinders(cylinders.filter((m) => m !== item));
                    }}
                    className="filter_badges"
                  >
                    {item} cylinders
                    <i className="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {displacement.map((item) => (
                  <small
                    onClick={() => {
                      setDisplacement(displacement.filter((m) => m !== item));
                      setInitialDisplacementValues([]);
                    }}
                    className="filter_badges"
                  >
                    {item.min}cc - {item.max}cc
                    <i className="bi bi-x-circle-fill ms-2" />
                  </small>
                ))}

                {filteredTrims !== [] && (
                  <button
                    onClick={handleResetFilter}
                    className="btn btn-danger reset_button"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className=" px-2">
              {/* <div className="mb-3 d-flex justify-content-end ">
                    <Select
                      options={sortingOptions}
                      value={{value:router.query.sortType , label: router.query.sortType === "low" ? "Price: low to high" : "Price: high to low"}}
                      onChange={handleSortingChange}
                      placeholder="Sort"
                      className="w-25"
                    />
                  </div> */}
              <InfiniteScroll
                dataLength={filteredTrims.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={
                  isLoading && (
                    <div className="d-flex justify-content-center">
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="var(--light)"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  )
                }
                // height={580}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="row">
                  {filteredTrims.length <= 0 && isLoading === false ? <div className="d-flex justify-content-center align-items-center search_not_found"><img src="/assets/images/not-found/search-not-found.png" /></div> :
                    filteredTrims?.map((item, index) => (
                      // <div key={item.id}>
                      <FilteredCarCard
                        filteredData={item}
                        handleLoadMore={handleLoadMore}
                        uniqueIndex={item.id}
                      />
                      // </div>
                    ))
                  }

                </div>
              </InfiniteScroll>
            </div>
          </div>
          <div className="col-12 mt-2">
            <Ad250x250 dataAdSlot="8876565002" />
          </div>
          {/* <div className="col-3 mb-3">
            <div className="sticky_filter_ad_scroll">
              <Ad300x600 />
            </div>
          </div> */}

        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  let resBodyType = await axios?.get(
    process?.env?.NEXT_PUBLIC_API_URL + "trim/body-type/list"
  );

  let resFuelType = await axios?.get(
    process?.env?.NEXT_PUBLIC_API_URL + "trim/fuel-type/list"
  );

  let resBrands = await axios?.get(
    process?.env?.NEXT_PUBLIC_API_URL + "brands?orderBy=name&isAll=1"
  );

  const resMinMax = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}filter/get-min-max`
  );

  const resMinMaxPower = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}filter/power/get-min-max
    `
  );

  let bodyType = resBodyType?.data;
  let fuelType = resFuelType?.data;
  let brands = resBrands?.data;
  let minMax = resMinMax.data;
  let minMaxPower = resMinMaxPower.data;

  // Pass data to the page via props
  return {
    props: {
      bodyType,
      fuelType,
      brands,
      minMax,
      minMaxPower,
    },
  };
}
