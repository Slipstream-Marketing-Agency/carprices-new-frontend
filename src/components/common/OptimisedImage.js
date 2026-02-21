// /s../components-old/Common/OptimizedImage.js

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/store/slices/imageSlice';
import SkeletonLoader from './SkeletonLoader';

const OptimizedImage = ({ src, alt, layout = 'responsive', width, height, sizes, objectFit = 'cover', id, className, ...props }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.image.loading[id]);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '50px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    dispatch(setLoading({ id, loading: false }));
  };

  useEffect(() => {
    dispatch(setLoading({ id, loading: true }));
  }, [dispatch, id]);

  const imgStyle = layout === 'fill' 
    ? { width: '100%', height: '100%', objectFit } 
    : { objectFit };

  return (
    <div className="relative" ref={imageRef}>
      {isLoading && <SkeletonLoader width={width} height={height} />}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={layout !== 'fill' ? width : undefined}
          height={layout !== 'fill' ? height : undefined}
          style={imgStyle}
          onLoad={handleLoadingComplete}
          className={`${!isLoading ? 'block' : 'hidden'} ${className || ''}`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;

