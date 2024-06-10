import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '@/src/layout/MainLayout';
import dynamic from 'next/dynamic';
import Pagination from "@/src/utils/Pagination";
import moment from 'moment';
import Image from 'next/image';
import altImage from '../../../public/assets/images/blog-alt-image.png';
import Link from 'next/link';
import Ad300x250 from '@/src/components/ads/Ad300x250';
import Ad300x600 from '@/src/components/ads/Ad300x600';
import Ad728x90 from '@/src/components/ads/Ad728x90';



const SkeletonArticle = () => (
  <div className="skeleton-article">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-author"></div>
  </div>
);

// CSS for the skeleton
<style jsx>{`
  .skeleton-article {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .skeleton-image {
    width: 100%;
    height: 200px;
    background-color: #ccc;
  }
  .skeleton-title,
  .skeleton-author {
    width: 100%;
    height: 20px;
    background-color: #ddd;
  }
`}</style>

function BlogStandardPage() {
  const [articles, setArticles] = useState([]);
  const [articlesThisWeek, setArticlesThisWeek] = useState([]);
  const [articleTags, setArticleTags] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, articlesThisWeekRes, articleTagsRes, popularArticlesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/list?slug=news&page=1&pageSize=24`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/listlasttwoweeks?slug=news`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}articletags/list`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/listArticlesByEngagement?pageSize=11`)
        ]);

        setArticles(articlesRes.data.data);
        setArticlesThisWeek(articlesThisWeekRes.data.data);
        setArticleTags(articleTagsRes.data);
        setPopularArticles(popularArticlesRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout
      pageMeta={{
        title: "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
        description: "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
        type: "Car Review Website",
      }}
    >
      <div className="my-1">
        <Ad728x90 />
      </div>
      <div className="container mb-3">
        <div className="white_bg_wrapper">
          <h1 className="fw-bold mt-2 box_header">Latest Car News in UAE</h1>
          <p className="my-2">
            Stay up-to-date with the latest news and updates on the UAE car industry, including new car launches, launch dates, car images, expos and events, price updates, latest discounts, facelifts, recalls, and more. Get all the insights you need to know about the happenings in the UAE automotive industry.
          </p>
        </div>
        <div className="row g-3 mt-1">
          <div className="col-lg-9 mt-2">
            {loading ? (
              <>
                <SkeletonArticle />
                <SkeletonArticle />
              </>
            ) : (
              <div className="row g-1 white_bg_wrapper">
                <div className="col-xl-7 col-12 mt-0">
                  <div className="d-flex flex-column">
                    {articles.slice(0, 2).map((article, index) => (
                      <div key={index} className="news-card mb-2 cursorPointer">
                        <div className="news-img mainarticle first_articles">
                          <Link href={`/news/${article.slug}`}>
                            <div className="position-relative imageContainer image-overlay ">
                              <Image
                                src={article.coverImage || altImage}
                                alt="Featured Article Image"
                                layout="responsive"
                                width={600}
                                height={400}
                                objectFit="cover"
                              />
                              <div className="content slider_content_box">
                                <h5 className="featured-article-title ">
                                  {article.title}
                                </h5>
                                <small className="text-white">
                                  {article?.author} |{" "}
                                  {moment(article?.publishedAt).format(
                                    "MMMM Do YYYY"
                                  )}
                                </small>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 wow fadeInUp mt-0 mb-2" data-wow-delay="200ms">
                  {articles.slice(2, 9).map((article, index) => (
                    <Link key={index} href={`/news/${article.slug}`}>
                      <div className="news-card d-flex flex-row cursorPointer">
                        <div className="secondSectionArticles">
                          <div className="position-relative imageContainer ">
                            <img
                              src={article.coverImage || altImage}
                              alt="Article Image"
                              layout="responsive"
                              width={300}
                              height={205}
                              objectFit="cover"
                            />
                          </div>
                        </div>
                        <div className="content ms-3 d-flex flex-column justify-content-between">
                          <h6>{article.title}</h6>
                          <p className="text-black articlelistdate fw-bold">
                            {article?.author} |{" "}
                            {moment(article?.publishedAt).format("MMMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Ad728x90 />
            <div className="row g-2 mt-3 white_bg_wrapper">
              {loading ? (
                <>
                  <SkeletonArticle />
                  <SkeletonArticle />
                  <SkeletonArticle />
                </>
              ) : (
                articles.slice(9).map((newsItem, index) => (
                  <React.Fragment key={`news-${index}`}>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-6 wow fadeInUp mt-0 mb-2" data-wow-delay="200ms">
                      <div className="news-card">
                        <div className="news-img list-article">
                          <Link href={`/news/${newsItem.slug}`}>
                            <div className="position-relative imageContainer">
                              <Image
                                src={newsItem.coverImage || altImage}
                                alt="Article Image"
                                layout="responsive"
                                width={300}
                                height={205}
                                objectFit="cover"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="content">
                          <h6 className="mt-2 mb-1 blog_title_list_truncate">
                            {newsItem.title}
                          </h6>
                          <p className="text-black articlelistdate fw-bold mt-2">
                            {newsItem?.author} |{" "}
                            {moment(newsItem?.publishedAt).format("MMMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index % 6 === 0 && (
                      <div className="col-lg-12 mt-0" key={`ad-${index}`}>
                        <Ad728x90 />
                      </div>
                    )}
                  </React.Fragment>
                ))
              )}
              {!loading && (
                <div className="mt-4">
                  <Pagination currentPage={1} totalPages={5} />
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-3 hideOnMobile mt-1">
            <Ad300x250 />
            {!loading && articlesThisWeek.length > 0 && (
              <div className="white_bg_wrapper my-3">
                <h4 className="fw-bold">FROM LAST TWO WEEKS</h4>
                <div className="cursorPointer">
                  {articlesThisWeek.map((blog) => (
                    <Link key={blog.id} href={`/news/${blog.slug}`}>
                      <div className="fs-6 py-1">
                        <div>
                          <h6 className="text-bold blogFont fw-bold mb-0">
                            {blog.title}
                          </h6>
                          <span className="postedOnStyle">
                            {moment(blog.publishedAt).format("MMMM Do YYYY")}
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
                <Ad300x600 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Ad728x90 />
      <div className="container">
        <div className="row g-2 mt-3 white_bg_wrapper">
          <h4 className="fw-bold mt-2 box_header mb-3">Popular News</h4>
          {loading ? (
            <>
              <SkeletonArticle />
              <SkeletonArticle />
            </>
          ) : (
            popularArticles.map((newsItem, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-6 wow fadeInUp mt-0 mb-2" data-wow-delay="200ms" key={index}>
                <div className="news-card">
                  <div className="news-img list-article">
                    <Link href={`/news/${newsItem.slug}`}>
                      <div className="position-relative imageContainer">
                        <Image
                          src={newsItem.coverImage || altImage}
                          alt="Article Image"
                          layout="responsive"
                          width={300}
                          height={205}
                          objectFit="cover"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="content">
                    <h6 className="mt-2 mb-1 blog_title_list_truncate">
                      {newsItem.title}
                    </h6>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default BlogStandardPage;
