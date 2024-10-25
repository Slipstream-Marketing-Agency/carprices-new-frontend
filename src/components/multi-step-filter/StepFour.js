import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/navigation";
import useTranslate from "@/utils/UseTranslate";
import Price from "@/utils/Price";

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
      }) +
      "*";
  };

  return (
    <div>
      <div className="  my-4 w-full">
        <div className=" mr-2 border rounded-lg p-3">
          <p className="flex flex-col ">
            <span className=" text-left text-sm font-semibold text-blue-600">
              Starting from
            </span>
            <span className="text-left mt-2 text-lg font-semibold ">
              AED {" "}
              {minValue?.toLocaleString("en-AE", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
              *
            </span>
          </p>
        </div>
        <div className="border rounded-lg p-3 mt-4">
          <p className="flex flex-col ">
            <span className="text-left text-sm font-semibold text-blue-600">
              Up to
            </span>
            <span className="text-left mt-2 text-lg font-semibold">
              AED{" "}
              {maxValue?.toLocaleString("en-AE", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
              *
            </span>
          </p>
        </div>
      </div>

      <div className="pt-10 px-5 pb-5">
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
      <div className="mt-10 font-semibold">
        Use the slider to select your budget range
      </div>
    </div>
  );
}
