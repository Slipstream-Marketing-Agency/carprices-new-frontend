import React, { useEffect } from "react";
import { useRouter } from "next/router";

const TabSwitch = ({ categories, selectedTab, setSelectedTab, isAvailable }) => {
  const router = useRouter();

  useEffect(() => {
    setSelectedTab(selectedTab);
  }, []);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, type: index },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-mt-0 tw-w-full tw-text-base tw-leading-4 tw-text-center tw-text-neutral-900 max-md:tw-flex-wrap max-md:tw-max-w-full">
      <div className="tw-flex md:tw-gap-5 tw-gap-2 md:tw-justify-between tw-px-0 max-md:tw-flex-wrap max-md:tw-max-w-full">
        {categories.map((category, index) => {
          if (index === 1 && isAvailable === 0) {
            return null; // Skip rendering the second tab if isAvailable is 0
          }
          return (
            <div key={index} className="tw-flex tw-flex-col tw-justify-center">
              <div
                className={`tw-justify-center md:tw-px-14 tw-px-10 md:tw-py-4 tw-py-3 tw-border tw-border-solid tw-rounded-[73px] max-md:tw-px-5 tw-cursor-pointer ${
                  selectedTab === index
                    ? "tw-bg-neutral-900 tw-text-white"
                    : "tw-bg-violet-100 tw-border-violet-100"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {category}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitch;
