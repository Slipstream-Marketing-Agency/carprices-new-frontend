import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect, useRef } from "react";
import useTranslate from "../utils/useTranslate";

const LiveSearch = ({
    results = [],
    renderItem,
    value,
    onChange,
    onSelect,
}) => {
    const router = useRouter();
    const t = useTranslate();
    let isRtl = router.locale === 'ar';
    const {popularSearch}={
        "popularSearch": [
          {
            "brand": "Toyota",
            "models": ["Camry", "Corolla", "Rav4"]
          },
          {
            "brand": "Honda",
            "models": ["Civic", "Accord", "CR-V"]
          },
          {
            "brand": "Ford",
            "models": ["F-150", "Mustang", "Escape"]
          },
          {
            "brand": "Chevrolet",
            "models": ["Silverado", "Malibu", "Equinox"]
          },
          {
            "brand": "Tesla",
            "models": ["Model S", "Model 3", "Model X", "Model Y"]
          },
          {
            "brand": "BMW",
            "models": ["3 Series", "5 Series", "X3", "X5"]
          },
          {
            "brand": "Mercedes-Benz",
            "models": ["C-Class", "E-Class", "GLC", "GLE"]
          },
          {
            "brand": "Audi",
            "models": ["A4", "Q5", "Q7"]
          },
          {
            "brand": "Nissan",
            "models": ["Altima", "Rogue", "Sentra"]
          },
          {
            "brand": "Hyundai",
            "models": ["Elantra", "Tucson", "Santa Fe"]
          }
        ]
      }
      

    const [loading, setLoading] = useState(false)

    const [focusedIndex, setFocusedIndex] = useState(-1);
    const resultContainer = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [defaultValue, setDefaultValue] = useState("");
    const [showPopularSearch,setShowPopularSearch]=useState(false)
    const [sortedSampleData,setSortedSampleData]=useState([])

    const handleSelection = (selectedIndex) => {
        const selectedItem = results[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        onSelect && onSelect(selectedItem);
        // router.push('/brands/')
        resetSearchComplete();
        alert(selectedItem);
    };

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(-1);
        setShowResults(false);
        setShowPopularSearch(false)
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

    const handleInputClick=(value)=>{
        if(value.trim().length===0){
            setShowPopularSearch(true)
            const sortData=popularSearch.map((item)=>(
                item.brand
            ))
            setSortedSampleData(sortData)
            console.log("Popular search",[...results]);
        }
    }
    useEffect(() => {
        if (!resultContainer.current) return;

        resultContainer.current.scrollIntoView({
            block: "center",
        });
    }, [focusedIndex]);

  

    useEffect(() => {
        setLoading(true)
        if (results.length > 0 && !showResults) { setShowResults(true); setLoading(false) }

        if (results.length <= 0) { setShowResults(false); setLoading(false) }
    }, [results]);

    useEffect(() => {
        if (value) { setDefaultValue(value);; setLoading(false) }

    }, [value]);

    return (
        <div className="container">
            <div
                tabIndex={1}
                onBlur={resetSearchComplete}
                onKeyDown={handleKeyDown}
                className="position-relative"
            >
                {/* <input
                    value={defaultValue}
                    onChange={handleChange}
                    type="text"
                    className="form-control w-100 py-2 px-3 rounded"
                    placeholder="Search by brand or tags ..."
                /> */}



                {/* <div class="input-group form-group has-search">
                    <i class="bi bi-search form-control-feedback"></i>
                   
                    <div className="form-inner">
                        <input type="text" placeholder={t.searchForBrandandCars} autocomplete="off" class="SearchInputField   rounded " value={defaultValue}
                            onChange={handleChange} id="example-search-input" onClick={(e)=>{handleInputClick(e.target.value)}}/>
                        <button type="submit">
                            <i className="bi bi-search" />
                        </button>
                    </div>
                </div> */}

                {/* Search Results Container */}
                {(showResults || showPopularSearch) && (
                    <div className="searchResultBox position-absolute mt-1 w-100 p-2 bg-white shadow-lg rounded-bottom rounded-end max-h-56 overflow-auto">
                        {(showPopularSearch && !showResults) && <strong className="pb-1">Popular Search</strong>}
                        {results.map((item, index) => (
                            <div
                                key={index}
                                onMouseDown={() => handleSelection(index)}
                                ref={index === focusedIndex ? resultContainer : null}
                                className={` cursor_pointer p-2 ${index === focusedIndex ? "bg-light" : ""
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
                                className={` cursor_pointer p-2 ${index === focusedIndex ? "bg-light" : ""
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

export default LiveSearch;
