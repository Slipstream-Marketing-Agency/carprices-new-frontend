import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Ad320x100({ dataAdSlot }) {
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
    <div className="Ad320x100 tw-h-24">
      {/* <Link href="https://bit.ly/3zixsMz">
        <Image
          src={"https://cdn.carprices.ae/assets/320x100_Blazer_757e816cd3.jpg"}
          alt="ad-image1"
          width={300}
          height={250}
          // layout="fill"
          objectFit="cover"
          layout="responsive"
        />
      </Link> */}
      <ins
        className="adsbygoogle responsive_desktop_square_320x100"
        style={{ display: "block" }}
        data-ad-client={adsenseClientId}
        data-ad-slot={dataAdSlot}
      ></ins>
    </div>
  );
}
