import React from "react";

export default function KeySpec({ trim }) {
  const engineText = trim?.trim?.engine.split(" ");
  const size = engineText[0];
  const type = engineText[1];

  return (
    <div id="keyspec" className="my-3">
      <div className="white_bg_wrapper">
        <h2 className="fw-bold">
          Key Specs of the {trim?.trim?.year} {trim?.trim?.brand?.name}{" "}
          {trim?.trim?.model?.name} {trim?.trim?.name}
        </h2>
        <div className="row py-2 text-center">
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img">
                <img src="/assets/images/specs/EngineType.svg" alt="" />
              </div>
              <h6 className="fw-bold">
                {size === "Electric" ? "Motor Type" : "Engine Type"}
              </h6>
              <small className="fw-bold">
                {size === "Electric"
                  ? trim?.trim?.motor.split(" ")[0]
                  : type + " " + size}
              </small>
            </div>
          </div>
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img">
                <img src="/assets/images/specs/KM.svg" alt="" />
              </div>
              <h6 className="fw-bold">Power (HP)</h6>
              <small className="fw-bold">{trim?.trim?.power}</small>
            </div>
          </div>
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img p-2">
                <img src="/assets/images/specs/Torque.png" alt="" />
              </div>
              <h6 className="fw-bold">Torque (Nm)</h6>
              <small className="fw-bold">
                {trim?.trim?.torque === "" ? "-" : trim?.trim?.torque}
              </small>
            </div>
          </div>
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img p-2">
                <img src="/assets/images/specs/FuelType.png" alt="" />
              </div>
              <h6 className="fw-bold">
                {size === "Electric" ? "Range" : "Fuel Efficiency"}
              </h6>
              <small className="fw-bold">
                {size === "Electric"
                  ? trim?.trim?.range
                  : trim?.trim?.fuelConsumption + "kmpl"}
              </small>
            </div>
          </div>
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img p-2">
                <img src="/assets/images/specs/transmission.png" alt="" />
              </div>
              <h6 className="fw-bold">Transmission</h6>
              <small className="fw-bold">{trim?.trim?.transmission}</small>
            </div>
          </div>
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img p-2">
                <img src="/assets/images/specs/Seats.png" alt="" />
              </div>
              <h6 className="fw-bold">Seats</h6>
              <small className="fw-bold">
                {trim?.trim?.seatingCapacity?.replace("Seater", "")}
              </small>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card_wrapper_bottom_link">
        <a href="" title="">
          <span>View All Speifications</span>
          <i className="bi bi-chevron-right" />
        </a>
      </div> */}
    </div>
  );
}
