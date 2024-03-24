import React from "react";
import { useContext } from "react";
import Price from "../common/Price";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";

export default function TrimDescription({ trim }) {
  // const availableTrim = trim?.trims?.filter((item) => item.year === 2023);
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";
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
  } else if (!hasABS && !hasFrontParkAssist) {
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
  };
  return (
    <div id="description" className="my-3 ">
      <div className="white_bg_wrapper">
        <h2 className={`w-100 fw-bold`}>
          {trim?.year} {trim?.brand} {trim?.model} {trim?.name}
        </h2>
        <hr className="my-2 heading-bottom " />
        <div className="car_description mt-3">
          <p>
            <span className="fw-bold">Price: </span> The {trim?.brand?.name}{" "}
            {trim?.name} is priced at{" "}
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
                <b>{t.motor}</b> {t.itComesWith} <b>{trim?.motor}</b>.
              </p>
            ) : trim?.fuelType === "Hybrid" ? (
              <p>
                <b>{t.engine}</b> {t.itIsEquippedWith} <b>{engineText}</b> {t.engine}.
              </p>
            ) : (
              <p>
                <b>{t.engine}</b> {t.itIsEquippedWith} <b>{engineText}</b> {t.engine}.
              </p>
            )}
          </>


          {trim?.fuelType === "Electric" ||
            trim?.gearBox === "" ||
            trim?.gearBox === null ? (
            ""
          ) : (
            <p>
              <b>{t.transmission}: </b>
              {t.itComesWith}<b>{TransmissionList(trim?.gearBox)}</b> gearbox.
            </p>
          )}

          {trim?.fuelType === "Electric" ||
            (trim?.fuelType === "Hybrid" &&
              trim?.range !== "" &&
              trim?.range !== 0) ? (
            <p>
              <b>{t.range}: </b>{t.theclaimedRangeIs} <b>{trim?.range}</b> {t.onASingleCharge}
            </p>
          ) : (
            ""
          )}

          {trim?.fuelType === "Electric" ||
            (trim?.fuelType === "Hybrid" &&
              trim?.batteryCapacity !== "" &&
              trim?.batteryCapacity !== null) ? (
            <p>
              <b>{t.batteryCapacity}: </b>{t.itComesWith}{" "}
              <b>{trim?.batteryCapacity}</b> {t.battery}.
            </p>
          ) : (
            ""
          )}

          <>
            {features.length > 0 && (
              <p>
                <b>{t.features}:</b> {t.keyfeaturesInclude}{" "}
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
            <b>{t.safety}:</b> {t.safetyComponentsConsistOf}<b>{outputString}</b>{" "}
            {t.ensuringASecureDrivingExperience}
          </p>
          {trim?.cargoSpace === "" || trim?.cargoSpace === null ? null : (
            <p>
              <b>{t.bootSpace}: </b>{t.itOffers}<b>{trim?.cargoSpace}L</b> of cargo
              {t.space}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
