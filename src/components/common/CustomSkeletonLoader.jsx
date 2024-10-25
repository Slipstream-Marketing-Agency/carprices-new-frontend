import React from 'react';

const CustomSkeletonLoader = ({ width, height }) => {
    return (
        <div
            className={`bg-gray-300 animate-pulse rounded-lg`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        ></div>
    );
};

export default CustomSkeletonLoader;
