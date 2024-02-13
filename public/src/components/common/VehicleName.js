import React from "react";

export default function VehicleName({ year, brandName, modelName, trimName }) {
  return (
    <>
      <span>{year}</span>{" "}
      <span>{brandName}</span>{" "}
      <span>{modelName}</span>{" "}
      <span>{trimName}</span>{" "}
    </>
  );
}
