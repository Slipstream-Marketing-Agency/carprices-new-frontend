import React, { useState } from "react";
import Price from "@/utils/Price";
import { formatNumberWithCommas } from "@/utils/formatNumber";

export default function VehicleReview({ trim }) {
  const [isOpen, setIsOpen] = useState({
    exterior: true,
    interior: false,
  });

  const toggleAccordion = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const TransmissionList = (transmission) => {
    let type;
    let speed;
    if (transmission?.includes("A")) {
      type = "automatic";
      speed = `${transmission?.slice(0, -1)}-speed ${type}`;
    } else if (transmission?.includes("M")) {
      type = "manual";
      speed = `${transmission?.slice(0, -1)}-speed ${type}`;
    } else {
      type = "CVT";
      speed = transmission;
    }
    return `${speed}`;
  };

  const features = [
    trim?.haveAppleCarPlay && "Apple CarPlay",
    trim?.haveAndroidAuto && "Android Auto",
  ].filter(Boolean);

  return (
    <div id="review" className="my-3">
      <div>
        <h2 className="font-semibold mb-5 mt-14">Vehicle Review </h2>
        <div className="mt-2 text-gray-700">
          <p>
            Meet the {trim?.year} {trim?.name} {trim?.model} {trim?.name}, a{" "}
            {trim?.bodyType} priced at AED <Price data={trim?.price} />.
            Equipped with a{" "}
            {trim?.fuelType === "Electric" ? (
              trim?.motor + ", "
            ) : (
              <>
                {(trim?.displacement / 1000).toFixed(1)}L {trim?.engine} engine,{" "}
              </>
            )}
            it delivers {trim?.power}hp of power and {trim?.torque} Nm of
            torque. It features a {TransmissionList(trim?.gearBox)} transmission
            and a {trim?.drive} system for smooth handling. It is a{" "}
            {trim?.fuelType} drivetrain with a{" "}
            {trim?.fuelType === "Electric" ? "range " : "fuel efficiency "}
            of{" "}
            {trim?.fuelType === "Electric"
              ? trim?.range
              : trim?.fuelConsumption + "kmpl"}
            . Key safety components include ABS, {trim?.airbags} airbags,{" "}
            {trim?.haveCruiseControl ? "cruise control" : ""}. It is a{" "}
            {trim?.seatingCapacity}{" "}
            {trim?.haveAppleCarPlay || trim?.haveAndroidAuto
              ? "and supports "
              : ""}
            {trim?.haveAppleCarPlay ? "Apple CarPlay" : ""}{" "}
            {trim?.haveAppleCarPlay || trim?.haveAndroidAuto ? "and " : ""}
            {trim?.haveAndroidAuto ? "Android Auto" : ""}. It measures{" "}
            {formatNumberWithCommas(trim?.length)}mm in length,{" "}
            {formatNumberWithCommas(trim?.width)}mm in width, and{" "}
            {formatNumberWithCommas(trim?.height)}mm in height
            {trim?.cargoSpace
              ? ` and has ${formatNumberWithCommas(
                  trim?.cargoSpace
                )}L of cargo space.`
              : "."}
          </p>
        </div>

        <div className="mt-3 bg-white shadow-lg rounded-lg">
          <div className="border-b border-gray-200">
            <button
              className="w-full text-left font-bold p-4 bg-gray-100 rounded-t-lg flex justify-between"
              onClick={() => toggleAccordion("exterior")}
            >
              {trim?.brand} {trim?.model} {trim?.name} Exterior
              <span>
                {isOpen.exterior ? (
                  <i className="bi bi-chevron-up"></i>
                ) : (
                  <i className="bi bi-chevron-down"></i>
                )}
              </span>
            </button>
            {isOpen.exterior && (
              <div className="p-4 bg-white">
                <p>
                  <b>Body Type:</b> The {trim?.year} {trim?.brand} {trim?.model}{" "}
                  {trim?.name} is a {trim?.bodyType}.
                  <br />
                  <b>Dimensions:</b> The {trim?.year} {trim?.brand} {trim?.model}{" "}
                  {trim?.name} is{" "}
                  {trim?.length ? formatNumberWithCommas(trim?.length) : "-"}mm in
                  length, {formatNumberWithCommas(trim?.width)}mm in width, and{" "}
                  {formatNumberWithCommas(trim?.height)}mm in height.
                  <br />
                  <b>Wheelbase:</b> The {trim?.year} {trim?.brand} {trim?.model}{" "}
                  {trim?.name} features a{" "}
                  {formatNumberWithCommas(trim?.wheelbase)}mm wheelbase.
                  <br />
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              className="w-full text-left font-bold p-4 bg-gray-100 flex justify-between"
              onClick={() => toggleAccordion("interior")}
            >
              {trim?.brand} {trim?.model} {trim?.name} Interior
              <span>
                {isOpen.interior ? (
                  <i className="bi bi-chevron-up"></i>
                ) : (
                  <i className="bi bi-chevron-down"></i>
                )}
              </span>
            </button>
            {isOpen.interior && (
              <div className="p-4 bg-white">
                <p>
                  <b>Seating Capacity:</b> The {trim?.year} {trim?.brand}{" "}
                  {trim?.model} {trim?.name} has seating for up to{" "}
                  {trim?.seatingCapacity && trim?.seatingCapacity?.split(" ")[0]}{" "}
                  passengers.
                  <br />
                  <b>Upholstery:</b> The interior is finished in{" "}
                  {trim?.haveLeatherInterior ? "leather." : ""}{" "}
                  {trim?.haveFabricInterior ? "fabric." : ""}
                  <>
                    {features.length > 0 && (
                      <>
                        <br />
                        <b>Connectivity:</b> Compatibility for{" "}
                        {features.map((feature, index) => (
                          <b key={feature}>
                            {index > 0 && index < features.length - 1 ? ", " : ""}
                            {index > 0 && index === features.length - 1
                              ? " and "
                              : ""}
                            {feature}
                          </b>
                        ))}{" "}
                        is provided.
                      </>
                    )}
                  </>
                  <br />
                  {trim?.haveRearSeatEntertainment ? (
                    <>
                      <b>Entertainment:</b> Enjoy the convenience of rear seat
                      entertainment.
                      <br />
                    </>
                  ) : (
                    ""
                  )}
                  {trim?.haveCooledSeats || trim?.haveClimateControl ? (
                    <>
                      <b>Comfort:</b> The {trim?.year} {trim?.brand} {trim?.model}{" "}
                      {trim?.name} offers comfort features such as
                      {trim?.haveCooledSeats ? " ventilated seats " : ""}
                      {trim?.haveCooledSeats && trim?.haveClimateControl
                        ? " and"
                        : ""}
                      {trim?.haveClimateControl ? " climate control" : ""}.
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
