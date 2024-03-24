import React, { useEffect } from "react";
import Ad300x250 from "../ads/Ad300x250";
import { useState } from "react";
import Slider from "react-slick";
import { useContext } from "react";
import { ModelContext } from "../model-detail-page/ModelContext";
import FeaturedImage from "../common/FeaturedImage";
import Price from "../common/Price";
import { useRef } from "react";
import Image from "next/image";
import { Galleria } from "primereact/galleria";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";

export default function TrimOverview({ trim }) {
  const router = useRouter();
  const t = useTranslate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [currentImage, setCurrentImage] = useState("");
  const selectedImageRef = useRef(null);

  const [thumbnailArray, setThumbnailArray] = useState(trim?.trim?.images);
  useEffect(() => {
    if (trim?.trim?.featuredImage && thumbnailArray?.length > 0) {
      thumbnailArray[0] = { image: trim?.trim?.featuredImage }; // Replace value at first index
    }
    setCurrentImage(
      trim?.trim?.featuredImage !== ""
        ? trim?.trim?.featuredImage
        : trim?.trim?.images[0]?.image
    );
  }, [trim]);

  const handleArrowClick = (direction) => {
    const currentIndex = trim?.trim?.images.findIndex(
      (item) => item.image === currentImage
    );

    if (direction === "left") {
      const newIndex =
        currentIndex > 0 ? currentIndex - 1 : trim?.trim?.images.length - 1;
      setCurrentImage(trim?.trim?.images[newIndex]?.image);
    } else if (direction === "right") {
      const newIndex =
        currentIndex < trim?.trim?.images.length - 1 ? currentIndex + 1 : 0;
      setCurrentImage(trim?.trim?.images[newIndex]?.image);
    }
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const [price, setPrice] = useState(
    trim?.trim?.price ? trim?.trim?.price : ""
  );
  const [years, setYears] = useState("5");
  const [interestRate, setInterestRate] = useState(2.5);
  const [downPayment, setDownPayment] = useState(20);
  const [downPaymentResult, setDownPaymentResult] = useState(0);
  const [totalCostResult, setTotalCostResult] = useState(0);
  const [monthlyRepaymentResult, setMonthlyRepaymentResult] = useState(0);

  const calculateEMI = () => {
    const p =
      parseFloat(price) - (parseFloat(downPayment) / 100) * parseFloat(price);
    const r = parseFloat(interestRate) / 100 / 12; // monthly interest rate
    const n = parseFloat(years) * 12; // loan tenure in months

    const emi = (
      (p * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
    ).toFixed(2);
    setMonthlyRepaymentResult(emi);

    const totalCost = (emi * n).toFixed(2);
    setTotalCostResult(totalCost);
    const totalInterestPayment = (totalCost - p).toFixed(2);
    setDownPaymentResult(totalInterestPayment);
  };

  const [images, setImages] = useState(trim?.trim?.images);
  const imagesArray = trim?.trim?.images || []; // Handle null or undefined case
  const newObject = { image: trim?.trim?.featuredImage };

  const newImageArray = [...imagesArray]; // Create a copy of the original array
  newImageArray.splice(0, 0, newObject); // Add newObject at the first index

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 3,
    },
  ];

  const itemTemplate = (item) => {
    return (
      <div className="image_container">
        <Image
          width={500}
          height={500}
          src={process.env.NEXT_PUBLIC_S3_URL + item?.image}
          alt={""}
        />
      </div>
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <>
        <Image
          width={65}
          height={65}
          src={process.env.NEXT_PUBLIC_S3_URL + item?.image}
          alt={trim?.trim?.name}
          className="w-100"
        />
      </>
    );
  };
  return (
    <section>
      <div className="car_overview mb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <Galleria
                        value={newImageArray}
                        responsiveOptions={responsiveOptions}
                        numVisible={5}
                        item={itemTemplate}
                        thumbnail={thumbnailTemplate}
                        className="custom_galleria"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 mt-3 btn btn-primary pt-2 add_to_compare">
                  <a
                    href=""
                    className="d-flex justify-content-center align-items-center"
                  >
                    <i className="bi bi-shuffle me-2" />
                    <small className="fw-bold">Add to compare</small>
                  </a>
                </div> */}
                {/* <div className="col-12 white_bg_wrapper mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <a href="" className="custom_icons">
                      <i className="bi bi-car-front-fill" />
                      <small>Variants</small>
                    </a>
                    <a href="#user_review" className="custom_icons">
                      <i className="bi bi-stars" />
                      <small>Reviews</small>
                    </a>
                    <a href="" className="custom_icons">
                      <i className="bi bi-heart" />
                      <small>Wishlist</small>
                    </a>
                    <a href="" className="custom_icons">
                      <i className="bi bi-share" />
                      <small>Share</small>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-end">
                <h1 className="fw-bold">
                  {trim?.trim?.year} {trim?.trim?.brand?.name}{" "}
                  {trim?.trim?.model?.name} {trim?.trim?.name}
                </h1>
              </div>
              {/* <div className="startRating">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-half" />
                <i className="bi bi-star" />
                <i className="bi bi-star" />
                <small className="fw-bold ms-2">130 reviews</small>
                <small className="primary_badge_wrapper fw-bold pointer ms-2">
                  Write a review
                </small>
              </div> */}
              <div className="car_price d-flex align-items-end my-1">
                <span className="price text-primary">
                  AED <Price data={trim?.trim?.price} />
                </span>
              </div>
              {trim?.trim?.price === null ? (
                ""
              ) : (
                <p className="overview_emi">
                  <i className="bi bi-bank2" />
                  <span className="ms-2">
                    {t.monthlyEmi}{" "}
                    <Price
                      data={Math.round(
                        ((trim?.trim?.price -
                          trim?.trim?.price * (downPayment / 100)) *
                          (interestRate / 100 / 12) *
                          Math.pow(1 + interestRate / 100 / 12, years * 12)) /
                          (Math.pow(1 + interestRate / 100 / 12, years * 12) -
                            1)
                      )}
                    />
                  </span>
                </p>
              )}
              {trim?.trim?.price === null ? (
                ""
              ) : (
                <div className="calculator mt-2">
                  <div className="calculator-body">
                    <div>
                      <div className="form-group model_insure_btn mb-1">
                        <small>{t.loanYears}</small>
                        <div
                          className="btn-group btn-group-toggle"
                          data-toggle="buttons"
                        >
                          <label
                            className={
                              years === "1"
                                ? "btn btn-outline-primary pt-2 px-1"
                                : "btn btn-primary pt-2 px-1"
                            }
                          >
                            <input
                              type="radio"
                              name="loan-years"
                              id="loan-years-1"
                              autoComplete="off"
                              value="1"
                              checked={years === "1"}
                              onChange={(e) => setYears(e?.target?.value)}
                            />
                            1 {t.year}
                          </label>
                          <label
                            className={
                              years === "2"
                                ? "btn btn-outline-primary pt-2 px-1"
                                : "btn btn-primary pt-2 px-1"
                            }
                          >
                            <input
                              type="radio"
                              name="loan-years"
                              id="loan-years-2"
                              autoComplete="off"
                              value="2"
                              checked={years === "2"}
                              onChange={(e) => setYears(e?.target?.value)}
                            />{" "}
                            2 {t.years}
                          </label>
                          <label
                            className={
                              years === "3"
                                ? "btn btn-outline-primary pt-2 px-1"
                                : "btn btn-primary pt-2 px-1"
                            }
                          >
                            <input
                              type="radio"
                              name="loan-years"
                              id="loan-years-3"
                              autoComplete="off"
                              value="3"
                              checked={years === "3"}
                              onChange={(e) => setYears(e?.target?.value)}
                            />{" "}
                            3 {t.years}
                          </label>
                          <label
                            className={
                              years === "4"
                                ? "btn btn-outline-primary pt-2 px-1"
                                : "btn btn-primary pt-2 px-1"
                            }
                          >
                            <input
                              type="radio"
                              name="loan-years"
                              id="loan-years-4"
                              autoComplete="off"
                              value="4"
                              checked={years === "4"}
                              onChange={(e) => setYears(e?.target?.value)}
                            />{" "}
                            4 {t.years}
                          </label>
                          <label
                            className={
                              years === "5"
                                ? "btn btn-outline-primary pt-2 px-1"
                                : "btn btn-primary pt-2 px-1"
                            }
                          >
                            <input
                              type="radio"
                              name="loan-years"
                              id="loan-years-5"
                              autoComplete="off"
                              value="5"
                              checked={years === "5"}
                              onChange={(e) => setYears(e?.target?.value)}
                            />{" "}
                            5 {t.years}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="w-60">
                        <div className="form-group w-100">
                          <small htmlFor="interest-rate">
                            {t.interestRate} (%)
                          </small>
                          <input
                            type="range"
                            id="interest-rate"
                            className="form-control-range"
                            defaultValue={interestRate}
                            min={2.0}
                            max={8.0}
                            step="0.1"
                            onChange={(e) => {
                              setInterestRate(e?.target?.value);
                              document.getElementById(
                                "interest-rate-value"
                              ).innerHTML = e?.target?.value + "%";
                            }}
                          />
                          <div className="d-flex justify-content-between">
                            <small>1.99%</small>
                            <small id="interest-rate-value">
                              {interestRate}%
                            </small>
                            <small>8%</small>
                          </div>
                        </div>

                        <div className="form-group w-100">
                          <small htmlFor="down-payment">
                            {t.downpayment} (AED)
                          </small>
                          <input
                            type="range"
                            id="down-payment"
                            className="form-control-range"
                            defaultValue={downPayment}
                            min={20}
                            max={80}
                            step={1}
                            onChange={(e) => {
                              setDownPayment(e?.target?.value);
                              document.getElementById(
                                "down-payment-value"
                              ).innerHTML = e?.target?.value + "%";
                            }}
                          />
                          <div className="d-flex justify-content-between">
                            <small>20%</small>
                            <small id="down-payment-value">
                              {downPayment}%
                            </small>
                            <small>80%</small>
                          </div>
                        </div>
                      </div>
                      <div className="form-group w-40 px-4">
                        <div
                          type="button"
                          className="calulate_btn font_small py-3 fw-bold"
                          onClick={calculateEMI}
                        >
                          {t.calculate}
                        </div>
                      </div>
                    </div>
                    {monthlyRepaymentResult !== 0 &&
                      downPaymentResult !== 0 &&
                      totalCostResult !== 0 && (
                        <div>
                          <div className=" mt-1 ">
                            <div className="white_bg_wrapper py-0 px-2 mt-1">
                              <span className="fw-bold font_small me-1">
                                {t.monthlyRepayment} (EMI) : AED
                              </span>
                              <span
                                className="fw-bold font_small"
                                id="monthly-repayment-result"
                              >
                                <Price data={monthlyRepaymentResult} />
                              </span>
                            </div>
                            <div className="white_bg_wrapper py-0 px-2 mt-1">
                              <span className="fw-bold font_small me-1">
                                {t.totalInterestPayment} : AED
                              </span>
                              <span
                                className="fw-bold font_small"
                                id="down-payment-result"
                              >
                                <Price data={downPaymentResult} />
                              </span>
                            </div>
                            <div className="white_bg_wrapper py-0 px-2 mt-1">
                              <span className="fw-bold font_small me-1">
                               {t.totalAmountToPay} : AED
                              </span>
                              <span
                                className="fw-bold font_small"
                                id="total-cost-result"
                              >
                                <Price data={totalCostResult} />
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
