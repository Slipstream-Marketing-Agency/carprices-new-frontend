// ImageLoadingContext.js

import React, { createContext, useState } from 'react';

export const ImageLoadingContext = createContext();

export const ImageLoadingProvider = ({ children }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const markImageAsLoaded = (src) => {
    setLoadedImages({ ...loadedImages, [src]: true });
  };

  return (
    <ImageLoadingContext.Provider value={{ loadedImages, markImageAsLoaded }}>
      {children}
    </ImageLoadingContext.Provider>
  );
};
