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
    },
    {
      label: t.fuelefficiency,
      value: "fuel-efficiency",
      icon: "boombox",
      img: "/assets/img/filter-icons/Fuel.png",
    },
    {
      label: t.offroad,
      value: "off-road",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/offroad.png",
    },
    {
      label: t.performance,
      value: "performance",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Perfomance.png",
    },
    {
      label: "Affordable Luxury",
      value: "affordable-luxury",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Affordable Luxury.png",
    },
    {
      label: t.luxury,
      value: "luxury",
      icon: "boombox",
      img: "/assets/img/filter-icons/Luxury.png",
    },
    {
      label: t.premiumluxury,
      value: "premium-luxury",
      icon: "boombox",
      img: "/assets/img/filter-icons/Premium luxury.png",
    },
    {
      label: t.space,
      value: "space",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Space.png",
    },
    {
      label: t.electric,
      value: "electric",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/EV.png",
    },
    {
      label: "Dune Bashing",
      value: "dune-bashing",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Dune Bashing.png",
    },
    {
      label: "Manual Transmission",
      value: "manual-transmission",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/manual.png",
    },
    {
      label: t.safety,
      value: "safety",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/Safety.png",
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
        // If already 3 preferences are selected, show alert and do not update state
        if (prevState.preferences.length >= 3) {
          alert("You can select up to 3 preferences.");
          return prevState; // Return the current state without changes
        }
        // Add the new preference if less than 3 are already selected
        return {
          ...prevState,
          preferences: [...prevState.preferences, newPreference],
        };
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {filterItems.map((item, index) => (
        <Tooltip key={index} title={item.toolbar} arrow>
          <button
            key={item.label}
            className={`flex flex-col items-center p-2 rounded-xl border bg-white border-zinc-100 h-[80px] 
          ${
            filterData.preferences.includes(item.value)
              ? "bg-blue-200"
              : "hover:bg-blue-100"
          }
          `}
            onClick={() => handlePreferencesClick(item.value)}
          >
            <div className="w-[40px] h-[40px] flex justify-center items-center">
              <Image
                loading="lazy"
                src={item.img}
                alt={item.label}
                width={40}
                height={40}
                className="w-full aspect-square object-contain"
              />
            </div>
            <span className="text-xs text-center text-zinc-600 font-bold">
              {item.label}
            </span>
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
