import React, { useEffect, useMemo, useRef, useState } from "react";


export default function CarComparisonTable({ tableData }) {
  console.log(tableData, "tableData");
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


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
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
          <h5 className="ps-2">Engine</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
          {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
        {/* { !isMobile &&  <tr className={`headingRow h-3`} style={{position:  "sticky",
    top:!isMobile &&  "30px",    height: "35px"}}  >
                <th className="col-md-2 col-4 ps-2">Specs</th>
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr>} */}
                <p className="text-center w-100 mb-0 py-2 greyBg">No. Of Cylinders</p>
              </td>}
            <tbody>
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>No. Of Cylinders</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.cylinders ? item.cylinders : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Displacement (cc)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Displacement (cc)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.displacement ? item.displacement : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Power (hp)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Power (hp)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.power ? item.power : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Peak Torque (Nm)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Peak Torque (Nm)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.torque ? item.torque : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Fuel Type</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Fuel Type</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.fuelType ? (item.fuelType === "Hybrid" ? "Petrol" : item.fuelType) : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="engine">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img width={25} height={25} src="/assets/images/specs/Transmission.png" alt="transmission icon" />
          <h5 className="ps-2 ">Transmission</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
          {/* <tr className={`headingRow p-3`} style={{position:  "sticky",
    top:!isMobile &&  "30px",background:"var(--light)"}}  >
                <th className="col-md-2 col-4">Specs</th>
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
          {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Drive</p>
              </td>}
            <tbody>

          {/* {!isMobile &&  <tr className={`headingRow ${isSticky ? "sticky" : ""}`} style={{position:  "sticky",
    top:!isMobile &&  "30px",background:"var(--light)"}}  >
                <th className="col-md-2 col-4">Specs</th>
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr>
} */}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Drive</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.drive ? item.drive : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Transmission Type</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Transmission Type</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.transmission ? item.transmission : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">No. of Gears</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>No. of Gears</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">
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
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img width={30} height={30} src="/assets/img/homepage-filter-icons/fuel-efficiency-black.png" alt="transmission icon" />


          <h5 className="ps-2">Fuel Efficiency</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
        {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Fuel Tank Size (L)</p>
              </td>}
            <tbody>
              {/* <tr className="headingRow">
                <th className="col-md-2 col-4">Specs</th>
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Fuel Tank Size (L)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.fuelTankSize ? item.fuelTankSize : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Fuel Consumption (kmpl)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Fuel Consumption (kmpl)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.fuelConsumption ? item.fuelConsumption : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="comfort">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img width={30} height={30} src="/assets/img/homepage-filter-icons/performance-black.png" alt="performance icon" />

          <h5 className="ps-2">Performance</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
        {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">0 to 100 (s)</p>
              </td>}
            <tbody>
              {/* <tr className="headingRow">
                <th className="col-md-2 col-4">Specs</th>
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>0 to 100 (s)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.zeroToHundred ? item.zeroToHundred : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Top Speed (km/h)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Top Speed (km/h)</td>}       
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.topSpeed ? item.topSpeed : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">

          <img width={25} height={25} src="/assets/images/specs/FuelType.png" alt="performance icon" />

          <h5 className="ps-2">Electric/Alternative Fuel</h5>
        </div>
        {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Motor Type</p>
              </td>}
        <div className="table-wrapper">
          <table className="table ">
            <tbody>
              {/* <tr className="headingRow">
                <th className="col-md-2 col-4">Specs</th>
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Motor Type</td>}       
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.motorType ? item.motorType : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">No. of Motors</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>No. of Motors</td>}       
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.motor ? item.motor : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Battery Capacity (kWh)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Battery Capacity (kWh)</td>}       
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.batteryCapacity ? item.batteryCapacity : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Charging Time</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Charging Time</td>}       
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.chargingTime ? item.chargingTime : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Battery Warranty</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Battery Warranty</td>}       
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.batteryWarranty ? item.batteryWarranty : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Range (km)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Range (km)</td>}       
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 text-center">{item?.range ? item.range : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="comfort">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">

          <img width={30} height={30} src="/assets/img/homepage-filter-icons/safety-black.png" alt="performance icon" />

          <h5 className="ps-2">Safety</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
             <p className="text-center w-100 mb-0 py-2 greyBg">Front Brake</p>
           </td>}
            <tbody>
              {/* <tr className="headingRow">
                <th className="col-md-2 col-4 ">Specs</th>
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Front Brake</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.frontBrakes ? item.frontBrakes : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Rear Brake</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Rear Brake</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.rearBrakes ? item.rearBrakes : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Front Airbags</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Front Airbags</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveFrontAirbags ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Rear Airbags</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Rear Airbags</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveRearAirbags ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Side Airbags</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Side Airbags</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveSideAirbags ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Front Park Assist</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Front Park Assist</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveFrontParkAssist ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Rear Park Assist</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Rear Park Assist</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveRearParkAssist ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Rear Parking Camera</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Rear Parking Camera</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveRearParkingCamera ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">360 Parking Camera</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>360 Parking Camera</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.have360ParkingCamera ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Cruise Control</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Cruise Control</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveCruiseControl ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Adaptive Cruise Control</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Adaptive Cruise Control</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveAdaptiveCruiseControl ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Lane Change Assist</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Lane Change Assist</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.haveLaneChangeAssist ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                  </svg>}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20 mt-3 zindexMinusOne">
          <h5>Dimension</h5>
        </div>
        <div className="table-wrapper">
          <table className="table">
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Body Type</p>
              </td>}
            <tbody>
              {/* <tr className="headingRow">
                <th className="col-md-2 col-4 ">Specs</th>
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Body Type</td>}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.bodyType ? item.bodyType : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">No. Of Doors</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>No. Of Doors</td>}
                
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.doors ? item.doors : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Length (mm)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Length (mm)</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.length ? item.length : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Width (mm)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Width (mm)</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.width ? item.width : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Height (mm)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Height (mm)</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.height ? item.height : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Wheelbase (mm)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Wheelbase (mm)</td>}      
                               {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.wheelbase ? item.wheelbase : "-"}</td>
                ))}
              </tr>

              
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Weight (kg)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Weight (kg)</td>}                 
                    {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.weight ? item.weight : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Front Tyres</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Front Tyres</td>}               
                      {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.tyresFront ? item.tyresFront : "-"}</td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Rear Tyres</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Rear Tyres</td>}     
                                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.tyresRear ? item.tyresRear : "-"}</td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Cargo Space (L)</p>
              </td>}
              <tr className="compareTableRow">
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Cargo Space (L)</td>}          
                           {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">{item?.cargoSpace ? item.cargoSpace : "-"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="interior">
        <div className="section-title mb-20 mt-3 zindexMinusOne">
          <h5>Interior</h5>
        </div>
            
        <div className="table-wrapper ">
          <table className="table ">
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 py-2 greyBg">Leather  Interior</p>
              </td>}
            <tbody>
              {/* <tr className="headingRow">
                <th style={{ width: isMobile ? '100%' : columnWidth }}>Specs</th>
                {tableData?.map((item, index) => (
                  <td key={index} style={{ width: isMobile ? '100%' : columnWidth }}>
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className={`compareTableRow '}`} >
                
                {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Leather Interior</td>}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveLeatherInterior ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 greyBg">Fabric Interior</p>
              </td>}
              <tr className={`compareTableRow '}`} >
                {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Fabric Interior</td>}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveFabricInterior ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Rear Seat Entertainment</p>
              </td>}
              <tr className={`compareTableRow '}`}>
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Rear Seat Entertainment</td>}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveRearSeatEntertainment ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>

              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Seat Cooling</p>
              </td>}
              <tr className={`compareTableRow '}`}>
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Seat Cooling</td>}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveCooledSeats ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Climate Control</p>
              </td>}
              <tr className={`compareTableRow '}`}>
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Climate Control</td>}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveClimateControl ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Seating Capacity</p>
              </td>}
              <tr className={`compareTableRow '}`}>
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Seating Capacity</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.seatingCapacity ? item.seatingCapacity : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Apple CarPlay</p>
              </td>}
              <tr className={`compareTableRow `}>
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Apple CarPlay</td>}       
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveAppleCarPlay ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>
              {isMobile && <td colSpan={tableData.length + 1} className="text-center" style={{ width: '100%' }}>
                <p className="text-center w-100 mb-0 py-2 greyBg">Android Auto</p>
              </td>}
              <tr className={`compareTableRow '}`}>
              {!isMobile && <td style={{ width: isMobile ? '100%' : columnWidth }}>Android Auto</td>}

                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 text-center">
                    {item?.haveAndroidAuto ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                    </svg>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>



    </>
  );
}
