import Image from "next/image";
import Link from "next/link";
export default function Ad300x600({ dataAdSlot }) {
  const url = dataAdSlot === 'corvette' ? "https://bit.ly/3VW1VZu" : dataAdSlot === 'blazer' ? "https://bit.ly/3zixsMz" : "https://bit.ly/4cyUAEN";
  return (
    <div className="Ad300x600">
      <Link href={url}>
        <Image
          // src={"/ads/Tahoe/300X600-TAHOE.jpg"}
          src={dataAdSlot === 'corvette'
            ? "/ads/Corvette/300x600-Corvette.jpg"
            : dataAdSlot === 'blazer'
              ? "/ads/Blazer/300x600-BLAZER.jpg"
              : "/ads/Tahoe/300x600-Tahoe.jpg"}
          alt="ad-image"
          // layout="fill"
          // objectFit="cover"
          width={300}
          height={600}
        />
      </Link>
    </div>
  )
}