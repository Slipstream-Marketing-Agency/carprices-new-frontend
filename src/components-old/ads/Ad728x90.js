import Image from "next/image";
import Link from "next/link";
export default function Ad728x90({dataAdSlot}) {
  const url = dataAdSlot === 'tahoe' ? "https://bit.ly/4cyUAEN" : dataAdSlot === 'blazer' ? "https://bit.ly/3zixsMz" : "https://bit.ly/3VW1VZu";
  return (
    <div className="Ad728x90">
      <Link href={url}>
        <Image
          src={dataAdSlot === 'tahoe' ? "/ads/Tahoe/728x90-Tahoe.jpg" : dataAdSlot === "blazer" ? "/ads/Blazer/728x90-Blazer.jpg" : "/ads/Corvette/728X90-Corvette.jpg"} 
          alt="ad-image-728X90"
          width={728}
          height={90}
        // layout="fill"
        // objectFit="cover"
        />
      </Link>
    </div>
  )
}