'use client'

import React, { useEffect, useState } from 'react'
import CustomSlider from '../popular-sections/CustomSlider';

const BrandSection = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home/find`);
                const data = await response.json();

                setBrands(data?.data?.brand || []);
            } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching data:', error); }
            }
        };

        fetchData();
    }, []);

    return (
        <CustomSlider items={brands} title="Popular EV Brands" basePath="brands" />
    )
}

export default BrandSection