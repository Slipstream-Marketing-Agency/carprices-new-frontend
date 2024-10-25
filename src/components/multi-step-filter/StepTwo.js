import useTranslate from "@/utils/UseTranslate";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

  const isFilterActive = (slug) => {
    return filterData.bodyTypes.includes(slug);
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {bodyTypeList.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center p-2 rounded-xl border border-2 border-solid bg-white ${isFilterActive(item.slug)
                ? "bg-light border-blue-300"
                : "border-zinc-100 grayscale"
              } hover:grayscale-0 hover:bg-blue-100 transition-all duration-300`}
            onClick={() => handlePreferencesClick(item.slug)}
          >
            <div className="w-[50px] h-[50px] flex justify-center items-center">
              <Image
                src={item?.image?.url}
                alt={item.label}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <span className="text-xs text-center text-zinc-600 font-semibold">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
