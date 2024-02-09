import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductSideFilterList({ carDetails, filteredTrims }) {
  console.log(filteredTrims, "filteredTrims");
  const CarPriceRange = ({ car }) => {
    // Format price for display
    const formatPrice = (price) => {
      if (price === null) {
        return "TBD";
      }
      return price?.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    let priceInfo;

    if (car?.minPrice === null && car?.maxPrice === null) {
      // If both minPrice and maxPrice are undefined, display TBD*
      priceInfo = "TBD*";
    } else if (car?.minPrice === car?.maxPrice || car?.maxPrice === undefined) {
      // If min and max prices are the same or maxPrice is undefined, display only one price
      priceInfo = `AED ${formatPrice(car?.minPrice)}*`;
    } else {
      // Display price range
      priceInfo = `AED ${formatPrice(car?.minPrice)}* - ${formatPrice(
        car?.maxPrice
      )}*`;
    }

    return <small className="text-danger fw-bold ">{priceInfo}</small>;
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
    const emis = calculateEMI(car?.minPrice);

    // const minEMI = Math.min(...emis);

    // Format the minimum EMI for display
    const emiString = emis
      ? `AED ${emis.toLocaleString("en-AE", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}*`
      : "Not Available";

    return <span>{emiString}</span>;
  };

  const router = useRouter();

  return (
    <>
      {filteredTrims?.map((car, index) => (
        <Link
          legacyBehavior
          href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
        >
          <div
            className="col-lg-3 col-md-3 col-6 wow fadeInUp item cursor_pointer"
            data-wow-delay="300ms"
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
                          car?.featuredImage
                            ? car?.featuredImage
                            : "/assets/img/car-placeholder.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-content">
                <div className="product-content-height">
                  <h5>
                    <Link
                      legacyBehavior
                      href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
                    >
                      <span>
                        {car?.year} {car?.brand?.name} {car?.model?.name}
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
                      EMI Starting From <CarEMIDisplay car={car} />
                    </li>
                  </ul>
                </div>

                {/* d-flexed to view details at center  */}
                <div className="content-btm ">
                  <Link
                    legacyBehavior
                    href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
                  >
                    <a className="view-btn2">
                      View Details
                      <i class="bi bi-chevron-double-right"></i>
                    </a>
                  </Link>
                  <div className="brand">
                    <Link
                      legacyBehavior
                      href={`/brands/${car?.brand?.slug}/${car?.year}/${car?.model?.slug}`}
                    >
                      <img src={car?.brand?.logo} alt="image" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
