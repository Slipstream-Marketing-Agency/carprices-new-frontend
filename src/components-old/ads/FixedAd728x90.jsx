import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function FixedAd728x90({ dataAdSlot }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true); // State to control ad visibility

  useEffect(() => {
    // Reset ad visibility when navigating to a new page
    const handleRouteChange = () => {
      setIsVisible(true);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  
  useEffect(() => {
    if (isVisible) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Handle error silently
      }
    }
  }, [router.query, isVisible]);

  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  const handleCloseAd = () => {
    setIsVisible(false); // Hide ad when close button is clicked
  };

  if (!isVisible) return null; // Don't render if ad is not visible

  return (
    <div className="tw-hidden md:tw-fixed tw-bottom-0 tw-left-0 tw-w-full tw-z-50 tw-py-2 md:tw-flex tw-justify-center tw-items-center">
      <div className="Ad728x90 tw-relative">
        {/* Google AdSense Ad Unit */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "728px", height: "90px" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={dataAdSlot}
          data-full-width-responsive="true"
        ></ins>

        {/* Close button */}
        <button
          className="tw-absolute tw-top-0 tw-right-0 tw-text-gray-600 tw-text-xl tw-p-1 tw-bg-white tw-rounded-full tw-shadow-md hover:tw-bg-gray-200"
          onClick={handleCloseAd}
          aria-label="Close Ad"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
