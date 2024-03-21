import useTranslate from "@/src/utils/useTranslate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function StepTwo({ filterData, setFilterData, bodyTypeList }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";

  console.log(filterData, "filterDatafilterData");

  const filterItems = filterData?.bodyTypes;

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
        <div className="d-flex justify-content-center flex-wrap gap-2">
          {" "}
          {bodyTypeList.map((item, index) => (
            <div
              key={index}
              className={`banner_btn btn ${
                filterData.bodyTypes.includes(item.slug) ? "active" : ""
              } d-flex flex-column justify-content-center align-items-center p-1  body_type_btn `}
              onClick={() => handlePreferencesClick(item.slug)}
            >
              {/* <i className={`bi bi-${item.icon}`} /> */}
              <Image
                src={item?.image?.url}
                alt={item.label}
                width={60}
                height={60}
                className="mb-1"
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
