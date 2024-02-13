import React, { useRef, useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";
import FeaturedImage from "@/components/common/FeaturedImage";
import VehicleFilters from "@/components/homePage/compare-to-buy/VehicleFilters";
import Ad728x90 from "@/components/ads/Ad728x90";
import ComparisonTable from "@/components/homePage/compare-to-buy/ComparisonTable";
import Price from "@/components/common/Price";
import { toast } from "react-toastify";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

export default function MobileCompareCarResult(props) {
 
  const router = useRouter();
  const currentSlug = router?.query;
  // const carToCompare = props?.carToCompare?.trims;
  const carToCompare = [...props?.carToCompare?.trims].sort((a, b) => {
    const slugItems = currentSlug?.slug?.split('-vs-');

    return slugItems.indexOf(a.mainSlug.toString()) - slugItems.indexOf(b.mainSlug.toString());
  });
  console?.log(carToCompare, "carToCompare");

  

  const [specificVehicleFilter, setSpecificVehicleFilter] = useState({
    v1Image: null,
    v1BrandName: null,
    v1ModelName: null,
    v1TrimName: null,
    v1Slug: null,
  });


  const [newVehicle, setNewVehicle] = useState({
    newImage: null,
    newBrandName: null,
    newModelName: null,
    newTrimName: null,
    newYear: null,
  });

  const [brandsList, setBrandsList] = useState([]);
  const brandName = brandsList.map((carBrand) => ({
    value: carBrand.id,
    label: carBrand.name,
  }));
  const [modelsList, setModelsList] = useState([]);
  const modelName = modelsList?.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  const [trimList, setTrimList] = useState([]);
  const trimName = trimList?.map((trim) => ({
    value: trim.slug,
    label: trim.name,
  }));

  const [yearList, setYearList] = useState([]);
  
  const year = yearList?.map((year) => ({
    value: year.year,
    label: year.year,
  }));

  const [imageList, setImageList] = useState([]);

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [modelId, setModelId] = useState();


  console?.log(selectedYear, "proooops");

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "brands?orderBy=name&isAll=1")
      .then((response) => {
        // 
        setBrandsList(response.data.carBrands);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, []);

  const handleSelectChange = (selectedOption, type, typeName, slug) => {
    // const newStateKey = slug ? slug : type;
    const foundItem = trimList.find(
      (item) => item.slug === selectedOption.value
    );
    
    

    if (slug !== "" && slug !== undefined) {
      setSpecificVehicleFilter({
        ...specificVehicleFilter,
        [slug]: [{ label: foundItem?.mainSlug, value: foundItem?.mainSlug }],
      });
    } else {
      setSpecificVehicleFilter({
        ...specificVehicleFilter,
        [type]: selectedOption,
      });
    }


    
    if (typeName === "brand") {
      setModelsList([]);
      setTrimList([]);
      setYearList([]);
      setSelectedYear(null);
      setSelectedTrim(null);
      setSelectedModel(null);

      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
          `model/by-brand/min/${selectedOption?.value}?orderBy=name&isAll=1`
        )
        .then((response) => {
          
          setModelsList((prevModelsList) => [
            ...prevModelsList,
            ...response?.data?.models,
          ]);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }

    if (typeName === "model") {
      // setYearList([]);
      // setTrimList([]);
      // setSelectedYear(null);
      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
          `trim/get-years/${selectedOption?.value}`
        )
        .then((response) => {
          setModelId(selectedOption?.value);
          setSelectedModel(selectedOption);
          setYearList(response.data.trimYears);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }

    if (typeName === "year") {
      setTrimList([]);
      setSelectedTrim(null);
      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
          `trim/by-model/min/${modelId && modelId}/${selectedOption?.value}`
        )
        .then((response) => {
          
          setTrimList(response.data.trims);
          setSelectedYear(selectedOption);
        })
        .catch((error) => {
          console.error("Error", error);
          // setIsLoading(false);
          // setError(error);
        });
    }

    if (typeName === "trim") {
      setImageList([]);
      setSlugList([]);
      setSelectedTrim(selectedOption);

      const foundItem = trimList.find(
        (item) => item.slug === selectedOption.value
      );
      setImageList((prevImageList) => [
        ...prevImageList,
        foundItem?.featuredImage,
      ]);
    }
  };


  const [slugList, setSlugList] = useState([]);
  const [newSlugArray, setNewSlugArray] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: 0,
      margin: 0,
      minHeight: 0,
      height: 30,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: "0px 10px",
      borderRadius: "5px",
      marginTop: "-8px",
    }),
  };

  const [visible, setVisible] = useState(false);
  // const toast = useRef(null);
  const buttonEl = useRef(null);

  const accept = () => {
    const newSlug = specificVehicleFilter?.v1Slug[0]?.value;
    setModelsList([])
    setYearList([])
    setTrimList([])
    setSelectedModel(null)
    setSelectedTrim(null)
    setSelectedYear(null)

    // check if the new slug is already existing in the current slug
    if (currentSlug?.slug.includes(newSlug)) {
      toast.info(`Already Added`);
    } else {
      router.push(`/compare-cars/${currentSlug?.slug}-vs-${newSlug}`);
      setVisible(false)
      setSpecificVehicleFilter({v1Slug:null})
    }
  };


  return (
    <Layout>
      <div className="container my-3">
      <Ad728x90 dataAdSlot="5298065038" />
        <div className="bg-white d-flex justify-content-center align-items-center my-2 sticky_filter_scroll">
          <table class="table borderless mb-0">
            <thead>
              <tr>
                {carToCompare?.map((item, index) => (
                  <th className="col-sm-2 col-6">
                    <VehicleFilters
                      specificVehicleFilter={item}
                      currentSlug={currentSlug}
                      router={router}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          {carToCompare.length < 2 ? (
            <div
              ref={buttonEl}
              onClick={() => setVisible(true)}
              className="d-flex flex-column align-items-center text-center white_bg_wrapper me-2 w-sm-10 w-25 pointer"
            >
              <i className="bi bi-plus-square-fill fs-1" />
              <small className="">
                <b>Add Car</b>
              </small>
            </div>
          ) : (
            ""
          )}
          <>
            {/* <Toast ref={toast} /> */}
            <ConfirmPopup
              target={buttonEl.current}
              visible={visible}
              onHide={() => setVisible(false)}
              message={
                carToCompare.length < 2 ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="inner">
                      <div className="filter_car_image">
                        {/* <FeaturedImage width={100} height={100} src={""} alt={""} title={""} /> */}
                      </div>
                      <div className="px-2">
                        <div className="mt-1">
                          <Select
                            id="long-value-select"
                            instanceId="long-value-select"
                            //   value={brandName}
                            options={brandName}
                            onChange={(selectedOption) => {
                              setModelsList([]);
                              setTrimList([]);
                              setSelectedYear([]);
                              handleSelectChange(
                                selectedOption,
                                "v1BrandName",
                                "brand"
                              );
                              setImageList([]);
                              setTrimList([]);
                              setSelectedYear([]);
                            }}
                            placeholder="Select make"
                            styles={customStyles}
                          />
                        </div>

                        <div className="mt-1">
                          <Select
                            id="long-value-select"
                            instanceId="long-value-select"
                            value={modelsList?.length === 0 ? null : selectedModel}
                            options={modelName}
                            onChange={(selectedOption) =>{
                              handleSelectChange(
                                selectedOption,
                                "v1ModelName",
                                "model"
                              )
                            }}
                            isDisabled={modelsList?.length === 0}
                            placeholder="Select model"
                            styles={customStyles}
                          />
                        </div>

                        <div className="mt-1">
                          <Select
                            id="long-value-select"
                            instanceId="long-value-select"
                            value={yearList?.length === 0 ? 2023 : selectedYear}
                            options={year}
                            onChange={(selectedOption) =>
                              handleSelectChange(selectedOption, "v1Year", "year")
                            }
                            isDisabled={yearList?.length === 0}
                            placeholder="Select year"
                            styles={customStyles}
                          />
                        </div>

                        <div className="mt-1">
                          <Select
                            id="long-value-select"
                            instanceId="long-value-select"
                            value={trimList?.length === 0 ? null : selectedTrim}
                            options={trimName}
                            onChange={(selectedOption) =>
                              handleSelectChange(
                                selectedOption,
                                "v1Trim",
                                "trim",
                                "v1Slug"
                              )
                            }
                            isDisabled={trimList?.length === 0}
                            placeholder="Select trim"
                            styles={customStyles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              }
              footer={
                <div className="d-flex justify-content-center py-2" >
                  <button className="btn btn-primary" label="Yes" icon="pi pi-check" onClick={accept} disabled={specificVehicleFilter?.v1Slug === null ? true : false} >Add</button>
                </div>
              }
              icon="pi pi-exclamation-triangle"
            />
          </>
        </div>
        <Ad728x90 dataAdSlot="5449236138"/>
        <ComparisonTable carToCompare={carToCompare} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const slug = params?.slug;
  let resCarToCompare = await axios?.get(
    process?.env?.NEXT_PUBLIC_API_URL + "trim/compare/" + slug
  );
  let carToCompare = resCarToCompare?.data;
  console?.log(carToCompare, "carTocompare");
  return {
    props: {
      carToCompare,
    },
  };
}
