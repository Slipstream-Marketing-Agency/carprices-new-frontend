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
            <h2 className={`w-100 fw-bold`}>
              {year} {brand?.name} {mainTrim?.name} Gallery
            </h2>
            <hr className="my-2 heading-bottom " />
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
