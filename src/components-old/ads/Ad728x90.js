import Image from "next/image";
import Link from "next/link";
export default function Ad728x90({ dataAdSlot }) {
  const url =
    dataAdSlot === "tahoe"
      ? "https://bit.ly/4cyUAEN"
      : dataAdSlot === "blazer"
      ? "https://bit.ly/3zixsMz"
      : "https://bit.ly/3VW1VZu";
  return (
    <div className="Ad728x90">
      <Link href={url}>
        <Image
          src={
            dataAdSlot === "tahoe"
              ? "https://cdn.carprices.ae/assets/728x90_Tahoe_f636a152b6.jpg"
              : dataAdSlot === "blazer"
              ? "https://cdn.carprices.ae/assets/728x90_Blazer_d6b13f332e.jpg"
              : "https://cdn.carprices.ae/assets/728x90_Corvette_8ac44ccf59.jpg"
          }
          alt="ad-image-728X90"
          width={728}
          height={90}
          // layout="fill"
          // objectFit="cover"
        />
      </Link>
    </div>
  );
}
