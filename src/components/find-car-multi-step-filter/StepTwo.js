import useTranslate from "@/src/utils/useTranslate";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function StepTwo({ filterData, setFilterData, bodyTypeList }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";

  const handlePreferencesClick = (newBodyTypes) => {
    setFilterData((prevState) => {
      const index = prevState.bodyTypes.indexOf(newBodyTypes);
      if (index > -1) {
        // remove the newBodyTypes from the array
        const updatedBodyType = [...prevState.bodyTypes];
        updatedBodyType.splice(index, 1);
        return {
          ...prevState,
          bodyTypes: updatedBodyType,
        };
      } else {
        // add the newBodyTypes to the array
        return {
          ...prevState,
          bodyTypes: [...prevState.bodyTypes, newBodyTypes],
        };
      }
    });
  };

  return (
    <div className="search_filter_box_items">
      <div className="grid grid-cols-3 gap-5">
        {bodyTypeList.map((item, index) => (
          <div
            key={index}
            className={` btn ${
              filterData.bodyTypes.includes(item.slug)
                ? "bg-blue-200"
                : "bg-white"
            } flex flex-col items-center p-2 rounded-xl border bg-white border-zinc-100 hover:bg-blue-100 focus:bg-blue-200`}
            onClick={() => handlePreferencesClick(item.slug)}
          >
             <div className="w-[30px] h-[45px] flex justify-center items-center">
            <Image
              src={item?.image?.url}
              alt={item.label}
              width={60}
              height={60}
              className="mb-1 object-contain"
            />
             </div>
            <span className="text-xs text-center text-zinc-600">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
