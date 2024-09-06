import Image from "next/image";
import Link from "next/link";
export default function Ad300X250() {
  return (
    <div className="Ad300X250">
      <Link href="https://bit.ly/3zixsMz">
        <Image src={"ads/Blazer/300X250-Blazer.jpg"}
          alt="ad-image1"
          width={300}
          height={250}
        // layout="fill"
        objectFit="cover"
        layout="responsive"
        />
      </Link>
    </div>
  )
}