import Link from "next/link";
import React from "react";
import Price from "./Price";
import FeaturedImage from "./FeaturedImage";

export default function VehicleDetailsCard(data) {
  

  return (
    <>
      {data?.props?.map((item, index) => {
        const principal = item?.minPrice; // Loan amount/principal
        const annualInterestRate = 0.025; // Annual interest rate (2.5%)
        const tenureInMonths = 60; // Loan tenure in months

        const monthlyInterestRate = annualInterestRate / 12; // Convert annual interest rate to monthly
        const compoundInterestFactor = Math.pow(1 + monthlyInterestRate, tenureInMonths);
        const emi = (principal * monthlyInterestRate * compoundInterestFactor) / (compoundInterestFactor - 1);

        const roundedEMI = Math.round(emi);
        // const emiString = "AED " + roundedEMI.toString() + "* x " + tenureInMonths.toString();
        const emiString = "AED " + roundedEMI?.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }) + "*";
        return (
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-6 col-6 single_card_wrap mt-2" key={index}>
            <div className="card h-100">
              <Link
                href={`brands/${item?.brand?.slug}/${item?.year}/${item?.slug}`}
              >
                <FeaturedImage width={300} height={105}
                  src={item?.mainTrim?.featuredImage}
                  alt={item?.name}
                  title={item?.name}
                  id={item?.mainTrim?.id}
                />
              </Link>

              <div className="position-relative card_content_height p-2">
                <Link
                  href={`brands/${item?.brand?.slug}/${item?.year}/${item?.slug}`}
                >
                  <h3 className="card-title fs-6">
                    {/* <span>{item?.year} </span> */}
                    <span>{item?.brand?.name} </span>
                    <span>{item?.name}</span>
                  </h3>
                </Link>
                <p className="card-text text-danger fw-bold fs-6 mt-1">

                  {item?.minPrice === item?.maxPrice && item?.minPrice !== null && item?.minPrice !== null ? <>AED <Price data={item?.minPrice} /></> : ""}
                  {item?.minPrice !== item?.maxPrice && item?.minPrice !== null && item?.minPrice !== null ? <>AED <Price data={item?.minPrice} /> - <Price data={item?.maxPrice} /></> : ""}
                  {item?.minPrice === null && item?.maxPrice === null ? <><Price data={item?.minPrice} /></> : ""}
                  {/* {item?.minPrice === item?.maxPrice && item?.minPrice !== null ? <>AED <Price data={item?.minPrice} /></> : item?.minPrice === null ? <Price data={item?.minPrice} /> : <>AED <Price data={item?.minPrice} />{" "}-{" "}
                   <Price data={item?.maxPrice} /></>} */}
                </p>
                <p className="fs-6">
                  {item?.mainTrim?.price !== null ? <>EMI Starting From <span className="fw-bold">{emiString}</span></> : ""}
                </p>
                {/* <small className="card-text">
                  <i className="bi bi-star-fill me-1 " />5
                  <span className="me-1">(1 Review(s))</span>
                </small> */}
                <Link
                  href={`brands/${item?.brand?.slug}/${item?.year}/${item?.slug}`}
                >
                  <div className="d-flex justify-content-center align-items-center card_btn">
                    <small className="fw-bold">View Car</small>
                    <i class="bi bi-chevron-double-right"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
}
