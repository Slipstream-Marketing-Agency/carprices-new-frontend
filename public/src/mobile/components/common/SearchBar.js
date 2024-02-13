import React, { useState } from 'react';
import Select from 'react-select';

export default function SearchBar() {
    const options = [
        { value: '1', label: 'Toyota Camry' },
        { value: '2', label: 'Nissan Altima' },
        { value: '3', label: 'Honda Accord' },
        { value: '4', label: 'Ford Explorer' },
        { value: '5', label: 'Chevrolet Tahoe' },
        { value: '6', label: 'Kia Optima' },
        { value: '7', label: 'Hyundai Sonata' },
        { value: '8', label: 'Mitsubishi Lancer' },
        { value: '9', label: 'Mercedes-Benz C-Class' },
        { value: '10', label: 'BMW 5 Series' },
        // Add more car names here as needed
      ];
    
      const [searchValue, setSearchValue] = useState('');
      const [searchResults, setSearchResults] = useState([]);
    
      const handleSearch = () => {
        // Perform search logic here, e.g. filter options array based on searchValue
        const filteredOptions = options.filter(option =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filteredOptions);
      };
  return (
    <div>
      <h1>Car Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a car..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Select
        options={searchResults}
        // Custom styling can be added using the `styles` prop
      />
    </div>
  )
}

