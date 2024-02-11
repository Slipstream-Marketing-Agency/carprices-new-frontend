import React from "react";
import { useContext } from "react";
import Price from "../common/Price";

export default function TrimDescription({ trim }) {

  // const availableTrim = trim?.trims?.filter((item) => item.year === 2023);
  const engineText = ((trim?.displacement / 1000).toFixed(1)) + "L " + trim?.engine


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
  else if (!hasABS && !hasFrontParkAssist) {
    safetyFeature += " ";
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
  }
  return (
    <div id="description" className="my-3 ">
      <div className="white_bg_wrapper">
        <h2 className="fw-bold">
          {trim?.year} {trim?.brand} {trim?.model}{" "}
          {trim?.name}
        </h2>
        <div className="car_description mt-3">
          <p>
            <span className="fw-bold">Price: </span> The{" "}
            {trim?.brand?.name} {trim?.name} is priced at{" "}
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
          </p>

          <>
            {trim?.fuelType === "Electric" ? (
              <p>
                <b>Motor:</b> It comes with a <b>{trim?.motor}</b>.
              </p>
            ) : trim?.fuelType === "Hybrid" ? (
              <p>
                <b>Engine:</b> It is equipped with a <b>{engineText}</b>{" "}
                engine.
              </p>
            ) : (
              <p>
                <b>Engine:</b> It is equipped with a <b>{engineText}</b>{" "}
                engine.
              </p>
            )}
          </>

          {trim?.fuelType === "Electric" || trim?.gearBox === "" || trim?.gearBox === null ? (
            ""
          ) : (
            <p>
              <b>Transmission: </b>
              It comes with a{" "}
              <b>{TransmissionList(trim?.gearBox)}</b>{" "}
              gearbox.
            </p>
          )}

          {trim?.fuelType === "Electric" ||
            trim?.fuelType === "Hybrid" && trim?.range !== "" && trim?.range !== null ? (
            <p>
              <b>Range: </b>The claimed range is <b>{trim?.range}</b> on
              a single charge.
            </p>
          ) : (
            ""
          )}

          {trim?.fuelType === "Electric" ||
            trim?.fuelType === "Hybrid" && trim?.batteryCapacity !== "" && trim?.batteryCapacity !== null ? (
            <p>
              <b>Battery Capacity: </b>It comes with a{" "}
              <b>{trim?.batteryCapacity}</b> battery.
            </p>
          ) : (
            ""
          )}

          <>
            {features.length > 0 && (
              <p>
                <b>Features:</b> Key features include{" "}
                {features.map((feature, index) => (
                  <b key={feature}>
                    {index > 0 && index < features.length - 1 ? ", " : ""}
                    {index > 0 && index === features.length - 1 ? " and " : ""}
                    {feature}
                  </b>
                ))}
                .
              </p>
            )}
          </>
          <p>
            <b>Safety:</b> Safety components consist of <b>{outputString}</b>{" "}
            ensuring a secure driving experience.
          </p>
          {trim?.cargoSpace === "" || trim?.cargoSpace === null ? null : (
            <p>
              <b>Boot Space: </b>It offers <b>{trim?.cargoSpace}L</b> of
              cargo space.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
