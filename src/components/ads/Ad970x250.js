"use client";
import React, { useEffect, useRef } from "react";

export default function Ad970x250({ dataAdSlot = "4726950827" }) {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;
    
    if (!dataAdSlot || !/^\d+$/.test(dataAdSlot)) {
      return;
    }
    
    try {
      if (adRef.current && adRef.current.childElementCount === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (e) {
      // Suppress in production
    }
  }, [dataAdSlot]);

  return (
    <div className="flex justify-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: "970px", height: "250px" }}
        data-ad-client="ca-pub-4857144107996534"
        data-ad-slot={dataAdSlot}
        data-full-width-responsive="true"
      />
    </div>
  );
}

