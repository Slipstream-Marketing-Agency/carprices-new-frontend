import React from "react";

import Image from "next/image";

export default function VehicleGallery({ trim }) {
  return (
    <>
      {trim?.length === 0 ? null : (
        <div id="gallery" className="my-3">
          <div className="white_bg_wrapper mt-3">
            <h4 className="fw-bold">
              {trim?.year} {trim?.brand?.name} {trim?.name}{" "}
              Gallery
            </h4>
            <div className="row mt-2">
              {trim?.map((item, index) => (
                <div
                  className="col-sm-3 col-4 cover_card_image mt-2 p-1"
                  key={`item-${index}`}
                >
                  <Image width={300} height={200} src={item} className="object-cover"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
