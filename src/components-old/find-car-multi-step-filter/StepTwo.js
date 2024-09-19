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
    <div className="">
      <div className="tw-grid tw-grid-cols-3 tw-gap-5">
        {bodyTypeList.map((item, index) => (
          <button
            key={index}
            className={`tw-flex tw-flex-col tw-items-center tw-p-2 tw-rounded-xl tw-border tw-border-2 tw-border-solid tw-bg-white tw-border-zinc-100 tw-h-[80px] ${filterData.bodyTypes.includes(item.slug) ? "bg-light" : "tw-grayscale"} hover:tw-grayscale-0 hover:tw-bg-blue-100 tw-transition-all tw-duration-300`}

            onClick={() => handlePreferencesClick(item.slug)}
          >
            <div className="tw-w-[50px] tw-h-[50px] tw-flex tw-justify-center tw-items-center">
              <Image
                src={item?.image?.url}
                alt={item.label}
                width={60}
                height={60}
                className="tw-object-contain"
              />
            </div>
            <span className="tw-text-xs tw-text-center tw-text-zinc-600 tw-font-bold">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
