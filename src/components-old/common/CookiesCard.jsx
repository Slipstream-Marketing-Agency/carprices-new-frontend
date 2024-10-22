import { getCookie, setCookie } from '@/src/lib/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CookiesCard() {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = getCookie('acceptedCookies');
    if (!hasAcceptedCookies) {
      setShowCookie(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie('acceptedCookies', 'true', 365); // Store the cookie consent for 365 days
    setShowCookie(false); // Hide the cookie notice
  };

  return (
    showCookie && (
      <div className="tw-fixed tw-bottom-0 tw-z-50 tw-left-0 tw-w-full tw-bg-gray-800 tw-text-white tw-px-6 tw-py-4 tw-shadow-lg tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between">
        <div>
          <h4 className="tw-font-bold tw-text-lg tw-mb-2 tw-text-white md:tw-mb-0">We use cookies 🍪</h4>
          <p className="tw-text-sm tw-leading-tight">
            This website uses cookies to offer you the most relevant information. Please accept cookies for optimal performance. Read our{' '}
            <Link className="tw-text-primary tw-text-white tw-underline" href="/privacy">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="tw-mt-4 md:tw-mt-0 tw-flex tw-space-x-4">
          <button
            onClick={acceptCookies}
            className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-blue-700 focus:tw-outline-none"
          >
            Accept All Cookies
          </button>
          <button
            onClick={() => setShowCookie(false)}
            className="tw-bg-gray-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-gray-700 focus:tw-outline-none"
          >
            Reject All
          </button>
        </div>
      </div>
    )
  );
}
