import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect, useRef } from "react";
import useTranslate from "../utils/useTranslate";

const NewSearch = ({ results = [], renderItem, value, onChange, onSelect }) => {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  const { popularSearch } = {
    popularSearch: [
      {
        brand: "Toyota",
        models: ["Camry", "Corolla", "Rav4"],
      },
      {
        brand: "Honda",
        models: ["Civic", "Accord", "CR-V"],
      },
      {
        brand: "Ford",
        models: ["F-150", "Mustang", "Escape"],
      },
      {
        brand: "Chevrolet",
        models: ["Silverado", "Malibu", "Equinox"],
      },
      {
        brand: "Tesla",
        models: ["Model S", "Model 3", "Model X", "Model Y"],
      },
      {
        brand: "BMW",
        models: ["3 Series", "5 Series", "X3", "X5"],
      },
      {
        brand: "Mercedes-Benz",
        models: ["C-Class", "E-Class", "GLC", "GLE"],
      },
      {
        brand: "Audi",
        models: ["A4", "Q5", "Q7"],
      },
      {
        brand: "Nissan",
        models: ["Altima", "Rogue", "Sentra"],
      },
      {
        brand: "Hyundai",
        models: ["Elantra", "Tucson", "Santa Fe"],
      },
    ],
  };

  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [showPopularSearch, setShowPopularSearch] = useState(false);
  const [sortedSampleData, setSortedSampleData] = useState([]);

  const handleSelection = (selectedIndex) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    resetSearchComplete();
    alert(selectedItem);
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
    setShowPopularSearch(false);
  }, []);

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  const handleInputClick = (value) => {
    if (value.trim().length === 0) {
      setShowPopularSearch(true);
      const sortData = popularSearch.map((item) => item.brand);
      setSortedSampleData(sortData);
    }
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    setLoading(true);
    if (results.length > 0 && !showResults) {
      setShowResults(true);
      setLoading(false);
    }

    if (results.length <= 0) {
      setShowResults(false);
      setLoading(false);
    }
  }, [results]);

  useEffect(() => {
    if (value) {
      setDefaultValue(value);
      setLoading(false);
    }
  }, [value]);

  return (
    <div className="tw-container">
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        className="tw-relative"
      >
        <input
          value={defaultValue}
          onChange={handleChange}
          type="text"
          className="tw-w-full tw-py-2 tw-px-3 tw-rounded tw-border tw-border-gray-300 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500"
          placeholder="Search by brand or tags ..."
          onClick={(e) => {
            handleInputClick(e.target.value);
          }}
        />

        {(showResults || showPopularSearch) && (
          <div className="tw-absolute tw-mt-1 tw-w-full tw-p-2 tw-bg-white tw-shadow-lg tw-rounded-b-lg tw-max-h-56 tw-overflow-auto">
            {showPopularSearch && !showResults && (
              <strong className="tw-pb-1">Popular Search</strong>
            )}
            {results.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => handleSelection(index)}
                ref={index === focusedIndex ? resultContainer : null}
                className={`tw-cursor-pointer tw-p-2 ${
                  index === focusedIndex ? "tw-bg-gray-100" : ""
                }`}
              >
                {renderItem(item)}
              </div>
            ))}
            {sortedSampleData.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => alert(item)}
                ref={index === focusedIndex ? resultContainer : null}
                className={`tw-cursor-pointer tw-p-2 ${
                  index === focusedIndex ? "tw-bg-gray-100" : ""
                }`}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSearch;
