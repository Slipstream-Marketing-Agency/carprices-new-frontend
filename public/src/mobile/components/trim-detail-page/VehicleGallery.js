import React from "react";
import FeaturedImage from "../common/FeaturedImage";

export default function VehicleGallery({ trim }) {

  
  return (
    <>
      {trim?.trim?.images?.length === 0 ? null : (
        <div id="gallery" className="my-3">
          <div className="white_bg_wrapper mt-3">
            <h4 className="fw-bold">
              {trim?.trim?.year} {trim?.trim?.brand?.name} {trim?.trim?.name} Gallery
            </h4>
            <div className="row mt-2">
              {trim?.trim?.images?.map((item, index) => (
               <div className="col-sm-3 col-4 cover_card_image mt-2" key={index}>
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
