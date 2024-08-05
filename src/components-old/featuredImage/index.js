import Image from "next/image";
import { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FeaturedImage({ src, alt, title, id, width, height }) {

  
//   const imageUrl =
//     src === undefined || src === null
//       ? "/assets/images/placeholders/car-placeholder.png"
//       : process.env.NEXT_PUBLIC_S3_URL + src;

//   const [imageLoaded, setImageLoaded] = useState(false);
//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };
  

  return (
    <>
      {/* {!imageLoaded && 
        <Skeleton height={"100%"} width={"100%"} />} */}

        <img
          // className={imageLoaded ? "" : "opacity-0"}

        //   src={imageUrl}
            src="/assets/img/bmwbrandIcon.png"    

          // width={width}
          // height={height}
          // key={id}
          // loading="lazy"
          title={title}
          alt={alt}
          // onLoad={(image) => {handleImageLoad(image)}} // Pass as an anonymous arrow function

        />
    </>
  );
}
