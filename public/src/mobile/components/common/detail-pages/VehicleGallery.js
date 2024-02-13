import React from "react";
import FeaturedImage from "../FeaturedImage";

export default function VehicleGallery({ model }) {
  return (
    <>
      {model?.mainTrim?.images?.length === 0 ? null : (
        <div id="gallery" className="my-3">
          <div className="white_bg_wrapper mt-3">
            <h4 className="fw-bold">
              {model?.mainTrim?.year} {model?.brand?.name} {model?.name} Gallery
            </h4>
            <div className="row mt-2">
              {model?.mainTrim?.images?.map((item, index) => (
               <div className="col-3 cover_card_image mt-2" key={index}>
                  <FeaturedImage width={100} height={100} src={item?.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
