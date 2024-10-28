import React, { useEffect, useState } from 'react';

const FilterSidebar = ({ selectedBrands, onBrandChange }) => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}brands-with-videos`); // Adjust the API endpoint if needed
            const data = await response.json();
            setBrands(data);
        };
        fetchBrands();
    }, []);

    return (
        <div className="w-full p-8 border-r shadow rounded-xl">
            <h4 className="text-xl font-bold mb-4">Filter by Brand</h4>
            <div className="space-y-2">
                {brands.map(brand => (
                    <div key={brand.id} className="flex items-center justify-between">
                       
                        <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                        <input
                            type="checkbox"
                            id={`brand-${brand.id}`}
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => onBrandChange(brand.id)}
                            className="mr-2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
