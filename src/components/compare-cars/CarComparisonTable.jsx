import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function CarComparisonTable({ tableData }) {
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";

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
      <div className="single-compare sticky_table_head bg-white p-0" id="car-info">
        <div className="table-wrapper">
          <table className="table mb-0">
            <tbody>
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  ></td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center fw-bold">
                    {item?.year} {item.car_brands?.data[0]?.attributes?.name} {item.car_models?.data[0]?.attributes?.name} {item.name}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="single-compare mb-50" id="car-info">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
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
          <h5 className="ps-2">{t.engine}</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                {/* { !isMobile &&  <tr className={`headingRow h-3`} style={{position:  "sticky",
    top:!isMobile &&  "30px",    height: "35px"}}  >
                <th className="col-md-2 col-4 ps-2">Specs</th>
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4">
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr>} */}
                <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                  {t.NoOfCylinders}
                </p>
              </td>
            )}
            <tbody>
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.NoOfCylinders}
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.cylinders ? item.cylinders : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.displacement} (cc)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.displacement} (cc)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.displacement ? item.displacement : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.power} (hp)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.power} (hp)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.power ? item.power : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.peakTorque} (Nm)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.peakTorque} (Nm)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.torque ? item.torque : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.fuelType}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.fuelType}
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.fuelType
                      ? item.fuelType === "Hybrid"
                        ? "Petrol"
                        : item.fuelType
                      : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="engine">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img
            width={25}
            height={25}
            src="/assets/images/specs/Transmission.png"
            alt="transmission icon"
          />
          <h5 className="ps-2 ">{t.transmission}</h5>
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
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">Drive</p>
              </td>
            )}
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
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.drive}
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.drive ? item.drive : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.transmissionType}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.transmissionType}
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.transmission ? item.transmission : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.NoOfGears}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.NoOfGears}

                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
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
          <img
            width={30}
            height={30}
            src="/assets/img/homepage-filter-icons/fuel-efficiency-black.png"
            alt="transmission icon"
          />

          <h5 className="ps-2">{t.fuelefficiency}</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                  {t.FuelTankSize}(L)
                </p>
              </td>
            )}
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
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.FuelTankSize}(L)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.fuelTankSize ? item.fuelTankSize : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.FuelConsumption} (kmpl)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.FuelConsumption} (kmpl)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.fuelConsumption ? item.fuelConsumption : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="comfort">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img
            width={30}
            height={30}
            src="/assets/img/homepage-filter-icons/performance-black.png"
            alt="performance icon"
          />

          <h5 className="ps-2">{t.performance}</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                  0 to 100 (s)
                </p>
              </td>
            )}
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
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    0 to 100 (s)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.zeroToHundred ? item.zeroToHundred : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.TopSpeed} (km/h)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.TopSpeed} (km/h)
                  </td>
                )}
                {tableData.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.topSpeed ? item.topSpeed : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img
            width={25}
            height={25}
            src="/assets/images/specs/FuelType.png"
            alt="performance icon"
          />

          <h5 className="ps-2">Electric/Alternative Fuel</h5>
        </div>
        {isMobile && (
          <td
            colSpan={tableData.length + 1}
            className="md:text-start text-center"
            style={{ width: "100%" }}
          >
            <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">Motor Type</p>
          </td>
        )}
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
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.MotorType}
                  </td>
                )}
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.motorType ? item.motorType : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.NoOfMotors}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.NoOfMotors}
                  </td>
                )}
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.motor ? item.motor : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.batteryCapacity} (kWh)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.batteryCapacity} (kWh)
                  </td>
                )}
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.batteryCapacity ? item.batteryCapacity : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.ChargingTime}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.ChargingTime}
                  </td>
                )}
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.chargingTime ? item.chargingTime : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.BatteryWarranty}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.BatteryWarranty}
                  </td>
                )}
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.batteryWarranty ? item.batteryWarranty : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.range}(km)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.range} (km)
                  </td>
                )}
                {tableData?.map((item, idx) => (
                  <td key={idx} className="col-md-2 col-4 md:text-start text-center">
                    {item?.range ? item.range : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="comfort">
        <div className="section-title mb-20 align-items-center mt-3 zindexMinusOne">
          <img
            width={30}
            height={30}
            src="/assets/img/homepage-filter-icons/safety-black.png"
            alt="performance icon"
          />

          <h5 className="ps-2">{t.safety}</h5>
        </div>
        <div className="table-wrapper">
          <table className="table ">
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                  {t.FrontBrake}
                </p>
              </td>
            )}
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
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.FrontBrake}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.frontBrakes ? item.frontBrakes : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.RearBrake}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.RearBrake}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.rearBrakes ? item.rearBrakes : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.FrontAirbags}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.FrontAirbags}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveFrontAirbags ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.RearAirbags}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.RearAirbags}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveRearAirbags ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.SideAirbags}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.SideAirbags}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveSideAirbags ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.FrontParkAssist}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.FrontParkAssist}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveFrontParkAssist ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.RearParkAssist}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.RearParkAssist}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveRearParkAssist ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.RearParkingCamera}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.RearParkingCamera}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveRearParkingCamera ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.ParkingCamera}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.ParkingCamera}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.have360ParkingCamera ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.cruiseControl}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.cruiseControl}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveCruiseControl ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.adaptiveCruiseControl}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.adaptiveCruiseControl}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveAdaptiveCruiseControl ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.laneChangeAssist}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.laneChangeAssist}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveLaneChangeAssist ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="safety">
        <div className="section-title mb-20 mt-3 zindexMinusOne">
          <h5>{t.Dimensions}</h5>
        </div>
        <div className="table-wrapper">
          <table className="table">
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">Body Type</p>
              </td>
            )}
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
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.bodyType}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.bodyType ? item.bodyType : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.NoOfDoors}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.NoOfDoors}
                  </td>
                )}

                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.doors ? item.doors : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.Length} (mm)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.Length} (mm)
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.length ? item.length : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.Width} (mm)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    Width (mm)
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.width ? item.width : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.Height} (mm)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.Height} (mm)
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.height ? item.height : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.Wheelbase} (mm)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.Wheelbase} (mm)
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.wheelbase ? item.wheelbase : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.Weight} (kg)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.Weight} (kg)

                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.weight ? item.weight : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.FrontTyres}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.FrontTyres}

                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.tyresFront ? item.tyresFront : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.RearTyres}
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.RearTyres}

                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.tyresRear ? item.tyresRear : "-"}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.CargoSpace} (L)
                  </p>
                </td>
              )}
              <tr className="compareTableRow">
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.CargoSpace} (L)
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.cargoSpace ? item.cargoSpace : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="single-compare mb-50" id="interior">
        <div className="section-title mb-20 mt-3 zindexMinusOne">
          <h5>{t.Interior}</h5>
        </div>

        <div className="table-wrapper ">
          <table className="table ">
            {isMobile && (
              <td
                colSpan={tableData.length + 1}
                className="md:text-start text-center"
                style={{ width: "100%" }}
              >
                <p className="md:text-start text-center w-100 py-2 greyBg">
                  {t.LeatherInterior}
                </p>
              </td>
            )}
            <tbody>
              {/* <tr className="headingRow">
                <th className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"}`} >Specs</th>
                {tableData?.map((item, index) => (
                  <td key={index} className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"}`} >
                    {item?.car_brands?.data[0]?.attributes?.name} {item?.car_models?.data[0]?.attributes?.name} {item?.name}
                  </td>
                ))}
              </tr> */}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.LeatherInterior}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveLeatherInterior ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 greyBg">
                    {t.FabricInterior}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                         {t.FabricInterior}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveFabricInterior ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.RearSeatEntertainment}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.RearSeatEntertainment}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveRearSeatEntertainment ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>

              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                   {t.SeatCooling}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                 {t.SeatCooling}

                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveCooledSeats ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.ClimateControl}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                                   {t.ClimateControl}

                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveClimateControl ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.SeatingCapacity}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                                 {t.SeatingCapacity}

                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.seatingCapacity ? item.seatingCapacity : "-"}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.AppleCarPlay}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow `}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.AppleCarPlay}
                  </td>
                )}
                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveAppleCarPlay ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
              {isMobile && (
                <td
                  colSpan={tableData.length + 1}
                  className="md:text-start text-center"
                  style={{ width: "100%" }}
                >
                  <p className="md:text-start text-center w-100 mb-0 py-2 greyBg">
                    {t.AndroidAuto}
                  </p>
                </td>
              )}
              <tr className={`compareTableRow '}`}>
                {!isMobile && (
                  <td
                    className={`${isMobile ? "w-full" : "col-md-2 col-4 text-left"
                      }`}
                  >
                    {t.AndroidAuto}
                  </td>
                )}

                {tableData?.map((item, index) => (
                  <td key={index} className="col-md-2 col-4 md:text-start text-center">
                    {item?.haveAndroidAuto ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 4.344a1 1 0 0 1 1.415 1.415l-6.4 6.4a1 1 0 0 1-1.415 0l-3.2-3.2a1 1 0 0 1 1.415-1.415L5 10.586l5.327-5.327a1 1 0 0 1 1.415 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="black"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 3.646a.5.5 0 0 0-.708 0L8 7.293 3.354 2.646a.5.5 0 1 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
                      </svg>
                    )}
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
