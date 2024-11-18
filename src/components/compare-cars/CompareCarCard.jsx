"use client"
import React from "react";


import { useRouter, usePathname } from 'next/navigation';
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Price from "@/utils/Price";
import MultiStepCarSelection from "./MultiStepCarSelection";

function CompareCarCard({ carData, cars, setCars }) {
  
    const router = useRouter();
    const pathname = usePathname();
    
  if (!carData) return null;

  const handleRemoveCar = () => {
    const currentPath = pathname;
    const basePath = currentPath.split("/compare-cars/")[0];
    let comparisonSlugs = currentPath.split("/compare-cars/")[1];

    if (comparisonSlugs) {
      let slugArray = comparisonSlugs.split("-vs-");
      slugArray = slugArray.filter((slug) => slug !== carData.mainSlug);

      if (slugArray.length > 0) {
        const updatedPath = `${basePath}/compare-cars/${slugArray.join(
          "-vs-"
        )}`;
        router.push(updatedPath);
      } else {
        // Redirect to a default route such as the home page
        router.push("/compare-cars"); // Replace '/' with the route you want to redirect to
      }
    }
  };
  const handleModal = () => { };

  return (
    <div className={`md:col-span-3 col-span-6 `}>
      <div className="relative border-solid border border-gray-200 rounded-lg p-4 h-[320px] shadow-md">
        <div
          className="flex justify-end cursor-pointer"
          onClick={handleRemoveCar}
        >
          <CloseIcon />
        </div>
        <div className="flex justify-center h-[160px] my-4">
          <Image
            src={
              carData?.featuredImage === undefined
                ? "/assets/img/car-placeholder.png"
                : carData?.featuredImage
            }
            alt={carData?.name || 'Car Image'}
            width={500}  // Set a width that matches the container or your layout needs
            height={300}  // Set the height based on the aspect ratio you want
            className="object-contain"
            layout="intrinsic"  // This layout preserves the image's aspect ratio and size
            loading="lazy"  // Lazy load the image
          />
        </div>
        <div>
          <h6 className="text-blue-600 font-bold">
            {carData?.brand}
          </h6>
          <h5 className="font-semibold">
            {carData?.model} {carData?.name}
          </h5>
          <h4 className="font-bold">
            <Price data={carData?.price} />
          </h4>

          <MultiStepCarSelection
            carData={carData?.mainSlug}
            mode={"update"}
            handleModal={handleModal}
            cars={cars}
            setCars={setCars}
          />
        </div>
      </div>
    </div>
  );
}

export default CompareCarCard;
