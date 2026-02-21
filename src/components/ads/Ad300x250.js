"use client";
import React, { useEffect, useRef } from "react";

export default function Ad300X250({ dataAdSlot = "6203914608" }) {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;
    
    // Validate ad slot format
    if (!dataAdSlot || !/^\d+$/.test(dataAdSlot)) {
      console.warn(`Invalid ad slot ID: ${dataAdSlot}`);
      return;
    }
    
    try {
      if (adRef.current && adRef.current.childElementCount === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (e) {
      // Suppress error in production
      if (process.env.NODE_ENV === 'development') { 
        console.error("Error loading ads:", e); 
      }
    }
  }, [dataAdSlot]);

  return (
    <div className="flex justify-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: "300px", height: "250px" }}
        data-ad-client="ca-pub-4857144107996534"
        data-ad-slot={dataAdSlot}
        data-full-width-responsive="true"
      />
    </div>
  );
}

