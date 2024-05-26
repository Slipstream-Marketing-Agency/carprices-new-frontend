import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";
import Price from "@/src/utils/Price";

export default function StepFour({ filterData, setFilterData }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const [minValue, setMinValue] = useState(filterData.budget[0]);
  const [maxValue, setMaxValue] = useState(filterData.budget[1]);
  const [initialValues, setInitialValues] = useState([
    filterData.budget[0],
    filterData.budget[1],
  ]);

  useEffect(() => {
    setInitialValues([filterData.budget[0], filterData.budget[1]]);
  }, []);

  const marks = [
    {
      value: minValue,
      label: (
        <strong>
          <Price data={minValue} />
        </strong>
      ),
    },
    {
      value: maxValue,
      label: (
        <strong>
          <Price data={maxValue} />
        </strong>
      ),
    },
  ];

  const handleSliderChange = (event, newValue) => {
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
    setFilterData((prevState) => ({
      ...prevState,
      budget: [newValue[0], newValue[1]],
    }));
  };

  const formatPrice = (price) => {
    return price <= 0
      ? "TBD"
      : "AED" +
          " " +
          price?.toLocaleString("en-AE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })+"*";
  };

  return (
    <div>
      <div className="tw-flex tw-justify-center tw-items-center tw-my-4">
        <div className="value_circle tw-mr-2 tw-border tw-rounded-lg tw-p-3">
          <p className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <span className="head tw-mb-1 tw-text-base tw-font-bold">
              Starting from
            </span>
            <span className="tw-mt-4 tw-text-lg tw-font-bold">
              <Price data={minValue} />
            </span>
          </p>
        </div>
        <div className="value_circle tw-ml-2 tw-border tw-rounded-lg tw-p-3">
          <p className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <span className="head tw-mb-1 tw-text-base tw-font-bold">
              Up to
            </span>
            <span className="tw-mt-4 tw-text-lg tw-font-bold">
              <Price data={maxValue} />
            </span>
          </p>
        </div>
      </div>

      <div className="tw-pt-10 tw-px-5 tw-pb-5">
        <Slider
          value={[minValue, maxValue]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          min={initialValues[0]}
          max={initialValues[1]}
          // marks={marks}
          step={1}
          sx={{
            "& .MuiSlider-track": {
              height: 20,
              backgroundColor: "var(--primary)",
            },
            "& .MuiSlider-rail": {
              height: 20,
            },
            "& .MuiSlider-thumb": {
              height: 25,
              width: 25,
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
        />
      </div>
      <div className="tw-mt-10 tw-font-bold">
        Use the slider to select your budget range
      </div>
    </div>
  );
}
