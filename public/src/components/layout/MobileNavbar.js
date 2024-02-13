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
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';
import { Menu } from 'primereact/menu';

const CACHE = {};
const PER_PAGE = 50;


function MobileNavbar() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

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
      typeof window != 'undefined' ? localStorage.setItem('newsbrand', selectedOption?.Name) : ""
      router.push(`/brands/${selectedOption?.slug}`)
    }
    else if (selectedOption?.type === "model") {
      typeof window != 'undefined' ? localStorage.setItem('newstagId', selectedOption?.id) : ""
      router.push(`/brands/${selectedOption?.brandSlug}/${selectedOption?.modelYear}/${selectedOption?.slug}`)
    }
  };


  const handleSelectionChange = (selectedOption) => {

    if (selectedOption[0]?.type === "brand") {
      typeof window != 'undefined' ? localStorage.setItem('newsbrand', selectedOption[0]?.Name) : ""
      router.push(`/brands/${selectedOption[0]?.slug}`)
    }
    else if (selectedOption[0]?.type === "model") {
      typeof window != 'undefined' ? localStorage.setItem('newstagId', selectedOption[0]?.id) : ""
      router.push(`/brands/${selectedOption[0]?.brandSlug}/${selectedOption[0]?.modelYear}/${selectedOption[0]?.slug}`)
    }
  };
  const filterBy = () => true;
  const handleClick = (id) => {
    // Store the ID in local storage
    localStorage.setItem('tagId', id);
  };


  const handleSearch = (query) => {
    setIsLoading(true);

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}search/${query}`)
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
          }
        });




        const mergedData = [...mappedBrandData];
        setOptions(mergedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };
  const handleSelect = (selectedOption) => {
    router.push("/brands");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && options.length > 0) {
      e.preventDefault();
      // Select the first option programmatically
      handleOptionSelect(options[0]);
    }
  }

  const items = [
    {
      label: 'Home',
      slug: "/"
    },
    {
      label: 'Search Cars',
      slug: "/search-cars"
    },
    {
      label: 'Compare Cars',
      slug: "/compare-cars"
    },
    {
      label: 'News',
      slug: "/news"
    },
    {
      label: 'Reviews',
      slug: "/reviews?page=1"
    },
    {
      label: 'Loan Calculator',
      slug: "/loan-calculator"
    },


  ]



  return (
    <>
      {router.asPath == "/search-cars" ? null : <><div className="header">
        <div className="topArea">
          <div className="container">
            <div className="row justify-content-between">
              <div className="logo col-sm-3 col-1">
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
              <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div className="mt-3">
                  {items?.map((item, index) => (
                    <Link href={item.slug}>
                      <div key={index} className={`my-styled-item ${router?.pathname === item?.slug.split('?')[0] ? 'active' : ''}`}>
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </Sidebar>
              <div className="col-2">
                <button className="btn btn-primary " onClick={() => setVisible(true)} ><i class="bi bi-list" /></button>
              </div>



            </div>
            <div className="searchArea mt-2">
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
                          {option?.type === 'brand' && (
                            <>
                              {options.findIndex((opt) => opt.type === 'brand') === options.findIndex((opt) => opt.Name === option.Name) && (
                                <>
                                  <div>
                                    <h5 className="dropdown_sub_head fw-bold">Brands</h5>
                                  </div>
                                </>
                              )}
                              <div>
                                {option.Name}
                              </div>
                            </>
                          )}
                          {option.type === 'model' && (
                            <>
                              {options.findIndex((opt) => opt.type === 'model') === options.findIndex((opt) => opt.Name === option.Name) && (
                                <>
                                  <div>
                                    <h5 className="dropdown_sub_head fw-bold">Cars</h5>
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
          </div>
        </div>
      </div>
        <>
          <div className="mobile-bottom-nav container">
            <div className="row">

              <div className={router.pathname == "/" ? "col active py-2" : "col py-2"}>
                <Link href="/">
                  <p>
                    {" "}
                    <i className="bi bi-house-fill" />
                  </p>
                  <p>Home</p>
                </Link>
              </div>
              <div className={router.pathname == "/search-cars" ? "col active py-2" : "col py-2"}>
                <Link href="/search-cars">
                  <p>
                    <i className="bi bi-search" />
                  </p>
                  <p>Search</p>
                </Link>
              </div>
              <div className={router.pathname == "/loan-calculator" ? "col active py-2" : "col py-2"}>
                <Link href="/loan-calculator">
                  <p>
                    <i class="bi bi-calculator" />
                  </p>
                  <p>Calculator</p>
                </Link>
              </div>
              <div className={router.pathname == "/compare-cars" ? "col active py-2" : "col py-2"}>
                <Link href="/compare-cars">
                  <p>
                    <i class="bi bi-repeat" />
                  </p>
                  <p>Compare</p>
                </Link>
              </div>
              <div className={router.pathname == "/news" ? "col active py-2" : "col py-2"}>
                <Link href="/news">
                  <p>
                    <i class="bi bi-newspaper"></i>
                  </p>
                  <p>News</p>
                </Link>
              </div>
            </div>
          </div>
        </></>}

    </>

  );
}

export default MobileNavbar;
