import React from "react";
import VehicleDetailsCard from "../common/VehicleDetailsCard";
import ViewAllButton from "../common/ViewAllButton";

export default function PopularElectricCars(props) {
  return (
    <section className="my-2">
      <div className="card_wrapper">
        <h2>Popular New Electric Cars</h2>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <VehicleDetailsCard props={props.electric}/>
            </div>
          </div>
        </div>
        {/* <ViewAllButton text={"View All Electric Cars"}/> */}
      </div>
     
    </section>
  );
}
