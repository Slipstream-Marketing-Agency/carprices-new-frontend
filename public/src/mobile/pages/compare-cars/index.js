import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";
import FeaturedImage from "@/components/common/FeaturedImage";
import VehicleFilters from "@/components/homePage/compare-to-buy/VehicleFilters";
import { toast } from "react-toastify";
import CompareToBuy from "@/components/homePage/compare-to-buy/CompareToBuy";
import Ad728x90 from "@/components/ads/Ad728x90";
import Breadcrumb from "@/components/common/BreadCrumb";
import MobileAddVehicleToFilter from "@/mobile/components/homePage/compare-to-buy/MobileAddVehicleToFilter";

export default function MobileCompareCars(props) {
  const compareList = props.compareList
  const carToCompare = props?.carToCompare?.trims;
  const router = useRouter();
  const compareParams = router?.query;

  const [specificVehicleFilter, setSpecificVehicleFilter] = useState({
    v1Slug: null,
    v1BrandName: null,
    v1ModelName: null,
    v1TrimName: null,
    v1Year: null,
    v2Slug: null,
    v2BrandName: null,
    v2ModelName: null,
    v2TrimName: null,
    v2Year: null,
  });
  useEffect(() => {
    if (carToCompare?.length >= 1) {
      const [trim1, trim2] = carToCompare;
      setSpecificVehicleFilter({
        ...specificVehicleFilter,
        v1Image: trim1?.featuredImage,
        v1BrandName: { value: trim1?.brand?.name, label: trim1?.brand?.name },
        v1ModelName: { value: trim1?.model?.name, label: trim1?.model?.name },
        v1TrimName: { value: trim1?.name, label: trim1?.name },
        v1Year: { value: trim1?.year, label: trim1?.year },
        v2Image: trim2?.featuredImage,
        v2BrandName: { value: trim2?.brand?.name, label: trim2?.brand?.name },
        v2ModelName: { value: trim2?.model?.name, label: trim2?.model?.name },
        v2TrimName: { value: trim2?.name, label: trim2?.name },
        v2Year: { value: trim2?.year, label: trim2?.year },
      });
    }
  }, [carToCompare]);

  const [v1Car, setV1Car] = useState({
    v1BrandName: compareParams?.v1BrandName || "",
    v1ModelName: compareParams?.v1ModelName || "",
    v1TrimName: compareParams?.v1TrimName || "",
    v1Year: compareParams?.v1Year || "",
  });
  const [v2Car, setV2Car] = useState({
    v2BrandName: compareParams?.v2BrandName || "",
    v2ModelName: compareParams?.v2BrandName || "",
    v2TrimName: compareParams?.v2BrandName || "",
    v2Year: compareParams?.v2BrandName || "",
  });

  useEffect(() => {
    if (v1Car?.v1BrandName !== "") {
      setSpecificVehicleFilter((prevState) => ({
        ...prevState,
        v1BrandName: { value: v1Car?.v1BrandName, label: v1Car?.v1BrandName },
        v1ModelName: { value: v1Car?.v1ModelName, label: v1Car?.v1ModelName },
        v1TrimName: { value: v1Car?.v1TrimName, label: v1Car?.v1TrimName },
        v1Year: { value: v1Car?.v1Year, label: v1Car?.v1Year },
      }));
    }
    if (v2Car?.v2BrandName !== "") {
      setSpecificVehicleFilter((prevState) => ({
        ...prevState,
        v2BrandName: { value: v2Car?.v2BrandName, label: v2Car?.v2BrandName },
        v2ModelName: { value: v2Car?.v2ModelName, label: v2Car?.v2ModelName },
        v2TrimName: { value: v2Car?.v2TrimName, label: v2Car?.v2TrimName },
        v2Year: { value: v2Car?.v2Year, label: v2Car?.v2Year },
      }));
    }
  }, []);


  const types = [
    {
      type: {
        image: "v1Image",
        brandName: "v1BrandName",
        modelName: "v1ModelName",
        year: "v1Year",
        trimName: "v1TrimName",
        slug: "v1Slug",
      },
    },
    {
      type: {
        image: "v2Image",
        brandName: "v2BrandName",
        modelName: "v2ModelName",
        year: "v2Year",
        trimName: "v2TrimName",
        slug: "v2Slug",
      },
    },
  ];
  const [selectedArray, setSelectedArray] = useState([]);
  const handleSelectChangeOut = (selectedOption, selectIndex, selectedYear) => {

    const selectedOptionArray = selectedOption
    const updatedOption = {
      ...selectedOptionArray,
      year: selectedYear?.value
    };

    setSelectedArray((prevSelectedOptions) => {
      const isOptionSelected = prevSelectedOptions.some((option) => {
        return option?.value === selectedOption?.value && option?.year === selectedOption?.value;
      });

      if (isOptionSelected) {
        return prevSelectedOptions.filter(
          (option) => option?.value !== selectedOption?.value || option?.year !== selectedOption?.value
        );
      } else {
        const updatedOptions = [...prevSelectedOptions];
        updatedOptions[selectIndex] = {
          value: selectedOption?.value,
          year: selectedYear?.value,
        };
        return updatedOptions;
      }
    });
  };

  return (
    <Layout>
      <div className="container my-3">
        <div className="my-2">
          <Ad728x90 dataAdSlot="7840467895" />
        </div>
        <Breadcrumb />

        <div className="white_bg_wrapper">
          <h1 className="mb-3">Compare</h1>
          <div className="d-flex justify-content-center align-items-center">
            {types?.map((item, index) => (
              <MobileAddVehicleToFilter
                specificVehicleFilter={specificVehicleFilter}
                setSpecificVehicleFilter={setSpecificVehicleFilter}
                items={item}
                itemIndex={index}
                handleSelectChangeOut={handleSelectChangeOut}
                selectedArray={selectedArray}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-center my-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                const slugs = [
                  specificVehicleFilter?.v1Slug,
                  specificVehicleFilter?.v2Slug,
                  specificVehicleFilter?.v3Slug,
                  specificVehicleFilter?.v4Slug,
                ].filter((slug) => slug);

                if (slugs.length <= 1) {
                  toast.info("Please select at least two vehicles to compare");
                } else {
                  router.push(
                    `compare-cars/${slugs
                      .map((slug) => slug[0].value)
                      .join("-vs-")}`
                  );
                }
              }}
            >
              Compare
            </button>
          </div>
        </div>

        <Ad728x90 dataAdSlot="2863473388" />
        <section className="my-2">
          <div className="card_wrapper">
            <h2>Popular Comparisons</h2>
            <CompareToBuy compareList={compareList} />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {

  // Fetch data from external API
  let resTopSearched = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/top-searched"
  );
  let resFeatured = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/featured"
  );
  let resElectric = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/featured/electric"
  );
  // let resRecommended = await axios.get(
  //   process.env.NEXT_PUBLIC_API_URL + "model/recommended" 
  // );
  let resBrands = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "brands?pageSize=14&currentPage=1&orderBy=name&search=a"
  );

  let resNews = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "blog/" + "?pageSize=4&type=news"
  );
  let resReviews = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "blog/" + "?pageSize=4&type=review"
  );

  let resCompareList = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/compare-car/list"
  );
  // let resFilterMinMax = await axios.get(
  //   process.env.NEXT_PUBLIC_API_URL + "filter/get-min-max" 
  // );


  let topSearched = resTopSearched.data;
  let featured = resFeatured.data;
  let electric = resElectric.data;
  // let recommended = resRecommended.data;
  let brands = resBrands.data;

  let news = resNews.data;
  let reviews = resReviews.data;

  let compareList = resCompareList.data
  // Pass data to the page via props
  return {
    props: {
      topSearched,
      featured,
      // recommended,
      electric,
      brands,
      news,
      compareList,
      reviews
    },
  };
}
