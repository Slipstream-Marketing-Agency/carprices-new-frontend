import React from "react";
import Link from "next/link";

const OutlinedButton = ({ label, href, onClick }) => {
  const buttonClasses =
    "font-bold px-8 py-3 text-black bg-transparent border border-solid border-gray-200 rounded-[47px] max-md:px-4 text-[16px] whitespace-nowrap hover:bg-gray-400 hover:text-white transition-colors duration-300";

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
