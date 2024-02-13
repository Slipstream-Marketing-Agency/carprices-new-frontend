import React from "react";
import VehicleDetailsCard from "../common/VehicleDetailsCard";
import Ad300x600 from "../ads/Ad300x600";

export default function TopSearchedCars(props) {
  return (
    <>
      <section className="my-2">
        <div className="card_wrapper">
          <h2>Most Popular New Cars</h2>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <VehicleDetailsCard props={props.topSearched}/>
              </div>
            </div>
            {/* <div className="col-3">
            <Ad300x600/>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
