import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
export default function Ad970x250({dataAdSlot}) {
  const router = useRouter()
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    catch (e) {

    }
  }, [router.query]);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return (
    //replaced className to Ad728x90 as image with dimension 970X250 not availble from Alghandi Motors"
    <div className="Ad970x250 tw-my-2">
      {/* <Link href="https://bit.ly/3zixsMz">
        <Image
          src={"https://cdn.carprices.ae/assets/728x90_Blazer_d6b13f332e.jpg"}
          alt="ad-image-970X250"
          width={728}
          height={90}
          // layout="fill"
          objectFit="cover"
          layout="responsive"
        />
      </Link> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block"}}
        data-ad-client={adsenseClientId}
        data-ad-slot={dataAdSlot}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}