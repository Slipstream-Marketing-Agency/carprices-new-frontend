import React from "react";
import { useContext } from "react";
import Price from "../common/Price";

export default function TrimDescription({ trim }) {

  // const availableTrim = trim?.trims?.filter((item) => item.year === 2023);
  const engineText = ((trim?.trim?.displacement / 1000).toFixed(1)) + "L " + trim?.trim?.engine


  const features = [
    trim?.trim?.haveAppleCarPlay && "Apple CarPlay",
    trim?.trim?.haveAndroidAuto && "Android Auto",
    trim?.trim?.haveCruiseControl && "cruise control",
    trim?.trim?.haveClimateControl && "climate control",
  ].filter(Boolean);

  const airbags = trim?.trim?.airbags;
  const hasABS = trim?.trim?.haveABS;
  const hasFrontParkAssist = trim?.trim?.haveFrontParkAssist;

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
    <div id="description" className="my-3">
      <div className="white_bg_wrapper my-3">
        <h2 className="fw-bold">
          {trim?.trim?.year} {trim?.trim?.brand?.name} {trim?.trim?.model?.name}{" "}
          {trim?.trim?.name}
        </h2>
        <div className="car_description mt-3">
          <p>
            <span className="fw-bold">Price: </span> The{" "}
            {trim?.trim?.brand?.name} {trim?.trim?.name} is priced at{" "}
            <b>
              {trim?.trim?.price === null ? (
                <Price data={trim?.trim?.price} />
              ) : (
                <>
                  AED <Price data={trim?.trim?.price} />
                </>
              )}
            </b>
            .
          </p>

          <>
            {trim?.trim?.fuelType === "Electric" ? (
              <p>
                <b>Motor:</b> It comes with a <b>{trim?.trim?.motor}</b>.
              </p>
            ) : trim?.trim?.fuelType === "Hybrid" ? (
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

          {trim?.trim?.fuelType === "Electric" || trim?.trim?.gearBox === "" || trim?.trim?.gearBox === null ? (
            ""
          ) : (
            <p>
              <b>Transmission: </b>
              It comes with a{" "}
              <b>{TransmissionList(trim?.trim?.gearBox)}</b>{" "}
              gearbox.
            </p>
          )}

          {trim?.trim?.fuelType === "Electric" ||
            trim?.trim?.fuelType === "Hybrid" && trim?.trim?.range !== "" && trim?.trim?.range !== null ? (
            <p>
              <b>Range: </b>The claimed range is <b>{trim?.trim?.range}</b> on
              a single charge.
            </p>
          ) : (
            ""
          )}

          {trim?.trim?.fuelType === "Electric" ||
            trim?.trim?.fuelType === "Hybrid" && trim?.trim?.batteryCapacity !== "" && trim?.trim?.batteryCapacity !== null ? (
            <p>
              <b>Battery Capacity: </b>It comes with a{" "}
              <b>{trim?.trim?.batteryCapacity}</b> battery.
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
          {trim?.trim?.cargoSpace === "" || trim?.trim?.cargoSpace === null ? null : (
            <p>
              <b>Boot Space: </b>It offers <b>{trim?.trim?.cargoSpace}L</b> of
              cargo space.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
