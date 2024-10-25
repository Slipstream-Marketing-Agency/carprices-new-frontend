
"use client"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Ad300x600({ dataAdSlot }) {
  const searchParams = useSearchParams();

  console.log(searchParams, "searchParams"); // Access query params here

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, [searchParams]); // Trigger useEffect on search params change

  return (
    <div className="flex justify-center">
      <ins
        className="adsbygoogle bg-gray-600"
        style={{ display: "inline-block", width: "300px", height: "600px" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} // Use environment variable for AdSense client ID
        data-ad-slot={dataAdSlot} // Pass the dynamic ad slot ID
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
