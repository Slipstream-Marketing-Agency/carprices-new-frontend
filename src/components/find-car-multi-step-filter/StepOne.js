
import useTranslate from "@/src/utils/useTranslate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function StepOne({ filterData, setFilterData}) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';
  const filterItems = [
    {
      label: t.technology,
      value: "safetech",
      icon: "gear-wide-connected",
      img:"/assets/img/homepage-filter-icons/Technology.png"
    },
    {
      label: t.fuelefficiency,
      value: "fuel-efficiency",
      icon: "boombox",
      img:"/assets/img/homepage-filter-icons/Fuel Efficiency.png"
    },
    {
      label: t.offroad,
      value: "off-road",
      icon: "gear-wide-connected",
      img:"/assets/img/homepage-filter-icons/Off-Road.png"
    },
    {
      label: t.premiumsound,
      value: "premium-sound",
      icon: "gear-wide-connected",
      img:"/assets/img/homepage-filter-icons/Entertainment.png"
    },
    {
      label: t.performance,
      value: "performance",
      icon: "gear-wide-connected",
      img:"/assets/img/homepage-filter-icons/Performance.png"
    },
    {
      label: t.space,
      value: "space",
      icon: "gear-wide-connected",
      img:"/assets/img/homepage-filter-icons/Space.png"
    },
    {
      label: t.luxury,
      value: "luxury",
      icon: "boombox",
      img:"/assets/img/homepage-filter-icons/luxury.png"
    },
    {
      label: t.premiumluxury,
      value: "premium-luxury",
      icon: "boombox",
      img:"/assets/img/homepage-filter-icons/premium-luxury.png"
    },
    {
      label: t.electric ,
      value: "electric",
      icon: "gear-wide-connected",
      img:"/assets/img/homepage-filter-icons/Electric.png"
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
        <div className="d-flex justify-content-center flex-wrap gap-1">          {filterItems.map((item, index) => (
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
