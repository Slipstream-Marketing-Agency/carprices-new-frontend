import Image from "next/image";
import React from "react";

export default function KeySpec({ trim }) {
  console.log(trim, "asdasd");
  const engineText = trim?.engine.split(" ");
  const size = engineText[0];
  const type = engineText[1];

  return (
    <div id="keyspec" className="my-3">
      <div className="">
        <h2 className="fw-bold">
          Key Specs of the {trim?.year} {trim?.brand} {trim?.model} {trim?.name}
        </h2>
        <div className="row py-4 text-center">
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img">
                <Image
                  width={50}
                  height={50}
                  src="/assets/images/specs/EngineType.svg"
                  alt=""
                />
              </div>
              <h6 className="fw-bold">
                {size === "Electric" ? "Motor Type" : "Engine Type"}
              </h6>
              <small className="fw-bold">
                {size === "Electric"
                  ? trim?.motor.split(" ")[0]
                  : `${(trim?.displacement / 1000).toFixed(1)}L ${
                      trim?.engine
                    }`}
              </small>
            </div>
          </div>
          {trim?.power !== null ? (
            <div className="col-md-2 col-3">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img">
                  <Image
                    width={50}
                    height={50}
                    src="/assets/images/specs/KM.svg"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold">Power (HP)</h6>
                <small className="fw-bold">{trim?.power}</small>
              </div>
            </div>
          ) : null}
          {trim?.torque !== null ? (
            <div className="col-md-2 col-3">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img p-2">
                  <Image
                    width={50}
                    height={50}
                    src="/assets/images/specs/Torque.png"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold">Torque (Nm)</h6>
                <small className="fw-bold">
                  {trim?.torque === "" ? "-" : trim?.torque}
                </small>
              </div>
            </div>
          ) : null}

          {trim?.fuelConsumption !== null || trim?.range !== null ? (
            <div className="col-md-2 col-3">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img p-2">
                  <Image
                    width={50}
                    height={50}
                    src="/assets/images/specs/FuelType.png"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold">
                  {size === "Electric" ? "Range" : "Fuel Efficiency"}
                </h6>
                <small className="fw-bold">
                  {size === "Electric" &&
                  trim?.fuelConsumption === null &&
                  trim?.range !== null
                    ? trim?.range
                    : trim?.fuelConsumption + "kmpl"}
                </small>
              </div>
            </div>
          ) : null}
          <div className="col-md-2 col-3">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img p-2">
                <Image
                  width={50}
                  height={50}
                  src="/assets/images/specs/Transmission.png"
                  alt=""
                />
              </div>
              <h6 className="fw-bold">Transmission</h6>
              <small className="fw-bold">{trim?.transmission}</small>
            </div>
          </div>
          {trim?.seatingCapacity !== null ? (
            <div className="col-md-2 col-3">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img p-2">
                  <Image
                    width={50}
                    height={50}
                    src="/assets/images/specs/Seats.png"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold">Seats</h6>
                <small className="fw-bold">
                  {trim?.seatingCapacity?.replace("Seater", "")}
                </small>
              </div>
            </div>
          ) : null}
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
