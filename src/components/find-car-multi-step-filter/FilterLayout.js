import React, { useState } from "react";
import StepThree from "./StepThree";
import StepOne from "./StepOne";
import { useForm } from "react-hook-form";
import Select from "react-select";
import SpecificVehicleFilter from "./SpecificVehicleFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import StepFour from "./StepFour";
import StepTwo from "./StepTwo";

export default function FilterLayout() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const [filterData, setFilterData] = useState({
    preferences: [],
    budget: [25000, 55000],
    seating: [],
    bodyTypes: [],
  });

  const [bodyTypeList, setBodyTypeList] = useState([]);
  const [seatList, setSeatList] = useState([]);

  console.log(filterData, "filterData");
  const [specificVehicleFilter, setSpecificVehicleFilter] = useState({
    image: null,
    make: null,
    model: null,
    year: null,
  });

  const [error, setError] = useState("");

  const [currentStep, setCurrentStep] = useState(0);
  const [specific, setSpecific] = useState(false);

  const bodyTypesParam =
    filterData.bodyTypes.length > 0
      ? `bodyTypes=${filterData.bodyTypes.join(",")}`
      : "";

  console.log(
    filterData?.budget[0] === filterData?.budget[1],
    " filterData?.budget[0] === filterData?.budget[1]"
  );

  const filterOptions = {
    haveMusic: filterData.preferences.includes("premium-sound") ? 1 : 0,
    isLuxury: filterData.preferences.includes("luxury") ? 1 : 0,
    isOffRoad: filterData.preferences.includes("Off-Road") ? 1 : 0,
    isPremiumLuxury: filterData.preferences.includes("premium-luxury") ? 1 : 0,
    haveTechnology: filterData.preferences.includes("safetech") ? 1 : 0,
    havePerformance: filterData.preferences.includes("performance") ? 1 : 0,
    isSpacious: filterData.preferences.includes("space") ? 1 : 0,
    isElectric: filterData.preferences.includes("electric") ? 1 : 0,
    isFuelEfficient: filterData.preferences.includes("fuel-efficiency") ? 1 : 0,
    isOffRoad: filterData.preferences.includes("off-road") ? 1 : 0,
    isAffordableLuxury: filterData.preferences.includes("affordable-luxury")
      ? 1
      : 0,
    isDuneBashing: filterData.preferences.includes("dune-bashing") ? 1 : 0,
    isManualTransmission: filterData.preferences.includes("manual-transmission")
      ? 1
      : 0,
    isSafety: filterData.preferences.includes("safety") ? 1 : 0,
    isTwoSeat: filterData.seating.includes("2") ? 1 : 0,
    isTwoPlusTwo: filterData.seating.includes("2+2") ? 1 : 0,
    isFourToFive: filterData.seating.includes("4-5") ? 1 : 0,
    isFiveToSeven: filterData.seating.includes("6-7") ? 1 : 0,
    isSevenToNine: filterData.seating.includes("8-9") ? 1 : 0,
  };

  useEffect(() => {
    const fetchData = () => {
      let query = `${filterOptions.haveMusic === 1 ? "haveMusic=1" : ""}`;
      query += filterOptions.isLuxury === 1 ? "&isLuxury=1" : "";
      query += filterOptions.isPremiumLuxury === 1 ? "&isPremiumLuxury=1" : "";
      query += filterOptions.haveTechnology === 1 ? "&haveTechnology=1" : "";
      query += filterOptions.havePerformance === 1 ? "&havePerformance=1" : "";
      query += filterOptions.isSpacious === 1 ? "&isSpacious=1" : "";
      query += filterOptions.isElectric === 1 ? "&isElectric=1" : "";
      query += filterOptions.isFuelEfficient === 1 ? "&isFuelEfficient=1" : "";
      query += filterOptions.isOffRoad === 1 ? "&isOffRoad=1" : "";
      query +=
        filterOptions.isAffordableLuxury === 1 ? "&isAffordableLuxury=1" : "";
      query +=
        filterOptions.isManualTransmission === 1
          ? "&isManualTransmission=1"
          : "";
      query += filterOptions.isDuneBashing === 1 ? "&isDuneBashing=1" : "";
      query += filterOptions.isSafety === 1 ? "&isSafety=1" : "";
      query += filterOptions.isTwoSeat === 1 ? "&isTwoSeat=1" : "";
      query += filterOptions.isTwoPlusTwo === 1 ? "&isTwoPlusTwo=1" : "";
      query += filterOptions.isFourToFive === 1 ? "&isFourToFive=1" : "";
      query += filterOptions.isFiveToSeven === 1 ? "&isFiveToSeven=1" : "";
      query += filterOptions.isSevenToNine === 1 ? "&isSevenToNine=1" : "";

      let queryWithoutSeating = `${
        filterOptions.haveMusic === 1 ? "haveMusic=1" : ""
      }`;
      queryWithoutSeating += filterOptions.isLuxury === 1 ? "&isLuxury=1" : "";
      queryWithoutSeating +=
        filterOptions.isPremiumLuxury === 1 ? "&isPremiumLuxury=1" : "";
      queryWithoutSeating +=
        filterOptions.haveTechnology === 1 ? "&haveTechnology=1" : "";
      queryWithoutSeating +=
        filterOptions.havePerformance === 1 ? "&havePerformance=1" : "";
      queryWithoutSeating +=
        filterOptions.isSpacious === 1 ? "&isSpacious=1" : "";
      queryWithoutSeating +=
        filterOptions.isElectric === 1 ? "&isElectric=1" : "";
      queryWithoutSeating +=
        filterOptions.isFuelEfficient === 1 ? "&isFuelEfficient=1" : "";
      queryWithoutSeating +=
        filterOptions.isOffRoad === 1 ? "&isOffRoad=1" : "";
      queryWithoutSeating +=
        filterOptions.isAffordableLuxury === 1 ? "&isAffordableLuxury=1" : "";
      queryWithoutSeating +=
        filterOptions.isDuneBashing === 1 ? "&isDuneBashing=1" : "";
      queryWithoutSeating += filterOptions.isSafety === 1 ? "&isSafety=1" : "";
      queryWithoutSeating += filterOptions.isManualTransmission === 1 ? "&isManualTransmission=1" : "";
      const bodyTypesJSON = JSON.stringify(filterData.bodyTypes);
      const bodyTypesParam =
        filterData.bodyTypes.length > 0
          ? `bodyTypes=${encodeURIComponent(bodyTypesJSON)}`
          : "";

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}car-trims/priceRange?${query}&${bodyTypesParam}`
        )
        .then((response) => {
          setFilterData((prevState) => ({
            ...prevState,
            budget: [
              response.data.price.min !== null
                ? response?.data?.price.min
                : null,
              response.data.price.max !== null
                ? response?.data?.price.max
                : null,
            ],
          }));

          // setMinMaxData(response.data);
          // setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error", error);
          // setIsLoading(false);
          // setError(error);
        });

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/bodyList?${queryWithoutSeating}`)
        .then((response) => {
          console.log(response, "bodyfilter");
          setBodyTypeList(response?.data?.bodyTypes);

          // setMinMaxData(response.data);
          // setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error", error);
          // setIsLoading(false);
          // setError(error);
        });

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}car-trims/getSeatList?${queryWithoutSeating}&${bodyTypesParam}`
        )
        .then((response) => {
          console.log(response, "bodyfilter");
          setSeatList(response?.data?.seats);

          // setMinMaxData(response.data);
          // setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error", error);
          // setIsLoading(false);
          // setError(error);
        });
    };

    fetchData();
  }, [filterData.preferences, filterData.seating, , filterData.bodyTypes]);

  const steps = [
    {
      // title: `${t.step} 1: ${t.preferences}`,
      title: `Top 3 things you need from a car`,
      component: (
        <StepOne filterData={filterData} setFilterData={setFilterData} />
      ),
    },
    {
      // title: `${t.step} 3 : ${t.defineBudget} `,
      title: `Choose your preferred body type`,
      component: (
        <StepTwo
          filterData={filterData}
          setFilterData={setFilterData}
          bodyTypeList={bodyTypeList}
        />
      ),
    },
    {
      // title: `${t.step} 2 : ${t.chooseSeating}`,
      title: `How many seats do you need?`,
      component: (
        <StepThree
          filterData={filterData}
          setFilterData={setFilterData}
          seatList={seatList}
        />
      ),
    },
    {
      // title: `${t.step} 2 : ${t.chooseSeating}`,
      title: `${t.defineBudget}`,
      component: (
        <StepFour filterData={filterData} setFilterData={setFilterData} />
      ),
    },
  ];

  console.log(currentStep, "currentStep");

  const handleNextStep = () => {
    if (filterData.preferences.length === 0) {
      setError("Select atleast one preference");
    } else if (currentStep === 1 && filterData.bodyTypes.length === 0) {
      setError("Select atleast one body type");
    } else if (
      currentStep === 0 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
      //  ||
      // filterData?.budget[0] === filterData?.budget[1]
    ) {
      setError("No cars available for the selected preferences");
    } else if (
      currentStep === 1 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
      // ||
      // filterData?.budget[0] === filterData?.budget[1]
    ) {
      setError("No cars available for the selected body types");
    } else if (
      currentStep === 2 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
      // ||
      // filterData?.budget[0] === filterData?.budget[1]
    ) {
      setError("No cars available for the selected seats");
    } else if (currentStep === 2 && filterData.seating.length === 0) {
      setError("Select atleast one seating option");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    if (currentStep === 2) {
      setFilterData((prevState) => ({
        ...prevState,
        seating: [],
      }));
    }
    if (currentStep === 1) {
      setFilterData((prevState) => ({
        ...prevState,
        seating: [],
        bodyTypes: [],
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if ( filterData.seating.length > 0) {
    let query = `${filterOptions.haveMusic == 1 ? "haveMusic=1" : ""}`;
    query += filterOptions.isLuxury ? "&isLuxury=1" : "";
    query += filterOptions.isPremiumLuxury ? "&isPremiumLuxury=1" : "";
    query += filterOptions.haveTechnology ? "&haveTechnology=1" : "";
    query += filterOptions.havePerformance ? "&havePerformance=1" : "";
    query += filterOptions.isSpacious ? "&isSpacious=1" : "";
    query += filterOptions.isElectric ? "&isElectric=1" : "";
    query += filterOptions.isFuelEfficient ? "&isFuelEfficient=1" : "";
    query += filterOptions.isOffRoad ? "&isOffRoad=1" : "";
    query +=
      filterOptions.isAffordableLuxury === 1 ? "&isAffordableLuxury=1" : "";
    query += filterOptions.isDuneBashing === 1 ? "&isDuneBashing=1" : "";
    query +=
      filterOptions.isManualTransmission === 1 ? "&isManualTransmission=1" : "";
    query += filterOptions.isSafety === 1 ? "&isSafety=1" : "";
    query += filterOptions.isTwoSeat === 1 ? "&isTwoSeat=1" : "";
    query += filterOptions.isTwoPlusTwo === 1 ? "&isTwoPlusTwo=1" : "";
    query += filterOptions.isFourToFive === 1 ? "&isFourToFive=1" : "";
    query += filterOptions.isFiveToSeven === 1 ? "&isFiveToSeven=1" : "";
    query += filterOptions.isSevenToNine === 1 ? "&isSevenToNine=1" : "";

    const bodyTypesQuery =
      filterData.bodyTypes.length > 0
        ? `&bodytype=${filterData.bodyTypes.join(",")}`
        : "";

    const url =
      `/find-your-car?` +
      query +
      `&price=${filterData?.budget[0]}-${filterData?.budget[1]}` +
      bodyTypesQuery;

    router.push(url);
    // } else {
    // setError("Select atleast one seating");
    // if (
    //   filterData.preferences.length === 0 &&
    //   filterData.seating.length === 0
    // ) {
    // toast.error("Select atleast one seating");
    // }
    // }
  };

  const handleFilterSwitch = () => {
    setSpecific(!specific);
  };

  return (
    <>
      {!specific ? (
        <>
          <div className="search_filter_box text-center">
            <div className="find_car_head ">
              {/* <h3 className="text-white mb-0">{t.newbuyersguide}</h3> */}
              <h3 className="text-white mb-0">Interactive Car Buying Assistant</h3>
            </div>

            <div className="inner">
              {error && (
                <>
                  <div className="banner_filter_overlay"></div>
                  <small className="error_message fw-bold">
                    {error}{" "}
                    <div
                      className="close_button pointer"
                      onClick={() => setError(false)}
                    >
                      <i className="bi bi-x-circle-fill"></i>
                    </div>
                  </small>
                </>
              )}
              <h4>
                <span className="filterStepTxt">{steps[currentStep].title}</span>
              </h4>
              {steps[currentStep].component}
              <div className="filter-button">
                <div className="d-flex justify-content-center">
                  {currentStep > 0 && (
                    <button className="btn me-1" onClick={handlePrevStep}>
                      {t.previous}
                    </button>
                  )}

                  <button
                    className={error ? "btn  disabled" : "btn "}
                    onClick={currentStep === 3 ? handleSubmit : handleNextStep}
                  >
                    {currentStep === 3 ? `${t.submit}` : `${t.next}`}
                  </button>
                </div>
                {/* <div className="find_specific ">
                  <p onClick={handleFilterSwitch}>{t.findcar}</p>
                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <SpecificVehicleFilter
            specificVehicleFilter={specificVehicleFilter}
            setSpecificVehicleFilter={setSpecificVehicleFilter}
            handleSubmit={handleSubmit}
            handleFilterSwitch={handleFilterSwitch}
          />
        </>
      )}
    </>
  );
}
