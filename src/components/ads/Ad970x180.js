"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Ad970x180({dataAdSlot}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    catch (e) {if (process.env.NODE_ENV === 'development') { console.error("Error loading ads:", e); }
    }

  }, [searchParams]);

  return (
    <>
      <div className="flex justify-center">
        <ins className="adsbygoogle bg-slate-200"
          style={{ display: "inline-block", width: "970px", height: "180px" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} // Use environment variable for AdSense client ID
          data-ad-slot={dataAdSlot} // Pass the dynamic ad slot ID
          data-full-width-responsive="true"
        >
        </ins>
      </div>
    </>

  );
}