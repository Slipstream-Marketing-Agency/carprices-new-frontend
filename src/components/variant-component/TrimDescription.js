
import Price from "@/utils/Price";
import React from "react";

export default function TrimDescription({ trim }) {
  const engineText =
    (trim?.displacement / 1000).toFixed(1) + "L " + trim?.engine;

  const features = [
    trim?.haveAppleCarPlay && "Apple CarPlay",
    trim?.haveAndroidAuto && "Android Auto",
    trim?.haveCruiseControl && "cruise control",
    trim?.haveClimateControl && "climate control",
  ].filter(Boolean);

  const airbags = trim?.airbags;
  const hasABS = trim?.haveABS;
  const hasFrontParkAssist = trim?.haveFrontParkAssist;

  let safetyFeature = "";
  if (airbags === 1) {
    safetyFeature += "1 airbag";
  } else if (airbags > 1) {
    safetyFeature += `${airbags} airbags`;
  }

  if (hasABS && hasFrontParkAssist && airbags !== "") {
    safetyFeature += ", ABS, and front park assist";
  } else if (hasABS && hasFrontParkAssist && airbags === "") {
    safetyFeature += "ABS, and front park assist";
  } else if (hasABS && !hasFrontParkAssist && airbags === "") {
    safetyFeature += " ABS";
  } else if (hasABS && !hasFrontParkAssist && airbags !== "") {
    safetyFeature += " and ABS";
  } else if (!hasABS && hasFrontParkAssist) {
    safetyFeature += " and front park assist";
  }

  const outputString = `${safetyFeature}`;

  const TransmissionList = (transmission) => {
    let type;
    let speed;
    if (transmission?.includes("A")) {
      type = "automatic";
      speed = `${transmission?.slice(0, -1)}-speed ${type}`;
    } else if (transmission?.includes("M")) {
      type = "manual";
      speed = `${transmission?.slice(0, -1)}-speed ${type}`;
    } else {
      type = "CVT";
      speed = transmission;
    }
    return `${speed}`;
  };

  return (
    <div className="mb-10">
      <h2 className="font-semibold mb-5">Overview</h2>
      <table className="min-w-full rounded-full bg-white border border-solid border-gray-200">
        <tbody className="text-gray-800 text-sm">
          <tr className="border-b border-gray-200">
            <td className="py-4 px-6 font-semibold border-r border-gray-200">
              Price
            </td>
            <td className="py-4 px-6">
              The {trim?.brand?.name} {trim?.name} is priced at{" "}
              <b>
                {trim?.price === null ? (
                  <Price data={trim?.price} />
                ) : (
                  <>
                    AED <Price data={trim?.price} />
                  </>
                )}
              </b>
              .
            </td>
          </tr>
          {trim?.fuelType === "Electric" ? (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Motor
              </td>
              <td className="py-4 px-6">
                It comes with a <b>{trim?.motor}</b>.
              </td>
            </tr>
          ) : trim?.fuelType === "Hybrid" ? (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Engine
              </td>
              <td className="py-4 px-6">
                It is equipped with a <b>{engineText}</b> engine.
              </td>
            </tr>
          ) : (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Engine
              </td>
              <td className="py-4 px-6">
                It is equipped with a <b>{engineText}</b> engine.
              </td>
            </tr>
          )}
          {trim?.fuelType === "Electric" || !trim?.gearBox ? null : (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Transmission
              </td>
              <td className="py-4 px-6">
                It comes with a <b>{TransmissionList(trim?.gearBox)}</b>{" "}
                gearbox.
              </td>
            </tr>
          )}
          {trim?.fuelType === "Electric" ||
          (trim?.fuelType === "Hybrid" && trim?.range) ? (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Range
              </td>
              <td className="py-4 px-6">
                The claimed range is <b>{trim?.range}km</b> on a single charge.
              </td>
            </tr>
          ) : null}
          {trim?.fuelType === "Electric" ||
          (trim?.fuelType === "Hybrid" && trim?.batteryCapacity) ? (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Battery Capacity
              </td>
              <td className="py-4 px-6">
                It comes with a <b>{trim?.batteryCapacity}</b> battery.
              </td>
            </tr>
          ) : null}
          {features.length > 0 && (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Features
              </td>
              <td className="py-4 px-6">
                Key features include{" "}
                {features.map((feature, index) => (
                  <b key={feature}>
                    {index > 0 && index < features.length - 1 ? ", " : ""}
                    {index > 0 && index === features.length - 1 ? " and " : ""}
                    {feature}
                  </b>
                ))}
                .
              </td>
            </tr>
          )}
          <tr className="border-b border-gray-200">
            <td className="py-4 px-6 font-semibold border-r border-gray-200">
              Safety
            </td>
            <td className="py-4 px-6">
              Safety components consist of <b>{outputString}</b> ensuring a
              secure driving experience.
            </td>
          </tr>
          {trim?.cargoSpace && (
            <tr className="border-b border-gray-200">
              <td className="py-4 px-6 font-semibold border-r border-gray-200">
                Boot Space
              </td>
              <td className="py-4 px-6">
                It offers <b>{trim?.cargoSpace}L</b> of cargo space.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
