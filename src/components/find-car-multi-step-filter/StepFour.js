import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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

  const marks = {
    [minValue]: {
      style: {
        color: "var(--primary)",
        marginLeft: "20px",
        marginTop: "14px",
      },
      label: (
        <strong>
          <Price data={filterData.budget[0]} />
        </strong>
      ),
    },
    [maxValue]: {
      style: {
        color: "var(--primary)",
        marginLeft: "-25px",
        marginTop: "14px",
        width: "100px",
      },
      label: (
        <strong>
          <Price data={filterData.budget[1]} />
        </strong>
      ),
    },
  };

  const handleStyle = {
    height: "25px",
    width: "25px",
    marginTop: "-2px",
    opacity: "1",
  };

  const trackStyle = {
    height: "20px",
    marginLeft: "0px",
    backgroundColor: "var(--primary)",
  };
  const railStyle = { height: "20px" };
  const dotStyle = { display: "none" };

  function handleSliderChange(value) {
    setMinValue(value[0]);
    setMaxValue(value[1]);
    setFilterData((prevState) => ({
      ...prevState,
      budget: [value[0], value[1]],
    }));
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="value_circle me-2">
          <p className="d-flex flex-column align-items-center justify-content-center ">
            <span className="head mb-1 fs-6 fw-bold">Starting from</span>
            <span className="mt-4 fs-5 fw-bold">
              <Price data={minValue} />
            </span>
          </p>
        </div>
        <div className="value_circle ms-2">
          <p className="d-flex flex-column align-items-center justify-content-center">
            <span className="head mb-1 fs-6 fw-bold">Up to</span>
            <span className="mt-4  fs-5 fw-bold">
              <Price data={maxValue} />
            </span>
          </p>
        </div>
      </div>

      <div className="pt-2 px-5 b-5">
        <Slider
          range
          min={initialValues[0]}
          max={initialValues[1]}
          marks={marks}
          step={1}
          onChange={handleSliderChange}
          defaultValue={filterData.budget}
          trackStyle={[trackStyle]}
          railStyle={railStyle}
          handleStyle={[handleStyle, handleStyle]}
          dotStyle={dotStyle}
          allowCross={false}
        />
      </div>
      <div className="filter-price-note">Slide to select your budget range</div>
    </div>
  );
}
