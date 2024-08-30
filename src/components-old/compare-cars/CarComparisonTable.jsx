import CarDetails from "@/src/components/compare-cars/CarDetails";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function CarComparisonTable({ tableData }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const columnCount = tableData.length + 1;
  const columnWidth = `${100 / columnCount}%`;

  console.log(tableData, "tableData");
  return (
    <div className="tw-container">
      <CarDetails
        heading={"Basic Information"}
        data={tableData}
      />
      
    </div>
  );
}
