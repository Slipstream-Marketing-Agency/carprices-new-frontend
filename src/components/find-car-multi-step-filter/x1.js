import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function StepThree({ filterData, setFilterData}) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';
  const filterItems = [
    {
      label: `2 ${t.seats}`,
      value: "2",
      img: "/assets/img/homepage-filter-icons/Seats-2.png",
    },
    {
      label: `2 + 2 ${t.seats}`,
      value: "2+2",
      img: "/assets/img/homepage-filter-icons/Seats-2+2.png",
    },
    {
      label: `4-5 ${t.seats}`,
      value: "4-5",
      img: "/assets/img/homepage-filter-icons/Seats-4-5.png",
    },
    {
      label: `5-7 ${t.seats}`,
      value: "5-7",
      img: "/assets/img/homepage-filter-icons/Seats-5-7.png",
    },
    {
      label: `7-9 ${t.seats}`,
      value: "7-9",
      img: "/assets/img/homepage-filter-icons/Seats-7-9.png",
    },
  ];

  const handleSeatingClick = newSeating => {
     setFilterData(prevState => {
      const index = prevState.seating.indexOf(newSeating);
      if (index > -1) {
        // remove the newSeating from the array
        const updatedSeating = [...prevState.seating];
        updatedSeating.splice(index, 1);
        return {
          ...prevState,
          seating: updatedSeating
        };
      } else {
        // add the newSeating to the array
        return {
          ...prevState,
          seating: [...prevState.seating, newSeating]
        };
      }
    });
  }

   /*
  Logic of handleSeatingClick
  Here, we first find the index of the new seating in the seating  array
  using indexOf. If the index is greater than -1 (i.e., if the new seating   already exists in the array), we remove it from the array using the splice
  method and return a new state object with the updated seating  array.
  Otherwise, we add the new seating to the seating  array and return
  a new state object with the updated seating  array.
*/

  return (
    <div id="filter_seating" className="mt-2">
      <div className="search_filter_box_items" id="seats_filter">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {filterItems.map((item, index) => (
            <div
              key={index}
              className={` banner_btn ${
                filterData.seating.includes(item.value) ? "active" : ""
              }`}
              onClick={() => handleSeatingClick(item.value)}
            >
              {/* <i className={`bi bi-${item.icon}`} /> */}
              <img src={item.img} alt={item.label}></img>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
