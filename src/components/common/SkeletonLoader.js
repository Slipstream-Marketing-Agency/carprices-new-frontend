

import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = ({ width, height }) => {
  return (
    <Skeleton variant="rectangular" width={width} height={height} />
  );
};

export default SkeletonLoader;
