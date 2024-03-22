import Image from "next/image";
import React from "react";

export default function KeySpec({ trim }) {
  
  const engineText = trim?.engine.split(" ");
  const size = engineText[0];
  const type = engineText[1];

  return (
    <div id="keyspec" className="my-3">
      <div className="white_bg_wrapper">
        <h2 className={`w-100 fw-bold`}>
          Key Specs of the {trim?.year} {trim?.brand} {trim?.model} {trim?.name}
        </h2>
        <hr className="my-2 heading-bottom " />
        <div className="row py-2 text-center">
          <div className="col-sm-4 col-lg-2 col-6 ">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img">
                <Image
                  width={50}
                  height={50}
                  src="/assets/images/specs/EngineType.svg"
                  alt=""
                />
              </div>
              <h6 className="fw-bold mb-1">
                {size === "Electric" ? "Motor Type" : "Engine Type"}
              </h6>
              <small className="">
                {size === "Electric"
                  ? trim?.motor.split(" ")[0]
                  : `${(trim?.displacement / 1000).toFixed(1)}L ${
                      trim?.engine
                    }`}
              </small>
            </div>
          </div>
          {trim?.power !== null ? (
            <div className="col-sm-4  col-lg-2  col-6 ">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img ">
                  <Image
                    width={60}
                    height={60}
                    src="/assets/images/specs/KM.svg"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold mb-1">Power (hp)</h6>
                <small className="">{trim?.power}</small>
              </div>
            </div>
          ) : null}
          {trim?.torque !== null ? (
            <div className="col-sm-4 col-lg-2  col-6 ">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img p-2">
                  <Image
                    width={30}
                    height={30}
                    src="/assets/images/specs/Torque.png"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold mb-1">Torque (Nm)</h6>
                <small className="">
                  {trim?.torque === "" ? "-" : trim?.torque}
                </small>
              </div>
            </div>
          ) : null}

          {trim?.fuelConsumption !== null || trim?.range !== 0 ? (
            <div className="col-sm-4 col-lg-2  col-6 ">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img p-2">
                  <Image
                    width={35}
                    height={35}
                    src="/assets/images/specs/FuelType.png"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold mb-1">
                  {size === "Electric" ? "Range" : "Fuel Efficiency"}
                </h6>
                <small className="">
                  {size === "Electric" &&
                  trim?.fuelConsumption === null &&
                  trim?.range !== 0
                    ? trim?.range
                    : trim?.fuelConsumption + "kmpl"}
                </small>
              </div>
            </div>
          ) : null}
          <div className="col-sm-4 col-lg-2  col-6 ">
            <div className="d-flex flex-column align-items-center">
              <div className="spec-img p-2">
                <Image
                  width={35}
                  height={35}
                  src="/assets/images/specs/Transmission.png"
                  alt=""
                />
              </div>
              <h6 className="fw-bold mb-1">Transmission</h6>
              <small className="">{trim?.transmission}</small>
            </div>
          </div>
          {trim?.seatingCapacity !== null ? (
            <div className="col-sm-4 col-lg-2 col-6 ">
              <div className="d-flex flex-column align-items-center">
                <div className="spec-img p-2">
                  <Image
                    width={50}
                    height={50}
                    src="/assets/images/specs/Seats.png"
                    alt=""
                  />
                </div>
                <h6 className="fw-bold mb-1">Seats</h6>
                <small className=" ">
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
