"use client"
import { useState } from 'react';
import Select from 'react-select';
// // import { carData } from '@/app/mocks/mock';
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

// selectedOptionBrand={selectedOptionBrand}
// setSelectedOptionBrand={setSelectedOptionBrand}
// options={carData.Brands}
// placeholder={"Choose Brand"}

export default function SelectComponent({selectedOption, setSelectedOption, selectOptions,placeholder}) {
//   const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption,"selected");

  return (
    <div className='w-full'>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        placeholder={placeholder}
        options={selectOptions}
      />
    </div>
  );
}
