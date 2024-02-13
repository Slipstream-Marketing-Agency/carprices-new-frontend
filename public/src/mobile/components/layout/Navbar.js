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


// var Typeahead = require('react-bootstrap-typeahead').Typeahead; // CommonJS
// const [index, setIndex] = useState<number>(getIndex());
// const [selected, setSelected] = useState<Option[]>([]);

// const state = options[index];

// let isInvalid;
// let isValid;

// if (selected.length) {
//   const isMatch = selected[0].name === state.name;

//   isInvalid = !isMatch;
//   isValid = isMatch;
// }
// const vehicleList = [
//   { id: 1, make: "Toyota", model: "Camry" },
//   { id: 2, make: "Honda", model: "Civic" },
//   { id: 3, make: "Ford", model: "F-150" },
//   { id: 4, make: "Chevrolet", model: "Silverado" },
// ];
const CACHE = {};
const PER_PAGE = 50;
const SEARCH_URI = "https://api.github.com/search/users";

function makeAndHandleRequest(query, page = 1) {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `search/${query}`)
    .then((resp) => resp.json())
    .then((data, total_count) => {
      const options = data?.search?.map((i) => ({
        avatar_url: i.image,
        id: i.id,
        login:
          i.year + " " + i.brandname + " " + i.modelname + " " + i.trimname,
        yearslug: i.year,
        brandslug: i.brandslug,
        modelslug: i.modelslug,
        trimslug: i.trimslug,
      }));
      
      return { options, total_count };
    });
}

function Navbar() {
  const [results, setResults] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const router = useRouter();
  

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");

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

  const handleSearch = useCallback((q) => {
    if (CACHE[q]) {
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };

      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);

  const handleSelect = (selectedOption) => {
    router.push("/brands");
  };

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
                  <form action="/searchresult">
                    <span className="backArrow" />
                    <div className="ReactTypeahead inputfield gs_ta">

                      <AsyncTypeahead
                        id="async-pagination-example"
                        isLoading={isLoading}
                        labelKey="login"
                        maxResults={PER_PAGE - 1}
                        minLength={2}
                        onInputChange={handleInputChange}
                        onPaginate={handlePagination}
                        onSearch={handleSearch}
                        options={options}
                        paginate
                        placeholder="Search for cars..."
                        renderMenuItemChildren={(option) => (
                          <Link href={`/brands/${option.brandslug}/${option.yearslug}/${option.modelslug}/${option.trimslug}`}>
                            <div
                              className="d-flex align-items-center"
                              key={option.id}
                            >
                              <div className="w-10 me-2">
                                <FeaturedImage width={100} height={100} src={option.avatar_url} />
                              </div>
                              <span>{option.login}</span>
                            </div>
                          </Link>
                        )}
                        useCache={false}
                        onSelect={handleSelect}
                      />
                    </div>
                    {/* <button
                      className="searchbtn"
                      type="submit"
                      value="search"
                      onClick={handleSearch}
                    >
                      <i />
                    </button>
                    <div id="searchlistheader" /> */}
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
              <nav className="col-sm-12 col-md-12">
                <ul className="">
                  {/* <li className="mainMenu">
                    <a title="New Car" href="">
                      <span className="innerSpan">
                        Search Cars<i />
                      </span>
                    </a>
                    <ul className="subMenu newSubMenu">
                      <li>
                        <span>
                          <span className="innerSpan">Search New Cars</span>
                        </span>
                      </li>
                      <li className="mainMenu">
                        <a title="Popular Brands" href="">
                          <span className="innerSpan">
                            Popular Brands <i />
                          </span>
                        </a>
                        <ul className="subMenuDeep">
                          <li>
                            <a title="Scorpio-N" href="">
                              <span className="innerSpan">Toyota</span>
                            </a>
                          </li>
                          <li>
                            <a title="Scorpio-N" href="">
                              <span className="innerSpan">Toyota</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a title="Latest Cars" href="">
                          <span className="innerSpan">Latest Cars</span>
                        </a>
                      </li>
                      <li className="mainMenu">
                        <a title="Best Cars in India" href="">
                          <span className="innerSpan">
                            Popular Cars <i />
                          </span>
                        </a>
                        <ul className="subMenuDeep">
                          <li>
                            <a title="Scorpio-N" href="">
                              <span className="innerSpan">Toyota</span>
                            </a>
                          </li>
                          <li>
                            <a title="Scorpio-N" href="">
                              <span className="innerSpan">Toyota</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a title="Upcoming Cars" href="">
                          <span className="innerSpan">Upcoming Cars</span>
                        </a>
                      </li>
                    </ul>
                  </li> */}

                  <li>
                    <Link title="Compare Cars" href="/search-cars">
                      <span className="innerSpan">SEARCH CARS</span>
                    </Link>
                  </li>

                  <li className="mainMenu">
                    <a title="News & Reviews Cars" href="">
                      <span className="innerSpan">
                        NEWS &amp; REVIEWS <i />
                      </span>
                    </a>
                    <ul className="subMenu">
                      <li>
                        <Link title="Car News" href="/news">
                          <span className="innerSpan">Car News</span>
                        </Link>
                      </li>

                      <li>
                        <Link title="User Reviews" href="/reviews">
                          <span className="innerSpan">Reviews</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link title="Compare Cars" href="/compare-cars">
                      <span className="innerSpan">COMPARE CARS</span>
                    </Link>
                  </li>
                  <li>
                    <a title="Compare Cars" href="/loan-calculator">
                      <span className="innerSpan">LOAN CALCULATOR</span>
                    </a>
                  </li>
                  {/* <li>
                    <a title="Compare Cars" href="/insurance-calculator">
                      <span className="innerSpan">INSURANCE CALCULATOR</span>
                    </a>
                  </li> */}
                  {/* <li>
                    <a title="Compare Cars" href="">
                      <span className="innerSpan">AUCTION</span>
                    </a>
                  </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Navbar;
