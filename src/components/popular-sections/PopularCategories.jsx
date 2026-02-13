// app/components/PopularCategories.js
'use client';

import { useEffect, useState } from 'react';
import CustomSlider from './CustomSlider';

const PopularCategories = () => {
  const [brands, setBrands] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home/find`);
        const data = await response.json();

        setBrands(data?.data?.brand || []);
        setBodyTypes(data?.data?.bodyTypes || []);
      } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching data:', error); }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <CustomSlider items={brands} title="Popular Brands" basePath="brands" />
      <CustomSlider items={bodyTypes} title="Popular Body Types" basePath="body-types" />
    </div>
  );
};

export default PopularCategories;
