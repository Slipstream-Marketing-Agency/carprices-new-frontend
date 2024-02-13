import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function OverlayLoader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="filter_overlay">
      <div className="overlay_loader">
        <ThreeCircles
          height="80"
          width="80"
          color="#77cdf2"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </div>
  );
}
