import Ad300x600 from '@/components/ads/Ad300x600';
import Breadcrumb from '@/components/common/BreadCrumb';
import FeaturedImage from '@/components/common/FeaturedImage';
import Price from '@/components/common/Price';
import VehicleName from '@/components/common/VehicleName';
import Layout from '@/components/layout/Layout'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import { MultiSelect } from "primereact/multiselect";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Slider from "rc-slider";
import InfiniteScroll from 'react-infinite-scroll-component';
import FilteredCarCard from '@/components/search-car-page/FilteredCarCard';
import MobileSingleBrand from '@/mobile/pages/brands/[brandname]';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';
import Ad728x90 from '@/components/ads/Ad728x90';
import { toCamelCase } from '@/utils/toCamelCase';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment";
import BrandFaq from '@/components/brand-filter-page/BrandFaq';


export default function SingleBrand(props) {

  console.log(props, "prooops");

  const router = useRouter();
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


  const [drive, setDrive] = useState([]);
  const [driveOptions, setDriveOptions] = useState([]);


  const [responsePrice, setResponsePrice] = useState();
  const [initialValues, setInitialValues] = useState([
    props?.minMax?.min,
    1200000,
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
  const [trimsCount, setTrimsCount] = useState()
  const [maxPowerTrim, setMaxPowerTrim] = useState()
  const [maxPriceTrim, setMaxPriceTrim] = useState()
  const [minPriceTrim, setMinPriceTrim] = useState()
  const [mostFuelEfficientTrim, setMostFuelEfficientTrim] = useState()
  const [fastestTrim, setFastestTrim] = useState()
  const [electricOrHybrid, setElectricOrHybrid] = useState()
  const [bodyTypeCounts, setBodyTypeCounts] = useState()
  

  const filteredData = useMemo(
    () => ({
      // min: minPrice,
      // max: maxPrice,
      brand: props?.models?.models[0]?.brand?.slug,
      bodyType: bodyType,
      fuelType: fuelType,
      transmission: transmission,
      // minPower: minPower,
      // maxPower: maxPower,
      cylinders: cylinders,
      drive: drive,
      price:
        price.length === 0 && sliderPrice.length === 0
          ? []
          : price.length > 0
            ? price
            : sliderPrice[0] === initialValues[0] && sliderPrice[1] === initialValues[1] ? [] : [{ min: sliderPrice[0], max: sliderPrice[1] }],

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
      drive,
      cylinders,
      power,
      sliderPower,
      displacement,
      sliderDisplacement,
      router.query
    ]
  );

  const handleFetchBrandProperties = async () => {

    await axios
      .post(
        process?.env?.NEXT_PUBLIC_API_URL +
        `trim/filter/brand-page-properties?isAll=1&pageSize=1000`,
        { "brand": filteredData?.brand }
      )
      .then((response) => {

        console.log(response, "reeeeeees");

        setTrimsCount(response.data.trimsCount)
        setMaxPowerTrim(response.data.maxPowerTrim)
        setMaxPriceTrim(response.data.maxPriceTrim)
        setMinPriceTrim(response.data.minPriceTrim)
        setMostFuelEfficientTrim(response.data.mostFuelEfficientTrim)
        setElectricOrHybrid(response.data.electricOrHybrid)
        setFastestTrim(response.data.fastestTrim)
        setBodyTypeCounts(response.data.bodyTypeCounts)
      })
      .catch((error) => {

      });
  }

  const handleFetchData = async (page) => {

    setIsLoading(true);
    await axios
      .post(
        process?.env?.NEXT_PUBLIC_API_URL +
        `trim/filter/advanced?pageSize=16&currentPage=${page}&orderBy=price`,
        filteredData
      )
      .then((response) => {
        const newTrims = response.data.trims;
        // setTrimsCount(response.data.trimsCount)
        // setMaxPowerTrim(response.data.maxPowerTrim)
        // setMaxPriceTrim(response.data.maxPriceTrim)
        // setMinPriceTrim(response.data.minPriceTrim)
        // setBodyTypeCounts(response.data.bodyTypeCounts)


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
        `filter/get-min-max`,
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
          `filter/power/get-min-max`,
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

    if (filteredData?.price?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `filter/get-min-max`,
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

          // Dynamic Price End

        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    if (filteredData?.bodyType?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/body-type/list`,
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
    
    // Dynamic Fuel type Start
    if (filteredData?.fuelType?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `trim/fuel-type/list`,
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
          `trim/transmissions/list`,
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
          `trim/cylinder-no/list`,
          filteredData
        )
        .then((response) => {
          setCylinderOption(response?.data?.cylinders
            .filter(item => item !== "") // Filter out the empty string
            .map((item, index) => ({
              cylinder: item + " Cylinders",
              value: item,
            }))
          );
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // Dynamic cylinder End
    if (filteredData?.displacement?.length == 0) {
      await axios
        .post(
          process?.env?.NEXT_PUBLIC_API_URL +
          `filter/displacement/get-min-max`,
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
      // Dynamic Drive type End
    }
  };

  useEffect(() => {
    handleFetchData(1);
    setCurrentPage(1);
  }, [filteredData, router]);




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
    setDrive([])
  };

  const [brandOptions, setBrandOptions] = useState(
    props.brands.carBrands.map((item, index) => ({
      brand: item.name,
      id: item.id,
    }))
  );

  const [bodyTypeOptions, setBodyTypeOptions] = useState();

  const [fuelTypeOptions, setFuelTypeOptions] = useState();

  const [transmissionOption, setTransmissionOption] = useState();

  const [cylinderOption, setCylinderOption] = useState();

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

  if (isMobile) {
    // 
    return (
      <>
        <MobileSingleBrand {...props} />
      </>
    )
  }

  const currentYear = new Date().getFullYear();

  const bodyTypeString = bodyTypeCounts?.map(item => {
    const count = item.count > 1 ? item.count + " " : "1 ";
    const name = item.count > 1 ? item.name + "s" : item.name;
    return count + name;
  }).join(", ");

  const lastIndex = bodyTypeString?.lastIndexOf(",");
  const bodyTypeInfo = bodyTypeString?.slice(0, lastIndex) + " and" + bodyTypeString?.slice(lastIndex + 1);

  const [priceTableData, setPriceTableData] = useState(props.modelsTableListing?.models.filter((trim) => trim.minPrice !== null).sort((a, b) => a.minPrice - b.minPrice));




  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
    setExpanded(false)
    handleFetchBrandProperties()
  }, [router])


  return (
    <Layout pageMeta={{
      title: `${toCamelCase(router?.query?.brandname)} ${currentYear} Car Prices in UAE, Latest Models, Reviews & Specifications in UAE  - Carprices.ae`,
      description: `Explore a wide selection of ${toCamelCase(router?.query?.brandname)} ${currentYear} cars at competitive prices in the UAE. Discover expert reviews, specifications, and find authorized dealers near you for a seamless car buying experience.`,
      type: "Car Review Website",
    }}>
      <div className="container my-3">
        <div className='brand_banner my-5'>
          <div className='brand_banner_left_sec'>
            <div className='brand_logo_image'>
              <FeaturedImage width={100} height={100} src={props?.models?.models[0]?.brand?.image} />
            </div>
            <div class="cpx-brand-hero__title">
              <h1 class="cpx-brand-hero__title-primary">
                {props?.models?.models[0]?.brand?.name} Car Prices, Latest Models, Reviews &amp; Comparison In UAE
              </h1>
              <div class="cpx-brand-hero__title-secondary">
                Here are the prices for all New {props?.models?.models[0]?.brand?.name} Cars in UAE
              </div>
            </div>
          </div>

          <div className='brand_image_container'>
            <FeaturedImage width={400} height={400} src={props?.models?.models[0]?.brand?.coverImage} />
          </div>
        </div>


        <div className="mb-2">
          <Ad728x90 dataAdSlot="4036954254" />
        </div>
        <div className='dynamic_price_desc mb-3'>
          <h2 className='fw-bold'>{props?.models?.models[0]?.brand?.name} UAE Cars</h2>

          <div className="read-more-less" id="dynamic-content">
            <div className={`info ${expanded ? "" : "height-hidden"} dynamic-content content-hidden`}>

              {props?.models?.models[0] &&
                <>
                  <p dangerouslySetInnerHTML={{ __html: props?.models?.models[0]?.brand?.description }}></p>
                  <br />
                  <h2 className='fw-bold'>{props?.models?.models[0]?.brand?.name} Cars {moment().format("MMMM YYYY")} Price List in UAE</h2>

                </>
              }
              <p>You can choose from <b>{trimsCount}</b> available <Link href={`/brands/${props?.models?.models[0]?.brand?.slug}`} className='fw-bold text-primary'>{props?.models?.models[0]?.brand?.name}</Link> models in the UAE. The <Link href={`/brands/${props?.models?.models[0]?.brand?.slug}`} className='fw-bold text-primary'>{props?.models?.models[0]?.brand?.name}</Link> UAE line-up consists of <b>{bodyTypeInfo}</b>. <Link href={`/brands/${props?.models?.models[0]?.brand?.slug}/${minPriceTrim?.year}/${minPriceTrim?.model?.slug}/${minPriceTrim?.slug}`} className='fw-bold text-primary'>{props?.models?.models[0]?.brand?.name} {minPriceTrim?.model?.name} {minPriceTrim?.name}</Link>, starting at <b>AED <Price data={minPriceTrim?.price} /></b>, is the most affordable model while the <Link href={`/brands/${props?.models?.models[0]?.brand?.slug}/${maxPriceTrim?.year}/${maxPriceTrim?.model?.slug}/${maxPriceTrim?.slug}`} className='fw-bold text-primary'>{props?.models?.models[0]?.brand?.name} {maxPriceTrim?.model?.name} {maxPriceTrim?.name}</Link> at <b>AED <Price data={maxPriceTrim?.price} /></b> is the brand’s most expensive model. <Link href={`/brands/${props?.models?.models[0]?.brand?.slug}/${maxPowerTrim?.year}/${maxPowerTrim?.model?.slug}/${maxPowerTrim?.slug}`} className='fw-bold text-primary'>{props?.models?.models[0]?.brand?.name} {maxPowerTrim?.model?.name} {maxPowerTrim?.name}</Link> is the most powerful model in the brand's line-up.
              </p>
              <br />
              <div className="card">
                <DataTable
                  value={props.modelsTableListing?.models.filter((trim) => trim.minPrice !== null).sort((a, b) => a.minPrice - b.minPrice)}
                  scrollable
                  scrollHeight="400px"
                  style={{ minWidth: '11rem' }}
                >
                  <Column
                    field="name"
                    header={props?.models?.models[0]?.brand?.name + " " + "Cars"}
                    body={(rowData) => (
                      <span style={{ padding: '0px' }}>{props?.models?.models[0]?.brand?.name} {rowData.name}</span>
                    )}
                  ></Column>
                  <Column
                    field="minPrice"
                    header="Price List"
                    body={(rowData) => (
                      <span style={{ padding: '0px' }}>AED {rowData.minPrice === rowData.maxPrice ? <Price data={rowData.minPrice} /> : <><Price data={rowData.minPrice} /> - <Price data={rowData.maxPrice} /></>}</span>
                    )}
                  ></Column>
                </DataTable>
              </div>
            </div>
            <span className={`read-more ${expanded ? "hide" : ""} text-primary fw-bold`} onClick={() => setExpanded(true)}>Read More</span>
            <span className={`read-less scroll-to-parent-pos content-read-less ${expanded ? "" : "hide"} text-primary fw-bold`} onClick={() => setExpanded(false)}>Read Less</span>
          </div>
        </div>

        <div className="sticky_filter_scroll mb-4">
          <div className="white_bg_wrapper pt-4">
            <div className="d-flex justify-content-center align-items-center">

              <div className="w-12 me-1">
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
                    onChange={(e) => {
                      setPrice(e.value);
                      setSliderPrice([initialValues[0], initialValues[1]]);
                      setLivePrice([initialValues[0], initialValues[1]]);
                    }}
                    options={filteredPriceSelect}
                    optionLabel="priceLabel"

                    maxSelectedLabels={3}
                    className="w-100"
                    appendTo="self"
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
              <div className="w-12 me-1">
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
                    appendTo="self"
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
                    <small className="fw-bold">Power</small>
                  </label>
                </span>
              </div>
              <div className="w-12 me-1">
                <span className="p-float-label">
                  <MultiSelect
                    value={fuelType}
                    onChange={(e) => setFuelType(e.value)}
                    options={_.sortBy(fuelTypeOptions, 'fuelType')} optionLabel="fuelType"

                    maxSelectedLabels={3}
                    className="w-100"
                    appendTo="self"
                  />
                  <label htmlFor="ms-cities">
                    <small className="fw-bold">Fuel Type</small>
                  </label>
                </span>
              </div>
              <div className="w-10 me-1">
                <span className="p-float-label">
                  <MultiSelect
                    value={transmission}
                    onChange={(e) => setTransmission(e.value)}
                    options={_.sortBy(transmissionOption, 'transmission')}
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
                    value={cylinders}
                    onChange={(e) => setCylinders(e.value)}
                    options={_.sortBy(cylinderOption, option => Number(option.value))}
                    optionLabel="cylinder"

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
                    onChange={(e) => setDrive(e.value)}
                    options={_.sortBy(driveOptions, 'drive')}
                    optionLabel="drive"

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
                    appendTo="self"
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

              {drive.map((item) => (
                <small
                  onClick={() => {
                    setDrive(drive.filter((m) => m !== item));
                  }}
                  className="filter_badges"
                >
                  {item}
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
        <div className="row mt-2 mb-4">
          <div className="col-9">
            <div className=" px-2">
              <div className="d-flex justify-content-end mb-3">
                <div class="price_filter_badge">
                  <span>Sorted By Price : Low to High</span>
                </div>
              </div>
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

              <div className="my-2">
                <Ad728x90 dataAdSlot="1533230751" />
              </div>

              <div>
                <h2 className='fw-bold mb-3'>{props?.models?.models[0]?.brand?.name} Cars Key Highlights</h2>
                <table className="table table-bordered table-rounded">
                  <tbody>
                    <tr>
                      <th className="col-2" scope="row" colspan="6"><small>Most Affordable</small></th>
                      <td className="col-6" scope="row" colspan="6">{props?.models?.models[0]?.brand?.name} {minPriceTrim?.model?.name} {minPriceTrim?.name}</td>
                    </tr>
                    <tr>
                      <th className="col-2" scope="row" colspan="6"><small>Most Expensive</small></th>
                      <td className="col-6" scope="row" colspan="6">{props?.models?.models[0]?.brand?.name} {maxPriceTrim?.model?.name} {maxPriceTrim?.name}</td>
                    </tr>
                    <tr>
                      <th className="col-2" scope="row" colspan="6"><small>Most Powerful</small></th>
                      <td className="col-6" scope="row" colspan="6">{props?.models?.models[0]?.brand?.name} {maxPowerTrim?.model?.name} {maxPowerTrim?.name}</td>
                    </tr>
                    <tr>
                      <th className="col-2" scope="row" colspan="6"><small>Available Body Types</small></th>
                      <td className="col-6" scope="row" colspan="6">{bodyTypeInfo}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <BrandFaq props={{
                maxPowerTrim: maxPowerTrim,
                maxPriceTrim: maxPriceTrim,
                minPriceTrim: minPriceTrim,
                mostFuelEfficientTrim:mostFuelEfficientTrim,
                fastestTrim:fastestTrim,
                bodyTypeCounts: bodyTypeCounts,
                bodyTypeInfo:bodyTypeInfo,
                year:props?.models?.models[0]?.year,
                electricOrHybrid:electricOrHybrid,
                brand:props?.models?.models[0]?.brand?.name
              }} />
              {/* <div id="infinite-scroll-trigger"></div>
                {isLoading && <Loader />} */}

              {/* <div className="my-3">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div> */}
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 my-3">
            <div className="sticky_scroll">
              <Ad300x600 dataAdSlot="8738616592" />
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req, res, params }) {
  let resBrand = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
    `model/by-brand/slug/${params.brandname}?&orderBy=price&isAll=1`
  );
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

  const resModelsTableListing = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}model/by-brand-table-listing/slug/${params.brandname}?isAll=1
    `
  );

  let bodyType = resBodyType?.data;
  let fuelType = resFuelType?.data;
  let brands = resBrands?.data;
  let minMax = resMinMax.data;
  let minMaxPower = resMinMaxPower.data;
  let models = resBrand?.data;
  let modelsTableListing = resModelsTableListing?.data
  return {
    props: {
      models,
      bodyType,
      fuelType,
      brands,
      minMax,
      minMaxPower,
      modelsTableListing
    },
  };
}
