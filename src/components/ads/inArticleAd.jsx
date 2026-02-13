"use client"

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";


export default function InArticleAd({ dataAdSlot }) {

    const searchParams = useSearchParams();

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {if (process.env.NODE_ENV === 'development') { console.error("Error loading ads:", e); }
        }
    }, [searchParams]); // Trigger useEffect on search params change

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} // Use environment variable for AdSense client ID
            data-ad-slot={dataAdSlot}
        />
    )
}
