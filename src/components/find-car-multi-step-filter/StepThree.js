import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function StepThree({ filterData, setFilterData, seatList }) {
  const router = useRouter();
  const t = useTranslate();

  const initialFilterItems = [
    { label: `2 ${t.seats}`, value: ["2 Seater"], group: "2", img: "/assets/img/homepage-filter-icons/Seats-2.png" },
    { label: `2 + 2 ${t.seats}`, value: ["2 + 2 Seater"], group: "2+2", img: "/assets/img/homepage-filter-icons/Seats-2+2.png" },
    { label: `4-5 ${t.seats}`, value: ["4 Seater", "5 Seater"], group: "4-5", img: "/assets/img/homepage-filter-icons/Seats-4-5.png" },
    { label: `6-7 ${t.seats}`, value: ["6 Seater", "7 Seater"], group: "6-7", img: "/assets/img/homepage-filter-icons/Seats-5-7.png" },
    { label: `8-9 ${t.seats}`, value: [ "8 Seater", "9 Seater"], group: "8-9", img: "/assets/img/homepage-filter-icons/Seats-7-9.png" },
  ];

  const [dynamicFilterItems, setDynamicFilterItems] = useState([]);

  useEffect(() => {
    const filteredItems = initialFilterItems.filter(item =>
      item.value.some(seatValue => seatList.includes(seatValue))
    );
    setDynamicFilterItems(filteredItems);
  }, [seatList, t.seats]);

  const handleSeatingClick = (selectedGroup) => {
    // Find the item that matches the selected group
    const selectedItem = initialFilterItems.find(item => item.group === selectedGroup);
    if (!selectedItem) return; // Early return if not found

    // Toggle the group value in filterData
    setFilterData(prevState => {
      // Check if the group is already selected
      const isGroupSelected = prevState.seating.includes(selectedItem.group);
      const newSeating = isGroupSelected
        ? prevState.seating.filter(group => group !== selectedItem.group) // Remove the group if already selected
        : [...prevState.seating, selectedItem.group]; // Add the group if not

      return { ...prevState, seating: newSeating };
    });
  };

  const isFilterActive = (group) => {
    return filterData.seating.includes(group);
  };

  return (
    <div id="filter_seating" className="mt-2">
      <div className="search_filter_box_items" id="seats_filter">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {dynamicFilterItems.map((item, index) => (
            <div
              key={index}
              className={`btn ${isFilterActive(item.group) ? "active" : ""} d-flex flex-column justify-content-center align-items-center p-1  body_type_btn`}
              onClick={() => handleSeatingClick(item.group)}
            >
              <img src={item.img} alt={item.label}></img>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
