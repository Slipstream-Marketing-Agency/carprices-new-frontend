import React from "react";
import Link from "next/link";
import Price from "@/src/utils/Price"; // Ensure this path is correct
import SelectComponent from "@/src/utils/SelectComponent";
import MultiStepCarSelection from "./MultiStepCarSelection";
import { useRouter } from "next/router";

function CompareCarCard({ carData }) {
  if (!carData) return null;
  const modelOption = [
    "C-Class-2020",
    "C-Class-2021",
    "C-Class-2022",
    "C-Class-2023",
  ];

  const router = useRouter();

  const handleRemoveCar = () => {
    const currentPath = router.asPath;
    const basePath = currentPath.split("/compare-cars/")[0];
    let comparisonSlugs = currentPath.split("/compare-cars/")[1];

    if (comparisonSlugs) {
      let slugArray = comparisonSlugs.split("-vs-");
      slugArray = slugArray.filter(slug => slug !== carData.mainSlug);

      if (slugArray.length > 0) {
        const updatedPath = `${basePath}/compare-cars/${slugArray.join("-vs-")}`;
        router.push(updatedPath);
      } else {
        // Redirect to a default route such as the home page
        router.push('/compare-cars'); // Replace '/' with the route you want to redirect to
      }
    }
  };

  return (
    <div className={`col-md-3 col-6 `}>
      <div className="product-card style-2 compare">
        <div className="close-btn" onClick={handleRemoveCar}>
          <i className="bi bi-x" />
        </div>
        <div className="product-img d-flex justify-content-center">
          <img
            src={carData?.featuredImage?.data?.attributes?.url}
            alt={carData?.name}
          />
        </div>
        <div className="product-content">
          <div className="content-top">
            <div className="price-and-title">
              <h5 className="price">
                <Price data={carData?.price} />
              </h5>
              <h6 style={{"height" : "25px"}}>
                <Link href="/car-details" className="fw-bold text-black">
                  <>
                    {carData?.car_brands?.data[0]?.attributes?.name}{" "}
                    {carData?.car_models?.data[0]?.attributes?.name}{" "}
                    {carData?.name}
                  </>
                </Link>
              </h6>
            </div>
            <div className="company-logo">
              <img
                src={
                  carData?.car_brands?.data[0]?.attributes?.brandLogo?.data
                    ?.attributes?.url
                }
                alt="car logo"
              />
            </div>
          </div>
  
          <MultiStepCarSelection carData={carData?.mainSlug} mode={"update"}/>
        </div>
      </div>
    </div>
  );
}

export default CompareCarCard;
