import FeaturedImage from "@/components/common/FeaturedImage";
import Price from "@/components/common/Price";
import React from "react";
import Select, { StylesConfig } from "react-select";
// import { ColourOption, colourOptions } from './docs/data';

export default function VehicleFilters(props) {
  const specificVehicleFilter = props?.specificVehicleFilter;
  const brandName = {
    value: specificVehicleFilter?.brand?.name,
    label: specificVehicleFilter?.brand?.name,
  };
  const modelName = {
    value: specificVehicleFilter?.model?.name,
    label: specificVehicleFilter?.model?.name,
  };
  const trimName = {
    value: specificVehicleFilter?.name,
    label: specificVehicleFilter?.name,
  };
  const year = {
    value: specificVehicleFilter?.year,
    label: specificVehicleFilter?.year,
  };
  const price = {
    value: specificVehicleFilter?.price,
    label: specificVehicleFilter?.price,
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 10,
      fontSize: 14,
      fontWeight: 600,
      // background: "transparent",
      // // Overwrittes the different states of border
      // borderColor: state.isFocused ? "var(--light)" : "var(--primary)",
      // // Removes weird border around container
      // boxShadow: state.isFocused ? null : null,
      // "&:hover": {
      //   // Overwrittes the different states of border
      //   borderColor: state.isFocused ? "var(--light)" : "var(--primary)",
      // },
    }),
  };

  const handleRemoveButtonClick = () => {
    let currentSlug = props.currentSlug.slug;
    const carSlug = `${specificVehicleFilter?.year}-${
      specificVehicleFilter?.brand?.slug
    }-${specificVehicleFilter?.model?.name
      ?.replace(/\s+/g, "-")
      ?.toLowerCase()}-${specificVehicleFilter.slug}`;
    const vsIndex = currentSlug.indexOf("-vs-");
    let remainingSlug;
    if (vsIndex !== -1) {
      // Split the currentSlug by "-vs-" to get an array of individual car slugs
      const carSlugs = currentSlug.split("-vs-");
  
      // Filter out the carSlug to be removed from the carSlugs array
      const updatedCarSlugs = carSlugs.filter(slug => slug !== carSlug);
  
      // Join the updatedCarSlugs array with "-vs-" to reconstruct the remainingSlug
      remainingSlug = updatedCarSlugs.join("-vs-");
    } else {
      // if there is only one carSlug in the currentSlug
      remainingSlug = currentSlug.replace(carSlug, "");
    }
    remainingSlug = remainingSlug.replace(/-+/g, "-"); // remove consecutive dashes
    remainingSlug = remainingSlug.replace(/(^-|-$)/g, ""); // remove leading and trailing dashes
    props.router.push(`/compare-cars/${remainingSlug}`);
  };
  
  return (
    <>
      <div className="w-100 me-2 filtered_card_wrapper h-100">
        <div className="inner">
          <div className="clear_car" onClick={() => handleRemoveButtonClick()}>
            <i class="bi bi-x-circle-fill" />{" "}
          </div>
          <div className="filter_car_image">
            <FeaturedImage width={100} height={100}
              src={specificVehicleFilter?.featuredImage}
              alt={
                specificVehicleFilter?.v1BrandName?.label +
                specificVehicleFilter?.v1ModelName?.label +
                specificVehicleFilter?.v1TrimName?.label +
                specificVehicleFilter?.v1Year?.label
              }
              title={
                specificVehicleFilter?.v1BrandName?.label +
                specificVehicleFilter?.v1ModelName?.label +
                specificVehicleFilter?.v1TrimName?.label +
                specificVehicleFilter?.v1Year?.label
              }
            />
          </div>
          <div className="px-2">
            <div>
              <h6 className="fw-bold">
                {year.label} {brandName.label}
              </h6>
            </div>

            <div>
              <h6 className="fw-bold mt-1">
                {modelName.label} {trimName.label}
              </h6>
            </div>

            <div></div>
            <h6 className="card-text text-danger fw-bold mt-1">
              AED <Price data={price?.value} />
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
