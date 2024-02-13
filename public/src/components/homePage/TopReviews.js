import React, { useState } from "react";
import FeaturedImage from "../common/FeaturedImage";
import Link from "next/link";
import moment from "moment";
import ViewAllButton from "../common/ViewAllButton";

export default function TopReviews(props) {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="my-2">
      <div className="card_wrapper">
        <h2>New Car Reviews</h2>
        {/* <nav>
          <div className="nav nav-tabs mb-2" id="nav-tab" role="tablist">
            <button
              className={activeTab === 1 ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab(1)}
            >
              Expert Reviews
            </button>
            <button
              className={activeTab === 2 ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab(2)}
            >
              Featured Stories
            </button>
            <button
              className={activeTab === 3 ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab(3)}
            >
              Videos
            </button>
          </div>
        </nav> */}
        <div className="tab-content mb-2">
          <div
            className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`}
          >
            <div className="row">
              {props?.reviews?.blogs?.map((item, index) => (
                <div className="col-6">
                  <div className="d-flex news-card">
                    <div className="news-image">
                      <Link href={`/reviews/${item.slug}`}>
                        <FeaturedImage width={100} height={100}
                          src={item?.coverImage}
                          alt={item?.title}
                          title={item?.title}
                        />
                      </Link>
                    </div>
                    <div className="news-details">
                      <div>
                        <h3 className="fs-5">
                          <Link href={`/reviews/${item.slug}`}>
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
                            {/* <b>{item?.author?.firstName
                              ? item?.author?.firstName
                              : "Carprices Team"}</b> */}
                              <b>By Carprices Team</b>
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
          </div>
          
        </div>
        <ViewAllButton text={"View All Reviews"} link={"/reviews"} />
      </div>
    </section>
  );
}
