import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function Ad300x250(props) {
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
    <div className="Ad300x250">
         {shouldDisplayAds && (
        <ins className="adsbygoogle responsive_desktop_square_300x250"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4857144107996534"
        data-ad-slot={props?.dataAdSlot}
      >
      </ins>
      )}
      <h2 className="text-center p-3" style={{backgroundColor:'rosybrown'}}>ad here</h2>
    </div>
  )
}
