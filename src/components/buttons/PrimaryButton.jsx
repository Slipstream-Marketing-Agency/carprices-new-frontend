import React from 'react';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PrimaryButton = ({ label, href, onClick, additionalClass = '' }) => {
  if (href) {
    return (
      <Link href={href}>
        <button
          className={`${additionalClass} px-5 py-2 text-white bg-blue-600 border border-blue-600 rounded-[47px] max-md:px-4 md:text-[16px] text-[12px] whitespace-nowrap flex items-center justify-center`}
        >
          {label}
          {/* Show the label on larger screens, hide on small screens */}
          {/* <span className="md:inline hidden">{label}</span> */}

          {/* Show the arrow icon on mobile screens */}
          {/* <ArrowForwardIcon className="md:hidden inline-block" /> */}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`${additionalClass} px-5 py-2 text-white bg-blue-600 border border-blue-600 rounded-[47px] max-md:px-4 md:text-[16px] text-[12px] whitespace-nowrap flex items-center justify-center`}
      onClick={onClick}
    >
      {label}
      {/* Show the label on larger screens, hide on small screens */}
      {/* <span className="md:inline hidden">{label}</span> */}

      {/* Show the arrow icon on mobile screens */}
      {/* <ArrowForwardIcon className="md:hidden inline-block" /> */}
    </button>
  );
};

export default PrimaryButton;
