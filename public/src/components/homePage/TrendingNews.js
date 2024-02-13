import Link from "next/link";
import React from "react";
import FeaturedImage from "../common/FeaturedImage";
import moment from "moment";
import ViewAllButton from "../common/ViewAllButton";
export default function TrendingNews(props) {
  
  return (
    <section className="my-2">
      <div className="card_wrapper">
        <h2 className="text_truncate">Trending Car News</h2>
        <div className="row">
          {props?.news?.blogs?.map((item, index) => (
            <div className="col-6">
              <div className="d-flex news-card">
                <Link href={`/news/${item.slug}`}>
                  <div className="news-image">
                    <FeaturedImage width={100} height={100}
                      src={item?.coverImage}
                      alt={item?.title}
                      title={item?.title}
                    />
                  </div>
                </Link>
                <div className="news-details">
                  <div>
                    <h3 className="fs-5">
                      <Link href={`/news/${item.slug}`}>
                        <b className="text_truncate">{item?.title}</b>
                      </Link>
                    </h3>

                    {/* <p>{item?.summary}</p> */}
                  </div>
                  <div className="authorsection">
                    <div className="authorpic">
                      {/* {item?.author?.firstName
                        ? `${item.author?.firstName}`.charAt(0)
                        : "C"} */}
                        C
                    </div>
                    <div className="d-flex flex-column">
                      <small>
                        <b> 
                          {/* <span>
                          {item?.author?.firstName
                            ? item?.author?.firstName
                            : "Carprices Team"}
                        </span> */}
                        By Carprices Team
                        </b>
                      </small>
                      <small>
                        {moment(item.publishedAt).format("MMMM Do YYYY")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ViewAllButton text={"View All Latest News"} link={"/news"} />
      </div>
    </section>
  );
}
