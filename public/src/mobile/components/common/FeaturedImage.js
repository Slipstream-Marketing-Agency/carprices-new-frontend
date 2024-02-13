import Image from "next/image";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FeaturedImage({ src, alt, title,setIsLoading,id }) {
  const imageUrl =
    src === undefined || src === null
      ? "/assets/images/placeholders/car-placeholder.png"
      : process.env.NEXT_PUBLIC_S3_URL + src;

      

  return (
    <img src={imageUrl} width={500} height={500} key={id} lazy layout="responsive" title={title} alt={alt} />
  );
}
