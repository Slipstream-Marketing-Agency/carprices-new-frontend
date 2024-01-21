import React from "react";

export default function Price(data) {
  const price = data?.data;
  return (
    <>
      {price <= 0
        ? "TBD"
        : "AED" + " " +price?.toLocaleString("en-AE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
      *
    </>
  );
}
