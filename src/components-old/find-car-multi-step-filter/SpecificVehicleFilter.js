
import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import FeaturedImage from "../featuredImage";
import useTranslate from "@/src/utils/useTranslate";


export default function SpecificVehicleFilter({
  specificVehicleFilter,
  setSpecificVehicleFilter,
  handleFilterSwitch,
  bodyTypes,
}) {

  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';
  const [brandsList, setBrandsList] = useState([]);

  const brandListOptions = brandsList.map((carBrand) => ({
    value: carBrand.id,
    label: carBrand.name,
  }));
  const [modelsList, setModelsList] = useState([]);

  const modelsListOptions = modelsList.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  const [yearList, setYearList] = useState([]);

  const yearListOptions = yearList.map((year) => ({
    value: year.year,
    label: year.year,
  }));

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);


  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "brands?isAll=1&&orderBy=name")
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

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `model/${specificVehicleFilter?.make?.label?.toLowerCase().replace(/\s+/g, '-')}/${specificVehicleFilter?.model?.label?.toLowerCase().replace(/\s+/g, '-')}/${specificVehicleFilter?.year?.value}`)
      .then((response) => {

        setSpecificVehicleFilter({
          ...specificVehicleFilter,
          image: response.data.model.mainTrim.featuredImage,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [specificVehicleFilter?.year?.value]);

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
        `model/by-brand/min/${specificVehicleFilter?.make?.value}?isAll=1`
      )
      .then((response) => {

        setModelsList(response.data.models);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [specificVehicleFilter?.make?.value]);

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
        `trim/get-years/${specificVehicleFilter?.model?.value}?isAll=1`
      )
      .then((response) => {

        setYearList(response.data.trimYears);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, [specificVehicleFilter?.model?.value]);

  const handleMakeChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedTrim(null);
    setSelectedModel(null);

    setSpecificVehicleFilter({
      ...specificVehicleFilter,
      make: selectedOption,
      model: null,
    });
  };

  
  const handleModelChange = (selectedOption) => {
    setSelectedYear(null);
    setSelectedModel(selectedOption)
    setSpecificVehicleFilter({
      ...specificVehicleFilter,
      model: selectedOption,
    });
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption)
    setSpecificVehicleFilter({
      ...specificVehicleFilter,
      year: selectedOption,
    });
  };

  const isFilterComplete =
    specificVehicleFilter.make !== null &&
    specificVehicleFilter.model !== null &&
    specificVehicleFilter.year !== null;

  return (
    <div className="search_filter_box">
      <div className="find_car_head text-center">
        <h1 className="text-white">{t.findcar}</h1>
      </div>

      <div className="inner">
        <div className="filter_car_image">
          <FeaturedImage width={100} height={100}
            src={specificVehicleFilter?.image}
            alt={""}
            title={""}
          />
        </div>
        <div className="px-4">
          <div className="mt-2">
            {/* <label>
              <b>Make</b>
            </label> */}
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={specificVehicleFilter.make}
              options={brandListOptions}
              onChange={handleMakeChange}
              placeholder="Select make"
            />
          </div>

          <div className="mt-2">
            {/* <label>
              <b>Model</b>
            </label> */}
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={selectedModel}
              options={_.sortBy(modelsListOptions, 'value')}
              onChange={handleModelChange}
              isDisabled={!specificVehicleFilter.make}
              placeholder="Select model"
            />
          </div>

          <div className="mt-2">
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              value={selectedYear}
              options={yearListOptions}
              onChange={handleYearChange}
              isDisabled={!specificVehicleFilter.model}
              placeholder="Select year"
            />
          </div>
        </div>

        <div className="d-flex flex-column pos_banner_btn">
          <div className="d-flex align-items-center justify-content-center ">
            <button
              className="btn btn-outline-primary me-1"
              onClick={handleFilterSwitch}
            >
              {t.back}
            </button>
            <button
              className="btn btn-outline-primary ms-1"
              onClick={() =>
                router.push(
                  `/brands/${specificVehicleFilter?.make?.label?.toLowerCase().replace(/\s+/g, '-')}/${specificVehicleFilter?.year?.label}/${specificVehicleFilter?.model?.label?.toLowerCase().replace(/\s+/g, '-')}`
                )
              }
              disabled={!isFilterComplete}
            >
              {t.findcar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  // Fetch data from external API
  let resAllModels = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
    "model/by-brand/min/1?pageSize=5&currentPage=2&orderBy=name&search=a&isAll=1"
  );

  let bodyTypes = resBodyTypes.data;

  // Pass data to the page via props
  return {
    props: {
      resAllModels,
    },
  };
}
