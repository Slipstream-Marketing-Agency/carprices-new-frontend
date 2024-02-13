import FeaturedImage from "@/components/common/FeaturedImage";
import Image from "next/image";
import React, { useState } from "react";

export default function StepOne({ filterData, setFilterData}) {

  const filterItems = [
    {
      label: "Technology",
      value: "safetech",
      icon: "gear-wide-connected",
      img:"/assets/images/homepage-filter-icons/Technology.png"
    },
    {
      label: "Fuel Efficiency",
      value: "fuel-efficiency",
      icon: "boombox",
      img:"/assets/images/homepage-filter-icons/Fuel Efficiency.png"
    },
    {
      label: "Off-Road",
      value: "off-road",
      icon: "gear-wide-connected",
      img:"/assets/images/homepage-filter-icons/Off-Road.png"
    },
    {
      label: "Premium Sound",
      value: "premium-sound",
      icon: "gear-wide-connected",
      img:"/assets/images/homepage-filter-icons/Entertainment.png"
    },
    {
      label: "Performance",
      value: "performance",
      icon: "gear-wide-connected",
      img:"/assets/images/homepage-filter-icons/Performance.png"
    },
    {
      label: "Space",
      value: "space",
      icon: "gear-wide-connected",
      img:"/assets/images/homepage-filter-icons/Space.png"
    },
    {
      label: "Luxury",
      value: "luxury",
      icon: "boombox",
      img:"/assets/images/homepage-filter-icons/luxury.png"
    },
    {
      label: "Premium Luxury",
      value: "premium-luxury",
      icon: "boombox",
      img:"/assets/images/homepage-filter-icons/premium-luxury.png"
    },
    {
      label: "Electric",
      value: "electric",
      icon: "gear-wide-connected",
      img:"/assets/images/homepage-filter-icons/Electric.png"
    },
  ];

  const handlePreferencesClick = newPreference => {  
    setFilterData(prevState => {
      const index = prevState.preferences.indexOf(newPreference);
      if (index > -1) {
        // remove the newPreference from the array
        const updatedPreferences = [...prevState.preferences];
        updatedPreferences.splice(index, 1);
        return {
          ...prevState,
          preferences: updatedPreferences
        };
      } else {
        // add the newPreference to the array
        return {
          ...prevState,
          preferences: [...prevState.preferences, newPreference]
        };
      }
    });
  };

  /*
  Logic of handlePreferencesClick
  Here, we first find the index of the new preference in the preferences array
  using indexOf. If the index is greater than -1 (i.e., if the new preference
  already exists in the array), we remove it from the array using the splice
  method and return a new state object with the updated preferences array.
  Otherwise, we add the new preference to the preferences array and return
  a new state object with the updated preferences array.
*/
  return (
    <>
    
      <div className="search_filter_box_items">
        <div className="d-flex justify-content-center flex-wrap">
          {filterItems.map((item, index) => (
            <div
              key={index}
              className={` banner_btn ${
                filterData.preferences.includes(item.value) ? "active" : ""
              }`}
              onClick={() => handlePreferencesClick(item.value)}
            >
              {/* <i className={`bi bi-${item.icon}`} /> */}
              <Image src={item.img} alt={item.label} width={40} height={40}/>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}
