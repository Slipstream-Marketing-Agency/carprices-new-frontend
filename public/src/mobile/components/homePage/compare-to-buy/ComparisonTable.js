import Ad728x90 from "@/components/ads/Ad728x90";
import React from "react";

export default function ComparisonTable(carToCompare) {
  return (
    <div className="comparison_data white_bg_wrapper mx-auto">
      {/* {carToCompare??.map((item, index) => (
      <h3 className="fw-bold mb-3">
        {item?.year}{item?.brand?.name} {item?.model?.name} {item?.name} Comparison
      </h3>
    ))} */}

      

      <table class="table borderless mb-1">
        <thead>
          <tr>
            <th className="col-2"></th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <th className="col-2">
                {item?.year && item?.year !== "" ? item?.year : "-"}{" "}
                {item?.brand?.name && item?.brand?.name !== ""
                  ? item?.brand?.name
                  : "-"}{" "}
                {item?.model?.name && item?.model?.name !== ""
                  ? item?.model?.name
                  : "-"}{" "}
                {item?.name && item?.name !== "" ? item?.name : "-"}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <h4 className="table_heads mt-0">Engine</h4>

      <table class="table  table-striped">
        {/* <thead>
          <tr>
            <th scope="col"></th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <th scope="col">
                {item?.year && item?.year !== "" ? item?.year : "-"}{" "}
                {item?.brand?.name && item?.brand?.name !== ""
                  ? item?.brand?.name
                  : "-"}{" "}
                {item?.model?.name && item?.model?.name !== ""
                  ? item?.model?.name
                  : "-"}{" "}
                {item?.name && item?.name !== "" ? item?.name : "-"}
              </th>
            ))}
          </tr>
        </thead> */}

        <tbody>
          <tr>
            <th className="col-2">No. Of Cylinders</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.cylinders !== "" ? item?.cylinders : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Displacement (cc)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.displacement !== "" ? item?.displacement : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Horse Power (hp)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.power !== "" ? item?.power : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Peak Torque (Nm)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.torque && item?.torque !== "" ? item?.torque : "-"}{" "}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Fuel Type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.fuelType && item?.fuelType !== "" ? item?.fuelType : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h4 className="table_heads">Transmission</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">Drive</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.drive !== "" ? item?.drive : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Transmission</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.transmission && item?.transmission !== ""
                  ? item?.transmission
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">GearBox</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.gearBox && item?.gearBox !== "" ? item?.gearBox : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h4 className="table_heads">Fuel Efficiency</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">Fuel Tank Size (L)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.fuelTankSize && item?.fuelTankSize !== ""
                  ? item?.fuelTankSize
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Fuel Consumption (kmpl)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.fuelConsumption && item?.fuelConsumption !== ""
                  ? item?.fuelConsumption
                  : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/*<Ad728x90 />*/}

      <h4 className="table_heads">Performance</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">0 to 100 (s)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.zeroToHundred && item?.zeroToHundred !== ""
                  ? item?.zeroToHundred
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Top Speed (km/h)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.topSpeed && item?.topSpeed !== "" ? item?.topSpeed : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h4 className="table_heads">Electric/Alternative Fuel</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">Motor Type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.motorType && item?.motorType !== ""
                  ? item?.motorType
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">No. of Motors</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.motor && item?.motor !== "" ? item?.motor : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Battery Capacity (kWh)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.batteryCapacity && item?.batteryCapacity !== ""
                  ? item?.batteryCapacity
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Charging Time</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.chargingTime && item?.chargingTime !== ""
                  ? item?.chargingTime
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Battery Warranty</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.batteryWarranty && item?.batteryWarranty !== ""
                  ? item?.batteryWarranty
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Range (km)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.range && item?.range !== "" ? item?.range : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h4 className="table_heads">Safety</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">Front Brake</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.frontBrakes && item?.frontBrakes !== ""
                  ? item?.frontBrakes
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Rear Brake</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.rearBreak && item?.rearBreak !== ""
                  ? item?.rearBreak
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Front Airbags</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveFrontAirbags && item?.haveFrontAirbags !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Rear Airbags</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveRearAirbags && item?.haveRearAirbags !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Side Airbags</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveSideAirbags && item?.haveSideAirbags !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Euro NCAP</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.euroNcap && item?.euroNcap !== "" ? item?.euroNcap : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Front Park Assist</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveFrontParkAssist && item?.haveFrontParkAssist !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Rear Park Assist</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveRearParkAssist && item?.haveRearParkAssist !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Rear Parking Camera</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveRearParkingCamera &&
                item?.haveRearParkingCamera !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">360 Parking Camera</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.have360ParkingCamera && item?.have360ParkingCamera !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Crusie Control</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveCruiseControl && item?.haveCruiseControl !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Adaptive Cruise Control</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveAdaptiveCuriseControl &&
                item?.haveAdaptiveCuriseControl !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Lane Change Assist</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveLaneChangeAssist && item?.haveLaneChangeAssist !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {/*<Ad728x90 />*/}

      <h4 className="table_heads">Dimensions</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">Body Type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.bodyType && item?.bodyType !== "" ? item?.bodyType : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">No. Of Doors</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.doors && item?.doors !== "" ? item?.doors : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Length (m)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.length && item?.length !== "" ? item?.length : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Width (m)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.width && item?.width !== "" ? item?.width : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Height (m)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.height && item?.height !== "" ? item?.height : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Wheelbase (m)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.wheelbase && item?.wheelbase !== ""
                  ? item?.wheelbase
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Weight (kg)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.weight && item?.weight !== "" ? item?.weight : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Front Tyres</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.tyresFront && item?.tyresFront !== ""
                  ? item?.tyresFront
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Rear Tyres</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.tyresRear && item?.tyresRear !== ""
                  ? item?.tyresRear
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-2">Cargo Space (L)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.cargoSpace && item?.cargoSpace !== ""
                  ? item?.cargoSpace
                  : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h4 className="table_heads">Interior</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-2">Leather Interior</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveLeatherInterior && item?.haveLeatherInterior !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Fabric Interior</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveFabricInterior && item?.haveFabricInterior !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Rear Seat Entertainment</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveRearSeatEntertainment &&
                item?.haveRearSeatEntertainment !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Seat Cooling</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveCooledSeats && item?.haveCooledSeats !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Climate Control</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveClimateControl && item?.haveClimateControl !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Seating Capacity</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.seatingCapacity && item?.seatingCapacity !== ""
                  ? item?.seatingCapacity
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Apple CarPlay</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveAppleCarPlay && item?.haveAppleCarPlay !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-2">Android Auto</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-2">
                {item?.haveAndroidAuto && item?.haveAndroidAuto !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
