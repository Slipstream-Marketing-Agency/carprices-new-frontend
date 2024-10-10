import React from 'react';
import Link from 'next/link';

const PrimaryButton = ({ label, href, onClick, additionalClass='' }) => {
  if (href) {
    return (
      <Link href={href}>
        <button 
          className={`${additionalClass} tw-px-8 tw-py-3 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-rounded-[47px] max-md:tw-px-4 tw-text-[16px] tw-whitespace-nowrap`}
        >
          {label}
        </button>
      </Link>
    );
  }

  return (
    <button 
      className={`${additionalClass} tw-px-8 tw-py-3 tw-text-white tw-bg-blue-600 tw-border tw-border-blue-600 tw-rounded-[47px] max-md:tw-px-4 tw-text-[16px] tw-whitespace-nowrap`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
