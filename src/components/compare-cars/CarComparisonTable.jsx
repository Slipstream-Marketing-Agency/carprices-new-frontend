import React, { useEffect, useMemo, useRef, useState } from "react";


export default function CarComparisonTable({ tableData }) {
  console.log(tableData, "tableData");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const columnCount = tableData.length + 1;
  const columnWidth = `${100 / columnCount}%`;
  return (
    <>
      <div className="single-compare mb-50" id="car-info">
        <div className="section-title mb-20">
          <h5>Engine</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <thead className={`car-details-menu ${isSticky ? "sticky" : ""}`}>
              <tr>
                <th style={{ width: columnWidth }}>Specs</th>
                {tableData.map((item, idx) => (
                  <>
                    <th style={{ width: columnWidth }}>{item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}</th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>No. Of Cylinders</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.cylinders ? item.cylinders : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Displacement (cc)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.displacement ? item.displacement : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Power (hp)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.power ? item.power : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Peak Torque (Nm)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.torque ? item.torque : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Fuel Type</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.fuelType ? item.fuelType : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="engine">
        <div className="section-title mb-20">
          <h5>Transmission</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>Drive</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.drive ? item.drive : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Transmission Type</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.transmission ? item.transmission : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>No. of Gears</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {" "}
                    {item?.gearBox && item?.gearBox !== ""
                      ? item?.gearBox === "CVT"
                        ? "-"
                        : item?.gearBox.slice(0, -1) + "-speed"
                      : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="performance">
        <div className="section-title mb-20">
          <h5>Fuel Efficiency</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>Fuel Tank Size (L)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.fuelTankSize ? item.fuelTankSize : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Fuel Consumption (kmpl)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.fuelConsumption ? item.fuelConsumption : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="comfort">
        <div className="section-title mb-20">
          <h5>Performance</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>0 to 100 (s)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.zeroToHundred ? item.zeroToHundred : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Top Speed (km/h)</td>
                {tableData.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.topSpeed ? item.topSpeed : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20">
          <h5>Electric/Alternative Fuel</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>Motor Type</td>
                {tableData?.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.motorType ? item.motorType : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>No. of Motors</td>
                {tableData?.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.motor ? item.motor : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Battery Capacity (kWh)</td>
                {tableData?.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.batteryCapacity ? item.batteryCapacity : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Charging Time</td>
                {tableData?.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.chargingTime ? item.chargingTime : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Battery Warranty</td>
                {tableData?.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>
                    {item?.batteryWarranty ? item.batteryWarranty : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Range (km)</td>
                {tableData?.map((item, idx) => (
                  <td key={idx} style={{ width: columnWidth }}>{item?.range ? item.range : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="comfort">
        <div className="section-title mb-20">
          <h5>Safety</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>Front Brake</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.frontBrakes ? item.frontBrakes : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Rear Brake</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.rearBrakes ? item.rearBrakes : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Front Airbags</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveFrontAirbags ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Rear Airbags</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveRearAirbags ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Side Airbags</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveSideAirbags ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Front Park Assist</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.haveFrontParkAssist ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Rear Park Assist</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveRearParkAssist ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Rear Parking Camera</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.haveRearParkingCamera ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>360 Parking Camera</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.have360ParkingCamera ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Cruise Control</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveCruiseControl ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Adaptive Cruise Control</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.haveAdaptiveCruiseControl ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Lane Change Assist</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.haveLaneChangeAssist ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20">
          <h5>Dimensions</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>Body Type</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.bodyType ? item.bodyType : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>No. Of Doors</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.doors ? item.doors : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Length (mm)</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.length ? item.length : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Width (mm)</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.width ? item.width : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Height (mm)</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.height ? item.height : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Wheelbase (mm)</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.wheelbase ? item.wheelbase : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Weight (kg)</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.weight ? item.weight : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Front Tyres</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.tyresFront ? item.tyresFront : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Rear Tyres</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.tyresRear ? item.tyresRear : "-"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Cargo Space (L)</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.cargoSpace ? item.cargoSpace : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20">
          <h5>Interior</h5>
        </div>
        <div className="table-wrapper">
          <table className="eg-table compare-table">
            <tbody>
              <tr>
                <td style={{ width: columnWidth }}>Leather Interior</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.haveLeatherInterior ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Fabric Interior</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveFabricInterior ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Rear Seat Entertainment</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.haveRearSeatEntertainment ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Seat Cooling</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveCooledSeats ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Climate Control</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveClimateControl ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Seating Capacity</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>
                    {item?.seatingCapacity ? item.seatingCapacity : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Apple CarPlay</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveAppleCarPlay ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr>
                <td style={{ width: columnWidth }}>Android Auto</td>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: columnWidth }}>{item?.haveAndroidAuto ? "Yes" : "No"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
