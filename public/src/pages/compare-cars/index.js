import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";
import FeaturedImage from "@/components/common/FeaturedImage";
import VehicleFilters from "@/components/homePage/compare-to-buy/VehicleFilters";
import AddVehicleToFilter from "@/components/homePage/compare-to-buy/AddVehicleToFilter";
import { toast } from "react-toastify";
import CompareToBuy from "@/components/homePage/compare-to-buy/CompareToBuy";
import Ad728x90 from "@/components/ads/Ad728x90";
import Breadcrumb from "@/components/common/BreadCrumb";
import { useMediaQuery } from "react-responsive";
import MobileCompareCars from "@/mobile/pages/compare-cars";

export default function CompareCars(props) {
  console?.log(props, "proooops");
  const compareList = props.compareList
  const carToCompare = props?.carToCompare?.trims;
  // const models = props?.models.models
  // console?.log(carToCompare, "carToCompare");
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
    v3Slug: null,
    v3BrandName: null,
    v3ModelName: null,
    v3TrimName: null,
    v3Year: null,
    v4Slug: null,
    v4BrandName: null,
    v4ModelName: null,
    v4TrimName: null,
    v4Year: null,
  });



  console?.log(specificVehicleFilter, "dfgdfgdfgdfg");
  useEffect(() => {
    if (carToCompare?.length >= 1) {
      const [trim1, trim2, trim3, trim4] = carToCompare;
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
        v3BrandName: { value: trim3?.brand?.name, label: trim3?.brand?.name },
        v3ModelName: { value: trim3?.model?.name, label: trim3?.model?.name },
        v3TrimName: { value: trim3?.name, label: trim3?.name },
        v3Year: { value: trim3?.year, label: trim3?.year },
        v4BrandName: { value: trim4?.brand?.name, label: trim4?.brand?.name },
        v4ModelName: { value: trim4?.model?.name, label: trim4?.model?.name },
        v4TrimName: { value: trim4?.name, label: trim4?.name },
        v4Year: { value: trim4?.year, label: trim4?.year },
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
  const [v3Car, setV3Car] = useState({
    v3BrandName: compareParams?.v3BrandName || "",
    v3ModelName: compareParams?.v3BrandName || "",
    v3TrimName: compareParams?.v3BrandName || "",
    v3Year: compareParams?.v3BrandName || "",
  });
  const [v4Car, setV4Car] = useState({
    v4BrandName: compareParams?.v4BrandName || "",
    v4ModelName: compareParams?.v4BrandName || "",
    v4TrimName: compareParams?.v4BrandName || "",
    v4Year: compareParams?.v4BrandName || "",
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
    if (v3Car?.v3BrandName !== "") {
      setSpecificVehicleFilter((prevState) => ({
        ...prevState,
        v3BrandName: { value: v3Car?.v3BrandName, label: v3Car?.v3BrandName },
        v3ModelName: { value: v3Car?.v3ModelName, label: v3Car?.v3ModelName },
        v3TrimName: { value: v3Car?.v3TrimName, label: v3Car?.v3TrimName },
        v3Year: { value: v3Car?.v3Year, label: v3Car?.v3Year },
      }));
    }
    if (v4Car?.v4BrandName !== "") {
      setSpecificVehicleFilter((prevState) => ({
        ...prevState,
        v4BrandName: { value: v4Car?.v4BrandName, label: v4Car?.v4BrandName },
        v4ModelName: { value: v4Car?.v4ModelName, label: v4Car?.v4ModelName },
        v4TrimName: { value: v4Car?.v4TrimName, label: v4Car?.v4TrimName },
        v4Year: { value: v4Car?.v4Year, label: v4Car?.v4Year },
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
    {
      type: {
        image: "v3Image",
        brandName: "v3BrandName",
        modelName: "v3ModelName",
        year: "v3Year",
        trimName: "v3TrimName",
        slug: "v3Slug",
      },
    },
    {
      type: {
        image: "v4Image",
        brandName: "v4BrandName",
        modelName: "v4ModelName",
        year: "v4Year",
        trimName: "v4TrimName",
        slug: "v4Slug",
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
        // If the option is already selected, remove it from the array
        return prevSelectedOptions.filter(
          (option) => option?.value !== selectedOption?.value || option?.year !== selectedOption?.value
        );
      } else {
        // If the option is not selected, add it to the array
        const updatedOptions = [...prevSelectedOptions];
        updatedOptions[selectIndex] = {
          value: selectedOption?.value,
          year: selectedYear?.value,
        };
        return updatedOptions;
      }
    });
  };

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  if (isMobile) {
    // 
    return (
      <>
        <MobileCompareCars {...props} />
      </>
    )
  }


  return (
    <Layout pageMeta={{
      title: "Compare Cars: Side-by-Side Comparison of Features, Specs, and Prices - Carprices.ae",
      description: "Find your perfect car match. Compare side by side, explore detailed specs, features, and pricing options. Make informed decisions with our easy car comparison tool.",
      type: "Car Review Website",
    }}>
      <div className="container my-3">
        <div className="my-2">
          <Ad728x90 dataAdSlot="7840467895" />
        </div>
        <Breadcrumb />
        <div className="white_bg_wrapper mb-2">
          <h1 className="mb-3">Compare</h1>
          <div className="d-flex justify-content-center align-items-center mx-5">
            {types?.map((item, index) => (
              <AddVehicleToFilter
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
