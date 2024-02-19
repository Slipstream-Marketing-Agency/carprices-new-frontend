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
import altImage from "../../../public/assets/images/blog-alt-image.png";
import BlogDropDown from "@/src/components/BlogDropDown";
import Ad300x600 from "@/src/components/ads/Ad300x600";
import Ad970x250 from "@/src/components/ads/Ad970x250";
import axios from "axios";
import moment from "moment";

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function BlogStandardPage({
  articles,
  currentPage,
  totalPages,
  articlesThisWeek,
  articleTags,
  popularArticles,
}) {
  console.log(articles, "articlesarticles");
  const inputRef = useRef(null);
  const client = createApolloClient();
  const router = useRouter();

  const [brandInput, setBrandInput] = useState("");

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
    };
  });

  const firstArticle = articles.slice(0, 2);
  const secondSectionArticles = articles.slice(2, 9);
  const remainingArticles = articles.slice(8);
  return (
    <MainLayout
      pageMeta={{
        title:
          "Latest Car review UAE: New Models, Launches, and Industry Insights - Carprices.ae",
        description:
          "Stay informed with the latest car review in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
        type: "Car Review Website",
      }}
    >
      <div className="my-1">
        <Ad970x250 dataAdSlot="8815612950" />
      </div>
      <div className="container mb-3">
        <div className="white_bg_wrapper">
          {" "}
          <h1 className="fw-bold mt-2 box_header">Latest Car review in UAE</h1>
          <p className="my-2">
            Stay up-to-date with the latest review and updates on the UAE car
            industry, including new car launches, launch dates, car images,
            expos and events, price updates, latest discounts, facelifts,
            recalls, and more. Get all the insights you need to know about the
            happenings in the UAE automotive industry.
          </p>
        </div>

        {/* <BlogDropDown initialFocus={true} review={true}/> */}

        <div className="row g-3 mt-1">
          <div className="col-lg-9 mt-2">
            {/* Display the first article separately */}
            <div className="row g-1 white_bg_wrapper">
              <div className="col-xl-7 col-12 mt-0">
                <div className="d-flex flex-column">
                  {firstArticle.map((article, index) => (
                    <div className="review-card mb-2 cursorPointer">
                      <div className="review-img mainarticle first_articles">
                        <Link legacyBehavior href={`/reviews/${article.slug}`}>
                          <div className="position-relative imageContainer image-overlay ">
                            <Image
                              src={
                                article.coverImage
                                  ? article.coverImage
                                  : altImage
                              }
                              alt="Featured Article Image"
                              layout="responsive"
                              width={600} // Adjusted for a larger display
                              height={400}
                              objectFit="cover"
                            />

                            <div className="content slider_content_box">
                              <h5 className="featured-article-title ">
                                {article.title}
                              </h5>

                              <small className="text-white">
                                {" "}
                                {article?.author} |{" "}
                                {moment(article?.publishedAt).format(
                                  "MMMM Do YYYY"
                                )}
                              </small>

                              {/* You can add more details like date, author, etc., here */}
                            </div>
                          </div>
                        </Link>
                        {/* Additional content for the featured article */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="col-xl-5 col-lg-5 col-md-5 col-12 wow fadeInUp mt-0 mb-2 "
                data-wow-delay="200ms"
              >
                {secondSectionArticles.map((article, index) => (
                  <Link legacyBehavior href={`/reviews/${article.slug}`}>
                    <div className="review-card d-flex flex-row cursorPointer">
                      <div className="secondSectionArticles">
                        <div className="position-relative imageContainer ">
                          <img
                            src={
                              article.coverImage ? article.coverImage : altImage
                            }
                            alt="Article Image"
                            layout="responsive"
                            width={300}
                            height={205}
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <div className="content ms-3 d-flex flex-column justify-content-between">
                        <h6 className=" ">{article.title}</h6>
                        <p className="text-black articlelistdate fw-bold">
                          {article?.author} |{" "}
                          {moment(article?.publishedAt).format("MMMM Do YYYY")}
                        </p>
                        {/* Similar details for rest of the articles */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Ad728x90 dataAdSlot="5962627056" />

            {/* Grid layout for the rest of the articles */}
            <div className="row g-2 mt-3 white_bg_wrapper ">
              {remainingArticles?.slice(1).map((reviewItem, index) => {
                // Adjust index to account for the first item displayed separately
                const adjustedIndex = index + 1;

                return (
                  <React.Fragment key={`review-${adjustedIndex}`}>
                    <div
                      className="col-xl-4 col-lg-6 col-md-6 col-6 wow fadeInUp mt-0 mb-2"
                      data-wow-delay="200ms"
                    >
                      <div className="review-card">
                        <div className="review-img list-article">
                          <Link legacyBehavior href={`/reviews/${reviewItem.slug}`}>
                            <a>
                              <div className="position-relative imageContainer">
                                <Image
                                  src={
                                    reviewItem.coverImage
                                      ? reviewItem.coverImage
                                      : altImage
                                  }
                                  alt="Article Image"
                                  layout="responsive"
                                  width={300}
                                  height={205}
                                  objectFit="cover"
                                />
                              </div>
                            </a>
                          </Link>
                        </div>
                        <div className="content">
                          <h6 className="mt-2 mb-1 blog_title_list_truncate">
                            {reviewItem.title}
                          </h6>
                          <p className="text-black articlelistdate fw-bold mt-2">
                            {reviewItem?.author} |{" "}
                            {moment(reviewItem?.publishedAt).format(
                              "MMMM Do YYYY"
                            )}
                          </p>
                          {/* Similar details for rest of the articles */}
                        </div>
                      </div>
                    </div>
                    {/* Display advertisement after the sixth article in the grid (seventh overall) */}
                    {adjustedIndex % 6 === 0 && (
                      <div
                        className="col-lg-12  mt-0"
                        key={`ad-${adjustedIndex}`}
                      >
                        <Ad728x90 dataAdSlot="5962627056" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              <div className="mt-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
          </div>
          <div className="col-lg-3 hideOnMobile mt-1">
            <Ad300x250 dataAdSlot="8451638145" />
            {articleTags?.length > 0 && (
              <div className="white_bg_wrapper my-3">
                <h4>TAGS</h4>
                <div className="cursorPointer">
                  {articleTags?.map((tag) => (
                    <Link
                      className="cursorPointer fs-6 py-1 d-flex "
                      legacyBehavior
                      href={`/reviews/tag/${tag?.slug}`}
                      key={tag?.id}
                    >
                      <p className="badge badge-pill badge-secondary text-primary bg-light ms-1 my-2">{`${tag?.title}`}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Ad300x250 dataAdSlot="8451638145" />

            {articlesThisWeek?.length > 0 && (
              <div className="white_bg_wrapper my-3">
                <h4 className="fw-bold">FROM LAST TWO WEEK</h4>
                <div className="cursorPointer">
                  {articlesThisWeek?.map((blog) => (
                    <Link
                      className="cursorPointer"
                      legacyBehavior
                      href={`/reviews/${blog?.slug}`}
                      key={blog?.id}
                    >
                      <div className="fs-6 py-1">
                        <div className="">
                          <h6 className="text-bold blogFont fw-bold mb-0">{`${blog?.title}`}</h6>
                          <span className="postedOnStyle">
                            {moment(blog?.publishedAt).format("MMMM Do YYYY")}
                          </span>
                        </div>
                        <hr className="my-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="sticky-sidebar">
              <div className="ad-container">
                <Ad300x600 dataAdSlot="8451638145" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Ad728x90 dataAdSlot="5962627056" />
      <div className="container">
        <div className="row g-2 mt-3 white_bg_wrapper ">
          <h4 className="fw-bold mt-2 box_header mb-3">Popular News</h4>

          {popularArticles?.map((reviewItem, index) => {
            // Adjust index to account for the first item displayed separately

            return (
              <React.Fragment key={`review`}>
                <div
                  className="col-xl-3 col-lg-6 col-md-6 col-6 wow fadeInUp mt-0 mb-2"
                  data-wow-delay="200ms"
                >
                  <div className="review-card">
                    <div className="review-img list-article">
                      <Link legacyBehavior href={`/reviews/${reviewItem.slug}`}>
                        <a>
                          <div className="position-relative imageContainer">
                            <Image
                              src={
                                reviewItem.coverImage
                                  ? reviewItem.coverImage
                                  : altImage
                              }
                              alt="Article Image"
                              layout="responsive"
                              width={300}
                              height={205}
                              objectFit="cover"
                            />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="content">
                      <h6 className="mt-2 mb-1 blog_title_list_truncate">
                        {reviewItem.title}
                      </h6>
                      {/* Similar details for rest of the articles */}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context, query) {
  console.log(context.query, "sssssssssssssssss");

  const page = context.query.page || 1; // Get the current page from the query, defaulting to 1
  const pageSize = 24; // Set the number of items per page

  try {
    const articles = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/list?slug=review&page=${page}&pageSize=${pageSize}`
    );

    const articlesThisWeek = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/listlasttwoweeks?slug=review`
    );

    const articleTags = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articletags/list`
    );

    const popularArticles = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/listArticlesByEngagement?pageSize=11`
    );
    // Check if the data fetching was successful
    if (!articles.data.data || articles.data.data.length === 0) {
      // Trigger a 404 response by returning notFound: true
      return { notFound: true };
    }

    return {
      props: {
        articles: articles.data.data,
        articlesThisWeek: articlesThisWeek.data.data,
        totalPages: articles.data.pagination.pageCount,
        currentPage: page,
        articleTags: articleTags.data,
        popularArticles: popularArticles.data.data,
      },
    };
  } catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    // In case of any error during data fetching, trigger a 404 response
    return { notFound: true };
  }
}

export default BlogStandardPage;
