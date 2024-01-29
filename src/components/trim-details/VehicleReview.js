import React from "react";
import Price from "../common/Price";

export default function VehicleReview({ trim }) {
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
  }

  const features = [
    trim?.haveAppleCarPlay && "Apple CarPlay",
    trim?.haveAndroidAuto && "Android Auto",
  ].filter(Boolean);
  return (
    <div id="review" className="my-3">
      <div className="white_bg_wrapper">
        <h2 className="fw-bold">
          {trim?.year} {trim?.name} {trim?.model}{" "}
          {trim?.name}
          <span> Review</span>
        </h2>
        <div className="car_description mt-3">
          <p>
            <span>
              Meet the {trim?.year} {trim?.name}{" "}
              {trim?.model} {trim?.name}, a{" "}
              {trim?.bodyType} priced at AED{" "}
              <Price data={trim?.price} /> . Equipped with a{" "}
              {trim?.fuelType === "Electric" ? (
                trim?.motor + ", "
              ) : (
                <>
                  {(trim?.displacement / 1000).toFixed(1)}L {trim?.engine} engine,{" "}
                </>
              )}
              it delivers {trim?.power}hp power and{" "}
              {trim?.torque} Nm of torque. It features a{" "}
              {TransmissionList(trim?.gearBox)}{" "}
              transmission and a {trim?.drive} drive system for smooth
              handling. It is a {trim?.fuelType} drivetrain with a{" "}
              {trim?.fuelType === "Electric"
                ? "range "
                : "fuel efficiency "}
              of{" "}
              {trim?.fuelType === "Electric"
                ? trim?.range
                : trim?.fuelConsumption + "kmpl"}
              . Key safety components include ABS, {trim?.airbags}{" "}
              airbags, {trim?.haveCruiseControl ? "cruise control" : ""}.
              It is a {trim?.seatingCapacity} {trim?.haveAppleCarPlay || trim?.haveAndroidAuto ? "and supports " : ""}
              {trim?.haveAppleCarPlay ? "Apple CarPlay" : ""} {trim?.haveAppleCarPlay || trim?.haveAndroidAuto ? "and " : ""}
              {trim?.haveAndroidAuto ? "Android Auto" : ""}. It measures{" "}
              {trim?.length}mm in length, {trim?.width}mm in width,
              and {trim?.height}mm in height
              {trim?.cargoSpace ? ` and has ${trim?.cargoSpace}L of cargo space.` : "."}

            </span>
          </p>
        </div>
        {/* <div className="d-flex mt-3">
          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.images[3]?.image} />
          </div>

          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.images[4]?.image} />
          </div>
        </div> */}
        <div className="accordion mt-3" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                {trim?.name} {trim?.model}{" "}
                {trim?.name} Exterior
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <b>Body Type:</b> The {trim?.year}{" "}
                {trim?.name} {trim?.model}{" "}
                {trim?.name} is a {trim?.bodyType}.
                <br />
                <b>Dimensions:</b> The {trim?.year}{" "}
                {trim?.name} {trim?.model} {""}is{" "}
                {trim?.length ? trim?.length : "-"}mm in length,{" "}
                {trim?.width}mm in width, and {trim?.height}mm in height,
                the {trim?.year} {trim?.name}{" "}
                {trim?.model} {trim?.name}.
                <br />
                <b>Wheelbase:</b> The {trim?.year}{" "}
                {trim?.name} {trim?.model}{" "}
                {trim?.name} features a {trim?.wheelbase}mm wheelbase. <br />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                {trim?.name} {trim?.model}{" "}
                {trim?.name} Interior
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <b>Seating Capacity:</b> The {trim?.year}{" "}
                {trim?.name} {trim?.model}{" "}
                {trim?.name} has seating for up to{" "}
                {trim?.seatingCapacity && trim?.seatingCapacity?.split(" ")[0]} passengers. <br />
                <b>Upholstery:</b> The interior is finished in {" "}
                {trim?.haveLeatherInterior ? "leather." : ""}{" "}
                {trim?.haveFabricInterior ? "fabric." : ""}
                <br />

                <>
                  {features.length > 0 && (
                    <>
                      <b>Connectivity:</b> Compatibility for{" "}
                      {features.map((feature, index) => (
                        <b key={feature}>
                          {index > 0 && index < features.length - 1 ? ", " : ""}
                          {index > 0 && index === features.length - 1 ? " and " : ""}
                          {feature}
                        </b>
                      ))}
                      {" "}is provided.
                    </>
                  )}
                </>
                <br />
                {trim?.haveRearSeatEntertainment
                  ? <><b>Entertainment:</b> Enjoy the convenience of rear seat entertainment.<br /></>
                  : ""}
                {trim?.haveCooledSeats || trim?.haveClimateControl ? <>
                  <b>Comfort:</b> The {trim?.year} {trim?.name} {trim?.model}{" "}
                  {trim?.name} offers comfort features such as
                  {trim?.haveCooledSeats ? " ventilated seats " : ""}
                  {trim?.haveCooledSeats && trim?.haveClimateControl? " and" :""}
                  {trim?.haveClimateControl
                    ? " climate control"
                    : ""}.</> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
