import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchForBestCard = ({
  imageUrl,
  label,
  linkUrl,
  bgColor = "bg-blue-200",
}) => {
    console.log(bgColor);

  return (
    <div
      className={`md:tw-p-4 tw-p-2 tw-rounded-lg`}
      style={{ background: bgColor }}
    >
      <Link href={linkUrl}>
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
          <Image
            src={imageUrl}
            alt={label}
            loading="lazy"
            width={40}
            height={40}
            className="tw-w-40 md:tw-h-24 tw-h-14 tw-object-contain tw-rounded-md tw-p-2"
          />
          <div className="tw-items-center tw-justify-between tw-w-full tw-hidden md:tw-flex">
            <p className="tw-mt-2 tw-text-center tw-text-sm md:tw-text-base tw-font-semibold">
              {label}
            </p>
            <span className="tw-mt-2 tw-text-blue-700 tw-font-bold">→</span>
          </div>
          <p className="md:tw-hidden tw-text-center tw-text-xs tw-font-semibold">
            {label}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SearchForBestCard;
