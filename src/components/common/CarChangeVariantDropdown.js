import React, { useState } from 'react'

export default function CarChangeVariantDropdown() {
    const [selectedVariant, setSelectedVariant] = useState('Select a variant');

    const handleVariantSelect = (variant) => {
      setSelectedVariant(variant);
    }
    const carVariants = ['Variant 1', 'Variant 2', 'Variant 3'];


  return (
    <div className="dropdown">
      <button
        className=" dropDownBtn"
        type="button"   
        id="variantsDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span>{selectedVariant}</span>
        <i className="bi bi-caret-down-fill ms-2"></i>
      </button>
      <ul className="dropdown-menu w-100" aria-labelledby="variantsDropdown">
        {carVariants.map((variant, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleVariantSelect(variant)}
            >
              {variant}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
