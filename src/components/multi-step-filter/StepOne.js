"use client";
import Image from "next/image";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import useTranslate from "@/utils/UseTranslate";
import { useRouter } from "next/navigation";

export default function StepOne({ filterData, setFilterData }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";

  const filterItems = [
    {
      label: "Good <br/>Infotainment",
      value: "safetech",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/Tech.webp",
    },
    {
      label: t.fuelefficiency,
      value: "fuel-efficiency",
      icon: "boombox",
      img: "/assets/img/filter-icons/webp/Fuel.webp",
    },
    {
      label: "Basic <br/>Off-roading",
      value: "off-road",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/offroad.webp",
    },
    {
      label: t.performance,
      value: "performance",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/Perfomance.webp",
    },
    {
      label: "Affordable <br/>Luxury",
      value: "affordable-luxury",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/Affordable Luxury.webp",
    },
    {
      label: t.luxury,
      value: "luxury",
      icon: "boombox",
      img: "/assets/img/filter-icons/webp/Luxury.webp",
    },
    {
      label: t.premiumluxury,
      value: "premium-luxury",
      icon: "boombox",
      img: "/assets/img/filter-icons/webp/Premium luxury.webp",
    },
    {
      label: t.space,
      value: "space",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/Space.webp",
    },
    {
      label: t.electric,
      value: "electric",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/EV.webp",
    },
    {
      label: "Serious <br/>Off-roading",
      value: "dune-bashing",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/Dune Bashing.webp",
    },
    {
      label: "Manual Transmission",
      value: "manual-transmission",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/manual.webp",
    },
    {
      label: t.safety,
      value: "safety",
      icon: "gear-wide-connected",
      img: "/assets/img/filter-icons/webp/Safety.webp",
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

  const isFilterActive = (value) => {
    return filterData.preferences.includes(value);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {filterItems.map((item, index) => (
        <Tooltip key={index} title={item.toolbar} arrow>
          <button
            key={item.label}
            className={`flex flex-col items-center  p-2 rounded-xl border border-2 border-solid ${isFilterActive(item.value)
              ? "bg-light border-blue-300"
              : "bg-white border-zinc-100 grayscale"
              } hover:grayscale-0 hover:bg-blue-100 transition-all duration-300 h-[90px]`}
            onClick={() => handlePreferencesClick(item.value)}
          >
            <div className="w-[40px] h-[40px] flex justify-center items-center">
              <Image
                src={item.img}
                alt={item.label}
                width={40}
                height={40}
                priority={true}
                sizes="(min-width: 1024px) 40px, (min-width: 768px) 30px, 100vw"
                className="w-full aspect-square object-contain"
              />
            </div>
            <span
              className="text-xs text-center text-zinc-600 font-semibold hover:text-zinc-900"
              dangerouslySetInnerHTML={{ __html: item.label }}
            ></span>
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
