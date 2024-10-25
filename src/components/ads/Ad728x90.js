"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Ad728x90({ dataAdSlot }) {
  const searchParams = useSearchParams(); // Use searchParams instead of router

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, [searchParams]); // Trigger the effect when query parameters change

  return (
    <div className="flex justify-center">
      {/* Google AdSense Ad Unit */}
      <ins
        className="adsbygoogle bg-gray-600"
        style={{ display: "inline-block", width: "728px", height: "90px" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} // Use environment variable for AdSense client ID
        data-ad-slot={dataAdSlot} // Pass the dynamic ad slot ID
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
