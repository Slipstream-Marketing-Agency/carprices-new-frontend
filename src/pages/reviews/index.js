import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/src/layout/MainLayout";
import moment from "moment";
import Image from "next/image";
import altImage from "../../../public/assets/images/blog-alt-image.png";
import Link from "next/link";
import Ad300x250 from "@/src/components-old/ads/Ad300x250";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import { useRouter } from "next/router";
import Pagination from "@/src/components/common/Pagination";
import EastIcon from "@mui/icons-material/East";
import SeoLinksFilter from "@/src/components/common/SeoLinksFilter";

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
`}</style>;

function BlogStandardPage() {
  const [articles, setArticles] = useState([]);
  const [articlesThisWeek, setArticlesThisWeek] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(5);

  const router = useRouter();
  const page = router.query.page || 1; // Get the current page from the query, defaulting to 1
  const pageSize = 24; // Set the number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageLoading(true); // Set page loading to true
        const [articlesRes, articlesThisWeekRes, popularArticlesRes] =
          await Promise.all([
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}articles/list?slug=review&page=${page}&pageSize=${pageSize}`
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}articles/listlasttwoweeks?slug=review`
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}articles/listArticlesByEngagement?pageSize=11`
            ),
          ]);

        setArticles(articlesRes.data.data);
        setTotalPage(articlesRes.data.pagination.pageCount);
        setArticlesThisWeek(articlesThisWeekRes.data.data);
        setPopularArticles(popularArticlesRes.data.data);
        setLoading(false);
        setPageLoading(false); // Set page loading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setPageLoading(false); // Set page loading to false
      }
    };

    fetchData();
  }, [page]);

  console.log(articles, "articles");
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
      <section>
        <div className="tw-container tw-grid md:tw-gap-10 tw-grid-cols-12 tw-my-6 ">
          <div className="md:tw-col-span-9 tw-col-span-12 tw-space-y-6">
            <div className="tw-">
              <h1 className="sm:tw-text-3xl ">Latest Car Reviews in UAE</h1>
              <p className="mb-4">
                Stay up-to-date with the latest review and updates on the UAE
                car industry, including new car launches, launch dates, car
                images, expos and events, price updates, latest discounts,
                facelifts, recalls, and more. Get all the insights you need to
                know about the happenings in the UAE automotive industry.
              </p>
              {articles.slice(0, 1).map((article, index) => (
                <div>
                  <Link
                    href={`/reviews/${article?.slug}`}
                    key={article?.id}
                    className="tw-flex  tw-relative tw-flex-col tw-justify-end tw-p-8 tw-pt-20 tw-pb-9 tw-text-slate-100 tw-bg-cover tw-rounded-2xl md:tw-min-h-[500px] tw-min-h-[200px]"
                    style={{
                      backgroundImage: `url('${article?.coverImage}')`,
                    }}
                  >
                    {/* <div className="tw-bg-blue-600 tw-text-white tw-opacity-80 tw-rounded-e-2xl tw-absolute tw-top-1 sm:tw-top-3 4xl:tw-top-5 4xl:tw-px-10 4xl:tw-py-2 4xl:tw-text-lg tw-left-0 tw-px-1 sm:tw-px-6 tw-py-1 tw-font-thin tw-text-xs sm:tw-text-base">
                    Trending
                  </div> */}
                    <div className="tw-hidden tw-relative md:tw-flex tw-flex-col tw-justify-center md:tw-p-4 tw-border-l-4 tw-border-l-blue-400 tw-border-solid tw-border-t-0 tw-border-r-0 tw-border-b-0 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl">
                      <div className="md:tw-px-6 tw-px-2">
                        <h2 className="tw-text-4xl tw-line-clamp-2 tw-text-white">
                          {article?.title}
                        </h2>
                        <p className="tw-mt-1 tw-text-base tw-line-clamp-2 tw-text-white">
                          {article?.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/reviews/${article?.slug}`} key={article?.id}>
                    <div className="md:tw-hidden tw-relative tw-mt-3">
                      <div className="md:tw-px-6 tw-px-2">
                        <h2 className="tw-text-4xl tw-line-clamp-2 md:tw-leading-none tw-leading-6">
                          {article?.title}
                        </h2>
                        <p className="tw-mt-1 tw-text-base tw-line-clamp-2 ">
                          {article?.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              <div className="tw-grid tw-gap-4 tw-grid-cols-12 tw-mt-6">
                {articles.slice(1, 10).map((article, index) => (
                  <Link
                    legacyBehavior
                    href={`/reviews/${article.slug}`}
                    key={article?.id}
                  >
                    <div
                      key={index}
                      className="tw-relative tw-col-span-6 md:tw-col-span-4 tw-rounded-[14px] tw-shadow-lg"
                    >
                      {/* <div className="tw-bg-blue-600 tw-text-white tw-opacity-80 tw-rounded-e-2xl tw-absolute tw-top-1 sm:tw-top-3 4xl:tw-top-5 4xl:tw-px-10 4xl:tw-py-2 4xl:tw-text-lg tw-left-0 tw-px-1 sm:tw-px-6 tw-py-1 tw-font-thin tw-text-xs sm:tw-text-base">
                        Trending
                      </div> */}
                      <Image
                        src={article.coverImage || altImage}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="tw-w-full md:tw-h-[200px] tw-h-[100px] tw-object-cover tw-rounded-t-[14px] "
                      />
                      <div className="tw-p-2">
                        <div className="sm:tw-text-base 4xl:tw-text-2xl tw-text-sm tw-truncate md:tw-whitespace-normal tw-font-semibold">
                          {`${
                            article?.title?.length > 20
                              ? `${article?.title?.slice(0, 50)}... `
                              : `${article?.title}`
                          }`}
                        </div>
                        <div className="tw-flex tw-flex-col tw-justify-between">
                          <div>
                            <div className="tw-text-xs tw-leading-9 tw-text-gray-700">
                              <span className="tw-hidden sm:tw-inline">
                                {article?.author} &mdash;
                              </span>{" "}
                              {moment(article?.publishedAt).format(
                                "MMMM Do YYYY"
                              )}
                            </div>
                            <div className="tw-line-clamp-2 tw-text-xs tw-text-gray-500 ">
                              {article?.summary}
                            </div>
                          </div>{" "}
                          <Link
                            legacyBehavior
                            href={`/reviews/${article?.slug}`}
                            key={article?.id}
                          >
                            <button className="tw-bg-transparent tw-text-xs 4xl:tw-text-sm tw-my-4 tw-hidden sm:tw-flex tw-items-center">
                              Know More
                              <EastIcon className="tw-text-lg tw-ml-2" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {!loading && !pageLoading && (
                <div className="mt-4">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPage}
                    onPageChange={setPageLoading}
                  />
                </div>
              )}
              {/* <div className="tw-flex tw-justify-center tw-items-center tw-my-10">
                <button className="tw-bg-black tw-text-white tw-rounded-full tw-py-3 tw-px-8 tw-text-sm sm:tw-text-base tw-cursor-pointer">
                  View More
                </button>
              </div> */}
            </div>

            {/* <Categories /> */}
          </div>
          <div className="md:tw-col-span-3 tw-col-span-12 tw-space-y-6">
            <Ad300x250 />
            {articlesThisWeek?.length > 0 && (
              <div>
                <h4 className="tw-font-bold">From This week</h4>
                <hr className="tw-my-2" />
                {articlesThisWeek?.map((blog) => (
                  <Link
                    legacyBehavior
                    href={`/reviews/${blog?.slug}`}
                    key={blog?.id}
                  >
                    <div className="tw-w-full">
                      <div className="tw-flex tw-my-2">
                        <Image
                          src={blog?.coverImage}
                          alt=""
                          width={40}
                          height={40}
                          className="tw-object-cover"
                        />
                        <p className="tw-text-sm tw-mx-2  tw-text-gray-600 tw-line-clamp-2">
                          {`${blog?.title}`}
                        </p>
                      </div>
                      <hr className="my-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="sticky-sidebar">
              <div className="ad-container">
                <Ad300x600 />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="my-1">
        <Ad728x90 />
      </div>

      <div className="tw-container">
        <h2>Popular News</h2>
        <div className="tw-grid tw-gap-4 tw-grid-cols-12 tw-mt-6">
          {loading || pageLoading ? (
            <>
              <SkeletonArticle />
              <SkeletonArticle />
            </>
          ) : (
            popularArticles.map((article, index) => (
              <Link
                legacyBehavior
                href={`/reviews/${article.slug}`}
                key={article?.id}
              >
                <div
                  key={index}
                  className="tw-relative tw-col-span-6 md:tw-col-span-4 tw-rounded-[14px] tw-shadow-lg"
                >
                  {/* <div className="tw-bg-blue-600 tw-text-white tw-opacity-80 tw-rounded-e-2xl tw-absolute tw-top-1 sm:tw-top-3 4xl:tw-top-5 4xl:tw-px-10 4xl:tw-py-2 4xl:tw-text-lg tw-left-0 tw-px-1 sm:tw-px-6 tw-py-1 tw-font-thin tw-text-xs sm:tw-text-base">
                    Trending
                  </div> */}
                  <Image
                    src={article.coverImage || altImage}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="tw-w-full md:tw-h-[200px] tw-h-[100px] tw-object-cover tw-rounded-t-[14px] "
                  />
                  <div className="tw-p-2">
                    <div className="sm:tw-text-base 4xl:tw-text-2xl tw-text-sm tw-truncate md:tw-whitespace-normal tw-font-semibold">
                      {`${
                        article?.title?.length > 20
                          ? `${article?.title?.slice(0, 50)}... `
                          : `${article?.title}`
                      }`}
                    </div>
                    <div className="tw-flex tw-flex-col tw-justify-between">
                      <div>
                        <div className="tw-text-xs tw-leading-9 tw-text-gray-700">
                          <span className="tw-hidden sm:tw-inline">
                            {article?.author?.name} &mdash;
                          </span>{" "}
                          {moment(article?.publishedAt).format("MMMM Do YYYY")}
                        </div>
                        <div className="tw-line-clamp-2 tw-text-xs tw-text-gray-500 ">
                          {article?.summary}
                        </div>
                      </div>{" "}
                      <Link
                        legacyBehavior
                        href={`/reviews/${article?.slug}`}
                        key={article?.id}
                      >
                        <button className="tw-bg-transparent tw-text-xs 4xl:tw-text-sm tw-my-4 tw-hidden sm:tw-flex tw-items-center">
                          Know More
                          <EastIcon className="tw-text-lg tw-ml-2" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="tw-container tw-mx-auto">
        {" "}
        <SeoLinksFilter />
      </div>
    </MainLayout>
  );
}

export default BlogStandardPage;
