import React from "react";

export default function Price(data) {
  const price = data?.data;
  return (
    <>
      {price === null ? "TBD" : price?.toLocaleString("en-AE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}*
    </>
  );
}
