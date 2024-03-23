import useTranslate from "@/src/utils/useTranslate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

export default function StepOne({ filterData, setFilterData }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const filterItems = [
    {
      label: t.technology,
      value: "safetech",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Tech.png",
      // toolbar: "Cars that offer Android Auto/Car Play, 360 degree cameras and adaptive cruise control.",
    },
    {
      label: t.fuelefficiency,
      value: "fuel-efficiency",
      icon: "boombox",
      img: "/assets/img/filter-icons/Fuel.png",
      // toolbar: "Cars that offer fuel economy of over 10kmpl.",
    },
    {
      label: t.offroad,
      value: "off-road",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/offroad.png",
      // toolbar: "SUVs and Crossovers that have a AWD system. Good for gravel and loose surfaces. Not suitable for dune bashing.",
    },
    // {
    //   label: t.premiumsound,
    //   value: "premium-sound",
    //   icon: "gear-wide-connected",
    //   img:"/assets/img/filter-icons/Entertainment.png"
    // },
    {
      label: t.performance,
      value: "performance",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Perfomance.png",
      // toolbar: "Cars that have a performance pedigree. Sports cars, Performance SUVs and track focused cars. ",
    },

    {
      label: t.affordableLuxury,
      value: "affordable-luxury",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Affordable Luxury.png",
      // toolbar: "Cars that offer a premium experience at a reasonable price. This includes cars that offer good luxury and are under AED 280,000",
    },
    {
      label: t.luxury,
      value: "luxury",
      icon: "boombox",
      img: "/assets/img/filter-icons/Luxury.png",
      // toolbar: "Luxury cars that cost over AED 280,000 and offer the best comfort. This doesn’t include high performance sports cars.",
    },
    {
      label: t.premiumluxury,
      value: "premium-luxury",
      icon: "boombox",
      img: "/assets/img/filter-icons/Premium luxury.png",
      // toolbar: "Ultra-Luxury cars that cost over AED 500,000 and offer the best comfort. This doesn’t include high performance sports cars. ",
    },
    {
      label: t.space,
      value: "space",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Space.png",
      // toolbar: "Cars that offer a spacious interior for seating as well as cargo. ",
    },
    {
      label: t.electric,
      value: "electric",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/EV.png",
      // toolbar: "Pure Electric Cars.",
    },
    {
      label: t.duneBashing,
      value: "dune-bashing",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Dune Bashing.png",
      // toolbar: "Rugged offroad cars that can go dune bashing and offer the right equipment for it. Most SUVs are not dune bashers. ",
    },
    {
      label: t.manualTransmission,
      value: "manual-transmission",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/manual.png",
      // toolbar: "Cars with a manual gearbox.",
    },
    {
      label: t.safety,
      value: "safety",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Safety.png",
      // toolbar: "Cars that have a 5 Star NHTSA rating or a IIHS rating of 4 or a Euro NCAP rating of 5",
    },
  ];

  const handlePreferencesClick = (newPreference) => {
    setFilterData((prevState) => {
      const index = prevState.preferences.indexOf(newPreference);
      if (index > -1) {
        // If the preference is already selected, remove it
        const updatedPreferences = [...prevState.preferences];
        updatedPreferences.splice(index, 1);
        return {
          ...prevState,
          preferences: updatedPreferences,
        };
      } else {
        // Add the new preference if less than 3 are already selected
        if (prevState.preferences.length < 3) {
          return {
            ...prevState,
            preferences: [...prevState.preferences, newPreference],
          };
        } else {
          // Optionally, inform the user that the maximum number of preferences has been reached
          alert("You can select up to 3 preferences.");
          return prevState; // Return the current state without changes
        }
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
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {" "}
          {filterItems.map((item, index) => (
            <Tooltip key={index} title={item.toolbar} arrow>
              <div
                key={index}
                className={` banner_btn ${
                  filterData.preferences.includes(item.value) ? "active" : ""
                }`}
                title={item.toolbar}
                onClick={() => handlePreferencesClick(item.value)}
              >
                {/* <i className={`bi bi-${item.icon}`} /> */}
                <Image src={item.img} alt={item.label} width={40} height={40} />
                <span>{item.label}</span>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </>
  );
}
