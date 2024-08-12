import React from 'react';
import { carData } from "../../../../mocks/mock";

import 'tailwindcss/tailwind.css'; // Import Tailwind styles

const products = [
  // Example data structure
  {
    img: 'path-to-image.jpg',
    title: 'Product Title',
    text: 'Product description text goes here.'
  },
  // Add more products as needed
];

const ActiveSlider5 = ({ config }) => {
  return (
    <div className="app w-[800px] mx-[30px]">
      <div className="slick-list mx-[-10px]">
        {carData.chooseCar.map((x, i) => (
          <div key={i} className="img-card bg-[#f5f5f5] text-[#666] rounded-md overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg mx-[10px]">
            <img className="img w-full h-[200px] object-cover" src={x.image} alt={x.title} />
            <div className="card-body p-[15px]">
              <div className="card-title text-[20px] font-semibold">{x.brand}</div>
              <div className="card-text mt-[10px]">{x.model}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSlider5;
