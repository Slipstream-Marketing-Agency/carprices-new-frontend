import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function StepThree({ filterData, setFilterData, seatList }) {
  const router = useRouter();
  const t = useTranslate();

  const initialFilterItems = [
    {
      label: `1 ${t.seats}`,
      value: ["1 Seater"],
      group: "1",
      img: "/assets/icons/seats/Seats-1.png", // Assume you'll add an icon for 1 seater
    },
    {
      label: `2+2 ${t.seats}`,
      value: ["2 + 2 Seater"],
      group: "2+2",
      img: "/assets/icons/seats/Seats-2.png",
    },
    {
      label: `2 ${t.seats}`,
      value: ["2 Seater"],
      group: "2",
      img: "/assets/icons/seats/Seats-2.png",
    },
    {
      label: `3 ${t.seats}`,
      value: ["3 Seater"],
      group: "3",
      img: "/assets/icons/seats/Seats-3.png", // Assume an icon for 3 seater
    },
    {
      label: `4 ${t.seats}`,
      value: ["4 Seater"],
      group: "4",
      img: "/assets/icons/seats/Seats-4.png",
    },
    {
      label: `5 ${t.seats}`,
      value: ["5 Seater"],
      group: "5",
      img: "/assets/icons/seats/Seats-5.png",
    },
    {
      label: `6 ${t.seats}`,
      value: ["6 Seater"],
      group: "6",
      img: "/assets/icons/seats/Seats-6.png", // Assume an icon for 6 seater
    },
    {
      label: `7 ${t.seats}`,
      value: ["7 Seater"],
      group: "7",
      img: "/assets/icons/seats/Seats-7.png",
    },
    {
      label: `8 ${t.seats}`,
      value: ["8 Seater"],
      group: "8",
      img: "/assets/icons/seats/Seats-8.png", // Assume an icon for 8 seater
    },
    {
      label: `9 ${t.seats}`,
      value: ["9 Seater"],
      group: "9",
      img: "/assets/icons/seats/Seats-9.png",
    },
    {
      label: `9+ ${t.seats}`,
      value: [
        "11 Seater",
        "12 Seater",
        "13 Seater",
        "14 Seater",
        "15 Seater",
        "16 Seater",
      ],
      group: "9+",
      img: "/assets/icons/seats/Seats-9+.png", // Assume an icon for 9+ seater
    },
  ];

  const [dynamicFilterItems, setDynamicFilterItems] = useState([]);

  useEffect(() => {
    const filteredItems = initialFilterItems.filter((item) =>
      item.value.some((seatValue) => seatList.includes(seatValue))
    );
    setDynamicFilterItems(filteredItems);
  }, [seatList, t.seats]);

  const handleSeatingClick = (selectedGroup) => {
    const selectedItem = initialFilterItems.find(
      (item) => item.group === selectedGroup
    );
    if (!selectedItem) return;

    setFilterData((prevState) => {
      const isGroupSelected = prevState.seating.includes(selectedItem.group);
      const newSeating = isGroupSelected
        ? prevState.seating.filter((group) => group !== selectedItem.group)
        : [...prevState.seating, selectedItem.group];

      return { ...prevState, seating: newSeating };
    });
  };

  const isFilterActive = (group) => {
    return filterData.seating.includes(group);
  };

  return (
    <div id="filter_seating" className="tw-mt-2">
      <div className="" id="seats_filter">
        <div className="tw-grid tw-grid-cols-3 sm:tw-grid-cols-3 md:tw-grid-cols-3 lg:tw-grid-cols-3 tw-gap-4">
          {dynamicFilterItems.map((item, index) => (
            <button
              key={index}
              className={`tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-4 tw-rounded-xl tw-border-2 tw-border-solid ${
                isFilterActive(item.group)
                  ? "tw-bg-blue-200 tw-border-blue-300"
                  : "tw-bg-white tw-border-zinc-100"
              }`}
              onClick={() => handleSeatingClick(item.group)}
            >
              <img src={item.img} alt={item.label} className="tw-mb-1" />
              <span className="tw-text-xs tw-text-center tw-text-zinc-600 tw-font-bold">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
