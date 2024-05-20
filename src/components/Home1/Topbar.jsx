import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import LiveSearch from "../Dropdown";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/src/lib/apolloClient";
import axios from "axios";
import { LanguageSwitcher } from "../LanguageSwitcher";
function Topbar() {
  const router = useRouter();
  const { locales, asPath, locale: currentLocale } = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";

  const [isLoading, setIsLoading] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const client = createApolloClient();

  const fetchBrands = async (brandInput) => {
    try {
      setIsLoading(true);
      const { data } = await client.query({
        query: gql`
            query {
              carBrands(filters:{name:{containsi:"${brandInput}"}}) {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
            `,
      });

      const brands = data.carBrands.data;
      setBrandOptions(brands);
      //
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };
  const fetchTags = async (tagInput) => {
    try {
      const { data } = await client.query({
        query: gql`
            query{
              articleCategories(filters:{name:{containsi:"${tagInput}"}}){
                data{
                  attributes{
                    name
                    slug
                    articles{
                      data{
                        attributes{
                          title
                          slug
                          
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
      });
      const tags = data.articleCategories.data;
      setTagOptions(tags);

      //
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete
    }
  };

  const fetchAllBrands = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query SearchBrands {
            carBrands(pagination: { limit: -1 }, sort: "name:asc") {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
          }
        `,
      });

      setBrandOptions(data.carBrands.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
    setSearchLoading(false);
  };

  const [results, setResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleChange = (e) => {
    fetchBrands(e.target.value);
    fetchTags(e.target.value);
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    // const filteredValue = profiles.filter((profile) =>
    //   profile.name.toLowerCase().startsWith(target.value.toLowerCase())
    // );
    const filteredValue = brandOptions.map((brand) => brand.attributes.name);

    const tagsfilteredValue = tagOptions.map((tag) => tag.attributes.name);

    setResults([...tagsfilteredValue, ...filteredValue]);
  };

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Handle click outside the search bar to close the dropdown
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }car-models/search?searchTerm=${encodeURIComponent(searchTerm)}`
      );

      setSearchResults(response.data.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleItemClick = (item) => {
    if (item.type === "brand") {
      // Redirect to the brand page
      router.push(`/brands/${item.slug}`);
    } else if (item.type === "model") {
      // Redirect to the model page (assuming you have the year available in the item)
      router.push(`/brands/${item.brandSlug}/${item.year}/${item.slug}`);
    }
    setShowDropdown(false);
  };

  const formatLabel = (item) => {
    if (item.type === "brand") {
      return item.name;
    } else if (item.type === "model") {
      return `${item.year} ${item.brand} ${item.name}`;
    }
  };
  return (
    <div className={`top-bar ${isRtl && "flex-row-reverse"}`}>
      <div className="company-logo">
        <Link legacyBehavior href="/">
          <a>
            <img
              src="/assets/img/car-prices-logo.png"
              alt="logo"
              width={200}
              height={120}
            />
          </a>
        </Link>
      </div>
      {/* <div className="position-relative" ref={searchRef}>
        <input
          type="search"
          className="form-control"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          autoComplete="off"
        />
        {showDropdown && searchResults.length > 0 && (
          <div className="dropdown-menu show">
            {searchResults.map((item, index) => (
              <button
                key={index}
                type="button"
                className="dropdown-item"
                onClick={() => handleItemClick(item)}
              >
                {formatLabel(item)}
              </button>
            ))}
          </div>
        )}
      </div> */}
      <div className="search-area position-relative" ref={searchRef}>
        <form>
          <div className="form-inner">
            <input
              type="search"
              className="form-control"
              value={query}
              onChange={handleInputChange}
              placeholder={t.searchForBrandandCars}
              autoComplete="off"
            />
            <button type="submit">
              <i className="bi bi-search" />
            </button>
          </div>

          {/* test input begins */}
          <div>
            <div className="container">
              {showDropdown && searchResults.length > 0 && (
                <div className="searchResultBox position-absolute mt-1 w-100 p-2 bg-white shadow-lg rounded-bottom rounded-end max-h-56 overflow-auto">
                  {searchResults.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className={` cursor_pointer p-2 `}>
                        {" "}
                        {formatLabel(item)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <LiveSearch
              results={results}
              value={selectedProfile ? selectedProfile.name : ""}
              renderItem={(item) => <p>{item}</p>}
              onChange={handleChange}
              onSelect={(item) => setSelectedProfile(item)}
            />
          </div>
          {/* test input ends */}
        </form>
      </div>
      <div className="topbar-right">
        <ul>
          <li>
            {/* <button
              type="button"
              className="primary-btn1"
              data-bs-toggle="modal"
              data-bs-target="#signUpModal01"
            >
              {locale === "en" ? "English" : "عربي"}
            </button> */}
          </li>
        </ul>
        {/* {process.env.NEXT_PUBLIC_MODE === "development" && (
          <ul className="d-flex justify-content-center align-items-center">
            {locales.map((locale, idx) => {
              // Only show Arabic if the current locale is English, and vice versa
              if (
                (currentLocale === "en" && locale === "ar") ||
                (currentLocale === "ar" && locale === "en")
              ) {
                return (
                  <div key={idx}>
                    <Link
                      href={asPath}
                      locale={locale}
                      key={locale}
                      className="mx-2"
                    >
                      <button
                        type="button"
                        className={`${
                          currentLocale === locale
                            ? "fw-bold text-white"
                            : "fw-bold text-white"
                        } primary-btn1 text-white`}
                      >
                        {locale === "en" ? "English" : "عربي"}
                      </button>
                    </Link>
                  </div>
                );
              }
              return null; 
            })}
          </ul>
        )} */}
      </div>
    </div>
  );
}

export default Topbar;
