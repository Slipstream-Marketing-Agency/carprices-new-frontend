"use client";
import React, { useEffect, useRef } from 'react';

export default function AdBlog({ dataAdSlot }) {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;
    try {
      if (adRef.current && adRef.current.childElementCount === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') { console.error('Error loading ads:', e); }
    }
  }, []);

  return (
    <div className="flex justify-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: "728px", height: "90px" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-4857144107996534"}
        data-ad-slot={dataAdSlot}
        data-full-width-responsive="true"
      />
    </div>
  );
}
