import Image from "next/image";
import { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FeaturedImage({ src, alt, title, id, width, height }) {

  
  const imageUrl = src;

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  console.log(imageUrl,"imageUrlimageUrl");
  

  return (
    <>
      {/* {!imageLoaded && 
        <Skeleton height={"100%"} width={"100%"} />} */}

        <Image
          // className={imageLoaded ? "" : "opacity-0"}
          src={imageUrl === null ? "/assets/img/car-placeholder.png" : imageUrl}
          width={width}
          height={height}
          // key={id}
          loading="lazy"
          title={title}
          alt={alt}
          // onLoad={(image) => {handleImageLoad(image)}} // Pass as an anonymous arrow function

        />
    </>
  );
}
