import React from "react";

import VehicleDetailsCard from "@/components/common/VehicleDetailsCard";

export default function PopularNewElectricCars(props) {
  return (
    <>
      <section className="my-2">
        <div className="card_wrapper">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <VehicleDetailsCard props={props.topSearched} buttonVisible={false} />
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
