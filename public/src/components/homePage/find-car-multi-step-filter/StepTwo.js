import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function StepTwo({ filterData, setFilterData }) {
  const [minValue, setMinValue] = useState(filterData.budget[0]);
  const [maxValue, setMaxValue] = useState(filterData.budget[1]);
  const [initialValues, setInitialValues] = useState([filterData.budget[0], filterData.budget[1]]);
  
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
      label: <strong>{filterData.budget[0]}</strong>,
    },
    [maxValue]: {
      style: {
        color: "var(--primary)",
        marginLeft: "-25px",
        marginTop: "14px",
      },
      label: <strong>{filterData.budget[1]}</strong>,
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
          <h6 className="d-flex flex-column align-items-center justify-content-center ">
            <span className="head mb-1">From</span>
            <span className="mt-4">AED {minValue}</span>
          </h6>
        </div>
        <div className="value_circle ms-2">
          <h6 className="d-flex flex-column align-items-center justify-content-center">
            <span className="head mb-1">Upto</span>
            <span className="mt-4">AED {maxValue}</span>
          </h6>
        </div>
      </div>

      <div className="pt-3 px-3">
        <Slider
          range
          min={initialValues[0]}
          max={initialValues[1]}
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
    </div>
  );
}
