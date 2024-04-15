// FeaturedImage.js

import { ImageLoadingContext } from '@/src/utils/ImageLoadingContext';
import React, { useContext, useEffect } from 'react';

const FeaturedImage = ({ src, alt, title, id, width, height }) => {
  const { loadedImages, markImageAsLoaded } = useContext(ImageLoadingContext);
  const imageUrl = src;

  useEffect(() => {
    if (!loadedImages[imageUrl]) {
      // Preload image and mark it as loaded
      const img = new Image();
      img.src = imageUrl === null ? "/assets/img/car-placeholder.png" : imageUrl;
      img.onload = () => {
        markImageAsLoaded(imageUrl);
      };
      img.onerror = () => {
        // In case of an error loading the image, mark it as loaded to avoid infinite loading
        markImageAsLoaded(imageUrl);
      };
    }
  }, [imageUrl, loadedImages, markImageAsLoaded]);

  return (
    <>
      {/* Render image based on loadedImages context */}
      <img
        src={imageUrl === null ? "/assets/img/car-placeholder.png" : imageUrl}
        width={width}
        height={height}
        title={title}
        alt={alt}
        style={{ display: loadedImages[imageUrl] ? "block" : "none" }}
      />
    </>
  );
};

export default FeaturedImage;
