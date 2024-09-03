import React from "react";
import Link from "next/link";

const OutlinedButton = ({ label, href, onClick }) => {
  const buttonClasses =
    "tw-font-bold tw-px-8 tw-py-3 tw-text-black tw-bg-transparent tw-border tw-border-solid tw-border-gray-200 tw-rounded-[47px] max-md:tw-px-4 tw-text-[16px] tw-whitespace-nowrap hover:tw-bg-gray-400 hover:tw-text-white transition-colors duration-300";

  if (href) {
    return (
      <Link href={href}>
        <button className={buttonClasses}>{label}</button>
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
};

export default OutlinedButton;
