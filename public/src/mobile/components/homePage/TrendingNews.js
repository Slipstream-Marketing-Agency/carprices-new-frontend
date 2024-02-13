import Link from "next/link";
import React from "react";
import FeaturedImage from "../common/FeaturedImage";
import moment from "moment";
import ViewAllButton from "../common/ViewAllButton";
export default function TrendingNews(props) {
  
  return (
    <section className="my-2">
      <div className="card_wrapper px-3">
        <h2 className="text_truncate">Trending Car News</h2>
        <div className="row">
          {props?.news?.blogs?.map((item, index) => (
            <div
            className="col-6 px-1 pl-0 mb-2"
            key={index}
          >
            <div className="white_bg_wrapper news_listing_image">
              {" "}
              <Link href={`/news/${item.slug}`}>
                <FeaturedImage width={100} height={100}
                  src={item?.coverImage}
                  alt={item?.title}
                  title={item?.title}
                />
              </Link>
              <div >
                <Link href={`/news/${item.slug}`}>
                  <h5 className="fw-bold head_truncate mt-2">
                    {item?.title}
                  </h5>
                </Link>
                <small>
                  By{" "}Carprices Team
                  {/* <span>
                    {item?.author?.firstName
                      ? item?.author?.firstName
                      : "Carprices Team"}
                  </span> */}
                </small>
                <p className="truncate">{item.summary}</p>
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
