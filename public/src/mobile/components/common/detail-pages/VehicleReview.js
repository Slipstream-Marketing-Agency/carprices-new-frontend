import React from "react";
import FeaturedImage from "../FeaturedImage";
import Price from "../Price";

export default function VehicleReview({ trim }) {
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
                  {trim?.trim?.engine.split(" ")[1]}{" "}
                  {trim?.trim?.engine.split(" ")[0]} engine,
                </>
              )}
              it delivers {trim?.trim?.power} horsepower and{" "}
              {trim?.trim?.torque} Nm of torque. It features a{" "}
              {trim?.trim?.gearBox === "CVT"
                ? "CVT "
                : trim?.trim?.gearBox.slice(0, -1) +
                  "-speed " +
                  trim?.trim?.gearBox.includes("A")
                ? "automatic "
                : trim?.trim?.gearBox.includes("M")
                ? "Manual "
                : ""}
              transmission and a {trim?.trim?.drive} drive system for smooth
              handling. It is a {trim?.trim?.fuelType} drivetrain with a{" "}
              {trim?.trim?.fuelType === "Electric"
                ? "range "
                : "fuel efficiency "}
              of{" "}
              {trim?.trim?.fuelType === "Electric"
                ? trim?.trim?.range
                : trim?.trim?.fuelConsumption + "L"}
              . Key safety components include ABS, {trim?.trim?.airbags}{" "}
              airbags, {trim?.trim?.haveCruiseControl ? "cruise control" : ""}.
              It is a {trim?.trim?.seatingCapacity} and supports{" "}
              {trim?.trim?.haveAppleCarPlay ? "Apple CarPlay" : ""} and{" "}
              {trim?.trim?.haveAndroidAuto ? "Android Auto" : ""}. It measures{" "}
              {trim?.trim?.length} m in length, {trim?.trim?.width} m in width,
              and {trim?.trim?.height} m in height and has{" "}
              {trim?.trim?.cargoSpace ? trim?.trim?.cargoSpace : "-"}L of cargo
              space.
            </span>
          </p>
        </div>
        <div className="d-flex mt-3">
          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.trim?.images[3]?.image} />
          </div>

          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.trim?.images[4]?.image} />
          </div>
        </div>
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
                {trim?.trim?.name} sports a stylish {trim?.trim?.bodyType}{" "}
                design.
                <br />
                <b>Dimensions:</b> With dimensions of{" "}
                {trim?.trim?.length ? trim?.trim?.length : "-"}m length,{" "}
                {trim?.trim?.width}m width, and {trim?.trim?.height}m height,
                the {trim?.trim?.year} {trim?.trim?.brand?.name}{" "}
                {trim?.trim?.model?.name} {trim?.trim?.name} boasts a sleek
                appearance.
                <br />
                <b>Wheelbase:</b> The {trim?.trim?.year}{" "}
                {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
                {trim?.trim?.name} features a {trim?.trim?.wheelbase}m wheelbase
                for improved stability and handling. <br />
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
                {trim?.trim?.name} accommodates up to{" "}
                {trim?.trim?.seatingCapacity && trim?.trim?.seatingCapacity?.split(" ")[0]} passengers
                comfortably. <br />
                <b>Upholstery:</b> It comes with a{" "}
                {trim?.trim?.haveLeatherInterior ? "leather" : ""}{" "}
                {trim?.trim?.haveFabricInterior ? "fabric" : ""} interior.
                <br />
                <b>Connectivity:</b> Stay connected with{" "}
                {trim?.trim?.haveAppleCarPlay ? "Apple CarPlay" : ""}
                {trim?.trim?.haveAndroidAuto ? ", Android Auto" : ""}{" "}
                compatibility.
                <br />
                {trim?.trim?.haveRearSeatEntertainment
                  ? " Entertainment: Enjoy the convenience ofrear seat entertainment.<br/>"
                  : ""}
                <b>Comfort:</b> It has{" "}
                {trim?.trim?.haveCooledSeats ? "ventilated seats " : ""}
                {trim?.trim?.haveClimateControl
                  ? "and climate control"
                  : ""}{" "}
                for an enjoyable ride.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
