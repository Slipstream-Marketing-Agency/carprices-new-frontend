import React from "react";
import Price from "../common/Price";
import { formatNumberWithCommas } from "@/src/utils/formatNumber";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

export default function VehicleReview({ trim }) {
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";
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

  const features = [
    trim?.haveAppleCarPlay && "Apple CarPlay",
    trim?.haveAndroidAuto && "Android Auto",
  ].filter(Boolean);
  return (
    <div id="review" className="my-3">
      <div className="white_bg_wrapper">
        <h2 className={`w-100 fw-bold`}>
          {trim?.year} {trim?.brand} {trim?.model} {trim?.name}
          <span> {t.review}</span>
        </h2>
        <hr className="my-2 heading-bottom " />
        <div className="car_description mt-2">
          <p>
            <span>
              {t.meetThe}{trim?.year} {trim?.name} {trim?.model} {trim?.name}, a{" "}
              {trim?.bodyType} {t.pricedAtAED} <Price data={trim?.price} /> .
              {t.itIsEquippedWith}{" "}
              {trim?.fuelType === "Electric" ? (
                trim?.motor + ", "
              ) : (
                <>
                  {(trim?.displacement / 1000).toFixed(1)}L {trim?.engine}{" "}
                  {t.engine},{" "}
                </>
              )}
              {t.itdelivers} {trim?.power}{t.hpOfPowerAnd}{trim?.torque} {t.nmOfTorqueItFeatures}{TransmissionList(trim?.gearBox)}{" "}
              {t.transmissionAndA}{trim?.drive} {t.driveSystemForSmoothHandling}{trim?.fuelType} {t.drivetrainWithA} {" "}
              {trim?.fuelType === "Electric" ? t.range : t.fuelefficiency}
              {t.of}{" "}
              {trim?.fuelType === "Electric"
                ? trim?.range
                : trim?.fuelConsumption + "kmpl"}
              {t.keySafetyComponentsIncludeABS}{trim?.airbags} {t.airbags},{" "}
              {trim?.haveCruiseControl ? "cruise control" : ""}. It is a{" "}
              {trim?.seatingCapacity}{" "}
              {trim?.haveAppleCarPlay || trim?.haveAndroidAuto
                ? "and supports "
                : ""}
              {trim?.haveAppleCarPlay ? "Apple CarPlay" : ""}{" "}
              {trim?.haveAppleCarPlay || trim?.haveAndroidAuto ? "and " : ""}
              {trim?.haveAndroidAuto ? "Android Auto" : ""}{t.itMeasures}{" "}
              {formatNumberWithCommas(trim?.length)}{t.mmInLength},{" "}
              {formatNumberWithCommas(trim?.width)}{t.mmInWidth}{" "}
              {formatNumberWithCommas(trim?.height)}{t.mmInHeight}
              {trim?.cargoSpace
                ? ` ${t.andHas} ${formatNumberWithCommas(
                    trim?.cargoSpace
                  )}${t.lOfCargoSpace}.`
                : "."}
            </span>
          </p>
        </div>
        {/* <div className="d-flex mt-3">
          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.images[3]?.image} />
          </div>

          <div className="w-50 pe-3 review_images">
            <FeaturedImage width={100} height={100} src={trim?.images[4]?.image} />
          </div>
        </div> */}
        <div className="accordion mt-3" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                {trim?.brand} {trim?.model} {trim?.name} Exterior
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <b>{t.bodyType}:</b> {t.the} {trim?.year} {trim?.brand} {trim?.model}{" "}
                {trim?.name} is a {trim?.bodyType}.
                <br />
                <b>{t.Dimensions}:</b> {t.the} {trim?.year} {trim?.brand} {trim?.model}{" "}
                {trim?.name} {""}{t.is}{" "}
                {trim?.length ? formatNumberWithCommas(trim?.length) : "-"}{t.mmInLength}, {formatNumberWithCommas(trim?.width)}{t.mmInWidth}, and{" "}
                {formatNumberWithCommas(trim?.height)}{t.mmInHeight}.
                <br />
                <b>{t.Wheelbase}:</b> {t.the} {trim?.year} {trim?.brand} {trim?.model}{" "}
                {trim?.name} {t.features}{" "}
                {formatNumberWithCommas(trim?.wheelbase)}{t.mmWheelbase}<br />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                {trim?.brand} {trim?.model} {trim?.name} {t.interior}
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <b>{t.SeatingCapacity}:</b> {t.the} {trim?.year} {trim?.brand}{" "}
                {trim?.model} {trim?.name} {t.seatingForUpTo}{" "}
                {trim?.seatingCapacity && trim?.seatingCapacity?.split(" ")[0]}{" "}
                {t.passengers}. <br />
                <b>{t.upHolstery}:</b> {t.theInteriorIsFinished}{" "}
                {trim?.haveLeatherInterior ? t.leather : ""}{" "}
                {trim?.haveFabricInterior ? t.fabric : ""}
                <>
                  {features.length > 0 && (
                    <>
                      <br />
                      <b>{t.connectivity}:</b> {t.compatibilityFor}{" "}
                      {features.map((feature, index) => (
                        <b key={feature}>
                          {index > 0 && index < features.length - 1 ? ", " : ""}
                          {index > 0 && index === features.length - 1
                            ? " and "
                            : ""}
                          {feature}
                        </b>
                      ))}{" "}
                      {t.isProvided}
                    </>
                  )}
                </>
                <br />
                {trim?.haveRearSeatEntertainment ? (
                  <>
                    <b>{t.entertainment}:</b> {t.enjoyTheConvenienceOfRearSeatEntertainment}
                    <br />
                  </>
                ) : (
                  ""
                )}
                {trim?.haveCooledSeats || trim?.haveClimateControl ? (
                  <>
                    <b>{t.comfort}:</b> {t.the} {trim?.year} {trim?.brand} {trim?.model}{" "}
                    {trim?.name} {t.offersComfortFeaturesSuch}
                    {trim?.haveCooledSeats ? " ventilated seats " : ""}
                    {trim?.haveCooledSeats && trim?.haveClimateControl
                      ? " and"
                      : ""}
                    {trim?.haveClimateControl ? " climate control" : ""}.
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
