import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Ad300x600({ dataAdSlot }) {
  const router = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, [router.query]);

  const url =
    dataAdSlot === "corvette"
      ? "https://bit.ly/3VW1VZu"
      : dataAdSlot === "blazer"
        ? "https://bit.ly/3zixsMz"
        : "https://bit.ly/4cyUAEN";
  return (
    <div className="Ad300x600">
      {/* <Link href={url}>
        <Image
          // src={"/ads/Tahoe/300X600-TAHOE.jpg"}
          src={
            dataAdSlot === "corvette"
              ? "https://cdn.carprices.ae/assets/300x600_Corvette_f392c8f6cb.jpg"
              : dataAdSlot === "blazer"
              ? "https://cdn.carprices.ae/assets/300x600_BLAZER_de9c90f335.jpg"
              : "https://cdn.carprices.ae/assets/300x600_TAHOE_980d12cd1b.jpg"
          }
          alt="ad-image"
          // layout="fill"
          // objectFit="cover"
          width={300}
          height={600}
        />
      </Link> */}
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "300px", height: "600px" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} // Use environment variable for AdSense client ID
        data-ad-slot={dataAdSlot} // Pass the dynamic ad slot ID
        // data-ad-format="rectangle"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
