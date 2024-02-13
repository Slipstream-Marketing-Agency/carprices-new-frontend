import Ad300x250 from "@/components/ads/Ad300x250";
import Ad300x600 from "@/components/ads/Ad300x600";
import Ad728x90 from "@/components/ads/Ad728x90";
import Breadcrumb from "@/components/common/BreadCrumb";
import FeaturedImage from "@/components/common/FeaturedImage";
import Pagination from "@/components/common/Pagination";
import PopularCars from "@/components/common/detail-pages/PopularCars";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import Ad970x250 from "@/components/ads/Ad970x250";


export default function NewsListing() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [searchedBrand, setSearchedBrand] = useState(null)
  const [searchedModel, setSearchedModel] = useState(null)
  const [options, setOptions] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (selectedOption) => {

    if (selectedOption.type === "brand") {
      typeof window != 'undefined' ? localStorage.setItem('newsbrand', selectedOption.Name) : ""
      router.push(`/reviews/brand/${selectedOption.slug}`)
    } else if (selectedOption.type === "tag") {
      typeof window != 'undefined' ? localStorage.setItem('newstagId', selectedOption.id) : ""
      router.push(`/reviews/tag/${selectedOption.slug}`)
    }

  };

  const handleSelectionChange = (selectedOption) => {

    if (selectedOption[0]?.type === "brand") {
      typeof window != 'undefined' ? localStorage.setItem('newsbrand', selectedOption[0]?.Name) : ""
      router.push(`/reviews/brand/${selectedOption[0]?.slug}`)
    }
    else if (selectedOption[0]?.type === "tag") {
      typeof window != 'undefined' ? localStorage.setItem('newstagId', selectedOption[0]?.id) : ""
      router.push(`/reviews/tag/${selectedOption[0]?.slug}`)
    }
  };

  const [value, setValue] = useState(null);

  const handleSearch = (query) => {
    setIsLoading(true);

    // API call
    const apiPromiseBrands = fetch(`${process.env.NEXT_PUBLIC_API_URL}brands?pageSize=8&orderBy=name&search=${query}`)
      .then((resp) => resp.json());

    const apiPromiseTags = fetch(`${process.env.NEXT_PUBLIC_API_URL}blog/tags/list?pageSize=8&orderBy=title&search=${query}`)
      .then((resp) => resp.json());

    Promise.all([apiPromiseBrands, apiPromiseTags])
      .then(([apiPromiseBrands, apiPromiseTags]) => {

        const mappedBrandData = apiPromiseBrands.carBrands.map((item) => {
          return {
            Name: item.name,
            id: item.id,
            slug: item.slug,
            type: "brand"
          };
        });

        const mappedTagData = apiPromiseTags.tags.map((item) => {
          return {
            Name: item.title,
            id: item.id,
            slug: item.slug,
            type: "tag"
          };
        });


        const mergedData = [...mappedBrandData, ...mappedTagData];
        setOptions(mergedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };



  const filterBy = () => true;




  const [brandsList, setBrandsList] = useState([]);

  const brandListOptions = brandsList.map((carBrand) => ({
    value: carBrand.id,
    label: carBrand.name,
  }));

  const [modelsList, setModelsList] = useState([]);
  const modelsListOptions = modelsList.map((model) => ({
    value: model.id,
    label: model.name,
  }));



  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "brands?isAll=1&orderBy=name")
      .then((response) => {
        // 
        setBrandsList(response.data.carBrands);
      })
      .catch((error) => {
        console.error("Error", error);
        // setIsLoading(false);
        // setError(error);
      });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setNews([]);
        const page = router.query.page || 1;
        setCurrentPage(Number(page));
        const newsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog?pageSize=15&currentPage=${page}&type=review${searchedBrand !== null && searchedModel === null ? "&search=" + searchedBrand.label : "" || searchedModel !== null && searchedBrand === null ? "&search=" + searchedModel.label : "" || searchedBrand !== null && searchedModel !== null ? "&search=" + searchedBrand.label + " " + searchedModel.label : ""}`
        );
        setNews(newsResponse.data);
        setTotalPages(newsResponse.data.totalPage);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router.query.page, searchedBrand, searchedModel, router.query]);


  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  const handleClick = (id) => {
    // Store the ID in local storage
    localStorage.setItem('tagId', id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && options.length > 0) {
      e.preventDefault();
      // Select the first option programmatically
      handleOptionSelect(options[0]);
    }
  }

  // const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  // if (isMobile) {
  //   // 
  //   return (
  //     <>
  //       <MobileNewsListing />
  //     </>
  //   )
  // }

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <Layout pageMeta={{
      title: "Expert Car Reviews: Unbiased Analysis, Ratings, and Insights - Carprices.ae",
      description: "Discover honest and unbiased car reviews. Read detailed reviews on the latest car models, performance, features, and more. Make informed decisions with our comprehensive car reviews.",
      type: "Car Review Website",
    }}>
      <div className="container">
        {isMobile ? <div className="my-1">
          <Ad728x90 dataAdSlot="5059188040" />
        </div> :
          <div className="my-1">
            <Ad970x250 dataAdSlot="8028827664" />
          </div>}
        <div className="row mt-2 mb-4">
          <div className="col-xl-9 col-lg-8 col-md-7 col-sm-6 col-12">


            <Breadcrumb />
            <div>
              <h1 className="fw-bold mt-2">Latest Car Reviews in UAE</h1>
              <p className="my-2">
                Stay up-to-date with the latest reviews and updates on the UAE car
                industry, including new car launches, launch dates, car images,
                expos and events, price updates, latest discounts, facelifts,
                recalls, and more. Get all the insights you need to know about
                the happenings in the UAE automotive industry.
              </p>
              <div className="white_bg_wrapper fs-5">
                <h2 className="mb-2">Filter News</h2>
                {/* <div className="d-flex mb-3">
                <Link href={`/reviews/tag/Electrical`} className="btn filter_buttons fs-6">Electrical</Link>
                <button className="btn filter_buttons fs-6">Electrical</button>
                <button className="btn filter_buttons fs-6">Electrical</button>
                </div> */}
                <div className="mb-1 d-flex justify-content-start">
                  <AsyncTypeahead
                    filterBy={filterBy}
                    id="async-example"
                    isLoading={isLoading}
                    labelKey="Name"
                    minLength={1}
                    onSearch={handleSearch}
                    options={options}
                    onKeyDown={handleKeyDown}
                    selectHintOnEnter={false}
                    placeholder="Search By Brand or Tags"
                    selected={selectedOptions}
                    onChange={handleSelectionChange}
                    className="news_search w-50"
                    renderMenuItemChildren={(option, { text }) => (
                      <>
                        {option.type === 'brand' && (
                          <>
                            {options.findIndex((opt) => opt.type === 'brand') === options.findIndex((opt) => opt.Name === option.Name) && (
                              <>
                                <div>
                                  <h5 className="dropdown_sub_head fw-bold">Brand</h5>
                                </div>
                              </>
                            )}
                            <div>
                              {option.Name}
                            </div>
                          </>
                        )}

                        {option.type === 'tag' && (
                          <>
                            {options.findIndex((opt) => opt.type === 'tag') === options.findIndex((opt) => opt.Name === option.Name) && (
                              <>
                                <div>
                                  <h5 className="dropdown_sub_head fw-bold">Tags</h5>
                                </div>
                              </>
                            )}
                            <div className="option_select">
                              {option.Name}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  />
                  <button className="btn btn_search" type="button" onClick={() => handleSelectionChange(options)}>
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div className="row mt-3 mb-3 p-0 m-0">

                {news.length <= 0 ? <>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(() => (
                    <div
                      className="col-4 px-1 pl-0 mb-2"
                    // key={index}
                    >
                      <div className="white_bg_wrapper news_listing_image">
                        {" "}
                        <Skeleton height={180} width={"100%"} />

                        <div >
                          <div className="mt-2">
                            <Skeleton count={1} />
                          </div>
                          <div>
                            <Skeleton count={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </> : <>
                  {news?.blogs.length <= 0 ?
                    <div className="d-flex justify-content-center align-items-center search_not_found">
                      <img src="/assets/images/not-found/search-not-found.png" />
                    </div>
                    : news?.blogs?.map((item, index) => (
                      <div
                        className="col-sm-4 col-6 px-1 pl-0 mb-2"
                        key={index}
                      >
                        <div className="white_bg_wrapper news_listing_image">
                          {" "}
                          <Link href={`/reviews/${item.slug}`}>
                            <FeaturedImage width={250} height={250}
                              src={item?.coverImage}
                              alt={item?.title}
                              title={item?.title}
                              setIsLoading={setIsLoading}
                            />
                          </Link>
                          <div >
                            <Link href={`/reviews/${item.slug}`}>
                              <h5 className="fw-bold head_truncate mt-2">
                                {item?.title}
                              </h5>
                            </Link>
                            {/* <small>
                              By{" "}
                              <span>
                                {item?.author?.firstName
                                  ? item?.author?.firstName
                                  : "Carprices Team"}
                              </span>
                            </small> */}
                            {/* <p className="truncate">{item.summary}</p> */}
                          </div>
                          <div className="tag_scroll">
                            {item.tags.map((tags, index) => tags.title === "" ? "" : <Link href={`/reviews/tag/${tags?.slug}`} onClick={() => handleClick(tags?.id)}><small className="tag_badges">{tags.title}</small></Link>
                            )}
                          </div>



                        </div>
                      </div>
                    ))}</>}

              </div>
              {/* <Link href=`/reviews/`></Link> */}
              <div className="my-3 d-flex justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  router={router}
                />
              </div>


              {/*<Ad728x90 />*/}
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12 right_section hide_mobile">
            {/* <Ad300x250 /> */}
            {/* <div className="mt-3">
              <PopularCars />
            </div> */}

            <div className="d-flex flex-column mt-3 sticky_scroll">
              <Ad300x600 dataAdSlot="8615289670" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
