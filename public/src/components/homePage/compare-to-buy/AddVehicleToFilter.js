import FeaturedImage from "@/components/common/FeaturedImage";
import axios from "axios";
import _ from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { toast } from "react-toastify";

export default function AddVehicleToFilter({
  specificVehicleFilter,
  setSpecificVehicleFilter,
  items,
  itemIndex,
  handleSelectChangeOut,
  selectedArray
}) {
  

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
  const [modelId, setModelId] = useState();
  

  const [yearList, setYearList] = useState([]);

  
  const yearName = yearList?.map((year) => ({
    value: year.year,
    label: year.year,
  }));

  

  const [trimList, setTrimList] = useState([]);
  const trimName = trimList?.map((trim) => ({
    value: trim.slug,
    label: trim.name,
  }));

  const [imageList, setImageList] = useState([]);
  const [slugList, setSlugList] = useState([]);
  const [newSlugArray, setNewSlugArray] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);

  
  const year = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
  ];


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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "var(--light)" : "var(--primary)",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "var(--light)" : "var(--primary)",
      },
    }),
  };
  
  const [specificArray, setSpecificArray] = useState([]);

  

  

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
          
          setModelsList(response?.data?.models);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }

    if (typeName === "model") {
      setYearList([]);
      setTrimList([]);
      setSelectedYear(null);
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

  const concatenatedSlugs = slugList.join("-vs-");
  
  return (
    <div className="w-25 white_bg_wrapper me-2">
      <div className="inner">
        <div className="filter_car_image">
          {imageList.length === 0 ? (
            <>
              <FeaturedImage width={100} height={100} src={null} alt={""} title={""} />
            </>
          ) : (
            <>
              {imageList?.map((img, index) => {
                return (
                  <FeaturedImage width={100} height={100}
                    src={(img && img) || null}
                    alt={""}
                    title={""}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="px-2">
          <div>
            <small>
              <b>Make</b>
            </small>
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
                  items.type.brandName,
                  "brand"
                );
                setImageList([]);
                setTrimList([]);
                setSelectedYear([]);
                handleSelectChangeOut({ value: "", label: "" }, itemIndex)

              }}
              placeholder="Select make"
              styles={customStyles}
            />
          </div>

          <div>
            <small>
              <b>Model</b>
            </small>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={modelsList?.length === 0 ? null : selectedModel}
              options={_.sortBy(modelName, 'label')}
              onChange={(selectedOption) => {

                handleSelectChange(
                  selectedOption,
                  items.type.modelName,
                  "model"
                );
              }}
              isDisabled={modelsList?.length === 0}
              placeholder="Select model"
              styles={customStyles}
            />
          </div>
          <div>
            <small>
              <b>Year</b>
            </small>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={yearList?.length === 0 ? 2023 : selectedYear}
              options={yearName}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, items.type.year, "year")
              }
              isDisabled={yearList?.length === 0}
              placeholder="Select year"
              styles={customStyles}
            />
          </div>

          <div>
            <small>
              <b>Trim</b>
            </small>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={trimList?.length === 0 ? null : selectedTrim}
              options={_.sortBy(trimName, 'label')}
              onChange={(selectedOption) => {
                const selectedOptionArray = selectedOption
                const updatedOption = {
                  ...selectedOptionArray,
                  year: selectedYear?.value
                };

                
                const isOptionSelected = selectedArray.some(option => {
                  return  option.value === selectedOption.value && option.year === selectedYear.value;
                });
                
                if (isOptionSelected) {
                  toast.info("Already Selected")
                }
                else {
                  handleSelectChangeOut(selectedOption, itemIndex, selectedYear)

                  handleSelectChange(
                    selectedOption,
                    items.type.trimName,
                    "trim",
                    items.type.slug
                  );
                }
              }
              }
              isDisabled={trimList?.length === 0}
              placeholder="Select trim"
              styles={customStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
