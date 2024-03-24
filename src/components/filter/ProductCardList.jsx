import React from "react";
import Link from "next/link";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";

function ProductCardList({ subTitle, heading, carDetails }) {
  

  const CarPriceRange = ({ car }) => {
  const router = useRouter();
   
    const t = useTranslate();
    const isRtl = router.locale === "ar";
  
    // Extracting and filtering prices (excluding zeros) from car trims
    const prices = car?.attributes?.car_trims?.data
      .map((trim) => trim.attributes.price)
      .filter((price) => price > 0);

    // Format price for display
    const formatPrice = (price) => {
      return price.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    // Check if there are valid prices available
    if (prices.length > 0) {
      // Finding minimum and maximum prices
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Determine how to display the price information
      let priceInfo;
      if (minPrice === maxPrice) {
        // If min and max prices are the same, display only one price
        priceInfo = `AED ${formatPrice(minPrice)}*`;
      } else {
        // Display price range
        priceInfo = `AED ${formatPrice(minPrice)}* - ${formatPrice(maxPrice)}*`;
      }

      return <small className="text-danger fw-bold fs-6 ">{priceInfo}</small>;
    } else {
      // If no valid prices are available, display "TBD"
      return <small className="text-danger fw-bold fs-6 ">TBD</small>;
    }
  };

  const CarEMIDisplay = ({ car }) => {
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

    // Extract all non-zero prices, calculate EMI for each, and find the minimum EMI
    const emis = car?.attributes?.car_trims?.data
      .filter((trim) => trim.attributes.price > 0)
      .map((trim) => calculateEMI(trim.attributes.price));

    const minEMI = Math.min(...emis);

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
    <div className="recent-product-section mb-20 mt-5">
      <div className="container">
        <div className="row mb-20 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
            <div className="section-title1">
              {/* <span>{subTitle}</span> */}
              <h2>{heading}</h2>
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
        <div className="row">
          <div className="col-lg-12">
            <div className="tab-content" id="myTabContent6">
              <div
                className="tab-pane fade show active"
                id="popular-car1"
                role="tabpanel"
                aria-labelledby="popular-car1-tab"
              >
                <div className="row g-4 ">
                  {carDetails?.map((car, index) => (
                    <div
                      key={index}
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
                      data-wow-delay="200ms"
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
                                <img
                                  src={
                                    car?.attributes?.car_trims?.data.find(
                                      (trim) => trim.attributes.highTrim
                                    )?.attributes?.featuredImage?.data
                                      ?.attributes?.url
                                  }
                                  alt={`${car?.attributes?.car_brands?.data[0]?.attributes?.name} ${car?.attributes?.name}`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="product-content-height">
                            <h5>
                              <Link legacyBehavior href="/car-deatils">
                                <span>
                                {car?.attributes?.year}{" "}
                                  {
                                    car?.attributes?.car_brands?.data[0]
                                      ?.attributes?.name
                                  }{" "}
                                  {car?.attributes?.name}
                                </span>
                              </Link>
                            </h5>
                            <CarPriceRange car={car} />
                            {/* <div className="price-location">
                            <div className="price">
                              <strong>{car.carPrice}</strong>
                            </div>
                            <div className="location">
                              <Link href="#">
                                <i className="bi bi-geo-alt" /> Panama City
                              </Link>
                            </div>
                          </div> */}

                            <ul className="features">
                              <li>
                                {t.emistart}<CarEMIDisplay car={car} />
                              </li>
                            </ul>
                          </div>

                          {/* d-flexed to view details at center  */}
                          <div className="content-btm ">
                            <Link legacyBehavior href="/brands/">
                              <a className="view-btn2">
                                {t.viewDetails}
                                <i class="bi bi-chevron-double-right"></i>
                              </a>
                            </Link>
                            <div className="brand">
                              <Link
                                legacyBehavior
                                href="/single-brand-category"
                              >
                                <img
                                  src={
                                    car?.attributes?.car_brands?.data[0]
                                      ?.attributes?.brandLogo?.data?.attributes
                                      ?.url
                                  }
                                  alt="image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardList;
