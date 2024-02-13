import React from "react";

export default function DetailedSpecification({ trim }) {
  return (
    <div id="specifications" className="my-3">
      <div className="white_bg_wrapper mt-3">
        <h2 className="fw-bold">
          Specifications of{" "}
          <span>
            {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
            {trim?.trim?.name}
          </span>
        </h2>
        <div className="row mt-2">
          <div className="col-6">
            {trim?.trim?.fuelType === "Electric" ? (
              ""
            ) : (
              <div className="white_bg_wrapper mt-1">
                <h3 className="fw-bold text-primary spec_head">Engine</h3>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Number Of Cylinders</p>
                  <p className="fw-bold">{trim?.trim?.cylinders}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Displacement</p>
                  <p className="fw-bold">{trim?.trim?.displacement}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Power</p>
                  <p className="fw-bold"> {trim?.trim?.power}hp</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Torque</p>
                  <p className="fw-bold"> {trim?.trim?.torque}Nm</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Fuel Type</p>
                  <p className="fw-bold"> {trim?.trim?.fuelType}</p>
                </div>
              </div>
            )}
            {trim?.trim?.fuelType === "Electric" ||
            trim?.trim?.fuelType === "Hybrid" ? (
              <div className="white_bg_wrapper mt-2">
                <h3 className="fw-bold text-primary">Motor</h3>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Motor</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.trim?.motor ? trim?.trim?.motor : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Battery Capacity</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.trim?.batteryCapacity
                      ? trim?.trim?.batteryCapacity
                      : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Charging Time</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.trim?.chargingTime ? trim?.trim?.chargingTime : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Battery Warranty</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.trim?.batteryWarranty
                      ? trim?.trim?.batteryWarranty
                      : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Range</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.trim?.range ? trim?.trim?.range : "-"}
                  </p>
                </div>
                {trim?.trim?.fuelType === "Hybrid" ? (
                  ""
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <p>Power</p>
                      <p className="fw-bold">
                        {" "}
                        {trim?.trim?.power ? trim?.trim?.power + "hp" : "-"}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <p>Torque</p>
                      <p className="fw-bold"> {trim?.trim?.torque}Nm</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <p>Fuel Type</p>
                      <p className="fw-bold"> {trim?.trim?.fuelType}</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ""
            )}

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">Transmission</h3>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Drive</p>
                <p className="fw-bold"> {trim?.trim?.drive}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Transmission</p>
                <p className="fw-bold"> {trim?.trim?.transmission}</p>
              </div>
              {trim?.trim?.fuelType === "Electric" ? (
                ""
              ) : (
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Gear Box</p>
                  <p className="fw-bold">
                    {trim?.trim?.gearBox ? (
                      <>
                        {trim?.trim?.gearBox === "CVT"
                          ? "-"
                          : trim?.trim?.gearBox.slice(0, -1)+"-speed"}
                      </>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">Safety</h3>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>ABS</p>
                <p className="fw-bold">
                  <i className="bi bi-check-lg" />
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Brakes</p>
                <div className="d-flex">
                  <div className="d-flex flex-row align-items-center me-2">
                    <small className="fw-bold">
                      Front: {trim?.trim?.frontBrakes?.replace("(ABS)", "")}
                    </small>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <small className="fw-bold ">
                      Rear: {trim?.trim?.rearBrakes?.replace("(ABS)", "")}
                    </small>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Airbags</p>
                <div className="d-flex">
                  <div className="d-flex flex-row align-items-center me-2">
                    <small className="fw-bold">Front</small>
                    {trim?.trim?.haveFrontAirbags ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i class="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center me-2">
                    <small className="fw-bold">Side</small>
                    {trim?.trim?.haveSideAirbags ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i className="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center ">
                    <small className="fw-bold">Rear</small>
                    {trim?.trim?.haveRearAirbags ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i className="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p>euro ncap</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.euroNcap ? trim?.trim?.euroNcap : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Park Assist</p>
                <div className="d-flex">
                  <div className="d-flex flex-row align-items-center me-2">
                    <small className="fw-bold">Front</small>
                    {trim?.trim?.haveFrontParkAssist ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i className="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <small className="fw-bold">Rear</small>
                    {trim?.trim?.haveRearParkAssist ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i className="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Parking Camera</p>
                <div className="d-flex">
                  <div className="d-flex flex-row align-items-center me-2">
                    <small className="fw-bold">Rear</small>
                    {trim?.trim?.haveRearParkingCamera ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i className="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <small className="fw-bold">360</small>
                    {trim?.trim?.have360ParkingCamera ? (
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        <i className="bi bi-x-lg"></i>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Cruise Control</p>
                {trim?.trim?.haveCruiseControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Adaptive Cruise Control</p>
                {trim?.trim?.haveCruiseControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Lane Change Assist</p>
                {trim?.trim?.haveLaneChangeAssist ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
            </div>
          </div>

          <div className="col-6">
            {trim?.trim?.fuelType === "Electric" ? (
              ""
            ) : (
              <div className="white_bg_wrapper mt-1">
                <h3 className="fw-bold text-primary">Fuel Efficiency</h3>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Tank Size</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.trim?.fuelTankSize
                      ? trim?.trim?.fuelTankSize + "L"
                      : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>Fuel Consumption</p>
                  <p className="fw-bold"> {trim?.trim?.fuelConsumption}</p>
                </div>
              </div>
            )}

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">Performance</h3>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Zero to Hundred</p>
                <p className="fw-bold"> {trim?.trim?.zeroToHundred} seconds</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Top Speed</p>
                <p className="fw-bold"> {trim?.trim?.topSpeed} km</p>
              </div>
            </div>

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">Dimensions</h3>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Body Type</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.bodyType ? trim?.trim?.bodyType : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Doors</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.doors ? trim?.trim?.doors : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Length</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.length ? trim?.trim?.length + "m" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Width</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.width ? trim?.trim?.width + "m" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Wheelbase</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.wheelbase ? trim?.trim?.wheelbase + "m" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Weight</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.weight ? trim?.trim?.weight + "kg" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Front Tyre</p>
                <p className="fw-bold">
                  {trim?.trim?.tyresFront !== "" ? trim?.trim?.tyresFront : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Rear Tyre</p>
                <p className="fw-bold">
                  {trim?.trim?.tyresRear !== "" ? trim?.trim?.tyresRear : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Cargo Space</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.cargoSpace ? trim?.trim?.cargoSpace + " L" : "-"}
                </p>
              </div>
            </div>
            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">Interior</h3>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Leather Interior</p>
                {trim?.trim?.haveLeatherInterior ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Fabric Interior</p>
                {trim?.trim?.haveFabricInterior ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Rear Seat Entertainment</p>
                {trim?.trim?.haveRearSeatEntertainment ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Cooled Seats</p>
                {trim?.trim?.haveCooledSeats ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Climate Control</p>
                {trim?.trim?.haveClimateControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Seating Capacity</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.trim?.seatingCapacity && trim?.trim?.seatingCapacity?.split(" ")[0]}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Apple Car Play</p>
                {trim?.trim?.haveAppleCarPlay ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}{" "}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>Android Auto</p>
                {trim?.trim?.haveAndroidAuto ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-x-lg"></i>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
