import React, { useState, useEffect } from "react";
import StepThree from "./StepThree";
import StepOne from "./StepOne";
import { useForm } from "react-hook-form";
import Select from "react-select";
import SpecificVehicleFilter from "./SpecificVehicleFilter";
import axios from "axios";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import StepFour from "./StepFour";
import StepTwo from "./StepTwo";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterLayout() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const [loading, setLoading] = useState(false); // Loading state
  const [filterData, setFilterData] = useState({
    preferences: [],
    budget: [25000, 55000],
    seating: [],
    bodyTypes: [],
  });

  const [bodyTypeList, setBodyTypeList] = useState([]);
  const [seatList, setSeatList] = useState([]);

  const [specificVehicleFilter, setSpecificVehicleFilter] = useState({
    image: null,
    make: null,
    model: null,
    year: null,
  });

  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [specific, setSpecific] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleErrorClose = () => {
    setOpenErrorDialog(false);
    setError("");
  };

  const bodyTypesParam =
    filterData.bodyTypes.length > 0
      ? `bodyTypes=${filterData.bodyTypes.join(",")}`
      : "";

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
    isOneSeat: filterData.seating.includes("1") ? 1 : 0,
    isTwoSeat: filterData.seating.includes("2") ? 1 : 0,
    isTwoPlusTwo: filterData.seating.includes("2+2") ? 1 : 0,
    isThreeSeat: filterData.seating.includes("3") ? 1 : 0,
    isFourSeat: filterData.seating.includes("4") ? 1 : 0,
    isFiveSeat: filterData.seating.includes("5") ? 1 : 0,
    isSixSeat: filterData.seating.includes("6") ? 1 : 0,
    isSevenSeat: filterData.seating.includes("7") ? 1 : 0,
    isEightSeat: filterData.seating.includes("8") ? 1 : 0,
    isNineSeat: filterData.seating.includes("9") ? 1 : 0,
    isNinePlusSeat: filterData.seating.includes("9+") ? 1 : 0,
  };

  const fetchData = async () => {
    setLoading(true); // Start loader
    try {
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
      query += filterOptions.isOneSeat === 1 ? "&isOneSeat=1" : "";
      query += filterOptions.isTwoSeat === 1 ? "&isTwoSeat=1" : "";
      query += filterOptions.isTwoPlusTwo === 1 ? "&isTwoPlusTwo=1" : "";
      query += filterOptions.isThreeSeat === 1 ? "&isThreeSeat=1" : "";
      query += filterOptions.isFourSeat === 1 ? "&isFourSeat=1" : "";
      query += filterOptions.isFiveSeat === 1 ? "&isFiveSeat=1" : "";
      query += filterOptions.isSixSeat === 1 ? "&isSixSeat=1" : "";
      query += filterOptions.isSevenSeat === 1 ? "&isSevenSeat=1" : "";
      query += filterOptions.isEightSeat === 1 ? "&isEightSeat=1" : "";
      query += filterOptions.isNineSeat === 1 ? "&isNineSeat=1" : "";
      query += filterOptions.isNinePlusSeat === 1 ? "&isNinePlusSeat=1" : "";

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
      queryWithoutSeating +=
        filterOptions.isManualTransmission === 1
          ? "&isManualTransmission=1"
          : "";
      const bodyTypesJSON = JSON.stringify(filterData.bodyTypes);
      const bodyTypesParam =
        filterData.bodyTypes.length > 0
          ? `bodyTypes=${encodeURIComponent(bodyTypesJSON)}`
          : "";

      const responsePrice = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}car-trims/priceRange?${query}&${bodyTypesParam}`
      );

      setFilterData((prevState) => ({
        ...prevState,
        budget: [
          responsePrice.data.price.min !== null
            ? responsePrice?.data?.price.min
            : null,
          responsePrice.data.price.max !== null
            ? responsePrice?.data?.price.max
            : null,
        ],
      }));

      const responseBodyType = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}car-trims/bodyList?${queryWithoutSeating}`
      );

      setBodyTypeList(responseBodyType?.data?.bodyTypes);

      const responseSeat = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}car-trims/getSeatList?${queryWithoutSeating}&${bodyTypesParam}`
      );

      setSeatList(responseSeat?.data?.seats);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleNextStep = async () => {
    setLoading(true); // Start loader on next step
    if (filterData.preferences.length === 0) {
      setError(
        "Looks like your selection is too narrow and no vehicle can truly tick those boxes. Please broaden your preferences."
      );
      setOpenErrorDialog(true);
      setLoading(false); // Stop loader if there's an error
    } else if (currentStep === 1 && filterData.bodyTypes.length === 0) {
      setError("Select at least one body type");
      setOpenErrorDialog(true);
      setLoading(false); // Stop loader if there's an error
    } else if (
      currentStep === 0 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
    ) {
      setError("No cars available for the selected preferences");
      setOpenErrorDialog(true);
      setLoading(false); // Stop loader if there's an error
    } else if (
      currentStep === 1 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
    ) {
      setError("No cars available for the selected body types");
      setOpenErrorDialog(true);
      setLoading(false); // Stop loader if there's an error
    } else if (
      currentStep === 2 &&
      filterData?.budget[0] === null &&
      filterData?.budget[1] === null
    ) {
      setError("No cars available for the selected seats");
      setOpenErrorDialog(true);
      setLoading(false); // Stop loader if there's an error
    } else if (currentStep === 2 && filterData.seating.length === 0) {
      setError("Select at least one seating option");
      setOpenErrorDialog(true);
      setLoading(false); // Stop loader if there's an error
    } else {
      await fetchData(); // Fetch data when moving to the next step
      setCurrentStep(currentStep + 1);
      setLoading(false); // Stop loader after step change
    }
  };

  const handlePrevStep = () => {
    setLoading(true); // Start loader
    setCurrentStep(currentStep - 1);

    if (currentStep === 2) {
      setFilterData((prevState) => ({
        ...prevState,
        seating: [],
      }));
    } else if (currentStep === 1) {
      setFilterData((prevState) => ({
        ...prevState,
        bodyTypes: [],
      }));
    }

    setLoading(false); // Stop loader after state reset
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loader on submit
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
    query += filterOptions.isOneSeat === 1 ? "&isOneSeat=1" : "";
    query += filterOptions.isTwoSeat === 1 ? "&isTwoSeat=1" : "";
    query += filterOptions.isTwoPlusTwo === 1 ? "&isTwoPlusTwo=1" : "";
    query += filterOptions.isThreeSeat === 1 ? "&isThreeSeat=1" : "";
    query += filterOptions.isFourSeat === 1 ? "&isFourSeat=1" : "";
    query += filterOptions.isFiveSeat === 1 ? "&isFiveSeat=1" : "";
    query += filterOptions.isSixSeat === 1 ? "&isSixSeat=1" : "";
    query += filterOptions.isSevenSeat === 1 ? "&isSevenSeat=1" : "";
    query += filterOptions.isEightSeat === 1 ? "&isEightSeat=1" : "";
    query += filterOptions.isNineSeat === 1 ? "&isNineSeat=1" : "";
    query += filterOptions.isNinePlusSeat === 1 ? "&isNinePlusSeat=1" : "";

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
  };

  const handleFilterSwitch = () => {
    setSpecific(!specific);
  };

  const steps = [
    {
      title: `Pick the top 3 things you need from your new car`,
      component: (
        <StepOne filterData={filterData} setFilterData={setFilterData} />
      ),
    },
    {
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
      title: `${t.defineBudget}`,
      component: (
        <StepFour filterData={filterData} setFilterData={setFilterData} />
      ),
    },
  ];

  return (
    <>
      <Dialog
        open={openErrorDialog}
        onClose={handleErrorClose}
        PaperProps={{
          style: {
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <DialogContent dividers>
          <DialogContentText>
            <div className="tw-text-center">
              <h2 className="tw-font-bold tw-text-red-400">
                Oops! We’ve blown a gasket…
              </h2>
              <p className="tw-font-semibold">{error}</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleErrorClose}
            variant="contained"
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {!specific ? (
        <>
          <div className="search_filter_box tw-text-center">
            <div>
              <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-items-start tw-px-5 tw-py-4 tw-text-2xl  tw-text-white tw-bg-gradient-to-r tw-from-blue-500 tw-to-blue-800 tw-h-[85px]">
                <img
                  loading="lazy"
                  src="/gradiend-lines.svg"
                  className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
                />
                <h3 className="text-white tw-relative tw-z-10 tw-text-start tw-font-bold tw-mb-0">
                  {steps[currentStep].title}
                </h3>
              </div>

              <div className="tw-row-span-1 md:tw-col-span-3 tw-col-span-12 tw-flex tw-flex-col tw-justify-center tw-rounded-2xl tw-border tw-border-neutral-100 tw-overflow-hidden">
                <div className="tw-flex tw-flex-col tw-px-6 tw-pt-6 tw-pb-3 tw-bg-white tw-border-t tw-border-neutral-100 tw-shadow-lg tw-relative">
                  {loading && (
                    <div className="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-75 tw-flex tw-justify-center tw-items-center tw-z-50">
                      <CircularProgress />
                    </div>
                  )}
                  <div className="tw-h-[350px] tw-relative">
                    {steps[currentStep].component}
                  </div>
                  <div className="tw-flex tw-justify-end tw-mt-12 gap-3">
                    {currentStep > 0 && (
                      <button
                        className="tw-px-6 md:tw-py-2.5 tw-py-1.5 tw-bg-blue-600 tw-text-white tw-text-base tw-font-bold tw-rounded-full hover:tw-bg-blue-700"
                        onClick={handlePrevStep}
                      >
                        {t.previous}
                      </button>
                    )}

                    <button
                      onClick={
                        currentStep === 3 ? handleSubmit : handleNextStep
                      }
                      className={`btn ${
                        error
                          ? "tw-px-6 md:tw-py-2.5 tw-py-1.5 tw-bg-blue-600 tw-text-white tw-text-base tw-font-bold tw-rounded-full hover:tw-bg-blue-700"
                          : "tw-px-6 md:tw-py-2.5 tw-py-1.5 tw-bg-blue-600 tw-text-white tw-text-base tw-font-bold tw-rounded-full hover:tw-bg-blue-700"
                      }`}
                    >
                      {currentStep === 3 ? `${t.submit}` : `${t.next}`}
                    </button>
                  </div>
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
