"use client"
import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function FixedAd320x50({ dataAdSlot }) {
  const [isVisible, setIsVisible] = useState(true);
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-4857144107996534";
  const adHiddenKey = 'adHiddenUntilMobile';
  const hideDuration = 1 * 60 * 60 * 1000;

  useEffect(() => {
    const adHiddenUntil = localStorage.getItem(adHiddenKey);
    const currentTime = new Date().getTime();

    if (adHiddenUntil && currentTime < parseInt(adHiddenUntil)) {
      setIsVisible(false);
      return;
    }

    if (!isAdLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      } catch (e) {
        // Handle error silently
      }
    }
  }, []);

  const handleCloseAd = () => {
    const hideUntil = new Date().getTime() + hideDuration;
    localStorage.setItem(adHiddenKey, hideUntil.toString()); // Store the future hide duration in localStorage
    setIsVisible(false); // Hide ad when close button is clicked
  };

  if (!isVisible) return null; // Don't render if ad is not visible

  return (
    <div className="fixed md:hidden bottom-0 left-0 w-full z-50 py-2 justify-center">
      <div className="relative">
        {/* Google AdSense Ad Unit for Mobile */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "320px", height: "50px" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={dataAdSlot}
          data-full-width-responsive="true"
        ></ins>

        {/* Close button */}
        <button
          className="absolute top-0 right-0 text-gray-600 text-xl p-1 bg-white rounded-full shadow-md hover:bg-gray-200"
          onClick={handleCloseAd}
          aria-label="Close Ad"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

