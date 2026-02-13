'use client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PrimaryButton from '../buttons/PrimaryButton';

const FilterSidebar = ({ selectedBrand, onBrandChange, selectedModel, onModelChange, onFilterChange }) => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);

  // Fetch brand options on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}brands-with-videos`);
        const data = await response.json();
        setBrandOptions(data.map(brand => ({ value: brand.slug, label: brand.name })));
      } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching brands:", error); }
      }
    };

    fetchBrands();
  }, []);

  // Fetch model options whenever a new brand is selected
  useEffect(() => {
    const loadModels = async () => {
      if (!selectedBrand) {
        setModelOptions([]);
        setLoadingModels(false);
        return;
      }

      setLoadingModels(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}models-with-videos?brandSlug=${selectedBrand}`);
        const data = await response.json();

        setModelOptions(data.map(model => ({ value: model.slug, label: model.name })));
      } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error fetching models:", error); }
      } finally {
        setLoadingModels(false);
      }
    };

    loadModels();
  }, [selectedBrand]);

  // Handle brand selection change
  const handleBrandSelect = (selectedOption) => {
    const brand = selectedOption ? selectedOption.value : null;
    onBrandChange(brand);
    setModelOptions([]);
    onModelChange(null); // Reset model
    onFilterChange(brand, null); // Update filter immediately on brand change
  };

  // Handle model selection change
  const handleModelSelect = (selectedOption) => {
    const model = selectedOption ? selectedOption.value : null;
    onModelChange(model);
    onFilterChange(selectedBrand, model); // Update filter with the new model
  };

  return (
    <div className="w-full border-r  rounded-xl mb-4 ">

      <div className="flex items-center gap-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Search by Brand</h4>
          <Select
            options={brandOptions}
            value={brandOptions.find(option => option.value === selectedBrand)}
            onChange={handleBrandSelect}
            isClearable
            placeholder="Select a brand"
            styles={{
              container: (provided) => ({ ...provided, width: '100%' }),
              control: (provided) => ({ ...provided, minWidth: '300px', maxWidth: '300px' }),
            }}
          />
        </div>
        <div>
          {selectedBrand && !loadingModels && modelOptions.length > 0 && (
            <>
              <h4 className="text-sm font-medium mb-1">Search by Model</h4>
              <Select
                options={modelOptions}
                value={modelOptions.find(option => option.value === selectedModel)}
                onChange={handleModelSelect}
                isClearable
                placeholder="Select a model"
                styles={{
                  container: (provided) => ({ ...provided, width: '100%' }),
                  control: (provided) => ({ ...provided, minWidth: '300px', maxWidth: '300px' }),
                }}
              />
            </>
          )}
        </div>
        {/* <PrimaryButton
          label="Search Videos"
          additionalClass="font-bold h-12 mt-5"
          onClick={() => onFilterChange(selectedBrand, selectedModel)}
        /> */}
      </div>
    </div>
  );
};

export default FilterSidebar;
