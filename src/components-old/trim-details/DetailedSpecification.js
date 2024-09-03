import { formatNumberWithCommas } from "@/src/utils/formatNumber";
import React from "react";

export default function DetailedSpecification({ trim }) {
  return (
    <div id="specifications">
      <h2 className="tw-font-semibold tw-mb-5 tw-mt-14">Vehicle Details </h2>
      <div id="specifications" className="tw-my-3">
        <div className="tw-bg-gray-50 tw-p-6 tw-rounded-lg tw-shadow-sm">
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Make and models
              </h5>
              <p>
                <strong>Brand:</strong> {trim?.brand}
              </p>
              <p>
                <strong>Model Name:</strong> {trim?.model}
              </p>
              <p>
                <strong>Year of Manufacture:</strong> {trim?.year || "-"}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">Trim</h5>
              <p>{trim?.name || "Base"}</p>
              <p>{trim?.specialEdition || "Standard"}</p>
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Fuel Efficiency
              </h5>
              {trim?.fuelType !== "Electric" && (
                <>
                  <p>
                    <strong>Tank Size: </strong>
                    {trim?.fuelTankSize ? trim?.fuelTankSize + "L" : "-"}
                  </p>
                  <p>
                    <strong>Fuel Consumption: </strong>
                    {trim?.fuelConsumption
                      ? trim?.fuelConsumption + "kmpl"
                      : "-"}
                  </p>
                </>
              )}
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Performance
              </h5>
              <p>
                <strong>Zero to Hundred: </strong>
                {trim?.zeroToHundred ? trim?.zeroToHundred + " seconds" : "-"}
              </p>
              <p>
                <strong>Top Speed: </strong>
                {trim?.topSpeed ? trim?.topSpeed + " kmph" : "-"}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Engine Specifications
              </h5>
              <p>
                <strong>No. of Cylinders: </strong>{" "}
                {trim?.cylinders ? trim?.cylinders : "-"}
              </p>
              <p>
                <strong>Displacement: </strong>
                {trim?.displacement}
              </p>
              <p>
                <strong>Power: </strong> {trim?.power}hp
              </p>
              <p>
                <strong>Torque: </strong> {trim?.torque}Nm
              </p>
              <p>
                <strong>Fuel Type: </strong> {trim?.fuelType}
              </p>
            </div>
            {trim?.fuelType === "Electric" || trim?.fuelType === "Hybrid" ? (
              <div className="tw-bg-white tw-mt-2">
                <h3 className="tw-font-bold tw-text-primary">
                  Motor Specifications
                </h3>
                <hr className="tw-my-2 tw-border-b" />
                <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                  <p>Motor</p>
                  <p className="tw-font-bold">
                    {trim?.motor ? trim?.motor : "-"}
                  </p>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                  <p>Battery Capacity</p>
                  <p className="tw-font-bold">
                    {trim?.batteryCapacity ? trim?.batteryCapacity : "-"}
                  </p>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                  <p>Charging Time</p>
                  <p className="tw-font-bold">
                    {trim?.chargingTime ? trim?.chargingTime : "-"}
                  </p>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                  <p>Battery Warranty</p>
                  <p className="tw-font-bold">
                    {trim?.batteryWarranty ? trim?.batteryWarranty : "-"}
                  </p>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                  <p>Range</p>
                  <p className="tw-font-bold">
                    {trim?.range ? trim?.range : "-"}
                  </p>
                </div>
                {trim?.fuelType === "Hybrid" ? (
                  ""
                ) : (
                  <>
                    <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                      <p>Power</p>
                      <p className="tw-font-bold">
                        {trim?.power ? trim?.power + "hp" : "-"}
                      </p>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                      <p>Torque</p>
                      <p className="tw-font-bold">
                        {trim?.torque ? trim?.torque + "Nm" : "-"}
                      </p>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-mt-1">
                      <p>Fuel Type</p>
                      <p className="tw-font-bold">{trim?.fuelType}</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ""
            )}

            {trim?.fuelType === "Electric" || trim?.fuelType === "Hybrid" ? (
              <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
                <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                  Motor Specifications
                </h5>
                <p>
                  <strong>Motor: </strong>
                  {trim?.motor ? trim?.motor : "-"}
                </p>
                <p>
                  <strong>Battery Capacity: </strong>
                  {trim?.batteryCapacity ? trim?.batteryCapacity : "-"}
                </p>
                <p>
                  <strong>Charging Time: </strong>
                  {trim?.chargingTime ? trim?.chargingTime : "-"}
                </p>
                <p>
                  <strong>Battery Warranty: </strong>
                  {trim?.batteryWarranty ? trim?.batteryWarranty : "-"}
                </p>
                <p>
                  <strong>Range: </strong>
                  {trim?.range ? trim?.range : "-"}
                </p>
                {trim?.fuelType === "Hybrid" ? (
                  ""
                ) : (
                  <>
                    <p>
                      <strong>Power: </strong>
                      {trim?.power ? trim?.power + "hp" : "-"}
                    </p>
                    <p>
                      <strong>Torque: </strong>
                      {trim?.torque ? trim?.torque + "Nm" : "-"}
                    </p>
                    <p>
                      <strong>Fuel Type: </strong>
                      {trim?.fuelType}
                    </p>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Transmission Specifications
              </h5>
              <p>
                <strong>Drive: </strong> {trim?.drive}
              </p>
              <p>
                <strong>Transmission Type: </strong> {trim?.transmission}
              </p>
              {trim?.fuelType === "Electric" ? (
                ""
              ) : (
                <p>
                  <strong>No. of Gears: </strong>
                  {trim?.gearBox ? (
                    <>
                      {trim?.gearBox === "CVT"
                        ? "-"
                        : trim?.gearBox.slice(0, -1) + "-speed"}
                    </>
                  ) : (
                    "-"
                  )}
                </p>
              )}
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Seating & Upholstery
              </h5>
              <p>
                <strong>Leather Interior: </strong>
                {trim?.haveLeatherInterior ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Fabric Interior: </strong>
                {trim?.haveFabricInterior ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Seating Capacity: </strong>
                {trim?.seatingCapacity
                  ? trim?.seatingCapacity?.split(" ")[0]
                  : "-"}
              </p>
              <p>
                <strong>Cooled Seats: </strong>
                {trim?.haveCooledSeats ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Technology & Comfort
              </h5>
              <p>
                <strong>Rear Seat Entertainment: </strong>
                {trim?.haveRearSeatEntertainment ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Climate Control: </strong>
                {trim?.haveClimateControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Apple Car Play: </strong>
                {trim?.haveAppleCarPlay ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Android Auto: </strong>
                {trim?.haveAndroidAuto ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Body & Dimensions
              </h5>
              <p>
                <strong>Body Type: </strong>
                {trim?.bodyType ? trim?.bodyType : "-"}
              </p>
              <p>
                <strong>Doors: </strong>
                {trim?.doors ? trim?.doors : "-"}
              </p>
              <p>
                <strong>Length: </strong>
                {trim?.length
                  ? formatNumberWithCommas(trim?.length) + "mm"
                  : "-"}
              </p>
              <p>
                <strong>Width: </strong>
                {trim?.width ? formatNumberWithCommas(trim?.width) + "mm" : "-"}
              </p>
              <p>
                <strong>Wheelbase: </strong>
                {trim?.wheelbase
                  ? formatNumberWithCommas(trim?.wheelbase) + "mm"
                  : "-"}
              </p>
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Tyres & Cargo
              </h5>
              <p>
                <strong>Weight: </strong>
                {trim?.weight
                  ? formatNumberWithCommas(trim?.weight) + "kg"
                  : "-"}
              </p>
              <p>
                <strong>Front Tyre: </strong>
                {trim?.tyresFront !== "" ? trim?.tyresFront : "-"}
              </p>
              <p>
                <strong>Rear Tyre: </strong>
                {trim?.tyresRear !== "" ? trim?.tyresRear : "-"}
              </p>
              <p>
                <strong>Cargo Space: </strong>
                {trim?.cargoSpace ? trim?.cargoSpace + "L" : "-"}
              </p>
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Safety Features
              </h5>
              <p>
                <strong>ABS: </strong>
                <i className="bi bi-check-lg" />
              </p>
              <p>
                <strong>Brake Type: </strong>
                Front: {trim?.frontBrakes?.replace("(ABS)", "")}, Rear:{" "}
                {trim?.rearBrakes?.replace("(ABS)", "")}
              </p>
              <p>
                <strong>No. of Airbags: </strong>
                {trim?.airbags ? trim?.airbags : "-"}
              </p>
              <p>
                <strong>Airbag Type: </strong>
                {trim?.haveFrontAirbags ? (
                  <>
                    Front <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
                {trim?.haveSideAirbags ? (
                  <>
                    , Side <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
                {trim?.haveRearAirbags ? (
                  <>
                    , Rear <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>

            <div className="tw-flex tw-flex-col tw-h-full tw-space-y-2">
              <h5 className="tw-font-semibold tw-text-gray-400 tw-m-0">
                Driver Assistance
              </h5>
              <p>
                <strong>Park Assist: </strong>
                {trim?.haveFrontParkAssist ? (
                  <>
                    Front <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
                {trim?.haveRearParkAssist ? (
                  <>
                    , Rear <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
              </p>
              <p>
                <strong>Parking Camera: </strong>
                {trim?.haveRearParkingCamera ? (
                  <>
                    Rear <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
                {trim?.have360ParkingCamera ? (
                  <>
                    , 360 <i className="bi bi-check-lg"></i>
                  </>
                ) : (
                  ""
                )}
              </p>
              <p>
                <strong>Cruise Control: </strong>
                {trim?.haveCruiseControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Adaptive Cruise Control: </strong>
                {trim?.haveCruiseControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
              <p>
                <strong>Lane Change Assist: </strong>
                {trim?.haveLaneChangeAssist ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
