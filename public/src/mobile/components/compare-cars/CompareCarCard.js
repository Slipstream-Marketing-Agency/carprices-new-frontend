import React from "react";

export default function CompareCarCard() {
  return (
    <div className="inner">
      <div className="filter_car_image">
        <img
          title="Toyota"
          alt="Toyota-LandCruiser"
          src="/assets/images/cars/CarPrices-2021-Toyota-LandCruiser-25.jpg"
        />
      </div>
      <div className="px-4">
        <div className="mt-2">
          <label>
            <b>Make</b>
          </label>
          <Select
            id="long-value-select"
            instanceId="long-value-select"
            value={specificVehicleFilter.make}
            options={carOptions.makes}
            onChange={handleMakeChange}
            placeholder="Select make"
          />
        </div>

        <div className="mt-2">
          <label>
            <b>Model</b>
          </label>
          <Select
            id="long-value-select"
            instanceId="long-value-select"
            value={specificVehicleFilter.model}
            options={modelOptions}
            onChange={handleModelChange}
            isDisabled={!specificVehicleFilter.make}
            placeholder="Select model"
          />
        </div>

        <div className="mt-2">
          <label>
            <b>Year</b>
          </label>
          <Select
            id="long-value-select"
            instanceId="long-value-select"
            value={specificVehicleFilter.year}
            options={carOptions.years}
            onChange={handleYearChange}
            isDisabled={!specificVehicleFilter.model}
            placeholder="Select year"
          />
        </div>
      </div>
    </div>
  );
}
