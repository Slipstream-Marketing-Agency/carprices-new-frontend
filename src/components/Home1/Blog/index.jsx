import React from "react";
import Link from "next/link";
import altImage from "../../../../public/assets/images/blog-alt-image.png";
import Image from "next/image";
import moment from "moment/moment";
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

function index({ heading, btnTitle, blogData, blogApiData, isNews }) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  return (
    <div className="news-section ">
      <div className="container  white_bg_wrapper">
        <div className="row mb-2 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12  d-flex align-items-end justify-content-between flex-wrap gap-2">
            <div className="section-title1 w-100">
              {/* <span>Best Trending</span>  */}
              <h1 className={`${isRtl && "text-end"} w-100`}>{heading}</h1>
            </div>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          {blogApiData?.map((news, index) => (
            <div
              className="col-xl-4 col-lg-6 col-md-6  wow fadeInUp"
              data-wow-delay="200ms"
            >
              <div className="news-card">
                <div className="news-img">
                  <Link
                    legacyBehavior
                    href={`${isNews ? "/news/" : "/reviews/"}${
                      news?.attributes?.slug
                    }`}
                  >
                    <a>
                      {/* <img src={news.attributes.coverImage.data?.attributes.url} alt="" /> */}
                      <div className="position-relative imageContainer">
                        <Image
                          src={news?.coverImage ? news?.coverImage : altImage}
                          alt="Car"
                          layout="responsive"
                          width={300}
                          height={205}
                          objectFit="fill"
                          className="object-contain"
                        />
                      </div>
                    </a>
                  </Link>
                  {/* <div className="date">
                    <Link
                      legacyBehavior
                      href={`${isNews ? "/news/" : "/reviews/"}${news?.slug}`}
                    >
                      <a>{t.trending}</a>
                    </Link>
                  </div> */}
                </div>
                <div className="content">
                  <h6 className="head_truncate">
                    <Link
                      legacyBehavior
                      href={`${isNews ? "/news/" : "/reviews/"}${news?.slug}`}
                    >
                      <a>{`${news.title}`}</a>
                    </Link>
                  </h6>
                  <div className="news-btm">
                    <div className="author-area">
                      <div className="author-content d-flex">
                        <h6>
                          {news?.author}
                          {" -"}
                        </h6>

                        <small>
                          {" "}
                          {/* {t.postedOn} -{" "} */}
                          {moment(news.publishedAt).format("MMMM Do YYYY")}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-btn-area mt-3">
          {/* custom button begins */}
          <Link legacyBehavior href={`${isNews ? "/news/" : "/reviews/"}`}>
            <div className="buttons">
              <div className="row wow fadeInUp" data-wow-delay="300ms">
                <div className="col-lg-12">
                  <div className="view-btn-area">
                    {/* <p>There will be 100+ Upcoming Car</p> */}
                    <button className="btn mb-2 mb-md-0 btn-round btn-outline btn-block">
                      {btnTitle}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* custom button ends */}
        </div>
      </div>
    </div>
  );
}

export default index;
