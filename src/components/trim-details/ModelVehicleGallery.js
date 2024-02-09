import React from "react";
import FeaturedImage from "../common/FeaturedImage";
import Image from "next/image";

export default function ModelVehicleGallery({
  year,
  brand,
  model,
  minPrice,
  maxPrice,
  minFuelConsumption,
  maxFuelConsumption,
  mainTrimFuelType,
  engineTypes,
  transmissionList,
  motorTypes,
  allTrims,
  mainTrim,
}) {
  return (
    <>
      {mainTrim?.length === 0 ? null : (
        <div id="gallery" className="my-3">
          <div className="white_bg_wrapper mt-3">
            <h4 className="fw-bold">
              {year} {brand?.name} {mainTrim?.name} Gallery
            </h4>
            <div className="row mt-2">
              {mainTrim?.galleryImages?.map((item, index) => (
                <div
                  className="col-sm-3 col-4 cover_card_image mt-2 "
                  key={index}
                >
                  <Image
                    width={300}
                    height={200}
                    src={item}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
