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
            <th className="col-md-2 col-4"></th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <th className="col-md-2 col-4">
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
            <th className="col-md-2 col-4">No. Of Cylinders</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.cylinders !== "" ? item?.cylinders : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Displacement (cc)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.displacement !== "" ? item?.displacement : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Power (hp)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.power !== "" ? item?.power : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Peak Torque (Nm)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.torque && item?.torque !== "" ? item?.torque : "-"}{" "}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Fuel Type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.fuelType && item?.fuelType !== "" ? item?.fuelType : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Ad728x90 dataAdSlot="4914921658" />
      <h4 className="table_heads">Transmission</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-md-2 col-4">Drive</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.drive !== "" ? item?.drive : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Transmission type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.transmission && item?.transmission !== ""
                  ? item?.transmission
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">No. of Gears</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.gearBox && item?.gearBox !== "" ? item?.gearBox === "CVT"
                  ? "-"
                  : item?.gearBox.slice(0, -1) + "-speed" : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Ad728x90 dataAdSlot="4256446104" />

      <h4 className="table_heads">Fuel Efficiency</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-md-2 col-4">Fuel Tank Size (L)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.fuelTankSize && item?.fuelTankSize !== ""
                  ? item?.fuelTankSize
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Fuel Consumption (kmpl)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.fuelConsumption && item?.fuelConsumption !== ""
                  ? item?.fuelConsumption
                  : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <Ad728x90 dataAdSlot="1630282767" />


      <h4 className="table_heads">Performance</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-md-2 col-4">0 to 100 (s)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.zeroToHundred && item?.zeroToHundred !== ""
                  ? item?.zeroToHundred
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Top Speed (km/h)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
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
            <th className="col-md-2 col-4">Motor Type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.motorType && item?.motorType !== ""
                  ? item?.motorType
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">No. of Motors</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.motor && item?.motor !== "" ? item?.motor : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Battery Capacity (kWh)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.batteryCapacity && item?.batteryCapacity !== ""
                  ? item?.batteryCapacity
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Charging Time</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.chargingTime && item?.chargingTime !== ""
                  ? item?.chargingTime
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Battery Warranty</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.batteryWarranty && item?.batteryWarranty !== ""
                  ? item?.batteryWarranty
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Range (km)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.range && item?.range !== "" ? item?.range : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Ad728x90 dataAdSlot="1438711076" />

      <h4 className="table_heads">Safety</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-md-2 col-4">Front Brake</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.frontBrakes && item?.frontBrakes !== ""
                  ? item?.frontBrakes
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Rear Brake</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.rearBreak && item?.rearBreak !== ""
                  ? item?.rearBreak
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Front Airbags</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveFrontAirbags && item?.haveFrontAirbags !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Rear Airbags</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveRearAirbags && item?.haveRearAirbags !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Side Airbags</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveSideAirbags && item?.haveSideAirbags !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Front Park Assist</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveFrontParkAssist && item?.haveFrontParkAssist !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Rear Park Assist</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveRearParkAssist && item?.haveRearParkAssist !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Rear Parking Camera</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveRearParkingCamera &&
                  item?.haveRearParkingCamera !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">360 Parking Camera</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.have360ParkingCamera && item?.have360ParkingCamera !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Crusie Control</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveCruiseControl && item?.haveCruiseControl !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Adaptive Cruise Control</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveAdaptiveCuriseControl &&
                  item?.haveAdaptiveCuriseControl !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Lane Change Assist</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveLaneChangeAssist && item?.haveLaneChangeAssist !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Ad728x90 dataAdSlot="2560221055" />
      

      <h4 className="table_heads">Dimensions</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-md-2 col-4">Body Type</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.bodyType && item?.bodyType !== "" ? item?.bodyType : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">No. Of Doors</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.doors && item?.doors !== "" ? item?.doors : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Length (mm)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.length && item?.length !== "" ? item?.length : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Width (mm)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.width && item?.width !== "" ? item?.width : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Height (mm)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.height && item?.height !== "" ? item?.height : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Wheelbase (mm)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.wheelbase && item?.wheelbase !== ""
                  ? item?.wheelbase
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Weight (kg)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.weight && item?.weight !== "" ? item?.weight : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Front Tyres</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.tyresFront && item?.tyresFront !== ""
                  ? item?.tyresFront
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Rear Tyres</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.tyresRear && item?.tyresRear !== ""
                  ? item?.tyresRear
                  : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="col-md-2 col-4">Cargo Space (L)</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.cargoSpace && item?.cargoSpace !== ""
                  ? item?.cargoSpace
                  : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <Ad728x90 dataAdSlot="9784104953" />


      <h4 className="table_heads">Interior</h4>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th className="col-md-2 col-4">Leather Interior</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveLeatherInterior && item?.haveLeatherInterior !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Fabric Interior</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveFabricInterior && item?.haveFabricInterior !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Rear Seat Entertainment</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveRearSeatEntertainment &&
                  item?.haveRearSeatEntertainment !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Seat Cooling</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveCooledSeats && item?.haveCooledSeats !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Climate Control</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveClimateControl && item?.haveClimateControl !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Seating Capacity</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.seatingCapacity && item?.seatingCapacity !== ""
                  ? item?.seatingCapacity
                  : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Apple CarPlay</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
                {item?.haveAppleCarPlay && item?.haveAppleCarPlay !== ""
                  ? "Yes"
                  : "No"}
              </td>
            ))}
          </tr>

          <tr>
            <th className="col-md-2 col-4">Android Auto</th>
            {carToCompare?.carToCompare?.map((item, index) => (
              <td className="col-md-2 col-4">
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
