import React, { useEffect, useState } from "react";
// import 'src/styles/carpricesDesktop.css'
import Image from "next/image";
import Link from "next/link";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead"; // ES2015
// var Typeahead = require("react-bootstrap-typeahead").Typeahead; // CommonJSimport { useRouter } from "next/router";
import axios from "axios";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useCallback } from "react";
import { useRouter } from "next/router";
import FeaturedImage from "../common/FeaturedImage";
import useTranslate from "@/utils/useTranslate";

const CACHE = {};

function Navbar() {
  const [results, setResults] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const router = useRouter();

  const { locales, asPath, locale: currentLocale } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (q) => {
    setQuery(q);
  };

  const handlePagination = (e, shownResults) => {
    const cachedQuery = CACHE[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    setIsLoading(true);

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      CACHE[query] = { ...cachedQuery, options, page };

      setIsLoading(false);
      setOptions(options);
    });
  };
  const handleOptionSelect = (selectedOption) => {
    if (selectedOption?.type === "brand") {
      typeof window != "undefined"
        ? localStorage.setItem("newsbrand", selectedOption?.Name)
        : "";
      router.push(`/brands/${selectedOption?.slug}`);
    } else if (selectedOption?.type === "model") {
      typeof window != "undefined"
        ? localStorage.setItem("newstagId", selectedOption?.id)
        : "";
      router.push(
        `/brands/${selectedOption?.brandSlug}/${selectedOption?.modelYear}/${selectedOption?.slug}`
      );
    }
  };

  const handleSelectionChange = (selectedOption) => {
    if (selectedOption[0]?.type === "brand") {
      typeof window != "undefined"
        ? localStorage.setItem("newsbrand", selectedOption[0]?.Name)
        : "";
      router.push(`/brands/${selectedOption[0]?.slug}`);
    } else if (selectedOption[0]?.type === "model") {
      typeof window != "undefined"
        ? localStorage.setItem("newstagId", selectedOption[0]?.id)
        : "";
      router.push(
        `/brands/${selectedOption[0]?.brandSlug}/${selectedOption[0]?.modelYear}/${selectedOption[0]?.slug}`
      );
    }
  };
  const filterBy = () => true;
  const handleClick = (id) => {
    // Store the ID in local storage
    localStorage.setItem("tagId", id);
  };

  const handleSearch = (query) => {
    setIsLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}search/${query}`)
      .then((resp) => {
        const mappedBrandData = resp.data.search.map((item) => {
          return {
            Name: item?.name,
            id: item?.id,
            slug: item?.slug,
            type: item?.type,
            brandSlug: item?.brand?.slug,
            modelYear: item?.mainTrim?.year,
            brandName: item?.brand?.name,
          };
        });

        const mergedData = [...mappedBrandData];
        setOptions(mergedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && options.length > 0) {
      e.preventDefault();
      // Select the first option programmatically
      handleOptionSelect(options[0]);
    }
  };

  const handleSelect = (selectedOption) => {
    router.push("/brands");
  };

  const t = useTranslate();
  const isRtl = router.locale === 'ar';

  return (
    <div className="header">
      <div className="topArea">
        <div className="container">
          <div className="row">
            <div className="logo col-sm-3">
              <Link href="/">
                <div className={"image-container"}>
                  <Image
                    // loader={myLoader}
                    src="/assets/images/logo/carprices.png"
                    alt=""
                    fill
                    className="image"
                  />
                </div>
              </Link>
            </div>

            <div className="searchArea col-sm-5">
              <div className="container">
                <form>
                  <span className="backArrow" />
                  <div className="ReactTypeahead inputfield gs_ta">
                    <AsyncTypeahead
                      filterBy={filterBy}
                      id="async-pagination-example"
                      isLoading={isLoading}
                      labelKey="Name"
                      minLength={1}
                      onSearch={handleSearch}
                      options={options}
                      onKeyDown={handleKeyDown}
                      selectHintOnEnter={false}
                      placeholder="Search for Brands and Cars..."
                      selected={selectedOptions}
                      onChange={handleSelectionChange}
                      renderMenuItemChildren={(option) => (
                        <>
                          {option?.type === "brand" && (
                            <>
                              {options.findIndex(
                                (opt) => opt.type === "brand"
                              ) ===
                                options.findIndex(
                                  (opt) => opt.Name === option.Name
                                ) && (
                                <>
                                  <div>
                                    <h5 className="dropdown_sub_head fw-bold">
                                      Brands
                                    </h5>
                                  </div>
                                </>
                              )}
                              <div>{option.Name}</div>
                            </>
                          )}
                          {option.type === "model" && (
                            <>
                              {options.findIndex(
                                (opt) => opt.type === "model"
                              ) ===
                                options.findIndex(
                                  (opt) => opt.Name === option.Name
                                ) && (
                                <>
                                  <div>
                                    <h5 className="dropdown_sub_head fw-bold">
                                      Cars
                                    </h5>
                                  </div>
                                </>
                              )}
                              <div className="option_select">
                                {option.brandName} {option.Name}
                              </div>
                            </>
                          )}
                        </>
                      )}
                      useCache={false}
                      onSelect={handleSelect}
                    />
                  </div>
                  <button
                    className="searchbtn"
                    type="button"
                    onClick={() => handleSelectionChange(options)}
                  >
                    <i />
                  </button>
                </form>
              </div>
            </div>
            {/* <div className="col-sm-4 d-flex justify-content-end align-items-end">
                <div className="me-4">
                  <i className="bi bi-bell position-relative">
                    <span className="position-absolute translate-middle badge rounded-pill bg-primary">
                      <small>2</small>
                    </span>
                  </i>
                </div>
                <div className="me-4">
                  <i className="bi bi-heart position-relative">
                    <span className="position-absolute translate-middle badge rounded-pill bg-primary visually-hidden">
                      <small>2</small>
                    </span>
                  </i>
                </div>
                <div className="login-register-btn">
                  <i className="bi bi-person fs-5" />
                  Login / Register
                </div>
              </div> */}
          </div>
        </div>
      </div>
      <div className="bottomArea">
        <div className="container">
          <div className="row">
            <nav className={`col-sm-12 col-md-12 d-flex justify-content-between ${isRtl ? "flex-row-reverse" : ""}`}>
              <ul className={`d-flex ${isRtl ? "flex-row-reverse" : ""}`}>
                <li>
                  <Link title="Compare Cars" href="/search-cars">
                    <span className="innerSpan">{t.SearchCars}</span>
                  </Link>
                </li>

                <li className="mainMenu">
                  <a href="javascript:void(0);">
                    <span className="nonClickable">
                    {t.NewsandReviews} <i />
                    </span>
                  </a>
                  <ul className="subMenu">
                    <li>
                      <Link title="Car News" href="/news">
                        <span className="innerSpan">{t.CarNews}</span>
                      </Link>
                    </li>

                    <li>
                      <Link title="User Reviews" href="/reviews">
                        <span className="innerSpan">{t.Reviews}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link title="Compare Cars" href="/compare-cars">
                    <span className="innerSpan">{t.CompareCars}</span>
                  </Link>
                </li>
                <li>
                  <a title="Loan Calculator" href="/loan-calculator">
                    <span className="innerSpan">{t.Loancalculator}</span>
                  </a>
                </li>
              </ul>
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
                          <span
                            className={`${
                              currentLocale === locale
                                ? "fw-bold text-primary"
                                : "fw-bold text-primary"
                            }`}
                          >
                            {locale === "en" ? t.Language : t.Language}
                          </span>
                        </Link>
                      </div>
                    );
                  }
                  return null; // Do not render anything for other cases
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
