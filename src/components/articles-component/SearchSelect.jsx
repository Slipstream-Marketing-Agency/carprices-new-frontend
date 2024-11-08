// src/components/SearchSelect.js

"use client";
import { useState, useEffect, useCallback } from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import PrimaryButton from '../buttons/PrimaryButton';

export default function SearchSelect({ articleType }) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedRecentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (search) => {
    const updatedSearches = [search, ...recentSearches.filter(item => item.value !== search.value)];
    if (updatedSearches.length > 5) updatedSearches.pop(); // Limit recent searches to 5
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Fetch search results based on input value or default data if no query
  const fetchOptions = useCallback(async (inputValue, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/search/${articleType}/tags-categories`, {
        params: { query: inputValue || undefined, page, pageSize: 10 },
      });
      const { categories, tags } = response.data;

      const newOptions = [
        {
          label: 'Categories',
          options: categories.map((category) => ({
            label: category.name,
            value: category.slug,
            type: 'category',
          })),
        },
        {
          label: 'Tags',
          options: tags.map((tag) => ({
            label: tag.name,
            value: tag.slug,
            type: 'tag',
          })),
        },
      ];

      setOptions((prevOptions) =>
        page === 1 ? newOptions : [...prevOptions, ...newOptions]
      );
      setHasMore(categories.length > 0 || tags.length > 0);
    } catch (error) {
      console.error('Error fetching search options:', error);
    } finally {
      setIsLoading(false);
    }
  }, [articleType]);

  const MenuList = (props) => (
    <components.MenuList {...props}>
      {inputValue === "" && recentSearches.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2">
          <span className=" text-gray-400 text-sm">Recent Searches</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearRecentSearches();
              props.selectProps.onInputChange("");
            }}
            className="text-sm text-blue-500 hover:underline"
          >
            Clear
          </button>
        </div>
      )}
      {inputValue === "" && recentSearches.map((search, index) => (
        <div
          key={index}
          onClick={() => props.selectProps.onChange(search)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {search.label}
        </div>
      ))}
      {props.children}
    </components.MenuList>
  );

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    setPage(1);
    fetchOptions(newValue, 1);
  };

  const handleMenuOpen = () => {
    if (!inputValue) {
      setPage(1);
      fetchOptions("", 1);
    }
  };

  const handleMenuScrollToBottom = () => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOptions(inputValue, nextPage);
    }
  };

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const handleSearch = () => {
    if (selectedOption) {
      saveRecentSearch(selectedOption);

      const selectedType = selectedOption.type;
      const selectedValue = selectedOption.value;

      if (selectedType === 'category') {
        window.location.href = `/${articleType}/category/${selectedValue}`;
      } else if (selectedType === 'tag') {
        window.location.href = `/${articleType}/tag/${selectedValue}`;
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-full space-y-4 sm:space-y-0 sm:space-x-4 my-6">
      <div className="relative w-full sm:w-auto flex-grow">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
          <SearchIcon />
        </div>
        <Select
          options={options}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onChange={handleChange}
          onMenuOpen={handleMenuOpen}
          onMenuScrollToBottom={handleMenuScrollToBottom}
          placeholder="Search for categories or tags..."
          noOptionsMessage={() => "No results found"}
          isClearable
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            MenuList,
          }}
          styles={{
            control: (provided) => ({
              ...provided,
              width: '100%',
              borderRadius: '10px',
              border: 'none',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              paddingLeft: '35px',
              height: '45px',
              cursor: 'pointer',
            }),
            input: (provided) => ({
              ...provided,
              marginLeft: '0px',
            }),
          }}
          menuPlacement="auto"
        />
      </div>
      <PrimaryButton label="Search" additionalClass="w-full sm:w-[150px]" onClick={handleSearch} />
    </div>
  );
}
