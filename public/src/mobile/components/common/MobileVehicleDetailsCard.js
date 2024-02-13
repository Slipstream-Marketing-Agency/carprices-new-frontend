import Link from "next/link";
import React from "react";
import Price from "./Price";
import FeaturedImage from "./FeaturedImage";

export default function MobileVehicleDetailsCard(data) {
  

  return (
    <>
      {data?.props?.map((item, index) => {
        const principal = item?.mainTrim?.price; // Loan amount/principal
        const annualInterestRate = 0.025; // Annual interest rate (2.5%)
        const tenureInMonths = 60; // Loan tenure in months
        
        const monthlyInterestRate = annualInterestRate / 12; // Convert annual interest rate to monthly
        const compoundInterestFactor = Math.pow(1 + monthlyInterestRate, tenureInMonths);
        const emi = (principal * monthlyInterestRate * compoundInterestFactor) / (compoundInterestFactor - 1);
        
        const roundedEMI = Math.round(emi);
        const emiString = "AED " + roundedEMI.toString() + "* x " + tenureInMonths.toString();
        return (
          <div className="col-6 single_card_wrap mt-2" key={index}>
            <div className="card h-100">
              <Link
                href={`brands/${item?.brand?.slug}/${item?.year}/${item?.slug}`}
              >
                <FeaturedImage width={100} height={100}
                  src={item?.mainTrim?.featuredImage}
                  alt={item?.name}
                  title={item?.name}
                  id={item?.mainTrim?.id}
                />
              </Link>

              <div className="position-relative h-100 p-2">
                <Link
                  href={`brands/${item?.brand?.slug}/${item?.year}/${item?.slug}`}
                >
                  <h6 className="card-title fw-bold">
                    <span>{item?.year} </span>
                    <span>{item?.brand?.name} </span>
                    <span>{item?.name}</span>
                  </h6>
                </Link>
                <h6 className="card-text text-danger fw-bold mt-1">
                  {item?.minPrice === item?.maxPrice && item?.minPrice !== null ? <>AED <Price data={item?.minPrice} /></> : item?.minPrice === null ? <Price data={item?.minPrice} /> : <>AED <Price data={item?.minPrice} />{" "}-{" "}
                    <Price data={item?.maxPrice} /></>}
                </h6>
                  <h6 className="fw-bold mt-1">
                  {item?.minPrice === item?.maxPrice && item?.minPrice !== null ? "" :item?.minPrice === null ? "":<>EMI : {emiString}</>}
                  </h6>
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
