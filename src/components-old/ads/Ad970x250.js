import Image from "next/image";
import Link from "next/link";
export default function Ad970x250() {
  return (
    //replaced className to Ad728x90 as image with dimension 970X250 not availble from Alghandi Motors"
    <div className="Ad728x90">
      <Link href="https://bit.ly/3zixsMz">
        <Image src={"/ads/Blazer/728X90-Blazer.jpg"}
          alt="ad-image-970X250"
          width={728}
          height={90}
        // layout="fill"
        objectFit="cover"
        layout="responsive"
        />
      </Link>
    </div>
  )
}