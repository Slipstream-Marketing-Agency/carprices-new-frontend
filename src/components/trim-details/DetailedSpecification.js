import { formatNumberWithCommas } from "@/src/utils/formatNumber";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React from "react";

export default function DetailedSpecification({ trim }) {
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";
  return (
    <div id="specifications" className="my-3">
      <div className="white_bg_wrapper">

        <h2 className={`w-100 fw-bold`}>
          {t.specificationsOf}{" "}
          <span>
            {trim?.brand} {trim?.model} {trim?.name}
          </span>
        </h2>
        <hr className="my-2 heading-bottom " />
        {/* <div className="single-item mb-50" id="overview">
          <div className="overview">
            <div className="title mb-2">
              <h3>Engine</h3>
            </div>
            {trim?.fuelType === "Electric" ? (
              ""
            ) : (
              <div className="overview-content">
                <ul>
                  <li>
                    <span>No. of Cylinders</span> {trim?.cylinders ? trim?.cylinders : "-"}
                  </li>
                  <li>
                    <span>Displacement</span> {trim?.displacement}
                  </li>
                  <li>
                    <span>Power</span> {trim?.power}hp
                  </li>
                  
                </ul>
                <ul>
                  <li>
                    <span>Torque</span> {trim?.torque}Nm
                  </li>
                  <li>
                    <span>Fuel Type</span> {trim?.fuelType}
                  </li>
                  
                </ul>
              </div>
            )}
          </div>
        </div> */}
        <div className="row mt-2">
          <div className="col-sm-6 col-12">
            {trim?.fuelType === "Electric" ? (
              ""
            ) : (
              <div className="white_bg_wrapper mt-1">
                <h3 className="fw-bold text-primary spec_head">{t.engine}</h3>
                <hr className="my-2 heading-bottom " />
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.NoOfCylinders}</p>
                  <p className="fw-bold">
                    {trim?.cylinders ? trim?.cylinders : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.displacement}</p>
                  <p className="fw-bold">{trim?.displacement}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.power}</p>
                  <p className="fw-bold"> {trim?.power}hp</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.torque}</p>
                  <p className="fw-bold"> {trim?.torque}Nm</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.fuelType}</p>
                  <p className="fw-bold"> {trim?.fuelType}</p>
                </div>
              </div>
            )}
            {trim?.fuelType === "Electric" || trim?.fuelType === "Hybrid" ? (
              <div className="white_bg_wrapper mt-2">
                <h3 className="fw-bold text-primary">{t.motor}</h3>
                <hr className="my-2 heading-bottom " />
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.motor}</p>
                  <p className="fw-bold"> {trim?.motor ? trim?.motor : "-"}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.batteryCapacity}</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.batteryCapacity ? trim?.batteryCapacity : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.ChargingTime}</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.chargingTime ? trim?.chargingTime : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.batteryCapacity}</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.batteryWarranty ? trim?.batteryWarranty : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.range}</p>
                  <p className="fw-bold"> {trim?.range ? trim?.range : "-"}</p>
                </div>
                {trim?.fuelType === "Hybrid" ? (
                  ""
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <p>{t.power}</p>
                      <p className="fw-bold">
                        {" "}
                        {trim?.power ? trim?.power + "hp" : "-"}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <p>{t.torque}</p>
                      <p className="fw-bold"> {trim?.torque}Nm</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <p>{t.fuelType}</p>
                      <p className="fw-bold"> {trim?.fuelType}</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ""
            )}

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">{t.transmission}</h3>
              <hr className="my-2 heading-bottom " />
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.drive}</p>
                <p className="fw-bold"> {trim?.drive}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.transmissionType}</p>
                <p className="fw-bold"> {trim?.transmission}</p>
              </div>
              {trim?.fuelType === "Electric" ? (
                ""
              ) : (
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.NoOfGears}</p>
                  <p className="fw-bold">
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
                </div>
              )}
            </div>

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">{t.safety}</h3>
              <hr className="my-2 heading-bottom " />
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>ABS</p>
                <p className="fw-bold">
                  <i className="bi bi-check-lg" />
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.brakeType}</p>
                <div className="d-flex">
                  <div className="d-flex flex-row align-items-center me-2">
                    <p className="fw-bold">
                      {t.front}: {trim?.frontBrakes?.replace("(ABS)", "")}
                    </p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p className="fw-bold ">
                      {t.rear}: {trim?.rearBrakes?.replace("(ABS)", "")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.noOfAirBags}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.airbags ? trim?.airbags : "-"}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.airBagType}</p>
                <div className="d-flex">
                  {trim?.haveFrontAirbags ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">{t.front}</p>
                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {trim?.haveSideAirbags ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">{t.side}</p>

                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {trim?.haveRearAirbags ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">{t.rear}</p>

                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.parkAssist}</p>
                <div className="d-flex">
                  {trim?.haveFrontParkAssist ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">{t.front}</p>

                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {trim?.haveRearParkAssist ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">{t.rear}</p>

                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.parkingCamera}</p>
                <div className="d-flex">
                  {trim?.haveRearParkingCamera ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">{t.rear}</p>

                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {trim?.have360ParkingCamera ? (
                    <div className="d-flex flex-row align-items-center ms-2">
                      <p className="fw-bold">360</p>

                      <p className="fw-bold">
                        <i className="bi bi-check-lg"></i>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.cruiseControl}</p>
                {trim?.haveCruiseControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.adaptiveCruiseControl}</p>
                {trim?.haveCruiseControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.laneChangeAssist}</p>
                {trim?.haveLaneChangeAssist ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-12 mt-sm-0 mt-2">
            {trim?.fuelType === "Electric" ? (
              ""
            ) : (
              <div className="white_bg_wrapper mt-1">
                <h3 className="fw-bold text-primary">{t.fuelefficiency}</h3>
                <hr className="my-2 heading-bottom " />
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.tankSize}</p>
                  <p className="fw-bold">
                    {" "}
                    {trim?.fuelTankSize ? trim?.fuelTankSize + "L" : "-"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p>{t.FuelConsumption}</p>
                  <p className="fw-bold"> {trim?.fuelConsumption}kmpl</p>
                </div>
              </div>
            )}

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">{t.performance}</h3>
              <hr className="my-2 heading-bottom " />
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.zeroToHundred }</p>
                <p className="fw-bold"> {trim?.zeroToHundred}seconds</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.TopSpeed}</p>
                <p className="fw-bold"> {trim?.topSpeed}kmph</p>
              </div>
            </div>

            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">{t.Dimensions}</h3>
              <hr className="my-2 heading-bottom " />
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.bodyType}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.bodyType ? trim?.bodyType : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.doors}</p>
                <p className="fw-bold"> {trim?.doors ? trim?.doors : "-"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.Length }</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.length ? formatNumberWithCommas(trim?.length) + "mm" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.Width}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.width ? formatNumberWithCommas(trim?.width) + "mm" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.Wheelbase}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.wheelbase ? formatNumberWithCommas(trim?.wheelbase) + "mm" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.Weight}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.weight ? formatNumberWithCommas(trim?.weight) + "kg" : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.FrontTyres}</p>
                <p className="fw-bold">
                  {trim?.tyresFront !== "" ? trim?.tyresFront : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.RearTyres}</p>
                <p className="fw-bold">
                  {trim?.tyresRear !== "" ? trim?.tyresRear : "-"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.CargoSpace}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.cargoSpace ? trim?.cargoSpace + "L" : "-"}
                </p>
              </div>
            </div>
            <div className="white_bg_wrapper mt-2">
              <h3 className="fw-bold text-primary">{t.interior}</h3>
              <hr className="my-2 heading-bottom " />
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.LeatherInterior}</p>
                {trim?.haveLeatherInterior ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.FabricInterior}</p>
                {trim?.haveFabricInterior ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.RearSeatEntertainment}</p>
                {trim?.haveRearSeatEntertainment ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.cooledSeats}</p>
                {trim?.haveCooledSeats ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.ClimateControl}</p>
                {trim?.haveClimateControl ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.SeatingCapacity}</p>
                <p className="fw-bold">
                  {" "}
                  {trim?.seatingCapacity &&
                    trim?.seatingCapacity?.split(" ")[0]}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.AppleCarPlay}</p>
                {trim?.haveAppleCarPlay ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}{" "}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <p>{t.AndroidAuto}</p>
                {trim?.haveAndroidAuto ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <b>-</b>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
