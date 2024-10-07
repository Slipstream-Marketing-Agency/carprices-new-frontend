import React from "react";
import Link from "next/link";
import Price from "@/src/utils/Price"; // Ensure this path is correct
import SelectComponent from "@/src/utils/SelectComponent";
import MultiStepCarSelection from "./MultiStepCarSelection";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

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
    <div className={`md:tw-col-span-3 tw-col-span-6 `}>
      <div className="tw-relative tw-border-solid tw-border tw-border-gray-200 tw-rounded-lg tw-p-4 tw-h-[340px]">
        <div
          className="tw-flex tw-justify-end tw-cursor-pointer"
          onClick={handleRemoveCar}
        >
          <CloseIcon />
        </div>
        <div className="tw-flex tw-justify-center tw-h-[160px] tw-my-4">
          <Image
            src={
              carData?.featuredImage === undefined
                ? "/assets/img/car-placeholder.png"
                : carData?.featuredImage
            }
            alt={carData?.name || 'Car Image'}
            width={500}  // Set a width that matches the container or your layout needs
            height={300}  // Set the height based on the aspect ratio you want
            className="tw-object-contain"
            layout="intrinsic"  // This layout preserves the image's aspect ratio and size
            loading="lazy"  // Lazy load the image
          />
        </div>
        <div>
          <h6 className="tw-text-blue-600 tw-font-bold">
            {carData?.brand}
          </h6>
          <h5 className="tw-font-semibold">
            {carData?.model} {carData?.name}
          </h5>
          <h4 className="tw-font-bold">
            <Price data={carData?.price} />
          </h4>

          <MultiStepCarSelection
            carData={carData?.mainSlug}
            mode={"update"}
            handleModal={handleModal}
          />
        </div>
      </div>
    </div>
  );
}

export default CompareCarCard;
