
"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Ad300X250({ dataAdSlot }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, [searchParams]);

  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <div className=" flex justify-center">
      <ins
        className="adsbygoogle bg-slate-200 "
        style={{ display: "inline-block", width: "300px", height: "250px" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} // Use environment variable for AdSense client ID
        // data-ad-slot={dataAdSlot} // Pass the dynamic ad slot ID
        data-ad-slot="6203914608"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
