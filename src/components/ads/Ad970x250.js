import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Ad970x250(props) {
  const router = useRouter()
  useEffect(() => {

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    catch (e) {

    }

  }, [router.query]);
  return (
    <div className="Ad970x250">
      {process.env.NEXT_PUBLIC_MODE == "production" ? (

        <ins className="adsbygoogle responsive_footer_ad_horizontal"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4857144107996534"
          data-ad-slot={props?.dataAdSlot}
        >
        </ins>
      ) : ""}
    </div>
  )
}
