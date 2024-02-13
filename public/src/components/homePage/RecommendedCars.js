import React from "react";
import VehicleDetailsCard from "../common/VehicleDetailsCard";

export default function RecommendedCars() {
  return (
    <section className="my-2">
      <div className="card_wrapper">
        <h2>Recommended Cars For You</h2>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <VehicleDetailsCard />
              <VehicleDetailsCard />
              <VehicleDetailsCard />
              <VehicleDetailsCard />
            </div>
          </div>
          {/* <div className="col-3">
            <div
              style={{
                width: "auto",
                height: 250,
                background: "#ffa3a3",
                color: "#fff",
                lineHeight: 240,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              (300x250)
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
