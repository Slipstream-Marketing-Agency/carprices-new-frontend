import { useRouter } from "next/router";
import React, { useEffect } from "react";
export default function Ad300x600(props) {
  const shouldDisplayAds = process.env.NEXT_PUBLIC_MODE === "production";

  const router = useRouter()

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Error pushing ads:", error);
    }
  }, [router.query]);


  return (
    <div className="Ad300x600" style={{backgroundColor:'rosybrown'}}>
         {shouldDisplayAds && (
       <ins className="adsbygoogle responsive_vertical_ad_desktop"
       style={{ display: "block" }}
       data-ad-client="ca-pub-4857144107996534"
       data-ad-slot={props?.dataAdSlot}
     >
      </ins>
      )}
      <h2 className="text-center p-3" >300*600</h2>

      
    </div>
  )
}
