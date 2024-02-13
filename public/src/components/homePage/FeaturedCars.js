import React from "react";
import VehicleDetailsCard from "../common/VehicleDetailsCard";
import Ad300x600 from "../ads/Ad300x600";

export default function FeaturedCars(props) {
  return (
    <section className="my-2">
      <div className="card_wrapper ">
        <h2>Featured New Cars</h2>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <VehicleDetailsCard props={props.featured}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
