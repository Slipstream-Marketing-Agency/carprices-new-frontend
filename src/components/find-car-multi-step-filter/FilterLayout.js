import React, { useState } from "react";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
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

export default function FilterLayout() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';
  const [filterData, setFilterData] = useState({
    preferences: [],
    budget: [25000, 55000],
    seating: [],
  });


  const [specificVehicleFilter, setSpecificVehicleFilter] = useState({
    image: null,
    make: null,
    model: null,
    year: null,
  });

  const [error, setError] = useState("");

  const [currentStep, setCurrentStep] = useState(0);
  const [specific, setSpecific] = useState(false);

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
    isTwoSeat: filterData.seating.includes("2") ? 1 : 0,
    isTwoPlusTwo: filterData.seating.includes("2+2") ? 1 : 0,
    isFourToFive: filterData.seating.includes("4-5") ? 1 : 0,
    isFiveToSeven: filterData.seating.includes("5-7") ? 1 : 0,
    isSevenToNine: filterData.seating.includes("7-9") ? 1 : 0,
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
      query += filterOptions.isTwoSeat === 1 ? "&isTwoSeat=1" : "";
      query += filterOptions.isTwoPlusTwo === 1 ? "&isTwoPlusTwo=1" : "";
      query += filterOptions.isFourToFive === 1 ? "&isFourToFive=1" : "";
      query += filterOptions.isFiveToSeven === 1 ? "&isFiveToSeven=1" : "";
      query += filterOptions.isSevenToNine === 1 ? "&isSevenToNine=1" : "";

      // axios
      //   .get(
      //     process.env.NEXT_PUBLIC_API_URL + "filter/get-min-max" + "?" + query
      //   )
      //   .then((response) => {
      //     setFilterData((prevState) => ({
      //       ...prevState,
      //       budget: [
      //         response.data.min !== null ? response?.data?.min : null,
      //         response.data.max !== null ? response?.data?.max : null,
      //       ],
      //     }));

      //     // setMinMaxData(response.data);
      //     // setIsLoading(false);
      //   })
      //   .catch((error) => {
      //     console.error("Error", error);
      //     // setIsLoading(false);
      //     // setError(error);
      //   });
    };

    fetchData();
  }, [filterData.preferences, filterData.seating]);

  const steps = [
    {
      title: `${t.step} 1: ${t.preferences}`,
      component: (
        <StepOne filterData={filterData} setFilterData={setFilterData} />
      ),
    },
    {
      title: `${t.step} 2 : ${t.chooseSeating}`,
      component: (
        <StepThree filterData={filterData} setFilterData={setFilterData} />
      ),
    },
    {
      title: `${t.step} 3 : ${t.defineBudget} `,
      component: (
        <StepTwo filterData={filterData} setFilterData={setFilterData} />
      ),
    },
  ];

  const handleNextStep = () => {
    if (filterData.preferences.length === 0) {
      setError("Select atleast one preference");
    } else if (
      filterData.seating.length <= 0 &&
      filterData.preferences.length > 0 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
    ) {
      setError("no cars available for the selected preferences");
    } else if (
      filterData.seating.length > 0 &&
      filterData.preferences.length > 0 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
    ) {
      setError("no cars available for the selected seats");
    } else if (
      filterData.seating.length === 0 &&
      filterData.preferences.length > 0 &&
      currentStep === 1
    ) {
      setError("Select atleast one seating option");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    if (currentStep === 1) {
      setFilterData((prevState) => ({
        ...prevState,
        seating: [],
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
    query += filterOptions.isTwoSeat === 1 ? "&isTwoSeat=1" : "";
    query += filterOptions.isTwoPlusTwo === 1 ? "&isTwoPlusTwo=1" : "";
    query += filterOptions.isFourToFive === 1 ? "&isFourToFive=1" : "";
    query += filterOptions.isFiveToSeven === 1 ? "&isFiveToSeven=1" : "";
    query += filterOptions.isSevenToNine === 1 ? "&isSevenToNine=1" : "";

    const url =
      `/find-your-car?` +
      query +
      `&min=${filterData?.budget[0]}` +
      `&max=${filterData?.budget[1]}`;

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
              <h3 className="text-white">{t.newbuyersguide}</h3>
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
              <p>
                <b className="filterStepTxt">{steps[currentStep].title}</b>
              </p>
              {steps[currentStep].component}
              <div className="">
                <div className="">
                  {currentStep > 0 && (
                    <button
                      className="btn btn-outline-primary me-1"
                      onClick={handlePrevStep}
                    >
                      {t.previous}
                    </button>
                  )}

                  <button
                    className={
                      error
                        ? "btn btn-outline-primary ms-1 disabled"
                        : "btn btn-outline-primary ms-1"
                    }
                    onClick={currentStep === 2 ? handleSubmit : handleNextStep}
                  >
                    {currentStep === 2 ? `${t.submit}` : `${t.next}`}
                  </button>
                </div>
                <div className="find_specific ">
                  <p onClick={handleFilterSwitch}>{t.findcar}</p>
                </div>
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
