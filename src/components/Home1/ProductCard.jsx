import React from "react";
import Link from "next/link";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import FeaturedImage from "../common/FeaturedImage";

function ProductCard({ subTitle, heading, carDetails }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  console.log(carDetails, "carDetails");

  const CarPriceRange = ({ minPrice, maxPrice }) => {
    const formatPrice = (price) => {
      return price.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    let priceInfo;
    if (minPrice === null || maxPrice === null) {
      // If either min or max price is null, display TBD
      priceInfo = "TBD*";
    } else if (minPrice === maxPrice) {
      // If min and max prices are the same, display only one price
      priceInfo = `AED ${formatPrice(minPrice)}*`;
    } else {
      // Display price range
      priceInfo = `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;
    }

    return (
      <h6 className="text-danger fw-bold MobilepriceTextSize">{priceInfo}</h6>
    );
  };

  const CarEMIDisplay = ({ minPrice }) => {
    const tenureInMonths = 60; // Loan tenure in months

    const calculateEMI = (principal) => {
      const annualInterestRate = 0.025; // Annual interest rate (2.5%)
      const monthlyInterestRate = annualInterestRate / 12; // Monthly interest rate
      const compoundInterestFactor = Math.pow(
        1 + monthlyInterestRate,
        tenureInMonths
      );
      const emi =
        (principal * monthlyInterestRate * compoundInterestFactor) /
        (compoundInterestFactor - 1);
      return Math.round(emi);
    };

    // Calculate EMI using the minimum price
    const minEMI = calculateEMI(minPrice);

    // Format the minimum EMI for display
    const emiString = minEMI
      ? `AED ${minEMI.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}*`
      : "Not Available";

    return <span>{emiString}</span>;
  };

  return (
    <div className="recent-product-section mt-3 mb-3 ">
      <div className="white_bg_wrapper">
        <div className="row mb-15 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
            <div className="section-title1 w-100">
              {/* <span>{subTitle}</span> */}
              <h2 className={`${isRtl && "text-end"} w-100 fw-bold`}>{heading}</h2>
              <hr className="my-0 mt-2 heading-bottom "/>
            </div>
            {/* <ul className="nav nav-tabs" id="myTab6" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="popular-car1-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#popular-car1"
                  type="button"
                  role="tab"
                  aria-controls="popular-car1"
                  aria-selected="true"
                >
                  Popular
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="new-car2-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#new-car2"
                  type="button"
                  role="tab"
                  aria-controls="new-car2"
                  aria-selected="false"
                >
                  New Car
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="use-car-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#use-car"
                  type="button"
                  role="tab"
                  aria-controls="use-car"
                  aria-selected="false"
                >
                  Used Car
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="auction-car-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#auction-car"
                  type="button"
                  role="tab"
                  aria-controls="auction-car"
                  aria-selected="false"
                >
                  Auction Car
                </button>
              </li>
            </ul> */}
          </div>
        </div>
        <div className="row ">
          <div className="col-lg-12">
            <div className="tab-content" id="myTabContent6">
              <div
                className="tab-pane fade show active cursor-pointer"
                id="popular-car1"
                role="tabpanel"
                aria-labelledby="popular-car1-tab"
              >
                <div className="row g-2">
                  {carDetails?.map((car, index) => (
                    <div
                      key={index}
                      className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6 wow fadeInUp"
                      data-wow-delay="200ms"
                    >
                      <Link
                        legacyBehavior
                        href={`/brands/${car?.brand?.slug}/${car?.highTrim?.year}/${car?.slug}`}
                      >
                        <div className="product-card">
                          <div className="product-img">
                            {/* <a href="#" className="fav">
                            <svg
                              width={14}
                              height={13}
                              viewBox="0 0 14 14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z"></path>
                            </svg>
                          </a> */}
                            <div className="swiper product-img-slider">
                              <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                  <FeaturedImage
                                    width={300}
                                    height={300}
                                    src={car?.highTrim?.featuredImage}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-content-height">
                              <h6 className="mobileFontCarName mb-0">
                                <Link legacyBehavior href="">
                                  <span>
                                    {car?.highTrim?.year} {car?.brand?.name}{" "}
                                    {car?.name}
                                  </span>
                                </Link>
                              </h6>
                              <CarPriceRange
                                minPrice={car?.minPrice}
                                maxPrice={car?.maxPrice}
                              />

                              <ul className="features">
                                <li className="mobileFontEmi">
                                  {t.emistart}{" "}
                                  <CarEMIDisplay minPrice={car?.minPrice} />
                                </li>
                              </ul>
                            </div>

                            <div
                              className={`content-btm ${
                                isRtl && "flex-row-reverse"
                              } `}
                            >
                              <span className="view-btn2">
                                {t.viewDetails}
                                <i class="bi bi-chevron-double-right"></i>
                              </span>
                              <div className="brand ">
                                <Link legacyBehavior href="">
                                  <img
                                    src={car?.brand?.logo}
                                    alt="brandLogo"
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  {/* <div className="view-btn-area">
                    <p>There will be 100+ Upcoming Car</p>
                    <Link legacyBehavior href="/single-brand-category">
                      <button className="btn mb-2 mb-md-0 btn-round btn-outline btn-block">
                        {t.viewMore}
                      </button>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
