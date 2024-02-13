import React from "react";
import FeaturedImage from "../FeaturedImage";
import Price from "../Price";

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
    trim?.trim?.haveAppleCarPlay && "Apple CarPlay",
    trim?.trim?.haveAndroidAuto && "Android Auto",
  ].filter(Boolean);
  return (
    <div id="review" className="my-3">
      <div className="white_bg_wrapper">
        <h2 className="fw-bold">
          {trim?.trim?.year} {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
          {trim?.trim?.name}
          <span> Review</span>
        </h2>
        <div className="car_description mt-3">
          <p>
            <span>
              Meet the {trim?.trim?.year} {trim?.trim?.brand?.name}{" "}
              {trim?.trim?.model?.name} {trim?.trim?.name}, a{" "}
              {trim?.trim?.bodyType} priced at AED{" "}
              <Price data={trim?.trim?.price} /> . Equipped with a{" "}
              {trim?.trim?.fuelType === "Electric" ? (
                trim?.trim?.motor + ", "
              ) : (
                <>
                  {(trim?.trim?.displacement / 1000).toFixed(1)}L {trim?.trim?.engine} engine,{" "}
                </>
              )}
              it delivers {trim?.trim?.power}hp power and{" "}
              {trim?.trim?.torque} Nm of torque. It features a{" "}
              {TransmissionList(trim?.trim?.gearBox)}{" "}
              transmission and a {trim?.trim?.drive} drive system for smooth
              handling. It is a {trim?.trim?.fuelType} drivetrain with a{" "}
              {trim?.trim?.fuelType === "Electric"
                ? "range "
                : "fuel efficiency "}
              of{" "}
              {trim?.trim?.fuelType === "Electric"
                ? trim?.trim?.range
                : trim?.trim?.fuelConsumption + "kmpl"}
              . Key safety components include ABS, {trim?.trim?.airbags}{" "}
              airbags, {trim?.trim?.haveCruiseControl ? "cruise control" : ""}.
              It is a {trim?.trim?.seatingCapacity} {trim?.trim?.haveAppleCarPlay || trim?.trim?.haveAndroidAuto ? "and supports " : ""}
              {trim?.trim?.haveAppleCarPlay ? "Apple CarPlay" : ""} {trim?.trim?.haveAppleCarPlay || trim?.trim?.haveAndroidAuto ? "and " : ""}
              {trim?.trim?.haveAndroidAuto ? "Android Auto" : ""}. It measures{" "}
              {trim?.trim?.length}mm in length, {trim?.trim?.width}mm in width,
              and {trim?.trim?.height}mm in height
              {trim?.trim?.cargoSpace ? ` and has ${trim?.trim?.cargoSpace}L of cargo space.` : "."}

            </span>
          </p>
        </div>
        {/* <div className="d-flex mt-3">
          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.trim?.images[3]?.image} />
          </div>

          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.trim?.images[4]?.image} />
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
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                {trim?.trim?.name} Exterior
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <b>Body Type:</b> The {trim?.trim?.year}{" "}
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                {trim?.trim?.name} is a {trim?.trim?.bodyType}.
                <br />
                <b>Dimensions:</b> The {trim?.trim?.year}{" "}
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name} {""}is{" "}
                {trim?.trim?.length ? trim?.trim?.length : "-"}mm in length,{" "}
                {trim?.trim?.width}mm in width, and {trim?.trim?.height}mm in height,
                the {trim?.trim?.year} {trim?.trim?.brand?.name}{" "}
                {trim?.trim?.model?.name} {trim?.trim?.name}.
                <br />
                <b>Wheelbase:</b> The {trim?.trim?.year}{" "}
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                {trim?.trim?.name} features a {trim?.trim?.wheelbase}mm wheelbase. <br />
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
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                {trim?.trim?.name} Interior
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <b>Seating Capacity:</b> The {trim?.trim?.year}{" "}
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                {trim?.trim?.name} has seating for up to{" "}
                {trim?.trim?.seatingCapacity && trim?.trim?.seatingCapacity?.split(" ")[0]} passengers. <br />
                <b>Upholstery:</b> The interior is finished in {" "}
                {trim?.trim?.haveLeatherInterior ? "leather." : ""}{" "}
                {trim?.trim?.haveFabricInterior ? "fabric." : ""}
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
                {trim?.trim?.haveRearSeatEntertainment
                  ? <><b>Entertainment:</b> Enjoy the convenience of rear seat entertainment.<br /></>
                  : ""}
                {trim?.trim?.haveCooledSeats || trim?.trim?.haveClimateControl ? <>
                  <b>Comfort:</b> The {trim?.trim?.year} {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                  {trim?.trim?.name} offers comfort features such as
                  {trim?.trim?.haveCooledSeats ? " ventilated seats " : ""}
                  {trim?.trim?.haveCooledSeats && trim?.trim?.haveClimateControl? " and" :""}
                  {trim?.trim?.haveClimateControl
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
