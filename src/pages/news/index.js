import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Pagination from "@/src/utils/Pagination";
import MainLayout from "@/src/layout/MainLayout";
import Ad728x90 from "@/src/components/ads/Ad728x90";
import Ad300x250 from "@/src/components/ads/Ad300x250";
import { useRouter } from "next/router";
import { createApolloClient } from "@/src/lib/apolloClient";
import { gql } from "@apollo/client";
import Ad160x600 from "@/src/components/ads/Ad160x600";
import Image from "next/image";
import altImage from '../../../public/assets/images/blog-alt-image.png'
import BlogDropDown from "@/src/components/BlogDropDown";

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);


function BlogStandardPage({ news, totalNews, currentPage, totalPages, fullData }) {
  const inputRef = useRef(null);
  const client = createApolloClient();
  const router = useRouter()

  const [brandInput, setBrandInput] = useState('');
  

  const settings = useMemo(() => {
    return {
      speed: 1500,
      spaceBetween: 24,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-51",
        prevEl: ".prev-51",
      },
    }
  })
  return (
    <MainLayout pageMeta={{
      title: "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
      description: "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
      type: "Car Review Website",
    }}>
      <Ad728x90 dataAdSlot="5962627056" />
      <div className="container mb-4">
        <h1 className="my-4">Latest Car News</h1>
        <p>Get the latest news, updates, and insights on the UAE car industry, covering new launches, events, price updates, discounts, recalls, and more for a comprehensive understanding of the automotive scene.</p>
        {/* <BlogDropDown initialFocus={true} news={true}/> */}


        <div className="row g-4 mt-3">
          <div className="col-lg-10">
            <div className="row g-4 ">
              {news?.map((newsItem, index) => (
                <>
                  <div key={`news-${index}`} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                    <div className="news-card">
                      <div className="news-img">
                        <Link legacyBehavior href={`/news/${newsItem?.attributes?.slug}`}><a>
                          <div className="position-relative imageContainer">
                            <Image

                              src={newsItem?.attributes?.coverImage?.data?.attributes?.url ? newsItem.attributes.coverImage.data?.attributes.url : altImage}
                              alt="Car"
                              layout="responsive"
                              width={300}
                              height={205}
                              objectFit="cover"
                            />
                          </div>
                        </a></Link>
                        <div className="date">
                          <Link legacyBehavior href={`/news/${newsItem?.attributes?.slug}`}><a></a></Link>
                        </div>
                      </div>
                      <div className="content ">
                        <h5 className="mt-3 BlogCardHeadingTxt">
                          <Link legacyBehavior href={`/news/${newsItem?.attributes?.slug}`}><a>{`${newsItem.attributes.title.length > 40 ? `${newsItem.attributes.title.slice(0, 55)} ...` : `${newsItem.attributes.title}`}  `}</a></Link>
                        </h5>
                        <div className="author-area">
                          <div className="author-content d-flex justify-content-end align-items-center">
                            {/* <h6 className="authorName">{newsItem.attributes.author.data.attributes.name}</h6> */}
                            {/* <Link  legacyBehavior href={`/news/${newsItem?.attributes?.slug}`}><a className="postedDate">Posted on: {newsItem.attributes.createdAt.slice(0, 10)}</a></Link> */}
                          </div>
                        </div>
                        {/* <div className="text-center mt-2 ">
                          <button className="readMoreBtn" onClick={() => { router.push(`/news/${newsItem?.attributes?.slug}`) }}>Read More</button>
                        </div> */}

                      </div>
                    </div>
                  </div>
                  {(index + 1) % 6 === 0 && index !== news.length - 1 && (
                    <div className="col-lg-12 ad-container" key={`ad-${index}`}>
                      {/* Add your advertisement component or content here */}
                      {/* For example: */}
                      <Ad728x90 dataAdSlot="5962627056" />
                    </div>

                  )}

                </>
              ))}
            </div>


          </div>
          <div className="col-lg-2 hideOnMobile">
            <div className="sticky-sidebar">
              <div className="ad-container">
                {/* Add your skyscraper advertisement component or content here */}
                {/* For example: */}
                <Ad160x600 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Ad728x90 dataAdSlot="5962627056" />
      <br />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <br />
      <br />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const apolloClient = createApolloClient();

  const page = context.query.page || 1; // Get the current page from the query, defaulting to 1
  const pageSize = 24; // Set the number of items per page

  try {

    const { data } = await apolloClient.query({
      query: gql`
        query{
          articles(filters:{article_type:{type:{eq:"News"}}},pagination:{page:${page},pageSize: ${pageSize}},sort:"createdAt:desc"){
            meta{
              pagination{
                total
                page
                pageSize
                pageCount
              }
            }
            data{
              attributes{
                title
                slug
                createdAt
                metaTitle
                content
                summary
                author{
                  data{
                    attributes{
                      name
                      createdAt
                    }
                  }
                }
                coverImage{
                  data{
                    attributes{
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        `,
      variables: { page, pageSize },
    });

    return {
      props: {
        news: data.articles.data || {},
        fullData: data,
        totalNews: data.articles.meta.pagination.total,
        totalPages: data.articles.meta.pagination.pageCount,
        currentPage: page,
      },
    };
  }
  catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    return {
      props: {
        error: true,
        errorMessage: error.message,
      },
    };
  }
}


export default BlogStandardPage